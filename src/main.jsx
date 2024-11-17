import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./components/App/App"
import "./globalStyles/globalStyles.scss"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App></App>
  </StrictMode>
)