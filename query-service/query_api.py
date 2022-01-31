import json

import flask
import math
import data as lgd
import wikidata as wkd
import helperCoordinates as helperCoord
from flask import request
from flask_cors import CORS, cross_origin

app = flask.Flask(__name__)
app.config["DEBUG"] = True
cors = CORS(app, resources={r"*": {"origins": "*"}})


@cross_origin()
@app.route('/getSuggestions/', methods=['GET'])
def getLinkedGeoDataPoints():
    suggestions =[]
    latitude1 = float(request.args.get('lat1'))
    longitude1 = float(request.args.get('long1'))
    latitude2 = float(request.args.get('lat2'))
    longitude2 = float(request.args.get('long2'))
    nr_hours = float(request.args.get('hours'))
    child = request.args.get('child')
    interests = list(request.args.getlist('interest'))


    latitude, longitude, distance = helperCoord.getMidPoint(latitude1, longitude1, latitude2, longitude2)
    if child == "false" :
        print("daaa")
        for interest in interests:
            suggestions.extend(lgd.get_suggestions_coordinates_by_coordinates_and_type(longitude, latitude, interest, math.ceil(nr_hours/len(interests)), distance))
    else:
        print("nuuu")
        latitudeMid1, longitudeMid1, distance1 = helperCoord.getMidPoint(latitude1, longitude1, latitude, longitude)
        latitudeMid2, longitudeMid2, distance2 = helperCoord.getMidPoint(latitude, longitude, latitude2, longitude2)

        latitudeMid11, longitudeMid11, distance11 = helperCoord.getMidPoint(latitude1, longitude1, latitudeMid1, longitudeMid1)
        latitudeMid21, longitudeMid21, distance21 = helperCoord.getMidPoint(latitudeMid1, longitudeMid1, latitude, longitude)
        latitudeMid12, longitudeMid12, distance12 = helperCoord.getMidPoint(latitude, longitude, latitudeMid2, longitudeMid2)
        latitudeMid22, longitudeMid22, distance22 = helperCoord.getMidPoint(latitudeMid2, longitudeMid2, latitude2, longitude2)
        for interest in interests:
            list_by_interest = []
            list_by_interest.extend(
                lgd.get_suggestions_coordinates_by_coordinates_and_type(longitudeMid22, latitudeMid22, interest,
                                                                        math.ceil(nr_hours / len(interests) / 4),
                                                                        distance22))
            if len(list_by_interest)>=math.ceil(nr_hours / len(interests)):
                suggestions.extend(list_by_interest)
                continue

            list_by_interest.extend(
                lgd.get_suggestions_coordinates_by_coordinates_and_type(longitudeMid12, latitudeMid12, interest,
                                                                        math.ceil(nr_hours / len(interests) / 4),
                                                                        distance12))
            if len(list_by_interest)>=math.ceil(nr_hours / len(interests)):
                suggestions.extend(list_by_interest)
                continue
                
            list_by_interest.extend(
                lgd.get_suggestions_coordinates_by_coordinates_and_type(longitudeMid21, latitudeMid21, interest,
                                                                        math.ceil(nr_hours / len(interests) / 4),
                                                                        distance21))
            if len(list_by_interest)>=math.ceil(nr_hours / len(interests)):
                suggestions.extend(list_by_interest)
                continue

            list_by_interest.extend(lgd.get_suggestions_coordinates_by_coordinates_and_type(longitudeMid11,latitudeMid11, interest, math.ceil(nr_hours / len(interests)/4), distance11))
            suggestions.extend(list_by_interest)

    return json.dumps(helperCoord.orderSugestions(latitude1, longitude1, suggestions))


@cross_origin()
@app.route('/getDetails/', methods=['GET'])
def getWikidataDetails():
    latitude = request.args.get('lat')
    longitude = request.args.get('long')
    distance = request.args.get('dist')
    language = request.args.get('lang')
    jsonData = json.dumps(wkd.get_details_from_wikidata_by_coordinates(longitude, latitude, distance, language))
    return jsonData

app.run()