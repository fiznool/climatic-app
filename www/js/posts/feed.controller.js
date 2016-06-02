(function() {
  'use strict';

  angular
    .module('climatic')
    .controller('FeedController', FeedController);

  function FeedController(Posts) {
    var $ctrl = this;
    $ctrl.title = 'FeedController';

    activate();

    ////////////////

    function activate() {
      Posts.getPosts().then(function(response) {
        $ctrl.posts = response.data;
      });
    }
  }
})();
