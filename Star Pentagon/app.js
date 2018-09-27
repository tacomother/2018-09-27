window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

var c = document.getElementById("canv");
c.width = window.innerWidth;
c.height = window.innerHeight;

var $ = c.getContext("2d");
var i = 0;

var tri = {
  obj: {
    num: 30,
    step: Math.PI / 250,
    rad: 100
  },

  draw_: function($) {
    var rot = Math.sin(12) * 2 * Math.PI;
    $.globalCompositeOperation = "lighter";
    for (var n = 0; n < 15; ++n) {
      $.scale(1.5, 1.5);
      $.beginPath();
      $.fillStyle = "hsla(" + i * 6 + ", 80%, 50%,1)";
      $.fillRect(8.5, 8.5, 0.45, 0.45);
      $.fill();

      $.beginPath();
      $.fillStyle = "hsla(" + i * 3 + ", 80%, 50%,1)";
      $.arc(50, 50, 0.75, 0, Math.PI * 2, false);
      $.fill();
    }
    $.rotate(rot);
    $.beginPath();
    $.filStyle = "hsla(" + i * 8 + ",80%, 40%,1)";
    $.arc(8.5, 8.5, 0.55, 0, 2 * Math.PI, false);
    $.fill();
  }
};

function Obj(mid, off_, step, rt) {
  this.mid = mid;
  this.off_ = off_;
  this.step = step;
}

Obj.prototype.draw = function($) {
  this.step += tri.obj.step;
  $.save();
  $.translate(this.mid.x, this.mid.y);
  $.rotate(this.step + this.off_);
  tri.draw_($);

  $.restore();
};

var arr = [];
for (var i = 0; i < tri.obj.num; i++) {
  var t = (i * Math.PI * 2) / tri.obj.num;
  arr.push(
    new Obj(
      {
        x: c.width / 2 + tri.obj.rad * Math.cos(t * 6),
        y: c.height / 2 + tri.obj.rad * Math.sin(t * 6)
      },
      t,
      Math.PI * i * 5
    )
  );
}

var go = function() {
  $.save();
  $.fillStyle = "hsla(0,0%,0%,.9)";
  $.fillRect(0, 0, c.width, c.height);

  for (var i in arr) {
    arr[i].draw($);
  }
  $.restore();
};

var run = function() {
  window.requestAnimFrame(run);
  go();
  i -= 0.5;
};

window.addEventListener(
  "resize",
  function() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  },
  false
);

run();
