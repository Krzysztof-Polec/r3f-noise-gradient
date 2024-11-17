import { useRef, useEffect, memo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { ShaderPass, EffectComposer, RenderPass } from "three-stdlib"
import { CustomShader } from "../../utils/CustomShader"

const GradientEffects = memo(() => {
  const { gl, scene, camera, size } = useThree()
  const composer = useRef()

  useEffect(() => {
    const composerInstance = new EffectComposer(gl)
    composerInstance.addPass(new RenderPass(scene, camera))

    const effect1 = new ShaderPass(CustomShader)
    effect1.uniforms["scale"].value = 4
    composerInstance.addPass(effect1)

    composer.current = composerInstance

    return () => composerInstance.dispose()
  }, [gl])

  useEffect(() => {
    if(composer.current){
      composer.current.setSize(size.width, size.height)
    }
  }, [size])

  useFrame(() => {
    if(composer.current){
      composer.current.render()
    }
  }, 1)

  return null
})

export default GradientEffects