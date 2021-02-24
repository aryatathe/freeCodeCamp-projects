const domContainer = document.getElementById("root");

const initialText=`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`

const cssClasses={
    size:["box-max","box-hide",""],
    icon:["fa fa-expand fa-2x","fa fa-compress fa-2x"]
}

marked.setOptions({
  breaks: true
});


class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            input: initialText,
            size: [2,2],
            icon: 0
        };
        this.updateText=this.updateText.bind(this);
        this.updateScreen=this.updateScreen.bind(this);
    }
    updateText(event){
        this.setState({
            input:event.target.value
        });
    }

    updateScreen(x){
        this.setState({
            size: (this.state.size[0]==2?[x,1-x]:[2,2]),
            icon: 1-this.state.icon
        });
    }

    render() {
        return (
            <div id="content">
                <div id="editor-box" class={cssClasses.size[this.state.size[0]]}>
                    <header class="heading">
                        <h4>Editor</h4>
                        <button onClick={()=>{this.updateScreen(0)}}>
                            <i class={cssClasses.icon[this.state.icon]}></i>
                        </button>
                    </header>
                    <textarea id="editor" value={this.state.input} onChange={this.updateText}>
                    </textarea>
                </div>
                <div id="preview-box" class={cssClasses.size[this.state.size[1]]}>
                    <header class="heading">
                        <h4>Preview</h4>
                        <button onClick={()=>{this.updateScreen(1)}}>
                            <i class={cssClasses.icon[this.state.icon]}></i>
                        </button>
                    </header>
                    <div id="preview" dangerouslySetInnerHTML={{__html: marked(this.state.input),}}>
                    </div>
                </div>
            </div>
        );
    }
};

ReactDOM.render(<Main />, domContainer)
