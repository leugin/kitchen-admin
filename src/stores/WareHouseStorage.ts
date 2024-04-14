import { defineStore } from 'pinia'
import loader from "@/utils/loader";
import pagination from "@/utils/pagination";
import Paginator from "@/utils/Paginator";
import {Warehouse} from "@/service/Warehouse";
export default  defineStore('WarehouseStorage',{
  state: () => ({
    ...loader.state(),
    ...pagination.state(),
    filters: {
      status:{value:null},
      search:{value:null},
      label:{value:null},
      updated:{value:null},
    }
  }),
  getters:{
    ...loader.getters,
  },
  actions: {
    ...loader.actions,
    ...pagination.actions,
    async find(params = {}) {
      this.pagination.order_by =  this.pagination.order_by == 'id' ? 'ingredient_id': this.pagination.order_by;
      this.increments()
      const query = {
        ...params,
        ...this.pagination,
        ...Paginator.forRequest({...this.filters})
      }
      const response  = await Warehouse.paginate(query);
      if (response.data) {
        this.data = response.data.data.map((val:any ) => {
          val.updated = new Date(val.updated);
          return val;
        });
        this.paginate = response.data.paginate;
      }
      this.decrement()
      return response;

    },
    async onFilter(event: any) {
      Object.assign(this.filters, event.filters)
      this.pagination.page = 1
      await this.find();
    }
  }
})
