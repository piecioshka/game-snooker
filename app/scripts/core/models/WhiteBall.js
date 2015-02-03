define([
    'lodash',
    'core/App',
    'core/models/Ball',
    'core/helpers/PhaserModelHelper'
], function (_, App, Ball, PhaserModelHelper) {
    'use strict';

    function WhiteBall(x, y, key, table) {
        this._phaser = undefined;

        this.initialize(x, y, key, table);
    }

    WhiteBall.prototype = Object.create(Ball.prototype);
    WhiteBall.prototype.constructor = WhiteBall;

    _.extend(WhiteBall.prototype, PhaserModelHelper.prototype);

    return WhiteBall;
});
