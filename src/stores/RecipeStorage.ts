import { defineStore } from 'pinia'
import loader from "@/utils/loader";
import pagination from "@/utils/pagination";
import Paginator from "@/utils/Paginator";
import Recipes from "@/service/Recipes";
export default  defineStore('RecipeStorage',{
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
    async find(params = {}): Promise<any>{
      this.increments()
      const query = {
        ...params,
        ...this.pagination,
        ...Paginator.forRequest({...this.filters})
      }
      const response  = await Recipes.paginate(query);
      if (response.data) {
        this.data = response.data.data;
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
