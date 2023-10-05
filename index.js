class Layer{
    constructor(width,height){
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.w = this.canvas.width = width
        this.h = this.canvas.height = height
    }
    drawCircle(x,y,r,color='black', stroke = false){
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.arc(x,y,r,0,Math.PI*2)
        this.ctx.fillStyle = color
        stroke ? this.ctx.stroke(): this.ctx.fill()
        this.ctx.closePath()
        this.ctx.restore()
    }
    drawText(text,x,y, font = "10px serif"){
        this.ctx.save()
        this.ctx.font = font;
        this.ctx.fillText(text, x, y);
        this.ctx.restore()
    }
}

class SpaceObject {
    constructor(layer, {radius, period, color, distance, name}){
        this.radius = radius
        this.period = period
        this.layer = layer
        this.color = color
        this.distance = distance
        this.name = name
        this.angle = 0
        this.year = 0
    }
    draw(){       

        this.move()
        
        this.layer.drawCircle(this.layer.w/2,this.layer.h/2, this.distance, 'black', true)
        
        this.layer.drawCircle(this.x,this.y,this.radius, this.color)
        
        if(this.angle >= Math.PI * 2){
            this.angle = 0
            this.year++
        }

        this.layer.drawText(this.year, this.x, this.y + this.radius + 10)
        
        if(this.name) this.layer.drawText(this.name, this.x - this.radius, this.y + this.radius - 30)

    }
    move(){
        this.x = (Math.cos(this.angle) * this.distance) + this.layer.w/2
        this.y = (Math.sin(this.angle) * this.distance) + this.layer.h/2
        this.angle += (365/this.period) / 1000 * 6
    }
}

class Planet extends SpaceObject{
    constructor(layer, {radius, period, color, distance, name}){
        super(layer, {radius, period, color, distance, name})
    }
}

class Star extends SpaceObject{
    constructor(layer, {radius, period, color, distance, name}){
        super(layer, {radius, period, color, distance, name})
    }
}

const w = window.innerWidth
const h = window.innerHeight
const layer = new Layer(w,h)

let objects = [
    new Star(layer, {radius: 20, period: 0, color: 'yellow', distance: 0, name: "sun"}),
    new Planet(layer, {radius: 10, period: 88, color: 'gray', distance: 50, name: "mercury"}),
    new Planet(layer, {radius: 10, period: 225, color: 'orange', distance: 100, name: "venus"}),
    new Planet(layer, {radius: 10, period: 365, color: 'blue', distance: 150, name: "earth"}),
    new Planet(layer, {radius: 10, period: 687, color: 'red', distance: 200, name: "mars"}),
    new Planet(layer, {radius: 10, period: 4333, color: 'red', distance: 250, name: "jupiter"}),
    new Planet(layer, {radius: 10, period: 10585, color: 'brown', distance: 300, name: "saturn"}),
    new Planet(layer, {radius: 10, period: 30660, color: 'blue', distance: 350, name: "uranus"}),
    new Planet(layer, {radius: 10, period: 60225, color: 'red', distance: 400, name: "neptune"}),
    new Planet(layer, {radius: 10, period: 90553, color: 'green', distance: 450, name: "pluto"}),
]


let init = () => {
    layer.ctx.clearRect(0,0,window.innerWidth, window.innerWidth)

    objects.map(object => {
        object.draw()
    })

    requestAnimationFrame(init)
}

requestAnimationFrame(init)