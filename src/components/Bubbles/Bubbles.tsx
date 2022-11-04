import React, { useEffect, useRef } from 'react'
import Matter from "matter-js";
import { useMatterBubblesCreating, useMatterEngine } from 'hooks';
import { Engine, Render, World, Runner, Bodies, Composite, Mouse, MouseConstraint } from 'matter-js'
import "./Bubbles.scss"

const Bubbles = () => {
    const box = useRef<HTMLElement>()
    const canvas = useRef()
    const engine = useMatterBubblesCreating(
        box.current,
        canvas.current,
        [{ radius: 20, color: '#dd2222', label: 'iggy pop' }]
    )

    return (
        <div className='bubbles' ref={box}>
            <canvas ref={canvas} />
        </div>
    )
}

export default Bubbles