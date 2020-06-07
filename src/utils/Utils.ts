import LocalNetworkBaseURL from './baseURL';
class Utils {
   
    static serialize(objs:any[]): any[] {
        return objs.map( (obj: any) => {
            return {
                ...obj,
                image_url: `${LocalNetworkBaseURL}${obj.image}`
            };
        });
    }    
}

export default Utils;
