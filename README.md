# subtype

Simple OOP library, which can be useful for the environment ≤ ES5. Works fast like native inheritance (see [benchmarks](https://jsfiddle.net/7u22cpq5/)).

## Install

For [npm](https://www.npmjs.com/) users:

```bash
npm install subtypejs
```

For [bower](https://bower.io/) users:

```bash
bower install subtype
```

## Usage

In a **browser**:

```html
<script src="path/to/subtype.js"></script>
```

In an **AMD** loader:

```javascript
define(['subtype'], function (Subtype) {

  // code...

});
```

In **node.js**:

```javascript
var Subtype = require('subtypejs');

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
