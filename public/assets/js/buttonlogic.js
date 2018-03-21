// import axios from 'axios'

$( document ).ready(function() {

  $('.scrape-new').on('click', function(event) {
    event.preventDefault()
    console.log('scrape-new clicked');
    axios.get('/')

    
})

$(".article-save").on("click", function(event) {
    event.preventDefault();
    console.log('article save button clicked!')

    let thistitle = $(this).data('title')
    let thisdate = $(this).data('date')
    let thislink = $(this).data('link');

    console.log(thistitle)

    var savedArticle = {
      title: thistitle,
      date: thisdate,
      link: thislink
    };
    console.log('savedArticle', savedArticle);

    // Send the POST request.
    $.ajax('/save/:link', { 
      type: "POST",
      data: savedArticle
    }).then(
      function() {
        console.log('data', data);
      }
    );
  });


$('.article-note').on('click', function(event) {
    event.preventDefault()
    console.log('article-note clicked');
});

//DELETE BUTTON!!
$('.article-delete').on('click', function(event) {
    event.preventDefault()
    console.log('article-delete clicked');
    let _id = $(this).data('id')
    console.log('buttonlogic.js _id:', _id);

     // Send the POST request.
     $.ajax({ 
        type: "GET",
        url: '/delete/'+_id
      })
      .then(function(resp) {
        window.location.reload();
      })
      .catch(function(err) {
        console.error(err);
      })    
});



function makeActive(selector) {
    $('li').removeClass("active");
    $(selector).addClass("active");
}





});

