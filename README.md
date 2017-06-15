# watchdog-callback

    npm install watchdog-callback --save

I use it for `socket.io`. In the example below the callback may never be called:

```javascript
    socket.emit('any-event', function (err, data) {
        if (err) {
            return console.error(err);
        }
        // have fun with data
    });
```

To make sure it will, use the watchdog:

```javascript
var wdc = require('watchdog-callback');
socket.emit('any-event', wdc(function (tout, err, data) {
    if (tout) {
        return console.error(tout);
    }
    if (err) {
        return console.error(err);
    }
    // have fun with data
}));
```

The default timeout is 5000 milliseconds. You can change it:

```javascript
    // 1 second timeout
    socket.emit('any-event', wdc(1000, callback));
```

The credits should be given to Jakub Knejzlík, the author of [`timeout-callback`](https://github.com/jakubknejzlik/node-timeout-callback). His module just didn't worked as I expected, at that time.