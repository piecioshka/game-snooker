describe("Snooker Game", function() {
    describe("when starting game", function() {
        var table;

        beforeEach(function () {

        });

        xit("should create table", function () {
            expect(snooker.Table).toHaveBeenCalled();
        });

        xit("should create balls", function () {
            expect(snooker.Ball).toHaveBeenCalled();
        });

        xit("should create cues", function () {
            expect(snooker.Cue).toHaveBeenCalled();
        });

        it("create smaller balls than table", function () {
            expect(BALL_RADIUS).toBeLessThan(TABLE_WIDTH);
            expect(BALL_RADIUS).toBeLessThan(TABLE_HEIGHT);
        });

        it("create smaller cue than table", function () {
            expect(CUE_WIDTH).toBeLessThan(TABLE_WIDTH);
            expect(CUE_HEIGHT).toBeLessThan(TABLE_HEIGHT);
        });
    });
});
