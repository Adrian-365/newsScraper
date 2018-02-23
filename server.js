// Dependencies
const express = require("express");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
// Require request and cheerio. This makes the scraping possible
const request = require("request");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const router = express.Router();

// Initialize Express
const app = express();
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

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  //   useMongoClient: true
});

// Database configuration
let databaseUrl = "news";
let collections = ["missonviejo"];

// Hook mongojs configuration to the db variable
const db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});


// TODO: make two more routes

// Route 1
// =======
// This route will retrieve all of the data
// from the scrapedData collection as a json (this will be populated
// by the data you scrape using the next route)
app.get("/all", function(req, res) {
  db.missionviejo.find({}, function(err, found) {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
});
// Route 2
// =======
// When you visit this route, the server will
// scrape data from the site of your choice, and save it to
// MongoDB.
// TIP: Think back to how you pushed website data
// into an empty array in the last class. How do you
// push it into a MongoDB collection instead?
/* -/-/-/-/-/-/-/-/-/-/-/-/- */



app.get("/", function(req, res) {
  db.missionviejo.find({}, function(err, found) {
    if (err) {
      console.log(err);
    } else {
      const hbsObject = {
        news: found
      };
      res.render("index", hbsObject);
    }
  });
});

app.get("/saved", function(req, res) {
  db.missionviejo.find({}, function(err, found) {
    if (err) {
      console.log(err);
    } else {
      const hbsObject = {
        news: found
      };
      res.render("saved", hbsObject);
    }
  });
});

app.get("/scrape", function(req, res) {
  request("https://www.ocregister.com/location/california/orange-county/mission-viejo/", function(error, response, html) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    const $ = cheerio.load(html);
  
    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works
    $("a.article-title").each(function(i, element) {
  
      var title = $(element).attr("title");
      var link = $(element).attr("href");
      
      if (title && link) {
        db.missionviejo.save({
          title: title,
          link: link
        },
        function(error, saved) {
          if (error) {
            console.log(error);
          } else {
            console.log(saved)
          }
        }      
      )
      }  
      
    });
  
    console.log("Scrape Complete")  
  });
});

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});