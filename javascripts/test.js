// script.js
// script.js
document.addEventListener('DOMContentLoaded', function() {
    const roses = document.querySelectorAll('.rose');

    roses.forEach(rose => {
        const x = rose.getAttribute('data-x');
        const y = rose.getAttribute('data-y');
        const rotate = rose.getAttribute('data-rotate');
        rose.style.left = x + 'px';
        rose.style.top = y + 'px';
        rose.style.transform = `rotate(${rotate}deg)`;

        const normalRose = rose.querySelector('.normal-rose');
        const selectedRose = rose.querySelector('.selected-rose');

        rose.addEventListener('mouseover', function() {
            normalRose.style.display = 'none';
            selectedRose.style.display = 'block';
        });

        rose.addEventListener('mouseout', function() {
            normalRose.style.display = 'block';
            selectedRose.style.display = 'none';
        });
    });
});

// script.js (продолжение)
roses.forEach(rose => {
    const x = rose.getAttribute('data-x');
    const y = rose.getAttribute('data-y');
    rose.style.left = x + 'px';
    rose.style.top = y + 'px';

    const normalRose = rose.querySelector('.normal-rose');
    const selectedRose = rose.querySelector('.selected-rose');

    rose.addEventListener('mouseover', function() {
        normalRose.style.display = 'none';
        selectedRose.style.display = 'block';
    });

    rose.addEventListener('mouseout', function() {
        normalRose.style.display = 'block';
        selectedRose.style.display = 'none';
    });
});