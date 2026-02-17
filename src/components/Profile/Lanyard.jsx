/* eslint-disable react/no-unknown-property */
'use client';
import React, { useEffect, useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

const cardGLB = '/assets/lanyard/card.glb';
const lanyardTexture = '/assets/lanyard/lanyard.png';
const profilePic = '/assets/photos/pg.png'; 

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ position = [0, 0, 15], gravity = [0, -40, 0], fov = 30, transparent = true }) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper" style={{ width: '100%', height: '100%' }}>
      <Canvas
        // THE FIX: Bringing camera position from 20/25 down to 15 makes the lanyard fill the screen
        camera={{ position: [0, 0, 15], fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true }}
      >
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band isMobile={isMobile} />
          </Physics>
        </Suspense>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  
  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyardTexture);
  const photo = useTexture(profilePic);

  const dynamicTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0d0e5c';
    ctx.fillRect(0, 0, 1024, 1024);

    // Maintained the 240 offset that fixed your alignment
    const drawX = 240; 

    // Verified Badge
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.roundRect(drawX - 80, 80, 160, 40, 20);
    ctx.fill();
    ctx.fillStyle = '#00ffa3';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('VERIFIED', drawX, 108);

    // Profile Photo
    if (photo.image) {
      const size = 320; // Increased photo size for the bigger card
      const yPos = 340; 
      ctx.strokeStyle = '#00ffa3';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(drawX, yPos, (size / 2) + 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.save();
      ctx.beginPath();
      ctx.arc(drawX, yPos, size / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(photo.image, drawX - size / 2, yPos - size / 2, size, size);
      ctx.restore();
    }

    // Information
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 55px Arial'; 
    ctx.fillText('ANJEF DANGOL', drawX, 600);
    
    ctx.fillStyle = '#00ffa3';
    ctx.font = 'bold 30px monospace';
    ctx.fillText('FULLSTACK DEVELOPER|DESIGNER', drawX, 660);

    ctx.fillStyle = '#cccccc';
    ctx.font = ' 28px Arial';
    ctx.fillText('danjefff1001@gmail.com', drawX, 700);
    ctx.fillText('+977 9803506667', drawX, 730);

    const tex = new THREE.CanvasTexture(canvas);
    tex.flipY = false;
    tex.anisotropy = 16;
    return tex;
  }, [photo]);

  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState(false);

  // Rope length adjusted for the larger scale
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  
  // ADJUSTED: Spherical joint anchor moved for the 3.2 scale
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 2.0, 0]]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 5, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        
        <RigidBody 
          ref={card} 
          {...segmentProps} 
          type={dragged ? 'kinematicPosition' : 'dynamic'}
          linearDamping={1}
          angularDamping={1}
        >
          {/* ADJUSTED: Collider size for 3.2 scale */}
          <CuboidCollider args={[1.2, 1.6, 0.01]} />
          <group
            scale={3.2} // THE BIG INCREASE
            position={[0, -1.8, -0.05]} // Positioned to stay centered under the rope
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial 
                map={dynamicTexture} 
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                roughness={0.4} 
                metalness={0.2} 
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial 
          transparent 
          map={texture} 
          useMap 
          repeat={[-4, 1]} 
          lineWidth={1.4} // Thickened lanyard for the massive card
          color="white" 
          depthTest={false} 
        />
      </mesh>
    </>
  );
}