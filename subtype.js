/**
 *
 * subtype.js
 *
 * @license MIT
 * @version 0.2.0
 * @see [subtype.js]{@link https://github.com/dltcyganok/subtype}
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
      var Constructor = function () {};
      return function (proto) {
        Constructor.prototype = proto;
        return new Constructor();
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
      var keys = Object.keys(source);
      for (var index = 0, length = keys.length; index < length; index++) {
        var key = keys[index];
        destination[key] = source[key];
      }
      return destination;
    } :
    function (destination, source) {
      for (var key in source) {
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
    if (!(proto && typeof proto === 'object')) {
      proto = {};
    }

    var Subtype;
    var parent = this;
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
