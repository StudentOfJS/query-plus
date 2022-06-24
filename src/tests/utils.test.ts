import { expect, test } from 'vitest'

import { compareJSON, DAY, dataExpired, methodType, poll, isObject } from "../lib/utils/index"

test('dataExpired()', () => {
    let twoDaysAGo = Date.now() - DAY * 2
    expect(dataExpired(DAY)).toBe(true)
    expect(dataExpired(DAY, twoDaysAGo)).toBe(true)
    expect(dataExpired(DAY, Date.now() -( 60 * 60 * 1000))).toBe(false)
  })
  
test('methodType()', () => {
    const options = {
        method: 'delete',
    }
    expect(methodType(options)).toBe('DELETE')
    expect(methodType(undefined)).toBe('GET')
})

test('isObject()', () => {
    const test = {
        method: 'delete',
    }

    expect(isObject(test)).toBeTruthy()
    expect(isObject("test")).toBeFalsy()
    expect(isObject([test])).toBeFalsy()
})

test('compareJSON()', () => {
    expect(compareJSON('test', 'test')).toBe(true)
    expect(compareJSON('1', 1)).toBe(false)
    expect(compareJSON({}, [])).toBe(false)
    expect(compareJSON({
        test: {
            a: {
                aa: 'winner'
            },
            b: ['a', 'b']
        }
    }, {
        test: {
            a: {
                aa: 'winner'
            },
            b: ['a', 'b']
        }
    })).toBe(true)

    expect(compareJSON({
        test: {
            a: {
                aa: 'winner'
            },
            b: ['a', 'b']
        }
    }, {
        test: {
            a: {
                aa: 'winner'
            },
            b: ['a', 'c']
        }
    })).toBe(false)
    expect(compareJSON({
        test: {
            b: ['a', 'b'],
            a: {
                aa: 'winner'
            },
            
        }
    }, {
        test: {
            a: {
                aa: 'winner'
            },
            b: ['a', 'b']
        }
    })).toBe(true)
    expect(compareJSON({
        test: {
            b: ['b', 'a'],
            a: {
                aa: 'winner'
            },
            
        }
    }, {
        test: {
            a: {
                aa: 'winner'
            },
            b: ['a', 'b']
        }
    })).toBe(true)
})