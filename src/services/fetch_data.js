const fetchData = () => {
    const url  = "https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key==zTOIB7c9YcITtccyAMTCpoScfekPjLpab0vbrejY";
    const resp = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      try {
        const data = await resp.json();
        
      } catch (error) {
        dispatch(fetchCategoriesError(error));
      }
}