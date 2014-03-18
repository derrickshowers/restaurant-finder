define(['text!/templates/restaurantList.html',
	'text!/templates/restaurantDetail.html',
	'text!/templates/restaurantAddNew.html',
	'text!/templates/restaurantEdit.html'], 
	function(restaurantList, restaurantDetail, restaurantAddNew, restaurantEdit) {
		return {
			RestaurantListTemplate: restaurantList,
			RestaurantDetailTemplate: restaurantDetail,
			RestaurantAddNewTemplate: restaurantAddNew,
			RestaurantEditTemplate: restaurantEdit
		}
});
