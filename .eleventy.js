const { DateTime } = require("luxon");
const htmlmin = require("html-minifier");
const Image = require("@11ty/eleventy-img");
const sass = require('./styles/sass-processor');

module.exports = function(eleventyConfig) {

    // Minify HTML
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
        if( outputPath.endsWith(".html") ) {
            return htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true
            });
        }

        return content;
    });

    // Files we just copy through
    eleventyConfig.setTemplateFormats([
        "md",
        'liquid',
        'mp3'
    ]);

    // Static files to root
    eleventyConfig.addPassthroughCopy({ "static": "/" });

    let timeToMinutes = function(time) {
        let timeParts = time.split(":");
        return (timeParts[0] * 60) - (-timeParts[1]) - (-Math.round(timeParts[2] / 60));
    };

    // Take podcast time like 00:32:12 (used in RSS) and turn it into an interval like PT32M (used in schema)
    eleventyConfig.addFilter("timeToInterval", time => {
        return "PT" + timeToMinutes(time) + "M";
    });

    // Take podcast time like 00:32:12 (used in RSS) and turn it into an interval like PT32M (used in schema)
    eleventyConfig.addFilter("timeToMinutes", time => {
        return timeToMinutes(time);
    });

    // Date formatting (human readable)
    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj).toFormat("LLLL dd, yyyy");
    });

    // Date formatting (machine readable)
    eleventyConfig.addFilter("machineDate", dateObj => {
        return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
    });

    // Date formatting (ISO)
    eleventyConfig.addFilter("isoDate", dateObj => {
        return DateTime.fromJSDate(dateObj).toISO();
    });

    // Date formatting (for RSS feed)
    eleventyConfig.addFilter("rssDate", dateObj => {
        return DateTime.fromJSDate(dateObj).toRFC2822();
    });

    // Process image tags
    eleventyConfig.addShortcode("image", async (src, alt, className, width) => {

        if (!alt) {
            alt = "";
        }

        if (!width) {
            width = 600;
        }

        let fallbackOutput = 'jpeg';
        let splitSrc = src.split(".");
        let extension = splitSrc[splitSrc.length - 1];

        if (extension.toLowerCase() === 'png') {
            fallbackOutput = 'png';
        }

        let sizes = [Math.ceil(width / 2), width, width * 2];

        let stats = await Image(src, {
            widths: sizes,
            formats: [fallbackOutput, "webp"],
            urlPath: "/images/",
            outputDir: "./_site/images/",
        });

        let lowestSrc = stats[fallbackOutput][0];

        const srcset = Object.keys(stats).reduce(
            (acc, format) => ({
                ...acc,
                [format]: stats[format].reduce(
                    (_acc, curr) => `${_acc} ${curr.srcset} ,`,
                    ""
                ),
            }),
            {}
        );

        const sizeAttribute = `(min-width: 992px) ${width}px, 100vw`;

        const source = `<source type="image/webp" srcset="${srcset["webp"]}" sizes='${sizeAttribute}'>`;

        const img = `<img
          loading="lazy"
          alt="${alt}"
          src="${lowestSrc.url}"
          sizes='${sizeAttribute}'
          srcset="${srcset[fallbackOutput]}"
          width="${lowestSrc.width}"
          height="${lowestSrc.height}"
          class="${className}">`;

        return `<div class="image-wrapper"><picture> ${source} ${img} </picture></div>`;
    });

    // Process CSS image backgrounds
    eleventyConfig.addShortcode("bgimg", async (src) => {

        let stats = await Image(src, {
            widths: [1200],
            formats: ["jpeg"],
            urlPath: "/images/",
            outputDir: "./_site/images/",
        });

        let lowestSrc = stats["jpeg"][0];

        return `${lowestSrc.url}`;
    });

    // Limit size of array
    eleventyConfig.addFilter("limit", function(value, limit) {
        return value.slice(0, limit);
    });

    // Convert object to array
    eleventyConfig.addFilter("toarray", function(value) {
        return Object.values(value);
    });

    //Watching for modifications in style directory
    sass('styles/styles.scss', '_site/styles/styles.css');
}