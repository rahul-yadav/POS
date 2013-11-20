var pointOfSaleDev = angular.module('pointOfSaleDev', ['pointOfSale', 'ngMockE2E']);
pointOfSaleDev.run(function($httpBackend) {
  var products = [
												{
													id: 4,
													category: 'food',
													image: "img/products/ice-cream.png",
													name: "Ice Cream",
													isDiscountable: false,
													price: 3.00,
													unit: 10
												},
												{
													id: 1,
													category: 'food1',
													image: "img/products/burger.png",
													name: "Burger with extra cheese",
													isDiscountable: true,
													price: 200.00,
													unit: 10
												},
												{
													id: 2,
													category: 'food2',
													image: "img/products/cake.png",
													name: "Cake",
													isDiscountable: false,
													price: 10.00,
													unit: 10
												},
												{
													id: 3,
													category: 'food3',
													image: "img/products/coffee.png",
													name: "Coffee",
													isDiscountable: true,
													price: 6.00,
													unit: 10
												},
												{
													id: 5,
													category: 'food4',
													image: "img/products/meal.png",
													name: "Meal",
													isDiscountable: false,
													price: 7.45,
													unit: 10
												},
												{
													id: 6,
													category: 'accessory',
													image: "img/products/cables.jpg",
													name: "Cables",
													isDiscountable: true,
													price: 12.75,
													unit: 10
												},
												{
													id: 7,
													category: 'accessory1',
													image: "img/products/flash.jpg",
													name: "Camera Flash",
													isDiscountable: true,
													price: 45.00,
													unit: 10
												},
												{
													id: 8,
													category: 'accessory2',
													image: "img/products/headphones.jpg",
													name: "Headphones",
													isDiscountable: false,
													price: 27.99,
													unit: 10
												},
												{
													id: 9,
													category: 'food5',
													image: "img/products/apple.png",
													name: "Apple",
													isDiscountable: true,
													price: 1.85,
													unit: 10
												},
												{
													id: 10,
													category: 'food6',
													image: "img/products/pudding.png",
													name: "Pudding",
													isDiscountable: true,
													price: 4.45,
													unit: 10
												},
												{
													id: 11,
													category: 'food7',
													image: "img/products/fish.png",
													name: "Fish & Chips",
													isDiscountable: true,
													price: 6.99,
													unit: 10
												},
												{
													id: 12,
													category: 'food8',
													image: "img/products/Chicken-leg-fry.jpg",
													name: "Chicken fry",
													isDiscountable: true,
													price: 3.96,
													unit: 10
												},
												{
													id: 13,
													category: 'food9',
													image: "img/products/meat.png",
													name: "Meat",
													isDiscountable: true,
													price: 4.25,
													unit: 10
												}
											];
 
  $httpBackend.whenGET('http://pos/products').respond(products);
 	
 	$httpBackend.whenPOST('http://pos/save').respond(function(method, url, data) {
	 	var postData = angular.fromJson(data);
	 	return [200, postData.payablePrice, {}];
  });
});


pointOfSale.factory('productsStore', function($http, $filter){
			var products = [];
			var factory = {};
			
			factory.getProducts = function(){
        return 	$http({method: 'GET', url: 'http://pos/products'});
			}
			factory.processPayment = function(data){
				return 	$http({method: 'POST', url: 'http://pos/save', data: data});
			}
			return factory;
});