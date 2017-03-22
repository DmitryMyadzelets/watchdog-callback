# watchdog-callback

    npm install watchdog-callback --save

socket.emit('any-event', callback);

I use it for `socket.io`. In this example the callback may never be called:

```javascript
    function callback(data) {
        // have fun with data
    }
    socket.emit('any-event', callback);
```

To make sure it will, use the watchdog:

```javascript
    var wdc = require('watchdog-callback');
    function callback(err, data) {
        if (err) {
            return console.log(err);
        }
        // have fun with data
    }
    socket.emit('any-event', wdc(callback));
```

The default timeout is 5000 seconds. You can changed it:

```javascript
    socket.emit('any-event', wdc(1000, callback)); // 1 second timeout
```