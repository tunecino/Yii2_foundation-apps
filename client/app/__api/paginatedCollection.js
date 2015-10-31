(function() {
  'use strict';

  angular
   .module('API')
   .factory('Collection', Collection);


  Collection.$inject = ['Restangular', '$q', 'HTTPCache'];
  function Collection(Restangular, $q, HTTPCache) {

    var _route;
    var _perPage;
    var _expand;
    var _fields;

    var _links = {};
    var _meta = {};

    var _prepareNext;

    Restangular.setFullResponse(true);

    function Collection(collectionName, prepareNext) {
        if (typeof collectionName === "undefined") {
            throw new Error("collection name is missing");
        }
        _route = collectionName;
        _prepareNext = _.isUndefined(prepareNext) ? false : prepareNext;
    };

    Collection.prototype = {
        setData: function(response) {
            var data = response.data.plain();

            helpers.delete_properties(this);

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
            Restangular.all(_route).getList({'page':1, 'per-page':perPage, 'expand':_expand, 'fields':_fields})
            .then(function(collectionData) {
                var e = scope.setData(collectionData);
                deferred.resolve(e);
            }, 
            function errorCallback(e) {
                deferred.reject();
                console.log("Error: Resource couldn't be loaded | status code:", e.status);
            })
            .then(function() {
                if (_prepareNext) scope._prepareNextPage();
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
            })
            .then(function() {
                if (_prepareNext) scope._prepareNextPage();
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
            var url = helpers.remove_param_from_url(_links.self, 'page');
            Restangular.allUrl(_route, url).getList({'page':pageNumber})
            .then(function(collectionData) {
                scope.setData(collectionData);
            })
            .then(function() {
                if (_prepareNext) scope._prepareNextPage();
            });
        },
        Refresh: function() {
            var scope = this;
            HTTPCache.remove();
            Restangular.allUrl(_route, _links.self).getList()
            .then(function(collectionData) {
                scope.setData(collectionData);
            });
        },
        // fields, expand & filters
        select: function(fields)   { _fields = _.isArray(fields) ? fields.join() : fields },
        with:   function(resource) { _expand = _.isArray(resource) ? resource.join() : resource },
        where:  function(params) { 
            var scope = this;
            params['per-page'] = _perPage;
            params['expand'] = _expand;
            params['fields'] = _fields;
            Restangular.all(_route).getList(params)
            .then(function(collectionData) {
                scope.setData(collectionData);
            });
        },
        // meta pagination methods
        meta:      function() { return _meta },
        isFirst:   function() { return _meta.$currentPage === 1 },
        isLast:    function() { return _meta.$currentPage === _meta.$pageCount },
        existNext: function() { return typeof _links.next !== "undefined" },
        existPrev: function() { return typeof _links.prev !== "undefined" },
        // for local use
        _prepareNextPage: function() {
            var scope = this;
            if (scope.existNext() === false) return false;
            Restangular.allUrl(_route, _links.next).getList();
        },
    };
    return Collection;
}

})();


