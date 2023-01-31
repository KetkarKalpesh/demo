public with sharing class CarController {
    //warpper class
    public class Filters{
        @AuraEnabled
        public string searchKey {get; set;}
        @AuraEnabled
        public decimal maxPrice {get; set;}
        @AuraEnabled
        public string[] categories {get; set;}
        @AuraEnabled
        public string[] makeType {get; set;}
    }
    @AuraEnabled(cacheable=true)
    public static List<Wheel__c> getCars(Filters filters){
        String key, whereClause='';
        Decimal maxPrice;
        String[] categories, makeType, criteria = new List<String>{};
        if(filters != Null){
            maxPrice = filters.maxPrice;
            categories = filters.categories;
            makeType = filters.makeType;
            if(!String.isEmpty(filters.searchKey)){
                key= '%' + filters.searchKey + '%';
                criteria.add('Name LIKE: key');
            }
            if(filters.maxPrice >= 0){
                criteria.add('MSRP__c <= maxPrice');
            }
            if(filters.categories != null){
                criteria.add('Category__c IN: categories');
            }
            if(filters.categories != null){
                criteria.add('Make__c IN: makeType');
            }
            if(criteria.size()>0){
                whereClause = ' WHERE ' + String.join(criteria, ' AND');
            }
        }

        string query='SELECT Id, Name, Category__c, Control__c, Description__c, Fuel_Type__c, Make__c, MSRP__c, Number_of_Seats__c, Picture_URL__c FROM Wheel__c '  + whereClause + ' WITH SECURITY_ENFORCED ORDER BY Name';
        return Database.query(query);
        
    }
}