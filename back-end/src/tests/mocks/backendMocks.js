const dataAdminUserLogin = {
  dataValues: {
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    password: 'a4c86edecc5aee06eff8fdeda69e0d04',
    role: 'administrator',
  }
};

const dataAdminUser = {
  dataValues: {
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    role: 'administrator',
  }
};

const dataSellerUser = {
  dataValues: {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    password: '3c28d2b0881bf46457a853e0b07531c6',
    role: 'seller',
  }
};

const dataCustomerUser = {
  dataValues: {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    password: '1c37466c159755ce1fa181bd247cb925',
    role: 'customer',
  },
};

const dataCustomerUserToRegister = {
  data: {
    dataValues: {
      id: 4,
      name: 'Cliente Homer Simpson',
      email: 'homer@email.com',
      role: 'customer',
    }
  }
};

const dataSellerUserToRegister = {
  data: {
    dataValues: {
      id: 5,
      name: 'Vendedor Appu do Mercadinho',
      email: 'appudomercadinho@email.com',
      role: 'seller',
    }
  }
};

const dataAdminUserToRegister = {
  data: {
    dataValues: {
      id: 6,
      name: 'Admistradora Marge',
      email: 'marge@email.com',
      role: 'administrator',
    }
  }
};

const allDataUsers = [
  {
    dataValues: {
      id: 1,
      name: 'Delivery App Admin',
      email: 'adm@deliveryapp.com',
      role: 'administrator',
    }
  },
  {
    dataValues: {
      id: 2,
      name: 'Fulana Pereira',
      email: 'fulana@deliveryapp.com',
      role: 'seller'
    }
  },
  {
    dataValues: {
      id: 3,
      name: 'Cliente Zé Birita',
      email: 'zebirita@email.com',
      role: 'customer'
    }
  },
  {
    dataValues: {
      id: 4,
      name: 'Cliente Homer Simpson',
      email: 'homer@email.com',
      role: 'customer'
    }
  }
];

const authenticatedAdminUser = {
  data: {
    role: 'administrator',
  }
}

const verifiedUser = {
  data: {
    dataValues: {
      id: 1,
      name: 'Delivery App Admin',
      email: 'adm@deliveryapp.com',
      role: 'administrator',
    }
  }
}

const dataUserToDelete = {
  dataValues: {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    role: 'seller',
  },
  destroy: async () => await Promise.resolve(true)
};

module.exports = {
  dataAdminUser,
  dataAdminUserLogin,
  dataSellerUser,
  dataCustomerUser,
  dataCustomerUserToRegister,
  dataSellerUserToRegister,
  dataAdminUserToRegister,
  allDataUsers,
  dataUserToDelete,
  authenticatedAdminUser,
  verifiedUser,
}