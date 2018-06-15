import { Metadata, credentials } from 'grpc'
import { startGrpcServer, stopGrpcServer, SERVER_PORT } from './grpc/server'
import helloPkg from './grpc/proto'
import { wrapStream } from './utils'

function getGrpcClientStream () {
  const client = new helloPkg.HelloService(
    `localhost:${SERVER_PORT}`,
    credentials.createInsecure()
  )

  return client.HelloStream(new Metadata())
}

function normalGrpcReq () {
  return new Promise((resolve) => {
    console.log('\nNormal gRPC request - end() called after write\n')

    const s = wrapStream(getGrpcClientStream(), { logPrefix: 'grpc-client' })

    s.stream.on('end', () => {
      resolve()
    })

    s.write({
      command: 'DEFAULT'
    })

    s.end()
  })
}

function normalGrpcReq2 () {
  return new Promise((resolve) => {
    console.log('\nNormal gRPC request - end() called on end evt\n')

    const s = wrapStream(getGrpcClientStream(), { logPrefix: 'grpc-client' })

    s.stream.on('end', () => {
      resolve()
      s.end()
    })

    s.write({
      command: 'DEFAULT'
    })
  })
}

function reqWithServerDestroy () {
  return new Promise((resolve) => {
    console.log('\nRequest with server destroy()\n')

    const s = wrapStream(getGrpcClientStream(), { logPrefix: 'grpc-client' })

    s.stream.on('end', () => {
      resolve()
    })

    s.write({
      command: 'DESTROY'
    })

    s.end()
  })
}

function reqWithServerDestroyError () {
  return new Promise((resolve) => {
    console.log('\nRequest with server destroy() + error\n')

    const s = wrapStream(getGrpcClientStream(), { logPrefix: 'grpc-client' })

    s.stream.on('error', () => {
      resolve()
    })

    s.write({
      command: 'DESTROY_WITH_ERROR'
    })

    s.end()
  })
}

(async () => {
  console.log('======= GRPC TESTS ======')

  startGrpcServer()

  try {
    await normalGrpcReq()
  } catch (e) {
    console.error(e)
  }

  try {
    await normalGrpcReq2()
  } catch (e) {
    console.error(e)
  }

  try {
    await reqWithServerDestroy()
  } catch (e) {
    console.error(e)
  }

  try {
    await reqWithServerDestroyError()
  } catch (e) {
    console.error(e)
  }

  stopGrpcServer()
})()

