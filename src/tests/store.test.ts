import { beforeEach, expect, test, describe } from 'vitest'
import { ValueType } from '../lib/types';
import { promisifyRequest, store } from '../lib/utils/store_tools';
import 'fake-indexeddb/auto';
beforeEach(() => {
    (async () => { await promisifyRequest(indexedDB.deleteDatabase('query-db'))})()
})

describe('store', () => {
    const { del, get, set, put, clear } = store();
    let timestamp = Date.now();
    let maxAge = 1000;
    test('set', () => {
        set('key', {data: 'value', timestamp, maxAge}).then(() => {
            get('key').then(value => {
                expect(value?.data).toEqual('value');
            }).catch(() => expect(true).toBe(false))
        }).catch(() => expect(true).toBe(false))
    });
    test('get', () => {
        get('key').then(value => {
            expect(value?.data).toEqual('value');
        }).catch(() => expect(true).toBe(false))
    });
    test('put', () => {
        put('key', (oldValue: ValueType) => ({...oldValue, data: oldValue.data + '1'}))
            .then(() => {
                get('key').then(value => {
                    expect(value?.data).toEqual('value1');
                })
            })
            .catch(() => expect(true).toBe(false))
    });
    test('del', () => {
        del('key').then(() => {
            get('key').then(value => {
                expect(value).toBe(undefined);
            }).catch(() => expect(true).toBe(false))
        }).catch(() => expect(true).toBe(false))
    });
    test('clear', () => {
        set('key', {data: 'value', timestamp, maxAge}).then(() => {
            get('key').then(value => {
                expect(value?.data).toEqual('value');
                clear().then(() => {
                    get('key').then(value => {
                        expect(value).toBe(undefined);
                    }).catch(() => expect(true).toBe(false))
                }).catch(() => expect(true).toBe(false))
            }).catch(() => expect(true).toBe(false))
        }).catch(() => expect(true).toBe(false))
    });
});
