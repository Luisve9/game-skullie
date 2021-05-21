const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");
const button = document.querySelector("button");
let frames = 0;
let requestId;
let bullets = []
let monsters = []
let points = 0
let hb = 5
let hold_key = false
let level = 1
let win = false
const hearth = new Image();
hearth.src = "images/hearth.png"
const game_over = new Image();
game_over.src = "images/gameOver.png"
const you_win = new Image();
you_win.src = "images/youWin.png"
//audio
const audio = new Audio();
audio.src = "music/LuchandoEnElPeligro.ogg"
audio.volume = .05
audio.loop = true

const bossAudio = new Audio();
bossAudio.src = "music/GameOver.ogg"
bossAudio.volume = .05
bossAudio.loop = true

const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 6, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
    [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
    [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
]


// game Logic

class Background {
    constructor(map){
        this.x = 0;
        this.y = 0;
        this.map = map
        this.gravity = .1
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = "images/Fight_Background_test.png";
        
    }

    gravForce(character){
         character.vy += this.gravity
         character.y += character.vy
    }

    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        this.map.forEach((row, index) => {
            row.forEach((cube, position) => {
                switch (cube) {
                    case 1: ctx.fillStyle = "#191970"; ctx.fillRect((position % 1400)*25, (index % 800)*25, 25, 25); break
                    case 2: ctx.fillStyle = "#000000"; ctx.fillRect((position % 1400)*25, (index % 800)*25, 25, 25); break
                    case 3: ctx.fillStyle = "#A52A2A"; ctx.fillRect((position % 1400)*25, (index % 800)*25, 25, 25); break
                    case 4: ctx.fillStyle = "#00008B"; ctx.fillRect((position % 1400)*25, (index % 800)*25, 25, 25); break
                    case 5: ctx.fillStyle = "#FF0000"; ctx.fillRect((position % 1400)*25, (index % 800)*25, 25, 25); break
                    case 6: ctx.drawImage(hearth,(position % 1400)*25, (index % 800)*25, 25, 25); break
                    case 7: ctx.fillStyle = "#FFFAFA"; ctx.font = "bold 25px Georgia"; ctx.fillText(`Puntos: ${points}`, (position % 1400)*25, (index % 800)*25); break
                    case 8: ctx.fillStyle = "#FFFAFA"; ctx.font = "bold 25px Georgia"; ctx.fillText(`Daño crítico: ${skullie.criticalDamage*100}%`, (position % 1400)*25, (index % 800)*25); break
                }
            })
        });
    }

}

class Skullie {
    constructor(){
        this.x = 450
        this.y = 65
        this.width = 50
        this.height = 60
        this.vy = 2
        this.direction = "R"
        this.isGrounded = false
        this.isVulnerable = true
        this.isMoving = false
        this.health = 100
        this.criticalDamage = 0.2
        this.speed = 5
        this.imageR = new Image();
        this.imageR.src = "images/skullieR.png";
        this.imageL = new Image();
        this.imageL.src = "images/skullieL.png";
    }

    draw(){
        if (this.direction === "R") {
            ctx.drawImage(this.imageR,this.x,this.y,this.width,this.height)
            if(this.isMoving) this.x += this.speed
        } else {
            ctx.drawImage(this.imageL,this.x,this.y,this.width,this.height)
            if(this.isMoving) this.x -= this.speed
        }
    }

    takeDamage(){
        if(this.isVulnerable) {
            this.health -= 25
            this.isVulnerable = false
            this.width = 25
            this.height = 30
            setTimeout(() => {
               this.y -= 45
               this.width = 50
               this.height = 60
               this.isVulnerable = true
            }, 3500);
            map[2][hb] = 0
            hb-=1
        }
    }

}

class MonsterBlue {
    constructor(direction){
        this.final = false;
        this.x = canvas.width/2
        this.y = 65
        this.width = 40
        this.height = 50
        this.vy = 2
        this.direction = direction
        this.isGrounded = false
        this.criticalDamage = 0.2
        this.health = 150
        this.speed = 3
        this.imageR = new Image();
        this.imageR.src = "images/monster2R.png";
        this.imageL = new Image();
        this.imageL.src = "images/monster2L.png";
    }

    draw(){
        if (this.direction === "R") {
            ctx.drawImage(this.imageR,this.x,this.y,this.width,this.height)
            this.x += this.speed
        } else {
            ctx.drawImage(this.imageL,this.x,this.y,this.width,this.height)
            this.x -= this.speed
        }
    }

    takeDamage(bullet){
        if(bullet.critical) this.health -= bullet.damage*3
        this.health -= bullet.damage
    }

}

class MonsterRed {
    constructor(direction){
        this.final = false;
        this.x = canvas.width/2
        this.y = 65
        this.width = 40
        this.height = 50
        this.vy = 2
        this.direction = direction
        this.isGrounded = false
        this.criticalDamage = 0.2
        this.health = 100
        this.speed = 1
        this.imageR = new Image();
        this.imageR.src = "images/monster1R.png";
        this.imageL = new Image();
        this.imageL.src = "images/monster1L.png";
    }

    draw(){
        if (this.direction === "R") {
            ctx.drawImage(this.imageR,this.x,this.y,this.width,this.height)
            this.x += this.speed
        } else {
            ctx.drawImage(this.imageL,this.x,this.y,this.width,this.height)
            this.x -= this.speed
        }
    }

    takeDamage(bullet){
        if(bullet.critical) this.health -= bullet.damage*3
        this.health -= bullet.damage
    }
}

class Boss {
    constructor(direction){
        this.final = true;
        this.x = canvas.width/2
        this.y = 65
        this.width = 120
        this.height = 150
        this.vy = 2
        this.direction = direction
        this.isGrounded = false
        this.criticalDamage = 0.2
        this.health = 1500
        this.speed = 3
        this.imageR = new Image();
        this.imageR.src = "images/monster2R.png";
        this.imageL = new Image();
        this.imageL.src = "images/monster2L.png";
    }

    draw(){
        if (this.direction === "R") {
            ctx.drawImage(this.imageR,this.x,this.y,this.width,this.height)
            this.x += this.speed
        } else {
            ctx.drawImage(this.imageL,this.x,this.y,this.width,this.height)
            this.x -= this.speed
        }
    }

    takeDamage(bullet){
        if(bullet.critical) this.health -= bullet.damage*3
        this.health -= bullet.damage
    }

}

class Bullet {
    constructor(shooter, critical, direction) {
        this.width = 20
        this.height = 10
        this.shooter = shooter;
        this.x = this.shooter.x + this.shooter.width + 2
        this.y = this.shooter.y + this.shooter.height/2
        this.type = "N";
        this.speed = 10;
        this.image = new Image();
        this.image.src = "images/bala.png";
        this.critical = critical
        this.damage = 25
        this.direction = direction
    }

    draw(){
        if(this.direction === "R"){
            switch (this.critical) {
                case true: ctx.drawImage(this.image, this.x, this.y, this.width*2, this.height*2); break;
                case false: ctx.drawImage(this.image, this.x, this.y, this.width, this.height); break;
            }
            this.x+=this.speed
        } else {
            switch (this.critical) {
                case true: ctx.drawImage(this.image, this.x - (this.shooter.width + 2), this.y, this.width*2, this.height*2); break;
                case false: ctx.drawImage(this.image, this.x - (this.shooter.width + 2), this.y, this.width, this.height); break;
            }
            this.x-=this.speed
        }
    }


}

//Controls

class Controls {
    constructor(character){
        this.character = character;
    }

    moveLeft(){
        this.character.direction = "L"
        this.character.isMoving = true
    }
    moveRight(){
        this.character.direction = "R"
        this.character.isMoving = true
    }
    Jump(){ 
        if(this.character.isGrounded){ 
            this.character.y -= 7
            this.character.isGrounded === false
            this.character.vy = -4
        }
    }
    shoot(){ 
        if (hold_key) {
            if(frames % 20 === 0) {
                if(Math.random() <= this.character.criticalDamage) bullets.push(new Bullet(this.character, true, this.character.direction))
                bullets.push(new Bullet(this.character, false, this.character.direction))
            }
        } else {
            if(Math.random() <= this.character.criticalDamage) bullets.push(new Bullet(this.character, true, this.character.direction))
            bullets.push(new Bullet(this.character, false, this.character.direction))
        }
    }
}

//construccion

const background = new Background(map)
let skullie = new Skullie()
let controls = new Controls(skullie)

//game mechanics
let applyGravity = (environment, character) => {
    if (false === character.isGrounded) environment.gravForce(character)
    if (environment.map[Math.floor((character.y+character.height)/25)][Math.floor(character.x/25)] === 1) {
        character.isGrounded = true
        character.vy = 2
    } else {character.isGrounded = false} 
}

let handleMapCollision = (map) => {
    bullets.forEach((bullet, index) => {
        if(map[Math.floor((bullet.y)/25)][Math.floor(bullet.x/25)] === 1) {
            bullets.splice(index,1) 
        }
    })
    
    monsters.forEach(monster => {
        if(map[Math.floor((monster.y)/25)][Math.floor(monster.x/25)] === 1) {
            if(monster.direction === "R") {
                monster.direction = "L"
            } else {
                monster.direction = "R"
            }
        }
    })

    if(map[Math.floor((skullie.y)/25)][Math.floor(skullie.x/25)] === 1) {
        if(skullie.direction === "R") {
            skullie.x -= 20
        } else {
            skullie.x += 20
        }
    }
}

let handleMonsterBulletCollision = (monsters, bullets) => {
    bullets.forEach((bullet, number) => {
        monsters.forEach((monster, index) => {
            if(bullet.x < monster.x + monster.width &&
               bullet.x + bullet.width > monster.x &&
               bullet.y < monster.y + monster.height &&
               bullet.y + bullet.height > monster.y) {
                   monster.takeDamage(bullet)
                   bullets.splice(number,1) 
               } 
            if(monster.health <= 0) {
                if(monster.final) win = true
                monsters.splice(index,1)
                points += 1
            }
        })
    })
}

let handleMonsterPlayerCollision = (monsters, player) => {
    monsters.forEach(monster => {
        if(player.x < monster.x + monster.width &&
           player.x + player.width - 25 > monster.x &&
           player.y < monster.y + monster.height &&
           player.y + player.height > monster.y){
               player.takeDamage()
           }
    })
}

let teleport = (player, monsters) => {
    if(map[Math.floor((player.y)/25)][Math.floor(player.x/25)] === 2) {player.x = canvas.width/2; player.y = 65}
    monsters.forEach(monster => {
        if(map[Math.floor((monster.y)/25)][Math.floor(monster.x/25)] === 2) {
            monster.x = canvas.width/2; 
            monster.y = 275
            if(Math.random() <= .5) {
                monster.direction = "R"
            } else {
                monster.direction = "L"
            }
        }
    })
}

let generateMonsterBlue = () => {
    if( !(frames % 220 === 0 )) return

    if(Math.random() <= .5) {
        monsters.push(new MonsterBlue("R"))
    } else {
        monsters.push(new MonsterBlue("L"))
    }
}


let generateMonsterRed = () => {
    if( !(frames % 160 === 0 )) return
    
    if(Math.random() <= .5) {
        monsters.push(new MonsterRed("R"))
    } else {
        monsters.push(new MonsterRed("L"))
    }
}

let resetGame = () => {
    //ctx.drawImage(game_over, 350, 100, 700, 600)
    requestId = undefined
    frames = 1;
    requestId;
    //reset initial values
    bullets = []
    monsters = []
    points = 0
    hb = 5
    map[2][2] = 5
    map[2][3] = 5
    map[2][4] = 5
    map[2][5] = 5
    skullie = new Skullie()
    controls = new Controls(skullie)
    button.disabled = false
    button.onclick = start
    audio.currentTime= 0
    bossAudio.currentTime= 0
}

let handleBossMovement = (boss) => {
    //jump
    if(Math.random() <= .5 && boss.isGrounded){
        boss.y -= 7
        boss.isGrounded === false
        boss.vy = -3
    }
    
    //Change Direction
    if(Math.random() <= .5){
        switch(boss.direction){
            case "R": boss.direction = "L"; break;
            case "L": boss.direction = "R"; break;
        }
    }


}

// Level transition
let goToLevelTwo = () => {
    if(points === 10){
        monsters = []
        monsters.push(new Boss("R"))
        points += 1
        audio.pause()
        bossAudio.play()
    }
}

//game runner

function start (){
    button.disabled = true
    requestId = requestAnimationFrame (update)
    console.log("me ejecuto" + requestId)
    audio.play()
}
//Level 1
function update(){
    frames ++
    ctx.clearRect(0,0,canvas.width,canvas.height);

    background.draw()
    if(skullie.health <= 0) {
        ctx.drawImage(game_over, 350, 100, 700, 600)
        audio.pause()
        bossAudio.pause()
        resetGame()
    }
    if(win) {
        ctx.drawImage(you_win, 350, 100, 750, 600)
        audio.pause()
        bossAudio.pause()
        resetGame()
        win = false
    }
    applyGravity(background, skullie)
    teleport(skullie, monsters)
    handleMonsterPlayerCollision(monsters, skullie)
    skullie.draw()
    handleMapCollision(map)
    handleMonsterBulletCollision(monsters, bullets)
    bullets.forEach(bullet => bullet.draw())

    if(monsters.length <= 10) {
        generateMonsterRed()
        generateMonsterBlue()
    }

    monsters.forEach(monster => {
        applyGravity(background, monster)
        monster.draw()
    })
    if(points>=11 && frames % 180 === 0)handleBossMovement(monsters[0])

    goToLevelTwo()
    
    if(requestId){
        requestId = requestAnimationFrame(update)
    }
}


// Key reader
document.onkeydown = (event)=>{
    switch(event.keyCode){
        case 37: controls.moveLeft(); break;
        case 39: controls.moveRight(); break;
        case 32: controls.Jump(); break;
        case 83: controls.shoot(); hold_key = true; break;
    }
}

document.onkeyup = (event)=>{
    if(event.keyCode === 39 || event.keyCode === 37){
        skullie.isMoving = false
    }
    if(event.keyCode === 83){
        hold_key = false;
   }
}

button.onclick = start