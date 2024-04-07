
export default  {
    state: () => ({
        data:[],
        paginate:{
            current_page:1,
            from:1,
            last_page:1,
            per_page:15,
            to:0,
            total:0
        },
        pagination:{
            page:1,
            per_page:15,
            order_by:'id',
            order_direction:'desc'
        }
    }),
    actions: {
        async onPage(event: any) {
            this.pagination.page = event.page + 1
            this.pagination.per_page = event.rows
            await this.find()
        },
        async onSort(event: any) {
            this.pagination.order_by = event.sortField
            this.pagination.order_direction = event.sortOrder === -1?'desc':'asc'
            await  this.find()
        },
    }
}