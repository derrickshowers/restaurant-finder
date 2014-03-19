define(['text!/templates/restaurantList.html',
	'text!/templates/restaurantDetail.html',
	'text!/templates/restaurantAddNew.html',
	'text!/templates/restaurantEdit.html',
	'text!/templates/restaurantAddSpecial.html'], 
	function(restaurantList, restaurantDetail, restaurantAddNew, restaurantEdit, restaurantAddSpecial) {
		return {
			RestaurantListTemplate: restaurantList,
			RestaurantDetailTemplate: restaurantDetail,
			RestaurantAddNewTemplate: restaurantAddNew,
			RestaurantEditTemplate: restaurantEdit,
			RestaurantAddSpecialTemplate: restaurantAddSpecial
		}
});
