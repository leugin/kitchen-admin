
export default  {
    state: () => ({
        queueCount:0
    }),
    getters: {
        isLoading: (state:any) => state.queueCount > 0,
    },
    actions: {
        increments() {
            this.queueCount++;
        },
        decrement() {
            this.queueCount--;
        },
    }
}