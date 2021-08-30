const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../index')
chai.use(chaiHttp);
chai.should();
const inputdata = {email : 'irvanjunaidi2@gmail.com', password : '123' }
const inputDataRegister ={email : 'irvanswan4@gmail.com', password : '123', phone : '0897564322135'}
describe("Auth",()=>{
    describe("Login",()=>{
        it("Fetching Login must success", (done)=>{
            chai.request(app).post('/news/api/auth/login')
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
    describe("Register", ()=>{
        it("Register Processing must success", (done)=>{
            chai.request('http://localhost:3333/news/api/').post('auth/register')
            .type('form')
            .send({
                'method' : 'post',
                ...inputDataRegister
            })
            .end(function(err, res){
                expect(res).to.have.status(201);
                done()
            })
        })
        
    })
})




