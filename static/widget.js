var widget = {
  _DIV_ID: "widget",

  _instances: null,
  _div: null,

  _loadEC2DataAsync: function() {
    var js = document.createElement("script");
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src',  '/ec2_data.js?cb=widget.cb');

    this._div.appendChild( js );    
  },

  _update: function() {
    this._div.innerHTML = "";

    var ul = document.createElement("ul");

    for ( var i = 0, li = null, inst = null; i < this._instances.length; i++ ) {
      inst = this._instances[i];

      li = document.createElement("li");
      li.innerHTML = "Instance: " + inst.id + " | state: " + inst.state + " | Launch time: "+ inst.launch_time  + " | Placement: "+ inst.placement

      ul.appendChild(li);
    }

    this._div.appendChild(ul);
  },

  cb: function( data ) {
    this._instances = data;
    this._update();
  },

  init: function() {
    this._div = document.getElementById( this._DIV_ID );

    this._div.innerHTML = "Loading EC2 instances data ... Please wait";

    this._loadEC2DataAsync();
  }
};

window.onload = function() {
  widget.init();
}
