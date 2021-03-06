import {
	deserializeFunction,
	methodType,
	isMatch,
	dataExpired,
	isObject,
	store,
} from "../utils";

import type { ValueType, FetchWorkerRequestType } from "../types";

const { remove, getData, setData, updateData } = store();

const handleResponse = (response: Response) => {
	if (!response.ok || response.status === 404) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	if (response.status === 403) {
		throw new Error(`403 Unauthorized`);
	}
	return response.json();
};
const handleError = (error: Error) => {
	self.postMessage({
		type: error.message || "Unknown error",
	});
};
self.addEventListener(
	"message",
	async (event) => {
	if(event.isTrusted) {
		const { type } = event.data;
		let controller: AbortController | undefined = new AbortController();
		let signal = controller?.signal;

		if (type === "cancel") {
			controller?.abort();
		}
		if (type === "pre-fetch") {
			let { prefetch } = event.data;
			prefetch.forEach(({ middleware, url, options, maxAge }: FetchWorkerRequestType) => {
				let fn = deserializeFunction(middleware);
				fetch(url.toString(), { signal, ...options! }).then(
					handleResponse,
				).then(data => {
					setData(url.toString(), { timestamp: Date.now(), data: fn(data), maxAge: maxAge })
						.then(() => { console.log(`saved prefetch ${url}`) })
						.catch((err: Error) => { console.log(`error saving prefetch ${url}`, err) });
				}).catch(() => { console.info("no data found") });
			})
			self.postMessage({ type: "PREFETCH_COMPLETE" });
		}

		if (type === "fetch") {
			let {
				existingData,
				preferUseCache,
				url,
				options,
				maxAge,
				middleware,
				update,
			} = event.data;
			const handleData = (data: unknown) => {
				let fn = deserializeFunction(middleware);
				data = fn(data);
				let hasChanged = !existingData || !isMatch(existingData, data);
				if (hasChanged) {
					self.postMessage({ type: "DATA", data });
					setData(
						url.toString(),
						{
							data,
							timestamp: Date.now(),
							maxAge,
						},
					)
						.then(() => {
							console.info("saved data");
						})
						.catch(() => {
							console.error("couldn't access indexedDB to save data");
						});
				}
				self.postMessage({ type: "COMPLETE" });
			};
			let method = methodType(options);
			if (method === "DELETE") {
				self.postMessage({type: "LOADING"});
				remove(url.toString());
				fetch(url, options)
					.then(() => {
						if (update) {
							fetch(update.url, update.options)
								.then(handleResponse)
								.then(handleData)
								.catch((err) => {
									throw err;
								});
						} else {
							self.postMessage({ type: "COMPLETE" });
						}
					})
					.catch(handleError);
			}
			if (method === "GET") {
				let fetchData = await getData(url.toString())
					.then(
						(value: ValueType) => {
							if (!value || dataExpired(value?.maxAge, value?.timestamp)) {
								value && remove(url.toString());
								return true;
							}
							let match = isMatch(value?.data, existingData);
							let postMessageData = {
								type: preferUseCache ? "DATA" : match ? "CACHED" : "PRE_LOAD",
								data: !preferUseCache && match ? undefined : value?.data,
							};
							self.postMessage(postMessageData);
							return false
						}						
					)
					.catch((err: Error) => {
						console.info(err?.message);
						preferUseCache = false;
					});
					if (!preferUseCache || fetchData) {
						self.postMessage({type: "LOADING"});
						fetch(url, options ? { ...options, signal } : { signal }).then(
							handleResponse,
						).then(handleData).catch(handleError)
					}
			}
			if (method === "PUT" || method === "POST") {
				self.postMessage({type: "LOADING"});
				fetch(url, options ? { ...options, signal } : { signal })
					.then(handleResponse)
					.then((data) => {
						if (update) {
							fetch(update.url, update.options)
								.then(handleResponse)
								.then(handleData)
								.catch((err) => {
									throw err;
								});
						} else {
							updateData(
								url.toString(),
								(oldValue: ValueType) => {
									let timestamp = Date.now();
									let newData = isObject(data) && isObject(oldValue?.data) ? {
										...oldValue.data,
										...data,
									} : data;
									self.postMessage({ type: method, data: newData });
									return { timestamp, maxAge, data: newData };
								},
							)
								.catch(() => {
									console.error("update store failed");
								})
								.finally(() => {
									self.postMessage({ type: "COMPLETE" });
								});
						}
					})
					.catch(handleError);
			}
		}

	}
		
	},
);
