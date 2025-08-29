import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {Quasar} from "quasar";
import quasarIconSet from 'quasar/icon-set/material-icons'
import 'quasar/src/css/index.sass' // estilos principais
import '@quasar/extras/material-icons/material-icons.css'
import router from "./routers"; // ícones
import 'gridstack/dist/gridstack.min.css'



// createApp(App).mount('#app').$nextTick(() => {
//   // Use contextBridge
//   window.ipcRenderer.on('main-process-message', (_event, message) => {
//     console.log(message)
//   })
// })

const app = createApp(App)

app.use(Quasar, {
  plugins: {}, // Adicione Notify, Dialog, etc. se quiser
  iconSet: quasarIconSet
}).use(router)

app.mount('#app').$nextTick(() => {
  // Comunicação com Electron (se estiver usando Electron)
  window.ipcRenderer?.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
