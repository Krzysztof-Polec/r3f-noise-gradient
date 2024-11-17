import { useRef } from "react"
import StarsContainer from "../StarsContainer/StarsContainer"
import Gradient from "../Gradient/Gradient"

const App = () => {
  const gradientContainerRef = useRef()

  return(
    <div>
      <div ref={gradientContainerRef}>
        <StarsContainer></StarsContainer>
        <Gradient gradientContainerRef={gradientContainerRef}></Gradient>
      </div>
    </div>
  )
}

export default App