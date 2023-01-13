let express = require('express');
let bodyParser = require('body-parser')
let app = express();

console.log("Hello world")
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.get("/now", function(req, res, next){
  req.time = new Date().toString()
  next()
},function(req, res){
  res.json({"time":req.time})
})

app.get("/:word/echo", 
       function(req,res){
         something= req.params.word
         res.json({"echo":something})
       })

app.route("/name").get(function (req,res){
  res.json({"name":req.query.first + " "+ req.query.last})
})

app.use(function(req, res, next){
  console.log(req.method + " "+req.path + " - "+req.ip)
  next()
})

app.use("/public", express.static(__dirname + "/public"));


app.get("/", function(req, res){
  res.sendFile(__dirname+"/views/index.html")
})


app.get("/json", function(req, res){
  var response = "Hello json"
  if (process.env.MESSAGE_STYLE == "uppercase"){
  var theresponse=response.toUpperCase()
  }
  else{
    var theresponse = response
  }
  res.json({"message":theresponse})
})


app.post("/name", function(req,res){
  var string= req.body.first +" "+ req.body.last
  res.json({name:string})
})


 module.exports = app;
