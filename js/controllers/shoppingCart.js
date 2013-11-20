
pointOfSale.controller('ShoppingCart', function($scope, $filter, productsStore){
		$scope.selectedProducts = [];
		$scope.discountsApplied = [];

		$scope.totalPrice = 0;
		var totalDiscount = 0;

		function addToCart(product){
			var productAlreadyInCart =	findProductInstanceInCollection($scope.selectedProducts,product.id);
			if(productAlreadyInCart){
				productAlreadyInCart.count += 1;
				$scope.totalPrice += productAlreadyInCart.price;
			}else{
				product.count = product.count || 1;
				$scope.selectedProducts.push(product);
				$scope.totalPrice += product.price * product.count;
			}
		};

		$scope.$on('addToCart', function(event, selectedProduct) {
			addToCart(selectedProduct);
		});

		$scope.$on('addManualProductToCart', function(event, product) {
			addToCart(product);
		});

		$scope.$on('addDiscountToCart', function(event, discount) {
			$scope.discountsApplied.push(discount);			
		});

		$scope.getDiscountedTotal = function(){
			var discountableProducts = $filter('filter')($scope.selectedProducts, {isDiscountable:true}, true);
			totalDiscount = 0;
			if($scope.discountsApplied.length){
				angular.forEach($scope.discountsApplied, function(discount){
					discount.amount = 0;
				});
				angular.forEach(discountableProducts, function(product){
					var productUnitPrice = product.price;
					var discountOnUnitItem = 0;
						angular.forEach($scope.discountsApplied, function(discount){
							var discountAmount = ((productUnitPrice * discount.percentage)/100);
							discountOnUnitItem += discountAmount;
							productUnitPrice -= discountAmount;
							discount.amount +=  product.count * discountAmount;
						});
						totalDiscount += product.count * discountOnUnitItem;
				});
			}
			return $scope.totalPrice - totalDiscount;

		}
		$scope.incrementQuantity = function(productId){
			var product =	findProductInstanceInCollection($scope.selectedProducts,productId);
			product.count += 1;
			$scope.totalPrice += product.price;
		};

		$scope.decrementQuantity = function(productId){
			var product =	findProductInstanceInCollection($scope.selectedProducts,productId);
			product.count -= 1;
			if(product.count === 0){
				removeProduct(product);
			}
			$scope.totalPrice -= product.price;
		};
		
		$scope.removeDiscount = function(productId){
			$scope.discountsApplied.splice(getProductIndexInArray($scope.discountsApplied,productId),1);
		}

		$scope.clearCart = function(){
			angular.forEach($scope.selectedProducts, function(product){
				product.count = 0;
			});
			$scope.selectedProducts = [];
			$scope.discountsApplied = [];

			$scope.totalPrice = 0;	
		}

		$scope.$on('initializePayment', function(event, paymentType) {
			//Make AJAX CALL WITH POST DATA
			var data = {
				price: $scope.totalPrice,
				discount: totalDiscount,
				paymentType: paymentType,
				payablePrice: $scope.totalPrice - totalDiscount,
				selectedProducts: $scope.selectedProducts,
				discounts: $scope.discountsApplied
			}

			productsStore.processPayment(data).
				success(function(data, status){
    			$scope.$broadcast('showTransactionResultModalDialog', data);
				}).
				error(function(){
	        console.log("failed");
				});
		});
		$scope.$on('startNewTransaction',function(event){
				// Logic for reloading the cart products
				$scope.selectedProducts = [];
				$scope.discountsApplied = [];

				$scope.totalPrice = 0;
		});
		function removeProduct(product){
			$scope.selectedProducts.splice(getProductIndexInArray($scope.selectedProducts,product.id),1);
		}
		function getProductIndexInArray(array,productId) {
		  for (var i = 0; i < array.length; i++) {
		    if (array[i].id === productId) {
		      return i;
		    }
		  }
		  return -1;
		}

		function findProductInstanceInCollection(array, productId){
			var result = $filter('filter')(array, {id:productId}, true)
			return result[0] || null;
		}

		$scope.showAddManualProductModal = function(){
			$scope.$broadcast('showAddManualProductModalDialog');
		}
		$scope.showCreateDiscountModalDialog = function(){
			$scope.$broadcast('showCreateDiscountModalDialog');
		}
});