const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../index')

chai.use(chaiHttp);
chai.should();

describe("News",()=>{
    //fetch news get
    describe("Fetching News",()=>{
        it("Fetching News must success", (done)=>{
            chai.request('http://localhost:3333/news/api/').get('news')
            .end(function(err, res){
                expect(res).to.have.status(200);
                expect(res.body.data).to.be.an('object');
                done()
            })
        })
    })
    //query get
    describe("Fecthing News with Limit and offset", ()=>{
        it("Fetching News must Success", (done)=>{
            chai.request('http://localhost:3333/news/api/').get('news/')
            .query({limit:6, offset:1})
            .end((err, res)=>{
                if(!err){
                    expect(res).to.have.status(200);
                    done()
                }else{
                    console.log(err)
                }
            })
        })
    })
    // query get 
    describe("Searching News",()=>{
        it("Search Must be success", (done)=>{
            chai.request('http://localhost:3333/news/api/').get('news/search')
            .query({key:'i can'})
            .end((err, res)=>{
                if(!err){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('data')
                    done()
                }else{
                    console.log(err)
                }
            })
        })
    })
})

describe("Input News",()=>{
    it("Send news", (done)=>{
        chai.request(app).post('/news/api/news/add-news/1')
        .type('form')
        .send({
            'method' : 'post',
            ...inputdata
        })
        .end(function(err, res){
            if(!err) {
                expect(res).to.be.an('object');
                expect(res.body.data).to.have.property('token')
                expect(res).to.have.status(200);
                done()
            }else{
                console.log(err)
            }
        })
    })
    it("Response data must be object", (done)=>{
        chai.request(`http://localhost:3333/news/api/`).post('auth/login')
        .type('form')
        .send({
            'method' : 'post',
            ...inputdata
        })
        .end(function(err, res){
            if(!err) {
                expect(res).to.be.an('object')
                done()
            }else{
                console.log(err)
            }
        })
    })
    it("Input Email must String", (done)=>{
        expect(inputdata.email).to.be.an('string')
        done()
    })
    it("Input Password must String", (done)=>{
        expect(inputdata.password).to.be.an('string')
        done()
    })
})




