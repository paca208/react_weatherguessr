async function GetWebcamFeed(id, apikey){
    
  try{
      const response = await fetch(`https://api.windy.com/webcams/api/v3/webcams/${id}?lang=en&include=player`, {
        headers: {
            "x-windy-api-key": apikey
        }
    });
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const webcamfeed = await response.json();
      console.log(webcamfeed)
      return webcamfeed
    } catch (error) {
      console.error(error);
      return null;
    }
  }

export default GetWebcamFeed