// Dependencies
const express = require("express");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
// Require request and cheerio. This makes the scraping possible
const request = require("request");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const router = express.Router();
const axios = require('axios');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
console.log(process.env.MONGODB_URI, "***************************");
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI, {
//     useMongoClient: true
// });

// Database configuration
let databaseUrl = "news";
let collections = ["missonviejo"];

// Hook mongojs configuration to the db variable
const db = mongojs(MONGODB_URI, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Require all models
const models = require("./models/index");


app.get("/saved", function(req, res) {
  db.missionviejo.find({}, function(err, found) {
    if (err) {
      console.log(err);
    } else {
      const hbsObject = {
        news: found
      };
      // console.log(hbsObject)
      res.render("saved", hbsObject);
    }
  });
});

app.get("/", function(req, res) {
  console.log('The "/" route was hit')
  request("https://www.ocregister.com/location/california/orange-county/mission-viejo/", function(error, response, html) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    const $ = cheerio.load(html);
  
    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works
    let justScraped = [];
    
    $("article.archive-view").each(function(i, element) {
  
      let title = $(element).children('figure').children('a').attr("title");
      let link = $(element).children('figure').children('a').attr("href");
      let date = ($(element).children('div.article-info').children('header').children('div.entry-meta').children('time').text() || Date());
      
      
      if (title && link) {
        // function(error, saved) {
          if (error) {
            console.log(error);
          } else {            
            justScraped.push({
              title: title,
              link: link,
              date: date
            })            
            const hbsObject = {
              news: justScraped
            };
          }
      }        
    });
    const hbsObject = {
      news: justScraped
    };
    res.render("index", hbsObject);         
    console.log('Number of Stories Scraped: ' + justScraped.length) 
  });
});

app.post('/save/:link', function(req, res) {  
  db.missionviejo.insert({
    title: req.body.title,
    date: req.body.date,
    link: req.body.link
  })

});


//DELETE ROUTE!!
app.get('/delete/:id', function(req, res) {
  console.log("Deleting");
  db.missionviejo.remove(
    {
      _id: mongojs.ObjectID(req.params.id)
    },
   function(err) {
    if (err) res.status(500).json(err);
    res.send("done")
  })  
})

// Listen on port PORT
app.listen(PORT, function() {
  console.log("App running on port:"+PORT);
});