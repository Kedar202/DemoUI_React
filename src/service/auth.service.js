import { get, post } from "./web.request";
const ENDPOINTURL =
  "http://localhost:8082";
export const loginHandlerData = (body) => {
  return post(`${ENDPOINTURL}/admin/login`, body);
};

export const prodcutAddHandler = (body) => {
  console.log(body)
  return post(`${ENDPOINTURL}/addProduct?userId=akshpatel9720@gmail.com`, body);
};

export const prodcutData = (pageCount) => {
  return get(`${ENDPOINTURL}/productList?pageSize=${pageCount}&pageNumber=10`);
};

export const categoryData = () => {
  return get(`${ENDPOINTURL}/getCategoryList`);
};