var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}]
var shiwu={}
var hang;
var fangxiang=39;
var timerId;
var sence=$('.sence');
var huachangjing=function(){
      sence.empty();
      hang=hang||20;
      var wh=Math.floor(600/hang);   
      for(var i=0;i<hang;i++){
        for(var j=0;j<hang;j++){
           $('<div>')
           .addClass('block')
           .attr('id',i+'-'+j)
           .width(wh-1)
           .height(wh-1)
           .appendTo(sence)
       }
   }
   sence.width(wh*hang).height(wh*hang)
}
     huachangjing();

$('.row').bind('keyup',function(e){
     	if(e.keyCode!==13){
     		return;
     	}else{
     		hang=$(this).val();
     		huachangjing(hang)
     		fangshe();
     		fangshiwu();
     	}
     })

///放蛇
     var fangshe=function(){
     	she.forEach(function(v){
    		$('#'+v.x+'-'+v.y).addClass('she')
        })
    }
    fangshe()

///放食物
var fangshiwu=function(){
    	_x=Math.floor(Math.random()*hang);
    	_y=Math.floor(Math.random()*hang);
        $('#'+_x+'-'+_y).addClass('shiwu')
         return {x:_x,y:_y}
    }
shiwu=fangshiwu();



var move=function(){
    var jiutou=she[she.length-1];
    if(fangxiang==39){
    	var xintou={x:jiutou.x,y:jiutou.y+1}
    }else if(fangxiang==37){
    	var xintou={x:jiutou.x,y:jiutou.y-1}
    }else if(fangxiang==38){
    	var xintou={x:jiutou.x-1,y:jiutou.y}
    }else if(fangxiang==40){
    	var xintou={x:jiutou.x+1,y:jiutou.y}
    }if(xintou.x<0||xintou.x>hang-1||xintou.y<0||xintou.y>hang-1){
        clearInterval(timerId);
    	alert('撞墙了');
        clearInterval(timer);
    	return;
    }   
    // 吃到食物了
    if(xintou.x==shiwu.x&&xintou.y==shiwu.y){
       $('#'+xintou.x+'-'+xintou.y).removeClass('shiwu').addClass('she')
       she.push(xintou);
       shiwu=fangshiwu();
    }
    // 没吃到食物
    else{
	    $('#'+xintou.x+'-'+xintou.y).addClass('she');
	    she.push(xintou);
	    var weiba=she.shift();
	    $('#'+weiba.x+'-'+weiba.y).removeClass('she');	
    }
    
    }
   

$(document).bind('keydown',function(e){
    	if(e.keyCode<37||e.keyCode>40){
    		return;
    	}if(Math.abs(e.keyCode-fsangxiang)==2){
    		return;
    	}else{
    		fangxiang=e.keyCode;
    	}
    })


$('ul li[data]').bind('click',function(){
	// she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}]
	hang=Number($(this).attr('data'));
   
	$('li.active').removeClass('active')
	$(this).addClass('active');
	huachangjing();
	shiwu=fangshiwu();
    fangshe();
})




$('li.caozuo').bind('click',function(){
	var str=$(this).attr('caozuo');
	if(str=='start'){
        $('.active').removeClass('active');
        $(this).addClass('active')
        $('.sence').show(400)
		clearInterval(timerId)
        timerId=setInterval(move,1000)		 
	}else if(str=='zanting'){
        $('.active').removeClass('active');
        $(this).addClass('active')
		clearInterval(timerId);
	}else if(str=='restart'){
        // sence.empty();
        $('.active').removeClass('active');
        $(this).addClass('active')
        $('.she').removeClass('she');
		$('.shiwu').removeClass('shiwu');
        clearInterval(timerId);
		shiwu={};
		she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}]
        fangshe();
        fangshiwu();
        timerId=setInterval(move,200);
	}
})