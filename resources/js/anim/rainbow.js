var animOffset = 0;
var animLastExec = 0;
var animDelay = 500;
var rainbowLoop = [
  0xff0000, 0xff7700,
  0xffff00, 0x77ff00,
  0x00ff00, 0x00ff77,
  0x00ffff, 0x0077ff,
  0x0000ff, 0x7700ff,
  0xff00ff, 0xff0077,
  0xff0000, 0x770000
];

function rainbow(platformList) {
  if ( Date.now() > animLastExec + animDelay ) {
    for(var pId=0; pId < platformList.length; pId++) {
      var ledStrip = platformList[pId].children[2].geometry;
      
      for(var ledId=0; ledId < ledStrip.colors.length; ledId++)
      {
        ledStrip.colors[ledId] = new THREE.Color( rainbowLoop[ (ledId + animOffset) % rainbowLoop.length ] );
      }
      
      ledStrip.colorsNeedUpdate = true;
    }
    
    animOffset += 1;
    animLastExec = Date.now();
  }
}

function renderRainbow(pyramid) {

}