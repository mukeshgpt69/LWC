/* 
@Author: Mukesh Gupta(Girikon)
@CreatedDate: 17/06/2019
@Description: To create a lib in LWC there is no need of html file so removed girikonUtils.html file. 
There is no need to extends LightningElement class. Now creating a simple method to calculate simple interest.
*/


/**
 * Calculate Simple Interest
 * @param princepal Amount to calculate simple interest
 * @param rate Interest rate 
 * @param years Total tearms
 * If these arguments are not supplied, then method will return 0;
 */
const calcualteInterest = (princepal,rate,years) => {    
    if(princepal && years && rate && rate>0){
        return (princepal * rate * years)/100;
    }
    return 0;
};

export {calcualteInterest};
