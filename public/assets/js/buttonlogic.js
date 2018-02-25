// import axios from 'axios'

$( document ).ready(function() {
  console.log("buttonlogic.js is ready!");

  $('.scrape-new').on('click', function(event) {
    event.preventDefault()
    console.log('scrape-new clicked');
    axios.get('/')
// $.ajax("/scrape", function(){
//   type: GET
// })
// .then({
//     res.render('index', data);
// }
  
// )
    
})

$('.article-save').on('click', function(event) {
    event.preventDefault()
    console.log('article-save clicked');
});

$('.article-note').on('click', function(event) {
    event.preventDefault()
    console.log('article-note clicked');
});

$('.article-delete').on('click', function(event) {
    event.preventDefault()
    console.log('article-delete clicked');
});

function makeActive(selector) {
    $('li').removeClass("active");
    $(selector).addClass("active");
}

$('#main-li').on('click', function(event) {
    event.preventDefault()
    console.log('main link clicked');
    makeActive('#main-li')
    
    
});

$('#saved-li').on('click', function(event) {
    event.preventDefault()
    console.log('saved link clicked');
    makeActive('#saved-li');
    fetch('/saved');

  

});



});

