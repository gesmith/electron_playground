import Ember from 'ember';
import { formatFilePath } from '../utils/format-filepath';

export default Ember.Route.extend({
  readDirectory: Ember.inject.service(),
  model(params) {
    const filePath = params.file_path === 'root' ? process.env['HOME'] : params.file_path;
    let sideBarDirectory = this.get('readDirectory').path();
    let currentDirectory = this.get('readDirectory').path(filePath);

    return Ember.RSVP.hash({
      sideBarDirectory,
      currentDirectory,
      filePath: formatFilePath(filePath)
    });
  }
});
