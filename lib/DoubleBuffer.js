var Buffer = require("./Buffer")

var DoubleBuffer = function (parentNode, referenceNode, options) {
  if (!options) options = {}
  if (!options.duration) options.duration = 2000

  this.back = new Buffer("back", parentNode, referenceNode)
  this.front = new Buffer("front", this.back)
  this.options = options
  this.transitioning = false
  return this
}

/**
 * @param {...string} path
 */
DoubleBuffer.prototype.set = function (path) {
  var self = this
  var paths = Array.prototype.slice.call(arguments)

  var _set = function (p) {
    self.transitioning = true
    return cacheImage(p)
      .then(function () {
        return self.front.fadeIn(url(p), self.options.duration)
      })
      .then(function () {
        return new Promise(function (resolve) {
          self.back.set(self.front.get())
          setTimeout(function () {
            self.front.reset()
            resolve()
          }, 100) // small delay to avoid occasional blinking
        })
      })
      .then(function () {
        if (paths.length) {
          return _set(paths.shift())
        }
      })
      .then(
        function () {
          self.transitioning = false
        },
        function (err) {
          self.transitioning = false
          throw err
        })
  }

  path = paths.shift()
  return _set(path)
}

var cacheImage = function (path) {
  return new Promise(function (resolve, reject) {
    var img = new Image()
    img.addEventListener("load", function () {
      resolve(img)
    }, false)
    img.addEventListener("error", function () {
      reject(new Error("Error loading " + path))
    }, false)
    img.src = path
  })
}

var url = function (path) {
  return "url('" + path + "')"
}

module.exports = DoubleBuffer
