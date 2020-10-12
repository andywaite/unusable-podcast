const sass = require('sass');
const fs = require('fs-extra');
const path = require('path');

module.exports = (scssPath, cssPath) => {
    console.log(process.cwd());
    console.log("HERE");

    //If cssPath directory doesn't exist...
    if(!fs.existsSync(path.dirname(cssPath))) {
        console.log("AM BUILDING");
        //Encapsulate rendered css from scssPath into result variable
        const result = sass.renderSync({file: scssPath});
        //Create cssPath directory recursively
        console.log(process.cwd());
        console.log(path.dirname(cssPath));

        fs.mkdir(path.dirname(cssPath), {recursive: true}, (err) => {
            console.log("DIR MADE");
            if (err) {
                return console.error(err);
            }
            console.log("NO ERROR");
            fs.writeFile(cssPath, result.css.toString());
            console.log("Success");
        });
    }

    // //Watch for changes to scssPath directory...
    // fs.watch(path.dirname(scssPath), () => {
    //     console.log(`Watching ${path.dirname(scssPath)}...`);
    //     //Encapsulate rendered css from scssPath into watchResult variable
    //     const watchResult = sass.renderSync({file: scssPath});
    //     //Then write result css string to cssPath file
    //     fs.writeFile(cssPath, watchResult.css.toString())
    //         .catch(error => console.error(error))
    // });
}