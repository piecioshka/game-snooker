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

    ResourceLoader.prototype = {
        addResource: function (name, url, type) {
            this.resourcesList[name] = {
                "url": url,
                "type": type
            };
        },
        _loadImage: function (url) {
            var self = this;
            var img = new Image();
            img.src = url;

            Events.bind(img, "load", function () {
                self.loadedResources++;
            });

            return img;
        },
        preLoadingResources: function () {
            var self = this;
            _.each(this.resourcesList, function (resource, name) {
                switch (resource.type) {
                    case ResourceType.IMAGE:
                        self.resourcesList[name].img = self._loadImage(resource.url);
                        break;
                }
            });
        },
        isAllResourcesLoaded: function () {
            var maxLoad = _.size(this.resourcesList);
            var currentLoaded = this.loadedResources;
            return maxLoad === currentLoaded;
        },
        getPercentStatus: function () {
            var maxLoad = _.size(this.resourcesList);
            var currentLoaded = this.loadedResources;
            return ((currentLoaded / maxLoad) * 100).toFixed(2);
        },
        getResource: function (name) {
            return this.resourcesList[name] || null;
        }
    };

    // exports
    global.ResourceLoader = ResourceLoader;
    global.ResourceType = ResourceType;

}(this));
