import URLS from 'constants/urls';
import { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, World, Common, Events, Bounds, Body } from 'matter-js'
import IBubble from "../interfaces/IBubble";
import { API } from './requests';

function createEngine(bubbles: IBubble[],
    onUpdateWeight: (bubbleId: number, action: 'up' | 'down') => void) {
    var engine = Engine.create()

    // create renderer
    var render = Render.create({
        element: document.getElementById('matter-container'),
        engine: engine,
        options: {
            width: document.documentElement.clientWidth / 2,
            height: document.documentElement.clientHeight / 2,
            background: 'white',
            wireframes: false,
        },
    })

    // create runner
    var runner = Runner.create()

    Runner.run(runner, engine)
    Render.run(render)

    var world = engine.world
    engine.gravity.scale = 0

    var attractiveBody = Bodies.circle(render.options.width / 2, render.options.height / 2, 0, {
        isStatic: true,
        plugin: {
            attractors: [
                function (bodyA: { position: { x: number; y: number } }, bodyB: { position: { x: number; y: number } }) {
                    return {
                        x: (bodyA.position.x - bodyB.position.x) * 1e-4,
                        y: (bodyA.position.y - bodyB.position.y) * 1e-4,
                    }
                },
            ],
        },
    })

    World.add(world, attractiveBody)

    /* 
    TODO: тут надо пробежаться по скиллам, которые я пришлю (Тупой костыль, но мы к тебе интегрируем питон скрипт, который
        будет генерить эти красные кружки спрайтами и пихать в папку)
    */

    bubbles.map((b) =>
        Bodies.circle(
            Common.random(0, render.options.width),
            Common.random(0, render.options.height),
            40,
            {
                render: {
                    fillStyle: 'red',
                    sprite: {
                        texture: `${API}${URLS.photo(b.circle_id)}`,
                    },
                },
                name: b.name,
                id: b.id,
                mass: 50,
                frictionAir: 0.1,
            }
        )
    ).forEach((b) => {
        World.add(world, b)
    })

    var up = Bodies.rectangle(render.canvas.width / 2, -30, render.canvas.width, 60, {
        isStatic: true,
        label: 'Up',
    })
    var ground = Bodies.rectangle(
        render.canvas.width / 2,
        render.canvas.height + 30,
        render.canvas.width,
        60,
        {
            isStatic: true,
            label: 'Ground',
        }
    )
    var wallLeft = Bodies.rectangle(-30, render.canvas.height / 2, 60, render.canvas.height, {
        isStatic: true,
        label: 'Wall Left',
    })
    var wallRight = Bodies.rectangle(
        render.canvas.width + 30,
        render.canvas.height / 2,
        60,
        render.canvas.height,
        {
            isStatic: true,
            label: 'Wall Right',
        }
    )

    World.add(world, up)
    World.add(world, ground)
    World.add(world, wallLeft)
    World.add(world, wallRight)

    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false,
                },
            },
        })

    World.add(world, mouseConstraint)

    render.mouse = mouse
    Events.on(mouseConstraint, 'mouseup', function (event: { source: any }) {
        var mouseConstraint = event.source
        var bodies = engine.world.bodies
        if (!mouseConstraint.bodyB) {
            for (let i = 0; i < bodies.length; i++) {
                var body = bodies[i]
                if (Bounds.contains(body.bounds, mouseConstraint.mouse.position)) {
                    var id = body.id
                    var bub = bubbles.find(b => b.id === id)
                    // TODO: тут прилетает id, по которому кликнули, соотв. изначально значение 1, тыкнули, 2, потом 3, 4 и
                    // снова 1 и так по кругу

                    var x = body.bounds.max.x - body.bounds.min.x
                    // TODO: тут прилетает
                    if (x > 110) {
                        if (bub) {
                            onUpdateWeight(bub.id, 'down')
                        }
                        let scale = 1 / Math.pow(1.15, 3)
                        Body.scale(body, scale, scale)
                        body.render.sprite.xScale *= scale
                        body.render.sprite.yScale *= scale
                    } else {
                        if (bub) {
                            onUpdateWeight(bub.id, 'up')
                        }
                        Body.scale(body, 1.15, 1.15)
                        body.render.sprite.xScale *= 1.15
                        body.render.sprite.yScale *= 1.15
                    }
                    break
                }
            }
        }
    })
}

export default createEngine