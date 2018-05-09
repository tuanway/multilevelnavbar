angular.module('multilevelmenuMultilevelmenu', ['servoy']).directive('multilevelmenuMultilevelmenu', function() {
		return {
			restrict: 'E',
			scope: {
				model: '=svyModel',
				handlers: "=svyHandlers",
				api: "=svyApi",
				svyServoyapi: "=",
			},
			controller: function($scope, $element, $attrs) {
				$scope.setupMenu = function() {
					var menu = document.getElementsByClassName('nav navbar-nav')[0];
					var items = $scope.model.menu

					//setup main items
					for (var i = 0; i < items.length; i++) {
						var li = document.createElement("li");
						var a = document.createElement("a");
						li.appendChild(a);
						a.innerHTML = items[i].text;
						a.id = items[i].itemId;
						menu.appendChild(li);
						//if we have subitems
						if (items[i].menuItems) {
							a.setAttribute("class", "dropdown-toggle");
							a.setAttribute("data-toggle", "dropdown");
							a.innerHTML = items[i].text + '<b class="caret"></b>';
							//create ul elment to hold additional items
							var ul = document.createElement("ul");
							ul.setAttribute("class", "dropdown-menu");
							li.appendChild(ul);
							loop(items[i].menuItems, ul)
						}
					}

					//setup sub items
					function loop(arr, el) {
						for (var i = 0; i < arr.length; i++) {
							var li = document.createElement("li");
							var a = document.createElement("a");
							a.innerHTML = arr[i].text;
							a.id = arr[i].itemId;
							li.appendChild(a);
							if (arr[i].menuItems) {
								a.setAttribute("class", "dropdown-toggle");
								a.setAttribute("data-toggle", "dropdown");
								li.setAttribute("class", "dropdown dropdown-submenu");
								
								//create ul elment to hold additional items								
								var ul = document.createElement("ul");
								ul.setAttribute("class", "dropdown-menu");								
								li.appendChild(ul);
								//continue looping to get other possible sub items
								loop(arr[i].menuItems, ul)
							}
							if (el) {
								el.appendChild(li);
							}
						}
					}

					//expand menu when selected if we have items
					$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {							
							event.preventDefault();
							event.stopPropagation();
							$(this).parent().siblings().removeClass('open');
							$(this).parent().toggleClass('open');
						});
					
					//activate handler
					$('a').on('click', function(event) {						
						if ($scope.handlers.onMenuItemSelected){
							$scope.handlers.onMenuItemSelected(event.target.id)
						}
									
					});

				}

				if (!$scope.model.menuItems) {
					$scope.model.menuItems = [];
				}
				$scope.setupMenu();
			},
			templateUrl: 'multilevelmenu/multilevelmenu/multilevelmenu.html'
		};
	})