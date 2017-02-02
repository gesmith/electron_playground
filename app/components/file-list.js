import Ember from 'ember';
const { shell } = require('electron');

export default Ember.Component.extend({
  classNameBindings: [':file-list'],
  actions: {
    openFile(file) {
      shell.openItem(file);
    }
  }
});
