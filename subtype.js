/**
 *
 * subtype.js
 *
 * Minimalistic and fast library for easy creation and class inheritance.
 * Inspired by Backbone, Prototype and John Resig's Simple JavaScript Inheritance.
 *
 * @license MIT
 * @version 0.1.0
 * @example
 *
 * var Human = Subtype.extend({
 *   constructor: function (name) {
 *     this.name = name;
 *   },
 *   say: function (words) {
 *     return this.name + ': ' + words;
 *   }
 * });
 * 
 * var Actor = Human.extend({
 *   say: function (words) {
 *     return 'actor ' + Human.prototype.say.call(this, words);
 *   }
 * });
 * 
 * var human = new Human('Robert');
 * console.log(human.say('Hi!')); // => "Robert: Hi!"
 * 
 * var actor = new Actor('Jeremy');
 * console.log(actor.say('Hello!')); // => "actor Jeremy: Hello!"
 * 
 * console.log(
 *   human instanceof Human &&
 *   human instanceof Subtype &&
 *   actor instanceof Actor &&
 *   actor instanceof Human &&
 *   actor instanceof Subtype
 * ); // => true
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
   */
  var create = Object.create || (function () {
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
  var assign = function (destination, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        destination[key] = source[key];
      }
    }

    return destination;
  };

  /**
   * Creates extended version of the current class.
   * @param {Object} object
   * @returns {Function}
   */
  var extend = function (object) {
    /** Outer constructor. */
    function Subtype( /* params... */ ) {
      this.constructor.apply(this, arguments); // auto call internal constructor
    }

    Subtype.prototype = assign(create(this.prototype), object);
    Subtype.extend = extend;
    return Subtype;
  };

  return extend.call(Object, {
    constructor: function () {} // basic constructor is empty
  });

});
