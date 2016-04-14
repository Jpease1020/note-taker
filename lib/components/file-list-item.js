import React from 'react';
import store from '../store';
import path from 'path';

const FileListItem = (file) => {
  const content = truncate(file.content, 100);
  const fileName = path.basename(file.fileName);

  return (
    <div className="file-list-item" onClick={() => store.select(file.id) }>
      <h3 className="file-list-item-title">{fileName}</h3>
      <div className="file-list-item-content">{content}</div>
      <button onClick={() => store.remove(file.id) }>X</button>
    </div>
  );
};

const truncate = (text, maxLength) => {
  if (text.length < maxLength) { return text; }
  return text.slice(0, maxLength) + '...';
};

module.exports = FileListItem;
