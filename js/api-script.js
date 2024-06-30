const count = document.getElementById("count");

//Deprecated - Used in local purpose
function visitCount(){
  let visits;
  if(!localStorage.getItem('visits')){
    localStorage.setItem('visits', 1);
  }
  visits = +localStorage.getItem('visits');
  const countInc = visits+1;
  localStorage.setItem('visits', countInc);

  count.innerText = localStorage.getItem('visits');
}


/// base API for Visitor Config
$.ajax({
  url: 'https://portfolio-render-59ha.onrender.com/api/visitor/config',
  method: 'GET',
  contentType: 'application/json',
  success: function(response) {
    const visitApi = response.visitorUrl;
    const apiKey = response.visitorKey;
    var fetchIpURL = response.fetchIpURL;
    var baseUrl = response.baseURL;

    console.log("API URL: ", visitApi," API KEY: ",apiKey)

    // Now use the apiUrl and apiKey to make the desired API request for the Visit Count
    $.ajax({
      url: `${visitApi}`,
      method: 'GET',
      headers: {'X-Api-Key': `${apiKey}`},
      contentType: 'application/json',
      success: function(result) {
        console.log('Data:', result);
        count.innerText = result.value;
      },
      error: function ajaxError(exception) {
        console.error('Error: ', exception.responseText);
      }
    });

    // API to fetch the User IP informations
    $.ajax({
      url: `${fetchIpURL}`,
      method: 'GET',
      contentType: 'application/json',
      success: function(ipResponse) {
        console.log('Data:', ipResponse);

        // POST API to Save all the Visitors Informations
        $.ajax({
          url: `${baseUrl}api/visitor/save`,
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(ipResponse),
          success: function(response) {
            console.log('INSIDE SAVE Data:', response);
             
          },
          error: function ajaxError(exception) {
            console.error('Error: ', exception.responseText);
          }
        });
      },
      error: function ajaxError(exception) {
        console.error('Error: ', exception.responseText);
      }
    });
  },
  error: function ajaxError(exception) {
    console.error('Error: in config API call ', exception.responseText);
  }
});
