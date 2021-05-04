function database(db) {
  return function middleware(req, res, next) {
    req.db = db
    next()
  }
}

module.exports = database
