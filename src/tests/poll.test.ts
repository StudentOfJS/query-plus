import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { poll } from '../lib/utils'


describe('poll function', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})
  afterEach(() => {
    vi.restoreAllMocks()
    vi.clearAllTimers()
  })
	const validate = vi.fn((res) => {
		return res === true
	})
	const fn =  vi.fn(async () => {
		await setTimeout(()=> true, 1)
	})

  it('should call fn', () => {
    poll({ fn, validate, interval: 1000, maxAttempts: 2 })
		vi.advanceTimersByTime(500)
		expect(fn).toHaveBeenCalled()
  })
	it('should call validate', () => {
    poll({ fn, validate, interval: 1000, maxAttempts: 2 })
		vi.advanceTimersByTime(500)
		expect(validate).toHaveBeenCalled();
  })
	it('should return the result of a positive validation', () => {
    let result = poll({ fn, validate, interval: 1000, maxAttempts: 2 }).then(res => res).catch(err => err?.message ?? "error")
		vi.advanceTimersByTime(500)
		expect(result).toBeTruthy();
  })
})
