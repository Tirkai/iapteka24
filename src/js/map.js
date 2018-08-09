var YandexMap = (function () {
  // Get Json Data
  var pharmacyData = "";
  $.ajax({
    url: "/data/pharmacyList.json",
    success: function (resp) {
      pharmacyData = resp;
    }
  });

    function initMap() {
      _export.inited = true;
          var mapCenter = [54.513527, 36.246636],
              map = new ymaps.Map('map', {
                  center: mapCenter,
                  zoom: 9,
                  controls: []
              },{
                geoObjectOpenBalloonOnClick: false
              }),
              placemarks = [];



          var clusterer = new ymaps.Clusterer({
              clusterDisableClickZoom: false,
              clusterOpenBalloonOnClick: true,
          });
          pharmacyData.forEach(function (item, i, arr) {
            var placemark = new ymaps.Placemark(item.coords, {
                balloonContentHeader: (i + 1),
                balloonContentBody: 'Информация о метке №' + (i + 1),
                placemarkId: i
            });
            placemarks.push(placemark);
          });


          clusterer.add(placemarks);
          map.geoObjects.add(clusterer);

          map.geoObjects.events.add('click', function (e) {
            var id = (e.get('target').properties.get("placemarkId"));
            console.log(pharmacyData);
            //if(!isNaN(id)) vmGeoHelper.geoComponentContext.confirmPharmacy(id);
          });
        }
  var _export = {
    inited: false,
    buildMap: function () {
      var mapLoadAwait = setTimeout(function () {
        if(typeof ymaps != "object") mapLoadAwait();
        else if($("#map").length) initMap();
      },1000);
    }
  };
  return _export;
})();
