(function() {
  'use strict';

  angular
    .module('climatic')
    .factory('Posts', Posts);

  function Posts($q) {
    // To begin with, let's just set some static data.
    // Later, we'll fetch this dynamically.
    var posts = [{
      title: 'It\'s Sunny!',
      description: 'A lovely sunny day, as we look over the hills.',
      img: 'sunny-1'
    }, {
      title: 'It\'s Raining.',
      description: 'It\'s really quite murky here.',
      img: 'gloomy-1'
    }, {
      title: 'It\'s Windy!',
      description: 'Batten down the hatches!!!',
      img: 'windy-1'
    }, {
      title: 'It\'s a bit chilly.',
      description: 'Pack your hat and gloves, it\'s a chilly one today.',
      img: 'cloudy-1'
    }, {
      title: 'Storms a-coming!',
      description: 'The outlook is rain, wind, fire and brimstone.',
      img: 'stormy-1'
    }, {
      title: 'Tranquility.',
      description: 'Turn on, tune in, zone out.',
      img: 'tranquil-1'
    }];

    var service = {
      getPosts: getPosts
    };
    return service;

    ////////////////

    function getPosts() {
      return $q.resolve({data: posts});
    }
  }
})();
