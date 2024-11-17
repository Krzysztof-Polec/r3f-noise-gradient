import { useEffect } from "react"
import * as THREE from "three"
import { Canvas, extend } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"
import { ShaderPass, EffectComposer, RenderPass } from "three-stdlib"
import GradientPlane from "../GradientPlane/GradientPlane"
import GradientEffects from "../GradientEffects/GradientEffects"
import gradientVertex from "../../shader/gradientVertex.glsl"
import gradientFragment from "../../shader/gradientFragment.glsl"

const CustomShaderMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector4(),
    progress: 0,
  },
  gradientVertex,
  gradientFragment
)

extend({ CustomShaderMaterial, EffectComposer, ShaderPass, RenderPass })

const Gradient = ({ gradientContainerRef }) => {
  useEffect(() => {
    const handleResize = () => {
      if(gradientContainerRef.current){
        gradientContainerRef.current.style.width = `${window.innerWidth}px`
        gradientContainerRef.current.style.height = `${window.innerHeight}px`
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return(
    <Canvas
      camera={{
        position: [0, 0, 1.2],
        fov: 70,
        near: 0.001,
        far: 1000,
      }}
      style={{position: "absolute", top: 0}}
    >
      <GradientPlane></GradientPlane>
      <GradientEffects></GradientEffects>
    </Canvas>
  )
}

export default Gradient