class Distance {
    static getDistance(point1, point2) {
        let deg2rad = (deg) => {
            return deg * (Math.PI / 180)
        };
        let earthRadius = 6371; // Radius of the earth in km
        let dLat = deg2rad(point2[0] - point1[0]);  // deg2rad below
        let dLon = deg2rad(point2[1] - point1[1]);
        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(point1[0])) * Math.cos(deg2rad(point2[0])) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let distance = earthRadius * c; // Distance in km
        return distance;
    }
}
export { Distance };