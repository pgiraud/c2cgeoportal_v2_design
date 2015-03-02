var bgmap1 = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.MapQuest({layer: 'sat'})
    })
  ],
  target: 'bgmap1',
  interactions: [],
  controls: [],
  view: new ol.View({ })
});
var bgmap2 = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.MapQuest({layer: 'osm'})
    })
  ],
  target: 'bgmap2',
  interactions: [],
  controls: [],
  view: new ol.View({ })
});
var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }),
  target: 'map',
  view: new ol.View({
    center: ol.proj.transform([5, 45], 'EPSG:4326', 'EPSG:3857')
  })
});

bgmap1.getView().bindTo('center', map.getView());
bgmap2.getView().bindTo('center', map.getView());
map.getView().on('change:resolution', function(evt) {
  bgmap1.getView().setResolution(map.getView().getResolution() * 8);
  bgmap2.getView().setResolution(map.getView().getResolution() * 8);
});

map.getView().setZoom(6);


var tools = $('#tools').children();
tools.each(function() {
  $(this).on('click', function() {
    var isActive = $(this).hasClass('active');
    tools.removeClass('active');
    $('#tools-content>div').removeClass('active');
    if (!isActive) {
      $(this).addClass('active');
    }
    $('#tools-content').toggleClass('active', $(this).hasClass('active'));
    $('#' + $(this).attr('data-toggle')).addClass('active');
    map.updateSize();
  });
});

$('#tools-content .collapse').on('click', function() {
  $('#tools-content').removeClass('active');
  tools.removeClass('active');
  map.updateSize();
});

$('#data .gmf-icon-layers').on('click', function() {
  $('#data').toggleClass('active');
});
