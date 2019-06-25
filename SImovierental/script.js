$(document).ready(()=>{
    $("#searcher").on('submit',(e)=>{
      let search=$('#search-api').val();
      getMovies(search);
    e.preventDefault();
    });

    
});
function getMovies(search){
  axios.get("http://www.omdbapi.com/?s="+search+"&apikey=eb126176")
  .then((response)=>{
      console.log(response);
      let movies= response.data.Search;
      let output="";
      $.each(movies,(index,movie)=>{

          output+= `
          <div>
              <div>
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID }')" class="detail" href="#">Movie details</a>
              
              
          </div>
              
              
              </div>
          `;

      });
      $('#movies').html(output);

  })
 .catch((err) =>{
     console.log(err);

 });
}

function movieSelected(id){
    sessionStorage.setItem('movieId',id)
    window.location='show.html';

    return false;
}
function getMovie(){
    let movieId=sessionStorage.getItem('movieId');
     axios.get("http://www.omdbapi.com/?i="+movieId+"&apikey=eb126176")
  .then((response)=>{
      console.log(response);
      let movie=response.data;
      let output=`


      <div class="lis">
      <h2>  ${movie.Title}</h2>
      <ul class="move-list">
      <li><strong>Genre</strong>: ${movie.Genre}</li>
      <li><strong>Released</strong>: ${movie.Released}</li>
      <li><strong>Rated</strong>: ${movie.Rated}</li>
      <li><strong>IMDB Rating</strong>: ${movie.ImdbRating}</li>
      <li><strong>Writer</strong>: ${movie.Writer}</li>
      <li><strong>Actors</strong>: ${movie.Actors}</li>
      </ul>
      </div>
      <div class="row">
      <div>
      <img src="${movie.Poster}" class="thumbnail">
      </div>
  
      </div>
      <div class="row">
      <div class="well">
      <h3>Plot</h3>
      ${movie.Plot}
      <hr>
      <button><a href="http://imdb.com/title/${movie.imdbID}" target="_blank">View IMDB </a></button>
      <button><a href="search.html">Go back to search </a></button>
      </div>
      </div>
      `;
      $('#movie').html(output);
   
  })
 .catch((err) =>{
     console.log(err);

 });

}