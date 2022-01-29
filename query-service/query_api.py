import json

import flask
import data as lgd
import wikidata as wkd
import helperCoordinates as helperCoord
from flask import request

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/getSuggestions/', methods=['GET'])
def getLinkedGeoDataPoints():
    latitude1 = float(request.args.get('lat1'))
    longitude1 = float(request.args.get('long1'))
    latitude2 = float(request.args.get('lat2'))
    longitude2 = float(request.args.get('long2'))
    interest = request.args.get('interest')

    latitude, longitude, distance = helperCoord.getMidPoint(latitude1, longitude1, latitude2, longitude2)

    jsonData = json.dumps(lgd.get_suggestions_coordinates_by_coordinates_and_type(longitude, latitude, interest, distance))
    return jsonData

@app.route('/getDetails/', methods=['GET'])
def getWikidataDetails():
    latitude = request.args.get('lat')
    longitude = request.args.get('long')
    distance = request.args.get('dist')
    language = request.args.get('lang')
    jsonData = json.dumps(wkd.get_details_from_wikidata_by_coordinates(longitude, latitude, distance, language))
    return jsonData

app.run()