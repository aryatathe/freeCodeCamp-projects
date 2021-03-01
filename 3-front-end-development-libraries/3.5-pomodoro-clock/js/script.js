const domContainer = document.getElementById("root");

const labels=["Session","Break"];
const cssClasses=["fa fa-play fa-3x","fa fa-pause fa-3x"];

var counter=0;

var audio='';

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state={
            session: 25,
            break: 5,
            current: 0,
            time: 1500,
            power: 0
        };
        this.updateBreak=this.updateBreak.bind(this);
        this.updateSession=this.updateSession.bind(this);
        this.powerSwitch=this.powerSwitch.bind(this);
        this.resetTimer=this.resetTimer.bind(this);
        this.timer=this.timer.bind(this);
    }

    componentDidMount(){
        audio=document.getElementById("beep");
        audio.play();
        audio.pause();
    }

    updateBreak(x){
        if(this.state.power==0 && this.state.break>1 && this.state.break<60){
            this.setState({
                break: this.state.break+x,
                time: this.state.current==1?(this.state.break+x)*60:this.state.time
            });
        }
    }

    updateSession(x){
        if(this.state.power==0 && this.state.session>1 && this.state.session<60){
            this.setState({
                session: this.state.session+x,
                time: this.state.current==0?(this.state.session+x)*60:this.state.time
            });
        }
    }

    powerSwitch(){
        if(this.state.power==0){
            counter=setInterval(this.timer, 1000);
        }
        else{
            clearInterval(counter);
        }
        this.setState({
            power: 1-this.state.power
        });
    }

    resetTimer(){
        clearInterval(counter);
        this.setState({
            session: 25,
            break: 5,
            current: 0,
            time: 1500,
            power: 0
        });
        audio.pause();
        audio.currentTime=0;
    }

    timer(){
        if(this.state.power==1){
            if(this.state.time>0){
                this.setState({
                    time: this.state.time-1
                });
            }
            else{
                audio.play();
                this.setState({
                    current: 1-this.state.current,
                    time: this.state.current==1?(this.state.session)*60:(this.state.break)*60
                });
            }
        }
    }

    render(){
        return(
            <div id="clock">
            <h1 id="heading">Pomodoro Clock</h1>
                <div class="controls" id="session">
                    <h3 id="session-label">Session Length</h3>
                    <button id="session-increment" onClick={()=>{this.updateSession(1)}}><i class="fa fa-arrow-up fa-2x"></i></button>
                    <h4 id="session-length">{this.state.session}</h4>
                    <button id="session-decrement" onClick={()=>{this.updateSession(-1)}}><i class="fa fa-arrow-down fa-2x"></i></button>
                </div>
                <div class="controls" id="break">
                    <h3 id="break-label">Break Length</h3>
                    <button id="break-increment" onClick={()=>{this.updateBreak(1)}}><i class="fa fa-arrow-up fa-2x"></i></button>
                    <h4 id="break-length">{this.state.break}</h4>
                    <button id="break-decrement" onClick={()=>{this.updateBreak(-1)}}><i class="fa fa-arrow-down fa-2x"></i></button>
                </div>
                <div id="display">
                    <h3 id="timer-label">{labels[this.state.current]}</h3>
                    <h4 id="time-left">{(this.state.time<600?('0'+Math.floor(this.state.time/60)):(Math.floor(this.state.time/60)))+':'+(this.state.time%60<10?('0'+this.state.time%60):this.state.time%60)}</h4>
                    <button id="start_stop" onClick={this.powerSwitch}><i class={cssClasses[this.state.power]}></i></button>
                    <button id="reset" onClick={this.resetTimer}><i class="fa fa-redo fa-3x"></i></button>
                </div>
                <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
            </div>
        );
    }
}

ReactDOM.render(<Main />, domContainer)
