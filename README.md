# heartsuite-client

*heartsuite-server is the client that receive heartbeat from a heartsuite-client*

## Usage

```javascript
const HeartSuiteServer = require('heartsuite-server');
const port = 23232; //Server port
const lagTime = 5000; //Time without heartbeat to consider client as 'laggy'
const outTime = 9000; //Time without heartbeat to consider client as 'out'

let server = new HeartSuiteServer(port, lagTime, outTime);

server.on('error', function(error){
  console.error(error);
});
server.on('new', function(beat){
  console.log(beat);
});
server.on('beat', function(beat){
  console.log(beat);
});
server.on('laggy', function(beat){
  console.log(beat);
});
server.on('out', function(beat){
  console.log(beat);
});
```

## Issues
- Feature request : tag [Feature]
- Issue : please describe the problem and give steps to reproduce

## Pull request
- Use 2-space tabs
