async function GetTemp( setTempData ){
    try{
      const response = await fetch('http://localhost:3000/getaddress') // GRNCEK ENDPOINT
      if (!response.ok) {
        throw new Error('Failed to fetch temperature data');
      }
      const data = await response.json();
      setTempData(data)
    } catch (error) {
      console.error(error);
      return null;
    }
  }

export default GetTemp