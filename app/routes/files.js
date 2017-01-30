import Ember from 'ember';
import { readDir } from '../utils/read-dir';

export default Ember.Route.extend({
  model() {
    var model = readDir();
    return model;
  }
});
