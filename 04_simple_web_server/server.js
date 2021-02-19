const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

app.set('views', path.join(__dirname,'views'));
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

const port = 3000;

const people = ['John','Sera','Paul'];

const people2 = [
    {
        firstName:'Park',
        lastName:'Sol'
    },
    {
        firstName:'Park',
        lastName:'Mini'
    }
];

//URL router
app.get('/',function(req,res){
    res.render('home',{
        content: 'this space is mini space',
        greeting: "Welcome to mini's home page",
        published: true,
        people: people,
        people2: people2
    });
})
//URL router
app.get('/about',function(req,res){
    res.render('about',{
        greeting: "Welcome to mini's about page"
    });
})

//이미지가 들어갈 폴더경로
app.use(express.static('images'));

//서버 구동
app.listen(port,function(){
    console.log(`Server started on port~ ${port}`);
})