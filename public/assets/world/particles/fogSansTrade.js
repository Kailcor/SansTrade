var FogParticles = {
    "active": true,
    "visible": true,
    "collideBottom": true,
    "collideLeft": true,
    "collideRight": true,
    "collideTop": true,
    "on": true,
    "particleBringToTop": true,
    "radial": false,
    "frame": "smoke_01",

    "frequency": 60,
    "gravityX": 10,
    "gravityY": 10,
    "maxParticles": 50,
    "timeScale": 1,
    "blendMode": 1,
    "accelerationX": {
        "ease": "Quad.easeInOut",
        "min": 3,
        "max": -5
    },
    "accelerationY": {
        "ease": "Sine.easeInOut",
        "min": 0,
        "max": -10
    },
    "alpha": {
        "start": 0.8,
        "end": 0.8,
        "ease": "Quad.easeInOut"
    },
    "angle": {
        "min": -10,
        "max": 100,
        "ease": "Circ.easeInOut"
    },
    "bounce": 0,
    "delay": 0,
    "lifespan": {
        "ease": "Quad.easeInOut",
        "min": 8000,
        "max": 25980
    },
    "maxVelocityX": 10000,
    "maxVelocityY": 10000,
    "moveToX": 0,
    "moveToY": 0,
    "quantity": 10,
    "rotate": 0,
    "scale": {
        "start": 5.1,
        "end": 9,
        "ease": "Sine.easeInOut"
    },
    "speed": 10,
    "x": [
      -500,
      -300,
      -100
    ],
    "y": [
        -150,
        -100,
        400
    ],
    "tint": [
        1432028,
        1000000
    ]
};

export default FogParticles;
