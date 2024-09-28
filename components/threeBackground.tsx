"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount?.appendChild(renderer.domElement);

    // Create a geometry
    const geometry = new THREE.TorusKnotGeometry(0.7, 0.3, 100, 16);

    // Create a material
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#4493f8"),
      emissive: new THREE.Color("#000"),
      roughness: 0.5,
      metalness: 0.7,
    });

    // Create a mesh
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the torus knot
      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      renderer.setSize(innerWidth, innerHeight);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      // Cleanup
      currentMount?.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0"></div>;
};

export default ThreeBackground;
