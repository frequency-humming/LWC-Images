public class PictureDataService {
    
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
    
}