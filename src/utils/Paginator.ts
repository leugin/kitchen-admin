import DateTransform from "@/utils/DateTransform";

export default class Paginator {

    static forRequest(filters:any) {
        const fil: any = {};
        Object.keys(filters).map((k:string)=> {
            if (filters[k] && filters[k].value) {
                if (DateTransform.isDateRange(filters[k].value)){
                    fil[k + '_range'] = DateTransform.formatOutRange(filters[k].value)
                    delete fil[k];
                } else {
                    fil[k]= filters[k].value
                }
            }else {
                delete filters[k]
            }
        })
        return fil
    }
}