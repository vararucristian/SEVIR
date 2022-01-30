import math


def getMidPoint(lat1, lon1, lat2, lon2):
    lat1 = math.radians(lat1)
    lat2 = math.radians(lat2)
    lon1 = math.radians(lon1)
    lon2 = math.radians(lon2)

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    bx = math.cos(lat2) * math.cos(dlon)
    by = math.cos(lat2) * math.sin(dlon)
    lat3 = math.atan2(math.sin(lat1) + math.sin(lat2),
                      math.sqrt((math.cos(lat1) + bx) * (math.cos(lat1) + bx) + by * by))
    lon3 = lon1 + math.atan2(by, math.cos(lat1) + bx)

    R = 6373.0
    a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c
    return math.degrees(lat3), math.degrees(lon3), distance / 2


def getDistance(lat1, lon1, lat2, lon2):
    lat1 = math.radians(lat1)
    lat2 = math.radians(lat2)
    lon1 = math.radians(lon1)
    lon2 = math.radians(lon2)

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    R = 6373.0
    a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c
    return distance


def orderSugestions(lat, long, suggestions: list):
    sorted_suggestions = []
    while len(suggestions):
        min_distance = None
        min_suggestion = None
        for suggestion in suggestions:
            distance = getDistance(lat, long, float(suggestion['latitude']), float(suggestion['longitude']))
            if min_distance == None or min_distance > distance:
                min_distance = distance
                min_suggestion = suggestion

        min_suggestion['distance'] = min_distance
        suggestions.remove(min_suggestion)
        sorted_suggestions.append(min_suggestion)
        lat = float(min_suggestion['latitude'])
        long = float(min_suggestion['longitude'])
    return sorted_suggestions

# print(getMidPoint(47.155182, 27.587311, 47.17345, 27.565))
