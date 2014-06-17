function default_anim(platformList) {
  for(var pId=0; pId < platformList.length; pId++) {
    var ledStrip = platformList[pId].children[2].geometry;
    
    for(var ledId=0; ledId < ledStrip.colors.length; ledId++)
    {
      ledStrip.colors[ledId] = new THREE.Color( 0xffffff );
    }
    
    ledStrip.colorsNeedUpdate = true;
  }
}
