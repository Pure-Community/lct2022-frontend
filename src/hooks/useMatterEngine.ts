import { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } from 'matter-js'

function useMatterEngine() {
    const engine = Engine.create({})
    engine.world.gravity.y = 0
    return engine
}

export default useMatterEngine