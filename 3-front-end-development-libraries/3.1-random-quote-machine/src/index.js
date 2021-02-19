import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Quotes from './Quotes';

var color1='';
var color2='';

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state={
            num:0,
            colorValues: {h:100, s:50, l:50}
        };
        this.update = this.update.bind(this);
    };

    update(){
        this.setState({
            num:Math.floor(Quotes.length*Math.random()),
            colorValues:{
                            h:Math.floor(361*Math.random()),
                            s:Math.floor(101*Math.random()),
                            l:Math.floor(101*Math.random())
                        }
        });
        color1='white';
        color2='black';
    }

    render(){
        color1=`hsl(${this.state.colorValues.h},${this.state.colorValues.s}%,${this.state.colorValues.l}%)`;
        color2=`hsl(${this.state.colorValues.h},${this.state.colorValues.s}%,${(this.state.colorValues.l+50)%100}%)`;

        document.body.style.backgroundColor = color1;
        return(
            <div style={{color:color1, backgroundColor:color2}} id='quote-box'>
                <p id='text' style={{opacity: this.state.op}}>{Quotes[this.state.num]['quote']}</p>
                <p id='author'> - {Quotes[this.state.num].author}</p>
                <button style={{color:color2, backgroundColor:color1}} id='new-quote' onClick={this.update}>New Quote</button>
                <a id='tweet-quote' href={'https://twitter.com/intent/tweet?text='+Quotes[this.state.num].quote+' - '+Quotes[this.state.num].author} target='_blank'>
                    <button style={{color:color2, backgroundColor:color1}}>Tweet Quote</button>
                </a>
            </div>
        );
    }
};

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);
