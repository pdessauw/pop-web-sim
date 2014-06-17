document.addEventListener( 'mousedown', onDocumentMouseDown, false );
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener( 'mouseup', onDocumentMouseUp, false );

var isMouseDown = false;
var cursorX = 0;
var translationX = 0;

/**
 * 
 * @param {Object} event
 */
function onDocumentMouseDown( event ) { 
  event.preventDefault();
  
  if(event.button == 0) // Left click of the mouse
  {
    isMouseDown = true;
    
    cursorX = event.clientX;
    translationX = 0;
  }
}

/**
 * 
 * @param {Object} event
 */
function onDocumentMouseMove( event ) {
  event.preventDefault();

  if ( isMouseDown ) {    
    translationX = event.clientX - (cursorX + translationX);
    
    if( translationX > 0 )
      rotateRight(camera.camObject.position, camera.camFocus);
    else if( translationX < 0 )
      rotateLeft(camera.camObject.position, camera.camFocus);
  }
}

/**
 * 
 * @param {Object} event
 */
function onDocumentMouseUp( event ) {
  event.preventDefault();

  isMouseDown = false;
}