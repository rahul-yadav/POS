pointOfSale.controller('Discounts', function($scope){
	$scope.isDialogVisible = false;
	$scope.discountPercent = '';
	$scope.reason = '';
	
	$scope.$on('showCreateDiscountModalDialog', function(event){
		$scope.isDialogVisible = true;
	});

	$scope.applyDiscount = function(){
		var product = {
			id : generateId(5),
			count : 1,
			amount: 0,
			image: 'img/percentage-icon.png',
			percentage: parseFloat($scope.discountPercent),
			name: $scope.discountPercent + '% discount',
			unit: 1,
			isDiscountValue: true,
			reason: $scope.reason
		}
		$scope.$emit('addDiscountToCart',product);
		$scope.hideModalDialog();
	}

	$scope.hideModalDialog = function(){
		$scope.isDialogVisible = false;
		clearPopup();
	}
	
	function clearPopup(){
		$scope.discountPercent = '';
		$scope.reason = '';
		$scope.addDiscount.$setPristine();
	}

	var  generateId = (function(){
			var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
			return function (length) {
			    var result = '';
			    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
			    return result;
			}
	})();
});