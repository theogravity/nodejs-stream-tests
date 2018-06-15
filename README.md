# nodejs-stream-tests

Examples of how streams in nodejs respond based on certain API calls, such as `end()` / `destroy()` and their placement in the event handlers on the server / client side.

- `test:grpc` to test a set of grpc flows
- `test:http-client` to test the node http `requestClient` `req` / `res` flows
- `test:mock-duplex` to test against a mock duplex stream

Example run:

```
$ node --require babel-register ./src/grpc.js
======= GRPC TESTS ======
gRPC server started

Normal gRPC request

[Bkdwm0gWQ grpc-client] Called write() { command: 'DEFAULT' }
[Bkdwm0gWQ grpc-client] Called end()
[Bkdwm0gWQ grpc-client] Event: finish
[Ske_DXAxbm grpc-server] Event: data { command: 'DEFAULT', text: '' }
[Ske_DXAxbm grpc-server] Called write() { command: 'DEFAULT', text: 'ok', isFinal: false }
[Ske_DXAxbm grpc-server] Called write() { command: 'DEFAULT', text: 'ok2', isFinal: true }
[Ske_DXAxbm grpc-server] Called end()
[Ske_DXAxbm grpc-server] Event: readable
[Ske_DXAxbm grpc-server] Event: end
[Bkdwm0gWQ grpc-client] Event: data { command: 'DEFAULT', text: 'ok', isFinal: false }
[Ske_DXAxbm grpc-server] Event: finish
[Bkdwm0gWQ grpc-client] Event: data { command: 'DEFAULT', text: 'ok2', isFinal: true }
[Bkdwm0gWQ grpc-client] Event: readable
[Bkdwm0gWQ grpc-client] Event: end

Normal gRPC request - end() called on end evt

[S1-uP7CgZ7 grpc-client] Called write() { command: 'DEFAULT' }
[ByzOwm0lZX grpc-server] Event: data { command: 'DEFAULT', text: '' }
[ByzOwm0lZX grpc-server] Called write() { command: 'DEFAULT', text: 'ok', isFinal: false }
[ByzOwm0lZX grpc-server] Called write() { command: 'DEFAULT', text: 'ok2', isFinal: true }
[ByzOwm0lZX grpc-server] Called end()
[S1-uP7CgZ7 grpc-client] Event: data { command: 'DEFAULT', text: 'ok', isFinal: false }
[ByzOwm0lZX grpc-server] Event: finish
[ByzOwm0lZX grpc-server] Event: readable
[ByzOwm0lZX grpc-server] Event: end
[S1-uP7CgZ7 grpc-client] Event: data { command: 'DEFAULT', text: 'ok2', isFinal: true }
[S1-uP7CgZ7 grpc-client] Event: readable
[S1-uP7CgZ7 grpc-client] Event: end
[S1-uP7CgZ7 grpc-client] Called end()
[S1-uP7CgZ7 grpc-client] Event: finish
```
