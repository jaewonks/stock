export const initSize = (el: any) => {
  if(el !== '') {
  const size = el?.toUpperCase();
  if(size.includes('X') || size === 'S' || size === 'M' || size === 'L') {
    return size;
  }

  if (size.includes('EU')) {
    return 'S' + size.replace('EU','')
  } else if (size.includes('UK')) {
    return 'S' + size.replace('UK','')
  } else if (size.includes('US')) {
    return 'S' + size.replace('UK','')
  } else if (size.includes('.')) {
    return 'S' + size.replace('.','')
  } else return 'S' + size; 
} else {
  return el;
} 
}

const char = (el: string) => {
  const name = el.toUpperCase();
  const pattern = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\ '\"\\(\=]/gi;
  const text = name.replace(pattern,'').trim() 
  return text.substr(0,4);
} 

const initColour = (el: string) => {
  const color = el.toUpperCase();
  let init = color.slice(0,2);
  return init;
};

const initPrice = (el: string) => {
  const price = el.replace(',','').replace('.0','').replace('.','');
  return price;
}

export const createBarcode = (product: any) => {
  const brand = product.brand_abbre;
  const name = product.product_name;
  const colour = product.product_colour;
  const price = product.price_uk;
  const size = product.product_size;
  
  const el1 = char(name);
  const el2 = initColour(colour);
  const el3 = initPrice(price);

  const el4 = initSize(size);
  const code = brand + el1 + el2 + el3 + el4;
  return code;
}