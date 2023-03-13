const chai = require('chai');
const sinon = require('sinon');
const describe = require('mocha').describe;
const it = require('mocha').it;
const { User, Product, Sale, SalesProducts } = require('../database/models');
const app = require('../api/app');
const { expect } = chai;
const chaiHttp = require('chai-http');
const {
  authenticatedAdminUser,
  verifiedAdmin,
  dataUserToDelete,
  authenticatedCustomerUser,
  verifiedCustomer,
  allProductsData,
  dataInvalidGenericToken,
} = require('./mocks/backendMocks');
const jwt = require('jsonwebtoken');
const { afterEach, before } = require('mocha');

chai.use(chaiHttp);

describe('Testa as funções da rota /users', () => {
  afterEach(() => {
    sinon.restore();
  });
    
    describe('MIDDLEWARE token validation', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedAdminUser);
      sinon.stub(jwt, 'verify').returns(verifiedAdmin);
      sinon.stub(User, 'findByPk').resolves(dataUserToDelete);
    });

    it('Testa a validação quando o token com a role admin não é encontrado', async () => {
      const { body, status } = await chai.request(app).delete('/users/3').set('Authorization', '');

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({
        message: 'Token not found',
      });
    });
  });

  describe('MIDDLEWARE token validation', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedCustomerUser);
      sinon.stub(jwt, 'verify').returns(verifiedCustomer);
      sinon.stub(Product, 'findAll').resolves(allProductsData);
    });

    it('Testa a validação quando o token não é encontrado', async () => {
      const { body, status } = await chai.request(app).get('/products').set('Authorization', '');

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({
        message: 'Token not found',
      });
    });
  });

  describe('MIDDLEWARE token validation', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedCustomerUser);
      sinon.stub(jwt, 'verify').returns(dataInvalidGenericToken.data);
      sinon.stub(Product, 'findAll').resolves(allProductsData);
    });

    it('Testa a validação quando o token é inválido', async () => {
      const { body, status } = await chai.request(app).get('/products').set('Authorization', 'invalidToken');

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({
        message: 'Expired or invalid token',
      });
    });
  });

  describe('MIDDLEWARE token validation', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedAdminUser);
      sinon.stub(jwt, 'verify').returns(dataInvalidGenericToken.data);
      sinon.stub(User, 'findByPk').resolves(dataUserToDelete);
    });

    it('Testa a validação quando o token de admin é inválido', async () => {
      const { body, status } = await chai.request(app).delete('/users/3').set('Authorization', 'invalidToken');

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({
        message: 'Expired or invalid token',
      });
    });
  });

  describe('MIDDLEWARE sales validation', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedCustomerUser);
      sinon.stub(jwt, 'verify').returns(verifiedCustomer);
      sinon.stub(Sale, 'create').resolves(null);
      sinon.stub(SalesProducts, 'create').resolves(null);
      sinon.stub(Sale, 'findAll').resolves(null);
      });
  
    it('Testa se todos os campos precisam ser passados na hora da criação do pedido', async () => {
      const { body, status } = await chai.request(app).post('/orders').send().set('Authorization', 'validAdmin');
      
      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({
        message: 'Missing fields required',
      });
    });
  });

  describe('MIDDLEWARE sales validation', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedCustomerUser);
      sinon.stub(jwt, 'verify').returns(verifiedCustomer);
      sinon.stub(Sale, 'create').resolves(null);
      sinon.stub(SalesProducts, 'create').resolves(null);
      sinon.stub(Sale, 'findAll').resolves(null);
      });
  
    it('Testa se o campo totalPrice precisa ser um número', async () => {
      const { body, status } = await chai.request(app).post('/orders').send({
        userId: 3,
        sellerId: 2,
        totalPrice: 'Treze reais e 20 centavos',
        deliveryAddress: "Rua das Bananeiras",   
        deliveryNumber: 1350,
        products: [{
          productId: 1,
          quantity: 6
        }]
      }).set('Authorization', 'validAdmin');
      
      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({
        message: 'Total price must be a number',
      });
    });
  });

  describe('MIDDLEWARE register validation', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedAdminUser);
      sinon.stub(jwt, 'verify').returns(verifiedAdmin);
      sinon.stub(User, 'findOrCreate').resolves(null);
    });

    it('Testa se o campo name foi passado, no registro de novos usuários', async () => {

      const { body, status } = await chai.request(app).post('/register/admin').send({
        email: 'ryu@email.com',
        password: 'ryujiro123456',
        role: 'administrator'
      }).set('Authorization', 'validAdmin');

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({
        message: 'There are missing fields',
      });
    });
  });

  describe('MIDDLEWARE register validation', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedAdminUser);
      sinon.stub(jwt, 'verify').returns(verifiedAdmin);
      sinon.stub(User, 'findOrCreate').resolves(null);
    });

    it('Testa se o campo email foi passado, no registro de novos usuários', async () => {

      const { body, status } = await chai.request(app).post('/register/admin').send({
        name: 'Administrator Ryu',
        password: 'ryujiro123456',
        role: 'administrator'
      }).set('Authorization', 'validAdmin');

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({
        message: 'There are missing fields',
      });
    });
  });

  describe('MIDDLEWARE register validation', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedAdminUser);
      sinon.stub(jwt, 'verify').returns(verifiedAdmin);
      sinon.stub(User, 'findOrCreate').resolves(null);
    });

    it('Testa se o campo password foi passado, no registro de novos usuários', async () => {

      const { body, status } = await chai.request(app).post('/register/admin').send({
        name: 'Administrator Ryu',
        email: 'ryu@email.com',
        role: 'administrator'
      }).set('Authorization', 'validAdmin');

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({
        message: 'There are missing fields',
      });
    });
  });

  describe('MIDDLEWARE register validation', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedAdminUser);
      sinon.stub(jwt, 'verify').returns(verifiedAdmin);
      sinon.stub(User, 'findOrCreate').resolves(null);
    });

    it('Testa se o nome precisa ter até 12 caracteres, na hora do registro de novos usuários', async () => {

      const { body, status } = await chai.request(app).post('/register/admin').send({
        name: 'Ryu',
        email: 'ryu@email.com',
        password: 'ryu123456',
        role: 'administrator'
      }).set('Authorization', 'validAdmin');

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({
        message: 'Name length must be at least 12 characteres long',
      });
    });
  });

  describe('MIDDLEWARE register validation', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedAdminUser);
      sinon.stub(jwt, 'verify').returns(verifiedAdmin);
      sinon.stub(User, 'findOrCreate').resolves(null);
    });

    it('Testa se o formato do email é válido, na hora do registro de novos usuários', async () => {

      const { body, status } = await chai.request(app).post('/register/admin').send({
        name: 'Administrator Ryujiro',
        email: 'ryu@email',
        password: 'ryu123456',
        role: 'administrator'
      }).set('Authorization', 'validAdmin');

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({
        message: 'Email must be a valid',
      });
    });
  });

  describe('MIDDLEWARE register validation', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedAdminUser);
      sinon.stub(jwt, 'verify').returns(verifiedAdmin);
      sinon.stub(User, 'findOrCreate').resolves(null);
    });

    it('Testa se o password é válido, na hora do registro de novos usuários', async () => {

      const { body, status } = await chai.request(app).post('/register/admin').send({
        name: 'Administrator Ryujiro',
        email: 'ryu@email.com',
        password: 'pass',
        role: 'administrator'
      }).set('Authorization', 'validAdmin');

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({
        message: 'Password length must be at least 6 characteres long',
      });
    });
  });

  describe('MIDDLEWARE register validation', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedAdminUser);
      sinon.stub(jwt, 'verify').returns(verifiedAdmin);
      sinon.stub(User, 'findOrCreate').resolves(null);
    });

    it('Testa se a role é válida, na hora do registro de novos usuários', async () => {

      const { body, status } = await chai.request(app).post('/register/admin').send({
        name: 'Administrator Ryu',
        email: 'ryu@email.com',
        password: 'ryujiro123456',
        role: 'brood'
      }).set('Authorization', 'validAdmin');

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({
        message: 'Role must be customer, seller or administrator',
      });
    });
  });

  describe('MIDDLEWARE register validation', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedAdminUser);
      sinon.stub(jwt, 'verify').returns(verifiedAdmin);
      sinon.stub(User, 'findOrCreate').resolves(null);
    });

    it('Testa se uma role foi passada, na hora do registro de novos admins', async () => {

      const { body, status } = await chai.request(app).post('/register/admin').send({
        name: 'Administrator Ryu',
        email: 'ryu@email.com',
        password: 'ryujiro123456',
      }).set('Authorization', 'validAdmin');

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({
        message: 'There are missing fields',
      });
    });
  });
});