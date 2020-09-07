import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

import '../css/Previews/TextEditor.css';

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
          code: "// JSON code here",
        };
    }

    updateText = (newText) => {
        this.setState({
			code: newText,
		});
    }

    render() {
        var options = {
            lineNumbers: true,
            mode: 'javascript',
            smartIndent: false,
            autoRefresh: true,
        };
        return <CodeMirror value={this.state.code} onChange={this.updateText} options={options} />
        // if (this.props.type === "request") {
		//     return (
        //         <span id="request-window">
        //         <CodeMirror value={this.state.code} onChange={this.updateText} options={options} />
        //         </span>
        //     );
        // } else {
        //     return (
        //         <span id="response-window">
        //         <CodeMirror value={this.state.code} onChange={this.updateText} options={options} />
        //         </span>
        //     );
        // }
    }
}

export default TextEditor;