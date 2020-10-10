const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
    eleventyConfig.setTemplateFormats([
        "md",
        "css",
        'liquid',
        'mp3'
    ]);

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


    eleventyConfig.addFilter("limit", function(value, limit) {
        return value.slice(0, limit);
    });

    eleventyConfig.addFilter("toarray", function(value) {
        return Object.values(value);
    });
}