// import axios from 'axios'

$( document ).ready(function() {
  console.log("buttonlogic.js is ready!");

  $('.scrape-new').on('click', function(event) {
    event.preventDefault()
    console.log('scrape-new clicked');
    axios.get('/')

    
})

// $('.article-save').on('click', function(event) {
//     event.preventDefault()
//     console.log('article-save clicked');
// });

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





});

