import { LightningElement } from 'lwc';
import {countryCodeList} from 'c/countryCodeList';
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets';

export default class CurrencyConverterApp extends LightningElement {
    countryList = countryCodeList;
    countryFrom = "INR";
    countryTo = "JPY";
    currencyImage = currencyConverterAssets + '/currencyConverterAssets/currency.svg';
    result;
    error;
    amount = '';

    handleChange(event){
        const{name,value} = event.target;
        this[name] = value;
        this.result = '';
        this.error = '';
    }

    submitHandler(event){
        event.preventDefault();
        this.convert();
    }

    //doing api call thus async
    async convert(){
        const API_URL = `https://api.exchangerate.host/convert?from=${this.countryFrom}&to=${this.countryTo}`;
        try{
            const data = await fetch(API_URL);
            const jsonData = await data.json();
            this.result = (Number(this.amount) * jsonData.result).toFixed(2);
        } catch(error) {
            this.error = "An error occured. try again."
        }
    }
}