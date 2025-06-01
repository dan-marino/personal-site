const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Register 'merge' filter
  eleventyConfig.addFilter("merge", (obj1, obj2) => {
    return Object.assign({}, obj1, obj2);
  });
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("public");

  // Filters
  eleventyConfig.addFilter("date", (value, format = "yyyy") => {
    return DateTime.fromJSDate(value, { zone: "utc" }).toFormat(format);
  });

  // Group posts by year
  eleventyConfig.addCollection("postsByYear", function (collectionApi) {
    const posts = collectionApi.getFilteredByTag("post");
    const grouped = {};

    posts.forEach(post => {
      const year = DateTime.fromJSDate(post.date).toFormat("yyyy");
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(post);
    });

    return Object.entries(grouped).sort((a, b) => b[0] - a[0]); // newest year first
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    },
    // Default data for all .md files in posts/
    dataTemplateEngine: "njk"
  };
};