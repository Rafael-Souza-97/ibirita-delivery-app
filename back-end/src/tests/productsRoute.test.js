const chai = require('chai');
const sinon = require('sinon');
const describe = require('mocha').describe;
const it = require('mocha').it;
const { Product } = require('../database/models');
const app = require('../api/app');
const { expect } = chai;
const chaiHttp = require('chai-http');
const { afterEach } = require('mocha');
const jwt = require('jsonwebtoken');
const { authenticatedCustomerUser, verifiedCustomer, allProductsData } = require('./mocks/backendMocks');

chai.use(chaiHttp);

describe('Testa as funções da rota /products', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('GET /products', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedCustomerUser);
      sinon.stub(jwt, 'verify').returns(verifiedCustomer);
      sinon.stub(Product, 'findAll').resolves(allProductsData.dataValues);
    });

    it('Testa o funcionamento da rota', async () => {
      const { status } = await chai.request(app).get('/products').set('Authorization', 'validToken');
      expect(status).to.be.equal(200);
    });
  });

  describe('GET /products/:id', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedCustomerUser);
      sinon.stub(jwt, 'verify').returns(verifiedCustomer);
      sinon.stub(Product, 'findByPk').resolves(allProductsData[0]);
    });

    it('Testa o funcionamento da rota', async () => {
      const { status } = await chai.request(app).get('/products/1').set('Authorization', 'validToken');
      expect(status).to.be.equal(200);
    });
  });

  describe('GET /products/:id', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedCustomerUser);
      sinon.stub(jwt, 'verify').returns(verifiedCustomer);
      sinon.stub(Product, 'findByPk').resolves(null);
    });

    it('Testa o funcionamento da rota caso o id não seja encontrado', async () => {
      const { status } = await chai.request(app).get('/products/0').set('Authorization', 'validToken');
      expect(status).to.be.equal(404);
    });
  });
});