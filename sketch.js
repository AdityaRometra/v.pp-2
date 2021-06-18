//Create variables here
var dog,happyDog,database,foodS,foodStock,virtualDog,feed,addFood,fedTime,lastFed;

function preload()
{
	//load images here
  happyDog=loadImage("images/dogImg1.png");
  dog=loadImage("images/dogImg.png");
}

function setup() {
	createCanvas(1000,500);
  database=firebase.database();
  virtualDog=createSprite(620,370,10,10);
  virtualDog.addImage(dog);
  virtualDog.scale=0.4;
  foodObj=new Food()

  foodStock=database.ref("food");
  foodStock.on("value",readStock);
  
  feed=createButton("Feed The Dog");
  feed.position(600,90);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(500,90);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);
  foodObj.display();
  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed=data.val()
  })
fill(55,250,240);
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+lastFed%12 +"PM",350,30)
}else if(lastFed==0){
  text("Last Feed : " +"12 AM",350,30)
}else{
  text("Last Feed : "+lastFed +"AM",350,30)
}
  

  drawSprites();
  

 
 
}


function readStock(data){
foodS=data.val();
foodObj.updateFoodStock(foodS)

}
function feedDog(){
  
  virtualDog.addImage(happyDog);
  if (foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0)
}  else{
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
}
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour()
  })

  
}

function addFoods(){

foodS++;
database.ref('/').update({
  food:foodS
})
 

}




