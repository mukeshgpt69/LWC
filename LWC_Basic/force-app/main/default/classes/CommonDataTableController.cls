/**
 * Created By       :   Mukesh Gupta(Girikon)
 * Created On       :   06/28/2019
 * @description     :   This class provides following functionalities:          
 *                      Allow to fetch record based on dynamic object and field. This class used by "genericTable" LWC
 *                      
 * Helper Class     :   n/a
 * Test Class       :   n/a
 
 * Modification log --
 * Modified by      :  n/a
 **/
public with sharing class CommonDataTableController{
    @AuraEnabled
    public LWCTableWraper LWCTabWrap;     

    @AuraEnabled
    public integer offst;    

    @AuraEnabled
    public integer total;    

    @AuraEnabled
    public boolean hasprev;

    @AuraEnabled
    public Integer pageSize;

    @AuraEnabled
    public boolean hasnext;    

    public static boolean hasprevious(integer off){ if(off>0){return false;}else{return true;}}
    public static boolean hasnxt(integer off,integer li,integer ps){
        if((off+ps)>2000){
            return true;
        }
        else if((off+ps) < li)
        {
            return false;
        }
        else{
            return true;
        }
    }
    
    @AuraEnabled(cacheable=true)
    public static CommonDataTableController getGenericObjectRecord(String ObjectName,String fieldstoget,Decimal pagesize,boolean next,boolean prev,Decimal off,String sortBy,String sortType)
    {   
        CommonDataTableController pg = new CommonDataTableController();
        Integer offset = (Integer)off;
        Integer psize = (Integer)pagesize;
        
        List<String> lstfieldstoget = fieldstoget.split(',');

        pg.pageSize = psize;
        pg.total =  Database.countQuery('SELECT count() from '+String.escapeSingleQuotes(objectName));
        
        List<LWCTableColumnWrapper> lstTableColumn = new list<LWCTableColumnWrapper> ();        
        DescribeSObjectResult objResult = Schema.getGlobalDescribe().get(ObjectName).getDescribe();
        LWCTableColumnWrapper colWrapper;
        DescribeFieldResult fieldResult;

        for(String field : lstfieldstoget){
            if(objResult.fields.getMap().containsKey(field)){
                colWrapper = new LWCTableColumnWrapper();
                fieldResult = objResult.fields.getMap().get(field).getDescribe();
                colWrapper.label = fieldResult.getLabel();
                colWrapper.fieldName = fieldResult.getName();
                colWrapper.type = String.valueof(fieldResult.getType()).toLowerCase();
                colWrapper.sortable = true;                
                lstTableColumn.add(colWrapper);
            }
        }
        String sortQuery = '';
        if(sortBy!='' && sortType!=''){
            sortQuery = ' Order By '+String.escapeSingleQuotes(sortBy)+' '+String.escapeSingleQuotes(sortType)+' ';
        }
        
        String queryString = '';
		//FIND {test} RETURNING Account(id LIMIT 10 OFFSET 10)
    
        if(next==false && prev==false){            
            queryString = 'Select '+ String.escapeSingleQuotes(String.join(lstfieldstoget,','))+
                ' from '+ String.escapeSingleQuotes(ObjectName) + ' '+sortQuery+' Limit '+psize+' OFFSET '+offset;
        }
        else if(next==true && offset<=pg.total){            
            queryString = 'Select '+ String.escapeSingleQuotes(String.join(lstfieldstoget,','))+
                ' from '+ String.escapeSingleQuotes(ObjectName) + ' '+sortQuery+' Limit '+psize+' OFFSET '+offset;
        }
        else if(prev==true && offset>=0){           
            queryString = 'Select '+ String.escapeSingleQuotes(String.join(lstfieldstoget,','))+
                ' from '+ String.escapeSingleQuotes(ObjectName) + ' '+sortQuery+' Limit '+psize+' OFFSET '+offset;
        }

        System.debug(queryString);
        try{			
            LWCTableWraper LWCTableWrapper = new LWCTableWraper();
            LWCTableWrapper.tableRecord = database.query(queryString);
            LWCTableWrapper.tableColumn = lstTableColumn;
            pg.LWCTabWrap = LWCTableWrapper;
            pg.offst = offset;
            pg.hasprev = hasprevious(offset);   
            pg.hasnext = hasnxt(offset,pg.total,psize);
        }
        catch(Exception e){
            
            System.debug(queryString);
            System.debug(e.getLineNumber()+','+e.getMessage());
        }
        System.debug(queryString);
        
        return pg;
    }
    
    public class LWCTableColumnWrapper {
        @AuraEnabled
        public string label {get;set;}
        @AuraEnabled
        public String fieldName {get;set;}
        @AuraEnabled
        public string type {get;set;}
        @AuraEnabled
        public boolean sortable {get;set;}
        @AuraEnabled 
        public Boolean editable;
    }    
    
    public class LWCTableWraper{
        @AuraEnabled
        public List<sObject> tableRecord {get;Set;}
        @AuraEnabled
        public List<LWCTableColumnWrapper> tableColumn {get;set;}
    }
}