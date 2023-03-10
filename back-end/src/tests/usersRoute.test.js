const chai = require('chai');
const sinon = require('sinon');
const describe = require('mocha').describe;
const it = require('mocha').it;
const { User } = require('../database/models');
const app = require('../api/app');
const { expect } = chai;
const chaiHttp = require('chai-http');
const { allDataUsers, dataAdminUser, authenticatedAdminUser, verifiedUser, dataUserToDelete } = require('./mocks/backendMocks');
const jwt = require('jsonwebtoken');
const { afterEach, before } = require('mocha');

chai.use(chaiHttp);

describe('CAMADA SERVICES', () => {
  describe('Testa as funções da rota /users', () => {
    afterEach(() => {
      sinon.restore();
    });

    describe('GET /users', () => {
      before(() => {
        sinon.stub(User, 'findAll').resolves(allDataUsers.map((users) => users.dataValues));
      });
      it('Testa o funcionamento da rota /users', async () => {
        const response = await chai.request(app).get('/users');
        expect(response.status).to.be.equal(200);
      });
    });

    describe('GET /users/:id', () => {
      before(() => {
        sinon.stub(User, 'findByPk').resolves(dataAdminUser.dataValues);
      });
      it('Testa o funcionamento da rota /users/:id', async () => {
        const response = await chai.request(app).get('/users/1');
        const { body, status } = response;
        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal({
          id: 1,
          name: 'Delivery App Admin',
          email: 'adm@deliveryapp.com',
          role: 'administrator',
        });
      });
    });

    describe('DELETE /users/:id', () => {
      before(() => {
        sinon.stub(jwt, 'decode').returns(authenticatedAdminUser);
        sinon.stub(jwt, 'verify').returns(verifiedUser);
        sinon.stub(User, 'findByPk').resolves(dataUserToDelete);
      });
      it('Testa se SOMENTE o admin é capaz de deletar um usuário', async () => {
        const response = await chai.request(app).delete('/users/2').set('Authorization', 'validAdminToken');
        const { body, status } = response;
        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal({
          message: 'User deleted',
        });
      });
    });
  });
});
