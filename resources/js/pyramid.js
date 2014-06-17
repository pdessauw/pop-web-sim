var container = document.getElementById("pop");
var width = 400;
var height = 400;
var debug = true;
var toggleAnimation = false;
var stats;

var scene = new THREE.Scene();

var camera = initCamera(new THREE.Vector3(0, 0, 10));
scene.add(camera.camFocus);

var platform = new Array();

var xTrans = 0;
var yTrans = 0;
var zTrans = 0;

for(var i=0; i<60; i++) {
  platform[i] = loadPlatform();
  
  if(i % 20 == 0)
  {
    zTrans = 0;
    xTrans += 20;
  }
  
  platform[i].translateX(xTrans);
  platform[i].translateZ(zTrans);
  
  if(i % 2 == 0) {
    platform[i].translateY(15);
  } else {
    zTrans -= 15;
    platform[i].translateY(0);
  }
  
  scene.add(platform[i]);
}

// Ambient light
var ambient = new THREE.AmbientLight( 0x808080 ); // soft white light
scene.add( ambient );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
container.appendChild( renderer.domElement );

stats = new Stats();
stats.domElement.style.top = '0px';
container.appendChild( stats.domElement );


function update()
{
  stats.update(); 
  
  if(toggleAnimation)
  {
    rainbow(platform);
  }
}


var animOffset;
var animLastExec = 0;
var animChangeState = false;


function render() {
  requestAnimationFrame(render);  
  
  updateKeys();
  update();
  
  //controls.update(clock.getDelta());
  updateCamera(camera);
  
  renderer.render(scene, camera.camObject);
}
render();