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
const { dataAdminUser, dataSellerUser, dataCustomerUser, dataAdminUserLogin } = require('./mocks/backendMocks');

chai.use(chaiHttp);

describe('CAMADA SERVICES', () => {
  describe('Testa as funções da rota /login', () => {
    beforeEach(() => {
      sinon.restore();
    });

    it('Testa o funcionamento da rota /login e o token gerado e as suas informações para login de user com role admin', async () => {
      sinon.stub(User, 'findOne').resolves(dataAdminUserLogin);
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

    it('Testa o funcionamento da rota /login e o token gerado e as suas informações para login de user com role seller', async () => {
      sinon.stub(User, 'findOne').resolves(dataSellerUser);
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

    it('Testa o funcionamento da rota /login e o token gerado e as suas informações para login de user com role customer', async () => {
      sinon.stub(User, 'findOne').resolves(dataCustomerUser);
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

    it('Testa se o login falha quando o email não é passado', async () => {
      sinon.stub(User, 'findOne').resolves(dataAdminUser);
      const { body, status } = await chai.request(app)
        .post('/login')
        .send({
          password: '--adm2@21!!--',
        });

      expect(status).to.be.equal(404);
      expect(body.message).to.be.equal('Email and password are required');
    });

    it('Testa se o login falha quando a senha não é passada', async () => {
      sinon.stub(User, 'findOne').resolves(dataAdminUser);
      const { body, status } = await chai.request(app)
        .post('/login')
        .send({
          email: 'adm@deliveryapp.com',
        });
      
      expect(status).to.be.equal(404);
      expect(body.message).to.be.equal('Email and password are required');
    });

    it('Testa se o login falha quando o email não é válido', async () => {
      sinon.stub(User, 'findOne').resolves(dataAdminUser);
      const { body, status } = await chai.request(app)
        .post('/login')
        .send({
          email: 'adm@deliveryapp',
          password: '--adm2@21!!--',
        });
      
      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal('Email must be valid');
    });

    it('Testa se o login falha quando a senha não é válida', async () => {
      sinon.stub(User, 'findOne').resolves(dataAdminUser);
      const { body, status } = await chai.request(app)
        .post('/login')
        .send({
          email: 'adm@deliveryapp.com',
          password: '--adm2',
        });
      
      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal('Email or password must be valid');
    });

    it('Testa se o login falha quando o email não existe', async () => {
      sinon.stub(User, 'findOne').resolves(null);
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
})