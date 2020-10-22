import React, { PureComponent } from 'react';
import ReactDiffViewer from 'react-diff-viewer';

class Diff extends PureComponent {
  constructor(props) {
      super(props);
      var tmpObject;

      console.log(props.expected);
      console.log(props.given);

      try {
        tmpObject = JSON.parse(props.expected);
        console.log(typeof tmpObject);
        if (typeof tmpObject === "object")
            this.expected = JSON.stringify(tmpObject, null, 2);
        else
            this.expected = props.expected
      }
      catch (err) {
          this.expected = props.expected;
      }
      console.log(this.expected);

      try {
        tmpObject = JSON.parse(props.given);
        if (typeof tmpObject === "object")
            this.given = JSON.stringify(tmpObject, null, 2);
        else
            this.given = props.given;
      }
      catch (err) {
        this.given = props.given;
      }
  }
  render = () => {
    return (
      <ReactDiffViewer 
        oldValue={this.expected} leftTitle="Expected Response Body"
        newValue={this.given} rightTitle="Given Response Body"
        splitView={true} showDiffOnly={false}
      />
    );
  };
}
export default Diff;