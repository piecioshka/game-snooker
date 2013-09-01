describe("Snooker Table", function () {
    var canvas, ctx, game;

    beforeEach(function () {
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');

        game = window.game = new Game();
        game.initialize(function () {
            snooker.table = new snooker.Table();
            snooker.table.ctx = ctx;
            snooker.drawBalls();
        });
    });

    afterEach(function () {
        canvas = null;
        game = null;
    });

    describe("when creating", function () {
        var table1, table2;

        beforeEach(function () {
            table1 = new snooker.Table();
            table2 = new snooker.Table();
        });

        it("should create new object instance", function () {
            expect(table1 === table2).toBeFalsy();
        });

        it("should create the same Table models", function () {
            expect(table1).toEqual(table2);
        });
    });
});