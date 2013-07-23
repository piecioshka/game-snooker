describe("snooker", function() {
    describe("create table", function() {
        var table;

        beforeEach(function () {
            table = new snooker.Table();
        });

        it("should have *create* fn", function () {
            expect(table.create).toBeDefined();
        });
    });
});
