export const googleResult = {
  cached: false,
  result: {
    address_components: [
      {
        long_name: 'Japan',
        short_name: 'JP',
        types: ['country', 'political'],
      },
    ],
    formatted_address: 'Japan',
    geometry: {
      bounds: {
        northeast: {
          lat: 45.6412626,
          lng: 154.0031455,
        },
        southwest: {
          lat: 20.3585295,
          lng: 122.8554688,
        },
      },
      location: {
        lat: 36.204824,
        lng: 138.252924,
      },
      location_type: 'APPROXIMATE',
      viewport: {
        northeast: {
          lat: 47.23074,
          lng: 155.0957938,
        },
        southwest: {
          lat: 19.7696372,
          lng: 119.2119354,
        },
      },
    },
    place_id: 'ChIJLxl_1w9OZzQRRFJmfNR1QvU',
    types: ['country', 'political'],
  },
};

export const fullAddressResult = {
  cached: false,
  result: {
    address_components: [
      {
        long_name: '21',
        short_name: '21',
        types: ['street_number'],
      },
      {
        long_name: 'Yehuda Hayamit Street',
        short_name: 'Yehuda Hayamit St',
        types: ['route'],
      },
      {
        long_name: 'Tel Aviv-Yafo',
        short_name: 'Tel Aviv-Yafo',
        types: ['locality', 'political'],
      },
      {
        long_name: 'Tel Aviv District',
        short_name: 'Tel Aviv District',
        types: ['administrative_area_level_1', 'political'],
      },
      {
        long_name: 'Israel',
        short_name: 'IL',
        types: ['country', 'political'],
      },
    ],
    formatted_address: 'Yehuda Hayamit St 21, Tel Aviv-Yafo, Israel',
    geometry: {
      location: {
        lat: 32.0496725,
        lng: 34.7572445,
      },
      location_type: 'ROOFTOP',
      viewport: {
        northeast: {
          lat: 32.0510491302915,
          lng: 34.7585975302915,
        },
        southwest: {
          lat: 32.0483511697085,
          lng: 34.7558995697085,
        },
      },
    },
    place_id: 'ChIJlQUW9LlMHRUR2rWz-bo5sUs',
    plus_code: {
      compound_code: '2QX4+VV Tel Aviv-Yafo, Israel',
      global_code: '8G4P2QX4+VV',
    },
    types: ['street_address'],
  },
};
