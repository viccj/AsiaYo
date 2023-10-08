const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../currency'); // 路徑可能需調整

chai.use(chaiHttp);
chai.should();

describe('API Tests', () => {
  it('Converts USD to JPY', (done) => {
    chai.request(app)
      .get('/convert')
      .query({ source: 'USD', target: 'JPY', amount: '$1000' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('success');
        res.body.should.have.property('amount').eql('$111801.00');
        done();
      });
  });

  it('Handles invalid source currency code', (done) => {
    chai.request(app)
      .get('/convert')
      .query({ source: 'ABC', target: 'JPY', amount: '$1000' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('msg').eql('Invalid currency code.');
        done();
      });
  });

 
});
