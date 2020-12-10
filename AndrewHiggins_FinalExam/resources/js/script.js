
//run when the document object model is ready for javascript code to execute
function makeApiCall() {
  //check for fields
  var userInput = document.getElementById('searchBox').value;
  console.log(userInput);

    var apiURL = 'http://www.omdbapi.com/?apikey=f50c2511&t='+userInput;

    $.ajax({url:apiURL, dataType:"json"}).then(function(data){

      console.log(data);

        // console.log(data);
        // console.log(tags);

      // function getPhotos(i){
      //     return data.photos.photo[Object.keys(data.photos.photo)[i]];
      // }
      // console.log(getPhotos(2));
      // console.log(getPhotos(2).id);

      // console.log(data);
      // for(var i = 0; i < per_page; i++){
      //   var photoObj = getPhotos(i);
      //   var id = photoObj.id;
      //   var secret = photoObj.secret;
      //   var title = photoObj.title
      //   var divComp = '<div class ="card"><img src =https://www.flickr.com/photos/'+id+'/'+secret+
      //   '><div class="card-body"></div></div>'
    //   }
  })

}
