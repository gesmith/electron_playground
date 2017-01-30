const fs = require('fs');
const path = require('path');
const junk = require('junk');

var map = {
  'directory': ['directory'],
  'compressed': ['zip', 'rar', 'gz', '7z'],
  'text': ['txt', 'md', 'pages', ''],
  'image': ['jpg', 'jpge', 'png', 'gif', 'bmp'],
  'pdf': ['pdf'],
  'css': ['css'],
  'html': ['html'],
  'word': ['doc', 'docx'],
  'powerpoint': ['ppt', 'pptx'],
  'movie': ['mkv', 'avi', 'rmvb'],
};

var FileProxy = Ember.ObjectProxy.extend({
  filePath: '',
  fileExt: '',
  fileType: Ember.computed('fileExt', function() {
    var ext = this.get('fileExt');
    for (var key in map) {
      if (map[key].includes(ext)) { return key; }
    }
  }),
  isDirectory: Ember.computed('fileType', function () {
    if (this.get('fileType') === 'directory') {
      return true;
    } else {
      return false;
    }
  })
});

// var ify = (file) => {
//   return new Promise((resolve, reject) => {
//     fs.stat(file.filePath, (err, data) => {
//       if (err) {
//         return reject(err);
//       }
//       return resolve(data);
//     });
//   });
// };

// var isDirectory = (files) => {
//   //debugger;
//   return files.map((file) => {
//     return ify(file).then(function(data) {
//       file.isDirectory = data.isDirectory();
//       return file;
//     });
//   });
// };

export function readDir(dir = process.env['HOME']) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (error, files) => {
      if (error) {
        window.alert(error);
        return reject(error);
      }
      var filteredFiles = files.filter(junk.not);
      var fileObjects = filteredFiles.map((file) => {
        var filePath = path.join(dir, file);
        var parsed = path.parse(filePath);
        var fileExt = fs.statSync(filePath).isDirectory() ? 'directory' : path.extname(filePath).substr(1);
        return new FileProxy({ filePath, fileExt, ...parsed });
      });
      console.log(fileObjects);
      resolve(fileObjects);
    });
  });
}

// async function getFiles(dir) {
//   return new Promise((resolve, reject) => {
//     await fs.readdir(dir, (error, files) => {
//       if (error) {
//         window.alert(error);
//         return reject(error);
//       }

//       var files = files.map((file) => {
//         var filePath = path.join(dir, file);
//         var parsed = path.parse(filePath);
//         // var fileExt = fs.statSync(filePath).isDirectory() ? 'folder' : path.extname(filePath).substr(1);
//         // var isDirectory = isDirectory(filePath);
//         return new File({ filePath, ...parsed});
//       });

//       console.log(files);
//       resolve(files);
//     });
//   });
// }

// async function isDirectory(files) {
//   await files.each((file) => {
//     new Promise((resolve) => {
//        resolve(fs.statSync(file.path).isDirectory())
//     });
//   });
// }

// export async function readDir(onlyFolders = false, dir = process.env['HOME']) {
//   var files = await getFiles(dir);
//   return await isDirectory(files);
// }
