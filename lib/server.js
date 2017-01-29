const dgram = require('dgram');
const EventEmitter = require('events');

class HeartServer extends EventEmitter{
  constructor(port, lagTime, outTime){
    super();
    this.lagTime = lagTime || 4000;
    this.outTime = outTime || 7000;
    this.port = port;
    this.clients = new Map();

    this.socket = dgram.createSocket('udp4');

    this.socket.on('error', (err) => {
      this.emit('error', err);
    });

    this.socket.on('message', (msg, rinfo) => {
      let beat = JSON.parse(msg);
      var old = this.clients.get(beat.id);
      let v = {beatTime : beat.lastBeat, laggy: false, out: false, lagTimer: null, outTimer: null};
      if(beat.new){
        this.emit('new', beat);
      }else{
        this.emit('beat', beat);
        if(typeof old != "undefined" && old.lagTimer != null){
          clearTimeout(old.lagTimer);
          clearTimeout(old.outTimer);
        }
      }
      var tLag = setTimeout((beat) => {
        v.laggy = true;
        v.lagTimer = null;
        this.emit('laggy', beat);
      }, this.lagTime, beat);
      var tOut = setTimeout((beat) => {
        v.out = true;
        v.outTimer = null;
        this.emit('out', beat);
      }, this.outTime, beat);
      v.lagTimer = tLag;
      v.outTimer = tOut;
      this.clients.set(beat.id, v);
    });

    this.socket.on('listening', () => {
      var address = this.socket.address();
    });

    this.socket.bind(this.port);
  }

}

module.exports = HeartServer;
