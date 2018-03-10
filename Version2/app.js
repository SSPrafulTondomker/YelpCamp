var express = require ("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

/*var campgrounds = [
		{name : "salmon creek", image:"https://pixabay.com/get/eb35b70b2df6033ed95c4518b7444795ea76e5d004b0144395f5c77fafe9b7_340.jpg"},
		{name : "lola", image: "https://pixabay.com/get/eb35b70b2df6033ed95c4518b7444795ea76e5d004b0144395f5c77fafe9b7_340.jpg"},
		{name : "lola", image: "https://pixabay.com/get/eb35b70b2df6033ed95c4518b7444795ea76e5d004b0144395f5c77fafe9b7_340.jpg"}
	]*/

mongoose.connect("mongodb://localhost/yelp_camp");
//Schema Setup
var campgroundSchema = new mongoose.Schema({
	name : String,
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create (
{
	name : "lola",
	image: "https://pixabay.com/get/eb35b70b2df6033ed95c4518b7444795ea76e5d004b0144395f5c77fafe9b7_340.jpg"
}, function(err, campground){
	if (err){
		console.log(err);
	}
	else{
		console.log(campground);
	}
});*/


app.use (bodyParser.urlencoded({extended: true}));

app.set ("view engine", "ejs")


app.get("/", function(req,res){
	res.render("landing");
});

app.get ("/campgrounds", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if (err){
			console.log(err);
		}else{
			res.render("campgrounds", {campgrounds: allCampgrounds});
		}
	});
	//res.render ("campgrounds", {campgrounds: campgrounds});
});

app.post ("/campgrounds", function(req, res){
	
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
	//campgrounds.push(newCampground);
	//create new campground and save to DB
	Campground.create(newCampground,function(err, newlyCre){
		if(err)
		{
			console.log(err);
		}
		else{
			res.redirect("/campgrounds");
		}
	});
	
	console.log(name);
	
});


app.get("/campgrounds/new", function(req, res){
	res.render("new");
});

app.listen(3000, function(){
console.log ("YelpCamp Server Started!!!");
});
