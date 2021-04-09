
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function aukeratuPantailara(){
	var aukeratuPantaila = document.getElementById("aukeratuPantaila");
	var lehenengoPantaila = document.getElementById("lehenengoPantaila");
	var erreproduktorePantaila = document.getElementById("erreproduktorePantaila");
	
	checkAll(false);
	aukerakHasieratu();
	stopMedia();
	aukeratuPantaila.className="bistaratu";
	lehenengoPantaila.className="ezkutatu";
	erreproduktorePantaila.className="ezkutatu";
}

function lehenengoPantailara(){
	var aukeratuPantaila = document.getElementById("aukeratuPantaila");
	var lehenengoPantaila = document.getElementById("lehenengoPantaila");
	var erreproduktorePantaila = document.getElementById("erreproduktorePantaila");
	balioZero();
	audioaGelditu();
	notiEzkutatu();
	aukeratuPantaila.className="ezkutatu";
	lehenengoPantaila.className="bistaratu";
	erreproduktorePantaila.className="ezkutatu";
}

function erreproduktorePantailara(){
	var aukeratuPantaila = document.getElementById("aukeratuPantaila");
	var lehenengoPantaila = document.getElementById("lehenengoPantaila");
	var erreproduktorePantaila = document.getElementById("erreproduktorePantaila");
	audioaGelditu();
	balioakHasieratu();
	elementuaGehitu();
	notiEzkutatu();
	aukeratuPantaila.className="ezkutatu";
	lehenengoPantaila.className="ezkutatu";
	erreproduktorePantaila.className="bistaratu";
}
