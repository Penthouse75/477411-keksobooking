'use strict';

window.card.showObjectBookingOnInfoPanel(window.data.objectBookings[0]);

var infoPanelButtonClose = document.querySelector('.dialog__close');
infoPanelButtonClose.addEventListener('click', window.pin.infoPanelButtonCloseClickHandler);
