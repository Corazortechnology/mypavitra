import type * as THREE from "three";

export interface WebXRARController {
  cleanup: () => void;
  setScale: (multiplier: number) => void;
  resetPlacement: () => void;
}

/**
 * WebXR AR — tap detected surface to place product (Amazon-style).
 * Requires HTTPS + compatible browser (Chrome Android).
 */
export async function startWebXRAR(
  container: HTMLElement,
  _overlayRoot: HTMLElement,
  productImageUrl: string,
  onPlaced?: () => void,
  onError?: (msg: string) => void
): Promise<WebXRARController> {
  const THREE = await import("three");

  const canvas = document.createElement("canvas");
  canvas.style.position = "absolute";
  canvas.style.inset = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  container.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1.2));

  const texture = await new Promise<THREE.Texture>((resolve, reject) => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(productImageUrl, resolve, undefined, reject);
  });
  texture.colorSpace = THREE.SRGBColorSpace;

  const baseSize = 0.22;
  const geometry = new THREE.PlaneGeometry(baseSize, baseSize);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const productMesh = new THREE.Mesh(geometry, material);
  productMesh.visible = false;
  productMesh.renderOrder = 999;
  scene.add(productMesh);

  const reticle = new THREE.Mesh(
    new THREE.RingGeometry(0.06, 0.08, 32).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: 0xe8841a, opacity: 0.9, transparent: true })
  );
  reticle.matrixAutoUpdate = false;
  reticle.visible = false;
  scene.add(reticle);

  let hitTestSource: XRHitTestSource | null = null;
  let hitTestSourceRequested = false;
  let placed = false;
  let scaleMultiplier = 1;
  let session: XRSession | null = null;

  if (!navigator.xr) throw new Error("WebXR not available");

  const sessionInit: XRSessionInit = {
    requiredFeatures: ["hit-test"],
  };

  session = await navigator.xr.requestSession("immersive-ar", sessionInit);
  renderer.xr.setReferenceSpaceType("local");
  await renderer.xr.setSession(session);

  const placeProduct = () => {
    if (!reticle.visible) return;
    productMesh.position.setFromMatrixPosition(reticle.matrix);
    productMesh.quaternion.setFromRotationMatrix(reticle.matrix);
    productMesh.scale.setScalar(scaleMultiplier);
    productMesh.visible = true;
    placed = true;
    onPlaced?.();
  };

  const onSelect = () => {
    if (reticle.visible) placeProduct();
  };

  session.addEventListener("select", onSelect);

  session.addEventListener("end", () => {
    hitTestSource?.cancel();
  });

  renderer.setAnimationLoop((_time: number, frame?: XRFrame) => {
    if (!frame || !session) return;

    const referenceSpace = renderer.xr.getReferenceSpace();
    if (!referenceSpace) return;

    if (!hitTestSourceRequested) {
      hitTestSourceRequested = true;
      if (!session) return;
      const activeSession: XRSession = session;
      void activeSession.requestReferenceSpace("viewer").then(async (viewerSpace) => {
        const requestHitTestSource = activeSession.requestHitTestSource;
        if (typeof requestHitTestSource !== "function") {
          onError?.("Hit testing not supported");
          return;
        }
        try {
          hitTestSource =
            (await requestHitTestSource.call(activeSession, {
              space: viewerSpace,
            })) ?? null;
        } catch {
          onError?.("Could not start surface detection");
        }
      });
    }

    if (hitTestSource) {
      const results = frame.getHitTestResults(hitTestSource);
      if (results.length > 0) {
        const pose = results[0]!.getPose(referenceSpace);
        if (pose) {
          reticle.visible = true;
          reticle.matrix.fromArray(pose.transform.matrix);
        }
      }
    }

    renderer.render(scene, camera);
  });

  const cleanup = () => {
    session?.removeEventListener("select", onSelect);
    renderer.setAnimationLoop(null);
    hitTestSource?.cancel();
    session?.end().catch(() => {});
    renderer.dispose();
    geometry.dispose();
    material.dispose();
    texture.dispose();
    canvas.remove();
  };

  return {
    cleanup,
    setScale: (m: number) => {
      scaleMultiplier = m;
      if (productMesh.visible) productMesh.scale.setScalar(scaleMultiplier);
    },
    resetPlacement: () => {
      placed = false;
      productMesh.visible = false;
      reticle.visible = false;
    },
  };
}
