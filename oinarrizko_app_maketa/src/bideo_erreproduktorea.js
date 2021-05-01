const media = document.querySelector('video');
const controls = document.querySelector('.controls');
const kop=0;

let balioak=[];

var pausuak=[ "A_01_Aurretik", "A_09_Aurretik", "B_01_Aurretik", "B_07_2_Aurretik", "C_01_A_Aurretik", "C_Bikotean_04" ];
var audioak=["","A","B","C","OSOA"];
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
const playIcon = document.getElementById("playIcon");
const stop = document.querySelector('.stop');
const rwd = document.querySelector('.rwd');
const fwd = document.querySelector('.fwd');

const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.timer div');

const abiadura=document.querySelector('.speed');
const speedIcon = document.getElementById("speedIcon");
const loop=document.querySelector('.loop');
const loopIcon = document.getElementById("loopIcon");
const full=document.querySelector('.full');
const mute=document.querySelector('.mute');
const muteIcon = document.getElementById("muteIcon");
var ixildu=0;
var audioLuzeera=0;
var bideoMomentua=0;


media.removeAttribute('controls');
controls.style.visibility = 'visible';

const balioa=urlParams.get("balioa");
var audioPlayer = document.getElementById("audioPlayer");
media.src="video/"+balioa+".mp4"


//https://stackoverflow.com/questions/2551859/html-5-video-or-audio-playlist

/*var nextsrc = [];
for(var i=0;i<balioak.length;i++){	
	nextsrc.push("video/"+balioa+".mp4");
	console.log(nextsrc[i]);
}
*/
var elm = 0; 

play.addEventListener('click', playPause);

function playPause(){
	var countdown=document.getElementById("countdownId");
	if((countdown.checked)&&(media.paused)){
		var timeleft = document.getElementById("countdownValue").value;
		var downloadTimer = setInterval(function(){
		  if(timeleft <= 0){
		    clearInterval(downloadTimer);
		    document.getElementById("countdownText").innerHTML = "";
		    playPauseMedia();
		  } else {
		    document.getElementById("countdownText").innerHTML = timeleft;
		  }
		  timeleft -= 1;
		}, 1000);
	}
	else{
		playPauseMedia();
	}
}
//
function playPauseMedia() {
	rwd.classList.remove('active');
	fwd.classList.remove('active');
	clearInterval(intervalRwd);
	clearInterval(intervalFwd);
	  if(media.paused) {
		playIcon.className="fas fa-pause fa-lg";
	    media.play();
	    if(audioPlayer!=null){
	    	audioPlayer.play();
	    }
	  } else {
		playIcon.className="fas fa-play fa-lg";
	    media.pause();
	    if(audioPlayer!=null){
	    	audioPlayer.pause();
	    }
	  }
	}

stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMediaBideo);

function stopMedia() {
	  media.pause();
	  media.currentTime = 0;
	  playIcon.className="fas fa-play fa-lg";
	  if(audioPlayer!=null){
		  audioPlayer.pause();	  
		  audioPlayer.currentTime=0;
	  }
	  rwd.classList.remove('active');
	  fwd.classList.remove('active');
	  clearInterval(intervalRwd);
	  clearInterval(intervalFwd);
	}
function stopMediaBideo() {
	  media.pause();
	  media.currentTime = 0;
	  //playIcon.className="fas fa-play fa-lg";
	  rwd.classList.remove('active');
	  fwd.classList.remove('active');
	  clearInterval(intervalRwd);
	  clearInterval(intervalFwd);
	  setTimeout(() => {hurrengoa();}, 1);
	}

rwd.addEventListener('click', aurrekoa);
fwd.addEventListener('click', hurrengoa);

let intervalFwd;
let intervalRwd;

function aurrekoa(){
	if(elm==0){
		elm=nextsrc.length-1;
		bideoMomentua=media.currentTime;
		berria(elm);
		audioLuzeraAtzeraAldatu();	
	}else{
		--elm;
		bideoMomentua=media.currentTime;
		berria(elm);
		audioLuzeraAtzeraAldatu();		
	}	
}

function hurrengoa(){
	console.log("hemen hasta los huevos");
	if(elm==nextsrc.length-1){
		elm=0;
		if(audioPlayer!=null){
		audioLuzeraAurreraAldatu();
		}
		berria(elm);	
	}else{
		++elm;
		if(audioPlayer!=null){
			audioLuzeraAurreraAldatu();
			}
		berria(elm);	
	}
}

function berria(elm){
	
	media.src = nextsrc[elm];
	media.play();
	playIcon.className="fas fa-pause fa-lg";
	nagusia(elm,balioak);
	console.log(media.duration);
	//fetchVideoAndPlay(nextsrc[elm]);
	console.log("Elm:"+elm+" Src:"+media.src+" berriaN");
}

function berriaB(elm){	
	media.src = nextsrc[elm];
	console.log(media.duration);
	audioPlayer.currentTime=0;
	playPause();
	nagusia(elm,balioak);
	//fetchVideoAndPlay(nextsrc[elm]);
	console.log("Elm:"+elm+" Src:"+media.src+"berraB");

}


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
			abiaduraIcon.style.color="hsl(217, 71%, 53%)";
			audioPlayer.playbackRate=0.5;			
		} else if (media.playback==0.5){
			media.playbackRate=5.0;
			audioPlayer.playbackRate=5.0;
		}else{
			media.playbackRate=1;
			abiaduraIcon.style.color="white";
			audioPlayer.playbackRate=1;			
		}
		
	}
	
//Bideoa loop-eatu	
loop.addEventListener('click',setLoop);
	
	function setLoop(){
		if(media.loop){
			loopIcon.style.color="white";
			media.loop=false;
			audioPlayer.loop=false;			
		}else{
			loopIcon.style.color="hsl(217, 71%, 53%)";
			media.loop=true;
			audioPlayer.loop=true;
			
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
//Bideoari ahotsa kendu
mute.addEventListener('click',setMute());
	function setMute(){
		
		if(ixildu==0){
			muteIcon.style.color="white";
			media.muted=false;
			ixildu=1;
			console.log("Mute:"+false+ixildu);
			
		}else{	
			muteIcon.style.color="hsl(217, 71%, 53%)";
			media.muted=true;
			ixildu=0;
			console.log("Mute:"+true+ixildu);
					}
		
	}


//Aukeratutako bideoen zerrenda erakutsi pantaila eraksuterakoan

document.body.onload = elementuaGehitu(balioak);

function elementuaGehitu (balioakSartu) {
	var currentDiv = document.getElementById("lista");
	var n=0;	  
  var listaIzena=[];
  var gora=[];
  var behera=[]; 
  var kendu=[];
  var nextDiv=[];
  var bideoDiv=[];
  var botoiDiv=[];
  var level=[];
  
  for(var v=0;v<balioakSartu.length;v++){
	  nextDiv[v]=document.createElement("nav");
	  nextDiv[v].className=balioakSartu[v]+" level is-mobile bideoAukera";
	  //lista izena gehitu dokumentura 
	  bideoDiv[v]=document.createElement("div");
	  bideoDiv[v].className="level-left bideoLista";
	  listaIzena[v]=document.createElement("p");
	  listaIzena[v].className="level-item is-clickable title is-4";
	  listaIzena[v].id=v;
	  listaIzena[v].setAttribute("onclick","erakutsi(id)");
	  n=v+1;
	  listaIzena[v].innerHTML=n+". "+balioakSartu[v];
	  bideoDiv[v].appendChild(listaIzena[v]);
	  nextDiv[v].appendChild(bideoDiv[v]);
	  
	  //gora botoia gehitu	 
	  botoiDiv[v]=document.createElement("div");
	  botoiDiv[v].className="level-right botoiLista";
	  gora[v]=document.createElement("i");
	  gora[v].value=v;
	  gora[v].setAttribute("onclick","igo(value)");
	  gora[v].className="level-item is-clickable gora fas fa-chevron-up fa-lg";
	  //gora[v].innerHTML="Igo";
	  botoiDiv[v].appendChild(gora[v]);
	  
	  //behera botoia gehitu
	  behera[v]=document.createElement("i");
	  behera[v].value=v;
	  behera[v].setAttribute("onclick","jeitsi(value)");
	  behera[v].className="is-clickable level-item behera fas fa-chevron-down fa-lg";
	  //behera[v].innerHTML="Jeitsi";
	  botoiDiv[v].appendChild(behera[v]);
	  
	  
	  //
	  kendu[v]=document.createElement("i");
	  kendu[v].value=v;
	  kendu[v].setAttribute("onclick","kenduPausua(value)");
	  kendu[v].className="is-clickable level-item kendu fas fa-minus fa-lg";
	  //kendu[v].innerHTML="Kendu";
	  botoiDiv[v].appendChild(kendu[v]);
	  nextDiv[v].appendChild(botoiDiv[v]);
	  currentDiv.appendChild(nextDiv[v]);
  }
  gehituBistaratu();
  audioBistaratu()
  nagusia(0,balioakSartu);
}

//Erreproduzitzen ari den balioa beltzen jarri
function nagusia(elem,balioakSartu){
	var elementua;
	for(var v=0;v<balioakSartu.length;v++){
		if(v==elem){
			elementua = document.getElementById(v);
			elementua.style.fontWeight="bold";
			elementua.className="level-item is-clickable title is-4";
		}
		else{
			elementua = document.getElementById(v);
			elementua.style.fontWeight="normal";
			elementua.className="level-item is-clickable title is-5";
			
		}
	}
	
}

//ikusi nahiden bideoaren balioa pasa eta bistaratu
function erakutsi(value){
	elm=value;
	berriaB(elm);
}


//bideo bat listan goran egin
function igo(value){
	elm=value;
	if(elm!=0){
	console.log("gora:"+array_move(balioak,elm,elm-1));
	divEzabatu();
	elementuaGehitu(balioak);
	balioakPasa();
	}	
}

//bideo bat listan behera egin
function jeitsi(value){
	elm=value;
	if(elm!=balioak.length-1){
		console.log("gora:"+array_move(balioak,elm,elm+1));
		divEzabatu();
		elementuaGehitu(balioak);
		balioakPasa();
	}
	
}

//bideo listatik kendu
function kenduPausua(value){
	elm=value;
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
	var gehituSelect = document.getElementById("gehituSelect");
	gehituArraySortu();
	gehituOptUstu();
	
	//<select name="balioa">
	//<option value="A"> A</option>
	
	for(var v=0;v<gehitu.length;v++){
		//console.log("HEMEN  gehitu.length:"+gehitu.length+" v:"+v);
		gehituSelect.options[v]=new Option(gehitu[v],gehitu[v]);
	}
	  
}

function gehituArraySortu(){
	gehitu=[];
	//gehitu=pausuak.filter(x => balioak.indexOf(x) === -1)
	gehitu=pausuak;
	console.log("GehituSortu:"+gehitu);
}

function gehituPausua(){
	var value =document.getElementById("gehituSelect").value;     	
	if((value!=null)&&(value!="")){
		balioak.push(value)
		console.log("gehituPausua:"+value+" balioa:"+balioak);
		divEzabatu();
		elementuaGehitu(balioak);
		balioakPasa();
	}
}

function gehituOptUstu(){
	var gehituSelect = document.getElementById("gehituSelect");
	for (var i=0; i<gehituSelect.length; i++) {
	    	gehituSelect.remove(i);
	}
}





//AUDIO

function audioBistaratu(){
	var audioSelect = document.getElementById("audioSelect");
	//<select name="balioa">
	//<option value="A"> A</option>
	
	for(var v=0;v<audioak.length;v++){
		//console.log("HEMEN  gehitu.length:"+gehitu.length+" v:"+v);
		audioSelect.options[v]=new Option(audioak[v],audioak[v]);
	}
	  
}

function audioAldatu(){
	var value =document.getElementById("audioSelect").value;
	audioPlayer=document.getElementById("audioPlayer")
	console.log("audiselect: "+value);
	
	if(value==""){
		ixildu=0;
		setMute();
		audioPlayer.muted=true;
		stopMedia();
		console.log("Bideoko audioa, ixildu:"+ixildu);
	}else{
		ixildu=1;
		setMute();
		audioPlayer.src="video/J_"+value+".mp3";	
		audioPlayer.load();
		console.log("Audioa:"+value+"   ixildu:"+ixildu);
		stopMedia();
	}
}

function audioLuzeraAurreraAldatu(){
	var value =document.getElementById("audioSelect").value;
	if(value!=""){
		var gehiketa=audioLuzeera + media.duration;
		console.log(" AURRERA AudioLuzeera:"+audioLuzeera+" VideoLuzeera:"+media.duration+" audiPlayer berria:"+gehiketa);
		if( audioPlayer.duration<=gehiketa+media.duration){
			audioLuzeera=0;
			audioPlayer.currentTime=audioLuzeera;
			console.log('audioPlayer.currentTime'+audioPlayer.currentTime);
		}else{
			audioLuzeera= gehiketa;
			audioPlayer.currentTime=audioLuzeera;
			console.log('audioPlayer.currentTime'+audioPlayer.currentTime);		
		}
	}
}

function audioLuzeraAtzeraAldatu(){
	var value =document.getElementById("audioSelect").value;
	if(value!=""){
		media.onloadedmetadata=function(){
			console.log(media.duration);
			var kenketa=audioPlayer.currentTime - media.duration - bideoMomentua;
			console.log("ATZERA AudioLuzeera:"+audioLuzeera+" VideoLuzeera:"+ media.duration +" kenketa:"+kenketa+" bideoMomentua:"+bideoMomentua);
			if( kenketa<=0){
				audioLuzeera=0;
				audioPlayer.currentTime=audioLuzeera;
				console.log('audioPlayer.currentTime'+audioPlayer.currentTime);
			}else{
				audioLuzeera= kenketa;
				audioPlayer.currentTime=audioLuzeera;
				console.log('audioPlayer.currentTime'+audioPlayer.currentTime);		
			}
		}
	}
}






	