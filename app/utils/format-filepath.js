import Ember from 'ember';

export function formatFilePath(filePath) {
  var parts = filePath
			.replace(/\\/g, '/')
			.split('/')
			.filter(Boolean);

  var link = '';
  return parts.map((part) => {
    link += `/${part}`;
    return { relPath: link, name: part };
  });
}
