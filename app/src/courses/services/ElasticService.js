/**
 * Users DataService
 * Uses embedded, hard-coded data model; acts asynchronously to simulate
 * remote data service call(s).
 *
 * @returns {{loadAll: Function}}
 * @constructor
 */
function ElasticService($q, $resource) {
    var elasticResource = $resource("https://stappsbe01.innocampus.tu-berlin.de/search", {}, {
        action1: {
            method: 'POST',
            headers: {
                'X-StApps-Version': '0.8.1'
            }
        }
    });

    // Promise-based API
    return {
        /*loadAllUsers: function() {
            // Simulate async nature of real remote calls
            return $q.when(users);
        },*/
        loadQuery: function(facets, queryString){
            var deferred = $q.defer();
            var query = {"size":30,"query":queryString||"*","filter":["type:\"Event\"","available:availabilityStarts:availabilityEnds"]};
            elasticResource.action1(query, success =>{
                console.log(success);
                var ret = {
                    facets: [],
                    data: success.data
                };
                success.facets.forEach((facet) =>{
                    var buckets = [];
                    facet.buckets.forEach((bucket)=>{
                        for(var bucketName in bucket){
                            if (bucket.hasOwnProperty(bucketName)){
                                buckets.push({
                                    name: bucketName,
                                    count: bucket[bucketName]
                                })
                            }
                        }
                    });
                    ret.facets.push ({
                        name: facet.field,
                        buckets: buckets
                    });
                });

                console.log(ret);
                deferred.resolve(ret);
            });
            return deferred.promise;
        }
        }
}

export default ['$q', '$resource', ElasticService];

