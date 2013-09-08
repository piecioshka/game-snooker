(function (global) {
    'use strict';

    // imports
    var document = global.document;

    var $loading = null;
    var $loader = null;

    global.Loader = {
        LOADING_PLACE_HOLDER_ID: 'loading-panel',
        LOADING_PROGRESS_PLACE_HOLDER_ID: 'loader',

        createLoading: function () {
            $loading = document.createElement('div');
            $loading.id = this.LOADING_PLACE_HOLDER_ID;
            $loader = document.createElement('div');
            $loader.id = this.LOADING_PROGRESS_PLACE_HOLDER_ID;
            $loading.appendChild($loader);
            document.body.appendChild($loading);
        },
        destroyLoading: function () {
            $loading.parentNode.removeChild($loading);
        },
        updateLoadingProgress: function (percent) {
            $loader.style.width = (percent / 100 * 300) + "px";
        }
    };
}(this));
