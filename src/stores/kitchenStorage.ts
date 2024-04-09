import { defineStore } from 'pinia'
import {Kitchen} from "@/service/Kitchen";
import loader from "@/utils/loader";
import pagination from "@/utils/pagination";
import Paginator from "@/utils/Paginator";
export default  defineStore('kitchenStorage',{
  state: () => ({
    ...loader.state(),
    ...pagination.state(),
    filters: {
      status:{value:null},
      search:{value:null},
      label:{value:null},
      created:{value:null}
    }
  }),
  getters:{
    ...loader.getters,
  },
  actions: {
    ...loader.actions,
    ...pagination.actions,
    async find(params = {}) {
      this.increments()
      const query = {
        ...params,
        ...this.pagination,
        ...Paginator.forRequest({...this.filters})
      }
      const response  = await Kitchen.paginate(query);
      if (response.data) {
        this.data = response.data.data.map((val:any ) => {
          val.created = new Date(val.created);
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
    },
    async onSort(event: any) {
      this.pagination.order_by = event.sortField
      this.pagination.order_direction = event.sortOrder === -1?'desc':'asc'
      if (this.pagination.order_by === 'created') {
        this.pagination.order_by = 'created_at'
      }
      await  this.find()
    },
    async create(quantity: number) {
      this.increments()
      const response = await Kitchen.create(quantity)
      this.find();
      this.decrement()
      return response;
    }
  }
})
