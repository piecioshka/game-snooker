describe("Snooker Ball", function () {
    var canvas, ctx;

    beforeEach(function () {
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
    });

    afterEach(function () {
        canvas = null;
    });

    describe("when creating", function () {
        var ball1, ball2;

        beforeEach(function () {
            ball1 = new snooker.Ball("red", ctx, {x:0,y:0});
            ball2 = new snooker.Ball("white", ctx, {x:0,y:0});
        });

        it("should throws errors when don't set color", function () {
            expect(snooker.Ball).toThrow();
        });

        it("should create new object instance", function () {
            expect(ball1 === ball2).toBeFalsy();
        });
    });
});