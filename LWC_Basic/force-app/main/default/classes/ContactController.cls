public with sharing class ContactController {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContact(){        
        return [Select Id,Name from Contact limit 100];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> findContactsByName(String keyword){
        if(keyword!=null && keyword!=''){
            keyword = '%'+keyword+'%';
            return [Select Id,Name,FirstName,LastName from Contact Where Name like:keyword limit 10];
        }
        else{
            return [Select Id,Name,FirstName,LastName from Contact limit 10];
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<sObject> getData(String fields,String objectName){
        return Database.query('Select '+fields+' FROM '+objectName);
    }

    @AuraEnabled
    public static void updateContact(Contact conObj){
        update conObj;
    }
}
