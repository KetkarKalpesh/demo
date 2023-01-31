import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import CAR_OBJECT from '@salesforce/schema/wheel__c'

import CATEGORY from '@salesforce/schema/Wheel__c.Category__c';
import MAKE from '@salesforce/schema/Wheel__c.Make__c';

const CATEGORY_ERROR = 'Category Error Loaading';
const MAKE_ERROR = 'Make error Loading'

//import Lightning Message Service and a Message Channel
import CARS_FILTERED_MESSAGE from '@salesforce/messageChannel/CarsFiltered__c';
import { publish, MessageContext } from 'lightning/messageService';

export default class CarFilter extends LightningElement {
    categoryError = CATEGORY_ERROR
    makeError = MAKE_ERROR
    
    filters={
        searchKey:'',
        maxPrice:999999
    }

    // Load context for LMS
    @wire(MessageContext)
    messageContext



    // fetching Category Picklist
    @wire(getObjectInfo, {objectApiName:CAR_OBJECT})
    carObjectInfo

    @wire(getPicklistValues, {
        recordTypeId:'$carObjectInfo.data.defaultRecordTypeId',
        fieldApiName: CATEGORY
    })categories

    @wire(getPicklistValues, {
        recordTypeId:'$carObjectInfo.data.defaultRecordTypeId',
        fieldApiName: MAKE
    })makeType

    handleSearchKeyChange(event){
        console.log(event.target.value)
        this.filters = {...this.filters, "searchKey":event.target.value}
        this.sendDataToCarList()
    }

    handleMaxPriceChange(event){
        console.log(event.target.value)
        this.filters = {...this.filters, "maxPrice":event.target.value}
    }

    handleChange(event){
        const {name, value} = event.target.dataset
        console.log('name:', name);
        console.log('value', value)
    }

    sendDataToCarList(){
        publish(this.messageContext, CARS_FILTERED_MESSAGE, {
            filters: this.filters
        })
    }
}