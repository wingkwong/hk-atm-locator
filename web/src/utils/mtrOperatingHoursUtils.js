import MTR_OPERATING_HOURS from '../data/ref_mtr_operating_hours.json';

const getOperatingHoursByStation = (station) => {
    // Expected Input: "MTR Tin Shui Wai Station"
    const isMatch = station.match('(MTR (.*?) Station)');
    if(isMatch != null) {
        station = isMatch[2] 
    }
    
    var d = MTR_OPERATING_HOURS.filter( (data) => {
        return data.english_name == station
    })

    if(d.length > 0) {
        d = d[0];
        return {
            'open_time': d.open_time,
            'close_time': d.close_time
        };
    } 

    return null;
}

export {
    getOperatingHoursByStation
}