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

				/**
				 * If mobile menu is open, close it.
				 * @private
				 */
				$scope.closeMenu = function() {
					setTimeout(function() {
							var toggle = angular.element(document.getElementsByClassName('navbar-toggle'))
							if (!toggle[0].classList.contains('collapsed')) {
								toggle.trigger('click');
							}
						}, 0);

				}

				$scope.setupMenu = function() {
					console.log($scope.model.svyMarkupId)
					var menu = document.getElementById($scope.model.svyMarkupId);
					console.log(menu)
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

						var ic = items[i].iconStyleClass == null ? '' : items[i].iconStyleClass;
						//if we have an icon style class create div element for icon;
						if (ic) {
							a.innerHTML = '<div class="' + ic + '"></div> ' + a.innerHTML
						}

						//if we have an image
						if (items[i].imageSrc) {

							a.innerHTML = '<img class="' + items[i].imageStyleClass + ' img-icon" src="' + items[i].imageSrc + '"></img> ' + a.innerHTML
						}

						//if an item is disabled
						if (!items[i].enabled) {
							a.setAttribute("class", "disabled");
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

							//if we have a seperator:
							if (arr[i].isDivider) {
								var sep = document.createElement("li");
								sep.setAttribute("role", "separator");
								sep.setAttribute("class", "divider");
								li.appendChild(sep);
							}

							var ic = arr[i].iconStyleClass == null ? '' : arr[i].iconStyleClass;
							var sc = arr[i].styleClass == null ? '' : ' ' + arr[i].styleClass
							li.setAttribute("class", sc);
							//if we have an icon style class create div element for icon;
							if (ic) {
								a.innerHTML = '<div class="' + ic + '"></div> ' + a.innerHTML
							}

							//if we have an image

							console.log(arr[i])
							if (arr[i].imageSrc) {
								a.innerHTML = '<img class="' + arr[i].imageStyleClass + ' img-icon" src="' + arr[i].imageSrc + '"></img> ' + a.innerHTML
							}

							if (arr[i].menuItems) {
								a.setAttribute("class", "dropdown-toggle");
								a.setAttribute("data-toggle", "dropdown");
								li.setAttribute("class", "dropdown dropdown-submenu" + sc);

								//create ul elment to hold additional items
								var ul = document.createElement("ul");
								ul.setAttribute("class", "dropdown-menu");
								li.appendChild(ul);
								//continue looping to get other possible sub items
								loop(arr[i].menuItems, ul)
							}

							//if an item is disabled
							if (!arr[i].enabled) {
								a.setAttribute("class", "disabled" + sc);
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
							$(this).parent()[0].className = 'dropdown dropdown-submenu open'
						});

					//activate handler
					$('a').on('click', function(event) {
							if (event.target.classList.contains('disabled')) {
								event.preventDefault();
								event.stopPropagation();
								return;
							}
							if ($scope.handlers.onMenuItemSelected) {
								if (!event.target.classList.contains('dropdown-toggle')) {
									$scope.closeMenu();
								}
								//if item is disabled, return null;
								$scope.handlers.onMenuItemSelected(event.target.id)
							}

						});

				}

				if (!$scope.model.menuItems) {
					$scope.model.menuItems = [];
				}

				// wait that model is syncronized with the server
				$scope.$watch("model.svyMarkupId", function(newValue, oldValue) {
						if (newValue) {
							setTimeout(function() {
									$scope.setupMenu();
								}, 200);
						}
					});

			},
			templateUrl: 'multilevelmenu/multilevelmenu/multilevelmenu.html'
		};
	})