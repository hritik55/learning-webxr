import * as THREE from '../../libs/three/three.module.js';
import { OrbitControls } from '../../libs/three/jsm/OrbitControls.js';

class App{
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );
    
		// The Camera - perspective camera
		// params - (FOV - Field of view, aspect ratio, near plane, far plane)
        this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 0.1, 100);
		this.camera.position.set(0, 0, 4)

		// The Scene
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( 0xaaaaaa );

		const ambient = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 0.3);
		this.scene.add( ambient );

		const light = new THREE.DirectionalLight();
		light.position.set(0.2, 1, 1);
		this.scene.add(light);
		// The renderer - instance WebGL Renderer
		this.renderer = new THREE.WebGLRenderer( { antialias  : true });
		// set the size of the renderer
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );

		// adding the domElement ti the container created by the renderer - to make sure it is visible
		container.appendChild( this.renderer.domElement );

		// called 60 times a second
		this.renderer.setAnimationLoop( this.render.bind(this) );

		// const geometry = new THREE.CircleBufferGeometry(1, 32, 0, Math.PI);
		// const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

		const length = 2, width = 5;
		
		const shape = new THREE.Shape();
		shape.moveTo(0, 0);
		shape.lineTo(0, width);
		shape.lineTo(length, width);
		shape.lineTo(length, 0);
		shape.lineTo(0, 0);

		const extrudeSettings = {
			steps: 2,
			depth: 10,
			bevelEnabled: true,
			bevelThickness: 1,
			bevelSize: 1,
			bevelOffset: 0,
			bevelSegments: 1
		};
		
		const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
		const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 });

		this.mesh = new THREE.Mesh( geometry, material );

		this.scene.add( this.mesh );

		const controls = new OrbitControls( this.camera, this.renderer.domElement );

        window.addEventListener('resize', this.resize.bind(this) );
	}	
    
    resize(){
        this.camera.aspect = window.innerWidth/window.innerHeight;
		//this.camera.updateProjectionMatrix();
		this.renderer.setSize( this.scene, this.camera ); 
    }
    
	render( ) {  
		// this.mesh.rotateY(0.01)
        this.renderer.render(this.scene, this.camera );
    }
}

export { App };