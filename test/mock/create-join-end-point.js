function createJoinEndPoint(state) {
  return (request, options) => {
    if (options.throwError) throw options.throwError;
    return { state };
  };
}

module.exports = createJoinEndPoint;
