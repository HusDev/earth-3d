import React from "react";

import { useFrame, useLoader } from "react-three-fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { TextureLoader } from "three";
import * as THREE from "three";

import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpeg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpeg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpeg";
import EarthNightMap from "../../assets/textures/8k_earth_nightmap.jpeg";
import EarthCouldsMap from "../../assets/textures/8k_earth_clouds.jpg";

export const Earth = (props) => {
  const [colorMap, normalMap, specularMap, nightMap, cloudsMap] = useLoader(
    TextureLoader,
    [
      EarthDayMap,
      EarthNormalMap,
      EarthSpecularMap,
      EarthNightMap,
      EarthCouldsMap,
    ]
  );

  const earthRef = React.useRef();
  const cloudsRef = React.useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    earthRef.current.rotation.y = elapsedTime / 6;
    cloudsRef.current.rotation.y = elapsedTime / 6;
  });
  return (
    <>
      {/* <ambientLight intensity={1} /> */}
      <pointLight color="#f6f3ea" position={[2, 0, 2]} intensity={1.2} />
      <Stars
        radius={150}
        depth={30}
        count={2000}
        factor={7}
        saturation={0}
        fade={true}
      />
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.02, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.5}
          target={[0, 0, 0]}
          //   autoRotate={true}
        />
      </mesh>
    </>
  );
};
