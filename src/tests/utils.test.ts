import { expect, test } from 'vitest'

import { isMatch, createArrayOfUpdates, DAY, dataExpired, methodType, poll, isObject } from "../lib/utils/index"

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

test('isMatch()', () => {
    expect(isMatch('test', 'test')).toBe(true)
    expect(isMatch('1', 1)).toBe(false)
    expect(isMatch({}, [])).toBe(false)
    expect(isMatch({
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

    expect(isMatch({
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
    expect(isMatch({
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
    expect(isMatch({
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

test('createArrayOfUpdates()', () => {
    let nochange = createArrayOfUpdates({
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
    })
    expect(nochange).toStrictEqual([])

    let changeArray = createArrayOfUpdates({
        test: {
            b: ['b', 'a'],
            a: {
                aa: 'the best'
            },
            
        }
    }, {
        test: {
            a: {
                aa: 'winner'
            },
            b: ['a', 'b']
        }
    })
    let change = JSON.stringify(changeArray)
    let testChange = JSON.stringify([ [ 'test.a', { aa: 'winner' } ] ])
    expect(change).toMatch(testChange)
})