const request= require('request');

  const forecast = (lat,lng,callback)=>{

   const options =  {url:"https://api.darksky.net/forecast/3380a483f40f437ebaff77fb186358f3/"+lat+","+lng, json:true};
    request(options,(error,{body})=>{

      if(error){
        callback('Unable to connect to darsky API',undefined);
      }else if(body.error){
          callback(response.body.error,undefined)
      }else{
          callback(undefined,{
            summary:body.daily.data[0].summary,
            temperature:body.currently.temperature,
            precipProbability:body.currently.precipProbability
          })
      }

    })
    
  }

  module.exports = forecast;
