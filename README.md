# Welcome to React Fetch!

Sometimes APIs are slow, sometimes you need to process the data before you consume it and occasionly you want to store the response for reuese later. These factors all have an impact on the performance and percieved performance of your site. Waiting for a slow api, stuck on a loading screen, this is a familiar and unpleasant problem that we all encounter at some point. How about that filter and map transform you run on the data? This will add to the time your users are waiting behind a spinner. Do you have an api that usually returns the same JSON each time it's called? Seems inefficient and bad reason to keep your users waiting
**ReactFetch** tackles these issues by storing your api responses in a persistent database and only updating them when the new response differs from the stored data. This comparison and if you choose the middlware function you pass in for processing the response, runs in a **web worker** freeing the main thread for clientside interactions or whatever you want to prioritise. It means that your data is available immediatly, yet you aren't going to miss any updates. 
![useFetch hook example](https://repository-images.githubusercontent.com/505699390/e7071961-16bf-4dc2-b31e-f72eca2940a5)
# useFetch

useFetch is the react hook that we provide to make using ReactFetch a breeze.

        const  {  fetchWorker,  data,  error,  loading  }  =  useFetch()
        useEffect(()  =>  {
    fetchWorker({  url:  'https://swapi.dev/api/people/3/'  })
    },  []);
> **ProTip:** You can use multiple **useFetch()** per component. Although you may be better off with a new component.




## useStore

useStore is a react hooks wrapper around [Jake Archibald's](https://github.com/jakearchibald) excellent [idb-keyval](https://github.com/jakearchibald/idb-keyval) library. You can use all the same promises, plus we've added one more __dangerouslyNukeAllStores, but please don't use it :-)

    const  {  del,  get,  set,  update  }  =  useStore()

## usePolling

@todo - currently under development


# Inspiration

Jake and Surma's [shows on youtube](https://www.youtube.com/c/GoogleChromeDevelopers) have been a massive inspiration for me, without them I would likely have never found out about web workers or indexedDB. They have made web development more exciting and expanded my understanding. Forever grateful.