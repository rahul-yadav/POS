pointOfSale.controller('TransactionResult', function($scope){
	$scope.isDialogVisible = false;
	
	$scope.$on('showTransactionResultModalDialog', function(event, totalAmountRecieved){
		$scope.isDialogVisible = true;
		$scope.totalAmountRecieved = totalAmountRecieved;
	});

	$scope.newTransaction = function(){
		$scope.$emit('startNewTransaction');
		$scope.isDialogVisible = false;
	}

});