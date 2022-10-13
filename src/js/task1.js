export function promiseReduce(asyncFunctions, reduce, initialValue) {
  return asyncFunctions.reduce((p, fn) => {
    return p.then(async (pVal) => {
      return reduce(pVal, await fn());
    });
  }, Promise.resolve(initialValue));
}
