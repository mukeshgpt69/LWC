public with sharing class ContactController {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContact(){        
        return [Select Id,Name from Contact limit 100];
    }
}
