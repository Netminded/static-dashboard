import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { faDiagramNext } from "@fortawesome/free-solid-svg-icons"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { faGripLines } from "@fortawesome/free-solid-svg-icons"
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import { faGhost } from "@fortawesome/free-solid-svg-icons"
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons"
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { faHand } from "@fortawesome/free-regular-svg-icons"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
library.add(
  faArrowRightFromBracket,
  faDiagramNext,
  faPlus,
  faChevronUp,
  faChevronDown,
  faGripLines,
  faArrowDown,
  faGhost,
  faCameraRetro,
  faRotateLeft,
  faHand,
  faTrashCan
);

import "./assets/main.css"


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount("#app")
