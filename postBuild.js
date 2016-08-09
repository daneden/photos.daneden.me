let ncp = require('ncp').ncp;

ncp.limit = 16;

let opts = {
  dereference: true
}

ncp('./images/', './build/images/', opts, function (err) {
 if (err) {
   return console.error(err);
 }
 console.log('Copied images to build directory');
});
