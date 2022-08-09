import {LOAD_CURRENCIES } from "../GrafpQL/queries";
import Api from './api';

export const getCurrencies = () =>  Api.call(LOAD_CURRENCIES) 