import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faArrowRightFromBracket, faDiagramNext, faPlus, faChevronUp, faChevronRight, faChevronDown, faChevronLeft, 
  faGripLines, faArrowDown, faGhost, faCameraRetro, faRotateLeft, faHeadset, faXmark } from "@fortawesome/free-solid-svg-icons"

import { faThumbsUp, faHand, faTrashCan, faPenToSquare, faShareFromSquare, faFileLines, faIdBadge } from "@fortawesome/free-regular-svg-icons"

library.add(
  faArrowRightFromBracket,
  faDiagramNext,
  faPlus,
  faChevronUp,
  faChevronRight,
  faChevronDown,
  faChevronLeft,
  faGripLines,
  faArrowDown,
  faGhost,
  faCameraRetro,
  faRotateLeft,
  faHeadset,
  faThumbsUp,
  faHand,
  faTrashCan, 
  faPenToSquare,
  faXmark, 
  faShareFromSquare,
  faFileLines,
  faIdBadge
)

import "./assets/main.css"


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount("#app")
