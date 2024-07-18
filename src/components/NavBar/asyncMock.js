
const products = [
    {
      id: "1",
      name: "Shampoo solido de lavanda",
      price: 1200,
      category: "shampoo",
      img: "https://images.unsplash.com/photo-1634906345513-3fef37b28ae6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      stock: 25,
      description: "Lavada y limon",
    },
    {
      id: "2",
      name: "acondionador karite",
      price: 1800,
      category: "acondicionador",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd-knNUq3SHvU64mSIcz8UueKUQBsgqq6IXYn8URIAc5WFox5etl3Fs9_O7Fk3ovYGyJI&usqp=CAU",
      stock: 16,
      description: "Acondicionador de coco y karite",
    },
    {
      id: "3",
      name: "vela soja",
      price: 1400,
      category: "velas",
      img: "https://acdn.mitiendanube.com/stores/001/947/461/products/velas21-c0e61046e7d592ea0e16486623228329-640-0.jpg",
      stock: 0,
      description: "Vela de alta duración de soja con fragancia de limon",
    },
    {
      id: "4",
      name: "cepillo de diente",
      price: 1200,
      category: "cepillos",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCq1rBW9sxCk2tOQtSG2RZ-xsJxBLdLoTNzA&s",
      stock: 0,
      description: "cepillo ecologico de madera",
    },
  ];
  
  export const getProducts = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products);
      }, 1000);
    });
  };
  
  export const getProductsByCategory = (categoryId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products.filter((prod) => prod.category === categoryId));
      }, 1000);
    });
  };
  
  export const getProductById = (productoId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products.find((prod) => prod.id === productoId));
      }, 1000);
    });
  };
  