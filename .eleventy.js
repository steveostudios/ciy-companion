const svgContents = require("eleventy-plugin-svg-contents");

module.exports = function (eleventyConfig) {
  require("dotenv").config();
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");

  eleventyConfig.addPlugin(svgContents);

  eleventyConfig.addShortcode("humanDateRange", function(startDateString, endDateString, showWeekDays = false,
    month = 'short',
    weekday = 'short') {
    if (!startDateString || !endDateString) return;
    function toDate(dateString) {
      const year = dateString.substring(0,4);
      const month = dateString.substring(4,6);
      const day = dateString.substring(6,8);
      return new Date(year, month-1, day);
    } 
    
    function isDate(date) {
      return Object.prototype.toString.call(date) === '[object Date]';
    }
      
      const startDate = toDate(startDateString);
      const endDate = toDate(endDateString);
      
      
      if (!isDate(startDate) || !isDate(endDate)) {
        return;
      }
      
      const sYear = startDate.getFullYear();
      const sDate = startDate.getDate();
      const sWeekday = showWeekDays ? startDate.toLocaleString('en-US', {weekday}) + ' ' : '';
      const sMonth = startDate.toLocaleString('en-US', {month});
      const eYear = endDate.getFullYear();
      const eDate = endDate.getDate();
      const eWeekday = showWeekDays ? endDate.toLocaleString('en-US', {weekday}) + ' ' : '';
      const eMonth = endDate.toLocaleString('en-US', {month});
      // return startDate;

  // Check if month and year are the same
  if (sYear === eYear && sMonth === eMonth) {
    return `${sWeekday}${sMonth} ${sDate}-${eWeekday}${eDate} ${eYear}`;
  }

  // Check if year is the same
  if (sYear === eYear) {
    return `${sWeekday}${sMonth} ${sDate}-${eWeekday}${eMonth} ${eDate} ${eYear}`;
  }

  return `${sWeekday}${sMonth} ${sDate} ${sYear}-${eWeekday}${eMonth} ${eDate} ${eYear}`;
  })

  // eleventyConfig.addPassthroughCopy("src/img");

  // eleventyConfig.setDataDeepMerge(true);

  return {
    // passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
