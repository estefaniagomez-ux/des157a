// grab the overlay div and the img inside it from the HTML
const overlay = document.getElementById('overlay');
const overlayImg = document.getElementById('overlayImg');

// find every carousel image and attach a click listener to each one

document.querySelectorAll('.photo img').forEach(function(img) {
    img.addEventListener('click', function() {
        overlayImg.src = this.getAttribute('data-zoom');
        overlay.classList.add('open');
    });
});

// when the user clicks anywhere on the dark overlay background it closes

overlay.addEventListener('click', function() {
    overlay.classList.remove('open');
    overlayImg.src = '';
});

// when user clicks esc it closees too
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        overlay.classList.remove('open');
        overlayImg.src = '';
    }
});