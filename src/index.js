import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// This is for a bug with CodeMirror. When tabs are clicked, the editor must refresh.
var codeEditors = document.querySelectorAll('.CodeMirror');
for (let i = 0; i < codeEditors.length; i++) {
    codeEditors[i].CodeMirror.refresh();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
