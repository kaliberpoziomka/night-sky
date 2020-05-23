let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth - 6;
canvas.height = window.innerHeight - 6;

let c = canvas.getContext('2d');

let starSpeed = 0.5;
let smallStarSpeed = 2;
let starRadius = 2;
let starNumber = 500;

let mouse = {
    x: undefined,
    y: undefined,
};

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    starArray = [];
    init();
});

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Big star
function Star(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = (Math.random() - 0.5) * starSpeed;
    this.dy = (Math.random() - 0.5) * starSpeed;
    this.opacity = 1;


    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = `rgba(254, 253, 176, ${this.opacity})`;
        c.fill();
        c.shadowColor = `rgba(253, 252, 174, ${this.opacity})`;
        c.shadowBlur = 3;
        c.shadowColor = `rgba(252, 250, 172, ${this.opacity})`;
        c.shadowBlur = 4;
        c.shadowColor = `rgba(251, 248, 170, ${this.opacity})`;
        c.shadowBlur = 5;
        
    };

    this.disappear = function() {
        this.opacity -= 1;
    };

    this.blow = function() {
        for (let i = 0; i < 20; i++) {
            smallStarsArray.push(new SmallStar(this.x, this.y, this.radius));
        }
    }

    this.update = function() {
        this.draw();
        // bounce from walls
        if (this.x + starRadius * 2 > innerWidth || this.x - starRadius * 2 < 0) {
            this.dx = -this.dx;
        } else if (this.y + starRadius * 2 > innerHeight || this.y - starRadius < 0) {
            this.dy = -this.dy;
        }
        
         // diesappear
         if (mouse.x - this.x < starRadius * 3 && mouse.x - this.x > -starRadius * 3
            && mouse.y - this.y < starRadius * 3 && mouse.y - this.y > -starRadius * 3) {
                this.disappear();
                this.blow();
        }

        this.x += this.dx;
        this.y += this.dy;
    };
};

// small stars
function SmallStar(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = (Math.random() - 0.5) * smallStarSpeed;
    this.dy = (Math.random() - 0.5) * smallStarSpeed;
    this.opacity = 1;
    this.timeToLive = 50;


    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = `rgba(254, 253, 176, ${this.opacity})`;
        c.fill();
        c.shadowColor = `rgba(253, 252, 174, ${this.opacity})`;
        c.shadowBlur = 3;
        c.shadowColor = `rgba(252, 250, 172, ${this.opacity})`;
        c.shadowBlur = 4;
        c.shadowColor = `rgba(251, 248, 170, ${this.opacity})`;
        c.shadowBlur = 5;
    }

    this.update = function() {
        this.draw();
        // bounce from walls
        if (this.x + starRadius * 2 > innerWidth || this.x - starRadius * 2 < 0) {
            this.dx = -this.dx;
        } else if (this.y + starRadius * 2 > innerHeight || this.y - starRadius < 0) {
            this.dy = -this.dy;
        }
        
        this.opacity -= 1 / this.timeToLive;


        this.x += this.dx;
        this.y += this.dy;
    };

}


let starArray = [];
let smallStarsArray = [];

function init() {

    for (let i = 0; i < starNumber; i++) {
        let x = Math.random() * innerWidth;
        let y = Math.random() * innerWidth;
        let randomRadius = Math.random() * 2;



        if (x > innerWidth/2) {
            x -= starRadius *5;
        } else if (x < innerWidth/2) {
            x += starRadius *5
        }

        if (y > innerHeight/2) {
            y -= starRadius *5;
        } else if (y < innerHeight/2) {
            y += starRadius *5
        }
        
        let star = new Star(x, y, randomRadius);
        starArray.push(star);
    };
};


function animate() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    requestAnimationFrame(animate);

    starArray.forEach((item, index) => {
        item.update();
        if (item.opacity == 0) {
            starArray.splice(index, 1);
        }
    });

    smallStarsArray.forEach(item => {
        item.update();
    });
};

init();
animate();
