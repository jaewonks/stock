import axios from 'axios';
import * as XLSX from "xlsx";
import { IExcel } from '../typings/db';

export const readFile = (file: any) => {
  const promise = new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target?.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });

  promise.then((data: any) => {
    console.log(data);
    data?.map((d: IExcel) => {
      const productname = d.product_name? String(d.product_name):'';
      const colour = d.product_colour? String(d.product_colour):'';
      const size = d.product_size? d.product_size:'';
      const priceUk = d.price_uk? String(d.price_uk):'';
      const priceKr = d.price_kr? String(d.price_kr):'';
      const quantity = d.quantity? String(d.quantity):'';
      const brandname = d.brand_id? d.brand_id:''; 
      const categoryname = d.categories_id? d.categories_id:'';
      const productstatus = "1";
      const link = d.link? String(d.link):'';

      axios
      .post('api/products', { brandname, categoryname, link, priceUk, priceKr, colour, productname, quantity, size, productstatus })
      .then((response) => {
        if(response.statusText !== 'OK') {
          throw new Error(response?.data.message)
        }
      })
      .catch((error) => {
        throw error.response?.data?.statusCode;
      })
    })
  });
};

