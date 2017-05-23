# watchdog-callback

    npm install watchdog-callback --save

I use it for `socket.io`. In the example below the callback may never be called:

```javascript
    function callback(err, data) {
        if (err) {
            return console.error(err);
        }
        // have fun with data
    }
    socket.emit('any-event', callback);
```

To make sure it will, use the watchdog:

```javascript
    var wdc = require('watchdog-callback');
    function callback(tout, err, data) {
        if (tout) {
            return console.error(tout);
        }
        if (err) {
            return console.error(err);
        }
        // have fun with data
    }
    socket.emit('any-event', wdc(callback));
```

The default timeout is 5000 milliseconds. You can change it:

```javascript
    socket.emit('any-event', wdc(1000, callback)); // 1 second timeout
```