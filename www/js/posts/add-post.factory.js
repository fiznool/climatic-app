(function() {
  'use strict';

  angular
    .module('climatic')
    .factory('AddPostModal', AddPostModal);

  function AddPostModal($q, $rootScope, $window, $ionicModal, $ionicPlatform, $ionicPopup, $cordovaCamera) {

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

        // Setup the modal formData.
        $ctrl.formData = {
          title: null,
          description: null,
          picture: null
        };

        // Set up the modal scope functions.
        $ctrl.save = save;
        $ctrl.cancel = cancel;
        $ctrl.addPicture = addPicture;

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

        function addPicture() {
          $ionicPlatform.ready(function() {
            var Camera = $window.Camera;
            if(!Camera) {
              return _onCameraError({ msg: 'No Camera object!'});
            }
            var options = {
              quality: 80,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.CAMERA,
              allowEdit: true,
              encodingType: Camera.EncodingType.JPEG,
              targetWidth: 960,
              saveToPhotoAlbum: false,
              correctOrientation: true
            };

            $cordovaCamera
              .getPicture(options)
              .then(function(imageData) {
                $ctrl.formData.picture = imageData;

              }, function(err) {
                if(err === 'Camera cancelled.') {
                  // The user closed the camera.
                  return;
                }

                // Otherwise, there was a genuine error!
                _onCameraError(err);
              });
          });
        }

        function _onCameraError(err) {
          console.log('Error getting picture:');
          console.dir(err);

          $ionicPopup.alert({
            title: 'Error',
            template: 'There was an error when taking your picture. Please try again.'
          });
        }
      });
    }
  }
})();
