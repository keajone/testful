import React, { Component } from 'react';

import "../css/Previews/PageHeader.css";

class PageHeader extends Component {
    constructor(props) {
        super(props);
        this.value = props.value;
    }

    // <div className="page-header"> 
    //     <img className="page-header-pic" src="./header-2.jpg" alt="Testful"/>
    //     <h4>{this.value}</h4>
    // </div>
    
    render() {
        return (
            <div className="page-header">
                <h4>{this.value}</h4>
            </div>
        );
    }
}

export default PageHeader;