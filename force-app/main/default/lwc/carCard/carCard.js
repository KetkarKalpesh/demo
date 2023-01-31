import { LightningElement } from 'lwc';

//import object  and fields
import CAR_OBJECT from '@salesforce/schema/Wheel__c'
import NAME_FIELD from '@salesforce/schema/Wheel__c.Name'
import PICTURE_URL_FIELD from '@salesforce/schema/Wheel__c.Picture_URL__c'
import CATEGORY_FIELD from '@salesforce/schema/Wheel__c.Category__c'
import MAKE_FIELD from '@salesforce/schema/Wheel__c.Make__c'
import MSRP_FIELD from '@salesforce/schema/Wheel__c.MSRP__c'
import FUEL_FIELD from '@salesforce/schema/Wheel__c.Fuel_Type__c'
import SEATS_FIELD from '@salesforce/schema/Wheel__c.Number_of_Seats__c'
import CONTROL_FIELD from '@salesforce/schema/Wheel__c.Control__c'
const RECORD_ID = 'a035i00000885JxAAI'
export default class CarCard extends LightningElement {
    recordId = RECORD_ID
    
    carName = NAME_FIELD
    category = CATEGORY_FIELD
    makeType = MAKE_FIELD
    control = CONTROL_FIELD
    fuel = FUEL_FIELD
    pictureUrl = PICTURE_URL_FIELD
    msrp = MSRP_FIELD
    seats = SEATS_FIELD
    
}