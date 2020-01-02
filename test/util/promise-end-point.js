async function promiseEndPoint(request, options) {
  if (options.throwError) throw options.throwError;
  return { state: request.state };
}

module.exports = promiseEndPoint;
