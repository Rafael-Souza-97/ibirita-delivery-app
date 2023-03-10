const chai = require('chai');
const sinon = require('sinon');
const describe = require('mocha').describe;
const it = require('mocha').it;
const {
  Sale,
} = require('../database/models');
const app = require('../api/app');
const { expect } = chai;
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const { afterEach, before } = require('mocha');
const { authenticatedAdminUser, verifiedUser } = require('./mocks/backendMocks');

chai.use(chaiHttp);

describe('CAMADA SERVICES', () => {
  describe('Testa as funções da rota /orders', () => {
    afterEach(() => {
      sinon.restore();
    });

    // describe('POST /orders', () => {
    //   before(() => {
    //     sinon.stub(jwt, 'decode').returns(authenticatedAdminUser);
    //     sinon.stub(jwt, 'verify').returns(verifiedUser);
    //     sinon.stub(Sale, 'create').resolves(dataCreatedSale);
    //     sinon.stub(SalesProducts, 'create').resolves(dataCreatedSalesProducts);
    //   });

    //   it('Testa o funcionamento da rota', async () => {
    //     const { status } = await chai.request(app).post('/orders').send({
    //       userId: 3,
    //       sellerId: 2,
    //       totalPrice: 13.20,
    //       deliveryAddress: "Rua das Bananeiras",   
    //       deliveryNumber: 1350,
    //       products: [{
    //         productId: 1,
    //         quantity: 6
    //       }]
    //     }).set('Authorization', 'validToken');

    //     expect(status).to.be.equal(201);
    //   });
    // });

    describe('GET /sales', () => {
      before(() => {
        sinon.stub(jwt, 'decode').returns(authenticatedAdminUser);
        sinon.stub(jwt, 'verify').returns(verifiedUser);
        sinon.stub(Sale, 'findAll').resolves([]);
      });

      it('Testa o funcionamento da rota quando não existe nenhuma venda', async () => {
        const { body, status } = await chai.request(app).get('/orders').set('Authorization', 'validAdminToken');
        expect(status).to.be.equal(404);
        expect(body).to.be.deep.equal({ message: 'No sales found' });
      });
    });


  });
});