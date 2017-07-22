// @flow

const isBrowser = typeof window !== 'undefined'

export type ErrorDefinition = Error | {
  name: string,
  message: string,
  stack: string[]
}

export function errorToObject(err: Error): ErrorDefinition {
  return isBrowser ? err : {
    name: err.name,
    message: err.message,
    stack: err.stack.split('\n').slice(1).map(line => line.replace(/^\s+/, ''))
  }
}