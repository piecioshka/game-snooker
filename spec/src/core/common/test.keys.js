describe("common/keys", function() {
    it("should exists all 4 arrows", function () {
        expect(Keys.LEFT).toBeDefined();
        expect(Keys.UP).toBeDefined();
        expect(Keys.RIGHT).toBeDefined();
        expect(Keys.DOWN).toBeDefined();
    });
    it("should be defined with good key codes", function () {
        expect(Keys.LEFT).toEqual(37);
        expect(Keys.UP).toEqual(38);
        expect(Keys.RIGHT).toEqual(39);
        expect(Keys.DOWN).toEqual(40);
    });
});