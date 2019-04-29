const distanceBetweenTwoGeoPoints = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
	const dLat = (lat2-lat1) * Math.PI / 180;
	const dlng = (lng2-lng1) * Math.PI / 180;
	const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
		Math.sin(dlng/2) * Math.sin(dlng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;
	return d;
}

const distanceConverter = (distance) => {
	if(!distance) {
		return null;
	}
	return distance > 1 ? Math.round(distance) + 'km' : Math.round(distance * 1000) + 'm';
}

export {
    distanceBetweenTwoGeoPoints,
	distanceConverter
}