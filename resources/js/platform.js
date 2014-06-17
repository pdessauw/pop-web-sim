/**
 * 
 */
var plRadius = 5;
var plRadiusOffsets = [
  0.1, // Led strip
  0.15 // Led lights 
];
var plEdges = [ // Coordinates of the platform edge (filled w/ correct values later)
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];

/**
 * 
 */
loadPlatform = function() {
  var platform = new THREE.Object3D();
  
  if(plEdges[0][1] == 0) // Compute edges values only if needed
    computeEdges();
  
  // Load structures
  var woodenStructure = loadWoodenStructure();
  var ledStrip = loadLedStrip();
  var leds = loadLeds();
  
  // Bind them together
  platform.add( woodenStructure );
  platform.add( ledStrip );
  platform.add( leds );
  
  console.log("Platform created");
  
  return platform;
};

/**
 * 
 */
computeEdges = function() {
  var ledLightsRadius = plRadius + plRadiusOffsets[1];
  var ledLightsEdgeOffset = Math.sqrt( Math.pow( ledLightsRadius, 2 ) - Math.pow( ledLightsRadius/2, 2 ) );
  
  plEdges = [
    [  0,                     ledLightsRadius    ],
    [  ledLightsEdgeOffset,   ledLightsRadius/2  ],
    [  ledLightsEdgeOffset,  -ledLightsRadius/2  ],
    [  0,                    -ledLightsRadius    ],
    [ -ledLightsEdgeOffset,  -ledLightsRadius/2  ],
    [ -ledLightsEdgeOffset,   ledLightsRadius/2  ],
  ];
  
  console.log("Edges computed");
};

/**
 * 
 */
loadWoodenStructure = function() {
  var wsHeight = 1.5;
  var wsTexture = THREE.ImageUtils.loadTexture( 'resources/textures/wood.jpg' );
  
  // Create geometry and material
  var wsGeom = new THREE.CylinderGeometry( plRadius, plRadius, wsHeight, plEdges.length );
  var wsMat = new THREE.MeshLambertMaterial( { map: wsTexture } );
  
  // Return the mesh
  return new THREE.Mesh( wsGeom, wsMat );
};

/**
 * 
 */
loadLedStrip = function() {
  var lsHegiht = 0.2;
  var lsAmbient = 0x555555;
  var lsColor = 0xffffff;
  var lsSpecular = 0xffffff;
  var lsShininess = 10;
  var lsShading = THREE.SmoothShading;
  
  // Create geometry and material
  var lsGeom = new THREE.CylinderGeometry( plRadius + plRadiusOffsets[0], plRadius + plRadiusOffsets[0], lsHegiht, plEdges.length );
  var lsMat = new THREE.MeshPhongMaterial( { ambient: lsAmbient, color: lsColor, specular: lsSpecular, shininess: lsShininess, shading: lsShading } );
  
  // Return the mesh
  return new THREE.Mesh( lsGeom, lsMat );
};

/**
 * 
 */
loadLeds = function() {
  var ledLightsDistrib = [36, 37, 36, 37, 36, 37];
  var ledLightsSize = 1;
  var ledTexture = THREE.ImageUtils.loadTexture( 'resources/textures/spikey.png' );
  
  var ledLightsColored = 0;
  
  var ledsGeom = new THREE.Geometry();
  ledsGeom.colors = new Array();
  
  for(var edge=0; edge<plEdges.length; edge++)
  {
    p1 = plEdges[edge];
    p2 = (edge == plEdges.length - 1 )?plEdges[0]:plEdges[edge+1];
    
    x = p2[0] - p1[0];
    z = p2[1] - p1[1];
        
    x_step = x / ledLightsDistrib[edge];
    z_step = z / ledLightsDistrib[edge];
    
    for(var idLed=0; idLed<ledLightsDistrib[edge]; idLed++)
    {
      var vertex = new THREE.Vector3();
      
      vertex.x = p1[0] + x_step * idLed;      
      vertex.y = 0;
      vertex.z = p1[1] + z_step * idLed;
      
      ledsGeom.vertices.push(vertex); 
      ledsGeom.colors[idLed + ledLightsColored] = new THREE.Color( 0xffffff );
      
      console.log("Led created");
    }
    
    ledLightsColored += ledLightsDistrib[edge];
  }  

  var ledsMat = new THREE.ParticleSystemMaterial({
    map: ledTexture,
    vertexColors:true,
    size: ledLightsSize,
    transparent:true,
  });
  
  ledLightsSystem = new THREE.ParticleSystem(ledsGeom, ledsMat);
  ledLightsSystem.sortParticles = true;

  return ledLightsSystem;
};
