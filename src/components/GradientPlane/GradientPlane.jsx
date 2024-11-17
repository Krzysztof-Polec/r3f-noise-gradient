import { useState, useEffect, useRef, memo } from "react"
import { useFrame, useThree } from "@react-three/fiber"

const GradientPlane = memo(() => {
  const materialRef = useRef()
  const [geometryArgs, setGeometryArgs] = useState([1, 1])
  const speed = 0.25

  const { viewport } = useThree()

  useEffect(() => {
    setGeometryArgs([viewport.width, viewport.height])
  }, [viewport.width, viewport.height])

  useFrame((state) => {
    if(materialRef.current){
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime() * speed
    }
  })

  return(
    <mesh>
      <planeGeometry args={geometryArgs}/>
      <customShaderMaterial ref={materialRef} />
    </mesh>
  )
})

export default GradientPlane