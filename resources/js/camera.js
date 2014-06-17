var movePrecision = 0.5;
var rotationPrecision = 0.05;
var focusLength = 1;

var axisRotation = Math.PI / 2;

/**
 * Initialize the camera
 */
function initCamera(camPosition) {
  var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
  
  camera.position.x = camPosition.x;
  camera.position.y = camPosition.y;
  camera.position.z = camPosition.z;

  var cameraFocus = new THREE.Vector3(0, 0, camera.position.z - focusLength);
  
  return {camObject: camera, camFocus: cameraFocus};
}

/**
 * Update the camera and keep the focus on the right point
 */
function updateCamera(camera) {
  camera.camObject.updateProjectionMatrix();
  camera.camObject.lookAt(camera.camFocus);
}

/**
 * 
 */
function rotateLeft(cameraPosition, cameraFocus) {
  var leftMoveVector = getCameraY(cameraPosition, cameraFocus).setLength(rotationPrecision);
  cameraFocus.sub(leftMoveVector);
  
  var projVector = getCameraX(cameraPosition, cameraFocus);
  cameraFocus = cameraPosition.clone().add(projVector);
}

/**
 * 
 */
function rotateRight(cameraPosition, cameraFocus) {
  var rightMoveVector = getCameraY(cameraPosition, cameraFocus).setLength(rotationPrecision);
  cameraFocus.add(rightMoveVector);
  
  var projVector = getCameraX(cameraPosition, cameraFocus);
  cameraFocus = cameraPosition.clone().add(projVector);

}

/**
 * 
 */
function moveLeft(cameraPosition, cameraFocus) {
  var leftMoveVector = getCameraY(cameraPosition, cameraFocus).setLength(movePrecision);

  cameraPosition.sub(leftMoveVector);
  cameraFocus.sub(leftMoveVector);
}

/**
 * 
 */
function moveRight(cameraPosition, cameraFocus) {
  var rightMoveVector = getCameraY(cameraPosition, cameraFocus).setLength(movePrecision);

  cameraPosition.add(rightMoveVector);
  cameraFocus.add(rightMoveVector);

}



function moveForward(cameraPosition, cameraFocus) {
  var fwdMoveVector = getCameraX(cameraPosition, cameraFocus).setLength(movePrecision);

  cameraPosition.add(fwdMoveVector);
  cameraFocus.add(fwdMoveVector);
}

function moveBackward(cameraPosition, cameraFocus) {
  var bwdMoveVector = getCameraX(cameraPosition, cameraFocus).setLength(movePrecision);

  cameraPosition.sub(bwdMoveVector);
  cameraFocus.sub(bwdMoveVector);
}


function moveUp(cameraPosition, cameraFocus) {
  cameraPosition.y += movePrecision;
  cameraFocus.y += movePrecision;
}


function moveDown(cameraPosition, cameraFocus) {
  cameraPosition.y -= movePrecision;
  cameraFocus.y -= movePrecision;
}

/**
 * 
 */
function getCameraX(cameraPosition, cameraFocus)
{
  return new THREE.Vector3(
    cameraFocus.x - cameraPosition.x,
    cameraFocus.y - cameraPosition.y,
    cameraFocus.z - cameraPosition.z
  );
}

/**
 * 
 */
function getCameraY(cameraPosition, cameraFocus)
{
  var xVector = getCameraX(cameraPosition, cameraFocus).clone();

  var yVector = xVector.applyAxisAngle(new THREE.Vector3(0, -1, 0), axisRotation);
  yVector.setLength(rotationPrecision);

  return yVector;
}

/**
 * 
 */
function getCameraZ(cameraPosition, cameraFocus)
{
  var xVector = getCameraX(cameraPosition, cameraFocus).clone();

  var zVector = xVector.applyAxisAngle(new THREE.Vector3(1, 0, 0), axisRotation);
  zVector.setLength(rotationPrecision);

  return zVector;
}