/**
 * Init the menu setting the root menuItems.
 *
 * @public
 * @param {Array<{id: String|Number ,
  				text: String=,
  				styleClass: String=,
  				iconStyleClass: String=,
  				enabled: Boolean=,
  				data: Object=,
  				menuItems: Array=,
  				isDivider : Boolean=}>} menuItems is an array of MenuItem objects. 
  				Each MenuItem object should set the required properties 'id', which uniquely identifies the menuItem object in menu, and 'text' property.
  				The MenuItem may contain the optional properties 'styleClass', 'iconStyleClass', 'data', 'enabled', 'menuItems', 'isDivider'
 *
 * @example var menu = [{
  id: 1,
  text: "Sample Item #1",
  styleClass : "sn-large",
  iconStyleClass:  "glyphicon glyphicon-search",
  data: { description: "This is sample information that can be added to a menuItem" },
  menuItems: [{
  	id: 5,
  	text: "Sub Item #1"
  	}, {
  	id: 6,
  	text: "Sub Item #2"
  }]
  }, {
  id: 2,
  text: "Sample Item #2"
  },{
  isDivider: true
  },{
  id: 3,
  text: "Sample Item #3",
  enabled: false
  }];
  elements.sideNavigation.setRootMenuItems(menu);
 * */
$scope.api.setRootMenuItems = function(menuItems) {
	$scope.model.menu = menuItems;
	menuItems = $scope.model.menu;
}