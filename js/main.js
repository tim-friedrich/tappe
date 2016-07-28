

var init = function(){
  
  smoothScroll.init({
    speed: 1000,
    easing: 'easeInOutCubic',
    offset: 0,
    updateURL: true,
    callbackBefore: function ( toggle, anchor ) {},
    callbackAfter: function ( toggle, anchor ) {}
  });
  
  
  $(window).resize(resize);
  $(window).resize()
  setLeftHeight($('#bgm .left-bg-img'), $('#bgm .right-text'));
  setLeftHeight($('#partners .left-bg-img'), $('#partners .right-text'));
};

var resize = function(){
  var view_height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  var view_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  $('#landing').height(view_height);

  setLeftHeight($('#bgm .left-bg-img'), $('#bgm .right-text'));
  setLeftHeight($('#partners .left-bg-img'), $('#partners .right-text'));

  
  
};

var setLeftHeight = function($left, $right){ 
  
  var height = $right.height();
  $left.height(height);
}