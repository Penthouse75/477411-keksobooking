'use strict';

showObjectBookingOnInfoPanel(window.data.objectBookings[0]);

var infoPanelButtonClose = document.querySelector('.dialog__close');
infoPanelButtonClose.addEventListener('click', infoPanelButtonCloseClickHandler);
