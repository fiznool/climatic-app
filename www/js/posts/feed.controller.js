(function() {
  'use strict';

  angular
    .module('climatic')
    .controller('FeedController', FeedController);

  function FeedController(Posts, $scope, $q, $ionicLoading, $timeout) {
    var $ctrl = this;
    $ctrl.title = 'FeedController';
    $ctrl.loadNext = loadNext;

    activate();

    ////////////////

    function activate() {
      $q.resolve()
        .then($ionicLoading.show)
        .then(loadFirst)
        .finally($ionicLoading.hide);
    }

    function loadFirst() {
      var promises = [
        Posts.getPosts(),
        $timeout(500)
      ];
      return $q.all(promises)
        .then(function(response) {
          _onLoadSuccess(response[0]);
        });
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
      return $q.resolve();
    }
  }
})();
