(function() {
  'use strict';

  angular
    .module('climatic')
    .controller('FeedController', FeedController);

  function FeedController(Posts, $scope) {
    var $ctrl = this;
    $ctrl.title = 'FeedController';
    $ctrl.loadNext = loadNext;

    activate();

    ////////////////

    function activate() {
      Posts.getPosts().then(_onLoadSuccess);
    }


    function loadNext() {
      Posts.getNextPosts()
        .then(_onLoadSuccess)
        .then(function() {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    function _onLoadSuccess(response) {
      $ctrl.posts = response.posts;
      $ctrl.hasMorePosts = response.hasMore;
    }
  }
})();
