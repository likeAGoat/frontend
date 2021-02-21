//첫 API 만들기[todos 목록을 조회하는 기능]
const express = require('express');
const app = express();
const morgan = require('morgan');//서버의 콘솔로그를 출력하는 기능

//DB연결은 아직 못함, todos라는 배열에 넣어 보자
let todos = [
    {id: 1,todo:'eat somthing'},
    {id: 2,todo:'sing'},
    {id: 3,todo:'study'},
];

app.use(morgan('dev'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//GET API
app.get('/api/todos', function(req,res){
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit,10);
    //limit이 숫자형이 아니면 400 응답
    if(Number.isNaN(limit)){
        return res.status(400).end();
    }
    res.json(todos.slice(0, limit));
})

//GET API
app.get('/api/todos/:id', function(req,res){
    const id = parseInt(req.params.id,10);
    //id가 숫자가 아닐경우 400 응답
    if(Number.isNaN(id)) return res.status(400).end();

    const todolist = todos.filter((todoItem) => todoItem.id === id)[0];
    //id로 유저를 찾을 수 없는 경우 404 응답
    if(!todolist) return res.status(404).end();

    res.json(todolist);
})

//DELETE API
app.delete('/api/todos/:id',(req,res) => {
    //삭제해야할 id를 받아온다.
    const id = parseInt(req.params.id,10);
    //id가 숫자가 아닐경우 400 응답
    if(Number.isNaN(id))return res.status(400).end();
    todos = todos.filter(todoItem=> todoItem.id !== id);

    res.status(204).end();//테스트 성공할 경우 204 응답
})

//POST API
app.post('/api/todos', (req,res) => {
    //express에서는 body를 사용하지 않고있다. 추가적인 설치가 필요
    const todo = req.body.todo;

    //todo을 받았는데 todo이 없다면 400 응답
    if(!todo) return res.status(400).end();

    //todo 중복을 체크
    const isConflict = todos.filter(todoItem => todoItem.todo === todo).length;
    if(isConflict) return res.status(409).end();

    //id는 유니크해야한다.
    const id = Date.now();

    //만든 user를 기존 배열에다가 추가해야한다.
    const todoNew = {id,todo};
    todos.push(todoNew);
    res.status(201).json(todoNew);
})

//PUT API
app.put('/api/todos/:id',(req,res) => {
    const id = parseInt(req.params.id,10);
    //id가 숫자가 아닐경우 400 응답
    if(Number.isNaN(id)) return res.status(400).end();

    const todo = req.body.todo;
    //todo이 없을 경우 400 응답
    if(!todo) return res.status(400).end();

    //이름이 중복일 경우 409 응답
    const isConflict = todos.filter(todoItem => todoItem.todo === todo).length;
    if(isConflict) return res.status(409).end();

    //todo에 걸려서 89라인 코드 까지 않옴 테스트 코드의 더미데이터 추가
    const todoNew = todos.filter(todoItem => todoItem.id === id)[0];
    //todoNew가 없을 경우 404 응답
    if(!todoNew) return res.status(404).end();

    todoNew.todo = todo;
    res.json(todoNew);//변경된 user를 응답
})

app.listen(3000,function(){
    console.log('Example app listening on port 3000!');
});

//index 모듈을 가져오려면 모듈로 만들어줘야한다. 그 대상은 express의 어플리케이션이다.
module.exports = app;