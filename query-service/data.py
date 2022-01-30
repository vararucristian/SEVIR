import random

from SPARQLWrapper import SPARQLWrapper, JSON
import wikidata as wd
import helperCoordinates as helperCoord


def get_suggestions_coordinates_by_coordinates_and_type(longitude, latitude, interest_point_type, nr_places, distance = 1):
    suggestions = []
    sparqlwd = SPARQLWrapper("http://linkedgeodata.org/sparql")
    sparqlwd.setQuery("""
    Prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    Prefix ogc: <http://www.opengis.net/ont/geosparql#>
    Prefix geom: <http://geovocab.org/geometry#>
    Prefix lgdo: <http://linkedgeodata.org/ontology/>
    
    Select  distinct ?g ?l {
      ?s a lgdo:""" + interest_point_type + """;
        rdfs:label ?l ;    
        geom:geometry [
          ogc:asWKT ?g
        ] .
    
        Filter(bif:st_intersects (?g, bif:st_point (""" + str(longitude) + ", " + str(latitude) + """), """
                                  + str(distance) + """)) .
    }
    """)
    sparqlwd.setReturnFormat(JSON)
    results = sparqlwd.query().convert()
    for result in results['results']['bindings']:
        suggestion = dict()
        suggestion['longitude'] = float(result['g']['value'].split('(')[1].split(' ')[0])
        suggestion['latitude'] = float(result['g']['value'].split('(')[1].split(' ')[1].split(')')[0])
        suggestion['placeName'] = result['l']['value']
        suggestion['interest'] = interest_point_type
        try:
            suggestion['lang'] = result['l']['xml:lang']
        except:
            pass
        suggestions.append(suggestion)
    for suggestion in suggestions:
        for suggestion2 in suggestions:
            if(suggestion['longitude'] == suggestion2['longitude'] and suggestion['latitude'] == suggestion2['latitude']):
                if 'lang' in suggestion2.keys():
                    suggestion['placeName_' + suggestion2['lang']] = suggestion2['placeName']
                    suggestions.remove(suggestion2)

    random.shuffle(suggestions)
    # for sugestion in suggestions:
    #     distance =  helperCoord.getDistance(latitude, longitude, suggestion['latitude'], suggestion['longitude'])

    return suggestions[:int(nr_places)]

# print("Museum: ")
# museums = get_suggestions_coordinates_by_coordinates_and_type( 27.587311, 47.155182, "TourismThing", 5)
# for museum in museums:
#     print(museum)
#     print(museum['longitude'], museum['latitude'])
#     print(wd.get_details_from_wikidata_by_coordinates( museum['longitude'], museum['latitude'], 1, "en"))
# print("Shop: ")
# print(get_suggestions_coordinates_by_coordinates_and_type(27.587311, 47.155182, "Shop", 5))
# print("Amenity: ")
# print(get_suggestions_coordinates_by_coordinates_and_type(27.587311, 47.155182, "Amenity", 5))
# print("HistoricThing: ")
# print(get_suggestions_coordinates_by_coordinates_and_type(27.587311, 47.155182, "HistoricThing", 5))
# print("Leisure :")
# print(get_suggestions_coordinates_by_coordinates_and_type(27.587311, 47.155182, "Leisure", 5))
# print("TourismThing :")
# print(get_suggestions_coordinates_by_coordinates_and_type(27.587311, 47.155182, "TourismThing", 5))
# print("SportThing :")
# print(get_suggestions_coordinates_by_coordinates_and_type(27.587311, 47.155182, "SportThing", 5))
# print("PublicTransportThing :")
# print(get_suggestions_coordinates_by_coordinates_and_type(27.587311, 47.155182, "PublicTransportThing", 5))
# print("Place :")
# print(get_suggestions_coordinates_by_coordinates_and_type(27.587311, 47.155182, "Place", 5))

