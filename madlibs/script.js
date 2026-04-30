(function () {
  'use strict';
  console.log('reading js');

  // Grab the form
  const form = document.querySelector('#madlib-form');

  // Grab all inputs
  const racerNameInput = document.querySelector('#racer-name');
  const vehicleInput = document.querySelector('#vehicle');
  const adjective1Input = document.querySelector('#adjective1');
  const cityDistrictInput = document.querySelector('#city-district');
  const rivalNameInput = document.querySelector('#rival-name');
  const soundInput = document.querySelector('#sound');
  const adjective2Input = document.querySelector('#adjective2');
  const emotionInput = document.querySelector('#emotion');

  // Grab the overlay and close button
  const overlay  = document.querySelector('#result-overlay');
  const closeBtn = document.querySelector('#close-btn');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const racerName = racerNameInput.value.trim();
    const vehicle  = vehicleInput.value.trim();
    const adjective1 = adjective1Input.value.trim();
    const cityDistrict = cityDistrictInput.value.trim();
    const rivalName = rivalNameInput.value.trim();
    const sound  = soundInput.value.trim();
    const adjective2 = adjective2Input.value.trim();
    const emotion  = emotionInput.value.trim();

    let isValid = true;

    if (!racerName) {
      racerNameInput.classList.add('input-error');
      document.querySelector('#err-racer-name').classList.add('visible');
      isValid = false;
    }
    if (!vehicle) {
      vehicleInput.classList.add('input-error');
      document.querySelector('#err-vehicle').classList.add('visible');
      isValid = false;
    }
    if (!adjective1) {
      adjective1Input.classList.add('input-error');
      document.querySelector('#err-adjective1').classList.add('visible');
      isValid = false;
    }
    if (!cityDistrict) {
      cityDistrictInput.classList.add('input-error');
      document.querySelector('#err-city-district').classList.add('visible');
      isValid = false;
    }
    if (!rivalName) {
      rivalNameInput.classList.add('input-error');
      document.querySelector('#err-rival-name').classList.add('visible');
      isValid = false;
    }
    if (!sound) {
      soundInput.classList.add('input-error');
      document.querySelector('#err-sound').classList.add('visible');
      isValid = false;
    }
    if (!adjective2) {
      adjective2Input.classList.add('input-error');
      document.querySelector('#err-adjective2').classList.add('visible');
      isValid = false;
    }
    if (!emotion) {
      emotionInput.classList.add('input-error');
      document.querySelector('#err-emotion').classList.add('visible');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    document.querySelector('#out-district').textContent = cityDistrict;
    document.querySelector('#out-racer1').textContent   = racerName;
    document.querySelector('#out-vehicle').textContent  = vehicle;
    document.querySelector('#out-adj1').textContent     = adjective1;
    document.querySelector('#out-rival').textContent    = rivalName;
    document.querySelector('#out-sound').textContent    = sound;
    document.querySelector('#out-racer2').textContent   = racerName;
    document.querySelector('#out-adj2').textContent     = adjective2;
    document.querySelector('#out-emotion').textContent  = emotion;

    overlay.classList.add('active');
  });

  const allInputs = document.querySelectorAll('#madlib-form input');

  for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener('input', function (event) {
      if (event.target.value.trim()) {
        event.target.classList.remove('input-error');
        event.target.nextElementSibling.classList.remove('visible');
      }
    });
  }

  closeBtn.addEventListener('click', function () {
    overlay.classList.remove('active');
    form.reset();
  });

})();