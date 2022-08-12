import { getLoadProductQuery } from "../GrafpQL/queries";
import Api from './api';

export const getProduct = (id) => Api.call(getLoadProductQuery(id)) 