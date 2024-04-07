export class Time {
    static async pause(time:number): Promise<boolean> {
        return  new Promise(async  (resolve, reject)=> {
            setInterval(()=> {
                resolve(true);
            }, time)
        })
    }
}