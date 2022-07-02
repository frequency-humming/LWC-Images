public class PictureDataService {
    
    @AuraEnabled(cacheable=true)
    public static List<Picture__c> getPictures(String pictureTypeId){
       	List<picture__c> pics = [SELECT ID,NAME, NUMBER__c FROM PICTURE__C];
		return pics; 
    }
    
}