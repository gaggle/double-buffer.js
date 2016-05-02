# double-buffer.js
[![Build Status](https://travis-ci.org/gaggle/double-buffer.js.svg?branch=master)](https://travis-ci.org/gaggle/double-buffer.js)
[![Coverage Status](https://coveralls.io/repos/github/gaggle/double-buffer.js/badge.svg?branch=master)](https://coveralls.io/github/gaggle/double-buffer.js?branch=master)

Smoothly load images sequentially.

An image is first pre-loaded, then faded in on the front buffer.
Once fully shown it's swapped to live permanently on the back buffer.
At this point a new image can be faded in, leading to smooth fadein transitions.

Useful for galleries or backgrounds displaying potentially infinite images.

Here an inital image fades in, and another immediately fades in on top.
![Example](example.gif)


### Install

    npm install gaggle/double-buffer.js

### Use

    var DoubleBuffer = require("double-buffer.js")
    buffer = new DoubleBuffer(parent, undefined, {duration: 1000})
    buffer.set("./clouds.jpg")
