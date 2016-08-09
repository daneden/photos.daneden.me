var ncp = require('ncp').ncp;

ncp.limit = 16;

ncp('./images/', './build/images/', function (err) {
 if (err) {
   return console.error(err);
 }
 console.log('Copied images to build directory');
});
