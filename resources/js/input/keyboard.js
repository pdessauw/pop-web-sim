var keyboard = new THREEx.KeyboardState();
var spaceChangeState = false;
var toggleAnimation = false;

/**
 * 
 */
updateKeys = function() {
  /**
   * MOVEMENT 
   */
  if ( keyboard.pressed("w") ) {
    moveForward(camera.camObject.position, camera.camFocus);
  }
  
  if ( keyboard.pressed("s") ) {
    moveBackward(camera.camObject.position, camera.camFocus);
  }
  
  if ( keyboard.pressed("a") ) {
    moveLeft(camera.camObject.position, camera.camFocus);
  }
  
  if ( keyboard.pressed("d") ) 
  {
    moveRight(camera.camObject.position, camera.camFocus);
  }
  
  if ( keyboard.pressed("q") ) 
  {  
    moveUp(camera.camObject.position, camera.camFocus);
  }
  
  if ( keyboard.pressed("j") ) 
  {
    rotateLeft(camera.camObject.position, camera.camFocus);
  }
  
  if ( keyboard.pressed("e") ) 
  {
    moveDown(camera.camObject.position, camera.camFocus);
  }
  
  if ( keyboard.pressed("l") ) {
    rotateRight(camera.camObject.position, camera.camFocus);
  }
  
  
  /**
   * ANIMATION 
   */
  if ( keyboard.pressed("space") ) { 
    spaceChangeState = true;
  }
  
  if(!keyboard.pressed("space") && spaceChangeState) {    
    spaceChangeState = false;
    toggleAnimation = !toggleAnimation;
    
    if(!toggleAnimation)
    {
      default_anim(platform);
      
      console.log("Animation stopped");
    }
    else {
      animOffset = 0;
      console.log("Animation started");
    }
  }  
};
