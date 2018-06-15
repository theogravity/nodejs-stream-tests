import http from 'http'
import { wrapStream } from './utils'

function testReqNormal () {
  return new Promise((resolve) => {
    console.log('\n***** Testing normal request\n')

    const options = {
      host: 'www.google.com',
    }

    const req = wrapStream(http.get(options, (r) => {
      const res = wrapStream(r, { logPrefix: '<-- res' })

      res.stream.on('end', () => {
        resolve()
      })
    }), { logPrefix: '--> req'})

    req.end()
  })
}

function testResDestroy () {
  return new Promise((resolve) => {
    console.log('\n***** Testing valid host, error response w/ destroy\n')

    const options = {
      host: 'www.google.com',
    }

    const req = wrapStream(http.get(options, (r) => {
      const res = wrapStream(r, { logPrefix: '<-- res' })

      res.stream.on('data', () => {
        res.destroy(new Error('test'))
      })

      res.stream.on('end', () => {
        resolve()
      })
    }), { logPrefix: '--> req'})

    req.end()
  })
}

function testResDestroyNoError () {
  return new Promise((resolve) => {
    console.log('\n***** Testing valid host w/ destroy\n')

    const options = {
      host: 'www.google.com',
    }

    const req = wrapStream(http.get(options, (r) => {
      const res = wrapStream(r, { logPrefix: '<-- res' })

      res.stream.on('data', () => {
        res.destroy()
      })

      res.stream.on('end', () => {
        resolve()
      })
    }), { logPrefix: '--> req'})

    req.end()
  })
}

(async () => {
  console.log('======= REQUEST TESTS ======')

  try {
    await testReqNormal()
  } catch (e) {}

  try {
    await testResDestroy()
  } catch (e) {}

  try {
    await testResDestroyNoError()
  } catch (e) {}
})()

