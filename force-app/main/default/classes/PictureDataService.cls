public class PictureDataService {
    
    public string ip {get;set;}
    
    @AuraEnabled(cacheable=true)
    public static List<Picture__c> getPictures(String pictureTypeId){
        
        String Query = 'SELECT ID,NAME, NUMBER__c FROM PICTURE__C ';
        if(String.isNotBlank(pictureTypeId)){
            Query += 'where categories__c includes (:pictureTypeId)';
        }
        List<picture__c> pics = Database.query(Query);
       	//List<picture__c> pics = [SELECT ID,NAME, NUMBER__c FROM PICTURE__C where categories__c = :pictureTypeId];
		return pics;
    }
    
    public pageReference getUserIPAddress(){
        // True-Client-IP has the value when the request is coming via the caching integration.
        ip = ApexPages.currentPage().getHeaders().get('True-Client-IP');
        
        // X-Salesforce-SIP has the value when no caching integration or via secure URL.
        if (ip == '' || ip == null) {
            ip = ApexPages.currentPage().getHeaders().get('X-Salesforce-SIP');
        } 
        
        // get IP address when no caching (sandbox, dev, secure urls)        
        if (ip == '' || ip == null) {
            ip = ApexPages.currentPage().getHeaders().get('X-Forwarded-For');
        }
        
        return null;
    }
    
    @AuraEnabled(cacheable=false)
    public static String userData(String pictureTypeId,String UserIP){
        
        User_Event__e userEvent = new User_Event__e(
            App__c='MidJourney Image App',
            UserIP__c=UserIP,
            //LoginType__c=Auth.SessionManagement.getCurrentSession().get('LoginType'),
            Image_Type__c=pictureTypeId);
        // Call method to publish events
        Database.SaveResult sr = EventBus.publish(userEvent);
        // Inspect publishing result
        if (sr.isSuccess()) {
            System.debug('Successfully published event');
        } else {
            for(Database.Error err : sr.getErrors()) {
                System.debug('Error returned: ' +
                             err.getStatusCode() +
                             ' - ' +
                             err.getMessage());
            }
		}
        return 'Success';
    }
    
}