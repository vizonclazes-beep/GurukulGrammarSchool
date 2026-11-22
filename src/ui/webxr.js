// src/ui/webxr.js — Native WebXR support (VR button displayed ONLY when VR hardware is supported)
import { VRButton } from 'three/addons/webxr/VRButton.js';

/**
 * Configures WebXR support on the renderer.
 * If VR is not supported on the current device, no 'VR NOT SUPPORTED' tag is shown.
 * @param {THREE.WebGLRenderer} renderer
 */
export function setupWebXR(renderer) {
  if (!('xr' in navigator)) {
    return;
  }

  // Only create and display button if immersive-vr is actively supported
  navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
    if (!supported) {
      // Per user request, do not display 'VR NOT SUPPORTED' badge
      return;
    }

    try {
      renderer.xr.enabled = true;
      renderer.xr.setReferenceSpaceType('local-floor');

      const button = VRButton.createButton(renderer);
      if (button) {
        if (button.textContent.toUpperCase().includes('NOT SUPPORTED')) {
          button.style.display = 'none';
          return;
        }

        // Style VR button with glassmorphic aesthetics
        button.style.position = 'fixed';
        button.style.top = '20px';
        button.style.right = '20px';
        button.style.bottom = 'auto';
        button.style.padding = '10px 18px';
        button.style.border = '1px solid rgba(0, 229, 255, 0.4)';
        button.style.borderRadius = '12px';
        button.style.background = 'rgba(10, 14, 26, 0.7)';
        button.style.backdropFilter = 'blur(16px)';
        button.style.webkitBackdropFilter = 'blur(16px)';
        button.style.color = '#00e5ff';
        button.style.fontFamily = "'Inter', system-ui, sans-serif";
        button.style.fontSize = '12px';
        button.style.fontWeight = '600';
        button.style.letterSpacing = '0.12em';
        button.style.textTransform = 'uppercase';
        button.style.cursor = 'pointer';
        button.style.zIndex = '999';
        button.style.transition = 'all 0.3s ease';
        button.style.boxShadow = '0 0 15px rgba(0, 229, 255, 0.2)';

        button.addEventListener('mouseenter', () => {
          button.style.borderColor = '#00e5ff';
          button.style.boxShadow = '0 0 25px rgba(0, 229, 255, 0.5)';
          button.style.background = 'rgba(0, 229, 255, 0.15)';
        });
        button.addEventListener('mouseleave', () => {
          button.style.borderColor = 'rgba(0, 229, 255, 0.4)';
          button.style.boxShadow = '0 0 15px rgba(0, 229, 255, 0.2)';
          button.style.background = 'rgba(10, 14, 26, 0.7)';
        });

        document.body.appendChild(button);
      }
    } catch (err) {
      console.warn('WebXR initialization failed:', err);
    }
  }).catch(() => {
    // Silently ignore if query fails; never show 'VR NOT SUPPORTED'
  });
}
