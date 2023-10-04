class Layer{
    constructor(width,height){
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.w = this.canvas.width = width
        this.h = this.canvas.height = height
    }
    drawCircle(x,y,r,color='black'){
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.arc(x,y,r,0,Math.PI*2)
        this.ctx.fillStyle = color
        this.ctx.fill()
        this.ctx.closePath()
        this.ctx.restore()
    }
    drawText(text,x,y){
        this.ctx.font = "10px serif";
        this.ctx.fillText(text, x, y);
    }
}

class SpaceObject{
    constructor(layer, {radius, period, color, distance}){
        this.radius = radius
        this.period = period
        this.layer = layer
        this.color = color
        this.distance = distance
        this.angle = 0
        this.year = 0
    }
    draw(){
        let x = (Math.cos(this.angle) * this.distance) + this.layer.w/2
        let y = (Math.sin(this.angle) * this.distance) + this.layer.h/2
        layer.drawCircle(x,y,this.radius, this.color)
        this.angle += this.period / 60
        if(this.angle >= Math.PI * 2){
            this.angle = 0
            this.year++
        }
        this.layer.drawText(this.year, x, y + this.radius + 20)
    }
}

class Planet extends SpaceObject{
    constructor(layer, {radius, period, color, distance}){
        super(layer, {radius, period, color, distance})
    }
}

class Star extends SpaceObject{
    constructor(layer, {radius, period, color, distance}){
        super(layer, {radius, period, color, distance})
    }
}

const w = window.innerWidth
const h = window.innerHeight
const layer = new Layer(w,h)

const sun = new Star(layer, {radius: 20, period: 0, color: 'yellow', distance: 0})
const mercury = new Planet(layer, {radius: 4, period: 365/88, color: 'gray', distance: 50})
const venus = new Planet(layer, {radius: 4, period: 365/225, color: 'orange', distance: 100})
const earth = new Planet(layer, {radius: 8, period: 1, color: 'blue', distance: 150})
const mars = new Planet(layer, {radius: 4, period: 365/687, color: 'red', distance: 200})
const jupiter = new Planet(layer, {radius: 10, period: 365/4333, color: 'red', distance: 300})
const saturn = new Planet(layer, {radius: 15, period: 365/10585, color: 'brown', distance: 400})
const uranus = new Planet(layer, {radius: 10, period: 365/30660, color: 'blue', distance: 450})
const neptune = new Planet(layer, {radius: 10, period: 365/60225, color: 'red', distance: 550})
const pluto = new Planet(layer, {radius: 10, period: 365/90552.85, color: 'green', distance: 600})


let init = () => {
    layer.ctx.clearRect(0,0,window.innerWidth, window.innerWidth)
    sun.draw()
    earth.draw()
    mercury.draw()
    venus.draw()
    mars.draw()
    jupiter.draw()
    saturn.draw()
    uranus.draw()
    neptune.draw()
    pluto.draw()
    requestAnimationFrame(init)
}

requestAnimationFrame(init)

//149 * 10 9
//58 000 000