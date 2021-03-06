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
  var cube0 = new THREE.Mesh(new THREE.BoxGeometry(.5,.5,.5), new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe:true } ));
  var cube1 = new THREE.Mesh(new THREE.BoxGeometry(.5,.5,.5), new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe:true } ));
  //var cube2 = new THREE.Mesh(new THREE.BoxGeometry(.5,.5,.5), new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe:true } ));
  //var cube3 = new THREE.Mesh(new THREE.BoxGeometry(.5,.5,.5), new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe:true } ));
  //var cube4 = new THREE.Mesh(new THREE.BoxGeometry(.5,.5,.5), new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe:true } ));
  //scene.add(cube0);
  //scene.add(cube1);
  //scene.add(cube2);
  //scene.add(cube3);
  //scene.add(cube4);
  var contactCubes = [cube0,cube1];
  var attached = [];
  var grab = false;
  var wait = 0; 
  //console.log(collisionMesh.position)
  //Repeat loop / update
  controller.on('frame', function(frame) {
    var hand, handMesh, offsetDown, offsetForward, pos;
    if (!frame.hands[0]) {
      return;
    }
    hand = frame.hands[0];
    handMesh = hand.data('riggedHand.mesh');
    var position0 = handMesh.scenePosition(hand.fingers[0].stabilizedTipPosition,cube0.position);
    var position1 = handMesh.scenePosition(hand.fingers[1].stabilizedTipPosition,cube1.position);
    //var position2 = handMesh.scenePosition(hand.fingers[2].stabilizedTipPosition,cube2.position);
    //var position3 = handMesh.scenePosition(hand.fingers[3].stabilizedTipPosition,cube3.position);
    //var position4 = handMesh.scenePosition(hand.fingers[4].stabilizedTipPosition,cube4.position);
    length = hand.fingers.length;
    for (var index = 0; index < contactCubes.length; index++) {
      cube = contactCubes[index];
      for (var vertexIndex = 0; vertexIndex < cube.geometry.vertices.length; vertexIndex++) {
        var localVertex = cube.geometry.vertices[vertexIndex].clone();
        var globalVertex = localVertex.applyMatrix4(cube.matrix);
        var directionVector = globalVertex.sub(cube.position);
        var ray = new THREE.Raycaster( cube.position.clone(), directionVector.clone().normalize() );
        var collisionResults = ray.intersectObjects( collidableMeshList );
        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() && wait == 0 ){
          if(attached.indexOf(index) == -1){
            attached.push(index);
          }
          //console.log(" Hit "+attached);
        }
        /*else{
          var ind = attached.indexOf(index);
          if(ind != -1){
            attached.splice(ind,1);
            relaxedGrip[index] = 1;
            console.log("removed" + collisionResults.length);
          }
        }*/
        if(attached.length >= 2){
          grab = true;
          //console.log("grabbed");
        } 
        else 
          grab = false;
          if (wait > 0)
            wait --;
      }
      //console.log(wait);
    }
    var position2 = position1.clone().sub(position0.clone());
    if(position2.length() > 1.2 && grab){
        grab=false;
        //console.log(grab);
        attached = [];
        //console.log(attached);
        wait = 20;
      }
    if (frame.fingers.length > 0 && grab == true){
      //console.log(position2.length());
      position2.normalize();
      var pos = new THREE.Vector3();
      pos.addVectors(position2, collisionMesh.position);
      collisionMesh.lookAt(pos);

      var position3 = position1.clone().add(position0.clone());
      position3.divideScalar(2);
      collisionMesh.position = position3;
    }
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
