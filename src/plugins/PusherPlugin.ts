import Pusher from 'pusher-js';
import type {App} from "vue";
const vitepusherkey = import.meta.env.VITE_PUSHER_KEY


Pusher.log = function(msg) {
    console.log(msg);
};
const instance = new Pusher(vitepusherkey, {
    cluster: 'us2',
    wsPort: 80,
    forceTLS: false,
    disableStats:true,
    enabledTransports: ['ws', 'wss']
})
export default  {
    install(app:App) {
        app.provide('pusher', instance)
    }
}
