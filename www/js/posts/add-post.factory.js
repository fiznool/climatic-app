(function() {
  'use strict';

  angular
    .module('climatic')
    .factory('AddPostModal', AddPostModal);

  function AddPostModal($q, $rootScope, $ionicModal) {

    var service = {
      reveal: reveal
    };
    return service;

    ////////////////

    function reveal() {
      var scope = $rootScope.$new();
      scope.$ctrl = {};
      var config = {
        scope: scope,
        animation: 'slide-in-up',
        focusFirstInput: false,
        backdropClickToClose: false,
        hardwareBackButtonClose: true
      };

      return $ionicModal
        .fromTemplateUrl('tmpl/posts/add-post-modal.html', config)
        .then(_activate);
    }

    function _activate(modal) {
      return $q(function(resolve, reject) {
        var $ctrl = modal.scope.$ctrl;

        // Set up the modal scope functions.
        $ctrl.save = save;
        $ctrl.cancel = cancel;

        // Show the modal.
        modal.show();

        function save() {
          console.log($ctrl.formData);
          _close().then(function() {
            resolve();
          });
        }

        function cancel() {
          _close().then(function() {
            reject('cancelled');
          });
        }

        function _close() {
          return modal.remove();
        }
      });
    }
  }
})();
