const media = document.querySelector('video');
const controls = document.querySelector('.controls');
const kop=0;
let balioak=[];

var pausuak=[ "A_01_Aurretik", "A_09_Aurretik", "B_01_Aurretik", "B_07_2_Aurretik", "C_01_A_Aurretik", "C_Bikotean_04" ];
var gehitu=[];


//Hau balioa lortzeko beste webgunetik
const urlParams = new URLSearchParams(window.location.search);
var nextsrc = [];
for(var value of urlParams.values()) {
	  console.log(value);
	  balioak.push(value);
	  console.log(balioak);
	  nextsrc.push("video/"+value+".mp4");
		console.log(nextsrc);
		console.log("Luzeera:"+nextsrc.length);
	}



const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const rwd = document.querySelector('.rwd');
const fwd = document.querySelector('.fwd');

const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.timer div');

const abiadura=document.querySelector('.speed');
const loop=document.querySelector('.loop');
const full=document.querySelector('.full');


media.removeAttribute('controls');
controls.style.visibility = 'visible';

const balioa=urlParams.get("balioa");
media.src="video/"+balioa+".mp4"


//https://stackoverflow.com/questions/2551859/html-5-video-or-audio-playlist

/*var nextsrc = [];
for(var i=0;i<balioak.length;i++){	
	nextsrc.push("video/"+balioa+".mp4");
	console.log(nextsrc[i]);
}
*/
var elm = 0; 

media.addEventListener("ended", bukatu);
function bukatu(){
	setTimeout(() => {hurrengoa();}, 5);
     }

play.addEventListener('click', playPauseMedia);

function playPauseMedia() {
	rwd.classList.remove('active');
	fwd.classList.remove('active');
	clearInterval(intervalRwd);
	clearInterval(intervalFwd);
	  if(media.paused) {
	    play.setAttribute('data-icon','u');
	    media.play();
	  } else {
	    play.setAttribute('data-icon','P');
	    media.pause();
	  }
	}

stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia);

function stopMedia() {
	  media.pause();
	  media.currentTime = 0;
	  play.setAttribute('data-icon','P');
	  rwd.classList.remove('active');
	  fwd.classList.remove('active');
	  clearInterval(intervalRwd);
	  clearInterval(intervalFwd);
	}

rwd.addEventListener('click', aurrekoa);
fwd.addEventListener('click', hurrengoa);

let intervalFwd;
let intervalRwd;

function aurrekoa(){
	if(elm==0){
		elm=nextsrc.length-1;
		berria(elm);	
	}else{
		--elm;
		berria(elm);	
	}	
	}

function hurrengoa(){
	if(elm==nextsrc.length-1){
		elm=0;
		berria(elm);	
	}else{
		++elm;
		berria(elm);	
	}
}

function berria(elm){
	nagusia(elm,balioak);
	media.src = nextsrc[elm];
	media.load();
	media.play();
	//fetchVideoAndPlay(nextsrc[elm]);
	console.log("Elm:"+elm+" Src:"+media.src);

}
/*
function fetchVideoAndPlay(bideo) {
    fetch(bideo)
    .then(response => response.blob())
    .then(blob => {
      media.srcObject = blob;
      return media.play();
    })
    .then(_ => {
      // Video playback started ;)
    })
    .catch(e => {
      // Video playback failed ;(
    })
  }
  */



/* GUZTI HAU BIDEOAN ATZERA TA AURREA JUTEKO

function mediaBackward() {
  clearInterval(intervalFwd);
  fwd.classList.remove('active');

  if(rwd.classList.contains('active')) {
    rwd.classList.remove('active');
    clearInterval(intervalRwd);
    media.play();
  } else {
    rwd.classList.add('active');
    media.pause();
    intervalRwd = setInterval(windBackward, 200);
  }
}

function mediaForward() {
  clearInterval(intervalRwd);
  rwd.classList.remove('active');

  if(fwd.classList.contains('active')) {
    fwd.classList.remove('active');
    clearInterval(intervalFwd);
    media.play();
  } else {
    fwd.classList.add('active');
    media.pause();
    intervalFwd = setInterval(windForward, 200);
  }
}
*/

function windBackward() {
	  if(media.currentTime <= 3) {
	    rwd.classList.remove('active');
	    clearInterval(intervalRwd);
	    stopMedia();
	  } else {
	    media.currentTime -= 3;
	  }
	}

	function windForward() {
	  if(media.currentTime >= media.duration - 3) {
	    fwd.classList.remove('active');
	    clearInterval(intervalFwd);
	    stopMedia();
	  } else {
	    media.currentTime += 3;
	  }
	}
	
	media.addEventListener('timeupdate', setTime);
	
	function setTime() {
		  let minutes = Math.floor(media.currentTime / 60);
		  let seconds = Math.floor(media.currentTime - minutes * 60);
		  let minuteValue;
		  let secondValue;

		  if (minutes < 10) {
		    minuteValue = '0' + minutes;
		  } else {
		    minuteValue = minutes;
		  }

		  if (seconds < 10) {
		    secondValue = '0' + seconds;
		  } else {
		    secondValue = seconds;
		  }

		  let mediaTime = minuteValue + ':' + secondValue;
		  timer.textContent = mediaTime;

		  let barLength = timerWrapper.clientWidth * (media.currentTime/media.duration);
		  timerBar.style.width = barLength + 'px';
		}
	
abiadura.addEventListener('click',setAbiadura);

	function setAbiadura(){
		
		if (media.playbackRate==1){
			media.playbackRate=0.5;
		} else if (media.playback==0.5){
			media.playbackRate=5.0;
		}else{
			media.playbackRate=1;
		}
		
	}
	
//Bideoa loop-eatu	
loop.addEventListener('click',setLoop);
	
	function setLoop(){
		if(media.loop){
			media.loop=false;
		}else{
			media.loop=true;
		}
	}

//Bideoa pantaila osan bistaratu
	var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);

	if (!fullScreenEnabled) {
		   full.style.display = 'none';
		}
	
	
function fullScreen() {
	   if (isFullScreen()) {
		      if (document.exitFullscreen) document.exitFullscreen();
		      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
		      else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
		      else if (document.msExitFullscreen) document.msExitFullscreen();
		      setFullscreenData(false);
		   }
		   else {
		      if (media.requestFullscreen) media.requestFullscreen();
		      else if (media.mozRequestFullScreen) media.mozRequestFullScreen();
		      else if (media.webkitRequestFullScreen) video.webkitRequestFullScreen();
		      else if (media.msRequestFullscreen) media.msRequestFullscreen();
		      setFullscreenData(true);
		   }
		}

var isFullScreen = function() {
	   return !!(document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
	}

var setFullscreenData = function(state) {
	   video.setAttribute('data-fullscreen', !!state);
	}

document.addEventListener('fullscreenchange', function(e) {
	   setFullscreenData(!!(document.fullscreen || document.fullscreenElement));
	});
	document.addEventListener('webkitfullscreenchange', function() {
	   setFullscreenData(!!document.webkitIsFullScreen);
	});
	document.addEventListener('mozfullscreenchange', function() {
	   setFullscreenData(!!document.mozFullScreen);
	});
	document.addEventListener('msfullscreenchange', function() {
	   setFullscreenData(!!document.msFullscreenElement);
	});

	
media.addEventListener("contextmenu", function (e) { e.preventDefault(); e.stopPropagation(); }, false);

// hide the controls if they're visible
if (media.hasAttribute("controls")) {
    media.removeAttribute("controls")   
}


/* play video twice as fast 
document.querySelector('video').defaultPlaybackRate = 2.0;
document.querySelector('video').play();
*/




//Aukeratutako bideoen zerrenda erakutsi pantaila eraksuterakoan

document.body.onload = elementuaGehitu(balioak);

function elementuaGehitu (balioakSartu) {
	var currentDiv = document.getElementById("lista");
	var n=0;	  
  var listaIzena=[];
  var gora=[];
  var behera=[]; 
  var kendu=[];
  
  for(var v=0;v<balioakSartu.length;v++){
	  //lista izena gehitu dokumentura 
	  listaIzena[v]=document.createElement("h4");
	  listaIzena[v].id=balioakSartu[v];
	  listaIzena[v].setAttribute("onclick","erakutsi(id)");
	  n=v+1;
	  listaIzena[v].innerHTML=n+"."+balioakSartu[v];
	  currentDiv.appendChild(listaIzena[v]);
	  //gora botoia gehitu	  	  
	  gora[v]=document.createElement("button");
	  gora[v].value=balioakSartu[v];
	  gora[v].setAttribute("onclick","igo(value)");
	  gora[v].className="gora";
	  gora[v].innerHTML="Igo";
	  currentDiv.appendChild(gora[v]);
	  //behera botoia gehitu
	  behera[v]=document.createElement("button");
	  behera[v].value=balioakSartu[v];
	  behera[v].setAttribute("onclick","jeitsi(value)");
	  behera[v].className="behera";
	  behera[v].innerHTML="Jeitsi";
	  currentDiv.appendChild(behera[v]);
	  //
	  kendu[v]=document.createElement("button");
	  kendu[v].value=balioakSartu[v];
	  kendu[v].setAttribute("onclick","kenduPausua(value)");
	  kendu[v].className="kendu";
	  kendu[v].innerHTML="Kendu";
	  currentDiv.appendChild(kendu[v]);
  }
  gehituBistaratu();
  nagusia(0,balioakSartu);
}

//Erreproduzitzen ari den balioa beltzen jarri
function nagusia(elem,balioakSartu){
	var elementua;
	for(var v=0;v<balioakSartu.length;v++){
		if(v==elem){
			elementua = document.getElementById(balioakSartu[v]);
			elementua.style.fontWeight="bold";
		}
		else{
			elementua = document.getElementById(balioakSartu[v]);
			elementua.style.fontWeight="normal";
			
		}
	}
	
}

//ikusi nahiden bideoaren balioa pasa eta bistaratu
function erakutsi(value){
	elm=balioak.indexOf(value);
	berria(elm);
}


//bideo bat listan goran egin
function igo(value){
	elm=balioak.indexOf(value);
	if(elm!=0){
	console.log("gora:"+array_move(balioak,elm,elm-1));
	divEzabatu();
	elementuaGehitu(balioak);
	balioakPasa();
	}	
}

//bideo bat listan behera egin
function jeitsi(value){
	elm=balioak.indexOf(value);
	if(elm!=balioak.length-1){
		console.log("gora:"+array_move(balioak,elm,elm+1));
		divEzabatu();
		elementuaGehitu(balioak);
		balioakPasa();
	}
	
}

//bideo listatik kendu
function kenduPausua(value){
	elm=balioak.indexOf(value);
	console.log("kendu:"+balioak.splice(elm,1)+" balioa:"+balioak);
	divEzabatu();
	elementuaGehitu(balioak);
	balioakPasa();
}



//JavaScripten array batean elementuak toki abtetik bestera mugitzeko funtzioa
function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

//Bideo zerrenda ezabatu
function divEzabatu(){
	var nereDiv=document.getElementById("lista");
	nereDiv.innerHTML='';
}


//balioak array-a nextsrc-ra pasa

function balioakPasa(){
	console.log("BalioakPasa:"+balioak);
	nextsrc=[];
	for(var v=0;v<balioak.length;v++){
		nextsrc[v]="video/"+balioak[v]+".mp4";
	}
	console.log(nextsrc);
	elm=0
	berriaGeldirik(elm);	
}


function berriaGeldirik(elm){
	nagusia(elm,balioak);
	media.src = nextsrc[elm];
	media.load();
	stopMedia();
	//fetchVideoAndPlay(nextsrc[elm]);
	console.log("Elm:"+elm+" Src:"+media.src);

}

function gehituBistaratu(){
	var optionB=[];
	var gehituSelect = document.getElementById("gehituSelect");
	gehituArraySortu();
	gehituOptUstu();
	
	//<select name="balioa">
	//<option value="A"> A</option>
	
	for(var v=0;v<gehitu.length;v++){
		//console.log("HEMEN  gehitu.length:"+gehitu.length+" v:"+v);
		gehituSelect.options[v]=new Option(gehitu[v],gehitu[v]);
		gehituSelect.options[v].setAttribute("onclick","gehituPausua(value)");
	}
	  
}

function gehituArraySortu(){
	gehitu=[];
	gehitu=pausuak.filter(x => balioak.indexOf(x) === -1)
	console.log("GehituSortu:"+gehitu);
}f

function gehituPausua(value){
	balioak.push(value)
	console.log("gehituPausua:"+value+" balioa:"+balioak);
	divEzabatu();
	elementuaGehitu(balioak);
	balioakPasa();
}

function gehituOptUstu(){
	var gehituSelect = document.getElementById("gehituSelect");
	for (var i=0; i<gehituSelect.length; i++) {
	    	gehituSelect.remove(i);
	}
}









	