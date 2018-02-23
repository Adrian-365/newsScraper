$( document ).ready(function() {

  console.log( "ready!" );

  $('.scrape-new').on('click', function() {
    console.log('scrape-new clicked');

$.ajax("/scrape", function(){
  type: GET
})
.then(
  res.render('index');
)
    
    })

});

