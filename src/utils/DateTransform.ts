export default class DateTransform {

  static formatInputDate = (value:Date) =>{
        const day = ('0' + value.getDate()).slice(-2);
        const month = ('0' +(value.getMonth() + 1)).slice(-2);
        const year = value.getFullYear();
        return   `${day}/${month}/${year}`;
    }

  static formatOutDate = (value:Date) =>{
        const day = ('0' + value.getDate()).slice(-2);
        const month = ('0' +(value.getMonth() + 1)).slice(-2);
        const year = value.getFullYear();
        return   `${year}-${month}-${day}`;
    }
  static formatOutRange = (value:Date[]) => {
        return DateTransform.formatOutDate(value[0]) + ':' + DateTransform.formatOutDate(value[1]);
    }

  static isDateRange = (value:Date[]) => {
        return value.length > 1 && value[0] instanceof Date
    }
}