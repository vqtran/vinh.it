var sass = require('node-sass');
var fs = require('fs');

function build(source, dest) {
    fs.readdir(source, function (err, files) {
        files.forEach(function(file) {
            var filename = file.split('.');
            if (filename[filename.length-1] === 'scss') {
                var css = sass.renderSync({
                    file: source + file,
                    outputStyle: 'compressed'
                });
                fs.writeFile(dest + filename[0] + '.css', css, function () {});
            }
        });
    });
}

exports.build = build;
