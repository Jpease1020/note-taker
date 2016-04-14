import React, { Component } from 'react';
import store from '../store';
import FileList from './file-list';
import { remote } from 'electron';
import ActiveFile from './active-file';

const { openFile } = remote.require(`${__dirname}/../main`);
const { saveFile } = remote.require(`${__dirname}/../main`);

class Application extends Component {
  constructor() {
    super();
    this.state = { files: [] };
  }

  componentDidMount() {
    store.on('change', files => {
      this.setState( { files });
    });
  }

  render() {
    let activeFile = this.state.files.find(file => file.active) || this.state.files[0] || store.newFile();
    return (
      <div>
        <div className="controls">
          <button className="controls-new-file" onClick={() => store.newFile()}>New Note</button>
          <button className="controls-open-file" onClick={() => openFile()}>Open File</button>
          {saveFileButton(activeFile)}
          <button className="controls-open-file" onClick={() => store.deselect()}>Close current file</button>
          {renderTitle(activeFile)}
        </div>
        <div className="files">
          <FileList files={this.state.files} />
          <ActiveFile file={activeFile} />
        </div>
      </div>
    );
  }
}

const renderTitle = (file) => {
  if (file) {
    return (
      <h3>{file.fileName}</h3>
    );
  }
};

const saveFileButton = (activeFile) => {
  if (activeFile) {
    return <button className="controls-open-file" onClick={() => saveFile(activeFile.fileName, activeFile.content, activeFile.id)}>Save Current File</button>;
  }
};

export default Application;
