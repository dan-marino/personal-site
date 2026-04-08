const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Register 'merge' filter
  eleventyConfig.addFilter("merge", (obj1, obj2) => {
    return Object.assign({}, obj1, obj2);
  });
  eleventyConfig.addPassthroughCopy({ "src/public": "." });

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

  // Custom collection for shows
  eleventyConfig.addCollection("shows", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/shows/**/*.{json,md}")
      .sort((a, b) => new Date(a.data.date) - new Date(b.data.date));
  });

  const H1_RE = /<h1[^>]*>.*?<\/h1>/is;
  const stripHtml = str => str.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  eleventyConfig.addFilter("postTitle", function(content) {
    const match = content.match(/<h1[^>]*>(.*?)<\/h1>/is);
    return match ? match[1].replace(/<[^>]+>/g, "") : "";
  });

  eleventyConfig.addFilter("removeH1", function(content) {
    return content.replace(H1_RE, "");
  });

  eleventyConfig.addFilter("readingTime", function(content) {
    const words = stripHtml(content).split(/\s+/).length;
    return `${Math.ceil(words / 200)} min read`;
  });

  eleventyConfig.addFilter("excerpt", function(content) {
    const text = stripHtml(content.replace(H1_RE, ""));
    if (text.length <= 150) return text;
    const trimmed = text.slice(0, 150);
    const lastSpace = trimmed.lastIndexOf(" ");
    return (lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed) + "…";
  });

  // Filter to parse a date string into a timestamp
  eleventyConfig.addFilter("toTimestamp", function(dateStr) {
    return new Date(dateStr).getTime();
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    // Default data for all .md files in posts/
    dataTemplateEngine: "njk"
  };
};