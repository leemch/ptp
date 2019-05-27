const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const clients = require("./routes/api/clients");
const progressUpdates = require("./routes/api/progress_updates");
const imageUpload = require("./routes/api/image-upload");


const app = express();




//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));





// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);





//Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/clients", clients);
app.use("/api/progress_updates", progressUpdates);
app.use("/api/image-upload", imageUpload);






// Server static assets if in production
if(process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}


const config = require("./config/keys");
const cfsign = require('aws-cloudfront-sign');
const AWS = require('aws-sdk');

//////test

const cloudFront = new AWS.CloudFront.Signer(config.CF_ACCESS_KEY, config.RSA_PRIVATE_KEY);
  
  // Generating a signed URL

//   cloudFront.getSignedUrl({
// 	url: 'http://d12w44ud3mpa5f.cloudfront.net/1558417408373',
// 	expires: Math.floor((new Date()).getTime() / 1000) + (60 * 60 * 1) // Current Time in UTC + time in seconds, (60 * 60 * 1 = 1 hour)
//   }, (err, url) => {
// 	if (err) throw err;
// 	console.log(url);
//   });






const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));