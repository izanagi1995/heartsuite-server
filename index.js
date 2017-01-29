var server = require('./lib/server');

var s = new server(32323);

s.on('new', function(c){
  console.log("NEW", c);
});

s.on('beat', function(c){
  console.log("BEAT", c);
});

s.on('laggy', function(c){
  console.log("LAGGY", c);
});

s.on('out', function(c){
  console.log("OUT", c);
});
