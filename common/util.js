const debounce = (func, delayTime) => {
    let timeoutId = null;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(func.bind(null, ...args), delayTime);
    }
}