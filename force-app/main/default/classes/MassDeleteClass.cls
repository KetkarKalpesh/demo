public with sharing class MassDeleteClass {
    public MassDeleteClass() {

    }
    //class to fetch the contacts
    @AuraEnabled(Cacheable = true) 
    public static List<Contact> getContactList(){
        return [SELECT Id, FirstName, LastName, Email, Title FROM Contact WHERE FirstName != Null ORDER BY CreatedDate DESC];
    }
    //class to delete the recrds
    @AuraEnabled(cacheable = true)
    public static Void deleteContacts(List<Contact> selectedContactIdList){
        List<Contact> conList = [SELECT Id FROM Contact WHERE Id IN: selectedContactIdList];
        if(conList != Null && conList.size()>0){
            Delete conList;
        }
    }
}