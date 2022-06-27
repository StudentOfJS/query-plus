import { dataExpired, store } from "../utils";

const { remove, getData, setData, updateData } = store();

self.addEventListener(
	"message",
	(event) => {
		let {
			type,
			url,
			maxAge,
			newData
		} = event.data;
		if(type === "get") {
			getData(url).then(data => {
				if(dataExpired(data, maxAge)) {
					self.postMessage({
						type: "expired",
						url,
					});
				} else {
					self.postMessage({
						type: "get-success",
						url,
						data,
					});
				}
			}).catch((error) => {
				self.postMessage({
					type: "error",
					error,
					url,
				});
			})
		}
		if(type === "delete") {
			remove(url).then(() => {
				self.postMessage({
					type: "delete-success",
					url,
				});
			}).catch((error) => {
				self.postMessage({
					type: "error",
					error,
					url,
				});
			})
		}
		if(type === "set") {
			setData(url, newData).then(() => {
				self.postMessage({
					type: "set-success",
					url,
				});
			}).catch((error) => {
				self.postMessage({
					type: "error",
					error,
					url,
				});
			})
		}
		if(type === "update") {
			updateData(url, newData).then(() => {
				self.postMessage({
					type: "update-success",
					url,
				});
			}).catch((error) => {
				self.postMessage({
					type: "error",
					error,
					url,
				});
			})
		}
	},
);
