"use strict";
require("es6-promise").polyfill()
var DoubleBuffer = require("../lib/DoubleBuffer")

describe("DoubleBuffer", function () {
  var buffer
  beforeEach(function () {
    buffer = new DoubleBuffer(undefined, undefined, {duration: 10})
  })

  it("should have default duration", function () {
    var buffer = new DoubleBuffer(undefined, undefined)
    expect(buffer.options.duration).to.be.a("number")
  })

  describe("#set", function () {
    it("should eventually set back buffer", function () {
      return buffer.set("./base/test/test.jpg")
        .then(function () {
          expect(buffer.back.get()).not.to.be.empty
          expect(buffer.front.get()).to.be.empty
        })
    })

    it("should reject on bad filepath", function () {
      return buffer.set("doesntexist.jpg")
        .then(
          undefined,
          function (err) {
            expect(err).to.be.an("Error")
          })
    })

    it("should support setting multiple paths", function () {
      return buffer.set("./base/test/test.jpg", "./base/test/test.jpg")
    })
  })
})
