const RETRY_COUNT  = 5;

function getPromise() {
    const num = Math.floor(Math.random()*100);
    return new Promise((resolve, reject) => {
        if(num%2 === 0) {
            resolve("Hi")
        } else {
            reject("bye")
        }
    })
}

async function promiseWithRetry( p, retryCount) {
    console.log("retryinggg: ", RETRY_COUNT - retryCount + 1);
    try {
        const result = await p;
        console.log("resolve count :", RETRY_COUNT - retryCount + 1);
        return p;
    }
    catch(err) {
       if(retryCount === 0) {
           throw new Error(err)
       } else {
           return promiseWithRetry(getPromise(), retryCount - 1);
       }
    }
}

promiseWithRetry(getPromise(), RETRY_COUNT).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});