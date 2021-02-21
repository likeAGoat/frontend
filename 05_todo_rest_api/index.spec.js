//첫 API 테스트 만들기 테스트 코드
const request = require('supertest');
const should = require('should');
const app = require('./index');//index 모듈을 가져와야한다.

//테스트 수트를 만들려면 describe함수를 쓴다.
//테스트 수트를 만들때 API이름을 사용한다.
describe('GET /api/todos 는',()=>{
    describe('성공시',()=>{
        //비동기 처리를 해줘야 한다 . => done
        it('유저 객체를 담은 배열로 응답한다',(done)=>{
            request(app)
                .get('/api/todos')
                .end((err,res)=>{
                    res.body.should.be.instanceOf(Array);
                    done();//비동기 처리를 위해
                })
        })
        it('최대 limit 개수만큼 응답한다', (done) => {
            request(app)
                .get('/api/todos?limit=2')//todos리스트를 2개만 받겠다.
                .end((err,res)=>{
                    res.body.should.have.lengthOf(2);
                    done();//비동기 처리를 위해
                });
        });
    });

    describe('실패시',()=>{
        it('limit이 숫자형이 아니면 400을 응답한다', (done) => {
            request(app)
                .get('/api/todos?limit=two')
                .expect(400)
                // .end((err,res) => {
                //     done();
                // })
                .end(done)
        })
    })
});

describe('GET /api/todos/:id는',()=>{
    describe('성공시',()=>{
        it('id가 1인 유저 객체를 반환한다.',(done) =>{
            request(app)
                .get('/api/todos/1')
                .end((err,res) => {
                    res.body.should.have.property('id',1);
                    done();
                })
        });
    });
    describe('실패시',()=>{
        it('id가 숫자가 아닐경우 400으로 응답한다.',(done)=>{
            request(app)
                .get('/api/todos/one')
                .expect(400)
                .end(done);
        });
        it('id로 유저를 찾을 수 없을 경우 404로 응답한다.',(done)=>{
            request(app)
                .get('/api/todos/999')
                .expect(404)
                .end(done);
        });
    })
});

describe('DELETE /api/todos/:id', ()=>{
    describe('성공시',()=>{
        it('204를 응답한다',(done)=>{
            request(app)
                .delete('/api/todos/1')
                .expect(204)
                .end(done);
        })
    });
    describe('실패시',()=>{
        it('id가 숫자가 아닐경우 400으로 응답한다',done=>{
            request(app)
                .delete('/api/todos/one')
                .expect(400)
                .end(done);
        })
    })
})

//before -> mocha의 함수 중 before는 테스트 케이스가 동작하기 전에 미리 실행되는 함수
describe('POST /api/todos',()=>{
    describe('성공시',()=>{
        let todo = 'read books',
            body;
        //before -> mocha의 함수 중 before는 테스트 케이스가 동작하기 전에 미리 실행되는 함수
        before(done=>{
            request(app)
                .post('/api/todos')
                .send({todo:todo})//.send({todo})과 동일한 표현
                .expect(201)
                .end((err,res) => {
                    body = res.body;
                    done();
                });
        });
        it('생성된 유저 객체를 반환한다',()=>{
            body.should.have.property('id');
        });
        it('입력한 todo을 반환한다',()=>{
            body.should.have.property('todo',todo)
        })
    });
    describe('실패시',()=>{
        it('todo 파라메터 누락시 404를 반환한다',(done)=>{
            request(app)
                .post('/api/todos')
                .send({})
                .expect(400)
                .end(done)
        });
        it("todo가 중복일 경우 409를 반환한다",(done)=>{
            request(app)
                .post('/api/todos')
                .send({todo: 'read books'})
                .expect(409)
                .end(done)
        })
    })
})

describe('PUT /api/todos/:id', ()=>{
    describe('성공시',()=>{
        it('변경된 todo를 응답한다', (done)=>{
            const todo = 'work';
            request(app)
                .put('/api/todos/3')//post로 추가했던 4번에 대해 todo 을 변경한다.
                .send({todo})
                .end((err,res)=>{
                    res.body.should.have.property('todo',todo);
                    done();
                });
        });
    })
    describe('실패시',()=>{
        it('정수가 아닌 id일 경우 400 응답', (done)=>{
            request(app)
                .put('/api/todos/one')
                .expect(400)
                .end(done);
        });
        it('todo 없을 경우 400 응답', (done)=>{
            request(app)
                .put('/api/todos/one')
                .send({})//body에 todo이 없는 빈 객체를 보내준다.
                .expect(400)
                .end(done);
        });
        it('없는 유저일 경우 404 응답', (done)=>{
            request(app)
                .put('/api/todos/999')
                .send({todo:'dummy'})
                .expect(404)
                .end(done);
        });
        it('할 일이 중복일 경우 409 응답', (done)=>{
            request(app)
                .put('/api/todos/3')
                .send({todo: 'sing'})
                .expect(409)
                .end(done);
        });
    })
})