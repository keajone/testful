// Module imports
import React from "react";

import "../css/Animations/CaseLoadingAnimation.css";

class CaseLoadingAnimation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {id: props.id};
    }

    static getDerivedStateFromProps(props) {
        return {id: props.id};
    }

    static toggle(id) {
        let el = document.getElementById('SLA_'+id);
        if (el.style.display === 'block') {
            el.style.display = 'none';
        } else {
            el.style.display = 'block';
        }
    }

    render() {
        return (
            <div className="SLA-container" id={"SLA_"+this.state.id}>
                <div 
                    className="spinner-border text-primary SLA" 
                    style={{width: "1.5rem", height: "1.5rem"}}
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}

export default CaseLoadingAnimation;