
<img src="https://user-images.githubusercontent.com/20704726/176833898-05f85f35-e2c2-4496-b5ff-f02b03d45b0b.png" alt="Query+ logo"/> 

# Query+ 
### install

    yarn add query-plus
or
   

     pnpm add query-plus

or

    npm install query-plus

  
### import

    import { useFetch, usePreFetch } from "query-plus"

##  useFetch

 
useFetch is the main React hook of Query+.
  

    const { fetchWorker, data, error, loading } = useFetch()
    
    useEffect(() => {
      fetchWorker({ url: 'https://api.test.com' })
    }, []);

  

>  **ProTip:** You can use multiple **useFetch()** per component. Although you may be better off with a new component.

  

  

###  fetchWorker

  

    const handleFetch = (() => {
      fetchWorker({ url, preferUseCache, options, maxAge, middleware })
    });

  

>  **middleware**

  

middleware is a function that takes the json returned from the endpoint and processes it

  

    let middlware = (data) => ({ name: data.name, powers: data.attrs.filter(attr => attr.includes("power") })
    
    fetchWorker({ url: "http://api.test.com/trevor", middleware })

  

>  **maxAge**

  

maxAge is the maximum amount of time stored data is valid in ms.

*If the maxAge is exceeded, the data will be updated without checking for changes.*

  

>  **options**

  

same as the init variable from the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch)

 
>  **preferUseCache**

  

If this boolean is set to true and non-expired data exists in the DB, then the API will not be called.
 
 ##  usePreFetch
  This React hook is used to pre-fetch data from any endpoints that you want to use later in your site.

    usePreFetch([{  url:  'https://api.test/api/people/2/',  middleware:  (data:  any)  =>  ({name:  data?.name})  }, {url: 'https://api.test/api/properties/10'}])
usePrefetch to pre fetch data and save it for faster retrival later. It takes an  array of options. An option can have the following values:

 - url - the endpoint you want to fetch.
 - fetch - init options.
 - middleware - a function that accepts the json data, performs some action on the data and then returns it.
 - maxAge: the maximum time in ms that the data remains valid.
  
## Why Query+
We created Query+ as a React hook library, to make fetching, processing and caching data as easy as possible. 
### our goals

 - Simple to use
 - Real world performance gains
 - Works in modern browsers (sorry IE11 diehards, but it's offically dead)
 - Tiny bundle size (4kB minfied and gzipped)
 - Not all the things, just what makes sense.
 

Sometimes APIs are slow, sometimes you need to process the data before you consume it and occasionly you want to store the response for use later. These factors all have an impact on the performance and percieved performance of your site. Waiting for a slow api, stuck on a loading screen, this is a familiar and unpleasant problem. How about that filter and map transform you run on the data? This will add to the time your users are waiting behind a spinner. Do you have an api that usually returns the same JSON? Seems inefficient and a bad reason to keep your users waiting.

**Query+** tackles these issues by storing your api responses and only updating them when the new response differs from the stored data. This comparison and if you choose the middlware function you pass in for processing the response, runs in a **web worker** freeing the main thread for clientside interactions or whatever you want to prioritise. It means that your data is available immediatly, yet you aren't going to miss any updates.

  

![useFetch hook example](https://repository-images.githubusercontent.com/505699390/e7071961-16bf-4dc2-b31e-f72eca2940a5)

   ### technical
 Data fetching, data processing and data storage tasks run in a web worker. This is to leave the main thread available for more critical tasks, improving performance metrics and user experience.
 - tasks run in **web workers**
 - data stored in **indexedDB**
 - ideally the data in the response should be below 100kB per request. 
 - storage limit - At least 1GB, but can be up to 60% of remaining disk space.






Thanks to [Jake Archibald](https://github.com/jakearchibald) for creating [idb-keyval](https://github.com/jakearchibald/idb). Enabling us to easily access indexedDB with a really nice promise based api.
