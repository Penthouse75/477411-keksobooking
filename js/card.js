'use strict';

/*
 * Show on info panel first object booking from array
 */
(function () {
  var convertBookingOfferType = function (bookingOfferType) {
    switch (bookingOfferType) {
      case 'flat':
        return 'Квартира';
      case 'house':
        return 'Дом';
      case 'bungalo':
        return 'Бунгало';
      default:
        return '';
    }
  };

  var splitBookingOfferFeatures = function (BookingOfferFeatures) {
    var outBookingOfferFeatures = '';
    for (var i = 0; i < BookingOfferFeatures.length; i++) {
      outBookingOfferFeatures = outBookingOfferFeatures + '<span class="feature__image feature__image--' + BookingOfferFeatures[i] + '"></span>';
    }
    return outBookingOfferFeatures;
  };

  var showObjectBookingOnInfoPanel = function (window.data.objectBooking) {
    var templateObjectBooking = document.querySelector('#lodge-template');
    var elementTemplateObjectBooking = templateObjectBooking.content.cloneNode(true);

    elementTemplateObjectBooking.querySelector('.lodge__title').textContent = window.data.objectBooking.offer.title;
    elementTemplateObjectBooking.querySelector('.lodge__address').textContent = window.data.objectBooking.offer.address.location.x + ' ' + window.data.objectBooking.offer.address.location.y;

    elementTemplateObjectBooking.querySelector('.lodge__price').innerHTML = window.data.objectBooking.offer.price + ' &#x20bd;/ночь';

    elementTemplateObjectBooking.querySelector('.lodge__type').textContent = convertBookingOfferType(window.data.objectBooking.offer.type);

    elementTemplateObjectBooking.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + window.data.objectBooking.offer.guests + ' гостей в ' + window.data.objectBooking.offer.rooms + ' комнатах';
    elementTemplateObjectBooking.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + window.data.objectBooking.offer.checkin + ', выезд до ' + window.data.objectBooking.offer.checkout;

    elementTemplateObjectBooking.querySelector('.lodge__features').innerHTML = splitBookingOfferFeatures(window.data.objectBooking.offer.features);
    elementTemplateObjectBooking.querySelector('.lodge__description').textContent = window.data.objectBooking.description;

    var pools = document.querySelectorAll('.dialog');
    var blocks = document.querySelectorAll('.dialog__panel');

    pools[0].removeChild(blocks[0]);
    pools[0].appendChild(elementTemplateObjectBooking);

    /*
     * Change avatar first object booking over info panel
     */
    var avatar = document.querySelector('.dialog__title');
    avatar.children[0].src = window.data.objectBooking.author.avatar;
  };
})();

