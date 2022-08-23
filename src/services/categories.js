import { LOAD_CATEGORIES } from "../graphQl/queries";
import Api from './api';

export const getCategories = () =>  Api.call(LOAD_CATEGORIES )