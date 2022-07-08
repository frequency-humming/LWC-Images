public class PictureDataService {
    
    public static String temp;
    
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
    
    @AuraEnabled(cacheable=false)
    public static String userData(String pictureTypeId){
        User_Event__e userEvent = new User_Event__e(
            App__c='MidJourney Image App',
            Image_Type__c=pictureTypeId);
        // Call method to publish events
        Database.SaveResult sr = EventBus.publish(userEvent);
        // Inspect publishing result
        if (sr.isSuccess()) {
            System.debug('Successfully published event. ' +sr);
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