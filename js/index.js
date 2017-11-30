// parallax section
'use strict';

var body = document.body;
var content = document.querySelector('.js-content');
var blocks = document.querySelectorAll('.block');

var updateOffset = function updateOffset() {
  requestAnimationFrame(updateOffset);
  body.style.setProperty('--y', content.scrollTop);
  updateProps();
};

var updateProps = function updateProps() {
  var i = -1;
  for (var _iterator = blocks, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var block = _ref;

    i += 1;
    var top = blocks[i].getBoundingClientRect().top;
    if (top < window.innerHeight * 1.3 && top > window.innerHeight * -1.3) {
      body.style.setProperty('--yBlock-' + (i + 1), top);
    } else {
      body.style.setProperty('--yBlock-' + (i + 1), 0);
    }
  }
};

updateProps();
updateOffset();



// actionable steps animation
var stepForm = {
  init: function() {
    stepForm.build();
    $(".js-step-next").click(stepForm.next);
    $(".js-step-prev").click(stepForm.prev);
    $(".js-step-goto").click(stepForm.goTo);
  },
  build: function() {
    var nextBtn   = "<button class='js-step-next'>Next</button>",
        prevBtn   = "<button class='js-step-prev'>Prev</button>",
        container = "<div class='step-controls'></div>";
    
    $(".step-form .step").append(container);
    
    $(".step-form .step").each(stepForm.attrData);
    
    var gotoWrapper = "<div class='step-goto'></div>";
    
    $(".step-form").prepend(gotoWrapper);
    $(".step-form .step").each(stepForm.addGoToItems);
    $(".step-form .goto-item").each(stepForm.attrData);
    $(".step-form .goto-item:first").addClass("active");
  },
  addGoToItems: function(index) {
    var gotoLabel = index + 1,
        gotoItem  = "<span class='goto-item js-step-goto'>" + gotoLabel + "</span>";
    
    $(".step-goto").append(gotoItem);
  },
  attrData: function(index) {
    $(this).attr("data-step", index);
  },
  prev: function() {
    var step = stepForm.getStep($(this).closest(".step")) - 1;
    $(".steps").css("transform", "translateX(-" + step + "00vw)");
  },
  next: function() {
    var step = stepForm.getStep($(this).closest(".step")) + 1;
    $(".steps").css("transform", "translateX(-" + step + "00vw)");
  },
  goTo: function() {
    var step = stepForm.getStep($(this));
    $(".step-goto .goto-item").removeClass("active");
    $(this).addClass("active");
    $(".steps").css("transform", "translateX(-" + step + "00vw)");
  },
  getStep: function(container) {
    var step = parseInt(container.data("step"));
    return step;
  }
};

$(document).ready(stepForm.init);