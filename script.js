const countToDate = new Date().setHours(new Date().getHours() + 59);

const currentDate = new Date();

/** Init flip */
new FlipCounter(countToDate, '#bannerCounter');