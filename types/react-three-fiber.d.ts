declare module '@react-three/fiber' {
  import * as THREE from 'three';
  import * as React from 'react';

  export type ThreeEvent<T, E> = T & {
    delta: number;
    intersections: Array<THREE.Intersection>;
    object: THREE.Object3D;
    originalEvent: E;
    point: THREE.Vector3;
    stopPropagation(): void;
    target: THREE.Object3D;
    type: string;
    uuid: string;
  };

  export type StateObject = {
    camera: THREE.Camera;
    gl: THREE.WebGLRenderer;
    raycaster: THREE.Raycaster;
    scene: THREE.Scene;
    size: {
      width: number;
      height: number;
    };
    viewport: {
      width: number;
      height: number;
      initialDpr: number;
      dpr: number;
      factor: number;
      distance: number;
      aspect: number;
    };
  };

  export type RenderCallback = (state: StateObject, delta: number) => void;

  export const Canvas: React.FC<
    React.PropsWithChildren<{
      shadows?: boolean;
      camera?: Partial<THREE.PerspectiveCamera>;
      gl?: Partial<THREE.WebGLRenderer>;
      onCreated?: (state: StateObject) => void;
      frameloop?: 'always' | 'demand' | 'never';
      linear?: boolean;
      flat?: boolean;
      orthographic?: boolean;
      dpr?: number;
      [key: string]: any;
    }>
  >;

  export function useThree<T = StateObject>(): T;
  export function useFrame(callback: RenderCallback, priority?: number): void;
}

declare module '@react-three/drei' {
  import * as React from 'react';
  import * as THREE from 'three';

  export const Stars: React.FC<{
    radius?: number;
    depth?: number;
    count?: number;
    factor?: number;
    saturation?: number;
    fade?: boolean;
    speed?: number;
    [key: string]: any;
  }>;

  export const OrbitControls: React.FC<{
    makeDefault?: boolean;
    minPolarAngle?: number;
    maxPolarAngle?: number;
    minDistance?: number;
    maxDistance?: number;
    enableZoom?: boolean;
    enablePan?: boolean;
    enableRotate?: boolean;
    [key: string]: any;
  }>;

  export const useGLTF: (url: string) => {
    nodes: { [key: string]: THREE.Mesh };
    materials: { [key: string]: THREE.Material };
    scene: THREE.Scene;
  };
}
