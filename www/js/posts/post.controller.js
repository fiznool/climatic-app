(function() {
  'use strict';

  angular
    .module('climatic')
    .controller('PostController', PostController);

  function PostController($stateParams, Posts) {
    var $ctrl = this;
    $ctrl.title = 'PostController';

    activate();

    ////////////////

    function activate() {
      // TODO get post by ID, set to `$ctrl`
      $ctrl.post = Posts.getPostById($stateParams.id);
    }
  }
})();
