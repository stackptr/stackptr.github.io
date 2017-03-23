$(function(){

  // Constants
  var MIN_HEIGHT = 30,
      MAX_HEIGHT = 200;

  // Util
  var getRandom = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomHeight = function(){
    return getRandom(MIN_HEIGHT, MAX_HEIGHT);
  };


  // Animation

  var Animation = function(el){
    this.paper = Snap(el);
    this.interval = 40;

    this.BOTTOM_RIGHT_COORD = [this.interval * 20, 200];
    this.BOTTOM_LEFT_COORD = [0, 200];
  };

  Animation.prototype.getPolylinePts = function(color){

    var pts = [].concat.call(this.BOTTOM_RIGHT_COORD, this.BOTTOM_LEFT_COORD);

    for (var i = 0; i < 20; i++){
      pts.push(i * this.interval);
      pts.push(200 - getRandomHeight());
    }

    return pts;
  };

  Animation.prototype.animateLine = function(color){
    var polyline, rendered = false;

    var generate = function(){
      if (rendered){
        polyline.remove();
      }
      var pts = this.getPolylinePts();
      polyline = this.paper.polyline(pts);
      polyline.attr({
        fill: color
      });
      rendered = true;
    };

    window.setInterval(generate.bind(this), 1000);

    generate.bind(this);

  };

  Animation.prototype.start = function(){
    this.animateLine('#DF6C7E'),
    this.animateLine('#2CDABC');
  };

  var anim = new Animation('#svg');

  anim.start();

});
