export const contextValues = {
  productsArray: [],
  setProductsArray: jest.fn(),
  insertProp: false,
  setIsertProp: jest.fn(),
  isLoged: false,
  setIsLoged: jest.fn(),
  cartProducts: [],
  setCartProducts: jest.fn(),
  totalValue: 0,
  setTotalValue: jest.fn(),
  checkoutTotal: 0,
  setCheckoutTotal: jest.fn(),
  isLoaded: false,
  setIsLoaded: jest.fn(),
  orderResponse: {},
  setOrderResponse: jest.fn(),
  newUserRegisterByAdmin: false,
  setNewUserRegisterByAdmin: jest.fn(),
  adressValues: {
    seller: 'fulana',
    address: '',
    number: '',
  },
  setAdressValues: jest.fn(),
};

export const localStorageMock = {
  user: {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    role: 'customer',
    token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJkYXRhIjp7ImlkIjozLCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml
    0YUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIifSwiaWF0IjoxNjc4Mzg2MTc5LCJleHAiOjE2Nz
    g5OTA5Nzl9.thE311IuFVzOsxWJ3eSi8aPKXbRGiGvqWUl-NbLyXgk`,
  },
};

export const loginDataMock = {
  data: {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    role: 'customer',
    token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJkYXRhIjp7ImlkIjozLCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml
    0YUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIifSwiaWF0IjoxNjc4Mzg2MTc5LCJleHAiOjE2Nz
    g5OTA5Nzl9.thE311IuFVzOsxWJ3eSi8aPKXbRGiGvqWUl-NbLyXgk`,
  },
};
