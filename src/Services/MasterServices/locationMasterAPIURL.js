import {ProIp, BaseIp} from '../APIURL';


//getMapping => get country Record
//http://localhost:8088/ptskvs/master/country/getCountryMaster
export const getCountryMasterApi=ProIp+"master/country/getCountryMaster";

//getMapping => get State Record
//http://localhost:8088/ptskvs/master/state/getStateMaster/ country id
export const getStateMasterApi=ProIp+"master/state/getStateMaster/";


//getMapping => get City Record
//http://localhost:8088/ptskvs/master/city/getCityMaster/1
export const getCityMasterApi=ProIp+"master/city/getCityMaster/";


