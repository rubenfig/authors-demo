const request = require('supertest');
const expect = require('chai').expect;
/* eslint-disable */

describe('Publications tests', () => {
  const server = request('http://localhost:3000/api');

  it('should obtain all publications', (done) => {
    server.get('/publications')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((error, result) => {
        if (error) return done(error);
        const publications = result.body.publications;
        console.log(publications);
        expect(publications[0]).to.deep.eq({
          date: 1529393136,
          dummy: 1,
          id: '63de9a50-d26a-11e9-a903-9de353d208a1',
          title: "MLB suspends Twins' Michael Pineda  4 for positive drug test",
          body: 'Sept. 7 (UPI) -- Major League Baseball suspended Minnesota Twins ' +
            'right-handed pitcher Michael Pineda for 60 games for violating the ' +
            "league's drug prevention program, the MLB announced Saturday.\nPineda " +
            'tested positive for hydrochlorothiazide, a diuretic.\n\nThe suspension ' +
            'covers the rest of the regular season and any playoff games the Twins ' +
            'may play.\n\nPineda issued an apology in a statement through the Major ' +
            "League Baseball Players Association.\n\n'I mistakenly took a medication " +
            'that was given to me by a close acquaintance, who obtained it over the ' +
            "counter and assured me it would safely help me manage my weight,' he " +
            "said. 'I ingested a few of these pills without the consent of the Twins' " +
            "training staff.'\n\nThe team said it was 'disappointed' to learn of the " +
            "violation.\n\n'We fully support Major League Baseball's policy and its " +
            'efforts to eliminate banned substances from our game. Per the protocol ' +
            'outlined in the Joint Drug Program, the Minnesota Twins will not comment ' +
            "further on this matter,'' the Twins said.\n\nAn unnamed source told ESPN " +
            'that Pineda originally faced an 80-game suspension, but the league ' +
            'reduced the punishment after an appeal.\n\nPineda has an 11-5 record and ' +
            '4.01 ERA in 26 starts this season.',
          author: {
            id: '138a71b0-d269-11e9-b500-1d02fa422f1d',
            birthdate: 1528461936,
            fullname: 'Ruben3',
            email: 'asdasd@asdasd.com'
          }
        });
        return done();
      });
  });

  it('should obtain one publication', (done) => {
    server.get('/publications/63de9a50-d26a-11e9-a903-9de353d208a1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((error, result) => {
        if (error) return done(error);
        const publication = result.body.publication;
        expect(publication).to.deep.eq({
          "date": 1529393136,
          "dummy": 1,
          "id": "63de9a50-d26a-11e9-a903-9de353d208a1",
          // eslint-disable-next-line max-len
          "title": "MLB suspends Twins' Michael Pineda  4 for positive drug test",
          // eslint-disable-next-line max-len
          "body": "Sept. 7 (UPI) -- Major League Baseball suspended Minnesota Twins right-handed pitcher Michael Pineda for 60 games for violating the league's drug prevention program, the MLB announced Saturday.\nPineda tested positive for hydrochlorothiazide, a diuretic.\n\nThe suspension covers the rest of the regular season and any playoff games the Twins may play.\n\nPineda issued an apology in a statement through the Major League Baseball Players Association.\n\n'I mistakenly took a medication that was given to me by a close acquaintance, who obtained it over the counter and assured me it would safely help me manage my weight,' he said. 'I ingested a few of these pills without the consent of the Twins' training staff.'\n\nThe team said it was 'disappointed' to learn of the violation.\n\n'We fully support Major League Baseball's policy and its efforts to eliminate banned substances from our game. Per the protocol outlined in the Joint Drug Program, the Minnesota Twins will not comment further on this matter,'' the Twins said.\n\nAn unnamed source told ESPN that Pineda originally faced an 80-game suspension, but the league reduced the punishment after an appeal.\n\nPineda has an 11-5 record and 4.01 ERA in 26 starts this season.",
          "author": "138a71b0-d269-11e9-b500-1d02fa422f1d"
        });
        return done();
      });
  });

  it('should fail to obtain publication', (done) => {
    server.get('/publications/dummyID')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(() => {
        return done();
      });
  });

  it('should create one publication', (done) => {
    server.post('/publications')
      .send({
        "date": 15293931360000,
        "dummy": 1,
        // eslint-disable-next-line max-len
        "title": "Test publication",
        // eslint-disable-next-line max-len
        "body": "Test publication body",
        "author": "138a71b0-d269-11e9-b500-1d02fa422f1d"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((error, result) => {
        if (error) return done(error);
        const publication = result.body.publication;
        expect(publication.date).to.eq(15293931360000);
        expect(publication.title).to.eq("Test publication");
        expect(publication.body).to.eq("Test publication body");
        return done();
      });
  });


  it('should fail to create one publication', (done) => {
    server.post('/publications')
      .send({
        "date": 15293931360000,
        "dummy": 1,
        // eslint-disable-next-line max-len
        // eslint-disable-next-line max-len
        "body": "Test publication body",
        "author": "138a71b0-d269-11e9-b500-1d02fa422f1d"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((error, result) => {
        if (error) return done(error);
        expect(result.body.message).to.eq('Title must be specified.');
        return done();
      });
  });

  it('should fail to create one publication', (done) => {
    server.post('/publications')
      .send({
        "date": 15293931360000,
        "dummy": 1,
        // eslint-disable-next-line max-len
        "title": "Test publication",
        // eslint-disable-next-line max-len
        "author": "138a71b0-d269-11e9-b500-1d02fa422f1d"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((error, result) => {
        if (error) return done(error);
        expect(result.body.message).to.eq('Body must be specified.');
        return done();
      });
  });

  it('should fail to create one publication', (done) => {
    server.post('/publications')
      .send({
        "date": 15293931360000,
        "dummy": 1,
        // eslint-disable-next-line max-len
        "title": "Test publication",
        // eslint-disable-next-line max-len
        "body": "Test publication body"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((error, result) => {
        if (error) return done(error);
        expect(result.body.message).to.eq('Author must be specified.');
        return done();
      });
  });

  it('should fail to create one publication', (done) => {
    server.post('/publications')
      .send({
        "dummy": 1,
        // eslint-disable-next-line max-len
        "title": "Test publication",
        // eslint-disable-next-line max-len
        "body": "Test publication body",
        "author": "138a71b0-d269-11e9-b500-1d02fa422f1d"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((error, result) => {
        if (error) return done(error);
        expect(result.body.message).to.eq('Date must be specified.');
        return done();
      });
  });

  it('should edit one publication', (done) => {
    server.put('/publications/51d79500-d26a-11e9-a903-9de353d208a1')
      .send({
        "date": 1559313136,
        "dummy": 1,
        "id": "51d79500-d26a-11e9-a903-9de353d208a1",
        "title": "Edited title",
        // eslint-disable-next-line max-len
        "body": "Edited body",
        "author": "fa4ca6f0-d268-11e9-b500-1d02fa422f1d"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((error, result) => {
        if (error) return done(error);
        const publication = result.body.publication;
        expect(publication.title).to.eq("Edited title");
        expect(publication.body).to.eq("Edited body");
        return done();
      });
  });


  it('should fail to edit one publication', (done) => {
    server.put('/publications/51d79500-d26a-11e9-a903-9de353d208a1')
      .send({
        "date": 1559313136,
        "dummy": 1,
        "id": "51d79500-d26a-11e9-a903-9de353d208a1",
        "title": "Edited title",
        // eslint-disable-next-line max-len
        "author": "fa4ca6f0-d268-11e9-b500-1d02fa422f1d"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((error, result) => {
        if (error) return done(error);
        expect(result.body.message).to.eq('Body must be specified.');
        return done();
      });
  });

  it('should fail to edit one publication', (done) => {
    server.put('/publications/51d79500-d26a-11e9-a903-9de353d208a1')
      .send({
        "date": 1559313136,
        "dummy": 1,
        "id": "51d79500-d26a-11e9-a903-9de353d208a1",
        // eslint-disable-next-line max-len
        "body": "Edited body",
        "author": "fa4ca6f0-d268-11e9-b500-1d02fa422f1d"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((error, result) => {
        if (error) return done(error);
        expect(result.body.message).to.eq('Title must be specified.');
        return done();
      });
  });


  it('should fail to edit one publication', (done) => {
    server.put('/publications/51d79500-d26a-11e9-a903-9de353d208a1')
      .send({
        "date": 1559313136,
        "dummy": 1,
        "id": "51d79500-d26a-11e9-a903-9de353d208a1",
        "title": "Edited title",
        // eslint-disable-next-line max-len
        "body": "Edited body",
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((error, result) => {
        if (error) return done(error);
        expect(result.body.message).to.eq('Author must be specified.');
        return done();
      });
  });

  it('should delete one publication', (done) => {
    server.delete('/publications/44bb1b30-d26a-11e9-a903-9de353d208a1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((error) => {
        if (error) return done(error);
        return done();
      });
  });

  it('should fail to delete one publication', (done) => {
    server.delete('/publications/dummyId')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end((error, result) => {
        if (error) return done(error);
        expect(result.body.message).to.eq('Publication not found');
        return done();
      });
  });
});
