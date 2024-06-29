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


$.ajax({
  method: 'GET',
  url: 'https://api.api-ninjas.com/v1/counter?hit=true&id=visits_2',
  headers: { 'X-Api-Key': 'uIjPHEmZg/txZJsIRZf1+A==51MrQStdZiI0jrKy'},
  contentType: 'application/json',
  success: function(result) {
      console.log('Count: ',result);
      // var jsonData = JSON.parse(result);
      count.innerText = result.value;
  },
  error: function ajaxError(exception) {
      console.error('Error: ', exception.responseText);
  }
});

// $.ajax({
//   method: 'GET',
//   url: 'https://portfolio-render-59ha.onrender.com/api/visitor/fetch',
//   // headers: { 'X-Api-Key': 'uIjPHEmZg/txZJsIRZf1+A==51MrQStdZiI0jrKy'},
//   contentType: 'application/json',
//   success: function(result) {
//       // var jsonData = JSON.parse(result);
//       console.log('Count: ',result);
//       // count.innerText = result.value;
//   },
//   error: function ajaxError(exception) {
//       console.error('Error: ', exception.responseText);
//   }
// });

