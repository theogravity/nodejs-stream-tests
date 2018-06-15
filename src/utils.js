import shortid from 'shortid'

export function wrapStream (stream, { logPrefix = '' } = {}) {
  logPrefix = shortid() + ' ' + logPrefix

  addHandlers(stream, { logPrefix })

  return {
    stream,
    emit: (evt, fn) => {
      console.log('[' + logPrefix + '] Emitted:', evt)
      stream.emit(evt, fn)
    },
    write: (data) => {
      console.log('[' + logPrefix + '] Called write()', data)
      stream.write(data)
    },
    finished: () => {
      console.log('[' + logPrefix + '] Called finished()')
      stream.finished()
    },
    end: () => {
      console.log('[' + logPrefix + '] Called end()')
      stream.end()
    },
    destroy: (err) => {
      if (err) {
        console.log('[' + logPrefix + '] Called destroy() -', err.message)
      } else {
        console.log('[' + logPrefix + '] Called destroy()')
      }

      stream.destroy(err)
    },
    pause: () => {
      console.log('[' + logPrefix + '] Called pause()')
      stream.pause()
    },
    resume: () => {
      console.log('[' + logPrefix + '] Called resume()')
      stream.resume()
    }
  }
}

function addHandlers (stream, { logPrefix = '' } = {}) {
  stream.on('connect', () => {
    console.log('[' + logPrefix + '] Event: connect')
  })

  stream.on('response', () => {
    console.log('[' + logPrefix + '] Event: response')
  })

  stream.on('socket', () => {
    console.log('[' + logPrefix + '] Event: response')
  })

  stream.on('aborted', () => {
    console.log('[' + logPrefix + '] Event: aborted')
  })

  stream.on('close', () => {
    console.log('[' + logPrefix + '] Event: close')
  })

  stream.on('drain', () => {
    console.log('[' + logPrefix + '] Event: drain')
  })

  stream.on('error', (err) => {
    console.log('[' + logPrefix + '] Event: error -', err.message)
  })

  stream.on('finish', () => {
    console.log('[' + logPrefix + '] Event: finish')
  })

  stream.on('pipe', () => {
    console.log('[' + logPrefix + '] Event: pipe')
  })

  stream.on('unpipe', () => {
    console.log('[' + logPrefix + '] Event: unpipe')
  })

  stream.on('data', (data) => {
    console.log('[' + logPrefix + '] Event: data', data)
  })

  stream.on('end', () => {
    console.log('[' + logPrefix + '] Event: end')
  })

  stream.on('readable', () => {
    console.log('[' + logPrefix + '] Event: readable')
  })
}
