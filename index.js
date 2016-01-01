var editor = require('editor');
var os = require('os');
var fs = require('fs');
var path = require('path');

var edit = function(str, opts, cb) {
	if (typeof opts === 'function') return edit(str, null, opts);
	opts = opts || {};
	if (!opts.filename) opts.filename = Date.now()+'';

	opts.filename = path.join(os.tmpDir(), opts.filename);
	fs.writeFile(opts.filename, str, function(err) {
		if (err) return cb(err);
		editor(opts.filename, { editor: opts.editor }, function(code) {
			if (code) return cb(new Error('non-zero exit code ('+code+')'));
			fs.readFile(opts.filename, 'utf-8', function(err, result) {
				if (err) return cb(err);
				fs.unlink(opts.filename, function() {
					cb(null, result);
				});
			});
		});
	});
};

module.exports = edit;