/*
TOWERS OF HANOI
https://en.wikipedia.org/wiki/Tower_of_Hanoi

French logic puzzle involving 3 towers and N disks of variable size. the goal is to move all disks from the first post to the third post. Disks can only be moved from post to post one at a time and a disk must be smaller than another if it would be placed on top.

*/

// peek at the top disk of an array and check how large for purposes of comparison. if an array is empty, consider it to have an incredible large top disk
function peek(array){
  if (array.length > 0){ console.log(array[array.length-1]);
    return array[array.length-1].size;}
  else
    return 100000; // arbitrarily large number
}

// this function creates a new game board
function board(disks=5, width=300, height=200) {
  this.disks = disks; //disks in this game
  this.width = width; //width of the canvas
  this.height = height; //height of the canvas
  this.status = "pick"; 
  // the game has two states to handle user input: pick (a player needs to select a tower to take a disk from) and place (where they are putting the disk)
  this.select = null;//stores which towet the player is removing a disk from
  
  this.towers =  [[], [], []]; // create arrays to represent the 3 towers
  for (var i = disks; i > 0; i--)
    {
      this.towers[0].push( new disk(i, this))// place all disks in their starting placy
    }
  
  // move a disk from one tower to another and change x and y position
  this.move = function(source, destination){
    var disk = this.towers[source].pop()
    this.towers[destination].push(disk);
    disk.x = this.width/6 * (1+2*destination);
    disk.y = this.height - ((this.towers[destination].length -1)*20) - 10;
    console.log(this.towers);
  }
  
  
  this.draw = function(){
    for(var i = 0; i < 3; i++){ //for each tower
    fill("brown");
      rect(this.width/6 * (1+2*i), this.height, 20, this.height); //draw it in the center of its third of the canvas
      // for each disk in a tower, draw that disk
      this.towers[i].forEach(function(disk){disk.draw()});
      
      // if the player has select a tower to pick from, mark it
      if (this.status === "place" && i === this.select){
        fill("blue"); // for 
        circle(this.width/6 * (1+2*i), 30, 20);
    }
    }
  }
  // this function checks if the puzzle has been solved
  this.win = function() {
    return (this.disks === this.towers[2].length);
  }
  
  return this;
}

//this function creates a new disk
function disk(size, board){
  this.size = size;
  this.color = 255/size; // disks will have different color
  
  // these are the starting positions of the disks on the first tower
  this.x = board.width/6;
  this.y = board.height - ((board.disks - this.size)*20) - 10;

  this.draw = function(){
    // color and draw a disk based on its color, x, and y values
    fill(this.color, 0, 255-this.color);
    rect(this.x, this.y, size*15, 20)
  }
  return this
}


let game = new board(); //create a game board
function mouseClicked(){
  // if the game is in the pick state, use the mouse position to select a tower and mark it. if the tower is empty, don't mark it
  if (game.status === "pick") 
    {
      game.status = "place";
      if (mouseX < width/3)
        game.select = 0;
      else if (mouseX < width*2/3) 
        game.select = 1;
      else 
        game.select = 2;
      if (game.towers[game.select].length === 0)
        game.status = "pick";
    }
  else
    {
      // use the mouse position to designate the target tower
      let target;
      game.status = "pick";
      if (mouseX < width/3) target = 0;
      else if (mouseX < width*2/3) target = 1;
      else target = 2;
      
      // peek at both towers and move the disk if allowed
      if (peek(game.towers[target]) > peek(game.towers[game.select]))
        game.move(game.select, target);
    
    }
  
    // check if the player has won and end the game
    if (game.win())
      noLoop();
  
};


function setup() {
  createCanvas(game.width, game.height);
  background(0);  
  rectMode(CENTER); // draw rectangles from the center out

}

function draw() {
    background(0)
    game.draw(); //draw the board every frame
}
