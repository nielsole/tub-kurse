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

    var serializeFacet = function(type, values){
        var quotedValues = values.map((auspraegung)=>{
            type = type.slice(type.indexOf(".")+1,type.length);
            //TODO This query can be hijacked. Add escaping for JSON.
            return type + ":\"" + auspraegung + "\"";
        });
        return quotedValues.join(" OR ");
    };
    // Promise-based API
    return {

        loadQuery: function(facets, queryString){
            var facetsForQuery=["type:\"Event\"","available:availabilityStarts:availabilityEnds"];
            if (facets != null && queryString != null){
                Object.keys(facets).forEach((facetName)=>{
                   facetsForQuery.push(serializeFacet(facetName,facets[facetName]));
                });
            }
            var deferred = $q.defer();
            var query = {"size":30,"query":queryString||"*","filter":facetsForQuery};
            elasticResource.action1(query, success =>{
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

                //console.log(ret);
                deferred.resolve(ret);
            });
            return deferred.promise;
        }
        }
}

export default ['$q', '$resource', ElasticService];

