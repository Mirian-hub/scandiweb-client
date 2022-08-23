import { getLoadProductQuery } from "../graphQl/queries";
import Api from './api';

export const getProduct = (id) => Api.call(getLoadProductQuery(id)) 