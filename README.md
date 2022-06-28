#  Query+

  

Sometimes APIs are slow, sometimes you need to process the data before you consume it and occasionly you want to store the response for reuese later. These factors all have an impact on the performance and percieved performance of your site. Waiting for a slow api, stuck on a loading screen, this is a familiar and unpleasant problem that we all encounter at some point. How about that filter and map transform you run on the data? This will add to the time your users are waiting behind a spinner. Do you have an api that usually returns the same JSON each time it's called? Seems inefficient and bad reason to keep your users waiting

**Query+** tackles these issues by storing your api responses in a persistent database and only updating them when the new response differs from the stored data. This comparison and if you choose the middlware function you pass in for processing the response, runs in a **web worker** freeing the main thread for clientside interactions or whatever you want to prioritise. It means that your data is available immediatly, yet you aren't going to miss any updates.

![useFetch hook example](https://repository-images.githubusercontent.com/505699390/e7071961-16bf-4dc2-b31e-f72eca2940a5)

##  getting started

npm i query-plus@0.6.0

yarn add query-plus@0.6.0

pnpm add query-plus@0.6.0

##  useFetch

  

useFetch is the react hook that we provide to make using Query+ a breeze.

  

    const { fetchWorker, data, error, loading } = useFetch()
    
    useEffect(() => {
    fetchWorker({ url: 'https://swapi.dev/api/people/3/' })
    }, []);

>  **ProTip:** You can use multiple **useFetch()** per component. Although you may be better off with a new component.

  

###  fetchWorker

    const handleFetch = (() => {
    fetchWorker({ url, fetchOptions, maxAge, middleware })
    });

> **middleware**

middleware is a function that takes the json returned from the endpoint and processes it

    let middlware = (data) => ({ name: data.name, powers: data.attrs.filter(attr => attr.includes("power") })
    fetchWorker({ url: "http://api.test.com/trevor", middleware })

> **maxAge**

maxAge is the maximum amount of time stored data is valid in ms.
*If the maxAge is exceeded, the data will be updated without checking for changes.*

> **fetchOptions**

same as the init variable from the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch)

Thanks to [Jake Archibald](https://github.com/jakearchibald) for creating [idb-keyval](https://github.com/jakearchibald/idb). We use it to store our data on indexedDB.
