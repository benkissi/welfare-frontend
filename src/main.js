import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Sidebar from "primevue/sidebar";
import Menubar from "primevue/menubar";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Password from "primevue/password";
import Card from "primevue/card";
import Steps from "primevue/steps";
import FileUpload from "primevue/fileupload";
import Textarea from "primevue/textarea";
import Divider from "primevue/divider";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';

import App from "./App.vue";
import setupAxiosInterceptors from "./utils/axiosUtil";
import router from "./router";

import "./assets/main.css";
import "./index.css";

const pinia = createPinia();
const app = createApp(App);

pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(VueTelInput);

app.component("PDialog", Dialog);
app.component("PSidebar", Sidebar);
app.component("PMenubar", Menubar);
app.component("PInputText", InputText);
app.component("PButton", Button);
app.component("PPassword", Password);
app.component("PCard", Card);
app.component("PSteps", Steps);
app.component("PFileUpload", FileUpload);
app.component("PTextarea", Textarea);
app.component("PDivider", Divider);
app.component("PToast", Toast);

setupAxiosInterceptors();

app.mount("#app");
