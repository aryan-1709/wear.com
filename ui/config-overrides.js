const paths = require('react-scripts/config/paths')
const path = require('path');

paths.appSrc = path.resolve(__dirname, 'app')
// Tell the app that "src/index.js" has moved to "app/index.js"
paths.appIndexJs = path.resolve(__dirname, 'app/index.js')

// module.exports = (config, env) => {
//   const srcFolderIndex = process.argv.findIndex(arg => arg === '--src');
//   const srcFolder = srcFolderIndex > -1 ? process.argv[srcFolderIndex + 1] : 'src1';
  
//   config.entry = path.resolve(__dirname, srcFolder, 'index.js');
//   config.output = {
//     ...config.output,
//     path: path.resolve(__dirname, 'build', srcFolder),
//   };

//   return config;
// };