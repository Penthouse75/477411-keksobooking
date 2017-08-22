'use strict';

var BOOKING_OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var BOOKING_OFFER_TYPES = ['flat', 'house', 'bungalo'];

var BOOKING_OFFER_CHECKINS = ['12:00', '13:00', '14:00'];

var BOOKING_OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];

var BOOKING_OFFER_FEATURESS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var generateRandValue = function (minValue, maxValue) {
  return Math.round(minValue - 0.5 + Math.random() * (maxValue - minValue + 1));
}

var generateRandBookingOfferFeaturess = function () {
return [BOOKING_OFFER_FEATURESS[generateRandValue(0, 5)], BOOKING_OFFER_FEATURESS[generateRandValue(0, 5)], BOOKING_OFFER_FEATURESS[generateRandValue(0, 5)], BOOKING_OFFER_FEATURESS[generateRandValue(0, 5)], BOOKING_OFFER_FEATURESS[generateRandValue(0, 5)]];
}

var generateUniqueRandValue = function (randValueArray) {
  for (var i = 0; i < randValueArray.length; i++) {
    for (var j = i + 1; j < randValueArray.length; j++) {
      if (randValueArray[i] == randValueArray[j]) {
        randValueArray.splice(j, 1);
        j--;
      };
    };
  };
  return randValueArray;
};

var convertBookingOfferType = function (bookingOfferType) {
  switch(bookingOfferType) {
  case 'flat':
    return 'Квартира';
  case 'house':
    return 'Дом';
  case 'bungalo':
    return 'Бунгало';
  }
}

var splitBookingOfferFeatures = function (BookingOfferFeatures) {
  var outBookingOfferFeatures = '';
  for (var i = 0; i < BookingOfferFeatures.length; i++) {
    outBookingOfferFeatures = outBookingOfferFeatures + '<span class="feature__image feature__image--' +  BookingOfferFeatures[i] + '"></span>';
  }
  return outBookingOfferFeatures;
}

/*
 * Generate 8 object booking and init random value
 */
var ObjectBooking = [];

for (var i = 0; i < 8; i++) {
  ObjectBooking[i] = {
    author: {
      avatar : 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: BOOKING_OFFER_TITLES[generateRandValue(0, 7)],
      address: {
        location: {
           x: generateRandValue(300, 900),
           y: generateRandValue(100, 500)
        }
      },
      price: generateRandValue(1000, 1000000),
      type: BOOKING_OFFER_TYPES[generateRandValue(0, 2)],
      rooms: generateRandValue(1, 5),
      guests: generateRandValue(1, 5),
      checkin: BOOKING_OFFER_CHECKINS[generateRandValue(0, 2)],
      checkout: BOOKING_OFFER_CHECKOUTS[generateRandValue(0, 2)],
      features: generateUniqueRandValue(generateRandBookingOfferFeaturess()),
      description: '',
      photos: {}
    },
  }
}

/*
 * Create location booking on map
 */
var pinBlockAll = document.querySelector('.tokyo__pin-map');

var fragmentPinBlockAll = document.createDocumentFragment();

for (var i = 0; i < 8; i++) {
  var pinObjectBooking = document.createElement('div');

  pinObjectBooking.className = 'pin';
  pinObjectBooking.style = 'left: ' + ObjectBooking[i].offer.address.location.x + 'px; top: ' + ObjectBooking[i].offer.address.location.y + 'px';
  pinObjectBooking.innerHTML = '<img src="' + ObjectBooking[i].author.avatar + '" class="rounded" width="40" height="40">';

  fragmentPinBlockAll.appendChild(pinObjectBooking);
}

pinBlockAll.appendChild(fragmentPinBlockAll);

/*
 * Show on info panel first object booking from array
 */
var templateObjectBooking = document.querySelector('#lodge-template');
var elementTemplateObjectBooking = templateObjectBooking.content.cloneNode(true);

elementTemplateObjectBooking.querySelector('.lodge__title').textContent = ObjectBooking[0].offer.title;
elementTemplateObjectBooking.querySelector('.lodge__address').textContent = ObjectBooking[0].offer.address.location.x + ' ' + ObjectBooking[0].offer.address.location.y;

elementTemplateObjectBooking.querySelector('.lodge__price').innerHTML = ObjectBooking[0].offer.price + ' &#x20bd;/ночь';

elementTemplateObjectBooking.querySelector('.lodge__type').textContent = convertBookingOfferType(ObjectBooking[0].offer.type);

elementTemplateObjectBooking.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + ObjectBooking[0].offer.guests + ' гостей в ' +  ObjectBooking[0].offer.rooms + ' комнатах';
elementTemplateObjectBooking.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + ObjectBooking[0].offer.checkin + ', выезд до ' + ObjectBooking[0].offer.checkout;

elementTemplateObjectBooking.querySelector('.lodge__features').innerHTML = splitBookingOfferFeatures(ObjectBooking[0].offer.features);
elementTemplateObjectBooking.querySelector('.lodge__description').textContent = ObjectBooking[0].description;

var pools = document.querySelectorAll('.dialog');
var blocks = document.querySelectorAll('.dialog__panel');

pools[0].removeChild(blocks[0]);
pools[0].appendChild(elementTemplateObjectBooking)

/*
 * Change avatar first object booking over info panel
 */

var avatar = document.querySelector('.dialog__title');
avatar.children[0].src = ObjectBooking[0].author.avatar;
