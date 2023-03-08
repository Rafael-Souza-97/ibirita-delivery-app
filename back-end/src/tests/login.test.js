const chai = require('chai');
const assert = require('chai').assert;
const sinon = require('sinon');
const describe = require('mocha').describe;
const it = require('mocha').it;
const { User } = require('../database/models');
// // import * as sinon from 'sinon';
const app = require('../api/app');
const { expect } = chai;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const dataUser = {
  dataValues: {
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    // password: 'a4c86edecc5aee06eff8fdeda69e0d04',
    role: 'administrator',
  }
};

const arrayUser = [{
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    password: 'a4c86edecc5aee06eff8fdeda69e0d04',
    role: 'administrator',
}];

describe('Testa as funções da página de Login', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('Testa a rota de Login', () => {
    it('Testa a rota de Login', async () => {
      sinon.stub(User, 'findOne').resolves(dataUser.dataValues);
      const response = await chai.request(app).post('/login').send(
        {
          email: 'adm@deliveryapp.com',
          password: '--adm2@21!!--'
        });
      const { body, status } = response;
      expect(status).to.be.equal(200);
      expect(body.id).to.be.equal(1);
      expect(body.name).to.be.equal('Delivery App Admin');
      expect(body.email).to.be.equal('adm@deliveryapp.com');
      expect(body.role).to.be.equal('administrator');
    });
    it('Testa a rota de login/users/:id', async () => {
      sinon.stub(User, 'findByPk').resolves(dataUser);
      const response = await chai.request(app).get('/login/users/1').send(arrayUser[0]);
      const { body, status } = response;
      expect(status).to.be.equal(200);
      expect(body).to.be.equal({
        id: 1,
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com',
        password: 'a4c86edecc5aee06eff8fdeda69e0d04',
        role: 'administrator'
      })
    });
    it('Testa a rota de /users', async () => {
      const response = await chai.request(app).get('/users').send({
        name: 'Maria Joaquina',
        email: 'mariazinha123@email.com',
        password: 'senhaSecreta123',
        role: 'customer',        
      });
      expect(response.status).to.be.equal(200);
    });
    it('Testa a rota /delete/:id', async () => {
      const response = await chai.request(app).delete('/delete/:id').send(
        {
          
      });
      expect(response.status).to.be.equal(200);
    });
    })
  });