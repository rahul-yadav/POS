pointOfSale.controller('ProductsListing', function($scope, productsStore, $http){
	$scope.productsList = [];
	$scope.productCategories = [];

	var productListingAreaWidth = angular.element(document).find('.products-pane').width();
	$scope.numColumns = [];
	$scope.numColumns.length = Math.floor(productListingAreaWidth/124);

	loadProducts();

	function handleSuccess(data, status) {
     $scope.productsList = data;
		$scope.productCategories = [];
		angular.forEach($scope.productsList, function(product){
		  var category = product.category;
			if($scope.productCategories.indexOf(category) === -1){
				$scope.productCategories.push(category);
			}
		});
		setTimeout(initTabStrip, 100);
  };
  function loadProducts(){
  	productsStore.getProducts().success(handleSuccess);
  }

	$scope.addToCart = function(product){
	  $scope.$broadcast('addToCart', product);
	};
});