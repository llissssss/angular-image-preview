(function() {
    'use strict';

    angular.module('llissssss.image-preview', ['ngAnimate']).directive('llImagePreview', llImagePreview);

    function llImagePreview() {
        return {
            restrict: 'A',
            scope: {
                llImagePreview: '@',
                appendTo:       '@?'
            },
            link: function(scope, element, attrs) {
                var appendTo = scope.appendTo ? scope.appendTo : 'body';

                var xOffset = 10;
                var yOffset = 30;

                function locateImageNextToCursor(e) {
                    angular.element(document.querySelector(appendTo + " #ll-image-preview-tooltip")).css('top', (e.pageY + yOffset) + "px");
                    angular.element(document.querySelector(appendTo + " #ll-image-preview-tooltip")).css('left', (e.pageX - xOffset) + "px");
                }

                element.bind('mouseenter', function(e) {
                    var tooltip = angular.element(document.querySelector(appendTo + ' #ll-image-preview-tooltip')) || null;
                    if (tooltip.length == 0) {
                        angular.element(document.querySelector(appendTo)).append("<p id='ll-image-preview-tooltip'></p>");
                    }
                    angular.element(document.querySelector(appendTo + ' #ll-image-preview-tooltip')).html("<img src='"+ scope.llImagePreview +"' alt='Loading image...' />");
                    angular.element(document.querySelector(appendTo + " #ll-image-preview-tooltip")).addClass("visible");
                    locateImageNextToCursor(e);
                });

                element.bind('mousemove', locateImageNextToCursor);

                element.bind('mouseleave', function(e) {
                    angular.element(document.querySelector(appendTo + " #ll-image-preview-tooltip")).remove();
                });


            }
        };
    }

})();