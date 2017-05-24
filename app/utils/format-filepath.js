export function formatFilePath(filePath) {
  var parts = filePath
              .replace(/\\/g, '/')
              .split('/')
              .filter(Boolean);

  var link = '';
  return parts.map((part) => {
    link += `/${part}`;
    return { path: link, name: part };
  });
}
