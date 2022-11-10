const createRequestHandler = (fn) => (req, res) => {
  setTimeout(() => {
    res.send(fn(req.params, req.body))
  }, 500)
}

module.exports = {
  createRequestHandler,
}
