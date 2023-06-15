// Simply testing how a "promise" works with a timer.
//
// I think using "then" is pretty clumsy but here it is.

const timeoutFunction = msg => {
    /*
    Return a promise,
    wait a second (1000)
    return a message.
    */
    return new Promise(resolve => {
        let returnMsg;
        setTimeout(() => {
            console.log("input=", msg)
            returnMsg = (msg + " world");
            resolve(returnMsg)
        }, 3000);
    });
}

const followUp = msg => {
    console.log("FollowUp:", msg);
}

console.log("Loading promises.js");
timeoutFunction("Hello").then( (timeout) => {
    followUp(timeout);
});

// Promise chain:
// Here is an example with several functions that
// have to execute in order, stacked up with "then" method calls.
// Shows how increasingly clumsy this pattern gets.

let oneFunction = arg => {
    return new Promise(resolve => {
        setTimeout(() => {
            let returnVal = arg + ' one';
            console.log("One says ", returnVal);
            resolve(returnVal);
        }, 1000);
    });
};

let twoFunction = arg => {
    return new Promise(resolve => {
        setTimeout(() => {
            let returnVal = arg + ' two';
            console.log("Two says ", returnVal);
            resolve(returnVal);
        }, 500);
    });
};

let threeFunction = arg => {
    return new Promise(resolve => {
        setTimeout(() => {
            let returnVal = arg + ' three';
            console.log("Three says ", returnVal);
            resolve(returnVal);
        }, 500);
    });
};

oneFunction("zero").then(val => {
    twoFunction(val).then(val => {
        threeFunction(val)
    });
});

// This does the same thing as the promise chain
// but it is vastly more readable!
//
// "async" here means I won't return until my await(s) run.
const wait4all = async arg => {
    let one = await oneFunction(arg); // call oneFunction and block...
    let two = await twoFunction(one);
    let three = await threeFunction(two);
    console.log("Finally, ", three); // This won't execute until the awaits are done.
}

console.log("Onward")
wait4all("and a");
