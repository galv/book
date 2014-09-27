// Generated by CoffeeScript 1.7.1
(function() {
  var controller, extraOutput;

  window.gui = new dat.GUI({
    autoPlace: false
  });

  gui.add(scope, 'x', -Math.PI, Math.PI);

  gui.add(scope, 'y', -Math.PI, Math.PI);

  gui.addColor(scope, 'color');

  gui.add(scope, 'rate', 0, 10);

  document.getElementById('guiContainer').appendChild(gui.domElement);

  extraOutput = document.createElement('div');

  extraOutput.id = 'extraOutput';

  extraOutput.style.paddingTop = '1.2em';

  extraOutput.style.color = 'white';

  document.getElementById('guiContainer').appendChild(extraOutput);

  window.controller = controller = new Leap.Controller({
    background: true
  });

  controller.use('riggedHand', {
    parent: window.scene,
    camera: window.camera,
    scale: 0.25,
    positionScale: 6,
    offset: new THREE.Vector3(0, -2, 0),
    renderFn: function() {},
    boneColors: function(boneMesh, leapHand) {
      return {
        hue: 0.6,
        saturation: 0.2,
        lightness: 0.8
      };
    }
  });

  controller.connect();
  var cube = new THREE.Mesh(new THREE.BoxGeometry(.2,.2,.2), new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe:true } ));
  var cube2 = new THREE.Mesh(new THREE.BoxGeometry(.2,.2,.2), new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe:true } ));
  cube2.position = new THREE.Vector3(2,2,2);
  console.log(collisionMesh.position)
  //Repeat loop / update
  controller.on('frame', function(frame) {
    var hand, handMesh, offsetDown, offsetForward, pos;
    if (!frame.hands[0]) {
      return;
    }
    hand = frame.hands[0];
    handMesh = hand.data('riggedHand.mesh');
    position = handMesh.scenePosition(hand.fingers[1].stabilizedTipPosition,cube.position);
    length = hand.fingers.length;
    console.log(position);/*
    for (var index = 0; index < length; index++) {
	var positionArray = hand.fingers[index].stabilizedTipPosition;
	var cubeOrigin = new THREE.Vector3(positionArray[0], positionArray[1], 
					 positionArray[2]);
	cube.position = cubeOrigin;
	for (var vertexIndex = 0; vertexIndex < cube.geometry.vertices.length; vertexIndex++) {
	    var localVertex = cube.geometry.vertices[vertexIndex].clone();
	    var globalVertex = localVertex.applyMatrix4(cube.matrix);
	    var directionVector = globalVertex.sub(cube.position);
	    var ray = new THREE.Raycaster( cubeOrigin, directionVector.clone().normalize() );
	    var collisionResults = ray.intersectObjects( collidableMeshList );
	    if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){
		    console.log(" Hit ");
      }
	}
    }*/
    return extraOutput.innerHTML = hand.fingers[2].stabilizedTipPosition.map(function(num) {
      return num.toPrecision(2);
	});
    });

  document.body.onkeydown = function(e) {
    switch (e.which) {
      case 32:
        return scope.pause();
      default:
        return console.log("unbound keycode: " + e.which);
    }
  };

}).call(this);
