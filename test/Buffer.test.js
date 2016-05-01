"use strict";
var Buffer = require("../lib/Buffer")

describe("Buffer", function () {
  var buffer
  beforeEach(function () {
    buffer = new Buffer("foo")
  })

  describe("#isEmpty", function () {
    it("should be empty by default", function () {
      expect(buffer.isEmpty()).to.be.true
    })
  })
})
