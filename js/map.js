'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var BOOKING_OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var BOOKING_OFFER_TYPES = ['flat', 'house', 'bungalo'];

var BOOKING_OFFER_CHECKINS = ['12:00', '13:00', '14:00'];

var BOOKING_OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];

var BOOKING_OFFER_FEATURESS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var generateRandValue = function (minValue, maxValue) {
  return Math.round(minValue - 0.5 + Math.random() * (maxValue - minValue + 1));
};

var generateRandBookingOfferFeaturess = function () {
  return [BOOKING_OFFER_FEATURESS[generateRandValue(0, 5)], BOOKING_OFFER_FEATURESS[generateRandValue(0, 5)], BOOKING_OFFER_FEATURESS[generateRandValue(0, 5)], BOOKING_OFFER_FEATURESS[generateRandValue(0, 5)], BOOKING_OFFER_FEATURESS[generateRandValue(0, 5)]];
};

var generateUniqueRandValue = function (randValueArray) {
  for (var i = 0; i < randValueArray.length; i++) {
    for (var j = i + 1; j < randValueArray.length; j++) {
      if (randValueArray[i] === randValueArray[j]) {
        randValueArray.splice(j, 1);
        j--;
      }
    }
  }
  return randValueArray;
};

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

/*
 * Generate 8 object booking and init random value
 */
var objectBookings = [];

for (var i = 0; i < 8; i++) {
  objectBookings[i] = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
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
  };
}

/*
 * Event Handler Info panel
 */

var pinObjectBookingCloseInfoPanel = function () {
  var deactivePin = document.getElementsByClassName('pin--active');
  if (deactivePin.length !== 0) {
    deactivePin[0].classList.remove('pin--active');
  }

  var infoPanel = document.querySelector('.dialog');

  infoPanel.classList.add('hidden');
};

var infoPanelButtonCloseClickHandler = function () {
  pinObjectBookingCloseInfoPanel();
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

  showObjectBookingOnInfoPanel(objectBookings[currentPin.value]);
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

for (i = 0; i < 8; i++) {
  var pinObjectBooking = document.createElement('div');

  pinObjectBooking.className = 'pin';
  pinObjectBooking.style = 'left: ' + objectBookings[i].offer.address.location.x + 'px; top: ' + objectBookings[i].offer.address.location.y + 'px';
  pinObjectBooking.innerHTML = '<img src="' + objectBookings[i].author.avatar + '" class="rounded" width="40" height="40" tabindex="' + (i + 10) + '">';
  pinObjectBooking.value = i;

  fragmentPinBlockAll.appendChild(pinObjectBooking);

  pinObjectBooking.addEventListener('click', pinObjectBookingClickHandler);
  pinObjectBooking.addEventListener('keydown', pinObjectBookingKeydownHandler);
}

pinBlockAll.appendChild(fragmentPinBlockAll);

/*
 * Show on info panel first object booking from array
 */
var showObjectBookingOnInfoPanel = function (objectBooking) {
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
};

showObjectBookingOnInfoPanel(objectBookings[0]);

var infoPanelButtonClose = document.querySelector('.dialog__close');
infoPanelButtonClose.addEventListener('click', infoPanelButtonCloseClickHandler);

/*
 * Tuning input form
 */
var fieldTimeIn = document.getElementById('timein');
var fieldTimeOut = document.getElementById('timeout');
var fieldType = document.getElementById('type');
var fieldPrice = document.getElementById('price');
var fieldRoom = document.getElementById('room_number');
var fieldCapacity = document.getElementById('capacity');

fieldTimeIn.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value !== fieldTimeOut.value) {
    fieldTimeOut.value = target.value;
  }
});

fieldTimeOut.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value !== fieldTimeIn.value) {
    fieldTimeIn.value = target.value;
  }
});

fieldType.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value === 'flat') {
    fieldPrice.value = 1000;
  }
  if (target.value === 'bungalo') {
    fieldPrice.value = 0;
  }
  if (target.value === 'house') {
    fieldPrice.value = 5000;
  }
  if (target.value === 'palace') {
    fieldPrice.value = 10000;
  }
});

fieldRoom.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value === '1') {
    fieldCapacity.value = 1;
  }
  if (target.value === '2') {
    fieldCapacity.value = 2;
  }
  if (target.value === '3') {
    fieldCapacity.value = 3;
  }
  if (target.value === '100') {
    fieldCapacity.value = 0;
  }
});
