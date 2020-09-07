//Create variables here
var dog,happyDog,database,foodS,foodStock,data,img2,img1;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
function preload()
{
  img1=loadImage("images/Dog.png")
  img2=loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);
  foodObj = new Food();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(250,250,40,40);
  dog.addImage("dog",img1)
  dog.scale=0.15;
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
  drawSprites();

}

function readStock(data)
{
  var foodRef  = database.ref('Food');
  foodRef.on("value",function(data){
     foodS = data.val();
  })


}

function feedDog(){
  dog.addImage(img2);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



