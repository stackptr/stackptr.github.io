$(function(){
  var events = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';

  var animCallback = function(el, cb){
    el.on(events, function(e){
  		if (e.target === e.currentTarget){
  			cb();
        el.off(events);
  		}
  	});
  };


  var $avatar = $('.avatar'),
      $header = $('.title'),
      $resume = $('.resume'),
      $body = $('article'),
      $social = $('.social > li');

  var animSocial = function(){
    var animQueue = [];
    $social.each(function(){
      var el = $(this);
      animQueue.push(function(){
        el.removeClass('initial');
      });
    });

    animQueue.push(function(){
      $resume.removeClass('initial');
    });

    var i = 0;
    var intervalId = window.setInterval(function(){
      animQueue[i++]();
      if (i === animQueue.length){
        window.clearInterval(intervalId);
      }
    }, 100);
  };

  window.setTimeout(function(){
    animCallback($avatar, function(){
      animCallback($header, function(){
        $body.removeClass('initial');
      });
      $header.removeClass('initial');
      animSocial();
    });
    $avatar.removeClass('initial');
  }, 300);
});
