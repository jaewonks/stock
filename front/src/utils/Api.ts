import axios from 'axios';

export const getProducts = (setFunc: any) => {
  axios
  .get('api/products')
  .then((response) => {
    if(response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    setFunc(response.data)
  })    
  .catch((error) => {
    return { error: error.response.data.message || error.message }
  })
}

export const getBrands = (setFunc: any) => {
  axios
  .get('api/products/brand_option')
  .then((response) => {
    if(response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    setFunc(response.data)
  })
  .catch((error) => {
    return { error: error.response.data.message || error.message };
  }) 
}

export const getCategories = (setFunc: any) => {
  axios
  .get('api/products/category_option')
  .then((response) => {
    if(response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    setFunc(response.data)
  })  
  .catch((error) => {
      return { error: error.response.data.message || error.message };
  })
}