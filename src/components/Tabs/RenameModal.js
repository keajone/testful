// Module imports
import React from "react";

/**
 * Component for managing the modal used for changing profile names.
 */
class RenameModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tabs: props.tabs, currentTab: props.currentTab};
        this.handleNameChange = props.handleNameChange;
    }

    static getDerivedStateFromProps(props) {
        return {tabs: props.tabs, currentTab: props.currentTab};
    }

    // Handles the 'save changes' of the modal. 
    // Performs checks on new name, and calls the passed in handler.
    changeTabName = () => {
        var newName = document.getElementById('modal-input').value;
        document.getElementById('modal-input').value = '';

        document.getElementById("error-box").style.display = "none";
        if (newName === '') {
            // Empty name
            document.getElementById("error-box").innerHTML = "Invalid profile name.";
            document.getElementById("error-box").style.display = "block";
        } 
        else if (this.checkDuplicateName(newName)) {
            // Name already exists
            document.getElementById("error-box").innerHTML = 
                "Cannot change profile name to '"+ newName +"'. Another profile already has this name.";
            document.getElementById("error-box").style.display = "block";
        }
        else {
            this.handleNameChange(newName);
        }
    }

    // Checks if other tabs share the passed in name.
    checkDuplicateName = (value) => {
        console.log(this.state);
        let tabs = this.state.tabs;
        var isMatch = false;
        console.log(tabs);
        for(let i = 0; i < tabs.length; i++)
            if (tabs[i].name === value) { isMatch = true; }
        return isMatch;
    }

    render() {
        return (
            /** Modal */
            <div className="modal fade" id="renameModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Change Profile Name</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input 
                                id="modal-input"  
                                type="text" className="form-control" 
                                placeholder="New Profile Name" 
                                name="new-profile-name-input" 
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" 
                                    onClick={this.changeTabName}>
                                        Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RenameModal;