const domContainer = document.getElementById("root");

function opsFunc(ans, num, op){
    switch(op){
        case "+":   return ans+num;
        case "-":   return ans-num;
        case "/":   return ans/num;
        case "*":   return ans*num;
    }
}

function calcRecurse(ans, nums, ops){
    if(nums.length){
        ans = opsFunc(ans, nums.shift(), ops.shift());
        return calcRecurse(ans, nums, ops);
    }
    else{
        return ans;
    }
}

function modifyInput(x){
    return x.replace(/\.([+-/*])/,'.0$1').replace(/([+-/*])-/g,'$1neg');
}

class Buttons extends React.Component {
    constructor(props){
        super(props);
        this.state={
            input: '',
            tempDisp: '',
            equalFlag: 0
        };
        this.numPress=this.numPress.bind(this);
        this.operatorPress=this.operatorPress.bind(this);
        this.clearPress=this.clearPress.bind(this);
        this.equalPress=this.equalPress.bind(this);
    }

    numPress(x){
        if(this.state.equalFlag==1){
            this.setState({
                equalFlag: 0
            });
        }
        if(x=='.'){
            if(/\.[\d]*$/.test(this.state.input)==true)
                return;
            else if(/[+-/*]$/.test(this.state.input)==true)
                x='0'+x;
        }
        else if(x=='0'){
            if(/0$/.test(this.state.input)==true)
                return;
        }
        this.setState({
            input: this.state.input+x,
            tempDisp: /[^\d.-]/.test(this.state.tempDisp)?''+x:this.state.tempDisp+x
        },()=>{
                this.props.updateText(modifyInput(this.state.input));
                this.props.display1(this.state.input);
                this.props.display2(this.state.tempDisp);
        });
    }

    operatorPress(x){
        if(this.state.equalFlag==1){
            this.setState({
                input: this.props.output2,
                equalFlag: 0
            },()=>{console.log(this.state.input); this.operatorPress(x)});
            return;
        }
        if(/[+/*]/.test(x)==true){
            if(this.state.input==''){
                console.log('test'+this.state.input+'untest');
                return;
            }
            else if(/[+-/*]-$/.test(this.state.input)==true){
                this.setState({
                    input: [...this.state.input].splice(0,this.state.input.length-2).join('')+x,
                    tempDisp: x
                },()=>{
                        this.props.updateText(modifyInput(this.state.input));
                        this.props.display1(this.state.input);
                        this.props.display2(this.state.tempDisp);
                });
                return;
            }
            else if((/[^\d.]$/).test(this.state.input)==true){
                this.setState({
                    input: [...this.state.input].splice(0,this.state.input.length-1).join('')+x,
                    tempDisp: x
                },()=>{
                        this.props.updateText(modifyInput(this.state.input));
                        this.props.display1(this.state.input);
                        this.props.display2(this.state.tempDisp);
                });
                return;
            }
        }
        else if(x=='-'){
            if(/[^\d.][+-/*.]$/.test(this.state.input)==true)
                return;
        }
        this.setState({
            input: this.state.input+x,
            tempDisp: x
        },()=>{
                this.props.updateText(modifyInput(this.state.input));
                this.props.display1(this.state.input);
                this.props.display2(this.state.tempDisp);
        });
    }

    clearPress(x){
        this.setState({
            input: x=='clear'?'':[...this.state.input].splice(0,this.state.input.length-1).join(''),
            tempDisp: x=='clear'?'':[...this.state.tempDisp].splice(0,this.state.tempDisp.length-1).join('')
        },()=>{
                this.props.updateText(modifyInput(this.state.input));
                this.props.display1(this.state.input);
                this.props.display2(this.state.tempDisp);
        })
    }

    equalPress(){
        if(/^[.-]*$/.test(this.state.input)==true){
            return;
        }
        this.setState({
            input: '',
            tempDisp: '',
            equalFlag: 1
        },()=>{console.log(this.state.input)});
        this.props.equals();
    }

    render(){
        return(
            <div id="buttons">
                <button class="key" id="divide" onClick={()=>this.operatorPress('/')}>/</button>
                <button class="key" id="one" onClick={()=>this.numPress(1)}>1</button>
                <button class="key" id="two" onClick={()=>this.numPress(2)}>2</button>
                <button class="key" id="three" onClick={()=>this.numPress(3)}>3</button>
                <button class="key" id="multiply" onClick={()=>this.operatorPress('*')}>*</button>
                <button class="key" id="four" onClick={()=>this.numPress(4)}>4</button>
                <button class="key" id="five" onClick={()=>this.numPress(5)}>5</button>
                <button class="key" id="six" onClick={()=>this.numPress(6)}>6</button>
                <button class="key" id="subtract" onClick={()=>this.operatorPress('-')}>-</button>
                <button class="key" id="seven" onClick={()=>this.numPress(7)}>7</button>
                <button class="key" id="eight" onClick={()=>this.numPress(8)}>8</button>
                <button class="key" id="nine" onClick={()=>this.numPress(9)}>9</button>
                <button class="key" id="add" onClick={()=>this.operatorPress('+')}>+</button>
                <button class="key" id="zero" onClick={()=>this.numPress(0)}>0</button>
                <button class="key" id="decimal" onClick={()=>this.numPress('.')}>.</button>
                <button class="key" id="clear" onClick={()=>this.clearPress('clear')}>AC</button>
                <button class="key" id="backspace" onClick={()=>this.clearPress('backspace')}><i class="fas fa-backspace"></i></button>
                <button class="key" id="equals" onClick={this.equalPress}>=</button>
            </div>
        );
    }
}

class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: '0',
            disp1: '0',
            disp2: '0'
        };
        this.textChange=this.textChange.bind(this);
        this.calculateAns=this.calculateAns.bind(this);
        this.disp1Change=this.disp1Change.bind(this);
        this.disp2Change=this.disp2Change.bind(this);
    }

    textChange(x){
        this.setState({
            text: x
        });
    }

    calculateAns(){
        let x=this.state.text;
        let a=x.match(/[neg]*[.\d]*[^+-/*]/g);
        let b=x.split(/[neg]*[.\d]*[^+-/*]/g).filter(function (x) {return x!='';});
        for(let i=0; i<a.length; i++){
            a[i]=parseFloat(a[i].replace(/neg/g,'-'));
        }
        let z=calcRecurse(a.shift(),a,b)
        this.disp2Change(z);
        this.setState({
            disp1: this.state.disp1+'='+z
        },()=>{console.log(this.state.disp1)});
    }

    disp1Change(x){
        this.setState({
            disp1: x==''?'0':x
        },()=>{console.log(this.state.disp1)});
    }

    disp2Change(x){
        this.setState({
            disp2: x==''?'0':x
        },()=>{console.log(this.state.disp2)});
    }

    render() {
        return (
            <div id="calculator">
                <div id="screen">
                    <p id="beta-display">{this.state.disp1}</p>
                    <p id="display">{this.state.disp2}</p>
                </div>
                <Buttons updateText={this.textChange} display1={this.disp1Change} display2={this.disp2Change} equals={this.calculateAns} output2={this.state.disp2}/>
            </div>
        );
    }
};

ReactDOM.render(<Main />, domContainer)
