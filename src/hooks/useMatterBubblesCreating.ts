import { IBubble } from "interfaces"
import React, { useEffect } from "react"
import { Render, World, Runner, Bodies, Composite, Mouse, MouseConstraint } from 'matter-js'
import useMatterEngine from "./useMatterEngine";

function useMatterBubblesCreating(box: HTMLElement, canvas: HTMLCanvasElement, bubbles: IBubble[]) {
    const engine = useMatterEngine()
    const circles = bubbles.map(b => Bodies.circle(0, 0, b.radius))
    useEffect(() => {
        Composite.add(engine.world, circles)
        const render = Render.create({
            element: box,
            engine: engine,
            canvas: canvas,
            options: {}
        })
        const mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.05,
                    render: {
                        visible: false,
                    },
                },
            })

        World.add(engine.world, circles);
        Composite.add(engine.world, mouseConstraint)
        Runner.run(engine);
        Render.run(render);
    }, [])

    return engine
}

export default useMatterBubblesCreating