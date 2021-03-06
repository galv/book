// Generated by CoffeeScript 1.7.1
(function() {
  var cube, cube2, geometry, light1, light2, lightVisualizer, material, paused, render, renderer;

  paused = false;

  window.scope = {
    x: 0,
    y: 0,
    color: 0x0000ff,
    light1position: new THREE.Vector3(1, 1, 1),
    pause: function() {
      return paused = !paused;
    },
    rate: 1
  };

  window.scene = new THREE.Scene();

  window.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  window.camera.position.set(0,150,400);
  window.camera.lookAt(scene.position);

  document.body.appendChild(renderer.domElement);

  material = new THREE.MeshPhongMaterial({
    color: scope.color
  });

  material = new THREE.MeshPhongMaterial({
    color: scope.color
  });
  collisionMesh = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.Backside}));
  var manager = new THREE.LoadingManager();
  manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
  };
  var loader = new THREE.OBJLoader(manager);
  loader.load( 'skull.obj', function ( collisionMesh ) {
    collisionMesh.traverse( function ( child ){ 
      if ( child instanceof THREE.Mesh ) {
      //child.material.map = texture;
      }
    });
    collisionMesh.scale = new THREE.Vector3( 20, 20, 20 );
    collisionMesh.name = "skull";
    scene.add( collisionMesh );
  });
  

  camera.position.fromArray([0, 3, 10]);

  camera.lookAt(new THREE.Vector3(0, 0, 0));
  var light = new THREE.PointLight(0xffffff);
  light.position.set(0,250,0);
  scene.add(light);
  //var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
  //cube = new THREE.Mesh(new THREE.BoxGeometry(.2,.2,.2), wireMaterial);
  //cubes = [new THREE.BoxGeometry(.2,.2,.2), new THREE.BoxGeometry(.2,.2,.2), new THREE.BoxGeometry(.2,.2,.2), new THREE.BoxGeometry(.2,.2,.2), new THREE.BoxGeometry(.2,.2,.2)];
  scene.add(light2);

  var floorMaterial = new THREE.MeshBasicMaterial( {color:0x444444, side:THREE.DoubleSide} );
  var floorGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
  var floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = -10;
  floor.rotation.x = Math.PI / 2;
  scene.add(floor);

  var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
  var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
  var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
  scene.add(skyBox);

  console.log("Scene finished");
  render = function() {
    if (!paused) {
      window.scope.x += scope.rate * 0.004;
      window.scope.y += scope.rate * 0.002;
    }
    material.color.setHex(scope.color);
    renderer.render(scene, camera);
    return requestAnimationFrame(render);
  };
  
  render();

}).call(this);
