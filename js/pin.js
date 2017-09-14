'use strict';

/*
 * Event Handler Info panel
 */
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var pinObjectBookingCloseInfoPanel = function () {
    var deactivePin = document.getElementsByClassName('pin--active');
    if (deactivePin.length !== 0) {
      deactivePin[0].classList.remove('pin--active');
    }

    var infoPanel = document.querySelector('.dialog');

    infoPanel.classList.add('hidden');
  };

  var pinObjectBookingOpenInfoPanel = function (evt) {
    var deactivePin = document.getElementsByClassName('pin--active');
    if (deactivePin.length !== 0) {
      deactivePin[0].classList.remove('pin--active');
    }

    var currentPin = evt.currentTarget;
    currentPin.classList.add('pin--active');

    var infoPanel = document.querySelector('.dialog');
    infoPanel.classList.remove('hidden');

    window.card.showObjectBookingOnInfoPanel(window.data.objectBookings[currentPin.value]);
  };

  var pinObjectBookingKeydownHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      pinObjectBookingOpenInfoPanel(evt);
    }
    if (evt.keyCode === ESC_KEYCODE) {
      pinObjectBookingCloseInfoPanel(evt);
    }
  };

  var pinObjectBookingClickHandler = function (evt) {
    pinObjectBookingOpenInfoPanel(evt);
  };

  /*
  * Create location booking on map
  */
  var pinBlockAll = document.querySelector('.tokyo__pin-map');

  var fragmentPinBlockAll = document.createDocumentFragment();
  var i;
  for (i = 0; i < 8; i++) {
    var pinObjectBooking = document.createElement('div');

    pinObjectBooking.className = 'pin';
    pinObjectBooking.style = 'left: ' + window.data.objectBookings[i].offer.address.location.x + 'px; top: ' + window.data.objectBookings[i].offer.address.location.y + 'px';
    pinObjectBooking.innerHTML = '<img src="' + window.data.objectBookings[i].author.avatar + '" class="rounded" width="40" height="40" tabindex="' + (i + 10) + '">';
    pinObjectBooking.value = i;

    fragmentPinBlockAll.appendChild(pinObjectBooking);

    pinObjectBooking.addEventListener('click', pinObjectBookingClickHandler);
    pinObjectBooking.addEventListener('keydown', pinObjectBookingKeydownHandler);
  }

  pinBlockAll.appendChild(fragmentPinBlockAll);

  window.pin = {
    infoPanelButtonCloseClickHandler: function () {
      pinObjectBookingCloseInfoPanel();
    }
  };
})();
