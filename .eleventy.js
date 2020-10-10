const { DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
    // Files we just copy through
    eleventyConfig.setTemplateFormats([
        "md",
        "css",
        'liquid',
        'mp3'
    ]);

    // Static files to root
    eleventyConfig.addPassthroughCopy({ "static": "/" });

    // Take podcast time like 00:32:12 (used in RSS) and turn it into an interval like PT32M (used in schema)
    eleventyConfig.addFilter("timeToInterval", time => {
        return "PT" + (time.split(":")[1]) + "M";
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

    // Process image tags
    eleventyConfig.addShortcode("image", async (src, alt, className) => {
        if (!alt) {
            alt = "";
        }

        let stats = await Image(src, {
            widths: [25, 320, 640, 960, 1200, 1800, 2400],
            formats: ["jpeg", "webp"],
            urlPath: "/images/",
            outputDir: "./_site/images/",
        });

        let lowestSrc = stats["jpeg"][0];

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

        const source = `<source type="image/webp" srcset="${srcset["webp"]}" >`;

        const img = `<img
          loading="lazy"
          alt="${alt}"
          src="${lowestSrc.url}"
          sizes='(min-width: 1024px) 1024px, 100vw'
          srcset="${srcset["jpeg"]}"
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
}