import Ocean from './additionalClasses/Ocean.js';

const canvas = document.getElementById('canvas'),
    startButton = document.querySelector('#btnStart');
    //clearButton = document.querySelector('#btnClear');

const oceantest = new Ocean(canvas, document);

startButton.addEventListener('click', () => {
    
    const data = document.querySelectorAll('input');

    oceantest.initialize();

    oceantest.run();
}, {once: true});

// clearButton.addEventListener('click', () => {
//     oceantest.clearAll();
// });



