
const { Logger } = require('./logger');

describe('Logger', () => {
  it('should return valid date', () => {
    var writer = jest.fn()
    var logger = new Logger(null, writer)
    logger.debug('Hello')

    expect(writer).toBeCalled()
    expect(writer.mock.calls[0][0]).toHaveProperty('time')
    expect(writer.mock.calls[0][0].time).toBeInstanceOf(Date)
  })

  it('should generate valid log level', () => {
    var writer = jest.fn()
    var logger = new Logger(null, writer)
    logger.debug('Hello')
    logger.info('Word')
    logger.warn('I am')
    logger.error('Samwell')

    expect(writer).toBeCalled()
    expect(writer.mock.calls).toHaveLength(4)
    expect(writer.mock.calls[0][0]).toMatchObject({level: 'debug'})
    expect(writer.mock.calls[1][0]).toMatchObject({level: 'info'})
    expect(writer.mock.calls[2][0]).toMatchObject({level: 'warn'})
    expect(writer.mock.calls[3][0]).toMatchObject({level: 'error'})
  })

  it('should format string', (done) => {
    var writer = log => {
      expect(log.msg).toBe('Hello name (12)')
      done()
    }
    var logger = new Logger(null, writer)
    logger.info('Hello %s (%d)', 'name', 12)
  })

  it('should return context', (done) => {
    var writer = log => {
      expect(log.context).toMatchObject({test: 123})
      done()
    }
    var logger = new Logger(null, writer)
    logger.info('Hello', {test: 123})
  })

  it('should format string & also return context', (done) => {
    var writer = log => {
      expect(log.msg).toBe('Hello other (21)')
      expect(log.context).toMatchObject({test: 234})
      done()
    }
    var logger = new Logger(null, writer)
    logger.info('Hello %s (%d)', 'other', 21, {test: 234})
  })
})
