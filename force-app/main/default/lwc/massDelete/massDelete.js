import { LightningElement, wire, track } from 'lwc';
import getContactList from '@salesforce/apex/MassDeleteClass.getContactList';
import deleteContacts from '@salesforce/apex/MassDeleteClass.deleteContacts';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MassDelete extends LightningElement {
    @wire(getContactList)
    contacts
    @track selectedContactIdList
    @track columns = [
        {label:'First Name', fieldName:'FirstName', type:'text'},
        {label:'Last Name', fieldName:'LastName', type:'text'}
    ];
    handleDeleteSelected(){
        deleteContacts({selectedContactIdList:this.selectedContactIdList}).then(result => {
            this.dispatchEvent
                new ShowToastEvent({
                    title: 'success',
                    message: 'Selected Contacts get Deleted!!',
                    variant: 'success',
                }),
                this.template.querySelector('lightning-datatable').selectedRows = [];

                return refreshApex(this.contacts);
        }).catch(error => {
            this.message = undefined
            this.error = error
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating records',
                    message: error.body.pageError[0].message,
                    variant: 'error',
                }),
            )
                console.log("error", JSON.stringify(this.error));
        })
    }

    prepareSelectedRows(event){
        const selectedRows = event.detail.selectedRows
        this.selectedContactIdList = []
        for(let i=0; i<selectedContactIdList; i++){
            this.selectedContactIdList.push(selectedRows[i].id)
        }
        console.log(this.selectedContactIdList)
    }
}