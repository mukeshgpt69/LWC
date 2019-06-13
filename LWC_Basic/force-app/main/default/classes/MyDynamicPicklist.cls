global class MyDynamicPicklist extends VisualEditor.DynamicPickList{
    
    global override VisualEditor.DataRow getDefaultValue(){
        VisualEditor.DataRow defaultValue = new VisualEditor.DataRow('Account', 'Account');
        return defaultValue;
    }
    global override VisualEditor.DynamicPickListRows getValues() {        
        VisualEditor.DynamicPickListRows  objList = new VisualEditor.DynamicPickListRows();        
        List<ObjectPermissions> lstObjects = new List<ObjectPermissions>();
        lstObjects = [SELECT Id, SObjectType, PermissionsRead, Parent.label, Parent.IsOwnedByProfile FROM ObjectPermissions WHERE (ParentId IN (SELECT PermissionSetId FROM PermissionSetAssignment WHERE Assignee.id =: UserInfo.getUserId())) AND (PermissionsRead = true)];
        if(lstObjects.size() > 0){
            for(ObjectPermissions objIntance : lstObjects){
                String sObjName = objIntance.SObjectType;
                objList.addRow(new VisualEditor.DataRow(sObjName,sObjName));
            }
        }
        return objList;
    }
}
