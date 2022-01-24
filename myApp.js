
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('dotenv').config();

// first
app.use(function(req,res,next){
console.log("Hello World");
next();
})

//start a working server-2

// app.get('/',function(req, res) {
//     console.log("hello express")
//   res.send("Hello Express");
// })

//implement a root-level request middleware logger -7

app.use(function(req, res, next) {
  console.log(req.method+" "+req.path+" - "+req.ip);
  next();
})

//Serve an HTML file-3

app.use("/public",express.static(__dirname+"/public"));

//Serve static assets-4

app.get('/',function(req,res) {
  res.sendFile(__dirname+'/views/index.html')
});

//Serve Json on a specific route -5

// app.get('/json', function(req,res){
//   res.json({"message": "Hello json"});
// });



// Use .env file -6
app.use('/json',function(req,res){
  if(process.env.MESSAGE_STYLE = "uppercase"){
     console.log("first if")
    res.json({"message": "HELLO JSON"});
   
  }else {
    res.json({"message": "Hello json"});
  }
  }

);




// if (mySecret === "uppercase") {
//   console.log("first if")
//  response.message = response.message.toUpperCase();
  
// } 
  
//   res.json(response);

// })

//Chain middleware to create a time server -8

function currentTime(){
  return new Date().toString();
}

app.get('/now',function(req,res,next){
  req.time = currentTime();
  next();
}, function(req,res){
  res.json({"time":req.time});
}
)

//Get route parameter input from the client -9

app.get("/:word/echo",function(req,res){
  res.json({"echo":req.params.word});
})

//Get query parameter input from the client (req.query) -10

app.get('/name',function(req,res){
  console.log(req.query);
  res.json({name: req.query.first+" "+req.query.last})
});

//Use body-parser to parse POST requests -11

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

//Get data from POST request -12

app.post('/name',function(req,res){
  console.log(req.query);
  res.json({name: req.body.first+" "+req.body.last})
});



module.exports = app;
