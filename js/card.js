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

  window.card = {
    showObjectBookingOnInfoPanel: function (objectBooking) {
      var templateObjectBooking = document.querySelector('#lodge-template');
      var elementTemplateObjectBooking = templateObjectBooking.content.cloneNode(true);

      elementTemplateObjectBooking.querySelector('.lodge__title').textContent = objectBooking.offer.title;
      elementTemplateObjectBooking.querySelector('.lodge__address').textContent = objectBooking.offer.address.location.x + ' ' + objectBooking.offer.address.location.y;

      elementTemplateObjectBooking.querySelector('.lodge__price').innerHTML = objectBooking.offer.price + ' &#x20bd;/ночь';

      elementTemplateObjectBooking.querySelector('.lodge__type').textContent = convertBookingOfferType(objectBooking.offer.type);

      elementTemplateObjectBooking.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + objectBooking.offer.guests + ' гостей в ' + objectBooking.offer.rooms + ' комнатах';
      elementTemplateObjectBooking.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + objectBooking.offer.checkin + ', выезд до ' + objectBooking.offer.checkout;

      elementTemplateObjectBooking.querySelector('.lodge__features').innerHTML = splitBookingOfferFeatures(objectBooking.offer.features);
      elementTemplateObjectBooking.querySelector('.lodge__description').textContent = objectBooking.description;

      var pools = document.querySelectorAll('.dialog');
      var blocks = document.querySelectorAll('.dialog__panel');

      pools[0].removeChild(blocks[0]);
      pools[0].appendChild(elementTemplateObjectBooking);

      /*
       * Change avatar first object booking over info panel
       */
      var avatar = document.querySelector('.dialog__title');
      avatar.children[0].src = objectBooking.author.avatar;
    }
  };
})();

