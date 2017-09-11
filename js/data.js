'use strict';

/*
 * Generate 8 object booking and init random value
 */
(function () {
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

  var window.objectBookings = [];

  for (var i = 0; i < 8; i++) {
    window.data.objectBookings[i] = {
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
})();