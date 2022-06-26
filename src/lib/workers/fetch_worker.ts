import { del, get, set, update, createStore } from "idb-keyval";
import {
	deserializeFunction,
	methodType,
	isMatch,
	dataExpired,
	isObject,
} from "../utils";

import type { UseStore } from "idb-keyval";

type ValueType = { timestamp: number, maxAge: number, data: any }

const DB_NAME = "usestore-db";
const DB_STORE = "usestore-db";
const store: UseStore = createStore(DB_NAME, DB_STORE);
const remove = (key: IDBValidKey) => del(key, store);
const getData = (key: IDBValidKey) => get(key, store);
const setData = (key: IDBValidKey, value: unknown) => set(key, value, store);
const updateData = (key: IDBValidKey, updater: (oldValue: any) => any) => update(key, updater, store)
const handleResponse = (response: Response) => {
	if (!response.ok || response.status === 404) {
		throw new Error(
			`HTTP error! Status: ${response.status}`,
		);
	}
	if (response.status === 403) {
		throw new Error(`Unauthorized!`);
	}
	return response.json();
}
const handleError = (error: Error) => {
	self.postMessage({
		type: error.message || "Unknown error",
	});
}
self.addEventListener(
	"message",
	(event) => {
		const { type } = event.data;
		let controller: AbortController | undefined = new AbortController();
		let signal = controller?.signal;
		if (type === "cancel") {
			controller?.abort();
		}

		if (type === "fetch") {
			let { existingData, url, options, maxAge, middleware, update } = event.data;
			const handleData = (data: unknown) => {
				if (middleware) {
					let fn = deserializeFunction(middleware);
					data = fn(data);
				}
				let hasChanged = !existingData || !isMatch(existingData, data);
				if (hasChanged) {
					self.postMessage({ type: "DATA", data });
					setData(url.toString(), {
						data,
						timestamp: Date.now(),
						maxAge,
					})
						.then(() => { console.info("saved data") })
						.catch(() => { console.info("couldn't access indexedDB to save data") })
				}
				self.postMessage({ type: "COMPLETE" });
			}
			let method = methodType(options);
			if (method === "DELETE") {
				remove(url.toString());
				fetch(url, options)
					.then(() => {
						if (update) {
							fetch(update.url, update.options)
								.then(handleResponse)
								.then(handleData)
								.catch((err) => { throw err })
						} else {
							self.postMessage({ type: "COMPLETE" });
						}
					})
					.catch(handleError)
			}
			if (method === "GET") {
				getData(url.toString())
					.then((value: ValueType) => {
						if (!value) {
							throw new Error("no value found in db");
						}
						if (dataExpired(value?.maxAge, value?.timestamp)) {
							remove(url.toString());
							throw new Error("data expired");
						}
						self.postMessage(isMatch(
							existingData, value?.data)
								?{ type: "CACHED" } 
								: {
									type: "PRE_LOAD",
									data: value?.data,
								});
					})
					.catch((err) => {
						console.info(err?.message);
					});
				fetch(url, options ? { ...options, signal } : { signal })
					.then(handleResponse)
					.then(handleData)
					.catch(handleError);
			}
			if (method === "PUT" || method === "POST") {
				fetch(url, options ? { ...options, signal } : { signal })
					.then(handleResponse)
					.then(data => {
						if (update) {
							fetch(update.url, update.options)
								.then(handleResponse)
								.then(handleData)
								.catch((err) => { throw err })
						} else {
							updateData(url.toString(), (oldValue: ValueType) => {
								let timestamp = Date.now();
								let newData = isObject(data) && isObject(oldValue?.data) ? { ...oldValue.data, ...data } : data;
								self.postMessage({ type: method, data: newData });
								return { timestamp, maxAge, data: newData }
							})
								.catch(() => {
									console.info("update store failed")
								})
								.finally(() => {self.postMessage({ type: "COMPLETE" });})
							
						}
					})
					.catch(handleError)
			}
		}
	},
);
