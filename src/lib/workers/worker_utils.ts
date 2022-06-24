
interface PollProps { 
  fn: () => void
  validate: (res: unknown) => boolean
  interval: number
  maxAttempts: number
}
export const poll: ({ fn, validate, interval, maxAttempts }: PollProps) => Promise<unknown> = async ({ fn, validate, interval, maxAttempts }) => {
    let attempts = 0;
    async function executePoll(resolve: (value: unknown) => void, reject: (reason?: any) => void) {
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
        console.error(`polling Error: ${(error as Error)?.message || "connection failed"}`);
      }
  }
    return new Promise(executePoll);
  };

export const isObject = (obj: unknown) => typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

export const flattenObjectToArray = (obj: Record<string, any>, parent?:string, flatObj: Record<string, any> = {}) => {
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

export const flattenAndSortArray = (arr: Array<any>) => arr.flatMap(x => isObject(x) ? flattenObjectToArray(x) : [x]).sort();
  
export const compareJSON = (a: unknown, b: unknown, compareKeys?: Array<string>) => {
    let typeofA = Array.isArray(a) ? 'array' : typeof a;
    let typeofB = Array.isArray(b) ? 'array' : typeof b;
    if (typeofA !== typeofB) return false;
    if(typeofA !== 'object' && typeofA !== 'array') return typeofA === typeofB;
    if(compareKeys && typeofA === 'object') {
        return compareKeys.map(key => (a as Record<string, any>)[key] === (b as Record<string, any>)[key]).every(x => x)
    }
    if(typeofA === 'array') {
        a = flattenAndSortArray((a as Array<any>));
        b = flattenAndSortArray((b as Array<any>));
    }
    if(!compareKeys && typeofA === 'object') {
        a = flattenObjectToArray((a as Record<string, any>));
        b = flattenObjectToArray((b as Record<string, any>));
    }
    return JSON.stringify(a) === JSON.stringify(b)
  }

export const methodType = (options:  RequestInit | undefined) => options?.method?.toUpperCase() ?? 'GET';

