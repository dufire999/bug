class Boats{
    constructor(x, y, width, height, boatsPos){
        this.body = Bodies.rectangle(x,y, width, height);
        this.width = width;
        this.height = height;
        this.image = loadImage("assets/boat.png");
        this.boatsPosition = boatsPos;
        World.add(world,this.body); 
    }

    remove(index){
        setTimeout(() =>{
            Matter.World.remove(world,boats[index].body);
            delete boats[index]
        }, 2000);
    }

    show(){
        var angle = this.body.angle;
        var pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0,this.boatsPosition,this.width,this.height);
        pop();
    }
}