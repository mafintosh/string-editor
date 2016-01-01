# string-editor

Edit a string using $EDITOR from within your node app.

	npm install string-editor

## Usage

``` js
var edit = require('string-editor');

// this launches your $EDITOR with a tmp file containing "hello world"
edit('hello world', function(err, result) {
	// when you are done editing result will contain the string
	console.log(result);
});
```

Sometimes it can be useful to set an filename to help your editor to enable highlighting etc, or set another editor of choice.

``` js
// we pass app.js as a filename to help with highlighting
// and $GIT_EDITOR as editor
var opts = { filename: 'app.js', editor: process.env.GIT_EDITOR };
edit('var a = 42;', opts, function(err, result) {
	console.log(result);
})
```

Note that `app.js` will still be a tmp file

## License

MIT