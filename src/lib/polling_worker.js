const poll = async ({ fn, validate, interval, maxAttempts }) => {
    let attempts = 0;
    const executePoll = async (resolve, reject) => {
        try {
            const result = await fn();
            attempts++;
            if (validate(result)) {
              return resolve(result);
            } else if (maxAttempts && (attempts === maxAttempts)) {
              return reject(new Error('Exceeded max attempts'));
            } else {
              setTimeout(executePoll, interval, resolve, reject);
            }
        } catch (error) {
            console.error(`polling Error: ${error.message || ""}`);
        }
    };
    return new Promise(executePoll);
  };

  const isObject = obj => typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

  const flattenObjectToArray = (obj, parent, flatObj = {}) => {
    Object.keys(obj).forEach(key => {
      let next = parent ? parent + '.' + key : key;
      if (typeof obj[key] === 'object') {
        flattenObjectToArray(obj[key], next, flatObj);
      } else {
        flatObj[next] = obj[key];
      }
    })
    return Object.entries(flatObj).sort();
  }
  const flattenAndSortArray = arr => arr.flatMap(x => isObject(x) ? flattenObjectToArray(x) : [x]).sort();
  
  const compareJSON = (a,b, compareKeys) => {
    let typeofA = Array.isArray(a) ? 'array' : typeof a;
    let typeofB = Array.isArray(b) ? 'array' : typeof b;
    if (typeofA !== typeofB) return false;
    if(typeofA !== 'object' && typeofA !== 'array') return typeofA === typeofB;
    if(compareKeys && typeofA === 'object') {
        return compareKeys.map(key => a[key] === b[key]).every(x => x)
    }
    if(typeofA === 'array') {
        a = flattenAndSortArray(a);
        b = flattenAndSortArray(b);
    }
    if(!compareKeys && typeofA === 'object') {
        a = flattenObjectToArray(a);
        b = flattenObjectToArray(b);
    }
    return JSON.stringify(a) === JSON.stringify(b)
  }

self.addEventListener('message', (event) => {
    const { type } = event.data;
    let controller = new AbortController();
    let signal = controller.signal;
    if (type === 'cancel') {
        controller.signal.abort();
    }
    if (type === 'poll') {
        const { url, options, interval, maxAttempts, currentJSON, compareKeys } = event.data;
        const validate = (newJson) => !compareJSON(currentJSON, newJson, compareKeys);
        const getData = fetch(url, options ? {...options, signal} : {signal}).then(
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