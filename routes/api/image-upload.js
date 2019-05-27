const express = require('express');
const router = express.Router();
const passport = require("passport");

const {upload} = require("../../services/image-upload");

const singleUpload = upload.single('image');
const multipleUpload = upload.array('image',3);

router.post('/',passport.authenticate("jwt", {session: false}), (req, res) => {
    singleUpload(req, res, err => {
        if(err){
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
        }
        //res.header("Access-Control-Allow-Origin", "*");
        return res.json({'imageUrl': req.file.location});
    });
});


router.post('/upload-multiple',passport.authenticate("jwt", {session: false}), (req, res) => {

    

    multipleUpload(req, res, err => {
        if(err){
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
        }
        return res.json({'imageUpload': req.files});
    });
});


const config = require("../../config/keys");
const AWS = require('aws-sdk');

//////test

const cloudFront = new AWS.CloudFront.Signer(config.CF_ACCESS_KEY, config.RSA_PRIVATE_KEY);

const policy = JSON.stringify({
    Statement: [
      {
        Resource: 'http://d12w44ud3mpa5f.cloudfront.net/*', // http* => http and https
        Condition: {
          DateLessThan: {
            'AWS:EpochTime':
              Math.floor(new Date().getTime() / 1000) + 60 * 60 * 1, // Current Time in UTC + time in seconds, (60 * 60 * 1 = 1 hour)
          },
        },
      },
    ],
  });

router.post('/get_signed_cookie',passport.authenticate("jwt", {session: false}), (req, res) => {
    
    /* Code to Verify the credentials */

  // Set Cookies after successful verification
  const cookie = cloudFront.getSignedCookie({
    policy,
  });

  res.cookie('CloudFront-Key-Pair-Id', cookie['CloudFront-Key-Pair-Id'], {
    domain: 'http://d12w44ud3mpa5f.cloudfront.net',
    path: '/',
    httpOnly: true,
  });

  res.cookie('CloudFront-Policy', cookie['CloudFront-Policy'], {
    domain: 'http://d12w44ud3mpa5f.cloudfront.net',
    path: '/',
    httpOnly: true,
  });

  res.cookie('CloudFront-Signature', cookie['CloudFront-Signature'], {
    domain: 'http://d12w44ud3mpa5f.cloudfront.net',
    path: '/',
    httpOnly: true,
  });

  // Send some response
  res.send({ some: 'Succesfully created sign cloud front cookies' });
});


module.exports = router;