const domContainer = document.getElementById("root");

const sounds = [
[
  {
    keyCode: 81,
    key: 'Q',
    name: 'Heater-1',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    key: 'W',
    name: 'Heater-2',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    key: 'E',
    name: 'Heater-3',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    key: 'A',
    name: 'Heater-4',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    key: 'S',
    name: 'Clap',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    key: 'D',
    name: 'Open-HH',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    key: 'Z',
    name: "Kick-n'-Hat",
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    key: 'X',
    name: 'Kick',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    key: 'C',
    name: 'Closed-HH',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
],
[
  {
    keyCode: 81,
    key: 'Q',
    name: 'Chord-1',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    key: 'W',
    name: 'Chord-2',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    key: 'E',
    name: 'Chord-3',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    key: 'A',
    name: 'Shaker',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    key: 'S',
    name: 'Open-HH',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    key: 'D',
    name: 'Closed-HH',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    key: 'Z',
    name: 'Punchy-Kick',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    key: 'X',
    name: 'Side-Stick',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    key: 'C',
    name: 'Snare',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
]
];

class Keypad extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
        this.soundPlay=this.soundPlay.bind(this);
        this.keyPress=this.keyPress.bind(this);
    }

    componentDidMount(){
        document.addEventListener("keydown", this.keyPress)
    }

    soundPlay(x){
        if(document.getElementById(x)!=undefined){
            this.props.updateDisplay(sounds[this.props.soundList].filter(a=>{return (a.key==x);})[0]['name'].replace(/-/g,' '));
            var audio= document.getElementById(x);
            audio.currentTime=0;
            audio.volume=this.props.volume*this.props.power;
            audio.play();
        }
    }

    keyPress(x){
        this.soundPlay(x.key.toUpperCase())
    }

    render() {
        let soundKeys=sounds[this.props.soundList].map(x=>
                <button class='drum-pad'
                        id={x.name}
                        onClick={()=>this.soundPlay(x.key)}
                                    >{x.key}<audio class="clip" id={x.key} src={x.link}></audio>
                </button>
            );
        return (
            <div id="key-pad">
                {soundKeys}
            </div>
        );
    }
};

class ControlPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div id="controls" class={this.props.visibility?"panel-show":"panel-hide"}>
                <div id="power">
                    <h3>Power</h3>
                    <button class={this.props.power?"power-on":"power-off"} onClick={this.props.updatePower}><i class="fa fa-power-off fa-4x"></i></button>
                </div>
                <div id="volume">
                <h3>Volume</h3>
                    <input id="slider" type="range" min="0" max={100*this.props.power} step= "1" onInput={this.props.updateVolume} value={Math.round(this.props.volume*100)}></input>
                </div>
                <div id="sound-bank">
                    <h3>Sound Bank</h3>
                    <button class={this.props.bank?"not-selected":"selected"} onClick={()=>this.props.bankChange(0)}>Heater Kit</button>
                    <button class={this.props.bank?"selected":"not-selected"} onClick={()=>this.props.bankChange(1)}>Smooth Piano Kit</button>
                </div>
            </div>
        );
    }
};

class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            bank: 0,
            power: 1,
            volume: 0.7,
            display: 'Drum Machine',
            panelVis: 0
        };
        this.switchBank=this.switchBank.bind(this);
        this.switchPower=this.switchPower.bind(this);
        this.changeVolume=this.changeVolume.bind(this);
        this.changeDisplay=this.changeDisplay.bind(this);
        this.switchPanel=this.switchPanel.bind(this);
    }

    switchBank(x){
        this.setState(
            {bank: x},
            ()=>{this.changeDisplay(`${this.state.bank?"Smooth Piano Kit":"Heater Kit"}`);}
        );
    }

    switchPower(){
        this.setState(
            {power: 1-this.state.power},
            ()=>{this.changeDisplay('Power On');}
        );
    }

    changeVolume(event){
        this.setState(
            {volume: event.target.value/100},
            ()=>{this.changeDisplay(`Volume: ${Math.round(this.state.volume*100)}`);}
        );

    }

    changeDisplay(x){
        this.setState({
            display: this.state.power?x:'Power Off'
        });
    }

    switchPanel(x){
        this.setState({
            panelVis: 1-this.state.panelVis
        });
    }

    render() {
        return (
            <div id="drum-machine">
                <div id="header">
                    <h3 id="display">{this.state.display}</h3>
                    <button onClick={this.switchPanel}><i class="fa fa-cog fa-2x"></i></button>
                </div>
                <div id="main-area">
                    <Keypad soundList={this.state.bank} volume={this.state.volume} updateDisplay={this.changeDisplay} power={this.state.power} />
                    <ControlPanel bank={this.state.bank} bankChange={this.switchBank} volume={this.state.volume} updateVolume={this.changeVolume} power={this.state.power} updatePower={this.switchPower} visibility={this.state.panelVis}/>
                </div>
            </div>
        );
    }
};

ReactDOM.render(<Main />, domContainer)
