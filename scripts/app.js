function load(event) {
    app.init();
}

window.addEventListener("load", load);

var app = {
    // Overlay references
    ovrradar: null,
    ovrcities: null,
    ovrcounties: null,

    // Constants
    ridgebase: 'http://radar.weather.gov/ridge/',

    // Variables
    // station: 'GRB',             // Station code; TODO: user selectable
    station: 'MKX',                // Station code; TODO: user selectable
    mode: 'NCR',                   // Start in composite mode
    source: 'radar.weather.gov',   // Image source
    timemode: 0,                   // 0: latest; 1: timelapse
    range: 'Short',

    cache: {},

    // Methods
    init: function () {
	      // Setup image references
	      this.ovrradar = document.getElementById('ovrradar');
	      this.ovrcities = document.getElementById('ovrcities');
	      this.overcounties = document.getElementById('ovrcounties');

	      this.loadOverlays();
	      this.setImages();
        //	this.startAnimationLoop();
    },

    loadOverlays: function() {
        //	if (!this.cache[this.range + this.station + 'City']) {
        //	}
	      this.ovrcities.src = this.ridgebase + 'Overlays/Cities/' + this.range +
	          '/' + this.station + '_City_' + this.range + '.gif';
	      this.overcounties.src = this.ridgebase + 'Overlays/County/' + this.range +
	          '/' + this.station + '_County_' + this.range + '.gif';
    },

    setImages: function() {
	      if (this.timemode == 0) {
	          this.ovrradar.src = this.ridgebase + 'RadarImg/' + this.mode +
		            '/' + this.station + '_' + this.mode + '_0.gif';
	      }
    },

    setMode: function(source, mode) {
	      this.source = source;
	      if (source == 'radar.weather.gov') {
	          this.mode = mode;
	          if (mode == 'N0Z') {
		            this.range = 'Long';
	          } else {
		            this.range = 'Short';
	          }
	          
	          this.loadOverlays();
	          this.setImages();
	      } else if (source == 'ssec.wisc.edu') {
	          this.mode = mode;
	      }
    },

    setTimemode: function(timemode) {
	      this.timemode = timemode;
	      this.setImages();
    },

    startAnimationLoop: function() {
	      var main = function() {
	          requestAnimationFrame(main);

	          // Clear canvas
	          app.animctx.beginPath();
	          app.animctx.clearRect(0, 0, app.anim.width, app.anim.height);
	          
	          // Animations
	          i = 0;
	          while (i < app.animations.length) {
		            if (!app.animations[i].animate(app.animctx)) {
		                app.animations.pop(i);
		            } else {
		                i += 1;
		            }
	          }
	          
	      };
	      main();
    }
};
