
var pointOfSale = angular.module('pointOfSale',['components']);

pointOfSale.directive('preventDefaultAction', function() {
	    return{
	    	restrict: 'A',
	    	link: function(scope, element, attrs) {
	        element.bind('click', function(event) {
	            event.preventDefault();
	        })
	      }
	    };
});
pointOfSale.directive('focus', function () {
  return function (scope, element, attrs) {
    attrs.$observe('focus', function (newValue) {
      newValue === 'true' && element[0].focus();
    });
  }
});

pointOfSale.filter("myFilter", function(){
    return function(input, columns){
        var filtered = [];
        for(var x = 0; x < input.length; x+= columns){
             filtered.push(input[x]);   
        }
        return filtered;
    }
});




//Initial Height Setting

$(function(){
  function _orientationHandler(){
    var viewportHeight = $(window).height();
    $('.main-content').css('height', viewportHeight - 60);
  }
  $(window).bind('orientationchange', _orientationHandler);
  _orientationHandler();
  document.getElementById('contentWrapper').onclick = function(){};
});

function initTabStrip(){
  var $tabStrip = $('.nav-tabs'),
      tabStripWidth = $tabStrip.width(),
      $tabs = $tabStrip.find(' > li'),
      $tabbableDiv = $('.tabbable'),
      $overflowDiv = $('.overflow-tabs'),
      $overFlowTabsContainer,    
      totalTabsWidth = 0,
      
      viewableTabsCount = $tabs.length;
      
  if(!$overflowDiv.length){
    $tabStrip.append('<li class="overflow-tabs"><button class="btn-dark open-overlay">&or;</button><ul class="nav-tabs"></ul><li>');
    $overflowDiv = $('.overflow-tabs');

    $overflowDiv.find('.open-overlay').on('click', function(){
      if($overFlowTabsContainer.hasClass('active')){
        hideOverflowTabSelector();
      }else{
        showOverflowTabSelector();
      }
    });
  }
  $overFlowTabsContainer = $overflowDiv.find('ul');
  $overflowDiv.addClass('hidden');
  $overFlowTabsContainer.empty();

  var isTabsDropdownRequired = false;
  $tabs.each(function(index){
    totalTabsWidth += $(this).width();
    if(!$(this).hasClass('overflow-tabs')){
      if(totalTabsWidth + 44 < tabStripWidth){
        viewableTabsCount = index + 1;
      }else{
        isTabsDropdownRequired = true;
        $(this).addClass('floating');
        $(this).appendTo($overFlowTabsContainer);
      }
    }
  });

  if(isTabsDropdownRequired){
    $overflowDiv.removeClass('hidden');
  }

  
    $('.floating').on('click', hideOverflowTabSelector);

  function showOverflowTabSelector(){
    $(document).on('click.overFlowTabSelector', function(event){
      if($(event.target).closest('.overflow-tabs').length === 0){
        hideOverflowTabSelector();
      }
    });
    $overFlowTabsContainer.addClass('active');
  }
  function hideOverflowTabSelector(){
    $overFlowTabsContainer.removeClass('active');
    $(document).off('click.overFlowTabSelector', hideOverflowTabSelector);
  }
};
