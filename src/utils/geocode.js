const request= require('request');


const geocode = (address,callback)=>{
    const baseUrl = "https://api.mapbox.com/geocoding/v5/";
    const endpoint = "mapbox.places/"
    const search = address+".json"
    const auth = "?access_token=pk.eyJ1IjoianNpZXJyYXYiLCJhIjoiY2s3M2xodTh6MDB0ajNtcW9rN2pxaHE0cCJ9.z_ao_vuWyKoOvTeBYo63Bg";
    
    const url1 = baseUrl+endpoint+search+auth;
    request({url:url1,method:'GET',json:true},(error,response)=>{
        if(error){
            callback('unable to connect to mapbox API',undefined)
        }else if(response.body.features===0){
            callback('Unable to find location, try another search',undefined)
        }else{
            callback(undefined,
            {
                lat:response.body.features[0].center[0],
                lng:response.body.features[0].center[1],
                 location:response.body.features[0].place_name
                 })
        }
    })

}

module.exports = geocode;