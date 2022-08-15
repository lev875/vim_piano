import Keyboard from "./Keyboard/Keyboard"
import Settings from "./Settings/Settings"
import Footer from "./Footer/Footer"
import { Fragment } from "react"

function App() {
  return <Fragment>
    <div style={{ flexGrow: 1 }}>
      <Keyboard/>
      <Settings/>
    </div>
    <Footer/>
  </Fragment>
}

export default App
