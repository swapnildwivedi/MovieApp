let express = require("express");
let app = express();
let request = require("request");

app.get('/' , (req , res)=>{
    res.render("search.ejs");
});

//http://www.omdbapi.com/?s=star&apikey=thewdb
app.get('/result' , (req , res)=>{

    var query = req.query.searchData;
    console.log(query);
    
    var url = "http://www.omdbapi.com/?s="+query+"&apikey=thewdb";
    request(url , (error , response , body)=>{
        if(!error && response.statusCode == 200)
        {
            var parsedData = JSON.parse(body);
           // res.send(parsedData);
            //console.log(parsedData);
            res.render('results.ejs' , {data:  parsedData});
        }
    });
});

app.get("*" , (req , res)=>{
      res.render('/');
});


app.listen(3000 , ()=>{
    console.log("server listening at PORT 3000");
    
})