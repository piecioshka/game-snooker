(function (global) {
    "use strict";

    // imports
    var _ = global._;

    function ResourceLoader() {
        this.resourcesList = {};
        this.loadedResources = 0;
    }

    var ResourceType = {
        IMAGE: 1
    };

    ResourceLoader.prototype.addResource = function (name, url, type) {
        this.resourcesList[name] = {
            "url": url,
            "type": type
        };
    };

    ResourceLoader.prototype._loadImage = function (url) {
        var self = this;
        var img = new Image();
        img.src = url;

        Events.bind(img, "load", function () {
            self.loadedResources++;
        });

        return img;
    };

    ResourceLoader.prototype.preloadingResources = function () {
        var self = this;
        _.each(this.resourcesList, function (resource, name) {
            switch (resource.type) {
                case ResourceType.IMAGE:
                    self.resourcesList[name].img = self._loadImage(resource.url);
                    break;
            }
        });
    };

    ResourceLoader.prototype.isAllResourcesLoaded = function () {
        var maxLoad = _.size(this.resourcesList);
        var currentLoaded = this.loadedResources;
        return maxLoad === currentLoaded;
    };

    ResourceLoader.prototype.getPercentStatus = function () {
        var maxLoad = _.size(this.resourcesList);
        var currentLoaded = this.loadedResources;
        return ((currentLoaded / maxLoad) * 100).toFixed(2);
    };

    ResourceLoader.prototype.getResource = function (name) {
        return this.resourcesList[name] || null;
    };

    // exports
    global.ResourceLoader = ResourceLoader;
    global.ResourceType = ResourceType;

}(this));
