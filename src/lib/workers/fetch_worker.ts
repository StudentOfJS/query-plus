import {
	deserializeFunction,
	methodType,
	isMatch,
	dataExpired,
	isObject,
	store,
} from "../utils";

import PollWorker from "./polling_worker.js?worker&inline";

import type { WorkerResponseType, ValueType, FetchWorkerBaseRequestType } from "../types";

const { remove, getData, setData, updateData } = store();

const handleResponse = (response: Response) => {
	if (!response.ok || response.status === 404) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	if (response.status === 403) {
		throw new Error(`Unauthorized!`);
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
	(event) => {
		const { type } = event.data;
		let controller: AbortController | undefined = new AbortController();
		let signal = controller?.signal;
		let pollWorker = new PollWorker();
		if (type === "cancel") {
			controller?.abort();
			pollWorker?.postMessage({ type: "cancel" });
			pollWorker.terminate();
		}
		if (type === "poll") {
			let {
				existingData,
				url,
				options,
				interval,
				maxAttempts,
				compareKeys,
			} = event.data;
			fetch(url, options ? { ...options, signal } : { signal })
				.then(handleResponse)
				.then(
					(data: unknown) => {
						if (isMatch(existingData, data, compareKeys)) {
							self.postMessage({ type: "CACHED", data });
						} else {
							setData(url, { timestamp: Date.now(), data });
							self.postMessage({ type: "DATA", data });
						}
					},
				)
				.catch(handleError)
				.finally(() => {
					pollWorker?.postMessage({
						type,
						url,
						options,
						interval,
						maxAttempts,
						existingData,
						compareKeys,
					});
				});
			pollWorker?.addEventListener(
				"message",
				({ data }: WorkerResponseType) => {
					self.postMessage(data);
				},
			);
		}

		if (type === "pre-fetch") {
			let { prefetch } = event.data;
			prefetch.forEach((d: FetchWorkerBaseRequestType) => {
				getData(d.url.toString())
					.then(
						(value: ValueType) => {
							if (!value) {
								throw new Error("no value found in db");
							}
							if (dataExpired(value?.maxAge, value?.timestamp)) {
								remove(d.url.toString());
								throw new Error("data expired");
							}
						},
					)
					.catch(() => {
						fetch(d.url.toString(), { signal, ...d.options! }).then(
							handleResponse,
						).then(data => {
							let x = d.middleware ? d.middleware(data) : data;
							setData(d.url.toString(), { timestamp: Date.now(), data: x, maxAge: d.maxAge! });
						}).catch(() => { console.info("no data found") });
					});
			})
		}

		if (type === "fetch") {
			let {
				existingData,
				url,
				options,
				maxAge,
				middleware,
				update,
			} = event.data;
			const handleData = (data: unknown) => {
				if (middleware) {
					let fn = deserializeFunction(middleware);
					data = fn(data);
				}
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
							console.info("couldn't access indexedDB to save data");
						});
				}
				self.postMessage({ type: "COMPLETE" });
			};
			let method = methodType(options);
			if (method === "DELETE") {
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
				getData(url.toString())
					.then(
						(value: ValueType) => {
							if (!value) {
								throw new Error("no value found in db");
							}
							if (dataExpired(value?.maxAge, value?.timestamp)) {
								remove(url.toString());
								throw new Error("data expired");
							}
							self.postMessage(
								isMatch(existingData, value?.data) ? { type: "CACHED" } : {
									type: "PRE_LOAD",
									data: value?.data,
								},
							);
						},
					)
					.catch((err) => {
						console.info(err?.message);
					});
				fetch(url, options ? { ...options, signal } : { signal }).then(
					handleResponse,
				).then(handleData).catch(handleError);
			}
			if (method === "PUT" || method === "POST") {
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
									console.info("update store failed");
								})
								.finally(() => {
									self.postMessage({ type: "COMPLETE" });
								});
						}
					})
					.catch(handleError);
			}
		}
	},
);
