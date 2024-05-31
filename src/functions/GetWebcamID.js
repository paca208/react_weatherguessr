async function GetWebcamID(results, lat, lon, rad, apikey){
    try{
      const response = await fetch(`https://api.windy.com/webcams/api/v3/webcams?lang=en&limit=${results}&offset=0&nearby=${lat}%2C${lon}%2C${rad}`, {
        headers: {
            "x-windy-api-key": apikey
        }
    });
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const webcamdata = await response.json();
      console.log(webcamdata)
      return webcamdata
    } catch (error) {
      console.error(error);
      return null;
    }
  }

export default GetWebcamID