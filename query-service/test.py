from SPARQLWrapper import SPARQLWrapper, JSON

sparqlwd = SPARQLWrapper("https://sophox.org/sparql")
sparqlwd.setQuery("""
Prefix osmt: <https://wiki.openstreetmap.org/wiki/key:>

SELECT ?osm ?name ?wd ?wdLabel WHERE {
  ?osm osmt:place ?place;
       osmt:capital "4";
       osmt:name ?name;
       osmt:wikidata ?wd.
  
  SERVICE <https://query.wikidata.org/sparql> {
    # Get the item’s label in Chinese
    ?wd rdfs:label ?wdLabel.
    FILTER(LANG(?wdLabel) = "zh")
  }
}
ORDER BY ?name
""")
sparqlwd.setReturnFormat(JSON)
results = sparqlwd.query().convert()
for result in results['results']['bindings']:
    print(result)


# from SPARQLWrapper import SPARQLWrapper, JSON
#
# sparqlwd = SPARQLWrapper("https://query.wikidata.org/sparq")
# sparqlwd.setQuery("""
# SELECT ?s ?0 WHERE {}
# """)
# sparqlwd.setReturnFormat(JSON)
# results = sparqlwd.query().convert()
# for result in results['results']['bindings']:
#     print(result)
