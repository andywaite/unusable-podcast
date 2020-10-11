const sass = require('sass');
const fs = require('fs-extra');
const path = require('path');

module.exports = (scssPath, cssPath) => {

    //If cssPath directory doesn't exist...
    if(!fs.existsSync(path.dirname(cssPath))) {
        //Encapsulate rendered css from scssPath into result variable
        const result = sass.renderSync({file: scssPath});
        //Create cssPath directory recursively
        fs.mkdir(path.dirname(cssPath), {recursive: true})
            //Then write result css string to cssPath file
            .then(() => fs.writeFile(cssPath, result.css.toString()))
            .catch(error => console.error(error))
    }

    //Watch for changes to scssPath directory...
    fs.watch(path.dirname(scssPath), () => {
        console.log(`Watching ${path.dirname(scssPath)}...`);
        //Encapsulate rendered css from scssPath into watchResult variable
        const watchResult = sass.renderSync({file: scssPath});
        //Then write result css string to cssPath file
        fs.writeFile(cssPath, watchResult.css.toString())
            .catch(error => console.error(error))
    });
}