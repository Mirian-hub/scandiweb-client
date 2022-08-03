
import { LOAD_PRODUCTS } from "../GrafpQL/queries";
import Api from './api';

export const getProducts = () =>  Api.call(LOAD_PRODUCTS )