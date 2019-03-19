function Flashlight() {
    console.log("Flashlight");
  // track flashlight state
 var switchStateFalse =  this._isSwitchedOn = false;
 console.log(switchStateFalse);
 var switchStateTrue =  this._isSwitchedOn = true;
 console.log(switchStateTrue);
 this.SwitchedOn = true;
 console.log(SwitchedOn);

}

Flashlight.prototype = {

  available: function (callback) {
    cordova.exec(function (avail) {
      callback(avail ? true : false);
    }, null, "Flashlight", "available", []);
  },

  switchOn: function (successCallback, errorCallback) {
      console.log("switchOn function");
    this._isSwitchedOn = true;
    cordova.exec(successCallback, errorCallback, "Flashlight", "switchOn", []);
  },

  switchOff: function (successCallback, errorCallback) {
    console.log("switchOff function");
    this._isSwitchedOn = false;
    cordova.exec(successCallback, errorCallback, "Flashlight", "switchOff", []);
  },

  toggle: function (successCallback, errorCallback) {
    if (this._isSwitchedOn) {
      this.switchOff(successCallback, errorCallback);
    } else {
      this.switchOn(successCallback, errorCallback);
      console.log("error");
    }
  }
};

Flashlight.install = function () {
  if (!window.plugins) {
    window.plugins = {};
  }

  window.plugins.flashlight = new Flashlight();
  return window.plugins.flashlight;
};

function successCallback(){
    console.log("successCallback working");
}
function errorCallback(){
    console.log("errorCallback working");

}