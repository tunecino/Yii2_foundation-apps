(function() {
  'use strict';

  angular
   .module('API')
   .factory('Collection', Collection);


  Collection.$inject = ['Restangular', '$q'];
  function Collection(Restangular, $q) {

    var _route;
    var _perPage;
    var _links;
    var _meta = {};

    Restangular.setFullResponse(true);

    function Collection(collectionName) {
        if (typeof collectionName === "undefined") {
            throw new Error("collection name is missing");
        }
        _route = collectionName;
    };

    Collection.prototype = {
        setData: function(response) {
            var data = response.data.plain();

            _meta.$currentPage = +response.headers('X-Pagination-Current-Page');
            _meta.$pageCount   = +response.headers('X-Pagination-Page-Count');
            _meta.$perPage     = +response.headers('X-Pagination-Per-Page');
            _meta.$totalCount  = +response.headers('X-Pagination-Total-Count');

            _links = helpers.parse_link_header(response.headers('Link'));

            return angular.extend(this, data);
        },
        load: function(perPage) {
            var deferred = $q.defer();
            var scope = this;
            _perPage = perPage;
            Restangular.all(_route).getList({'page':1, 'per-page':perPage})
            .then(function(collectionData) {
                var e = scope.setData(collectionData)
                deferred.resolve(e);
            }, 
            function errorCallback(response) {
                deferred.reject();
                console.log("Error: Resource couldn't be loaded | status code:", response.status);
            });
            return deferred.promise;
        },
        firstPage: function() {
            var scope = this;
            if (scope.isFirst() === true) return false;
            Restangular.allUrl(_route, _links.first).getList()
            .then(function(collectionData) {
                scope.setData(collectionData);
            });
        },
        nextPage: function() {
            var scope = this;
            if (scope.existNext() === false) return false;
            Restangular.allUrl(_route, _links.next).getList()
            .then(function(collectionData) {
                scope.setData(collectionData);
            });
        },
        prevPage: function() {
            var scope = this;
            if (scope.existPrev() === false) return false;
            Restangular.allUrl(_route, _links.prev).getList()
            .then(function(collectionData) {
                scope.setData(collectionData);
            });
        },
        lastPage: function() {
            var scope = this;
            if (scope.isLast() === true) return false;
            Restangular.allUrl(_route, _links.last).getList()
            .then(function(collectionData) {
                scope.setData(collectionData);
            });
        },
        Page: function(pageNumber) {
            var scope = this;
            if (_meta.$currentPage === pageNumber) return false;
            Restangular.all(_route).getList({'page':pageNumber, 'per-page':_perPage})
            .then(function(collectionData) {
                scope.setData(collectionData);
            });
        },
        Refresh: function() {
            var scope = this;
            Restangular.allUrl(_route, _links.self).getList()
            .then(function(collectionData) {
                scope.setData(collectionData);
            });
        },
        // meta pagination methods
        meta:      function() { return _meta; },
        isFirst:   function() { return _meta.$currentPage === 1; },
        isLast:    function() { return _meta.$currentPage === _meta.$pageCount; },
        existNext: function() { return typeof _links.next !== "undefined" },
        existPrev: function() { return typeof _links.prev !== "undefined" },
    };
    return Collection;
}

})();


