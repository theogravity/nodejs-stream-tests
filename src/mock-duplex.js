import { DuplexMock } from 'stream-mock'
import { wrapStream } from './utils'

function testError () {
  return new Promise((resolve) => {
    console.log('\n***** Testing emitting error w/o end()\n')

    const s = wrapStream(new DuplexMock({
      readableObjectMode: true,
      writableObjectMode: true
    }))

    s.stream.once('end', () => {
      resolve()
    })

    s.write({ a: 'test' })
    s.emit('error', new Error('testing'))
  })
}

function testErrorWithEnd () {
  return new Promise((resolve) => {
    console.log('\n***** Testing emitting error w/ end()\n')

    const s = wrapStream(new DuplexMock({
      readableObjectMode: true,
      writableObjectMode: true
    }))

    s.stream.once('end', () => {
      resolve()
    })

    s.write({ a: 'test' })
    s.emit('error', new Error('testing'))
    s.end()
  })
}

function testEnd () {
  return new Promise((resolve) => {
    console.log('\n***** Testing end()\n')

    const s = wrapStream(new DuplexMock({
      readableObjectMode: true,
      writableObjectMode: true
    }))

    s.stream.once('end', () => {
      resolve()
    })

    s.write({ a: 'test' })
    s.end()
  })
}

function testDestroy () {
  return new Promise((resolve) => {
    console.log('\n***** Testing destroy()\n')

    const s = wrapStream(new DuplexMock({
      readableObjectMode: true,
      writableObjectMode: true
    }))

    s.stream.once('end', () => {
      resolve()
    })

    s.write({ a: 'test' })
    s.destroy()
  })
}

function testDestroyErr () {
  return new Promise((resolve) => {
    console.log('\n***** Testing destroy() w/ Error\n')

    const s = wrapStream(new DuplexMock({
      readableObjectMode: true,
      writableObjectMode: true
    }))

    s.stream.once('end', () => {
      resolve()
    })

    s.write({ a: 'test' })
    s.destroy(new Error('testing'))
  })
}

function testPause () {
  return new Promise((resolve) => {
    console.log('\n***** Testing pause()/resume() w/o end()\n')

    const s = wrapStream(new DuplexMock({
      readableObjectMode: true,
      writableObjectMode: true
    }))

    s.stream.once('end', () => {
      resolve()
    })

    s.pause()
    s.write({ a: 'test' })
    s.resume()
  })
}

function testPauseEnd () {
  return new Promise((resolve) => {
    console.log('\n***** Testing pause()/resume() w end()\n')

    const s = wrapStream(new DuplexMock({
      readableObjectMode: true,
      writableObjectMode: true
    }))

    s.stream.once('end', () => {
      resolve()
    })

    s.pause()
    s.write({ a: 'test' })
    s.resume()
    s.end()
  })
}

(async () => {
  console.log('======= DUPLEX TESTS ======')

  try {
    await testError()
  } catch (e) {}

  try {
    await testEnd()
  } catch (e) {}

  try {
    await testErrorWithEnd()
  } catch (e) {}

  try {
    await testDestroy()
  } catch (e) {}

  try {
    await testDestroyErr()
  } catch (e) {}

  try {
    await testPause()
  } catch (e) {}

  try {
    await testPauseEnd()
  } catch (e) {}
})()
