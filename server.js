const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();


app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');


//Middleware code start
app.use((req,res,next) =>{
   var log = `${new Date().toString()} ${req.hostname} ${req.ip}  ${req.method} ${req.originalUrl}`;
    fs.appendFile('server.log', log + '\n' ,(error) => {
      if(error)console.log(`Unable to log due to  ${error}`);
    });
    next();
});//Works as filter in java..next() require to delegate the request to appropriate handler

// app.use((req,res,next) => {
//   res.send({errorMessage :"Page is under maintance..Will be right back"});
// });

//Middleware code end

//static  page
app.use(express.static(__dirname + '/public/html'));


hbs.registerHelper('getCurrentYear',() =>{
  return new Date().getFullYear();
});//Helper which used in replacing redudant code from caller every time to hbs partials

app.get('/', (req,res) =>{
  res.send('<h1>Hi Yogesh</h1>');
});

app.get('/about', (req,res) =>{

  res.render('about.hbs',{pageTittle :'About Page',paragraph :'This is the sample paragraph for hbs testing'});
});

app.get('/error', (req,res) =>{

  res.send({errorMessage :'Unable to serve the request'});
});
app.listen(port, () =>{
  console.log(`app listening the port ${port}`);
});
