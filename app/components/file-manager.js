import Ember from 'ember';
const {ipcRenderer} = require('electron');

export default Ember.Component.extend({
  // dragOver(e) {
  //   console.log(e.dataTransfer.files);
  //   console.log(e.dataTransfer.files[0].path);
  // },
  dragStart(e) {
    ipcRenderer.send('ondragstart', e.dataTransfer.files[0].path);
  },
  drop(e) {
    e.preventDefault();
    let filePath = e.dataTransfer.files[0].path;

    this.send('dragFile', filePath);
    return false;
  }
});
