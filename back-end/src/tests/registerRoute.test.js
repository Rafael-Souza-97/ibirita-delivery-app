// const chai = require('chai');
// const sinon = require('sinon');
// const describe = require('mocha').describe;
// const it = require('mocha').it;
// const { User } = require('../database/models');
// const app = require('../api/app');
// const { expect } = chai;
// const chaiHttp = require('chai-http');
// const { dataCustomerUserToRegister } = require('./mocks/backendMocks');

// chai.use(chaiHttp);

// describe('CAMADA SERVICES', () => {
//   describe('Testa as funções da rota /register', () => {
//     beforeEach(() => {
//       sinon.restore();
//     });

//     it('Testa o funcionamento da rota /register', async () => {
//       sinon.stub(User, 'findOrCreate').resolves(dataCustomerUserToRegister.data);
//       const { status } = await chai.request(app).post('/register').send(
//         {
//           name: 'Cliente Homer Simpson',
//           email: 'homer@email.com',
//           password: '$#homer#$',
//         }
//       );
//       expect(status).to.be.equal(201);
//     });

//     // it('Testa o funcionamento da rota /users/seller', async () => {
//     //   sinon.stub(User, 'findByPk').resolves(dataAdminUserToRegister.dataValues);
//     //   const response = await chai.request(app).get('/users/1');
//     //   const { body, status } = response;
//     //   expect(status).to.be.equal(200);
//     //   expect(body).to.be.deep.equal({
//     //     id: 1,
//     //     name: 'Delivery App Admin',
//     //     email: 'adm@deliveryapp.com',
//     //     role: 'administrator',
//     //   });
//     // });

//     // it('Testa o funcionamento da rota /register/admin', async () => {})
//   });
// })