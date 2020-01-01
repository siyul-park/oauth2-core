function functionalEndPoint(request, options) {
  if (options.throwError) throw options.throwError;
  return { state: request.state };
}

module.exports = functionalEndPoint;
