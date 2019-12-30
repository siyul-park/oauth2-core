function runInTime(milliseconds, func) {
  if (typeof func === 'function') {
    return setTimeout(func, milliseconds);
  } if (func instanceof Promise) {
    return setTimeout(() => func, milliseconds);
  }

  return null;
}

module.exports = runInTime;
