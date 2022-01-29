from SPARQLWrapper import SPARQLWrapper, JSON


def get_image(longitude, latitude, radius=0.1, language="en"):
    details = dict()
    sparqlwd = SPARQLWrapper("https://query.wikidata.org/sparql")
    sparqlwd.setQuery("""
    SELECT ?place ?placeLabel ?location ?distance WHERE {
       SERVICE wikibase:around { 
         ?place wdt:P625 ?location . 
         bd:serviceParam wikibase:center "Point(""" + str(longitude) + " " + str(latitude) + """)"^^geo:wktLiteral   . 
         bd:serviceParam wikibase:radius """ + "\"" + str(radius) + """" . 
         bd:serviceParam wikibase:distance ?distance .
       } .

       SERVICE wikibase:label {
       bd:serviceParam wikibase:language """ + "\"" + language + """" . 
       }
    }
    ORDER BY ?distance
    LIMIT 1
    """)
    sparqlwd.setReturnFormat(JSON)
    results = sparqlwd.query().convert()
    print(results['results']['bindings'])

def get_details_from_wikidata_by_coordinates(longitude, latitude, radius = 0.1, language = "en"):
    details = dict()
    sparqlwd = SPARQLWrapper("https://query.wikidata.org/sparql")
    sparqlwd.setQuery("""
    SELECT ?place ?placeLabel ?location ?distance ?placeDescription ?image ?address WHERE {
       SERVICE wikibase:around { 
         ?place wdt:P625 ?location . 
         bd:serviceParam wikibase:center "Point(""" + str(longitude) + " " + str(latitude) + """)"^^geo:wktLiteral   . 
         bd:serviceParam wikibase:radius """ + "\"" + str(radius) + """" . 
         bd:serviceParam wikibase:distance ?distance .
       } .
    
       SERVICE wikibase:label {
       bd:serviceParam wikibase:language """ + "\"" + language + """" . 
       } .
       
       OPTIONAL { ?place wdt:P18 ?image  } .
       OPTIONAL { ?place wdt:P6375 ?address  } 
    }
    ORDER BY ?distance
    LIMIT 1
    """)
    sparqlwd.setReturnFormat(JSON)
    results = sparqlwd.query().convert()
    try:
        details['wikidataURL'] = results['results']['bindings'][0]['place']['value']
        details['placeLabel'] = results['results']['bindings'][0]['placeLabel']['value']
        details['longitude'] = results['results']['bindings'][0]['location']['value'].split('(')[1].split(' ')[0]
        details['latitude'] = results['results']['bindings'][0]['location']['value'].split('(')[1].split(' ')[1].split(')')[0]
        details['distance'] = results['results']['bindings'][0]['distance']['value']

        print(results['results']['bindings'])
        if 'image' in results['results']['bindings'][0].keys():
            details['image'] = results['results']['bindings'][0]['image']['value']
        if 'address' in results['results']['bindings'][0].keys():
            details['address'] = results['results']['bindings'][0]['address']['value']
        if 'placeDescription' in results['results']['bindings'][0].keys():
            details['placeDescription'] = results['results']['bindings'][0]['placeDescription']['value']
    except:
        pass
    return details

