define(['dojo/_base/declare', 'jimu/BaseWidget',
"esri/renderers/HeatmapRenderer",
"esri/layers/FeatureLayer",
"esri/geometry/Extent",
"esri/SpatialReference",
"esri/dijit/HeatmapSlider",
"dojo/_base/lang",
"esri/layers/ArcGISDynamicMapServiceLayer",
],
function(declare, BaseWidget, HeatmapRenderer, FeatureLayer, Extent, SpatialReference, HeatmapSlider, lang, DynamicLayer) {

  let capa_clientes;
  let capa_clientes_calor;
 

  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {

    // Custom widget code goes here

    baseClass: 'distribucion-clientes',
    // this property is set by the framework when widget is loaded.
    // name: 'Distribucion_Clientes',
    // add additional properties here

    //methods to communication with app container:
    postCreate: function() {
      this.inherited(arguments);
      console.log('Distribucion_Clientes::postCreate');

      /*var capa_dinamica_renta_map_server = new DynamicLayer("https://localhost:6443/arcgis/rest/services/Proyecto/Servicio_Densidad_Renta_Com_Madrid/MapServer")

      this.map.addLayer(capa_dinamica_renta_map_server)*/
    },

    startup: function() {
      this.inherited(arguments);
      console.log('Distribucion_Clientes::startup');
      mimapa = this.map
      console.log(mimapa)
      console.log(this.map.graphicsLayerIds)
    },

    onOpen: function(){
      console.log('Distribucion_Clientes::onOpen');

      if(this.map.graphicsLayerIds.length < 4){

        capa_clientes = new FeatureLayer ("https://localhost:6443/arcgis/rest/services/Proyecto/ServicioCableado/FeatureServer/2")

        this.map.addLayer(capa_clientes)

        var extension = new Extent (-424988.21030558174, 4914314.611985733, -398120.5948633785, 4939577.049833949,  new SpatialReference({ wkid:102100}) )

      this.map.setExtent(extension)

      this.map.reorderLayer(capa_clientes, 2)

      }     

      
    },

    MapaCalor(){


      capa_clientes.hide();

      capa_clientes_calor = new FeatureLayer ("https://localhost:6443/arcgis/rest/services/Proyecto/ServicioCableado/FeatureServer/2")    

      
      var myStops = [
        {"ratio":0,"color":{
          "r":133,"g":193,"b":200,"a":0}
        },
        {"ratio":0.01,"color":{
          "r":133,"g":193,"b":200,"a":0}
        },
        {"ratio":0.01,"color":{
          "r":133,"g":193,"b":200,"a":0.7}
        },
        {"ratio":0.01,"color":{
          "r":133,"g":193,"b":200,"a":0.7}
        },
        {"ratio":0.0925,"color":{
          "r":144,"g":161,"b":190,"a":0.7}
        }, 
        {"ratio":0.17500000000000002,"color":{
          "r":156,"g":129,"b":132,"a":0.7}
        },
        {"ratio":0.2575,"color":{
          "r":167,"g":97,"b":170,"a":0.7}
        },
        {"ratio":0.34,"color":{
          "r":175,"g":73,"b":128,"a":0.7}
        },
        {"ratio":0.42250000000000004,"color":{
          "r":184,"g":48,"b":85,"a":0.7}
        },
        {"ratio":0.505,"color":{
          "r":192,"g":24,"b":42,"a":0.7}
        },
        {"ratio":0.5875,"color":{
          "r":200,"g":0,"b":0,"a":0.7}
        },
        {"ratio":0.67,"color":{
          "r":211,"g":51,"b":0,"a":0.7}
        },
        {"ratio":0.7525000000000001,"color":{
          "r":222,"g":102,"b":0,"a":0.7}
        },
        {"ratio":0.8350000000000001,"color":{
          "r":233,"g":153,"b":0,"a":0.7}
        },
        {"ratio":0.9175000000000001,"color":{
          "r":244,"g":204,"b":0,"a":0.7}
        },
        {"ratio":1,"color":{
          "r":255,"g":255,"b":0,"a":0.7}
        }
      ];

    var deslizadorColor = new HeatmapSlider({        
        "colorStops": myStops,
        "showLabels" : true,
      }, this.deslizador);      

    var calorRender = new HeatmapRenderer({        
        // colors: ["rgba(0, 0, 255, 0)","rgb(0, 0, 255)","rgb(255, 0, 255)", "rgb(255, 0, 0)"],
        blurRadius: this.radioSelect.value,
        maxPixelIntensity: this.maxpx.value,
        minPixelIntensity: this.minpx.value})

      capa_clientes_calor.setRenderer(calorRender);

      calorRender.setColorStops(myStops);

      deslizadorColor.startup();  


    if (this.maxpx.value != 0 & this.minpx.value != 0 & this.radioSelect.value !=0 & this.map.graphicsLayerIds.length < 5){


      this.map.addLayer(capa_clientes_calor);

      this.map.reorderLayer(capa_clientes_calor, 1)
           
  
    }else if(this.map.graphicsLayerIds.length >= 5){

      capa_clientes_calor.setRenderer(calorRender)


    }else{
    
  
        alert("Introduce el radio del círculo, los valores máximos y mínimos de los píxeles")

        

      

     };


     console.log(mimapa)
     console.log(this.map.graphicsLayerIds)

    
      
      

     

     

      
      
      
      
      

      // var id = this.map.graphicsLayerIds

      // console.log("Lista capas:" + id)

      // for(i = 0; i > 2; i++){

      //   var layer = this.map.graphicsLayerIds([i])
        


      // }

      


      





      
      // deslizadorColor.on(["thumb-change", "thumb-drag"], function() {
      //   const renderer = capa_clientes_calor.renderer.clone();
      //   renderer.myStops = deslizadorColor.stops;
      //   capa_clientes_calor.renderer = renderer;
      // })


      // var renderizador = this.deslizador

      // renderizador.addEventListener("handle-value-change", function (evt){
      //   var c = +evt.target.value;
      //   if (c !== calorRender.colorStops) {
      //     calorRender.colorStops = c;
      //     capa_clientes_calor.redraw();
      //   }
      // });
    
      
      
              
      
    },
    
    // getMapLayers() {
    //   for (var j=0, jl=map.layerIds.length; j<jl; j++) {
    //     var currentLayer = map.getLayer(map.layerIds[j]);
    //     console.log("id: " + currentLayer.id);
    //   }
    // },

    // renderizar(){

    //   var renderer = capa_clientes_calor.renderer.clone();
    //   renderer.colorStops = heatmapSliderDev.stops;
    //   capa_clientes_calor.renderer = renderer;

    //   capa_clientes_calor.remove()

    // },

    informacion(){

      alert("PARÁMETROS: Radio: Radio del círculo sobre el que se situarán la mayoría de los valores. ") 

    console.log(mimapa)

    },
    

    onClose: function(){
      console.log('Distribucion_Clientes::onClose');
      console.log(mimapa)

      
    },

    // onMinimize: function(){
    //   console.log('Distribucion_Clientes::onMinimize');
    // },

    // onMaximize: function(){
    //   console.log('Distribucion_Clientes::onMaximize');
    // },

    // onSignIn: function(credential){
    //   console.log('Distribucion_Clientes::onSignIn', credential);
    // },

    // onSignOut: function(){
    //   console.log('Distribucion_Clientes::onSignOut');
    // }

    // onPositionChange: function(){
    //   console.log('Distribucion_Clientes::onPositionChange');
    // },

    // resize: function(){
    //   console.log('Distribucion_Clientes::resize');
    // }

    //methods to communication between widgets:

  });

});
