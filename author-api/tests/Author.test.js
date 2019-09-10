const request = require('supertest');
const expect = require('chai').expect;
/* eslint-disable */

describe('Authors tests', () => {
  const server = request('http://localhost:3000/api');

  it('should obtain all authors', (done) => {
    server.get('/authors')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((error, result) => {
        if (error) return done(error);
        const authors = result.body.authors;
        expect(authors[0]).to.deep.eq({
          "id": "138a71b0-d269-11e9-b500-1d02fa422f1d",
          "birthdate": 1528461936,
          "email": "asdasd@asdasd.com",
          "fullname": "Ruben3"
        });
        return done();
      });
  });

  it('should obtain one author', (done) => {
    server.get('/authors/138a71b0-d269-11e9-b500-1d02fa422f1d')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((error, result) => {
        if (error) return done(error);
        const author = result.body.author;
        expect(author).to.deep.eq({
          "id": "138a71b0-d269-11e9-b500-1d02fa422f1d",
          "birthdate": 1528461936,
          "email": "asdasd@asdasd.com",
          "fullname": "Ruben3"
        });
        return done();
      });
  });

  it('should fail to obtain author', (done) => {
    server.get('/authors/dummyID')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(() => {
        return done();
      });
  });

  it('should create one author', (done) => {
    server.post('/authors')
      .send({
        "birthdate": 1528461936,
        "email": "test@test.com",
        "fullname": "Testing creation"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((error, result) => {
        if (error) return done(error);
        const author = result.body.author;
        expect(author.birthdate).to.eq(1528461936);
        expect(author.email).to.eq("test@test.com");
        expect(author.fullname).to.eq("Testing creation");
        return done();
      });
  });


  it('should fail to create one author', (done) => {
    server.post('/authors')
      .send({
        "email": "test@test.com",
        "fullname": "Testing creation"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((error, result) => {
        if (error) return done(error);
        expect(result.body.message).to.eq('Birthdate must be specified.');
        return done();
      });
  });

  it('should fail to create one author', (done) => {
    server.post('/authors')
      .send({
        "birthdate": 1528461930,
        "email": "test@test.com"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((error, result) => {
        if (error) return done(error);
        expect(result.body.message).to.eq('fullname must be specified.');
        return done();
      });
  });

  it('should fail to create one author', (done) => {
    server.post('/authors')
      .send({
        "fullname": "Testing creation"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((error, result) => {
        if (error) return done(error);
        expect(result.body.message).to.eq('Email must be specified.');
        return done();
      });
  });

  it('should edit one author', (done) => {
    server.put('/authors/fa4ca6f0-d268-11e9-b500-1d02fa422f1d')
      .send({
        "birthdate": 1528461930,
        "email": "email@changed.com",
        "fullname": "RubenEdited"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((error, result) => {
        if (error) return done(error);
        const author = result.body.author;
        expect(author.birthdate).to.eq(1528461930);
        expect(author.email).to.eq("email@changed.com");
        expect(author.fullname).to.eq("RubenEdited");
        return done();
      });
  });


  it('should fail to edit one author', (done) => {
    server.put('/authors/fa4ca6f0-d268-11e9-b500-1d02fa422f1d')
      .send({
        "email": "test@test.com",
        "fullname": "Testing creation"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((error, result) => {
        if (error) return done(error);
        expect(result.body.message).to.eq('Birthdate must be specified.');
        return done();
      });
  });

  it('should fail to edit one author', (done) => {
    server.put('/authors/fa4ca6f0-d268-11e9-b500-1d02fa422f1d')
      .send({
        "birthdate": 1528461930,
        "email": "test@test.com"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((error, result) => {
        if (error) return done(error);
        expect(result.body.message).to.eq('fullname must be specified.');
        return done();
      });
  });

  it('should fail to edit one author', (done) => {
    server.put('/authors/fa4ca6f0-d268-11e9-b500-1d02fa422f1d')
      .send({
        "fullname": "Testing creation"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((error, result) => {
        if (error) return done(error);
        expect(result.body.message).to.eq('Email must be specified.');
        return done();
      });
  });

  it('should delete one author', (done) => {
    server.delete('/authors/0d3ea880-d269-11e9-b500-1d02fa422f1d')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((error) => {
        if (error) return done(error);
        return done();
      });
  });

  it('should fail to delete one author', (done) => {
    server.delete('/authors/dummyId')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end((error, result) => {
        if (error) return done(error);
        expect(result.body.message).to.eq('Author not found');
        return done();
      });
  });
});
