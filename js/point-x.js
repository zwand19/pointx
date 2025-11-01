$(document).ready(function(){
  $('.year').html(new Date().getFullYear());

  $('#header .logo').click(function() {window.scrollTo(0, 0);});

  $('form').submit(function(e) {
    e.preventDefault();
    $('#success-message').hide()
    $('#error-message').hide()
    $.ajax({
      url: 'https://formspree.io/f/xkgwngbq',
      method: "POST",
      data: {message: $('textarea').val(), email: $('#email-input').val(), _replyto: $('#email-input').val(), name: $('#name-input').val(), subject: 'Point X Contact'},
      dataType: 'json',
      success: function(data){
        if (data.ok || data.success) {
          $('#success-message').show()
        } else {
          $('#error-message').show()
        }
      },
      error: function(){
        $('#error-message').show()
      }
    });
  });

  $(window).scroll(checkScroll);
  checkScroll();
});

var scrolledBanner = false;
var scrolledFocuses = false;
var scrolledServices = false;

var checkScroll = function() {
  var firstScrollTime = 250
  var secondScrollTime = 500;
  if (isElementScrolledTo($('.services-sections'), 65) && !scrolledServices) {
    scrolledServices = true;
    $('.services-section.left').removeClass('out-of-view');
    setTimeout(function() {
      if (scrolledServices) { $('.services-section.center').removeClass('out-of-view'); }
    }, firstScrollTime);
    setTimeout(function() {
      if (scrolledServices) { $('.services-section.right').removeClass('out-of-view'); }
    }, secondScrollTime);
  } else if (!isElementScrolledTo($('.services-sections'), 65) && scrolledServices) {
    scrolledServices = false;
    $('.services-section.right').addClass('out-of-view');
    setTimeout(function() {
      if (!scrolledServices) { $('.services-section.center').addClass('out-of-view'); }
    }, firstScrollTime);
    setTimeout(function() {
      if (!scrolledServices) { $('.services-section.left').addClass('out-of-view'); }
    }, secondScrollTime);
  }

  if (isElementScrolledTo($('.focus-sections'), 65) && !scrolledFocuses) {
    scrolledFocuses = true;
    $('.focus-section.left').removeClass('out-of-view');
    setTimeout(function() {
      if (scrolledFocuses) { $('.focus-section.center').removeClass('out-of-view'); }
    }, firstScrollTime);
    setTimeout(function() {
      if (scrolledFocuses) { $('.focus-section.right').removeClass('out-of-view'); }
    }, secondScrollTime);
  } else if (!isElementScrolledTo($('.focus-sections'), 65) && scrolledFocuses) {
    scrolledFocuses = false;
    $('.focus-section.right').addClass('out-of-view');
    setTimeout(function() {
      if (!scrolledFocuses) { $('.focus-section.center').addClass('out-of-view'); }
    }, firstScrollTime);
    setTimeout(function() {
      if (!scrolledFocuses) { $('.focus-section.left').addClass('out-of-view'); }
    }, secondScrollTime);
  }

  if (isElementScrolledFrom('#banner', 400) && !scrolledBanner) {
    scrolledBanner = true;
    $('#header').addClass('small');
  } else if (!isElementScrolledFrom('#banner', 400) && scrolledBanner) {
    scrolledBanner = false;
    $('#header').removeClass('small');
  }
}

var isElementScrolledTo = function (element, distance) {
  var elementTop = $(element).offset().top;

  return $(window).scrollTop() + window.innerHeight - distance > elementTop;
}

var isElementScrolledFrom = function (element, distance) {
  var elementTop = $(element).offset().top;
  var elementBottom = elementTop + $(element).height();

  return $(window).scrollTop() + distance > elementBottom;
}