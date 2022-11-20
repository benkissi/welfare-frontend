import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Sidebar from "primevue/sidebar";
import Menubar from "primevue/menubar";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import Password from "primevue/password";
import Card from "primevue/card";
import Steps from "primevue/steps";
import FileUpload from "primevue/fileupload";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import Divider from "primevue/divider";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Calendar from "primevue/calendar";
import ProgressSpinner from "primevue/progressspinner";
import VueTelInput from "vue-tel-input";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import TabMenu from "primevue/tabmenu";
import Chip from "primevue/chip";
import Tooltip from "primevue/tooltip";
import InputSwitch from "primevue/inputswitch";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Chart from "primevue/chart";
import "vue-tel-input/dist/vue-tel-input.css";

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

app.component("PDataTable", DataTable);
app.component("PColumn", Column);
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
app.component("PInputNumber", InputNumber);
app.component("PDropdown", Dropdown);
app.component("PCalendar", Calendar);
app.component("PTabMenu", TabMenu);
app.component("PChip", Chip);
app.component("PSpinner", ProgressSpinner);
app.component("PInputSwitch", InputSwitch);
app.component("PAccordion", Accordion);
app.component("PAccordionTab", AccordionTab);
app.component("PChart", Chart);

setupAxiosInterceptors();

app.mount("#app");

app.directive("tooltip", Tooltip);
