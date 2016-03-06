# parse-emoji
Tool to pass Emojis and smileys from text

Install: *npm install parse-emoji*

```javascript

var parser = require('parse-emoji');

var tokens = parser('I :heart: emoji!', function(emojis){

    console.log(emojis);
    
});

```
