const media = document.querySelector('video');
const controls = document.querySelector('.controls');
const kop=0;

let balioak=[];

var pausuak=[ "A_01_Aurretik", "A_09_Aurretik", "B_01_Aurretik", "B_07_2_Aurretik", "C_01_A_Aurretik", "C_Bikotean_04" ];
var audioak=["","A","B","C","OSOA"];
var denborak=[[1.33 , 17.20],[1.33 , 17.20],[1.33 , 17.60],[1.33 , 17.60],[1.99, 28.56],[1.99 , 28.56]];
var gehitu=[];
var perts=true;

//Hau balioa lortzeko beste webgunetik
const urlParams = new URLSearchParams(window.location.search);
var nextsrc = [];
for(var value of urlParams.values()) {
	if(value=="true"){
		perts=true;
	}else if(value=="false"){		
		perts=false;
	}else{
		console.log(value);
		balioak.push(value);
		console.log(balioak);
		nextsrc.push("video/"+value+".mp4");
		console.log(nextsrc);
		console.log("Luzeera:"+nextsrc.length);
	}	  
}
var aukeratutakoAudioa= audioak[0];


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
var audioListaEzkutatuta=0;
var audioLaburErreproduzitzen=0;


media.removeAttribute('controls');
controls.style.visibility = 'visible';

const balioa=urlParams.get("balioa");
var audioPlayer = document.getElementById("audioPlayer");
media.src="video/"+balioa+".mp4"

document.body.onload=hasieratu();
	
function hasieratu(){
	if(!perts){
		danCardAldatu();
		media.currentTime=denborak[0][0];
	}
}
//https://stackoverflow.com/questions/2551859/html-5-video-or-audio-playlist

/*var nextsrc = [];
for(var i=0;i<balioak.length;i++){	
	nextsrc.push("video/"+balioa+".mp4");
	console.log(nextsrc[i]);
}
*/
var elm = 0; 

//play.addEventListener('click', playPause);

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
		console.log("hemen 2");
		playPauseMedia();
	}
	console.trace(audioPlayer.muted);
}
//
function playPauseMedia() {
	if(balioak.length!=0){
		document.getElementById("notifikazioa").setAttribute('style', 'display:none;');
		rwd.classList.remove('active');
		fwd.classList.remove('active');
		clearInterval(intervalRwd);
		clearInterval(intervalFwd);
		  if(media.paused) {
			playIcon.className="fas fa-pause fa-lg";
			console.log("hemen erreproduzitzen");
		    media.play();
		    if(audioPlayer!=null){
		    	audioPlayer.play();
		    }
		  } else {
			playIcon.className="fas fa-play fa-lg";
			console.log("hemen geldirik");
		    media.pause();
		    if(audioPlayer!=null){
		    	audioPlayer.pause();
		    }
		  }
	}else{
		document.getElementById("notifikazioa").setAttribute('style', 'display:block;');
	}
	
	}

stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMediaBideo);

function stopMedia() {
	  
	  elm=nextsrc.length-1;
	  hurrengoa();
	  media.pause();
	  if(!perts){
		  media.currentTime =denborak[0][0];
	  }else{
		  media.currentTime = 0;
	  }
	  
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
	  audioPlayer.pause();
	  media.currentTime = 0;
	  //playIcon.className="fas fa-play fa-lg";
	  rwd.classList.remove('active');
	  fwd.classList.remove('active');
	  clearInterval(intervalRwd);
	  clearInterval(intervalFwd);
	  
	  //setTimeout(() => {hurrengoa();}, 1);
	  hurrengoa();
	}

rwd.addEventListener('click', aurrekoaB);
fwd.addEventListener('click', hurrengoaB);

let intervalFwd;
let intervalRwd;

function aurrekoa(){
	if(elm==0){
		elm=nextsrc.length-1;			
	}else{
		--elm;		
	}
	berria(elm);
}

function aurrekoaB(){
	console.trace({elm});
	audioPlayer.pause();
	if(!perts){
		if(elm==0){
			var elemAurekoa = nextsrc.length-1;
		}else{
			var elemAurekoa=elm-1;
		}			
		var kenketa=audioPlayer.currentTime-(media.currentTime-denborak[pausuak.indexOf(balioak[elm])][0])-(denborak[pausuak.indexOf(balioak[elemAurekoa])][1]-denborak[pausuak.indexOf(balioak[elemAurekoa])][0]);
		console.log("ATZERA AudioLuzeera:"+audioLuzeera+" VideoLuzeera:"+ media.duration +" kenketa:"+kenketa+" bideoMomentua:"+bideoMomentua);
		if( kenketa<=0){
			audioPlayer.currentTime=0;
			elm=1;
			console.log('audioPlayer.currentTime'+audioPlayer.currentTime);
		}else{
			audioPlayer.currentTime=kenketa;
			console.log('audioPlayer.currentTime'+audioPlayer.currentTime);		
		}	
	}
	aurrekoa();
}

function hurrengoa(){
	if(elm==nextsrc.length-1){
		elm=0;
		if(audioPlayer!=null){
		//audioLuzeraAurreraAldatu();
		}
		berria(elm);	
	}else{
		++elm;
		if(audioPlayer!=null){
			//audioLuzeraAurreraAldatu();
			}
		berria(elm);	
	}
}

function hurrengoaB(){
	console.trace({elm});
	audioPlayer.pause();
	if(!perts){
		audioPlayer.currentTime=audioPlayer.currentTime-(media.currentTime-denborak[pausuak.indexOf(balioak[elm])][0])+(denborak[pausuak.indexOf(balioak[elm])][1]-denborak[pausuak.indexOf(balioak[elm])][0]);
	}
	hurrengoa();
}

function berria(elm){
	
	media.src = nextsrc[elm];
	denboraAldatu();
	media.play();
	audioPlayer.play();
	playIcon.className="fas fa-pause fa-lg";
	nagusia(elm,balioak);
	console.log(media.duration);
	//fetchVideoAndPlay(nextsrc[elm]);
	console.log("Elm:"+elm+" Src:"+media.src+" berriaN");
	
}

function denboraAldatu(){
	if(!perts){
		media.currentTime=denborak[pausuak.indexOf(balioak[elm])][0];
		media.setAttribute('poster', "video/white.jpeg");
	}
	else{
		media.setAttribute('poster', "video/output.jpg");
	}
}

function berriaB(elm){	
	media.src = nextsrc[elm];
	denboraAldatu();
	console.log(media.duration);
	if(audioPlayer!=null){
		audioPlayer.currentTime=0;
	}
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
			abiaduraIcon.style.color="#EB6F25";
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
			loopIcon.style.color="#EB6F25";
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
	   return !!(document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenelment || document.fullscreenelment);
	}

var setFullscreenData = function(state) {
	   video.setAttribute('data-fullscreen', !!state);
	}

document.addEventListener('fullscreenchange', function(e) {
	   setFullscreenData(!!(document.fullscreen || document.fullscreenelment));
	});
	document.addEventListener('webkitfullscreenchange', function() {
	   setFullscreenData(!!document.webkitIsFullScreen);
	});
	document.addEventListener('mozfullscreenchange', function() {
	   setFullscreenData(!!document.mozFullScreen);
	});
	document.addEventListener('msfullscreenchange', function() {
	   setFullscreenData(!!document.msFullscreenelment);
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
			muteIcon.style.color="#EB6F25";
			media.muted=true;
			ixildu=0;
			console.log("Mute:"+true+ixildu);
					}
		
	}


//Aukeratutako bideoen zerrenda erakutsi pantaila eraksuterakoan

document.body.onload = elmentuaGehitu(balioak);
document.body.onload = dantzaAldatuSelect();

function elmentuaGehitu (balioakSartu) {
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
	  listaIzena[v].className="level-item is-clickable title is-6";
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
  //audioBistaratu();
  audioCardBistaratu();
  nagusia(0,balioakSartu);
}

//Erreproduzitzen ari den balioa beltzen jarri
function nagusia(elm,balioakSartu){
	var elmentua;
	for(var v=0;v<balioakSartu.length;v++){
		if(v==elm){
			elmentua = document.getElementById(v);
			elmentua.style.fontWeight="bold";
			elmentua.className="level-item is-clickable title is-5";
		}
		else{
			elmentua = document.getElementById(v);
			elmentua.style.fontWeight="normal";
			elmentua.className="level-item is-clickable title is-6";
			
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
	elmentuaGehitu(balioak);
	balioakPasa();
	}	
}

//bideo bat listan behera egin
function jeitsi(value){
	elm=value;
	if(elm!=balioak.length-1){
		console.log("gora:"+array_move(balioak,elm,elm+1));
		divEzabatu();
		elmentuaGehitu(balioak);
		balioakPasa();
	}
	
}

//bideo listatik kendu
function kenduPausua(value){
	elm=value;
	console.log("kendu:"+balioak.splice(elm,1)+" balioa:"+balioak);
	divEzabatu();
	elmentuaGehitu(balioak);
	balioakPasa();
}



//JavaScripten array batean elmentuak toki abtetik bestera mugitzeko funtzioa
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
		elmentuaGehitu(balioak);
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
/*
function audioBistaratu(){
	var audioSelect = document.getElementById("audioSelect");
	//<select name="balioa">
	//<option value="A"> A</option>
	
	for(var v=0;v<audioak.length;v++){
		//console.log("HEMEN  gehitu.length:"+gehitu.length+" v:"+v);
		audioSelect.options[v]=new Option(audioak[v],audioak[v]);
	}
	  
}*/

function audioAldatu(){
	var value =aukeratutakoAudioa;
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
	if(!perts){
		audioPlayer.muted=false;
	}
}

function audioLuzeraAurreraAldatu(){
	var value =aukeratutakoAudioa;
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
	var value =aukeratutakoAudioa;
	if(value!="" && value!="OSOA"){
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
	}else if(value=="OSOA"){
		media.onloadedmetadata=function(){
			if(elm==(balioak.length-1)){
				var elemAurekoa = 0;
			}else{
				var elemAurekoa=elm+1;
			}			
			var kenketa=audioPlayer.currentTime-(bideoMomentua-denborak[pausuak.indexOf(balioak[elemAurekoa])][0])-(denborak[pausuak.indexOf(balioak[elm])][1]-denborak[pausuak.indexOf(balioak[elm])][0]);
			console.log("ATZERA AudioLuzeera:"+audioLuzeera+" VideoLuzeera:"+ media.duration +" kenketa:"+kenketa+" bideoMomentua:"+bideoMomentua);
			if( kenketa<=0){
				audioPlayer.currentTime=0;
				console.log('audioPlayer.currentTime'+audioPlayer.currentTime);
			}else{
				audioPlayer.currentTime=kenketa;
				console.log('audioPlayer.currentTime'+audioPlayer.currentTime);		
			}
		}
			//audioPlayer.currentTime=audioPlayer.currentTime-(media.currentTime-denborak[pausuak.indexOf(balioak[elm])][0])+(denborak[pausuak.indexOf(balioak[elm])][1]-denborak[pausuak.indexOf(balioak[elm])][0]);
			
	}
}

function audioListaErakutsi(){
	  var audioLista = document.getElementById("audioLista");
	  if(audioListaEzkutatuta==0){
		  audioLista.className="card-content bistaratu";
		  audioListaEzkutatuta=1;
	  }
	  else{
		  audioLista.className="card-content ezkutatu";
		  audioListaEzkutatuta=0;
	  }
}

function aldatuAudio(balioa){
	audioPlayer=document.getElementById("audioPlayer")
	aukeratutakoAudioa=audioak[balioa];
	console.log("audiselect: "+audioak[balioa]);
	if(balioa==4){
		dantzaAukeratuCardErakutsi(balioa);
		perts=false;
		document.getElementById("mute").disabled=true;
		media.currentTime=denborak[0][0];
	}else{
		perts=true;
		document.getElementById("mute").disabled=false;
		document.getElementById("listaNagusia").className="box";
		document.getElementById("dantzaAldatuCard").className="ezkutatu";
		document.getElementById("dantzaCard").className="ezkutatu";
		balioak=[];
		 divEzabatu();
		 nextsrc = [];
		
	}
	if(balioa==0){
		ixildu=0;
		setMute();
		audioPlayer.muted=true;
		stopMedia();
		console.log("Bideoko audioa, ixildu:"+ixildu);
		document.getElementById("audioTitulo").innerHTML="Bideoko Audioa";
	}else{
		ixildu=1;
		setMute();
		audioPlayer.src="video/J_"+audioak[balioa]+".mp3";	
		audioPlayer.load();
		console.log("Audioa:"+audioak[balioa]+"   ixildu:"+ixildu);
		document.getElementById("audioTitulo").innerHTML=audioak[balioa];
		if(balioa!=4){
			stopMedia();
		}
	}
	if(!perts){
		audioPlayer.muted=false;
	}
}

function entzun(balioa){
	var audioErreproduktorealabur = document.getElementById("laburEntzunErreproduktorea");
	aukeratutakoAudioa=audioak[balioa];
	if(audioLaburErreproduzitzen==0){
		audioErreproduktorealabur.src="video/J_"+audioak[balioa]+".mp3";
		audioErreproduktorealabur.load();
		audioErreproduktorealabur.play();
		document.getElementById(audioak[balioa]+"entzun").className="is-clickable mr-3 level-item behera fas fa-volume-mute fa-lg";
		audioLaburErreproduzitzen=1;
		console.log("audioLaburErreproduzitzen"+audioLaburErreproduzitzen+" info:"+audioak[balioa]+audioErreproduktorealabur.paused);
	}else{
		audioErreproduktorealabur.pause();
		audioErreproduktorealabur.currentTime = 0;
		document.getElementById(audioak[balioa]+"entzun").className="is-clickable mr-3 level-item behera fas fa-volume-up fa-lg";
		audioLaburErreproduzitzen=0;
		console.log("audioLaburErreproduzitzen"+audioLaburErreproduzitzen+" info:"+audioak[balioa]+audioErreproduktorealabur.paused);
	}
	
	
}

function audioCardBistaratu(){
	//<select name="balioa">
	//<option value="A"> A</option>
	var currentDiv = document.getElementById("audioLista");	  
	  var listaIzena=[];
	  var aldatu=[];
	  var entzun=[]; 
	  //var kendu=[];
	  var nextDiv=[];
	  var audioDiv=[];
	  var botoiDiv=[];
	  //var level=[];
	  console.log("currentDiv."+currentDiv.innerHTML);
  if(currentDiv.innerHTML==""){
	  for(var v=0;v<audioak.length;v++){
		  nextDiv[v]=document.createElement("nav");
		  nextDiv[v].className=audioak[v]+" level mx-4 my-3 is-mobile bideoAukera";
		  //lista izena gehitu dokumentura 
		  audioDiv[v]=document.createElement("div");
		  audioDiv[v].className="level-left audioLista";
		  listaIzena[v]=document.createElement("p");
		  listaIzena[v].value=v;
		  listaIzena[v].className="level-item is-clickable subtitle is-6";
		  listaIzena[v].setAttribute("onclick","aldatuAudio(value)");
		  listaIzena[v].id=audioak[v]+"audioa";
		  //listaIzena[v].setAttribute("onclick","erakutsi(id)");
		  if(v==0){
			  listaIzena[v].innerHTML="Bideoko audioa";  
		  }else{
			  listaIzena[v].innerHTML=audioak[v]; 
		  }	  
		  audioDiv[v].appendChild(listaIzena[v]);
		  nextDiv[v].appendChild(audioDiv[v]);
		  currentDiv.appendChild(nextDiv[v]);
		  
		  //aldatu botoia gehitu	 
		  botoiDiv[v]=document.createElement("div");
		  botoiDiv[v].className="level-right botoiLista";
		  aldatu[v]=document.createElement("i");
		  aldatu[v].value=v;
		  aldatu[v].setAttribute("onclick","aldatuAudio(value)");
		  aldatu[v].className="level-item is-clickable gora fas mx-2 fa-exchange-alt fa-lg";
		  
		  //entzun botoia gehitu
		  
		  if(v!=0){
			  entzun[v]=document.createElement("i");
			  entzun[v].value=v; 
			  entzun[v].setAttribute("onclick","entzun(value)");
			  entzun[v].id=audioak[v]+"entzun";
			  entzun[v].className="is-clickable mr-3 level-item behera mx-3 fas fa-volume-up fa-lg";
			  //behera[v].innerHTML="Jeitsi";
			  botoiDiv[v].appendChild(entzun[v]);
		  }	  
		  
		  botoiDiv[v].appendChild(aldatu[v]);
		  nextDiv[v].appendChild(botoiDiv[v]);
		  currentDiv.appendChild(nextDiv[v]);	  
	  }
  }
 }





function dantzaAukeratuCardErakutsi(balioa){
	 var audioLista = document.getElementById("dantzaAldatuCard");
	 var tituluak=document.getElementsByClassName("dantzaTitulo");
	 aukeratutakoAudioa=audioak[balioa];
	 for(var v=0; v<tituluak.length;v++){
		 tituluak[v].innerHTML=audioak[balioa];
	}
	 document.getElementById("listaNagusia").className="ezkutatu";
	 document.getElementById("dantzaCard").className="ezkutatu";
	 
	 audioLista.className="box";
	 balioak=[];
	 divEzabatu();
	 nextsrc = [];
	 media.src=null;
	 
}

function dantzaAldatuSelect(){
	var gehituSelect = document.getElementById("gehituSelect");
	gehituArraySortu();
	gehituOptUstu();
	
	//<select name="balioa">
	//<option value="A"> A</option>
	
	for(var v=0;v<pausuak.length;v++){
		var option = document.createElement("option");
		  option.text = pausuak[v];
		switch (pausuak[v].charAt(0)){
		case "A":
			document.getElementById("gehituSelectA").add(option);
			break;
		case "B":
			document.getElementById("gehituSelectB").add(option);
			break;
		case "C":
			document.getElementById("gehituSelectC").add(option);
			break;
		default:
			break;
		}
	}
	  
}

function dantzaPausuakAukeratu(){
		var valueA =document.getElementById("gehituSelectA").value;
		var valueB =document.getElementById("gehituSelectB").value;   
		var valueC =document.getElementById("gehituSelectC").value;
		balioak=[];
		balioak.push(valueA);
		balioak.push(valueB);
		balioak.push(valueC);
		console.log("gehituPausua:"+valueA+valueB+valueC+" balioa:"+balioak);
		divAukeraEzabatu();
		elmentuaAukeraGehitu(balioak);
		balioakPasa();
		document.getElementById("listaNagusia").className="ezkutatu";
		document.getElementById("dantzaAldatuCard").className="ezkutatu";
		document.getElementById("dantzaCard").className="box";
		
}

function divAukeraEzabatu(){
	var nereDiv=document.getElementById("listaDantza");
	nereDiv.innerHTML='';
}


function elmentuaAukeraGehitu (balioakSartu) {
	var currentDiv = document.getElementById("listaDantza");
	var n=0;	  
	var listaIzena=[];
	  var nextDiv=[];
	  var bideoDiv=[];
	  
	  for(var v=0;v<balioakSartu.length;v++){
		  nextDiv[v]=document.createElement("nav");
		  nextDiv[v].className=balioakSartu[v]+" level is-mobile bideoAukera";
		  //lista izena gehitu dokumentura 
		  bideoDiv[v]=document.createElement("div");
		  bideoDiv[v].className="level-left bideoLista";
		  listaIzena[v]=document.createElement("p");
		  listaIzena[v].className="level-item title is-6";
		  listaIzena[v].id=v;
		  //listaIzena[v].setAttribute("onclick","erakutsi(id)");
		  n=v+1;
		  listaIzena[v].innerHTML=n+". "+balioakSartu[v];
		  bideoDiv[v].appendChild(listaIzena[v]);
		  nextDiv[v].appendChild(bideoDiv[v]);
		  currentDiv.appendChild(nextDiv[v]);
	  }
	  //audioBistaratu();
	  nagusia(0,balioakSartu);
}

function dantzaCardAldatu(){
	stopMedia();
	media.setAttribute('poster', "video/output.jpg");
	document.getElementById("playBotoia").disabled=true;
	document.getElementById("listaNagusia").className="ezkutatu";
	document.getElementById("dantzaAldatuCard").className="box";
	document.getElementById("dantzaCard").className="ezkutatu";
}
 
function danCardAldatu(){
	audioPlayer=document.getElementById("audioPlayer");
	ixildu=0;
	setMute();
	audioPlayer.src="video/J_"+audioak[4]+".mp3";	
	audioPlayer.load();
	console.log("Audioa:"+audioak[4]+"   ixildu:"+ixildu);
	document.getElementById("audioTitulo").innerHTML=audioak[4];
	aukeratutakoAudioa=audioak[4];
	elmentuaAukeraGehitu(balioak);
	document.getElementById("listaNagusia").className="ezkutatu";
	document.getElementById("dantzaAldatuCard").className="ezkutatu";
	document.getElementById("dantzaCard").className="box";
	var tituluak=document.getElementsByClassName("dantzaTitulo");
	 for(var v=0; v<tituluak.length;v++){
		 tituluak[v].innerHTML=audioak[4];
	}
	 document.getElementById("playBotoia").disabled=false;
	 audioPlayer.muted=false;
}

media.addEventListener("timeupdate", function(){
    // check whether we have passed 5 minutes,
    // current time is given in seconds
	if(!perts){
		if(this.currentTime >= denborak[pausuak.indexOf(balioak[elm])][1] ) {
			audioPlayer.pause();
	        hurrengoa();
	    }
	}    
});



	