import {isMatch, poll} from "../utils"
self.addEventListener('message', (event) => {
    const { type } = event.data;
    let controller: AbortController | undefined = new AbortController();
    let signal = controller?.signal;
    if (type === 'cancel') {
        controller?.abort();
    }
    if (type === 'poll') {
        const { url, fetchOptions, interval, maxAttempts, currentJSON, compareKeys } = event.data;
        const validate = (newJson: unknown) => !isMatch(currentJSON, newJson, compareKeys);
        const getData = () => fetch(url, fetchOptions ? {...fetchOptions, signal} : {signal}).then(
            (response) => {
                if (!response.ok || response.status === 404) {
                    throw new Error(`HTTP error! Status: ${ response.status }`);
                }
                if (response.status === 403) {
                    throw new Error(`Unauthorized!`);
                }
                return response.json();
            }
        )
        poll({
            fn: getData,
            interval,
            maxAttempts,
            validate
        })
            .then(data => {
                self.postMessage({type: 'success', data});
                controller = void 0;
            }).catch(error => {
                self.postMessage({type: error.message || 'Unknown error'});
            })
    }
});