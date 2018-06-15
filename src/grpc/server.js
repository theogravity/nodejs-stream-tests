import grpc from 'grpc'
import helloProto from './proto'
import { wrapStream } from '../utils'

let server = null

export const SERVER_PORT = 50051

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
export function startGrpcServer () {
  server = new grpc.Server()
  server.addService(helloProto.HelloService.service, {
    HelloStream: sayHello
  })
  server.bind(`0.0.0.0:${SERVER_PORT}`, grpc.ServerCredentials.createInsecure())
  server.start()

  console.log('gRPC server started')
}

export function stopGrpcServer () {
  console.log('gRPC server stopping')
  server.forceShutdown()
}

function sayHello (stream) {
  // https://grpc.io/grpc/node/grpc-ServerDuplexStream.html
  const s = wrapStream(stream, { logPrefix: 'grpc-server' })

  s.stream.on('data', (data) => {
    switch (data.command) {
      case 'DEFAULT':
        writeDefault(s)
        break
      case 'DESTROY':
        writeDestroy(s)
        break
      case 'DESTROY_WITH_ERROR':
        writeDestroyWithError(s)
        break
    }
  })
}

function writeDefault (stream) {
  stream.write({
    command: 'DEFAULT',
    text: 'ok',
    isFinal: false
  })

  stream.write({
    command: 'DEFAULT',
    text: 'ok2',
    isFinal: true
  })

  stream.end()
}

function writeDestroy (stream) {
  stream.write({
    command: 'DESTROY',
    text: 'ok',
    isFinal: false
  })

  stream.destroy()
}

function writeDestroyWithError (stream) {
  stream.write({
    command: 'DESTROY_WITH_ERROR',
    text: 'ok',
    isFinal: false
  })

  stream.destroy(new Error('an error'))
}