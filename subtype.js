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
   * This shim covers the main use case which is creating
   * a new object for which the prototype has been chosen.
   * @param {Object} proto
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
   * @param {Object} [proto={}]
   * @returns {Function}
   */
  var extend = function (proto) {
    var Subtype,
        parent = this;

    if (!(proto && typeof proto === 'object')) {
      proto = {};
    }

    if (proto.hasOwnProperty('constructor')) {
      Subtype = proto.constructor;
    } else {
      Subtype = function () {
        return parent.apply(this, arguments);
      };
      proto.constructor = Subtype;
    }

    Subtype.prototype = assign(create(parent.prototype), proto);
    Subtype.extend = extend;
    return Subtype;
  };

  return extend.call(Object, {
    constructor: function () {} // basic constructor is empty
  });

});
