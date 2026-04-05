// Launcher script for OATIA dev server
process.chdir(__dirname);
// Pass PORT via env so next dev picks it up
if (process.env.PORT) {
  process.argv.push('-p', process.env.PORT);
} else {
  process.argv.push('-p', '3001');
}
require('./node_modules/.bin/../next/dist/bin/next');
