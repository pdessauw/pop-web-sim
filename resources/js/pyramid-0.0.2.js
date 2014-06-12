var container = document.getElementById("pop");
var width = 400;
var height = 400;
var debug = true;
var toggleAnimation = false;

var stats;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

var keyboard = new THREEx.KeyboardState();

var platform = new THREE.Object3D();
scene.add(platform);

// Ambient light
var al = new THREE.AmbientLight( 0x808080 ); // soft white light
scene.add( al );

// Wood structure
var cRadius = 5;
var cHegiht = 1.5;
var cFaces = 6;

var geometry = new THREE.CylinderGeometry( cRadius, cRadius, cHegiht, cFaces );

var cTexture = THREE.ImageUtils.loadTexture( 'resources/textures/wood.jpg' );
var cMaterial = new THREE.MeshLambertMaterial( { map: cTexture } );

var cylinder = new THREE.Mesh( geometry, cMaterial );
platform.add( cylinder );

// Led strip
var cRadius = 5.1;
var cHegiht = 0.2;
var cFaces = 6;

var lsGeom = new THREE.CylinderGeometry( cRadius, cRadius, cHegiht, cFaces );

var lsTexture = THREE.ImageUtils.loadTexture( 'resources/textures/strip.jpg' );
var lsMat = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: 0xffffff, specular: 0xffffff, shininess: 10, shading: THREE.SmoothShading} );

var ledStrip = new THREE.Mesh( lsGeom, lsMat );
platform.add( ledStrip );

// Led lights
var ledNumber = 60;
var rainbowLoop = [
  0xff0000,
  0xff7700,
  0xffff00,
  0x77ff00,
  0x00ff00,
  0x00ff77,
  0x00ffff,
  0x0077ff,
  0x0000ff,
  0x7700ff,
  0xff00ff, 
  0xff0077,
  0xff0000,
  0x770000
];

var ledsGeom = new THREE.Geometry();
ledsGeom.colors = new Array();

// var sphereSize = 0.5;

var sideLength = ledNumber / 6;
var offset = 0;

if(debug)
{
  console.log(ledNumber + " leds loaded in memory");
  console.log(sideLength + " leds per side");
}

for(var idLed=0; idLed < ledNumber; idLed++)
{
  ledsGeom.colors[idLed] = new THREE.Color(0xffffff);
}

// Side 1
for(var idLed=0; idLed<sideLength; idLed++)
{
  var vertex = new THREE.Vector3();
  vertex.x = 0.448 * idLed;
  vertex.y = 0;
  vertex.z = 5.15 - 0.265 * idLed;
  
  ledsGeom.vertices.push(vertex);
}


offset += sideLength;

// Side 2
for(var idLed=0; idLed<sideLength; idLed++)
{
  var vertex = new THREE.Vector3();
  vertex.x = 4.48;
  vertex.y = 0;
  vertex.z = 2.5 - 0.5 * idLed;
  
  ledsGeom.vertices.push(vertex);
}

offset += sideLength;

// Side 3
for(var idLed=0; idLed<sideLength; idLed++)
{
  var vertex = new THREE.Vector3();
  vertex.x = 4.48 - 0.448 * idLed;
  vertex.y = 0;
  vertex.z = -2.5 - 0.265 * idLed;
  
  ledsGeom.vertices.push(vertex);
}

offset += sideLength;

// Side 4
for(var idLed=0; idLed<sideLength; idLed++)
{
  var vertex = new THREE.Vector3();
  vertex.x = -0.448 * idLed;
  vertex.y = 0;
  vertex.z = -5.15 + 0.265 * idLed;
  
  ledsGeom.vertices.push(vertex);
}

offset += sideLength;

// Side 5
for(var idLed=0; idLed<sideLength; idLed++)
{
  var vertex = new THREE.Vector3();
  vertex.x = -4.48;
  vertex.y = 0;
  vertex.z = -2.5 + 0.5 * idLed;
  
  ledsGeom.vertices.push(vertex);
}

offset += sideLength;

// Side 6
for(var idLed=0; idLed<sideLength; idLed++)
{
  var vertex = new THREE.Vector3();
  vertex.x = -4.48 + 0.448 * idLed;
  vertex.y = 0;
  vertex.z = 2.5 + 0.265 * idLed;
  
  ledsGeom.vertices.push(vertex);
}

// ledsGeom.colors = ledColors;
var ledTexture = THREE.ImageUtils.loadTexture( 'resources/textures/spikey.png' );

ledsMat = new THREE.ParticleSystemMaterial({
  map: ledTexture,
  vertexColors:true,
  size: 1,
  transparent:true,
});

leds = new THREE.ParticleSystem(ledsGeom, ledsMat);

platform.add( leds );

camera.position.z = 10;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
container.appendChild( renderer.domElement );

stats = new Stats();
//stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
//stats.domElement.style.float = 'right';
container.appendChild( stats.domElement );


function update()
{
  if ( keyboard.pressed("w") ) 
  { 
    platform.rotation.x += 0.1;
  }
  
  if ( keyboard.pressed("s") ) 
  { 
    platform.rotation.x -= 0.1;
  }
  
  if ( keyboard.pressed("a") ) 
  { 
    platform.rotation.y += 0.1;
  }
  
  if ( keyboard.pressed("d") ) 
  { 
    platform.rotation.y -= 0.1;
  }
  
  /**
   * ANIMATION 
   */
  if ( keyboard.pressed("space") ) 
  { 
    animChangeState = true;
    
  }
  
  if(!keyboard.pressed("space") && animChangeState)
  {    
    animChangeState = false;
    toggleAnimation = !toggleAnimation;
    
    if(!toggleAnimation)
    {
      // Reset the led strip
      for(var idLed=0; idLed<ledNumber; idLed++)
      {
        leds.geometry.colors[idLed] = new THREE.Color( 0xffffff );
      }
      leds.geometry.colorsNeedUpdate = true;
    }
    else {
      animOffset = 0;
    }
  }
  
  /**
   * ZOOM 
   */
  if ( keyboard.pressed("q") ) 
  { 
    camera.position.z += 0.1;
  } else if (keyboard.pressed("e"))  {
    camera.position.z -= 0.1;
  }
  
  stats.update();
  
  
  if(toggleAnimation && Date.now() > animLastExec + 750)
  {
    for(var idLed=0; idLed<ledNumber; idLed++)
    {
      leds.geometry.colors[idLed] = new THREE.Color( rainbowLoop[(idLed + animOffset) % rainbowLoop.length] );
    }
    leds.geometry.colorsNeedUpdate = true;
    
    animLastExec = Date.now();
    animOffset+=1;
  }
  
}

var animOffset;
var animLastExec = 0;
var animChangeState = false;


function render() {
  requestAnimationFrame(render);
  
  // cylinder.rotation.x += 0.1;
  // cylinder.rotation.y += 0.1;
  
  update();
  
  
  
  renderer.render(scene, camera);
}
render();