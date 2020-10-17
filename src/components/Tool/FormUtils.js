/**
 * This file is for utility components/functions for Form building.
 */

 import React from "react";

// Returns a 'disabled' button if form is submitting. To prevent multiple clicks.
export function getSaveButton(isSubmitting) {
    let SaveButton;
    if (isSubmitting) {
        SaveButton = 
            <div className="new-Suite-submit">
                <button type="Submit" disabled className="btn btn-primary">Save</button>
            </div>
    } else {
        SaveButton = 
            <div className="new-Suite-submit">
                <button type="Submit" className="btn btn-primary">Save</button>
            </div>
    }
    return SaveButton;
}

// Single line text input
export class SingleLineInput extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = props.onChange;
        this.name = props.name;
        this.placeholder = props.placeholder;
        this.valueToChange = props.valueToChange;
        this.value = (props.value !== undefined ? props.value : "");
    }
    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.name+"Input"}>{this.name}</label>
                <input type="input" className="form-control" 
                        aria-describedby={this.name} placeholder={this.placeholder} 
                        onChange={e => this.onChange(this.valueToChange, e.target.value)}
                        value={this.value}
                />
            </div>
        );
    }
}

// Multi line text area
export class MultiLineInput extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = props.onChange;
        this.name = props.name;
        this.placeholder = props.placeholder;
        this.valueToChange = props.valueToChange;
        this.value = (props.value !== undefined ? props.value : "");
    }
    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.name+"Input"}>{this.name}</label>
                <textarea className="form-control" rows="3" aria-describedby={this.name} 
                            placeholder={this.placeholder} 
                            onChange={e => this.onChange(this.valueToChange, e.target.value)} 
                            value={this.value}
                />
            </div>
        );
    }
}

// Dropdown selection
export class SelectDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = props.onChange;
        this.name = props.name;
        this.valueToChange = props.valueToChange;
        this.options = props.options;
    }

    getOptions() {
        var optionsHTML;
        for (let i=0; i<this.options.length; i++) {
            optionsHTML += <option>{this.options[i]}</option>;
        }
        return optionsHTML;
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.name+"Input"}>{this.name}</label>
                <select onChange={e => this.onChange(this.valueToChange, e.target.value)} 
                        className="form-control">
                    {this.getOptions}
                </select>
            </div>
        );
    }
}