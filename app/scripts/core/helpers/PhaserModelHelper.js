define([
    'phaser'
], function (Phaser) {
    'use strict';

    function PhaserModelHelper() {

    }

    PhaserModelHelper.prototype.getPhaser = function () {
        return this._phaser;
    };

    return PhaserModelHelper;
});
