const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiParam = require('chai-param')
const expect = chai.expect
const param = chaiParam.param

chai.use(chaiParam);
chai.use(chaiHttp);
chai.should();

describe("Comments",()=>{
    describe("Fetching Comments",()=>{
        it("Fetching Comments must success", (done)=>{
            chai.request(`http://localhost:3333/news/api/`).get('comments/4')
           /*  .send('id', 4) */
            .end((err, res)=>{
                if(err){
                    console.log(err)
                }else{
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
    })
})