const chai = require('chai');
const sinon = require('sinon');
const describe = require('mocha').describe;
const it = require('mocha').it;
const {
  Sale,
  SalesProducts,
} = require('../database/models');
const app = require('../api/app');
const { expect } = chai;
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const { afterEach, before } = require('mocha');
const {
  authenticatedCustomerUser,
  authenticatedAdminUser,
  verifiedUser,
  verifiedCustomer,
  dataCreatedSale,
  dataCreatedSalesProducts,
  dataCreatedFinalizedSale,
  saleStatusToUpdate,
  saleStatusUpdated,
  saleToDelete,
  salesDeleted,
  saleToFind,
  allSalesData,
} = require('./mocks/backendMocks');

chai.use(chaiHttp);

describe('Testa as funções da rota /orders', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('POST /orders', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedCustomerUser);
      sinon.stub(jwt, 'verify').returns(verifiedCustomer);
      sinon.stub(Sale, 'create').resolves(dataCreatedSale);
      sinon.stub(SalesProducts, 'create').resolves(dataCreatedSalesProducts.dataValues);
      sinon.stub(Sale, 'findAll').resolves(dataCreatedFinalizedSale.dataValues);
      });
  
    it('Testa o funcionamento da rota', async () => {
      const { status } = await chai.request(app).post('/orders').send({
        userId: 3,
        sellerId: 2,
        totalPrice: 13.20,
        deliveryAddress: "Rua das Bananeiras",   
        deliveryNumber: 1350,
        products: [{
          productId: 1,
          quantity: 6
        }]
      }).set('Authorization', 'validAdmin');
      
      expect(status).to.be.equal(201);
    });
  });

  describe('GET /orders', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedAdminUser);
      sinon.stub(jwt, 'verify').returns(verifiedUser);
      sinon.stub(Sale, 'findAll').resolves(allSalesData);
      });

    it('Testa o funcionamento da rota', async () => {
      const { status } = await chai.request(app).get('/orders').set('Authorization', 'validToken');
      expect(status).to.be.equal(200);
    })
  })

  describe('GET /orders', () => {
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

  describe('PUT /orders/:id', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedCustomerUser);
      sinon.stub(jwt, 'verify').returns(verifiedCustomer);
      sinon.stub(Sale, 'findByPk').resolves(saleStatusToUpdate.dataValues);
      sinon.stub(Sale, 'update').resolves(saleStatusToUpdate.dataValues);
      sinon.stub(Sale, 'findAll').resolves(saleStatusUpdated.dataValues);
    });

    it('Testa o funcionamento da rota', async () => {
      const { status } = await chai.request(app).put('/orders/1').send({
        status: 'Em Trânsito'
      }).set('Authorization', 'validToken');

      expect(status).to.be.equal(200);
    });
  });

  describe('PUT /orders/:id', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedCustomerUser);
      sinon.stub(jwt, 'verify').returns(verifiedCustomer);
      sinon.stub(Sale, 'findByPk').resolves(null);
      sinon.stub(Sale, 'update').resolves(null);
      sinon.stub(Sale, 'findAll').resolves(null);
    });

    it('Testa o funcionamento da rota se o id não existe', async () => {
      const { status } = await chai.request(app).put('/orders/99').send({
        status: 'Em Trânsito'
      }).set('Authorization', 'validToken');

      expect(status).to.be.equal(404);
    });
  });

  describe('PUT /orders/:id', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedCustomerUser);
      sinon.stub(jwt, 'verify').returns(verifiedCustomer);
      sinon.stub(Sale, 'findByPk').resolves(saleStatusToUpdate.dataValues);
      sinon.stub(Sale, 'update').resolves(saleStatusToUpdate.dataValues);
      sinon.stub(Sale, 'findAll').resolves(saleStatusUpdated.dataValues);
    });

    it('Testa o funcionamento da rota se o status não foi passado', async () => {
      const { status } = await chai.request(app).put('/orders/1').send({
      }).set('Authorization', 'validToken');

      expect(status).to.be.equal(404);
    });
  });

  describe('DELETE /orders/:id', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedCustomerUser);
      sinon.stub(jwt, 'verify').returns(verifiedCustomer);
      sinon.stub(Sale, 'findByPk').resolves(saleToFind);
      sinon.stub(Sale, 'destroy').resolves(saleToDelete);
      sinon.stub(Sale, 'findAll').resolves(salesDeleted.dataValues);
    });

    it('Testa o funcionamento da rota', async () => {
      const { status } = await chai.request(app).delete('/orders/1').set('Authorization', 'validToken');

      expect(status).to.be.equal(200);
    })
  });

  describe('DELETE /orders/:id', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedCustomerUser);
      sinon.stub(jwt, 'verify').returns(verifiedCustomer);
      sinon.stub(Sale, 'findByPk').resolves(null);
      sinon.stub(Sale, 'destroy').resolves(saleToDelete);
      sinon.stub(Sale, 'findAll').resolves(salesDeleted.dataValues);
    });

    it('Testa o funcionamento da rota se o id não existe', async () => {
      const { status } = await chai.request(app).delete('/orders/66').set('Authorization', 'validToken');

      expect(status).to.be.equal(400);
    });
  });
});
