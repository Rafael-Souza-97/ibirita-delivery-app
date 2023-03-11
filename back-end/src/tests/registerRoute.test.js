const chai = require('chai');
const sinon = require('sinon');
const describe = require('mocha').describe;
const it = require('mocha').it;
const { User } = require('../database/models');
const app = require('../api/app');
const { expect } = chai;
const chaiHttp = require('chai-http');
const { dataCustomerUserToRegister, dataSellerUserToRegister, dataAdminUserToRegister, authenticatedAdminUser, verifiedUser, authenticatedCustomerUser, verifiedCustomer } = require('./mocks/backendMocks');
const jwt = require('jsonwebtoken');
const { before, afterEach } = require('mocha');

chai.use(chaiHttp);

describe('Testa as funções da rota /register', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('POST /register', () => {
    before(() => {
      sinon.stub(User, 'findOrCreate').resolves([dataCustomerUserToRegister.data, true]);
    });

    it('Testa o funcionamento da rota /register', async () => {
      const { status } = await chai.request(app).post('/register').send({
          name: 'Cliente Homer Simpson',
          email: 'homer@email.com',
          password: '$#homer#$',
        });
      expect(status).to.be.equal(201);
    });
  });

  describe('POST /register', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedCustomerUser);
      sinon.stub(jwt, 'verify').returns(verifiedCustomer);
      sinon.stub(User, 'findOrCreate').resolves([dataCustomerUserToRegister.data, false]);
    });

    it('Testa o funcionamento da rota se o cliente já está registrado', async () => {
      const { status } = await chai.request(app).post('/register').send({
          name: 'Cliente Ze Birita',
          email: 'zebirita@email.com',
          password: '$#zebirita#$',
        }).set('Authorization', 'validToken');
      expect(status).to.be.equal(409);
    });
  });

  describe('POST /register/seller', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedAdminUser);
      sinon.stub(jwt, 'verify').returns(verifiedUser);
      sinon.stub(User, 'findOrCreate').resolves([dataCustomerUserToRegister.data, false]);
    });

    it('Testa o funcionamento da rota se o vendedor já está registrado', async () => {
      const { status } = await chai.request(app).post('/register/seller').send({
          name: 'Cliente Ze Birita',
          email: 'fulana@deliveryapp.com',
          password: '$#zebirita#$',
        }).set('Authorization', 'validToken');;
      expect(status).to.be.equal(409);
    });
  });

  describe('POST /register/admin', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedAdminUser);
      sinon.stub(jwt, 'verify').returns(verifiedUser);
      sinon.stub(User, 'findOrCreate').resolves([dataAdminUserToRegister.data, false]);
    });

    it('Testa o funcionamento da rota se o admin já está registrado', async () => {
      const { status } = await chai.request(app).post('/register/admin').send({
          name: 'Cliente Ze Birita',
          email: 'adm@deliveryapp.com',
          password: '$#zebirita#$',
          role: 'administrator',
        }).set('Authorization', 'ValidToken');
      expect(status).to.be.equal(409);
    });
  });

  describe('POST /register/seller', () => {
    before(() => {
      sinon.stub(User, 'findOrCreate').resolves([dataSellerUserToRegister.data, true]);
    });

    it('Testa o funcionamento da rota /register/seller', async () => {
      const response = await chai.request(app).post('/register/seller').send({
        name: 'Vendedor Appu do Mercadinho',
        email: 'appudomercadinho@email.com',
        password: 'appudomercadinho123',
      });
      const { status } = response;
      expect(status).to.be.equal(201);
    });
  });

  describe('POST /register/admin', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(authenticatedAdminUser);
      sinon.stub(jwt, 'verify').returns(verifiedUser);
      sinon.stub(User, 'findOrCreate').resolves([dataAdminUserToRegister.data, true]);
    });

    it('Testa o funcionamento da rota /register/admin', async () => {
      const response = await chai.request(app).post('/register/admin').send({
        name: 'Administradora Marge',
        email: 'marge@email.com',
        password: 'senhadoadmin123',
        role: 'administrator',
      }).set('Authorization', 'validAdminToken');
      const { status } = response;
      expect(status).to.be.equal(201);
    });
  });
});
