class City{
    constructor(x_,y_,id_){
        this.x=x_;
        this.y=y_;
        this.id=id_;
    }
}
var cities=[];
var totalCities;
var optimalCost=Infinity;
var optimalPath=null;
var permutationCount=1;
var totalPermutation=1;
function setup(){
    createCanvas(1000,500);
    totalCities=prompt("Enter no of cities",0);
    for(var i=1;i<=totalCities;i++){
        totalPermutation*=i;
    }
}
function draw(){
    background(0);
    stroke(255);
    noFill();
    line(500,0,500,500);
    for(var i in cities){
        stroke(255);
        noFill();
        ellipse(cities[i].x,cities[i].y,10,10);
    }
    if(cities.length==totalCities){
        beginShape();
        for(var i in cities){
            vertex(cities[i].x,cities[i].y);
        }
        // vertex(cities[0].x,cities[0].y)
        endShape();
        var cost=0;
        for(var i=0;i<cities.length-1;i++){
            cost+=dist(cities[i].x,cities[i].y,cities[i+1].x,cities[i+1].y)
        }
        cost+=dist(cities[cities.length-1].x,cities[cities.length-1].y,cities[0].x,cities[0].y);
        console.log(optimalCost);
        if(cost<optimalCost){
            optimalCost=cost;
            optimalPath=cities.slice();
        }
        cities=next_permutation();
        // call next permutation here
    }
    if(optimalPath){
        stroke(255);
        noFill();
        text(optimalCost,10+500,30);
        var per=(permutationCount/totalPermutation)*100;
        text(per+"%",10+500,50);
        for(var i=0;i<optimalPath.length;i++){
            stroke(255);
            noFill();
            ellipse(optimalPath[i].x+500,optimalPath[i].y,10,10);
            if(i!=optimalPath.length-1){
                text(i,(optimalPath[i].x+optimalPath[i+1].x+1000)/2,(optimalPath[i].y+optimalPath[i+1].y)/2);
            }
        }
        noFill();
        stroke(255,0,0);
        beginShape();
        for(var i in optimalPath){
            vertex(optimalPath[i].x+500,optimalPath[i].y);
        }
        // vertex(cities[0].x+500,cities[0].y)
        endShape();
    }
}
function next_permutation(){
    var currentPermu=[];
    for(var i in cities){
        currentPermu.push(cities[i].id);
    }
    var x=-1;
    for(var i=0;i<currentPermu.length-1;i++){
        if(currentPermu[i]<currentPermu[i+1]){
            x=i;
        }
    }
    if(x==-1){
        console.log("Done");
        return false;
    }
    permutationCount++;
    var y=-1;
    for(var i=0;i<currentPermu.length;i++){
        if(currentPermu[x]<currentPermu[i]){
            y=i;
        }
    }
    var temp=currentPermu[x];
    currentPermu[x]=currentPermu[y];
    currentPermu[y]=temp;
    temp=currentPermu.splice(x+1,currentPermu.length);
    temp.reverse();
    var nextPermuation=currentPermu.concat(temp);
    var nextCities=[];
    for(var i=0;i<nextPermuation.length;i++){
        for(var j in cities){
            if(cities[j].id==nextPermuation[i]){
                nextCities.push(cities[j]);
                break;
            }
        }
    }
    return nextCities;
}
function keyPressed(){
    if(keyCode==32){
        // when space is pressed
        if(cities.length!=totalCities){
            cities.push(new City(mouseX,mouseY,cities.length));
        }
    }
}
