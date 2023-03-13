const chai = require('chai');
const sinon = require('sinon');
const describe = require('mocha').describe;
const it = require('mocha').it;
const { User } = require('../database/models');
const app = require('../api/app');
const { expect } = chai;
const chaiHttp = require('chai-http');
const { getUserFromToken, checkToken } = require('../utils/jwtConfig');
const { convertToMD5 } = require('../utils/md5Config');
const { dataAdminUser, dataSellerUser, dataCustomerUser, dataAdminUserLogin, dataInvalidToken } = require('./mocks/backendMocks');
const { afterEach } = require('mocha');
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);

describe('Testa as funções da rota /login', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('POST /login', () => {
    before(() => {
      sinon.stub(jwt, 'decode').returns(dataAdminUserLogin);
      sinon.stub(jwt, 'verify').returns(dataInvalidToken.data);
      sinon.stub(User, 'findOne').resolves(dataAdminUserLogin);
    });

    it('Testa o funcionamento da rota caso o token seja inválido', async () => {
      const { body, status } = await chai.request(app).post('/login').send({
        email: 'adm@deliveryapp.com',
        password: '--adm2@21!!--'
      });

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Token is invalid' });
    });
  });

  describe('POST /login', () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(dataAdminUserLogin);
    });
    it('Testa o funcionamento da rota /login e o token gerado e as suas informações para login de user com role admin', async () => {
      const { body, status } = await chai.request(app).post('/login').send(
        {
          email: 'adm@deliveryapp.com',
          password: '--adm2@21!!--'
        });

      expect(status).to.be.equal(200);
      expect(body.id).to.be.equal(1);
      expect(body.name).to.be.equal('Delivery App Admin');
      expect(body.email).to.be.equal('adm@deliveryapp.com');
      expect(body.role).to.be.equal('administrator');
      expect(typeof body.token).to.be.equal('string');
      expect(checkToken(body.token).data).to.be.deep.equal({
        id: 1,
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com',
        role: 'administrator'
      });
      expect(checkToken('123').hasError).to.be.equal(true);
      expect(getUserFromToken(body.token).data.name).to.be.equal('Delivery App Admin');
      expect(getUserFromToken(body.token).data.email).to.be.equal('adm@deliveryapp.com');
      expect(convertToMD5('--adm2@21!!--')).to.be.equal('a4c86edecc5aee06eff8fdeda69e0d04');
      expect(getUserFromToken(body.token).data.password).to.be.equal(undefined);
      expect(getUserFromToken(body.token).data.role).to.be.equal('administrator');
    });
  });

  describe('POST /login', () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(dataSellerUser);
    });

    it('Testa o funcionamento da rota /login e o token gerado e as suas informações para login de user com role seller', async () => {
      const { body, status } = await chai.request(app).post('/login').send(
        {
          email: 'fulana@deliveryapp.com',
          password: 'fulana@123'
        });

      expect(status).to.be.equal(200);
      expect(body.id).to.be.equal(2);
      expect(body.name).to.be.equal('Fulana Pereira');
      expect(body.email).to.be.equal('fulana@deliveryapp.com');
      expect(body.role).to.be.equal('seller');
      expect(typeof body.token).to.be.equal('string');
      expect(getUserFromToken(body.token).data.name).to.be.equal('Fulana Pereira');
      expect(getUserFromToken(body.token).data.email).to.be.equal('fulana@deliveryapp.com');
      expect(getUserFromToken(body.token).data.role).to.be.equal('seller');
    });
  });

  describe('POST /login', () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(dataCustomerUser);
    });

    it('Testa o funcionamento da rota /login e o token gerado e as suas informações para login de user com role customer', async () => {
      const { body, status } = await chai.request(app).post('/login').send(
        {
          email: 'zebirita@email.com',
          password: '$#zebirita#$'
        });

      expect(status).to.be.equal(200);
      expect(body.id).to.be.equal(3);
      expect(body.name).to.be.equal('Cliente Zé Birita');
      expect(body.email).to.be.equal('zebirita@email.com');
      expect(body.role).to.be.equal('customer');
      expect(typeof body.token).to.be.equal('string');
      expect(getUserFromToken(body.token).data.name).to.be.equal('Cliente Zé Birita');
      expect(getUserFromToken(body.token).data.email).to.be.equal('zebirita@email.com');
      expect(getUserFromToken(body.token).data.role).to.be.equal('customer');
    });
  });

  describe('POST /login', () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(dataAdminUser);
    });

    it('Testa se o login falha quando o email não é passado', async () => {
      const { body, status } = await chai.request(app)
        .post('/login')
        .send({
          password: '--adm2@21!!--',
        });

      expect(status).to.be.equal(404);
      expect(body.message).to.be.equal('Email and password are required');
    });
  });

  describe('POST /login', () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(dataAdminUser);
    });

    it('Testa se o login falha quando a senha não é passada', async () => {
      const { body, status } = await chai.request(app)
        .post('/login')
        .send({
          email: 'adm@deliveryapp.com',
        });
      
      expect(status).to.be.equal(404);
      expect(body.message).to.be.equal('Email and password are required');
    });
  });

  describe('POST /login', () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(dataAdminUser);
    });
    it('Testa se o login falha quando o email não é válido', async () => {
      const { body, status } = await chai.request(app)
        .post('/login')
        .send({
          email: 'adm@deliveryapp',
          password: '--adm2@21!!--',
        });
      
      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal('Email must be valid');
    });
  });

  describe('POST /login', () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(dataAdminUser);
    });
    it('Testa se o login falha quando a senha não é válida', async () => {
      const { body, status } = await chai.request(app)
        .post('/login')
        .send({
          email: 'adm@deliveryapp.com',
          password: '--adm2',
        });
      
      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal('Email or password must be valid');
    });
  });

  describe('POST /login', () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(null);
    });
    it('Testa se o login falha quando o email não existe', async () => {

      const { body, status } = await chai.request(app)
        .post('/login')
        .send({
          email: 'pedro@deliveryapp.com',
          password: '--adm2@21!!--',
        });
      
      expect(status).to.be.equal(404);
      expect(body.message).to.be.equal('Not found');
    });
  });
});
