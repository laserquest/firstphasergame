/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

var platforms;
var player;
var cursors;
var stars;
var scoreText;
var score;

function preload() {
    game.load.image('sky', 'assets/fire.jpg');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

function create() {
    game.add.sprite(0, 0, 'sky');



    platforms = game.add.group();
    platforms.enableBody = true;


    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);

    player.body.bounce.y = 0.25;
    player.body.gravity.y = 100;
    player.body.collideWorldBounds = true;
    player.animations.add('left' [0, 1, 2, 3], 10, true);
    player.animations.add('right' [5, 6, 7, 8], 10, true);

    var ledge = platforms.create(-200, 340, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(437, 290, 'ground');
    ledge.body.immovable = true;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();
    
    stars = game.add.group();
    
    stars.enableBody = true;
    
    //Here we'll creat 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');
        
        //Let gravity do its thing
        star.body.gravity.y = 6;
        
        //This just gives each star a slighty random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
         game.physics.arcade.collide(star, platforms);

    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000'});
}


function update() {
    var hitPlatform = game.physics.arcade.collide(player, platforms);

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else {
        player.animations.stop();

        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -250;
    }
    game.physics.arcade.collide(stars, platforms);
    
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    
    scoreText.text = "score: " + score;
}

function collectStar (player, star) {
    star.kill();
    score += 1;
}