subtype.js
==========

Minimalistic and fast library for easy creation and class inheritance.

Example:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Example</title>
  <meta charset="utf-8">
  <script src="path/to/subtype.min.js"></script>
  <script>

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

  </script>
</head>
<body>
  
</body>
</html>
```