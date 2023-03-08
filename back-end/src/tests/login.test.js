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
    password: 'a4c86edecc5aee06eff8fdeda69e0d04',
    role: 'administrator',
  }
};

const dataUser2 = {
  dataValues: {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    password: '3c28d2b0881bf46457a853e0b07531c6', 
    role: 'seller',
  }
};

describe('Testa as funções da página de Login', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('Testa a rota de Login', () => {
    it('Testa a rota de Login', async () => {
      sinon.stub(User, 'findOne').resolves(dataUser);
      const response = await chai.request(app).post('/login').send(
        {
          email: 'adm@deliveryapp.com',
          password: '--adm2@21!!--'
        });
        console.log('STATUS', response.status);
      const { body, status } = response;
      expect(status).to.be.equal(200);
      expect(body.id).to.be.equal(1);
      expect(body.name).to.be.equal('Delivery App Admin');
      expect(body.email).to.be.equal('adm@deliveryapp.com');
      expect(body.role).to.be.equal('administrator');
      expect(typeof body.token).to.be.equal('string');
    });

    it('Testa a rota de /users/:id', async () => {
      sinon.stub(User, 'findByPk').resolves(dataUser.dataValues);
      const response = await chai.request(app).get('/users/1');
      const { body, status } = response;
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({
        id: 1,
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com',
        password: 'a4c86edecc5aee06eff8fdeda69e0d04',
        role: 'administrator'
      })
    });

    it('Testa a rota de /users', async () => {
      sinon.stub(User, 'findByPk').resolves(dataUser.dataValues);
      const response = await chai.request(app).get('/users');
      expect(response.status).to.be.equal(200);
    });
    
    // it('Testa a rota /users/:id no método delete' , async () => {
    //   sinon.stub(User, 'findOne').resolves(null);
    //   // sinon.stub(User, 'findByPk').resolves(dataUser2.dataValues);
    //   // const response = await chai.request(app).delete('/users/2');
    //   // const response = await chai.request(app).delete('/users/2').set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoiRGVsaXZlcnkgQXBwIEFkbWluIiwiZW1haWwiOiJhZG1AZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6ImFkbWluaXN0cmF0b3IifSwiaWF0IjoxNjc4MzE0MDcxLCJleHAiOjE2Nzg5MTg4NzF9.7AvoKYk4hwtOb4S83jXi7Gnd1d4IIsuDq2HReC1CnM8');
    //   // expect(response.status).to.be.equal(200);
    //   // expect(response.message).to.be.equal('User deleted');
    //   // sinon.stub(User, 'destroy').resolves({ message: 'User deleted' });
    //   const tokenStub = sinon.stub().returns('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoiRGVsaXZlcnkgQXBwIEFkbWluIiwiZW1haWwiOiJhZG1AZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6ImFkbWluaXN0cmF0b3IifSwiaWF0IjoxNjc4MzE0MDcxLCJleHAiOjE2Nzg5MTg4NzF9.7AvoKYk4hwtOb4S83jXi7Gnd1d4IIsuDq2HReC1CnM8');
    //   const headers = { Authorization: `Bearer ${tokenStub()}` };
    //   const response = await chai.request(app).delete('/users/2').set(headers);
    //   expect(response.status).to.be.equal(200);
    // });
    })
  });