import Ember from 'ember';
const os = require('os');

export default Ember.Component.extend({
  appName: `Desktop for ${os.userInfo().username}`
});
