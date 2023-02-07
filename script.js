/*
|--------------------------------------------------------------------------
| Flip Countdown JS
|--------------------------------------------------------------------------
|
| The countdown timer will require the countdown finish timestamp to 
| initialize we will also have to define the root element selector to 
| attach the countdown html markup. 
|
*/

const date = new Date('Tue Feb 09 2023 22:30:10 GMT+0530 (India Standard Time)');

const endDate = new Date().setHours(new Date().getHours() + 48);

/** Init flip */
new FlipCounter(endDate, '#bannerCounter');