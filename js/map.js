'use strict';

window.card.showObjectBookingOnInfoPanel(window.data.objectBookings[0]);

var infoPanelButtonClose = document.querySelector('.dialog__close');
infoPanelButtonClose.addEventListener('click', window.pin.infoPanelButtonCloseClickHandler);

/*
 * Drag pin
 */
var mainPin = document.querySelector('.pin__main');
var fieldAddress = document.getElementById('address');
fieldAddress.readOnly = true;

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

    fieldAddress.value = 'x: {{' + ((mainPin.offsetLeft - shift.x) + 37) + '}}, y: {{' + ((mainPin.offsetTop - shift.y) + 94) + '}}';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});