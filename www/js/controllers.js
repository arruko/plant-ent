angular.module('app.controllers', [])
  
.controller('inicioCtrl', function($scope, $state) {
	$scope.goToPorque = function() {
		$state.go('tabsController.porque');
	}

	$scope.goToComo = function() {
		$state.go('tabsController.como');
	}

	$scope.goToDonde = function() {
		$state.go('tabsController.donde');
	}
})
   
.controller('vosCtrl', function($scope, $state) {
	$scope.goToMiBosque = function() {
		$state.go('tabsController.mibosque');
	}

	if(localStorage.gotomibosque == 1) {
		localStorage.clear('gotomibosque'); 
		$state.go('tabsController.mibosque');
	}
})
   
.controller('nosotrosCtrl', function($scope, $state) {

	$scope.goToPlantados = function() {
		$state.go('tabsController.plantados');
	}

	$scope.goToRepositorio = function() {
		$state.go('tabsController.repositorios');
	}

})

.controller('porqueCtrl', function($scope, $ionicPopup) {
	var alertPopup = $ionicPopup.show({
	    template: '<p>Este mapa muestra el incremento de la temperatura durante los últimos 100 años Costa Rica</p><p>¡Deslice la barra del final de la pantalla!</p>',
	    buttons: [{ text: 'OK', type: 'button-balanced'}]
	});

	$scope.co2 = 8000;

  $scope.data = {
    year : 1990
  }


  $scope.$watch('data.year', function() {
      $scope.co2 = (8000 + ($scope.data.year - 1990) * 428)
      $scope.co2Width = $scope.co2 * 100 / 14000;
  });

  angular.extend($scope, {
        center : {
          lat: 9.933333,
          lng: -84.083333,
          zoom: 7
        },
        markers: {},
        defaults: {
            scrollWheelZoom: false
        },
        events: {
            map: {
                enable: ['zoomend', 'zoomstart', 'drag', 'click', 'mousemove'],
                logic: 'emit'
            }
        },
        icons: {
        },
        layers: {
            baselayers: {
                mapbox_light: {
                    name: 'Temperaturas',
                    url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                    type: 'xyz',
                    layerOptions: {
                        apikey: 'pk.eyJ1IjoiamltbXloZXJyZXJhZyIsImEiOiJjaW5lMTBrcDUweGJndjBrcWVzaXQzbmw1In0.AFQlhqA9oBtM9j8Xy8DABg',
                        mapid: 'mapbox.mapbox-terrain-v2'
                    }
                },
            },
            overlays: {
                tree: {
                    type: "markercluster",
                    name: 'tree',
                    visible: true,
                    layerOptions: {
                        showOnSelector: false
                    },
                    layerParams: {
                        showOnSelector: false
                    }
                },
            }
        },
        
    });
})

.controller('comoCtrl', function($scope, $ionicPopup) {
	var alertPopup = $ionicPopup.show({
	    template: '<p>Los árboles tienen la capacidad de contener dentro de sí mismos el CO<sub>2</sub></p><p>¿Qué pasa si aumentamos el numero de árboles?</p><p>¡Deslice la bara del final de la pantalla!</p>',
	    buttons: [{ text: 'OK', type: 'button-balanced'}]
	});
	/*var alertPopup = $ionicPopup.show({
	    template: '<p>El aumento de la temperatura está dada por varias causas humanas y naturales, entre esas la liberación de CO<sub>2</sub> a la atmósfera</p><p>Si plantamos árboles estos atraparán el C0<sub>2</sub> en su tronco</p><p>Además sembrar árboles en zonas aptas para reforestación regenera el hábitat de muchos animales y restaura corredores biólogicos</p>',
	    buttons: [{ text: 'OK', type: 'button-balanced'}]
	});*/
	$scope.data = {
    trees: 0
  };
	$scope.co2 = 14000;

  $scope.$watch('data.trees', function() {
      $scope.co2 = Math.floor(14000 - ($scope.data.trees) * 0.22);
      $scope.co2Width = $scope.co2 * 100 / 14000;
  });

  angular.extend($scope, {
        center : {
          lat: 9.933333,
          lng: -84.083333,
          zoom: 7
        },
        markers: {},
        defaults: {
            scrollWheelZoom: false
        },
        events: {
            map: {
                enable: ['zoomend', 'zoomstart', 'drag', 'click', 'mousemove'],
                logic: 'emit'
            }
        },
        icons: {
        },
        layers: {
            baselayers: {
                mapbox_light: {
                    name: 'Temperaturas',
                    url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                    type: 'xyz',
                    layerOptions: {
                        apikey: 'pk.eyJ1IjoiamltbXloZXJyZXJhZyIsImEiOiJjaW5lMTBrcDUweGJndjBrcWVzaXQzbmw1In0.AFQlhqA9oBtM9j8Xy8DABg',
                        mapid: 'mapbox.mapbox-terrain-v2'
                    }
                },
            },
            overlays: {
                tree: {
                    type: "markercluster",
                    name: 'tree',
                    visible: true,
                    layerOptions: {
                        showOnSelector: false
                    },
                    layerParams: {
                        showOnSelector: false
                    }
                },
            }
        },
        
    });
})

.controller('dondeCtrl', function($scope, $timeout, $state) {
	$scope.finishedLoading = false;
	$timeout(function() {
    	$scope.finishedLoading = true;
   	}, 2000);

   	$scope.goToDonde1 = function() {
		$state.go('tabsController.donde1');
	}
})

.controller('donde1Ctrl', function($scope, $state) {
	$scope.goToMiBosque = function() {
		localStorage.gotomibosque = 1;
		$state.go('tabsController.vos');
	}
})

.controller('mibosqueCtrl', function($scope) {
	$scope.dia1 = true;
})

.controller('plantadosCtrl', function($scope, $timeout) {
	var latitudes = [9.9154433, 9.931647, 9.932906, 9.929894, 9.930471, 9.935674, 9.947561]
	var longitudes = [-84.076412, -84.085176, -84.099796, -84.093818, -84.087903, -84.073954, -84.084991]
	angular.extend($scope, {
                center : {
                  lat: 9.933333,
                  lng: -84.083333,
                  zoom: 14
                },
                markers: {},
                defaults: {
                    scrollWheelZoom: false
                },
                events: {
                    map: {
                        enable: ['zoomend', 'zoomstart', 'drag', 'click', 'mousemove'],
                        logic: 'emit'
                    }
                },
                icons: {
                  icon: {
                      iconUrl: 'img/marker.png',
                      //shadowUrl: 'examples/img/leaf-shadow.png',
                      iconSize:     [32, 32], // size of the icon
                      //shadowSize:   [50, 64], // size of the shadow
                      iconAnchor:   [16, 32], // point of the icon which will correspond to marker's location
                      //shadowAnchor: [4, 62],  // the same for the shadow
                      popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
                  }
                },
                layers: {
                    baselayers: {
                        googleTerrain: {
                            name: 'Google',
                            layerType: 'ROADMAP',
                            type: 'google',
                            layerOptions: {
                                showOnSelector: false
                            }
                        },
                    },
                    overlays: {
                        tree: {
                            type: "markercluster",
                            name: 'tree',
                            visible: true,
                            layerOptions: {
                                showOnSelector: false
                            },
                            layerParams: {
                                showOnSelector: false
                            }
                        },
                    }
                },
                
            });

	
	$scope.markers = {};

    for (var i = 0; i < latitudes.length; i++) {

            

            var content = '<div style="text-align: center;" id="content"><div><img style="width: 40px; height:40px; border-radius: 50%" src="img/avatar.png"><p style="margin: 0px">Ana P.</p></div> <br><img style="width: 100px; height: 100px; border-radius: 50%;" src="img/cortezamarillosq.jpg" ng-click="goToMiBosque()"><p style="margin: 0px">27 días</p></div>';


            $scope.markers['m'+i] = {
                lat: latitudes[i],
                lng: longitudes[i],
                icon: $scope.icons.icon,
                message: content,
                compileMessage: true,
                layer: "tree"
            };

    }


})

.controller('repositoriosCtrl', function($scope) {
	
})
    