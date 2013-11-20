pointOfSale.controller('PaymentHandler', function($scope){
	$scope.isModalVisible = false;
	$scope.showPaymentMethods = function(){
		$scope.isModalVisible = true;
	}

	$scope.hideModalDialog = function(){
		$scope.isModalVisible = false;
	}

	$scope.Pay = function(type){
		//initPayment
		$scope.$emit('initializePayment',type);
		$scope.hideModalDialog();
	}
});