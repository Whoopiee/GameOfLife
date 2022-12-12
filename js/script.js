const Constants = require('./additionalClasses/Constants.js');
const Ocean = require('./additionalClasses/Ocean.js');

let canvas = document.getElementById('canvas');

// canvas.style.width = `${(Constants.MaxCols * Constants.MaxRows)*10}px`;
// canvas.style.height = `${(Constants.MaxCols * Constants.MaxRows)*10}px`;
let oceantest = new Ocean.Ocean(canvas);

oceantest.initialize();

oceantest.run();

