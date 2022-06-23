
const methodType = (options) => {
    if(options && options.method){
        return options.method.toUpperCase()
    } else {
        return 'GET'
    }
};
self.addEventListener('message', (event) => {
    const { type } = event.data;
    let controller = new AbortController();
    let signal = controller.signal;
    if (type === 'cancel') {
        controller.abort();
    }
    if (type === 'fetch') {
        const { url, options } = event.data;  
        fetch(url, options ? {...options, signal} : {signal}).then(
            (response) => {
                if (!response.ok || response.status === 404) {
                    throw new Error(`HTTP error! Status: ${ response.status }`);
                }
                if (response.status === 403) {
                    throw new Error(`Unauthorized!`);
                }
                return response.json();
            }
        ).then(data => {
            let method = methodType(options)
            self.postMessage({type: method, data});
            controller = void 0;
        }).catch(error => {
            self.postMessage({type: error.message || 'Unknown error'});
        })
    }
});
