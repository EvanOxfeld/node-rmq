# Simple message queue powered by Redis

This project uses node-redis to interact with Redis. To see more information about how these commands are executed, [check out the repository](https://github.com/mranney/node_redis).

## Installation

```bash
$ npm install node-rmq
```

You also need to [install Redis](http://redis.io/download) (currently the only working option is a local redis with default configurations).

### Publish Example

```bash
var queue = require('node-rmq');

var messageData = {
  here: 'is some data',
  overHere: 'is some other data'
};

queue.publish('someChannel', messageData);
```

### Subscribe Example

```bash
var queue = require('node-rmq');

queue.subscribe('someOtherChannel', function(message){
  // Process the message here
});
```

Optionally both subscribing and publishing will accept a callback as a third parameter to handle errors

```bash
queue.publish('someChannel', messageData, function(error){
  // error will represent a problem adding the message to the queue
});

queue.subscribe('someChannel', somePreviouslyDefinedFunction, function(error){
  // error will represent a problem handling the message or subscribing to the channel
});
```

Note that errors will be logged to console.warn() and the functions will return without attempting to do anything.

## LICENSE - "MIT License"

Copyright (c) 2014 Christopher Gillis

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
