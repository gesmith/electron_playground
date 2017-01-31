import Ember from 'ember';
import { readDirectory } from '../utils/read-directory';

export default Ember.Route.extend({
  model(params) {
    const filePath = params.folder_id === 'root' ? process.env['HOME'] : params.folder_id;
    var sideBarModel = readDirectory();
    var fileListModel = readDirectory(filePath);

    return Ember.RSVP.hash({
      filePath: filePath,
      sideBarModel: sideBarModel,
      fileListModel: fileListModel
    });
  }
});
