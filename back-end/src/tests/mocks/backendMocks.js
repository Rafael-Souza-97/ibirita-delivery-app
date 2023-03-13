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

const dataInvalidToken = {
  data:{
    dataValues: {
      id: 1,
      name: 'Delivery App Admin',
      email: 'adm@deliveryapp.com',
      role: 'administrator',
    },
    hasError: true,
  }
}

const dataInvalidGenericToken = {
  data:{
    dataValues: {
    },
    hasError: true,
  }
}

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
};

const authenticatedCustomerUser = {
  data: {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    role: 'customer',
  }
};

const verifiedAdmin = {
  data: {
    dataValues: {
      id: 1,
      name: 'Delivery App Admin',
      email: 'adm@deliveryapp.com',
      role: 'administrator',
    }
  }
};

const verifiedSeller = {
  data: {
    dataValues: {
      id: 2,
      name: 'Fulana Pereira',
      email: 'fulana@deliveryapp.com',
      role: 'seller',
    }
  }
}

const verifiedCustomer = {
  data: {
    dataValues: {
      id: 3,
      name: 'Cliente Zé Birita',
      email: 'zebirita@email.com',
      role: 'customer',
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

const dataCreatedSalesProducts = {
  dataValues: { saleId: 1, productId: 1, quantity: 6 },
};

const dataCreatedSale = {
  dataValues: {
    saleDate: new Date(),
    status: 'Pendente',
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: 13.20,
    deliveryAddress: 'Rua das Bananeiras',
    deliveryNumber: 1350
  },
};

const saleData = {
  userId: 3,
  sellerId: 2,
  totalPrice: 13.20,
  deliveryAddress: 'Rua das Bananeiras',
  deliveryNumber: 1350,
  products: [ { productId: 1, quantity: 6 } ]
};

const allSalesData = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '150.50',
    deliveryAddress: 'Rua das Bananeiras',
    deliveryNumber: '1350',
    saleDate: new Date(),
    status: 'Pendente',
    products: [Array]
  },
  {
    id: 2,
    userId: 3,
    sellerId: 2,
    totalPrice: '150.50',
    deliveryAddress: 'Rua das Bananeiras',
    deliveryNumber: '1350',
    saleDate: new Date(),
    status: 'Pendente',
    products: [Array]
  }
];

const dataCreatedFinalizedSale = {
  dataValues: {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: 13.20,
    deliveryAddress: 'Rua das Bananeiras',
    deliveryNumber: '1350',
    saleDate: new Date(),
    status: 'Pendente',
    products: [
      {
        id: 1,
        name: "Skol Lata 250ml",
        price: "2.20",
        urlImage: "http://localhost:3001/images/skol_lata_350ml.jpg",
        SalesProducts: {
          quantity: 6
        }
      }
    ]
  }
};

const saleStatusToUpdate = {
  dataValues: {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '150.50',
    deliveryAddress: 'Rua das Bananeiras',
    deliveryNumber: '1350',
    saleDate: new Date(),
    status: 'Pendente',
  },
};

const saleStatusUpdated = {
  dataValues: {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '150.50',
    deliveryAddress: 'Rua das Bananeiras',
    deliveryNumber: '1350',
    saleDate: new Date(),
    status: 'Em Trânsito',
    products: [
      {
        id: 1,
        name: "Skol Lata 250ml",
        price: "2.20",
        urlImage: "http://localhost:3001/images/skol_lata_350ml.jpg",
        SalesProducts: {
          quantity: 6
        }
      }
    ]
  },
};

const saleToFind = {
  dataValues: {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '150.50',
    deliveryAddress: 'Rua das Bananeiras',
    deliveryNumber: '1350',
    saleDate: new Date(),
    status: 'Pendente',
    products: [
      {
        id: 1,
        name: "Skol Lata 250ml",
        price: "2.20",
        urlImage: "http://localhost:3001/images/skol_lata_350ml.jpg",
        SalesProducts: {
          quantity: 6
        }
      }
    ]
  },
  destroy: async () => await Promise.resolve(true)
};

const saleToDelete = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '150.50',
  deliveryAddress: 'Rua das Bananeiras',
  deliveryNumber: '1350',
  saleDate: new Date(),
  status: 'Pendente',
  products: [
    {
      id: 1,
      name: "Skol Lata 250ml",
      price: "2.20",
      urlImage: "http://localhost:3001/images/skol_lata_350ml.jpg",
      SalesProducts: {
        quantity: 6
      }
    }
  ]
};

const salesDeleted = {
  dataValues: {
    id: 2,
    userId: 3,
    sellerId: 2,
    totalPrice: '150.50',
    deliveryAddress: 'Rua das Bananeiras',
    deliveryNumber: '1350',
    saleDate: new Date(),
    status: 'Pendente',
    products: [
      {
        id: 1,
        name: "Skol Lata 250ml",
        price: "2.20",
        urlImage: "http://localhost:3001/images/skol_lata_350ml.jpg",
        SalesProducts: {
          quantity: 6
        }
      }
    ]
  }
};

const allProductsData = [
  dataValues = {
    id: 1,
    name: "Skol Lata 250ml",
    price: "2.20",
    urlImage: "http://localhost:3001/images/skol_lata_350ml.jpg",
  },
  dataValues = {
    id: 2,
    name: "Skol Lata 350ml",
    price: "2.20",
    urlImage: "http://localhost:3001/images/skol_lata_350ml.jpg",
  },
];

module.exports = {
  dataAdminUser,
  dataInvalidToken,
  dataAdminUserLogin,
  dataSellerUser,
  dataCustomerUser,
  dataCustomerUserToRegister,
  dataSellerUserToRegister,
  dataAdminUserToRegister,
  allDataUsers,
  dataUserToDelete,
  authenticatedAdminUser,
  authenticatedCustomerUser,
  verifiedAdmin,
  verifiedSeller,
  verifiedCustomer,
  dataCreatedSale,
  dataCreatedSalesProducts,
  saleData,
  dataCreatedFinalizedSale,
  saleStatusToUpdate,
  saleStatusUpdated,
  saleToFind,
  saleToDelete,
  salesDeleted,
  allSalesData,
  allProductsData,
  dataInvalidGenericToken,
}