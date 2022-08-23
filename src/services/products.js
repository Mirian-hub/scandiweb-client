
import { getLoadProductsQuery } from "../graphQl/queries";
import Api from './api';

export const getProducts = (title) => Api.call(getLoadProductsQuery(title)) 