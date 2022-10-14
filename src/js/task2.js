export function sum(...args) {
    if (args.length === sum.prototype.calls) {
      return args.reduce((prev, curr) => prev + curr, 0);
    } else {
      sum.prototype.calls = args.length;
      return sum.bind(this, ...args);
    }
  }