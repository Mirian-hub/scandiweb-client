import {LOAD_CURRENCIES } from "../graphQl/queries";
import Api from './api';

export const getCurrencies = () =>  Api.call(LOAD_CURRENCIES) 