import axios from 'axios';

const API_URL = 'https://backend-ecommerce-pty6.onrender.com/api';

export const getCategoriesByCategories = category => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/productos/categories/${category}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const createProducto = data => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/productos`, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const updateProduct = (id, data) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${API_URL}/productos/${id}`, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const allProducto = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/productos`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const deleteProducto = id => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${API_URL}/productos/${id}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const findProductoById = id => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/productos/${id}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const allCategories = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/productos/categories`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const adminLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/authentificacion/login-admin`, email, password)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};
