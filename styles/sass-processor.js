const sass = require('sass');
const fs = require('fs-extra');
const path = require('path');
const CleanCss = require('clean-css');

module.exports = (scssPath, cssPath) => {

    //If cssPath directory doesn't exist...
    if(!fs.existsSync(path.dirname(cssPath))) {
        //Encapsulate rendered css from scssPath into result variable
        const compiled = sass.renderSync({file: scssPath, outputStyle: "compressed", sourceComments: false});
        const result = new CleanCss({}).minify(compiled.css.toString()).styles;
        //Create cssPath directory recursively
        fs.mkdirp(path.dirname(cssPath), {recursive: true}, (err) => {
            if (err) {
                return console.error(err);
            }
            fs.writeFile(cssPath, result);
            console.log("Compiled SCSS successfully.")
        });
    }

    // //Watch for changes to scssPath directory...
    // fs.watch(path.dirname(scssPath), () => {
    //     console.log(`Watching ${path.dirname(scssPath)}...`);
    //     //Encapsulate rendered css from scssPath into watchResult variable
    //     const compiled = sass.renderSync({file: scssPath, outputStyle: "compressed", sourceComments: false});
    //     const watchResult = new CleanCss({}).minify(compiled.css.toString()).styles;
    //     //Then write result css string to cssPath file
    //     fs.writeFile(cssPath, watchResult)
    //         .catch(error => console.error(error))
    // });
}