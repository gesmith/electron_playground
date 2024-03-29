import Ember from 'ember';
const fs = require('fs');
const path = require('path');
const junk = require('junk');
const Promise = Ember.RSVP.Promise;
const computed = Ember.computed;

const map = {
  'directory': ['directory'],
  'compressed': ['zip', 'rar', 'gz', '7z'],
  'text': ['txt', 'md', 'pages', ''],
  'image': ['jpg', 'jpge', 'png', 'gif', 'bmp'],
  'pdf': ['pdf'],
  'css': ['css'],
  'html': ['html'],
  'word': ['doc', 'docx'],
  'powerpoint': ['ppt', 'pptx'],
  'video': ['mkv', 'avi', 'rmvb']
};

var FileProxy = Ember.ObjectProxy.extend({
  fileType: computed('fileExt', function() {
    var ext = this.get('fileExt');
    return Object.keys(map).find(type => map[type].includes(ext));
  }),
  isDirectory: computed('fileType', function() {
    return this.get('fileType') === 'directory';
  }),
  icon: computed('fileType', function() {
    if (this.get('fileType') === 'directory') {
      return 'assets/folder-icon.png';
    }
  })
});

var humanFileSize = size => {
  var i = Math.floor( Math.log(size) / Math.log(1024) );
  return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

const rootPath = process.env['HOME'];

export default Ember.Service.extend({
  path(dir = rootPath) {
    var callback = (resolve, reject) => {
      fs.readdir(dir, (error, files) => {
        if (error) {
          window.alert(error.message);
          return reject(error);
        }
        // Filter out all junk files and files that start with '.'
        var filteredFiles = files.filter(file => junk.not(file) && file[0] !== '.');
        var fileObjects = filteredFiles.map(file => {
          let filePath = path.join(dir, file);
          let fileStat = fs.statSync(filePath);
          let fileSize = fileStat.size ? humanFileSize(fileStat.size) : '';
          // Directories do not have an extension, hardcode it as 'directory'
          let fileExt = fileStat.isDirectory() ? 'directory' : path.extname(filePath).substr(1);
          let parsedPath = path.parse(filePath);

          let opts = {
            filePath,
            fileExt,
            fileSize,
            ...fileStat,
            ...parsedPath
          };
          return new FileProxy(opts);
        });
        resolve(fileObjects);
      });
    };
    return new Promise(callback);
  }
});
