pointOfSale.controller('UserDefinedProducts', function($scope){
	$scope.isDialogVisible = false;
	
	$scope.$on('showAddManualProductModalDialog', function(event){
		$scope.isDialogVisible = true;
	});

	$scope.addToCart = function(){
		var product = {
			id : generateId(5),
			count : parseInt($scope.newProduct.quantity,10),
			image: 'img/placeholder.jpg',
			name: $scope.newProduct.name,
			isDiscountable: $scope.newProduct.isDiscountable,
			price: parseFloat($scope.newProduct.price),
			unit: parseInt($scope.newProduct.quantity,10),
		}
		$scope.$emit('addManualProductToCart',product);
		$scope.hideModalDialog();
	}

	$scope.hideModalDialog = function(){
		$scope.isDialogVisible = false;
		clearPopup();
	}
	
	function clearPopup(){
		$scope.newProduct = {
			name: '',
			price: '',
			quantity: '',
			isDiscountable: false
		};
		$scope.addProduct.$setPristine();
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