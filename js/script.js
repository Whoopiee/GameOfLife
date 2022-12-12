import Ocean from './additionalClasses/Ocean.js';

const canvas = document.getElementById('canvas');

// canvas.style.width = `${(Constants.MaxCols * Constants.MaxRows)*10}px`;
// canvas.style.height = `${(Constants.MaxCols * Constants.MaxRows)*10}px`;
const oceantest = new Ocean(canvas);

oceantest.initialize();

oceantest.run();

