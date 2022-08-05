import { LOAD_CATEGORIES } from "../GrafpQL/queries";
import Api from './api';

export const getCategories = () =>  Api.call(LOAD_CATEGORIES )