var animate = require("js-animate/opacity")

var Buffer = function (cls, parentNode, referenceNode) {
  this.element = document.createElement("buffer")
  this.element.classList.add(cls)

  if (parentNode instanceof Buffer) parentNode = parentNode.element
  if (parentNode) parentNode.insertBefore(this.element, referenceNode)
  return this
}

Buffer.prototype.set = function (path) {
  this.element.style.backgroundImage = path
}

Buffer.prototype.get = function () {
  return this.element.style.backgroundImage
}

Buffer.prototype.reset = function () {
  this.element.style.backgroundImage = ""
  return animate.fadeOut(this.element, {duration: 0})
}

Buffer.prototype.isEmpty = function () {
  return this.element.style.backgroundImage == ""
}

Buffer.prototype.fadeIn = function (path, duration) {
  this.set(path)
  return animate.fadeIn(this.element, {duration: duration})
}

module.exports = Buffer
