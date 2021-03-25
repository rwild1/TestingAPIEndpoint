let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

const testName = "The Other Guys"

// describe whats being tested
describe('Testing API Enpoints on localhost:3000', () => {
    // create operation with positive test case (200)
    it('POST /addMovie : should insert movie into db', (done) => {
        chai
            .request('http://localhost:3000')
            .post('/addMovie')
            .send({
                name: testName,
                genre: "Comedy",
                rating: 6.7,
                language: "English"
            })
            .then((res) => {
                expect(res).to.have.status(200)
                done()
            })
            .catch((err) => {
                throw err
            })
    });

    // create operation with negative test case (404)
    it('POST /addMovie without data : should return 400', (done) => {
        chai
            .request('http://localhost:3000')
            .post('/addMovie')
            .send({})
            .then((res) => {
                expect(res).to.have.status(400)
                done()
            })
            .catch((err) => {
                throw err
            })
    });

    // read operation with positive test case (200)
    it('GET /getMovie/name : should retrieve movie from db', (done) => {
        chai
            .request('http://localhost:3000')
            .get('/getMovie/' + testName)
            .then((res) => {
                expect(res).to.have.status(200)
                done()
            })
            .catch((err) => {
                throw err
            })
    });

    // read operation with negative test case (404)
    it('GET /getMovie/ with invalid name : should return 404', (done) => {
        chai
            .request('http://localhost:3000')
            .get('/getMovie/stepBrothers')
            .then((res) => {
                expect(res).to.have.status(404)
                done()
            })
            .catch((err) => {
                throw err
            })
    });

    // update operation with positive test case (200)
    it('PUT /updateMovie : should update a movie in db', (done) => {
        chai
            .request('http://localhost:3000')
            .put('/updateMovie')
            .send({
                name: testName,
                genre: "Comedy",
                rating: 6.8,
                language: "English"
            })
            .then((res) => {
                expect(res).to.have.status(200)
                done()
            })
            .catch((err) => {
                throw err
            })
    });

    // update operation with negative test case (404)
    it('PUT /updateMovie without data: should return 400', (done) => {
        chai
            .request('http://localhost:3000')
            .put('/updateMovie')
            .send({})
            .then((res) => {
                expect(res).to.have.status(400)
                done()
            })
            .catch((err) => {
                throw err
            })
    });

    // delete operation with positive test case (200)
    it('DELETE /deleteMovie/name : should delete movie from db', (done) => {
        chai
            .request('http://localhost:3000')
            .delete('/deleteMovie/' + testName)
            .then((res) => {
                expect(res).to.have.status(200)
                done()
            })
            .catch((err) => {
                throw err
            })
    });

    // delete operation with negative test case (404)
    it('DELETE /deleteMovie/ with invalid name : should return 404', (done) => {
        chai
            .request('http://localhost:3000')
            .delete('/deleteMovie/stepBrothers')
            .then((res) => {
                expect(res).to.have.status(404)
                done()
            })
            .catch((err) => {
                throw err
            })
    });
});