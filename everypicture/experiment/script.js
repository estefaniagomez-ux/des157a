(function() { 
  const band = document.getElementById('band');

  let opacity = 1;
  let fading = true; // true = fading out, false = fading in
  let animFrame;

  function fade() {
    if (fading) {
      opacity -= 1 / (10 * 60); // 10 seconds at ~60fps
      if (opacity <= 0) {
        opacity = 0;
        fading = false; // stop when fully gone
        band.style.opacity = opacity;
        return;
      }
    } else {
      opacity += 1 / (10 * 60); // fade back in at same speed
      if (opacity >= 1) {
        opacity = 1;
        fading = true; // reset so it fades out again
        band.style.opacity = opacity;
        // wait 1 second then fade out again
        setTimeout(() => animFrame = requestAnimationFrame(fade), 1000);
        return;
      }
    }

    band.style.opacity = opacity;
    animFrame = requestAnimationFrame(fade);
  }

  animFrame = requestAnimationFrame(fade);

  document.getElementById('scene').addEventListener('click', () => {
    fading = !fading;
  }); 

})();
