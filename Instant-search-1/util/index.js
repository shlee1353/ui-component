export const debounce = (func, delayTime) => {
    let timeout = null;
    return (...args) => {
        // q2. debounce 기능을 구현하시오.
        // TODO: Write JS code here!'
        clearTimeout(timeout);

        timeout = setTimeout(func.bind(null, ...args), delayTime);
    }
}
