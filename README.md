subtype
=======

Simple and fast ([benchmarks](http://jsfiddle.net/dv6ks3ok/)) OOP library.

####Install
For [bower](http://bower.io/) users:

    bower install subtype

For [node.js](http://nodejs.org/) users:

    npm install subtypejs

####Usage
For **AMD** users:
```javascript
define(function (require) {

  var Subtype = require('subtype');

  // code...

});
```

For **node.js** users:
```javascript
var Subtype = require('subtype');

// code...
```

And then:
```javascript
var Human = Subtype.extend({
  constructor: function (name) {
    this.name = name;
  },
  say: function (words) {
    return this.name + ': ' + words;
  }
});

var Actor = Human.extend({
  say: function (words) {
    // explicit call the super method
    return 'actor ' + Human.prototype.say.call(this, words);
  }
});

var human = new Human('Robert');
console.log(human.say('Hi!')); // => "Robert: Hi!"

var actor = new Actor('Jeremy');
console.log(actor.say('Hello!')); // => "actor Jeremy: Hello!"

console.log(
  human instanceof Human &&
  human instanceof Subtype &&
  actor instanceof Actor &&
  actor instanceof Human &&
  actor instanceof Subtype
); // => true

console.log(
  Subtype === Subtype.prototype.constructor &&
  Human === Human.prototype.constructor &&
  Actor === Actor.prototype.constructor
); // => true
```
