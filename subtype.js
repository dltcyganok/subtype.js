/**
 *
 * subtype.js
 *
 * Simple and fast OOP library.
 * Inspired by Backbone, Prototype and John Resig's Simple JavaScript Inheritance.
 *
 * @license MIT
 * @version 0.2.0
 *
 */

(function (root, factory) {

  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD
    define(factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS, node.js
    module.exports = factory();
  } else {
    // Global
    root.Subtype = factory();
  }

})(this, function () {

  'use strict';

  /**
   * This polyfill covers the main use case which is creating
   * a new object for which the prototype has been chosen.
   * @param {Object} source
   * @returns {Object}
   */
  var create = typeof Object.create === 'function' ?
    Object.create :
    (function () {
      function Surrogate() {}

      return function (proto) {
        Surrogate.prototype = proto;
        return new Surrogate();
      };
    })();

  /**
   * Assigns own enumerable properties of source object to the destination object.
   * @param {Object} destination
   * @param {Object} source
   * @returns {Object}
   */
  var assign = typeof Object.keys === 'function' ?
    function (destination, source) {
      var key,
          keys = Object.keys(source),
          index = 0,
          length = keys.length;
      for (; index < length; index++) {
        key = keys[index];
        destination[key] = source[key];
      }
      return destination;
    } :
    function (destination, source) {
      var key;
      for (key in source) {
        if (source.hasOwnProperty(key)) {
          destination[key] = source[key];
        }
      }
      return destination;
    };

  /**
   * Creates extended version of the current class.
   * @static
   * @param {Object} object
   * @returns {Function}
   */
  var extend = function (object) {
    var child,
        parent = this;

    if (object && object.hasOwnProperty('constructor')) {
      child = object.constructor;
    } else {
      // create the constructor if necessary
      child = function () {
        return parent.apply(this, arguments);
      };
    }

    child.prototype = assign(create(parent.prototype), object);
    child.extend = extend;
    return child;
  };

  return extend.call(Object, {
    constructor: function () {} // basic constructor is empty
  });

});
