import{M as l,O as ei,B as kt,F as gn,S as ft,U as Lo,V as Ne,W as Oo,H as ko,N as ti,C as kn,a as he,b as E,A as ot,c as _e,R as oi,d as ni,e as ii,L as ai,f as si,g as ri,h as Ln,i as li,j as ci,Q as Yt,k as et,E as wo,l as Nn,P as di,m as en,n as hi,G as J,o as xe,p as B,q as Ee,r as At,s as Xe,t as Rt,D as Ve,u as Jt,v as ui,w as _n,T as at,x as pi,y as fi,z as D,I as It,J as zn,K as _o,X as mi,Y as Ut,Z as zo,_ as Dn,$ as gi,a0 as yn,a1 as yi,a2 as vi,a3 as Zt,a4 as bi,a5 as ro,a6 as Vt,a7 as vn,a8 as wi,a9 as Gn,aa as Do,ab as Gt,ac as Un,ad as Hn,ae as Ye,af as lo,ag as co,ah as qe,ai as xi,aj as Si,ak as so,al as Fn,am as No,an as jo,ao as Mi,ap as eo,aq as Ti,ar as Ci,as as go,at as yt,au as Mt,av as Ii,aw as Ei,ax as Ai}from"./three-CSjmy7UD.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const t of s.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&n(t)}).observe(document,{childList:!0,subtree:!0});function o(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=o(i);fetch(i.href,s)}})();const Bn={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class yo{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Ri=new ei(-1,1,1,-1,0,1);class Pi extends kt{constructor(){super(),this.setAttribute("position",new gn([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new gn([0,2,0,0,2,0],2))}}const Oi=new Pi;class tn{constructor(e){this._mesh=new l(Oi,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Ri)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class ki extends yo{constructor(e,o){super(),this.textureID=o!==void 0?o:"tDiffuse",e instanceof ft?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Lo.clone(e.uniforms),this.material=new ft({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new tn(this.material)}render(e,o,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(o),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class bn extends yo{constructor(e,o){super(),this.scene=e,this.camera=o,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,o,n){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let t,r;this.inverse?(t=0,r=1):(t=1,r=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,t,4294967295),s.buffers.stencil.setClear(r),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(o),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class Li extends yo{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Ni{constructor(e,o){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),o===void 0){const n=e.getSize(new Ne);this._width=n.width,this._height=n.height,o=new Oo(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ko}),o.texture.name="EffectComposer.rt1"}else this._width=o.width,this._height=o.height;this.renderTarget1=o,this.renderTarget2=o.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ki(Bn),this.copyPass.material.blending=ti,this.clock=new kn}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,o){this.passes.splice(o,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const o=this.passes.indexOf(e);o!==-1&&this.passes.splice(o,1)}isLastEnabledPass(e){for(let o=e+1;o<this.passes.length;o++)if(this.passes[o].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const o=this.renderer.getRenderTarget();let n=!1;for(let i=0,s=this.passes.length;i<s;i++){const t=this.passes[i];if(t.enabled!==!1){if(t.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),t.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),t.needsSwap){if(n){const r=this.renderer.getContext(),u=this.renderer.state.buffers.stencil;u.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),u.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}bn!==void 0&&(t instanceof bn?n=!0:t instanceof Li&&(n=!1))}}this.renderer.setRenderTarget(o)}reset(e){if(e===void 0){const o=this.renderer.getSize(new Ne);this._pixelRatio=this.renderer.getPixelRatio(),this._width=o.width,this._height=o.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,o){this._width=e,this._height=o;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class _i extends yo{constructor(e,o,n=null,i=null,s=null){super(),this.scene=e,this.camera=o,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new he}render(e,o,n){const i=e.autoClear;e.autoClear=!1;let s,t;this.overrideMaterial!==null&&(t=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=t),e.autoClear=i}}const zi={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new he(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class po extends yo{constructor(e,o,n,i){super(),this.strength=o!==void 0?o:1,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new Ne(e.x,e.y):new Ne(256,256),this.clearColor=new he(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),t=Math.round(this.resolution.y/2);this.renderTargetBright=new Oo(s,t,{type:ko}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const m=new Oo(s,t,{type:ko});m.texture.name="UnrealBloomPass.h"+d,m.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(m);const v=new Oo(s,t,{type:ko});v.texture.name="UnrealBloomPass.v"+d,v.texture.generateMipmaps=!1,this.renderTargetsVertical.push(v),s=Math.round(s/2),t=Math.round(t/2)}const r=zi;this.highPassUniforms=Lo.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ft({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const u=[3,5,7,9,11];s=Math.round(this.resolution.x/2),t=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(u[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new Ne(1/s,1/t),s=Math.round(s/2),t=Math.round(t/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=o,this.compositeMaterial.uniforms.bloomRadius.value=.1;const p=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=p,this.bloomTintColors=[new E(1,1,1),new E(1,1,1),new E(1,1,1),new E(1,1,1),new E(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Bn;this.copyUniforms=Lo.clone(h.uniforms),this.blendMaterial=new ft({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:ot,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new he,this.oldClearAlpha=1,this.basic=new _e,this.fsQuad=new tn(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,o){let n=Math.round(e/2),i=Math.round(o/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new Ne(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,o,n,i,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const t=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let r=this.renderTargetBright;for(let u=0;u<this.nMips;u++)this.fsQuad.material=this.separableBlurMaterials[u],this.separableBlurMaterials[u].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[u].uniforms.direction.value=po.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[u]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[u].uniforms.colorTexture.value=this.renderTargetsHorizontal[u].texture,this.separableBlurMaterials[u].uniforms.direction.value=po.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[u]),e.clear(),this.fsQuad.render(e),r=this.renderTargetsVertical[u];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=t}getSeperableBlurMaterial(e){const o=[];for(let n=0;n<e;n++)o.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new ft({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Ne(.5,.5)},direction:{value:new Ne(.5,.5)},gaussianCoefficients:{value:o}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new ft({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}po.BlurDirectionX=new Ne(1,0);po.BlurDirectionY=new Ne(0,1);const Di={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Gi extends yo{constructor(){super();const e=Di;this.uniforms=Lo.clone(e.uniforms),this.material=new oi({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new tn(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,o,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ni.getTransfer(this._outputColorSpace)===ii&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===ai?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===si?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ri?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ln?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===li?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ci&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(o),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const Wt=18,ao=12,ct=0,wn=12,on={physics:0,chemistry:2*Math.PI/5,biology:2*(2*Math.PI)/5,mathematics:3*(2*Math.PI)/5,astronomy:4*(2*Math.PI)/5};function to(a){const e=on[a];return new E(Math.cos(e)*wn,ct,Math.sin(e)*wn)}const Ui=50,Hi=.1,Fi=200,Xo=new E(0,3.2,6.8),Ko=new E(0,1.8,0),Bi=2,Vi=.88,Yi=.35,Wi=.25,qi=new he(15264495);new he(15396079);const ji=new he(15132908),Xi=new he(14672616),qt=new he(15922423),xo=new he(2238e3),Ki=new he(2040877),jt=new he(13159636),vo=new he(58879),Vn=new he(8146431),Qi=new he(16774630),$i=new he(14739711),Qo=new he(16774112),xn=new he(16754470),Zi=new E(0,0,1),Ji=new E(0,1,0),Sn=new wo,ea=new Yt,ta=new Yt(-Math.sqrt(.5),0,0,Math.sqrt(.5)),Mn=new Yt;function oo(){return typeof document>"u"?null:document.getElementById("vz-viewport-root")||document.body}function nn(){if(typeof navigator>"u")return!1;const a=navigator.userAgent||"",e=/iPad/i.test(a),o=(navigator.platform==="MacIntel"||/Macintosh/i.test(a))&&typeof navigator.maxTouchPoints=="number"&&navigator.maxTouchPoints>1;return e||o}function Qt(){if(typeof navigator>"u")return!1;const a=navigator.userAgent||"",e=typeof navigator.maxTouchPoints=="number"&&navigator.maxTouchPoints>0||"ontouchstart"in window,o=nn(),n=/Android|iPhone|iPod|Windows Phone|Mobile|Tablet|Silk/i.test(a),i=typeof window<"u"&&Math.min(window.innerWidth,window.innerHeight)<=1024&&e;return o||n||i}function oa(){return typeof window>"u"?!1:window.innerWidth>window.innerHeight?!0:window.screen&&window.screen.orientation&&window.screen.orientation.type?window.screen.orientation.type.includes("landscape"):!1}function na(){return typeof window>"u"?0:window.screen&&window.screen.orientation&&typeof window.screen.orientation.angle=="number"?window.screen.orientation.angle:typeof window.orientation=="number"?window.orientation:0}let zt=0;const $o=new Set;function ia(a){return $o.add(a),()=>$o.delete(a)}function Zo(){if(typeof window>"u"||nn())return!1;const a=Math.abs(zt)===90,e=window.innerWidth<window.innerHeight;return a&&e}function aa(){return typeof window>"u"?!1:oa()?!0:Math.abs(zt)===90}function ho(){if(typeof document>"u"||!document.body)return;const a=Qt(),e=aa(),o=Zo();document.body.classList.toggle("vz-mobile-tablet",a),document.body.classList.toggle("vz-desktop",!a),document.body.classList.toggle("vz-orientation-landscape",e),document.body.classList.toggle("vz-orientation-portrait",!e);const n=o&&zt===90,i=o&&zt===-90;document.body.classList.toggle("vz-locked-landscape-ccw",n),document.body.classList.toggle("vz-locked-landscape-cw",i);for(const s of $o)try{s()}catch{}}typeof window<"u"&&window.addEventListener("devicemotion",a=>{const e=a.accelerationIncludingGravity;if(!e)return;const o=e.x??0,n=e.y??0;if(Math.hypot(o,n)<2.5)return;let i=zt;Math.abs(o)>Math.abs(n)+1.2?i=o>0?90:-90:Math.abs(n)>Math.abs(o)+1.2&&(i=n<0?0:180),i!==zt&&(zt=i,ho())},{passive:!0});typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ho):ho());class sa{constructor(e,o){if(this.camera=e,this.controls=o,this.enabled=!1,this.hasSensorData=!1,this.permissionGranted=!1,this.rawAlpha=null,this.rawBeta=90,this.rawGamma=0,this.screenOrientation=0,this.yawOffset=0,this.initialHeadingCalibrated=!1,this.targetQuat=new Yt,this.currentQuat=new Yt,this._activeEventListener=null,this._onDeviceOrientation=this._onDeviceOrientation.bind(this),this._onScreenOrientationChange=this._onScreenOrientationChange.bind(this),this._initListeners(),this._injectStyles(),this._createUI(),Qt()){const n=async()=>{window.removeEventListener("touchstart",n),window.removeEventListener("touchend",n),this.enabled||await this.enable()};window.addEventListener("touchend",n,{passive:!0,once:!0})}}_initListeners(){const e=()=>{this._onScreenOrientationChange(),setTimeout(()=>this._onScreenOrientationChange(),150),setTimeout(()=>this._onScreenOrientationChange(),350)};window.addEventListener("orientationchange",e,!1),window.screen&&window.screen.orientation&&window.screen.orientation.addEventListener("change",e,!1),window.addEventListener("resize",e,!1),this._onScreenOrientationChange();let o=0,n=0,i=!1;window.addEventListener("touchstart",s=>{s.touches&&s.touches.length===1&&(o=s.touches[0].clientX,n=s.touches[0].clientY,i=!0)},{passive:!0}),window.addEventListener("touchmove",s=>{if(i&&this.enabled&&s.touches&&s.touches.length===1){let t=s.touches[0].clientX-o,r=s.touches[0].clientY-n;o=s.touches[0].clientX,n=s.touches[0].clientY,document.body&&document.body.classList.contains("vz-locked-landscape-ccw")?t=r:document.body&&document.body.classList.contains("vz-locked-landscape-cw")&&(t=-r),this.yawOffset-=t*.0035}},{passive:!0}),window.addEventListener("touchend",()=>{i=!1},{passive:!0})}_onScreenOrientationChange(){const e=na(),o=this.screenOrientation!==e;this.screenOrientation=e,ho(),o&&this.hasSensorData&&this.rawAlpha!==null&&this._calibrateHeading()}_computeDeviceQuaternion(e,o,n,i,s){const t=nn()?0:i,r=et.degToRad(e),u=et.degToRad(o),p=et.degToRad(n),h=et.degToRad(t);Sn.set(u,r,-p,"YXZ"),s.setFromEuler(Sn),s.multiply(ta),s.multiply(ea.setFromAxisAngle(Zi,-h))}_calibrateHeading(){if(this.rawAlpha===null)return;const e=new Yt,o=Zo()?0:this.screenOrientation;this._computeDeviceQuaternion(this.rawAlpha,this.rawBeta,this.rawGamma,o,e);const n=new E(0,0,-1).applyQuaternion(e),i=Math.atan2(-n.x,-n.z),s=new E(0,0,-1).applyQuaternion(this.camera.quaternion),t=Math.atan2(-s.x,-s.z);this.yawOffset=t-i,this.initialHeadingCalibrated=!0}_onDeviceOrientation(e){if(typeof e.alpha!="number")return;const o=e.alpha,n=e.beta??90,i=e.gamma??0;if(Math.abs(i)>42&&Math.abs(n)<55){const t=i<0?90:-90;t!==zt&&(zt=t,ho())}else if(Math.abs(n)>42&&Math.abs(i)<35){const t=n>0?0:180;t!==zt&&(zt=t,ho())}if(!this.initialHeadingCalibrated||this.rawAlpha===null){this.rawAlpha=o,this.rawBeta=n,this.rawGamma=i,this.hasSensorData=!0,this._calibrateHeading(),this.currentQuat.copy(this.camera.quaternion),this._uiBtn&&!this._uiBtn.classList.contains("active")&&this._updateUIState(!0);return}let s=(o-this.rawAlpha+540)%360-180;this.rawAlpha=(this.rawAlpha+s*.4)%360,this.rawAlpha<0&&(this.rawAlpha+=360),this.rawBeta+=(n-this.rawBeta)*.4,this.rawGamma+=(i-this.rawGamma)*.4,this.hasSensorData=!0,this._uiBtn&&!this._uiBtn.classList.contains("active")&&this._updateUIState(!0)}async requestPermission(){if(typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function")try{const e=await DeviceOrientationEvent.requestPermission();return this.permissionGranted=e==="granted",this.permissionGranted}catch(e){return console.warn("DeviceOrientationEvent.requestPermission failed:",e),!1}return this.permissionGranted=!0,!0}async enable(){if(!await this.requestPermission())return console.warn("Gyroscope permission not granted."),!1;this.enabled=!0,this.initialHeadingCalibrated=!1,this.controls&&(this.controls.enabled=!1,this.controls.autoRotate=!1),this._activeEventListener&&(window.removeEventListener(this._activeEventListener,this._onDeviceOrientation,!1),this._activeEventListener=null);const o="ondeviceorientationabsolute"in window;return this._activeEventListener=o?"deviceorientationabsolute":"deviceorientation",window.addEventListener(this._activeEventListener,this._onDeviceOrientation,!1),this._updateUIState(!0),!0}disable(){if(this.enabled=!1,this.hasSensorData=!1,this._activeEventListener&&(window.removeEventListener(this._activeEventListener,this._onDeviceOrientation,!1),this._activeEventListener=null),this.controls){const e=new E(0,0,-1).applyQuaternion(this.camera.quaternion);this.controls.target.copy(this.camera.position).addScaledVector(e,5),this.controls.enabled=!0,this.controls.update()}this._updateUIState(!1)}async toggle(){this.enabled?this.disable():await this.enable()}update(e=.016){if(!this.enabled||!this.hasSensorData||this.rawAlpha===null)return;const o=Zo()?0:this.screenOrientation;this._computeDeviceQuaternion(this.rawAlpha,this.rawBeta,this.rawGamma,o,this.targetQuat),this.yawOffset!==0&&(Mn.setFromAxisAngle(Ji,this.yawOffset),this.targetQuat.premultiply(Mn)),this.camera.quaternion.dot(this.targetQuat)<0&&(this.targetQuat.x=-this.targetQuat.x,this.targetQuat.y=-this.targetQuat.y,this.targetQuat.z=-this.targetQuat.z,this.targetQuat.w=-this.targetQuat.w);const n=Math.min(1,e*18);this.camera.quaternion.slerp(this.targetQuat,n)}_injectStyles(){if(document.getElementById("vz-gyro-styles"))return;const e=document.createElement("style");e.id="vz-gyro-styles",e.textContent=`
      #vz-gyro-toggle {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1002;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 9px 16px;
        border: 1px solid rgba(0, 229, 255, 0.35);
        border-radius: 12px;
        background: rgba(10, 14, 26, 0.72);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        color: #e0e8ff;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        cursor: pointer;
        pointer-events: auto;
        transition: all 0.25s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        user-select: none;
        -webkit-user-select: none;
      }

      #vz-gyro-toggle:hover {
        background: rgba(0, 229, 255, 0.15);
        border-color: #00e5ff;
        box-shadow: 0 0 16px rgba(0, 229, 255, 0.4);
      }

      #vz-gyro-toggle.active {
        background: rgba(0, 229, 255, 0.18);
        border-color: #00e5ff;
        color: #00f5ff;
        box-shadow: 0 0 20px rgba(0, 229, 255, 0.5);
      }

      #vz-gyro-toggle .vz-gyro-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #64748b;
        transition: all 0.25s ease;
      }

      #vz-gyro-toggle.active .vz-gyro-dot {
        background: #00f5ff;
        box-shadow: 0 0 8px #00f5ff;
        animation: vz-pulse-dot 1.8s infinite ease-in-out;
      }

      @keyframes vz-pulse-dot {
        0%, 100% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.35); opacity: 1; }
      }

      @media (max-width: 600px) {
        #vz-gyro-toggle {
          top: 14px;
          right: 14px;
          padding: 8px 12px;
          font-size: 11px;
        }
      }
    `,document.head.appendChild(e)}_createUI(){const e=document.createElement("button");e.id="vz-gyro-toggle",e.innerHTML=`
      <span class="vz-gyro-dot"></span>
      <span class="vz-gyro-icon">🧭</span>
      <span class="vz-gyro-text">GYRO 360°</span>
    `,e.addEventListener("click",n=>{n.stopPropagation(),this.toggle()}),oo().appendChild(e),this._uiBtn=e}_updateUIState(e){if(this._uiBtn)if(e){this._uiBtn.classList.add("active");const o=this._uiBtn.querySelector(".vz-gyro-text");o&&(o.textContent="GYRO ACTIVE")}else{this._uiBtn.classList.remove("active");const o=this._uiBtn.querySelector(".vz-gyro-text");o&&(o.textContent="GYRO 360°")}}}function ra(a,e){return new sa(a,e)}function la(a){const e=new Nn({antialias:!0,powerPreference:"high-performance",alpha:!1});return e.setPixelRatio(Math.min(window.devicePixelRatio,Bi)),e.setSize(window.innerWidth,window.innerHeight),e.toneMapping=Ln,e.toneMappingExposure=.94,e.shadowMap.enabled=!0,e.shadowMap.type=di,e.outputColorSpace=en,e.xr.enabled=!0,a.appendChild(e.domElement),e}function ca(){const a=new hi(Ui,window.innerWidth/window.innerHeight,Hi,Fi);return a.position.copy(Xo),a}function da(a,e,o){const n=new Ne;a.getSize(n);const i=new Ni(a);i.addPass(new _i(e,o));const s=new po(n,Yi,Wi,Vi);return i.addPass(s),i.addPass(new Gi),{composer:i,bloomPass:s}}function ha(a,e,o){const n=()=>{let i=window.innerWidth,s=window.innerHeight;typeof document<"u"&&document.body&&(document.body.classList.contains("vz-locked-landscape-ccw")||document.body.classList.contains("vz-locked-landscape-cw"))&&(i=Math.max(window.innerWidth,window.innerHeight),s=Math.min(window.innerWidth,window.innerHeight)),e.aspect=i/s,e.updateProjectionMatrix(),a.setSize(i,s),o.setSize(i,s)};return window.addEventListener("resize",n),window.addEventListener("orientationchange",()=>{n(),setTimeout(n,150),setTimeout(n,350)}),ia(()=>{n()}),n}const io=[{id:"kalam",name:"DR. A.P.J. ABDUL KALAM",category:"INDIAN SCIENTIFIC PIONEER",lifespan:"1931 – 2015  |  AEROSPACE & DEFENCE",subtitle:"Missile Man of India & 11th President of India",image:"/scientists/kalam.jpg",slides:[{quote:"“Dream is not that which you see while sleeping, it is something that does not let you sleep.”",equationName:"ROCKET PROPULSION & THRUST DYNAMICS",equation:"v(t) = v₀ + u · ln(m₀ / m) - g · t",discovery:"Architect of India’s first Satellite Launch Vehicle (SLV-3) and Indigenous Guided Missile Programme (AGNI & PRITHVI)."},{quote:"“To succeed in your mission, you must have single-minded devotion to your goal.”",equationName:"AERODYNAMIC RE-ENTRY HEATING",equation:"q̇ = C · √(ρ / R_n) · V³",discovery:"Pioneered carbon-composite heat shield structures for ballistic missile atmospheric re-entry protection."},{quote:"“Excellence happens not by accident. It is a process where an individual strives to better themselves.”",equationName:"ISRO-DRDO INDIGENOUS INTEGRATION",equation:"Technology Self-Reliance = Applied R&D × Vision",discovery:"Spearheaded nuclear technology integration and modernised India’s defence and aerospace infrastructure."}]},{id:"radhakrishnan",name:"DR. S. RADHAKRISHNAN",category:"INDIAN SCHOLAR & PHILOSOPHER",lifespan:"1888 – 1975  |  EPISTEMOLOGY & ETHICS",subtitle:"Statesman, Thinker & 2nd President of India",image:"/scientists/radhakrishnan.jpg",slides:[{quote:"“The true teachers are those who help us think for ourselves. Knowledge gives power, wisdom gives fullness.”",equationName:"EPISTEMOLOGY OF SCIENTIFIC DISCOVERY",equation:"Satyam · Shivam · Sundaram  [Truth & Goodness]",discovery:"Bridged eastern philosophy and modern scientific inquiry, championing rational thought in democratic nation-building."},{quote:"“When we think we know, we cease to learn. Humility is the foundation of genuine knowledge.”",equationName:"SYNTHESIS OF SCIENCE & SPIRIT",equation:"Progress = Empirical Truth × Ethical Responsibility",discovery:"Represented India at UNESCO and inspired national Teachers’ Day to celebrate mentorship in science and philosophy."}]},{id:"raman",name:"SIR C.V. RAMAN",category:"INDIAN SCIENTIFIC PIONEER",lifespan:"1888 – 1970  |  OPTICS & QUANTUM SPECTROSCOPY",subtitle:"Nobel Laureate in Physics (1930)",image:"/scientists/raman.JPG",slides:[{quote:"“The essence of science is independent thinking, hard work, and not equipment. I am the master of my failure.”",equationName:"THE RAMAN EFFECT (INELASTIC SCATTERING)",equation:"Δν = ν₀ - ν_s = ΔE_vib / h",discovery:"Discovered that photons scattered by molecules undergo frequency shifts revealing their vibrational quantum energy levels."},{quote:"“I would like to tell young men and women: Do not lose hope. Courage is the finest attribute of a scientist.”",equationName:"MOLECULAR LIGHT SCATTERING INTENSITY",equation:"I_s ∝ (1 + cos²θ) / λ⁴ · |α_ij|²",discovery:"First Asian scientist to receive the Nobel Prize in Physics; transformed chemical identification and molecular crystallography."}]},{id:"ramanujan",name:"SRINIVASA RAMANUJAN",category:"INDIAN SCIENTIFIC PIONEER",lifespan:"1887 – 1920  |  PURE MATHEMATICS & NUMBER THEORY",subtitle:"Fellow of the Royal Society, Cambridge",image:"/scientists/ramanujan.jpg",slides:[{quote:"“An equation for me has no meaning unless it expresses a thought of God.”",equationName:"RAMANUJAN INFINITE SERIES FOR π",equation:"1/π = (2√2 / 9801) ∑ₖ [(4k)!(1103 + 26390k)] / [(k!)⁴ 396⁴ᵏ]",discovery:"Formulated revolutionary identities in elliptic modular functions, mock theta series, and asymptotic partition theory p(n)."},{quote:"“To have made such discoveries with no formal training is the work of absolute mathematical genius.”",equationName:"HARDY-RAMANUJAN ASYMPTOTIC FORMULA",equation:"p(n) ∼ (1 / 4n√3) · exp( π √(2n/3) )",discovery:"Unveiled profound connections in analytic number theory now applied in string theory and black hole entropy."}]},{id:"snbose",name:"SATYENDRA NATH BOSE",category:"INDIAN SCIENTIFIC PIONEER",lifespan:"1894 – 1974  |  QUANTUM STATISTICAL MECHANICS",subtitle:"Pioneer of Quantum Statistics & Bosons",image:"/scientists/snbose.jpg",slides:[{quote:"“If science is to flourish, it must be pursued for the love of truth and with absolute freedom of spirit.”",equationName:"BOSE-EINSTEIN DISTRIBUTION FUNCTION",equation:"⟨nᵢ⟩ = gᵢ / [ e^( (εᵢ - μ) / k_B T ) - 1 ]",discovery:"Derived Planck’s law without classical electrodynamics, founding quantum statistics for integer-spin particles (Bosons)."},{quote:"“The mind must remain open, for the truth of nature is beyond all human pre-conceived notions.”",equationName:"BOSE-EINSTEIN CONDENSATION CRITICALITY",equation:"T_c = (2πℏ² / m k_B) · (n / 2.612)^(2/3)",discovery:"Predicted a new fifth state of matter where macroscopic ensembles of bosons condense into a single quantum wave function."}]},{id:"bhabha",name:"DR. HOMI J. BHABHA",category:"INDIAN SCIENTIFIC PIONEER",lifespan:"1909 – 1966  |  NUCLEAR & PARTICLE PHYSICS",subtitle:"Father of the Indian Nuclear Programme",image:"/scientists/bhabha.jpg",slides:[{quote:"“For the full industrialisation of any country, the vastest physical basis is atomic energy.”",equationName:"BHABHA SCATTERING CROSS-SECTION (e⁺ e⁻ → e⁺ e⁻)",equation:"dσ/dΩ = (α² / 8E²) [ (1 + cos⁴(θ/2))/sin⁴(θ/2) + ... ]",discovery:"Calculated electron-positron relativistic scattering in quantum electrodynamics and founded TIFR & BARC."},{quote:"“Science does not simply solve problems; it builds the intellectual infrastructure of an entire civilization.”",equationName:"THREE-STAGE NUCLEAR POWER PROGRAMME",equation:"²³²Th + n → ²³³Th → ²³³Pa → ²³³U  (Thorium Fuel Cycle)",discovery:"Devised India’s long-term energy security strategy utilizing abundant indigenous thorium deposits."}]},{id:"sarabhai",name:"DR. VIKRAM SARABHAI",category:"INDIAN SCIENTIFIC PIONEER",lifespan:"1919 – 1971  |  COSMIC RAYS & SPACE EXPLORATION",subtitle:"Father of the Indian Space Programme (ISRO)",image:"/scientists/sarabhai.jpg",slides:[{quote:"“We must be second to none in the application of advanced technologies to the real problems of man and society.”",equationName:"COSMIC RAY SOLAR DIURNAL VARIATION",equation:"J⃗ = q n (v⃗_E + v⃗_D + v⃗_‖)  [Plasma Drift]",discovery:"Established India’s space program, launched the Thumba Equatorial Rocket Station, and founded ISRO."},{quote:"“He who can listen to the music in the midst of noise can achieve the greatest things.”",equationName:"SATELLITE INSTRUCTIONAL TELEVISION (SITE)",equation:"Broadband Satellite Communication = Direct Social Impact",discovery:"Pioneered direct satellite educational broadcasts to rural communities, demonstrating technological humanitarianism."}]},{id:"jcbose",name:"SIR JAGADISH CHANDRA BOSE",category:"INDIAN SCIENTIFIC PIONEER",lifespan:"1858 – 1937  |  MICROWAVE OPTICS & PLANT BIOPHYSICS",subtitle:"Pioneer of Millimetre Radio Waves & Crescograph",image:"/scientists/jcbose.JPG",slides:[{quote:"“The true laboratory is the mind, where behind all illusions we uncover the immutable laws of truth.”",equationName:"MICROWAVE OPTICS GENERATION (λ = 5mm, 60 GHz)",equation:"∇ × E⃗ = -∂B⃗/∂t,   ∇ × B⃗ = μ₀ε₀ ∂E⃗/∂t",discovery:"Invented millimetre-wave radio transmitters using semiconductor galena crystal detectors, preceding modern Wi-Fi & 5G."},{quote:"“In the pursuit of science, there is no barrier of race or country. Science is universal.”",equationName:"CRESCOGRAPH CELLULAR PLANT RESPONSE",equation:"ΔL = M · Δx  [10,000× Magnification of Plant Growth]",discovery:"Demonstrated electrical conduction and fatigue responses in living plants analogous to animal nervous tissue."}]},{id:"einstein",name:"ALBERT EINSTEIN",category:"GLOBAL SCIENTIFIC HERITAGE",lifespan:"1879 – 1955  |  THEORETICAL PHYSICS",subtitle:"Nobel Laureate in Physics (1921)",image:"/scientists/einstein.jpg",slides:[{quote:"“Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the world.”",equationName:"EINSTEIN FIELD EQUATIONS & MASS-ENERGY",equation:"G_μν + Λ g_μν = (8πG / c⁴) T_μν ,   E = mc²",discovery:"Formulated Special and General Relativity, revolutionizing gravity as spacetime curvature and explaining the photoelectric effect."}]},{id:"newton",name:"SIR ISAAC NEWTON",category:"GLOBAL SCIENTIFIC HERITAGE",lifespan:"1643 – 1727  |  CLASSICAL MECHANICS & OPTICS",subtitle:"Foundations of Modern Mathematical Physics",image:"/scientists/newton.jpg",slides:[{quote:"“If I have seen further, it is by standing on the shoulders of giants.”",equationName:"LAW OF UNIVERSAL GRAVITATION & MOTION",equation:"F⃗ = -G (m₁ m₂ / r²) r̂,   F⃗ = dp⃗/dt = m a⃗",discovery:"Established the three fundamental laws of motion, universal gravitation, infinitesimal calculus, and optical prism refraction."}]},{id:"curie",name:"MARIE SKŁODOWSKA CURIE",category:"GLOBAL SCIENTIFIC HERITAGE",lifespan:"1867 – 1934  |  RADIOCHEMISTRY & NUCLEAR PHYSICS",subtitle:"Two-Time Nobel Laureate (Physics 1903, Chemistry 1911)",image:"/scientists/curie.jpg",slides:[{quote:"“Nothing in life is to be feared, it is only to be understood. Now is the time to understand more.”",equationName:"LAW OF RADIOACTIVE DISINTEGRATION",equation:"N(t) = N₀ e^(-λ t),   A(t) = -dN/dt = λ N(t)",discovery:"Discovered Polonium and Radium, defined the nature of radioactivity, and developed mobile radiography units for battlefield surgery."}]},{id:"tesla",name:"NIKOLA TESLA",category:"GLOBAL SCIENTIFIC HERITAGE",lifespan:"1856 – 1943  |  ELECTROMAGNETISM & POWER SYSTEMS",subtitle:"Visionary Pioneer of Alternating Current",image:"/scientists/tesla.jpg",slides:[{quote:"“If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.”",equationName:"LC RESONANT FREQUENCY & TESLA TRANSFORMER",equation:"f_r = 1 / (2π √(L C)),   ω = 2π f",discovery:"Invented the polyphase AC induction motor, alternating current power grid, radio remote control, and the resonant Tesla transformer."}]}];function Tn(a,e=null){const o=document.createElement("canvas");o.width=1400,o.height=1640;const n=o.getContext("2d"),i=o.width,s=o.height,t=n.createLinearGradient(0,0,0,s);t.addColorStop(0,"#151923"),t.addColorStop(.3,"#10131b"),t.addColorStop(.8,"#0b0d14"),t.addColorStop(1,"#07090e"),n.fillStyle=t,n.fillRect(0,0,i,s),n.strokeStyle="#262f3f",n.lineWidth=14,n.strokeRect(7,7,i-14,s-14),n.strokeStyle="rgba(212, 175, 55, 0.45)",n.lineWidth=2,n.strokeRect(22,22,i-44,s-44);const r=28;n.strokeStyle="#d4af37",n.lineWidth=3,n.strokeRect(26,26,r,r),n.strokeRect(i-26-r,26,r,r),n.strokeRect(26,s-26-r,r,r),n.strokeRect(i-26-r,s-26-r,r,r);const u=1200,p=1260,h=75;if(e&&e.complete&&e.naturalWidth>0){const f=Math.min(u/e.naturalWidth,p/e.naturalHeight),c=Math.round(e.naturalWidth*f),P=Math.round(e.naturalHeight*f),M=Math.round((i-c)/2),I=Math.round(h+(p-P)/2);n.shadowColor="rgba(0, 0, 0, 0.9)",n.shadowBlur=24,n.shadowOffsetY=6,n.fillStyle="#06080d",n.fillRect(M,I,c,P),n.shadowColor="transparent",n.drawImage(e,0,0,e.naturalWidth,e.naturalHeight,M,I,c,P),n.strokeStyle="rgba(212, 175, 55, 0.85)",n.lineWidth=3.5,n.strokeRect(M,I,c,P),n.strokeStyle="rgba(255, 255, 255, 0.2)",n.lineWidth=1.5,n.strokeRect(M+6,I+6,c-12,P-12)}else{const P=(i-1e3)/2,M=h+30;n.fillStyle="#181e28",n.fillRect(P,M,1e3,1200),n.fillStyle="#6b7280",n.font='italic 24px "Georgia", serif',n.textAlign="center",n.fillText("Archival Portrait Loading…",i/2,M+1200/2)}const d=h+p+125;let m=74;for(n.font=`900 ${m}px "Inter", "Segoe UI", "Arial Black", sans-serif`;n.measureText(a.name).width>i-180&&m>48;)m-=2,n.font=`900 ${m}px "Inter", "Segoe UI", "Arial Black", sans-serif`;n.textAlign="center",n.textBaseline="middle",n.letterSpacing="4px",n.shadowColor="rgba(0, 0, 0, 0.9)",n.shadowBlur=16,n.shadowOffsetY=4,n.fillStyle="#ffffff",n.fillText(a.name,i/2,d),n.shadowColor="transparent",n.shadowBlur=0,n.shadowOffsetY=0;const v=n.measureText(a.name).width,S=Math.min(v+80,i-280),y=d+46;return n.strokeStyle="rgba(212, 175, 55, 0.65)",n.lineWidth=2,n.beginPath(),n.moveTo(i/2-S/2,y),n.lineTo(i/2+S/2,y),n.stroke(),n.fillStyle="#d4af37",n.font='16px "Inter", sans-serif',n.fillText("◆",i/2,y),o}function ua(a,e,o){const n=new J;n.name="ScientistMuseumExhibits",a.add(n);const i=24,s=18-.05,t=3.44,r=t*(1400/1640),u=[],p=[],h=new xe({color:13159636,metalness:.94,roughness:.24,clearcoat:.5}),d=new B({color:1580068,roughness:.85,metalness:.15}),m=new Map;io.forEach(M=>{const I=new Image;I.crossOrigin="anonymous",I.src=M.image,m.set(M.id,I)});let v=0;for(let M=0;M<i;M++){if(M%2!==0)continue;let I=v%io.length,H=io[I];v++;const x=M/i*Math.PI*2,R=(M+1)/i*Math.PI*2,w=(x+R)/2,C=new J;C.position.set(Math.cos(w)*(s-.06),3.4,Math.sin(w)*(s-.06)),C.lookAt(0,3.4,0),n.add(C);const g=new Ee(r,t,.08),A=new l(g,d);A.position.set(0,0,-.04),A.receiveShadow=!0,C.add(A);const _=new Ee(r+.04,t+.04,.03),V=new l(_,h);V.position.set(0,0,-.01),C.add(V);const Z=new At(r*.94,t*.94),ee=m.get(H.id),q=Tn(H,ee),re=new Xe(q);re.colorSpace=en,re.minFilter=Rt,re.generateMipmaps=!0;const X=new B({map:re,emissive:16777215,emissiveMap:re,emissiveIntensity:.65,roughness:.88,metalness:0,side:Ve,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),O=new l(Z,X);O.position.set(0,0,.025),O.name=`ScientistPlaque_${H.id}`,O.userData={isScientistPlaque:!0,scientistId:H.id,exhibitAnchor:C},C.add(O);const L=new Ee(r*1.05,t*1.05,.35),te=new l(L,new _e({visible:!1}));te.name=`HitMesh_${H.id}`,te.userData={isScientistPlaque:!0,scientistId:H.id,exhibitAnchor:C},C.add(te),p.push(te,O);const se=Se=>{I=(Se+io.length)%io.length,H=io[I];const N=m.get(H.id),b=Tn(H,N);re.image=b,re.needsUpdate=!0};ee&&!ee.complete&&(ee.onload=()=>se(I)),u.push({get scientist(){return H},get currentScientistIdx(){return I},anchor:C,mesh:O,texture:re,redraw:se})}const S=new Jt,y=new Ne;let f={x:0,y:0,time:0};const c=M=>{f={x:M.clientX??M.touches?.[0]?.clientX??0,y:M.clientY??M.touches?.[0]?.clientY??0,time:performance.now()}},P=M=>{if(!o||!e)return;const I=M.clientX??M.changedTouches?.[0]?.clientX??0,H=M.clientY??M.changedTouches?.[0]?.clientY??0,x=Math.hypot(I-f.x,H-f.y),R=performance.now()-f.time;if(x>14||R>650||M.target&&(M.target.closest("#scientist-telemetry-hud")||M.target.closest("#rocket-telemetry-hud")||M.target.closest("#celestial-telemetry-hud")||M.target.closest("#robot-telemetry-hud")||M.target.closest("#hud-container")||M.target.closest(".hud-panel")||M.target.closest("button")||M.target.closest("input")))return;y.x=I/window.innerWidth*2-1,y.y=-(H/window.innerHeight)*2+1,S.setFromCamera(y,o);const w=S.intersectObjects(p,!0);if(w.length>0){let C=null,g=null;for(const A of w){let _=A.object;for(;_;){if(_.userData?.isScientistPlaque){C=_.userData.scientistId,g=_.userData.exhibitAnchor;break}_=_.parent}if(C)break}C&&g&&(e.getActiveScientist()?.id===C?e.deselect():e.selectScientist(g,C))}else e.getActiveScientist()&&e.deselect()};return window.addEventListener("pointerdown",c,{passive:!0}),window.addEventListener("pointerup",P,{passive:!0}),{exhibits:u,selectScientist:M=>{const I=u.find(H=>H.scientist.id===M);I&&e&&e.selectScientist(I.anchor,M)}}}function pa(a,e,o,n){const i=new J;i.name="AtriumGroup",a.add(i),fa(a),ma(i),ga(i),ya(i);const s=ua(i,o,n);return i.userData.wallExhibits=s,va(i),ba(i),wa(i),i}function fa(a){const e=new Nn({antialias:!1}),o=new ui(e);o.compileEquirectangularShader();const n=new _n;n.background=new he(790552);const i=new Ee(8,.35,1.5),s=new _e({color:47316}),t=new _e({color:16773341});new _e({color:6174129});for(let h=0;h<8;h++){const d=h/8*Math.PI*2,m=new l(i,h%2===0?t:s);m.position.set(Math.cos(d)*14,7.5+Math.sin(h)*1.5,Math.sin(d)*14),m.rotation.y=-d,n.add(m)}const r=new l(new at(8,.3,16,64),t);r.position.set(0,11,0),r.rotation.x=Math.PI/2,n.add(r);const u=new pi(.1,100,new fi(256));u.update(e,n);const p=o.fromCubemap(u.renderTarget.texture).texture;a.environment=p,e.dispose(),o.dispose()}function ma(a){const e=Wt+.5,o=new D(e,e,.2,128),n=new xe({color:Xi,roughness:.3,metalness:.04,clearcoat:.22,clearcoatRoughness:.28,reflectivity:.45,envMapIntensity:.7}),i=new l(o,n);i.position.y=ct-.1,i.receiveShadow=!0,a.add(i);const s=[4.2,8.2,12,15.6],t=new xe({color:jt,metalness:.94,roughness:.24,clearcoat:.5}),r=new B({color:xo,roughness:.88,metalness:.1});for(const u of s){const p=new It(u-.08,u+.08,96);p.rotateX(-Math.PI/2);const h=new l(p,r);h.position.y=ct+.001,h.receiveShadow=!0,a.add(h);const d=new It(u-.04,u+.04,96);d.rotateX(-Math.PI/2);const m=new l(d,t);m.position.y=ct+.002,m.receiveShadow=!0,a.add(m)}for(let u=0;u<24;u++){const p=u/24*Math.PI*2,h=e-3.2,d=new At(.045,h);d.rotateX(-Math.PI/2),d.rotateY(p);const m=new l(d,r);m.position.set(Math.cos(p)*(h/2+2.8),ct+.0015,Math.sin(p)*(h/2+2.8)),a.add(m)}}function ga(a){const e=[],o=Wt,n=ao;e.push(new Ne(o+.6,ct)),e.push(new Ne(o,ct+.05));for(let r=0;r<=12;r++){const u=r/12,p=ct+.05+u*6.2,h=o+Math.sin(u*Math.PI)*.35;e.push(new Ne(h,p))}e.push(new Ne(o-.25,ct+6.8)),e.push(new Ne(o-1.15,ct+7.9));for(let r=0;r<=12;r++){const p=r/12*Math.PI/2,h=ct+7.9+Math.sin(p)*(n-7.9),d=(o-1.15)*(1-Math.sin(p*.94));e.push(new Ne(Math.max(d,2.6),h))}e.push(new Ne(2.6,n+.15)),e.push(new Ne(2.9,n+.45));const i=new zn(e,96);i.computeVertexNormals();const s=new B({color:ji,roughness:.74,metalness:.04,side:_o}),t=new l(i,s);t.receiveShadow=!0,a.add(t)}function ya(a){const o=Wt-.05,n=new xe({color:jt,metalness:.94,roughness:.22,clearcoat:.5}),i=new B({color:xo,roughness:.88,metalness:.12}),s=new B({color:qi,roughness:.72,metalness:.04});new xe({color:Ki,roughness:.35,metalness:.65,clearcoat:.3});for(let t=0;t<24;t++){const r=t/24*Math.PI*2,u=(t+1)/24*Math.PI*2,p=(r+u)/2,h=new Ee(.18,6.3,.32),d=new l(h,i);d.position.set(Math.cos(r)*(o+.02),ct+3.2,Math.sin(r)*(o+.02)),d.rotation.y=-r+Math.PI/2,a.add(d);const m=new Ee(.1,6.2,.22),v=new l(m,n);v.position.set(Math.cos(r)*o,ct+3.2,Math.sin(r)*o),v.rotation.y=-r+Math.PI/2,v.castShadow=!0,v.receiveShadow=!0,a.add(v);const S=2*Math.PI*o/24-.26,y=new Ee(S,5.8,.06),f=new l(y,s);f.position.set(Math.cos(p)*(o-.02),ct+3.2,Math.sin(p)*(o-.02)),f.rotation.y=-p+Math.PI/2,f.receiveShadow=!0,a.add(f)}}function va(a){const e=new J;e.name="CeilingGrid";const o=new xe({color:jt,metalness:.94,roughness:.22,clearcoat:.5}),n=new B({color:xo,roughness:.88,metalness:.1}),i=[{r:15.2,y:8.2,w:.12},{r:12.4,y:9.3,w:.1},{r:9,y:10.3,w:.1},{r:5.6,y:11.2,w:.08}];for(const f of i){const c=new at(f.r,f.w*.7,8,96),P=new l(c,n);P.position.y=f.y,P.rotation.x=Math.PI/2,e.add(P);const M=new at(f.r,f.w*.45,8,96),I=new l(M,o);I.position.y=f.y+.02,I.rotation.x=Math.PI/2,e.add(I)}const s=12;for(let f=0;f<s;f++){const c=f/s*Math.PI*2,P=new mi(new E(Math.cos(c)*(Wt-1.2),7.8,Math.sin(c)*(Wt-1.2)),new E(Math.cos(c)*7.5,11.2,Math.sin(c)*7.5),new E(Math.cos(c)*2.7,ao+.05,Math.sin(c)*2.7)),M=new Ut(P,32,.07,8,!1),I=new l(M,o);I.castShadow=!0,I.receiveShadow=!0,e.add(I)}const t=new at(2.65,.16,16,64),r=new xe({color:jt,roughness:.18,metalness:.92,clearcoat:.6}),u=new l(t,r);u.position.set(0,ao+.1,0),u.rotation.x=Math.PI/2,e.add(u);const p=new zo(2.58,64);p.rotateX(Math.PI/2);const h=new _e({color:16777215,side:Ve}),d=new l(p,h);d.position.set(0,ao+.12,0),e.add(d);const m=new It(2.42,2.62,64);m.rotateX(Math.PI/2);const v=new _e({color:16054527,side:Ve,transparent:!0,opacity:.95}),S=new l(m,v);S.position.set(0,ao+.11,0),e.add(S);const y=new Dn(16776698,2.8,24,Math.PI*.38,.5,1.2);y.position.set(0,ao+.05,0),y.target.position.set(0,0,0),e.add(y),e.add(y.target),a.add(e)}function ba(a){const e=Wt,o=new at(e-.12,.045,12,96),n=new B({color:8755,emissive:vo,emissiveIntensity:2.2,roughness:.2}),i=new l(o,n);i.position.y=ct+.06,i.rotation.x=Math.PI/2,a.add(i);const s=new at(e-1.22,.05,12,96),t=new B({color:3351057,emissive:Qo,emissiveIntensity:2,roughness:.2}),r=new l(s,t);r.position.y=ct+7.65,r.rotation.x=Math.PI/2,a.add(r);const u=new at(e+.08,.035,12,96),p=new B({color:2232627,emissive:Vn,emissiveIntensity:2,roughness:.2}),h=new l(u,p);h.position.y=ct+4.2,h.rotation.x=Math.PI/2,a.add(h)}function wa(a){const e=new J;e.position.set(0,ct,0);const o=new D(2.4,2.6,.15,64),n=new B({color:qt,roughness:.92,metalness:0}),i=new l(o,n);i.position.y=.075,i.receiveShadow=!0,e.add(i);const s=new It(1.8,1.95,64);s.rotateX(-Math.PI/2);const t=new B({emissive:vo,emissiveIntensity:2,color:58879}),r=new l(s,t);r.position.y=.151,e.add(r);const u=xa(),p=new zo(1.68,64);p.rotateX(-Math.PI/2);const h=new B({map:u,roughness:.25,metalness:.1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),d=new l(p,h);d.position.y=.152,e.add(d);const m=new It(1.67,1.71,64);m.rotateX(-Math.PI/2);const v=new B({color:13938487,metalness:.85,roughness:.2}),S=new l(m,v);S.position.y=.153,e.add(S),a.add(e)}function xa(){const a=document.createElement("canvas");a.width=2048,a.height=2048;const e=a.getContext("2d"),o=2048,n=2048,i=o/2,s=n/2,t=new Xe(a);t.colorSpace=en,t.anisotropy=16,t.generateMipmaps=!0,t.minFilter=gi,t.magFilter=Rt;function r(d){e.clearRect(0,0,o,n),e.save(),e.beginPath(),e.arc(i,s,995,0,Math.PI*2),e.fillStyle="#ffffff",e.shadowColor="rgba(0, 229, 255, 0.45)",e.shadowBlur=45,e.fill(),e.restore();const m=e.createLinearGradient(0,0,o,n);m.addColorStop(0,"#ffd700"),m.addColorStop(.2,"#fff2a3"),m.addColorStop(.45,"#d4af37"),m.addColorStop(.7,"#fff8db"),m.addColorStop(1,"#a38426"),e.beginPath(),e.arc(i,s,985,0,Math.PI*2),e.fillStyle=m,e.fill(),e.beginPath(),e.arc(i,s,962,0,Math.PI*2),e.fillStyle="#022116",e.fill();const v=e.createRadialGradient(i,s,660,i,s,960);if(v.addColorStop(0,"#064e3b"),v.addColorStop(.4,"#046a48"),v.addColorStop(.8,"#023826"),v.addColorStop(1,"#012015"),e.beginPath(),e.arc(i,s,952,0,Math.PI*2),e.arc(i,s,668,0,Math.PI*2,!0),e.fillStyle=v,e.fill(),e.lineWidth=4,e.strokeStyle="#d4af37",e.beginPath(),e.arc(i,s,944,0,Math.PI*2),e.stroke(),e.beginPath(),e.arc(i,s,676,0,Math.PI*2),e.stroke(),p(e,"SENIOR GREEN HOUSE",i,s,810,-Math.PI/2,!1,86),p(e,"2026-27",i,s,810,Math.PI/2,!0,86),u(e,i-810,s,5,34,16,"#ffd700"),u(e,i+810,s,5,34,16,"#ffd700"),e.beginPath(),e.arc(i,s,664,0,Math.PI*2),e.fillStyle=m,e.fill(),e.beginPath(),e.arc(i,s,642,0,Math.PI*2),e.fillStyle="#ffffff",e.fill(),d&&d.complete&&d.naturalWidth>0){e.save(),e.beginPath(),e.arc(i,s,634,0,Math.PI*2),e.clip();const S=1240;e.drawImage(d,i-S/2,s-S/2,S,S),e.restore()}e.lineWidth=6,e.strokeStyle="#d4af37",e.beginPath(),e.arc(i,s,634,0,Math.PI*2),e.stroke()}function u(d,m,v,S,y,f,c){let P=Math.PI/2*3,M=m,I=v;const H=Math.PI/S;d.save(),d.beginPath(),d.moveTo(m,v-y);for(let x=0;x<S;x++)M=m+Math.cos(P)*y,I=v+Math.sin(P)*y,d.lineTo(M,I),P+=H,M=m+Math.cos(P)*f,I=v+Math.sin(P)*f,d.lineTo(M,I),P+=H;d.lineTo(m,v-y),d.closePath(),d.fillStyle=c,d.shadowColor="#ffe066",d.shadowBlur=18,d.fill(),d.restore()}function p(d,m,v,S,y,f,c,P=84){d.save(),d.font=`900 ${P}px "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,d.fillStyle="#ffffff",d.shadowColor="rgba(0, 0, 0, 0.85)",d.shadowBlur=14,d.shadowOffsetX=2,d.shadowOffsetY=3;const M=m.split(""),I=M.map(w=>d.measureText(w).width+10),x=I.reduce((w,C)=>w+C,0)/y;let R=c?f+x/2:f-x/2;for(let w=0;w<M.length;w++){const C=M[w],g=I[w],A=g/y;if(d.save(),c){R-=A/2;const _=v+y*Math.cos(R),V=S+y*Math.sin(R);d.translate(_,V),d.rotate(R-Math.PI/2),d.fillText(C,-g/2,0),R-=A/2}else{R+=A/2;const _=v+y*Math.cos(R),V=S+y*Math.sin(R);d.translate(_,V),d.rotate(R+Math.PI/2),d.fillText(C,-g/2,0),R+=A/2}d.restore()}d.restore()}r(null);const h=new Image;return h.crossOrigin="anonymous",h.onload=()=>{r(h),t.needsUpdate=!0},h.src="/2077927617.jpg",t}function Sa(a){const e=new yn(Qi,1.05);e.position.set(12,22,10),e.castShadow=!0;const o=Wt+2;e.shadow.camera.left=-o,e.shadow.camera.right=o,e.shadow.camera.top=o,e.shadow.camera.bottom=-o,e.shadow.camera.near=1,e.shadow.camera.far=45,e.shadow.mapSize.width=1024,e.shadow.mapSize.height=1024,e.shadow.bias=-3e-4,e.shadow.normalBias=.02,a.add(e);const n=new yn($i,.28);n.position.set(-14,15,-12),n.castShadow=!1,a.add(n);const i=new yi(15134199,14014946,.5);i.position.set(0,20,0),a.add(i);const s=new vi(2106414,.25);a.add(s);const t=8,r=Wt-.9;for(let d=0;d<t;d++){const m=d/t*Math.PI*2;let v;d%4===0?v=Qo:d%4===1?v=vo:d%4===2?v=xn:v=Vn;const S=new Zt(v,.85,9,1.8);S.position.set(Math.cos(m)*r,.45,Math.sin(m)*r),a.add(S)}const u=8,p=15;for(let d=0;d<u;d++){const m=d/u*Math.PI*2,v=d%2===0?Qo:xn,S=new Zt(v,.85,12,1.7);S.position.set(Math.cos(m)*p,7.75,Math.sin(m)*p),a.add(S)}const h=new Dn(16054271,.75,18,Math.PI/4.5,.45,1.4);h.position.set(0,11.5,0),h.target.position.set(0,0,0),a.add(h),a.add(h.target)}const Cn={type:"change"},an={type:"start"},Yn={type:"end"},Po=new wi,In=new Gn,Ma=Math.cos(70*et.DEG2RAD),pt=new E,Ct=2*Math.PI,Ze={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},qo=1e-6;class Ta extends bi{constructor(e,o=null){super(e,o),this.state=Ze.NONE,this.enabled=!0,this.target=new E,this.cursor=new E,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ro.ROTATE,MIDDLE:ro.DOLLY,RIGHT:ro.PAN},this.touches={ONE:Vt.ROTATE,TWO:Vt.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new E,this._lastQuaternion=new Yt,this._lastTargetPosition=new E,this._quat=new Yt().setFromUnitVectors(e.up,new E(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new vn,this._sphericalDelta=new vn,this._scale=1,this._panOffset=new E,this._rotateStart=new Ne,this._rotateEnd=new Ne,this._rotateDelta=new Ne,this._panStart=new Ne,this._panEnd=new Ne,this._panDelta=new Ne,this._dollyStart=new Ne,this._dollyEnd=new Ne,this._dollyDelta=new Ne,this._dollyDirection=new E,this._mouse=new Ne,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Ia.bind(this),this._onPointerDown=Ca.bind(this),this._onPointerUp=Ea.bind(this),this._onContextMenu=Na.bind(this),this._onMouseWheel=Pa.bind(this),this._onKeyDown=Oa.bind(this),this._onTouchStart=ka.bind(this),this._onTouchMove=La.bind(this),this._onMouseDown=Aa.bind(this),this._onMouseMove=Ra.bind(this),this._interceptControlDown=_a.bind(this),this._interceptControlUp=za.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Cn),this.update(),this.state=Ze.NONE}update(e=null){const o=this.object.position;pt.copy(o).sub(this.target),pt.applyQuaternion(this._quat),this._spherical.setFromVector3(pt),this.autoRotate&&this.state===Ze.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=Ct:n>Math.PI&&(n-=Ct),i<-Math.PI?i+=Ct:i>Math.PI&&(i-=Ct),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const t=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=t!=this._spherical.radius}if(pt.setFromSpherical(this._spherical),pt.applyQuaternion(this._quatInverse),o.copy(this.target).add(pt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let t=null;if(this.object.isPerspectiveCamera){const r=pt.length();t=this._clampDistance(r*this._scale);const u=r-t;this.object.position.addScaledVector(this._dollyDirection,u),this.object.updateMatrixWorld(),s=!!u}else if(this.object.isOrthographicCamera){const r=new E(this._mouse.x,this._mouse.y,0);r.unproject(this.object);const u=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=u!==this.object.zoom;const p=new E(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(r),this.object.updateMatrixWorld(),t=pt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;t!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(t).add(this.object.position):(Po.origin.copy(this.object.position),Po.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Po.direction))<Ma?this.object.lookAt(this.target):(In.setFromNormalAndCoplanarPoint(this.object.up,this.target),Po.intersectPlane(In,this.target))))}else if(this.object.isOrthographicCamera){const t=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),t!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>qo||8*(1-this._lastQuaternion.dot(this.object.quaternion))>qo||this._lastTargetPosition.distanceToSquared(this.target)>qo?(this.dispatchEvent(Cn),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Ct/60*this.autoRotateSpeed*e:Ct/60/60*this.autoRotateSpeed}_getZoomScale(e){const o=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*o)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,o){pt.setFromMatrixColumn(o,0),pt.multiplyScalar(-e),this._panOffset.add(pt)}_panUp(e,o){this.screenSpacePanning===!0?pt.setFromMatrixColumn(o,1):(pt.setFromMatrixColumn(o,0),pt.crossVectors(this.object.up,pt)),pt.multiplyScalar(e),this._panOffset.add(pt)}_pan(e,o){const n=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;pt.copy(i).sub(this.target);let s=pt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/n.clientHeight,this.object.matrix),this._panUp(2*o*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(o*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,o){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),i=e-n.left,s=o-n.top,t=n.width,r=n.height;this._mouse.x=i/t*2-1,this._mouse.y=-(s/r)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const o=this.domElement;this._rotateLeft(Ct*this._rotateDelta.x/o.clientHeight),this._rotateUp(Ct*this._rotateDelta.y/o.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let o=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(Ct*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),o=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-Ct*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),o=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(Ct*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),o=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-Ct*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),o=!0;break}o&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const o=this._getSecondPointerPosition(e),n=.5*(e.pageX+o.x),i=.5*(e.pageY+o.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const o=this._getSecondPointerPosition(e),n=.5*(e.pageX+o.x),i=.5*(e.pageY+o.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){const o=this._getSecondPointerPosition(e),n=e.pageX-o.x,i=e.pageY-o.y,s=Math.sqrt(n*n+i*i);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),s=.5*(e.pageY+n.y);this._rotateEnd.set(i,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const o=this.domElement;this._rotateLeft(Ct*this._rotateDelta.x/o.clientHeight),this._rotateUp(Ct*this._rotateDelta.y/o.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const o=this._getSecondPointerPosition(e),n=.5*(e.pageX+o.x),i=.5*(e.pageY+o.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const o=this._getSecondPointerPosition(e),n=e.pageX-o.x,i=e.pageY-o.y,s=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const t=(e.pageX+o.x)*.5,r=(e.pageY+o.y)*.5;this._updateZoomParameters(t,r)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let o=0;o<this._pointers.length;o++)if(this._pointers[o]==e.pointerId){this._pointers.splice(o,1);return}}_isTrackingPointer(e){for(let o=0;o<this._pointers.length;o++)if(this._pointers[o]==e.pointerId)return!0;return!1}_trackPointer(e){let o=this._pointerPositions[e.pointerId];o===void 0&&(o=new Ne,this._pointerPositions[e.pointerId]=o),o.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const o=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[o]}_customWheelEvent(e){const o=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(o){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Ca(a){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(a.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(a)&&(this._addPointer(a),a.pointerType==="touch"?this._onTouchStart(a):this._onMouseDown(a)))}function Ia(a){this.enabled!==!1&&(a.pointerType==="touch"?this._onTouchMove(a):this._onMouseMove(a))}function Ea(a){switch(this._removePointer(a),this._pointers.length){case 0:this.domElement.releasePointerCapture(a.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Yn),this.state=Ze.NONE;break;case 1:const e=this._pointers[0],o=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:o.x,pageY:o.y});break}}function Aa(a){let e;switch(a.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ro.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(a),this.state=Ze.DOLLY;break;case ro.ROTATE:if(a.ctrlKey||a.metaKey||a.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(a),this.state=Ze.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(a),this.state=Ze.ROTATE}break;case ro.PAN:if(a.ctrlKey||a.metaKey||a.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(a),this.state=Ze.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(a),this.state=Ze.PAN}break;default:this.state=Ze.NONE}this.state!==Ze.NONE&&this.dispatchEvent(an)}function Ra(a){switch(this.state){case Ze.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(a);break;case Ze.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(a);break;case Ze.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(a);break}}function Pa(a){this.enabled===!1||this.enableZoom===!1||this.state!==Ze.NONE||(a.preventDefault(),this.dispatchEvent(an),this._handleMouseWheel(this._customWheelEvent(a)),this.dispatchEvent(Yn))}function Oa(a){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(a)}function ka(a){switch(this._trackPointer(a),this._pointers.length){case 1:switch(this.touches.ONE){case Vt.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(a),this.state=Ze.TOUCH_ROTATE;break;case Vt.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(a),this.state=Ze.TOUCH_PAN;break;default:this.state=Ze.NONE}break;case 2:switch(this.touches.TWO){case Vt.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(a),this.state=Ze.TOUCH_DOLLY_PAN;break;case Vt.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(a),this.state=Ze.TOUCH_DOLLY_ROTATE;break;default:this.state=Ze.NONE}break;default:this.state=Ze.NONE}this.state!==Ze.NONE&&this.dispatchEvent(an)}function La(a){switch(this._trackPointer(a),this.state){case Ze.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(a),this.update();break;case Ze.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(a),this.update();break;case Ze.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(a),this.update();break;case Ze.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(a),this.update();break;default:this.state=Ze.NONE}}function Na(a){this.enabled!==!1&&a.preventDefault()}function _a(a){a.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function za(a){a.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Da=10;function Ga(a,e){const o=new Ta(a,e.domElement);o.enableDamping=!0,o.dampingFactor=.08,o.minDistance=.5,o.maxDistance=14.5,o.maxPolarAngle=Math.PI*.465,o.minPolarAngle=.08,o.target.copy(Ko),o.update(),o.touches={ONE:Vt.ROTATE,TWO:Vt.DOLLY_PAN},o.enablePan=!0,o.autoRotate=!1,o.autoRotateSpeed=.3;let n=null;const i=()=>{o.autoRotate=!1,n!==null&&clearTimeout(n),n=setTimeout(()=>{o.autoRotate=!0},Da*1e3)},s=e.domElement,t=["pointerdown","pointermove","pointerup","wheel","touchstart","touchmove"];for(const r of t)s.addEventListener(r,i,{passive:!0});return i(),o}function Ua(a){const e=to(a),o=on[a],n=Math.cos(o),i=Math.sin(o),s=a==="astronomy",t=new E(e.x-n*(s?4.6:5.2),e.y+(s?2.1:2.5),e.z-i*(s?4.6:5.2)),r=new E(e.x,e.y+(s?1.5:2.2),e.z);return{cameraPos:t,lookTarget:r}}function Ha(a,e){let o=null,n=null;const i=[];function s(h){return h<.5?4*h*h*h:1-Math.pow(-2*h+2,3)/2}function t(h,d,m,v=1.4){typeof window<"u"&&window.__sim?.mobileRobots?.telemetry&&window.__sim.mobileRobots.telemetry.deselect(),e.enabled=!1,e.enableDamping=!1,e.autoRotate=!1,o={startPos:a.position.clone(),targetPos:h.clone(),startTarget:e.target.clone(),lookAt:d.clone(),stationKey:m,elapsed:0,duration:v}}function r(h){if(!o)return;o.elapsed+=h;const d=Math.min(o.elapsed/o.duration,1),m=s(d);if(a.position.lerpVectors(o.startPos,o.targetPos,m),e.target.lerpVectors(o.startTarget,o.lookAt,m),a.lookAt(e.target),d>=1){const{targetPos:v,lookAt:S,stationKey:y}=o;a.position.copy(v),e.target.copy(S),e.enabled=!0,e.enableDamping=!0,e.update(),o=null,n=y;for(const f of i)f(y)}}function u(h,d=!1){const{cameraPos:m,lookTarget:v}=Ua(h);if(d){o=null,a.position.copy(m),e.target.copy(v),e.enabled=!0,e.enableDamping=!0,e.update(),n=h;for(const S of i)S(h);return}t(m,v,h)}function p(h=!1){if(h){o=null,a.position.copy(Xo),e.target.copy(Ko),e.enabled=!0,e.enableDamping=!0,e.update(),n=null;for(const d of i)d(null);return}t(Xo.clone(),Ko.clone(),null)}return{transitionTo:u,transitionToSpawn:p,update:r,onStationChange(h){i.push(h)},get isTransitioning(){return o!==null},get activeStation(){return n}}}function Jo(a,e){const s=Math.hypot(a.position.x,a.position.z);if(s>16.2){const t=16.2/s;a.position.x*=t,a.position.z*=t}if(a.position.y=Math.max(.6,Math.min(11.2,a.position.y)),e&&e.target){const r=Math.hypot(e.target.x,e.target.z);if(r>15){const u=15/r;e.target.x*=u,e.target.z*=u}e.target.y=Math.max(.3,Math.min(9.5,e.target.y))}}function Fa(a,e={}){const o={uTime:a.uTime,uFlameMode:{value:e.flameMode??1},uColorOuter:{value:new he(e.colorOuter??30719)},uColorInner:{value:new he(e.colorInner??6750207)},uColorTip:{value:new he(e.colorTip??13226)},uFlicker:{value:1},uHeightScale:{value:1},uTurbulence:{value:1.1},uIntensity:{value:e.intensity??1.4}};return{material:new ft({uniforms:o,vertexShader:`
      uniform float uTime;
      uniform float uFlameMode;
      uniform float uHeightScale;
      uniform float uTurbulence;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;

      // 3D Simplex-like noise helper
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);

        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);

        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;

        i = mod289(i);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));

        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);

        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);

        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);

        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);

        float h = uv.y;
        float speed = mix(2.2, 4.0, uFlameMode);
        vec3 noiseCoord = vec3(position.x * 3.5, position.y * 2.5 - uTime * speed, position.z * 3.5);
        float n = snoise(noiseCoord) * uTurbulence;

        float sway = sin(uTime * 3.0 + h * 4.0) * (1.0 - uFlameMode) * 0.05;

        vec3 pos = position;
        pos.y *= uHeightScale;
        pos.x += n * 0.10 * h + sway;
        pos.z += snoise(noiseCoord + 43.12) * 0.10 * h;

        vPosition = pos;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,fragmentShader:`
      precision highp float;

      uniform float uTime;
      uniform float uFlameMode;
      uniform vec3 uColorOuter;
      uniform vec3 uColorInner;
      uniform vec3 uColorTip;
      uniform float uFlicker;
      uniform float uIntensity;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        float y = vUv.y;
        float r = length(vUv - vec2(0.5, y));

        // Radial falloff: hottest at axis, transparent at perimeter
        float radialAlpha = smoothstep(0.48, 0.05, r * 2.0);

        // Vertical gradient
        float coreCone = smoothstep(0.50, 0.05, y) * smoothstep(0.35, 0.0, r * 2.0);
        float tipFlame = smoothstep(0.65, 1.0, y);

        // Base color blending
        vec3 col = mix(uColorInner, uColorOuter, smoothstep(0.1, 0.7, y + r));
        col = mix(col, uColorTip, tipFlame * 0.6);

        // Inner hot core
        col += uColorInner * coreCone * 0.8;

        // Combustion jitter
        float jitter = 0.96 + 0.04 * sin(uTime * 48.0) * sin(uTime * 64.0 + 1.3);
        col *= jitter * uFlicker * uIntensity;

        // Soft Fresnel edge (strictly guarded against negative values to prevent NaN in pow)
        float fresnelFactor = clamp(1.0 - abs(vNormal.z), 0.0, 1.0);
        float edgeGlow = pow(fresnelFactor, 1.6) * 0.35;
        col += uColorOuter * edgeGlow;

        // Vertical alpha taper (guarded against negative y)
        float safeY = clamp(y, 0.0, 1.0);
        float alpha = radialAlpha * (1.0 - pow(safeY, 2.5)) * jitter;
        alpha = clamp(alpha * 0.88, 0.0, 0.85);

        // Clamp color to strictly prevent bloom blowout and post-processing buffer overflow
        col = clamp(col, 0.0, 1.25);

        // Guard against any NaN or non-finite float
        if (col.r != col.r || col.g != col.g || col.b != col.b || alpha != alpha || alpha < 0.015) {
          discard;
        }

        gl_FragColor = vec4(col, alpha);
      }
    `,transparent:!0,blending:ot,depthWrite:!1,side:Do}),uniforms:o}}const _t={clean:{name:"Base Blue (Hydrocarbon)",ion:"CH* / C₂*",salt:"Pure Fuel (Methane/Propane)",colorName:"Electric Premixed Blue",outerColor:26367,innerColor:61695,tipColor:8840,lightColor:30719,lightIntensity:.85,wavelengths:["431.4 nm (CH*)","473.7 nm (Swan)","516.5 nm (C₂*)"],spectralLines:[{nm:431.4,color:"#00ccff",intensity:.8},{nm:473.7,color:"#00aaff",intensity:.9},{nm:516.5,color:"#00ffaa",intensity:.85}],quantumTransition:"Radical electronic band transitions (Swan & CH*)",deltaE:"2.4–2.9 eV"},copper:{name:"Copper",ion:"Cu²⁺",salt:"Copper(II) Chloride (CuCl₂)",colorName:"Emerald Green & Turquoise",outerColor:58998,innerColor:8454107,tipColor:46296,lightColor:58998,lightIntensity:.95,wavelengths:["510.5 nm","515.3 nm","521.8 nm","578.2 nm"],spectralLines:[{nm:510.5,color:"#00ff88",intensity:.95},{nm:515.3,color:"#10f590",intensity:.9},{nm:521.8,color:"#38ef7d",intensity:1},{nm:578.2,color:"#c6ff00",intensity:.7}],quantumTransition:"4p → 4s (Excited d-orbital & s-orbital relaxation)",deltaE:"2.38 eV"},strontium:{name:"Strontium",ion:"Sr²⁺",salt:"Strontium Chloride (SrCl₂)",colorName:"Brilliant Crimson Scarlet",outerColor:16717636,innerColor:16741783,tipColor:13959168,lightColor:16717636,lightIntensity:1.05,wavelengths:["460.7 nm","605.0 nm","668.0 nm","683.0 nm"],spectralLines:[{nm:460.7,color:"#3d5afe",intensity:.4},{nm:605,color:"#ff5252",intensity:.75},{nm:646,color:"#ff1744",intensity:.85},{nm:668,color:"#d50000",intensity:1},{nm:683,color:"#b71c1c",intensity:.9}],quantumTransition:"5p → 5s (Singlet & triplet de-excitation)",deltaE:"1.85 eV"},sodium:{name:"Sodium",ion:"Na⁺",salt:"Sodium Chloride (NaCl / Halite)",colorName:"Intense Golden Yellow (D-Lines)",outerColor:16757504,innerColor:16773494,tipColor:16748288,lightColor:16752640,lightIntensity:1.1,wavelengths:["589.0 nm (D₂)","589.6 nm (D₁)"],spectralLines:[{nm:589,color:"#ffea00",intensity:1},{nm:589.6,color:"#ffd600",intensity:.95}],quantumTransition:"3p → 3s (Fine-structure spin-orbit doublet)",deltaE:"2.10 eV"},potassium:{name:"Potassium",ion:"K⁺",salt:"Potassium Chloride (KCl)",colorName:"Ethereal Lilac / Violet",outerColor:11766015,innerColor:15984117,tipColor:8146431,lightColor:11141375,lightIntensity:.9,wavelengths:["404.4 nm (Violet)","766.5 nm (Near-IR)","769.9 nm"],spectralLines:[{nm:404.4,color:"#b388ff",intensity:.9},{nm:404.7,color:"#d1c4e9",intensity:.7},{nm:693.9,color:"#b71c1c",intensity:.3},{nm:766.5,color:"#880e4f",intensity:.95}],quantumTransition:"4p → 4s and 5p → 4s (High-energy violet & IR)",deltaE:"3.06 eV & 1.62 eV"},barium:{name:"Barium",ion:"Ba²⁺",salt:"Barium Chloride (BaCl₂)",colorName:"Apple Pale Green",outerColor:8702998,innerColor:15531211,tipColor:5078031,lightColor:8702998,lightIntensity:.9,wavelengths:["513.7 nm","524.2 nm","534.1 nm","553.5 nm"],spectralLines:[{nm:513.7,color:"#65a30d",intensity:.75},{nm:524.2,color:"#84cc16",intensity:.95},{nm:534.1,color:"#a3e635",intensity:.9},{nm:553.5,color:"#bef264",intensity:1}],quantumTransition:"6p → 6s (Multiplet green line cascade)",deltaE:"2.24 eV"},calcium:{name:"Calcium",ion:"Ca²⁺",salt:"Calcium Chloride (CaCl₂)",colorName:"Fiery Brick-Red / Orange",outerColor:16733986,innerColor:16764092,tipColor:14172949,lightColor:16733986,lightIntensity:.95,wavelengths:["422.7 nm (Violet)","616.2 nm","622.0 nm (Orange-Red)"],spectralLines:[{nm:422.7,color:"#7c4dff",intensity:.5},{nm:616.2,color:"#ff7043",intensity:.85},{nm:622,color:"#ff5722",intensity:1}],quantumTransition:"4p → 4s and molecular CaOH orange bands",deltaE:"2.00 eV"}};function Ba(a,e){const o=new J;o.name="ChemistryStation";const n=to("chemistry");o.position.copy(n),a.add(o);const i=on.chemistry,s=Math.cos(i),t=Math.sin(i),r=t,u=-s,p=-t,h=s,d=-s,m=-t,v=Math.atan2(d,m),S={element:{value:"sodium"},airCollar:{value:1},setElement:null},y=new B({color:qt,roughness:.92,metalness:0}),f=new xe({color:jt,metalness:.95,roughness:.15,clearcoat:.8}),c=new xe({color:13938487,metalness:.88,roughness:.28,clearcoat:.5}),P=new B({color:1447967,roughness:.82,metalness:.1}),M=new D(2.1,2.25,.82,48),I=new l(M,y);I.position.y=.41,I.receiveShadow=!0,I.castShadow=!0,o.add(I);const H=new at(2.12,.03,16,64),x=new l(H,f);x.rotation.x=Math.PI/2,x.position.y=.82,o.add(x);const R=new at(2.26,.02,16,64),w=new _e({color:vo,transparent:!0,opacity:.7}),C=new l(R,w);C.rotation.x=Math.PI/2,C.position.y=.03,o.add(C);const g=new D(1.4,1.45,.06,48),A=new l(g,P);A.position.y=.85,A.receiveShadow=!0,o.add(A);const _=new at(.55,.015,16,48),V=new l(_,f);V.rotation.x=Math.PI/2,V.position.y=.88,o.add(V);const Z=new J;Z.position.set(0,.88,0),o.add(Z);const ee=new B({color:13938487,roughness:.42,metalness:.72}),q=new l(new D(.22,.25,.05,32),ee);q.position.y=.025,q.castShadow=!1,Z.add(q);const re=new D(.025,.02,.22,16),X=new l(re,c);X.rotation.z=Math.PI/2,X.position.set(-.24,.05,0),Z.add(X);class O extends Fn{getPoint(Ce,Je=new E){const st=-.35-Ce*.45,rt=.05-Math.sin(Ce*Math.PI)*.12-Ce*.07,lt=Math.sin(Ce*1.5)*.15;return Je.set(st,rt,lt)}}const L=new Ut(new O,24,.016,12,!1),te=new l(L,f);Z.add(te);const se=new J;se.position.y=.14,Z.add(se);const Se=new D(.068,.068,.09,32),N=new l(Se,f);se.add(N);const b=new _e({color:328965});for(let Ae=0;Ae<2;Ae++){const Ce=new l(new Ee(.03,.05,.14),b);Ce.rotation.y=Ae*Math.PI/2,se.add(Ce)}const z=new D(.052,.052,.62,32),F=new l(z,f);F.position.y=.48,F.castShadow=!0,Z.add(F);const k=new D(.062,.052,.04,32),T=new l(k,f);T.position.y=.8,Z.add(T);const le=new D(.05,.05,.005,16),Y=new l(le,P);Y.position.y=.815,Z.add(Y);const j=new J;j.position.set(0,.82,0),Z.add(j);const{material:Te,uniforms:Oe}=Fa(e,{flameMode:1,intensity:1.4}),ne=new D(.008,.065,.92,32,48,!0);ne.translate(0,.46,0);const we=new l(ne,Te);j.add(we);const Me=new Zt(16752640,.72,3.6,1);Me.position.set(0,.45,0),j.add(Me);const me=65,Pe=new kt,$=new Float32Array(me*3),pe=[];for(let Ae=0;Ae<me;Ae++){const Ce=Math.random()*Math.PI*2,Je=Math.random()*.055;$[Ae*3+0]=Math.cos(Ce)*Je,$[Ae*3+1]=Math.random()*.92,$[Ae*3+2]=Math.sin(Ce)*Je,pe.push({vx:(Math.random()-.5)*.08,vy:.65+Math.random()*.85,vz:(Math.random()-.5)*.08,seed:Math.random()*100})}Pe.setAttribute("position",new Gt($,3));const ue=new Un({size:.026,color:16763972,transparent:!0,opacity:.85,blending:ot,depthWrite:!1}),be=new Hn(Pe,ue);j.add(be);const ye=new J;ye.position.set(0,.88,0),o.add(ye);const Fe=new xe({color:15792383,transmission:.92,ior:1.5,roughness:.04,metalness:.05,transparent:!0,opacity:.85}),ke=[{key:"copper",label:"Cu²⁺",saltName:"CuCl₂",color:366185,alpha:-.65},{key:"strontium",label:"Sr²⁺",saltName:"SrCl₂",color:14427686,alpha:-.39},{key:"sodium",label:"Na⁺",saltName:"NaCl",color:16096779,alpha:-.13},{key:"potassium",label:"K⁺",saltName:"KCl",color:11032055,alpha:.13},{key:"barium",label:"Ba²⁺",saltName:"BaCl₂",color:8702998,alpha:.39},{key:"calcium",label:"Ca²⁺",saltName:"CaCl₂",color:15357964,alpha:.65}],ge={};ke.forEach(Ae=>{const Ce=new J,Je=Math.cos(Ae.alpha),st=Math.sin(Ae.alpha),rt=.98*(Je*d+st*p),lt=.98*(Je*m+st*h);Ce.position.set(rt,.01,lt);const Xt=[new Ne(.001,0),new Ne(.08,.005),new Ne(.11,.02),new Ne(.12,.024)],Ot=new zn(Xt,32),mt=new l(Ot,Fe);mt.receiveShadow=!0,Ce.add(mt);const Tt=new Ye(.085,.026,24);Tt.translate(0,.013,0);const Kt=new B({color:Ae.color,roughness:.65,metalness:.1}),nt=new l(Tt,Kt);Ce.add(nt);const Dt=document.createElement("canvas");Dt.width=256,Dt.height=128;const Nt=Dt.getContext("2d");Nt.clearRect(0,0,256,128),Nt.font="bold 50px monospace",Nt.fillStyle="#ffffff",Nt.textAlign="center",Nt.textBaseline="middle",Nt.fillText(Ae.label,128,64);const Ro=new Xe(Dt),Jn=new lo({map:Ro,transparent:!0,opacity:.88}),Wo=new co(Jn);Wo.scale.set(.32,.16,1),Wo.position.set(0,.06,.12),Ce.add(Wo),ye.add(Ce),ge[Ae.key]={group:Ce,position:new E(rt,.89,lt)}});const Be=new J,Re=.98*(Math.cos(-.95)*d+Math.sin(-.95)*p),ze=.98*(Math.cos(-.95)*m+Math.sin(-.95)*h);Be.position.set(Re,.01,ze);const De=new l(new D(.09,.09,.14,24),Fe);De.position.y=.07,Be.add(De);const K=new l(new D(.086,.086,.09,24),new xe({color:8965375,transmission:.9,opacity:.8,transparent:!0}));K.position.y=.06,Be.add(K);const de=document.createElement("canvas");de.width=256,de.height=128;const oe=de.getContext("2d");oe.font="bold 44px monospace",oe.fillStyle="#88ccff",oe.textAlign="center",oe.textBaseline="middle",oe.fillText("HCl Rinse",128,64);const Ge=new Xe(de),Ue=new co(new lo({map:Ge,transparent:!0,opacity:.8}));Ue.scale.set(.32,.16,1),Ue.position.set(0,.06,.12),Be.add(Ue),ye.add(Be);const Ie=new J;Ie.position.set(p*.55,.88,h*.55),o.add(Ie);const He=new l(new D(.05,.06,.45,24),f);He.position.y=.225,He.castShadow=!0,Ie.add(He);const $e=new J;$e.position.y=.45,Ie.add($e);const tt=new l(new qe(.06,16,16),c);$e.add(tt);const dt=new J;$e.add(dt);const Qe=new l(new D(.012,.012,.82,16),f);Qe.rotation.z=Math.PI/2,Qe.position.x=.41,dt.add(Qe);const ht=new xe({color:16777215,metalness:.98,roughness:.1,clearcoat:1}),wt=new l(new at(.018,.003,16,32),ht);wt.rotation.y=Math.PI/2,wt.position.set(.84,0,0),dt.add(wt);const ae=new J;ae.position.set(r*1.35,1.82,u*1.35);const Le=n.x+r*1.35,G=n.z+u*1.35,W=Math.atan2(-Le,-G);ae.rotation.y=W,o.add(ae);const U=new xi;U.moveTo(-.12,-.1),U.lineTo(.12,-.1),U.lineTo(0,.14),U.closePath();const Q=new Si(U,{depth:.18,bevelEnabled:!1});Q.center();const ce=new xe({color:16777215,transmission:.98,ior:1.58,roughness:.01,metalness:0,clearcoat:1,transparent:!0,opacity:.9}),ve=new l(Q,ce);ve.position.set(.78,-.15,0),ae.add(ve);const We=new _e({color:16777215,transparent:!0,opacity:.45,blending:ot}),je=new D(.007,.007,.9,8),Et=new l(je,We);Et.position.set(1.15,-.32,0),Et.rotation.z=-Math.PI*.3,ae.add(Et);const ut=document.createElement("canvas");ut.width=1024,ut.height=256;const ie=ut.getContext("2d"),xt=new Xe(ut);xt.minFilter=Rt;const Ke=new At(2,.6,32,1),it=Ke.attributes.position;for(let Ae=0;Ae<it.count;Ae++){const Ce=it.getX(Ae);it.setZ(Ae,-Math.sin((Ce+1)/2*Math.PI)*.15)}Ke.computeVertexNormals();const St=new _e({map:xt,transparent:!0,opacity:.97,side:Ve,depthWrite:!1}),vt=new l(Ke,St);vt.position.set(-.2,0,0),ae.add(vt);const Bt=new so([new E(-1-.2,0,0),new E(-.5-.2,0,-.1),new E(0-.2,0,-.15),new E(.5-.2,0,-.1),new E(1-.2,0,0)]),gt=new Ut(Bt,32,.012,12,!1),Lt=new l(gt,f);Lt.position.y=.3,ae.add(Lt);const Mo=new l(gt,f);Mo.position.y=-.3,ae.add(Mo);const To=new _e({color:58879}),Co=new Ut(Bt,32,.0035,8,!1),sn=new l(Co,To);sn.position.y=.29,ae.add(sn);const rn=new l(Co,To);rn.position.y=-.29,ae.add(rn);const ln=f,cn=new l(new D(.014,.018,.95,16),ln);cn.position.set(-1.18,-.48,0),ae.add(cn);const dn=new l(new D(.014,.018,.95,16),ln);dn.position.set(.78,-.48,0),ae.add(dn);function hn(Ae){const Ce=_t[Ae]||_t.sodium;ie.clearRect(0,0,1024,256),ie.fillStyle="rgba(5, 10, 24, 0.97)",ie.fillRect(6,6,1012,244),ie.strokeStyle="rgba(0, 229, 255, 0.85)",ie.lineWidth=2.5,ie.strokeRect(6,6,1012,244),ie.strokeStyle="#00e5ff",ie.lineWidth=4,ie.beginPath(),ie.moveTo(6,32),ie.lineTo(6,6),ie.lineTo(32,6),ie.stroke(),ie.beginPath(),ie.moveTo(992,6),ie.lineTo(1018,6),ie.lineTo(1018,32),ie.stroke(),ie.beginPath(),ie.moveTo(6,218),ie.lineTo(6,244),ie.lineTo(32,244),ie.stroke(),ie.beginPath(),ie.moveTo(992,244),ie.lineTo(1018,244),ie.lineTo(1018,218),ie.stroke(),ie.font="bold 22px monospace",ie.fillStyle="#00e5ff",ie.textAlign="left",ie.fillText(`ATOMIC EMISSION SPECTRUM — ${Ce.name.toUpperCase()} [${Ce.ion}]`,30,42),ie.font="16px monospace",ie.fillStyle="rgba(224, 232, 255, 0.85)",ie.fillText(`Salt: ${Ce.salt} | ΔE = ${Ce.deltaE}`,30,68);const Je=40,st=88,rt=944,lt=88,Xt=380,Ot=750,mt=ie.createLinearGradient(Je,0,Je+rt,0);mt.addColorStop(0,"rgba(120, 0, 220, 0.15)"),mt.addColorStop(.18,"rgba(0, 80, 255, 0.15)"),mt.addColorStop(.35,"rgba(0, 220, 180, 0.15)"),mt.addColorStop(.48,"rgba(0, 240, 50, 0.15)"),mt.addColorStop(.6,"rgba(240, 230, 0, 0.15)"),mt.addColorStop(.75,"rgba(255, 100, 0, 0.15)"),mt.addColorStop(1,"rgba(220, 20, 20, 0.15)"),ie.fillStyle=mt,ie.fillRect(Je,st,rt,lt),ie.strokeStyle="rgba(255, 255, 255, 0.25)",ie.strokeRect(Je,st,rt,lt),Ce.spectralLines.forEach(Tt=>{const Kt=Math.max(Xt,Math.min(Ot,Tt.nm)),nt=Je+(Kt-Xt)/(Ot-Xt)*rt;ie.save(),ie.shadowColor=Tt.color,ie.shadowBlur=18,ie.fillStyle=Tt.color,ie.fillRect(nt-2.5,st,5,lt),ie.restore(),ie.fillStyle="#ffffff",ie.fillRect(nt-.75,st,1.5,lt),ie.font="bold 15px monospace",ie.fillStyle=Tt.color,ie.textAlign="center",ie.fillText(`${Tt.nm.toFixed(1)} nm`,nt,st+lt+22),ie.beginPath(),ie.moveTo(nt,st+lt),ie.lineTo(nt,st+lt+6),ie.strokeStyle=Tt.color,ie.stroke()}),ie.font="14px monospace",ie.fillStyle="rgba(0, 229, 255, 0.9)",ie.textAlign="right",ie.fillText("Photon Emission: ΔE = h·c / λ",980,42),ie.font="13px monospace",ie.fillStyle="rgba(224, 232, 255, 0.7)",ie.fillText(Ce.quantumTransition,980,68),xt.needsUpdate=!0}const Ht=new J;Ht.position.set(p*1.35,1.78,h*1.35),Ht.rotation.y=v+.18,o.add(Ht);const Io=new J;Ht.add(Io);const Xn=new B({color:16724838,roughness:.3,emissive:6684689}),Kn=new B({color:52479,roughness:.3,emissive:13158});for(let Ae=0;Ae<9;Ae++){const Ce=Ae%2===0,Je=new l(new qe(.024,16,16),Ce?Xn:Kn),st=Math.random()*Math.PI*2,rt=Math.random()*Math.PI,lt=Math.random()*.04;Je.position.set(lt*Math.sin(rt)*Math.cos(st),lt*Math.sin(rt)*Math.sin(st),lt*Math.cos(rt)),Io.add(Je)}const no=[.18,.32,.48,.64];no.forEach((Ae,Ce)=>{const Je=new at(Ae,.0025,12,64),st=new _e({color:58879,transparent:!0,opacity:.35+Ce*.1,blending:ot}),rt=new l(Je,st);rt.rotation.x=Math.PI/2+Ce*.12,rt.rotation.y=Ce*.18,Ht.add(rt)});const Qn=new _e({color:16777215,blending:ot}),un=new l(new qe(.022,16,16),Qn);Ht.add(un);const $n=new It(.015,.025,32),Eo=new _e({color:16771584,transparent:!0,opacity:0,side:Do,blending:ot,depthWrite:!1}),Go=new l($n,Eo);Go.rotation.x=Math.PI/2,Ht.add(Go);const Ao=document.createElement("canvas");Ao.width=512,Ao.height=128;const Ft=Ao.getContext("2d");Ft.clearRect(0,0,512,128),Ft.font="bold 36px monospace",Ft.fillStyle="#00e5ff",Ft.textAlign="center",Ft.textBaseline="middle",Ft.fillText("BOHR QUANTUM ATOM",256,45),Ft.font="24px monospace",Ft.fillStyle="rgba(224, 232, 255, 0.8)",Ft.fillText("ΔE = h·ν = hc / λ",256,85);const Zn=new Xe(Ao),Uo=new co(new lo({map:Zn,transparent:!0,opacity:.9}));Uo.scale.set(.9,.22,1),Uo.position.set(0,.65,0),Ht.add(Uo);let Ho=new he(_t.sodium.outerColor),Fo=new he(_t.sodium.innerColor),Bo=new he(_t.sodium.tipColor),pn=new he(_t.sodium.lightColor),fn=_t.sodium.lightIntensity;hn("sodium");let Vo=0,Yo=0;const mn=Ae=>{_t[Ae]||(Ae="sodium"),S.element.value=Ae;const Ce=_t[Ae];Ho.setHex(Ce.outerColor),Fo.setHex(Ce.innerColor),Bo.setHex(Ce.tipColor),pn.setHex(Ce.lightColor),fn=Ce.lightIntensity,ue.color.setHex(Ce.outerColor),Eo.color.setHex(Ce.outerColor),hn(Ae),Ae==="clean"?(Vo=-.85,Yo=.3):(Vo=.12,Yo=-.06)};return S.setElement=mn,mn("sodium"),{group:o,update:(Ae,Ce)=>{const Je=S.airCollar.value;se.rotation.y=et.lerp(se.rotation.y,(1-Je)*Math.PI*.45,Ce*5),Oe.uFlameMode&&(Oe.uFlameMode.value=et.lerp(Oe.uFlameMode.value,Je,Ce*4));const st=new he,rt=new he,lt=new he;if(Je<.99){const nt=new he(16746496),Dt=new he(16773792),Nt=new he(14238720);st.lerpColors(nt,Ho,Je),rt.lerpColors(Dt,Fo,Je),lt.lerpColors(Nt,Bo,Je)}else st.copy(Ho),rt.copy(Fo),lt.copy(Bo);Oe.uColorOuter.value.lerp(st,Ce*6),Oe.uColorInner.value.lerp(rt,Ce*6),Oe.uColorTip.value.lerp(lt,Ce*6),Me.color.lerp(pn,Ce*6);const Xt=.97+.03*Math.sin(Ae*52)*Math.sin(Ae*67);Me.intensity=fn*Xt*(.62+Je*.18),$e.rotation.y=et.lerp($e.rotation.y,Vo,Ce*3.5),dt.rotation.z=et.lerp(dt.rotation.z,Yo,Ce*3.5);const Ot=Pe.attributes.position.array;for(let nt=0;nt<me;nt++){const Dt=pe[nt];if(Ot[nt*3+1]+=Dt.vy*Ce,Ot[nt*3+0]+=Math.sin(Ae*4+Dt.seed)*.003,Ot[nt*3+2]+=Math.cos(Ae*4+Dt.seed)*.003,Ot[nt*3+1]>.95){Ot[nt*3+1]=.05;const Nt=Math.random()*Math.PI*2,Ro=Math.random()*.035;Ot[nt*3+0]=Math.cos(Nt)*Ro,Ot[nt*3+2]=Math.sin(Nt)*Ro}}Pe.attributes.position.needsUpdate=!0,Io.rotation.y=Ae*.4,Io.rotation.x=Math.sin(Ae*.3)*.2;const mt=Ae%3/3;let Tt=no[1];if(mt>.35&&mt<.75)Tt=et.lerp(no[1],no[3],(mt-.35)/.1);else if(mt>=.75){Tt=et.lerp(no[3],no[1],(mt-.75)/.1);const nt=(mt-.75)/.25;Go.scale.setScalar(1+nt*3.5),Eo.opacity=Math.max(0,1-nt*1.5)*.7}else Eo.opacity=0;const Kt=Ae*5;un.position.set(Math.cos(Kt)*Tt,Math.sin(Kt*.7)*.05,Math.sin(Kt)*Tt),ae.position.y=1.78+Math.sin(Ae*1.5)*.02,Ht.position.y=1.78+Math.cos(Ae*1.5)*.02},controls:S}}const En="vizon_ambient_muted",An="vizon_ambient_volume",Va=.35;class Ya{constructor(){this.audioCtx=null,this.masterGain=null,this.filterNode=null,this.analyser=null,this.analyserData=null,this.sourceNode=null,this.audioBuffer=null,this.audioEl=null,this.mediaElementSource=null,this.isLoaded=!1,this.isPlaying=!1,this.targetVolume=Va,this.isMuted=!1,this.listeners=new Set,this.isUnlocked=!1,this._loadPreferences(),this._setupAutoplayUnlock()}_loadPreferences(){try{this.isMuted=!1;try{localStorage.removeItem(En)}catch{}const e=localStorage.getItem(An);if(e!==null){const o=parseFloat(e);!isNaN(o)&&o>=0&&o<=1&&(this.targetVolume=o)}}catch(e){console.warn("[Audio] LocalStorage not available:",e)}}_savePreferences(){try{localStorage.setItem(En,String(this.isMuted)),localStorage.setItem(An,String(this.targetVolume))}catch{}}_ensureAudioContext(){if(this.audioCtx)return this.audioCtx;const e=window.AudioContext||window.webkitAudioContext;if(!e)return console.warn("[Audio] Web Audio API is not supported in this browser."),null;try{this.audioCtx=new e,this.filterNode=this.audioCtx.createBiquadFilter(),this.filterNode.type="lowpass",this.filterNode.frequency.setValueAtTime(11500,this.audioCtx.currentTime),this.filterNode.Q.setValueAtTime(.7,this.audioCtx.currentTime),this.masterGain=this.audioCtx.createGain(),this.masterGain.gain.setValueAtTime(0,this.audioCtx.currentTime),this.analyser=this.audioCtx.createAnalyser(),this.analyser.fftSize=64,this.analyser.smoothingTimeConstant=.82,this.analyserData=new Uint8Array(this.analyser.frequencyBinCount),this.filterNode.connect(this.analyser),this.analyser.connect(this.masterGain),this.masterGain.connect(this.audioCtx.destination)}catch(o){console.warn("[Audio] Web Audio context initialization notice:",o)}return this.audioCtx}async loadTrack(e="/audio/ambient_space.wav"){if(this._ensureAudioContext(),typeof Audio<"u"&&!this.audioEl)try{const o=new Audio(e);if(o.loop=!0,o.volume=this.targetVolume,o.preload="auto",o.crossOrigin="anonymous",this.audioEl=o,this.audioCtx&&!this.mediaElementSource)try{this.mediaElementSource=this.audioCtx.createMediaElementSource(o),this.mediaElementSource.connect(this.filterNode)}catch{console.log("[Audio] HTML5 audio playing directly to system output")}}catch(o){console.warn("[Audio] HTML5 Audio element setup notice:",o)}try{const o=await fetch(e);if(o.ok){const n=await o.arrayBuffer();this.audioCtx&&(this.audioBuffer=await this.audioCtx.decodeAudioData(n))}}catch(o){console.warn("[Audio] Web Audio buffer decoding notice:",o.message)}this.isLoaded=!0,this.isMuted||this.play().catch(()=>{})}async play(){if(this._ensureAudioContext(),this.audioCtx&&this.audioCtx.state==="suspended")try{await this.audioCtx.resume()}catch{}if(this.isPlaying=!0,this.isMuted=!1,this._savePreferences(),this.audioEl)try{this.audioEl.volume=this.targetVolume,this.audioEl.loop=!0;const e=this.audioEl.play();e!==void 0&&await e}catch(e){console.warn("[Audio] HTML5 audio play notice:",e.message)}if(!this.audioEl&&this.audioBuffer&&(!this.sourceNode||!this.isPlaying)){if(this.sourceNode)try{this.sourceNode.stop()}catch{}this.audioCtx&&(this.sourceNode=this.audioCtx.createBufferSource(),this.sourceNode.buffer=this.audioBuffer,this.sourceNode.loop=!0,this.sourceNode.connect(this.filterNode),this.sourceNode.start(0))}this._fadeIn(),this._notify()}pause(){if(this.isMuted=!0,this._savePreferences(),this.audioEl)try{this.audioEl.pause()}catch{}this._fadeOut(()=>{this.isPlaying=!1,this._notify()}),this._notify()}toggle(){return this.unlock(),this.isPlaying&&!this.isMuted?(this.pause(),!0):(this.play(),!1)}setVolume(e){if(this.targetVolume=Math.max(0,Math.min(1,e)),this._savePreferences(),this.audioEl&&(this.audioEl.volume=this.targetVolume),this.audioCtx&&this.masterGain&&this.isPlaying&&!this.isMuted){const o=this.audioCtx.currentTime;this.masterGain.gain.cancelScheduledValues(o),this.masterGain.gain.linearRampToValueAtTime(this.targetVolume,o+.15)}this._notify()}_fadeIn(e=2){if(!(!this.audioCtx||!this.masterGain))try{const o=this.audioCtx.currentTime,n=this.masterGain.gain.value;this.masterGain.gain.cancelScheduledValues(o),this.masterGain.gain.setValueAtTime(n,o),this.masterGain.gain.linearRampToValueAtTime(this.targetVolume,o+e)}catch{}}_fadeOut(e,o=1){if(!this.audioCtx||!this.masterGain){e&&e();return}try{const n=this.audioCtx.currentTime,i=this.masterGain.gain.value;this.masterGain.gain.cancelScheduledValues(n),this.masterGain.gain.setValueAtTime(i,n),this.masterGain.gain.linearRampToValueAtTime(1e-4,n+o),setTimeout(()=>{this.isMuted&&this.masterGain&&this.masterGain.gain.setValueAtTime(0,this.audioCtx.currentTime),e&&e()},o*1e3+50)}catch{e&&e()}}async unlock(){if(this.isUnlocked=!0,this._ensureAudioContext(),this.audioCtx){if(this.audioCtx.state==="suspended")try{await this.audioCtx.resume()}catch{}try{const e=this.audioCtx.createBuffer(1,1,22050),o=this.audioCtx.createBufferSource();o.buffer=e,o.connect(this.audioCtx.destination),o.start(0)}catch{}}!this.isPlaying&&!this.isMuted&&await this.play()}_setupAutoplayUnlock(){const e=["click","touchend","touchstart","pointerdown","pointerup","keydown","wheel"],o=async()=>{await this.unlock(),(this.isPlaying||this.audioCtx&&this.audioCtx.state==="running"||this.audioEl&&!this.audioEl.paused)&&e.forEach(n=>window.removeEventListener(n,o))};e.forEach(n=>window.addEventListener(n,o,{passive:!0}))}getVisualizerData(){if(!this.isPlaying||this.isMuted)return{level:0,bars:[.15,.1,.2,.12]};if(this.analyser&&this.audioCtx&&this.audioCtx.state==="running")try{this.analyser.getByteFrequencyData(this.analyserData);const t=(this.analyserData[1]||0)/255,r=(this.analyserData[3]||0)/255,u=(this.analyserData[7]||0)/255,p=(this.analyserData[14]||0)/255;return{level:(t+r+u+p)/4,bars:[t,r,u,p]}}catch{}const e=performance.now()*.003,o=.3+.2*Math.sin(e*1.5),n=.4+.3*Math.cos(e*2.1),i=.5+.25*Math.sin(e*2.7),s=.35+.2*Math.cos(e*1.8);return{level:(o+n+i+s)/4,bars:[o,n,i,s]}}onStateChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}_notify(){const e={isLoaded:this.isLoaded,isPlaying:this.isPlaying&&!this.isMuted,isMuted:this.isMuted,volume:this.targetVolume};for(const o of this.listeners)try{o(e)}catch{}}}const $t=new Ya,bo=[{key:"physics",icon:"⚡",label:"Physics"},{key:"chemistry",icon:"🧪",label:"Chemistry"},{key:"biology",icon:"🧬",label:"Biology"},{key:"mathematics",icon:"📐",label:"Mathematics"},{key:"astronomy",icon:"🔭",label:"Astronomy"}];function Wa(){if(document.getElementById("vizon-hud-styles"))return;const a=document.createElement("style");a.id="vizon-hud-styles",a.textContent=`
    /* ── Reset for HUD layer ── */
    #vizon-hud {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 1000;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      color: #e0e8ff;
      -webkit-font-smoothing: antialiased;
    }

    /* ── Glassmorphic base ── */
    .vz-glass {
      background: rgba(10, 14, 26, 0.6);
      backdrop-filter: blur(20px) saturate(1.4);
      -webkit-backdrop-filter: blur(20px) saturate(1.4);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
    }

    /* ═══════════════════════════════
       NAV BAR — bottom center pill
    ═══════════════════════════════ */
    #vz-navbar {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 2px;
      padding: 6px 8px;
      pointer-events: auto;
      z-index: 1001;
      transition: opacity 0.3s ease;
    }

    .vz-nav-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      padding: 10px 14px;
      border: 2px solid transparent;
      border-radius: 12px;
      background: transparent;
      color: #e0e8ff;
      cursor: pointer;
      transition: all 0.25s ease;
      font-family: inherit;
      pointer-events: auto;
      min-width: 64px;
    }

    .vz-nav-btn:hover {
      background: rgba(0, 229, 255, 0.08);
      border-color: rgba(0, 229, 255, 0.25);
    }

    .vz-nav-btn.active {
      border-color: #00e5ff;
      background: rgba(0, 229, 255, 0.12);
    }

    .vz-nav-btn.active .vz-nav-label {
      color: #00e5ff;
    }

    .vz-nav-icon {
      font-size: 20px;
      line-height: 1;
    }

    .vz-nav-label {
      font-size: 9px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      opacity: 0.7;
      transition: color 0.25s ease, opacity 0.25s ease;
    }

    .vz-nav-btn:hover .vz-nav-label,
    .vz-nav-btn.active .vz-nav-label {
      opacity: 1;
    }

    /* Home divider */
    .vz-nav-divider {
      width: 1px;
      height: 32px;
      background: rgba(255, 255, 255, 0.1);
      margin: 0 4px;
    }

    /* ═══════════════════════════════
       STATION PANELS — responsive right side with hide/show
    ═══════════════════════════════ */
    #vz-panel-container {
      position: fixed;
      top: 50%;
      right: 24px;
      transform: translateY(-50%);
      pointer-events: none;
      z-index: 1001;
      width: 275px;
      max-height: calc(100vh - 160px);
      transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    #vz-panel-container.hidden-state {
      opacity: 0;
      transform: translateY(-50%) translateX(35px);
      pointer-events: none !important;
    }

    .vz-panel {
      pointer-events: auto;
      padding: 16px 18px;
      opacity: 0;
      transform: translateX(20px);
      transition: opacity 0.35s ease, transform 0.35s ease;
      display: none;
      max-height: calc(100vh - 160px);
      overflow-y: auto;
      overflow-x: hidden;
      border-radius: 14px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.65), 0 0 16px rgba(0, 229, 255, 0.12);
    }

    .vz-panel::-webkit-scrollbar {
      width: 4px;
    }
    .vz-panel::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.04);
      border-radius: 2px;
    }
    .vz-panel::-webkit-scrollbar-thumb {
      background: rgba(0, 229, 255, 0.35);
      border-radius: 2px;
    }

    .vz-panel.visible {
      display: block;
      opacity: 1;
      transform: translateX(0);
    }

    /* ── Panel Header Wrapper & Controls ── */
    .vz-panel-header-wrap {
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      position: relative;
    }

    .vz-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .vz-panel-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.10em;
      color: #00e5ff;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .vz-panel-header-actions {
      display: flex;
      align-items: center;
      gap: 5px;
      flex-shrink: 0;
    }

    /* ── Auto-Hide Option Button ── */
    .vz-panel-autohide-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 6px;
      color: rgba(224, 232, 255, 0.65);
      cursor: pointer;
      font-size: 9.5px;
      font-weight: 700;
      font-family: inherit;
      padding: 3px 8px;
      line-height: 1;
      letter-spacing: 0.06em;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.2s ease;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }

    .vz-panel-autohide-btn:hover {
      background: rgba(0, 229, 255, 0.12);
      border-color: rgba(0, 229, 255, 0.35);
      color: #00e5ff;
    }

    .vz-panel-autohide-btn.active {
      background: rgba(0, 229, 255, 0.14);
      border-color: rgba(0, 229, 255, 0.5);
      color: #00e5ff;
      box-shadow: 0 0 10px rgba(0, 229, 255, 0.2);
    }

    .vz-autohide-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      display: inline-block;
      transition: all 0.2s ease;
    }

    .vz-autohide-dot.active {
      background: #00e5ff;
      box-shadow: 0 0 6px #00e5ff;
      animation: vz-pulse-dot 2s infinite ease-in-out;
    }

    @keyframes vz-pulse-dot {
      0%, 100% { transform: scale(1); opacity: 0.9; }
      50% { transform: scale(1.3); opacity: 1; }
    }

    .vz-autohide-icon {
      font-size: 10px;
      line-height: 1;
    }

    .vz-text-short {
      display: none;
    }

    .vz-text-full {
      display: inline;
    }

    /* ── Auto-Hide Progress Countdown Bar ── */
    .vz-autohide-track {
      width: 100%;
      height: 2px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 1px;
      margin-top: 6px;
      overflow: hidden;
    }

    .vz-autohide-fill {
      height: 100%;
      width: 100%;
      background: linear-gradient(90deg, #00e5ff, #38bdf8);
      box-shadow: 0 0 6px rgba(0, 229, 255, 0.6);
      border-radius: 1px;
      transform-origin: left center;
      transition: width 0.08s linear;
    }

    .vz-panel-close-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 6px;
      color: rgba(224, 232, 255, 0.8);
      cursor: pointer;
      font-size: 9.5px;
      font-weight: 700;
      font-family: inherit;
      padding: 3px 8px;
      line-height: 1;
      letter-spacing: 0.06em;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      transition: all 0.2s ease;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }

    .vz-panel-close-btn:hover {
      color: #00e5ff;
      background: rgba(0, 229, 255, 0.2);
      border-color: rgba(0, 229, 255, 0.5);
      box-shadow: 0 0 10px rgba(0, 229, 255, 0.3);
    }

    /* Universal Edge Tab for reopening hidden controls across all pods */
    .vz-edge-tab {
      position: fixed;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      padding: 9px 14px 9px 12px;
      min-height: 40px;
      min-width: 44px;
      border: 1px solid rgba(0, 229, 255, 0.5);
      border-right: none;
      border-radius: 10px 0 0 10px;
      background: rgba(8, 14, 28, 0.92);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      color: #00e5ff;
      font-family: inherit;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      cursor: pointer;
      pointer-events: auto;
      z-index: 1002;
      display: none;
      align-items: center;
      gap: 7px;
      transition: all 0.25s ease;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6), 0 0 14px rgba(0, 229, 255, 0.25);
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }

    .vz-edge-tab:hover {
      background: rgba(0, 229, 255, 0.22);
      box-shadow: 0 0 18px rgba(0, 229, 255, 0.55);
      transform: translateY(-50%) translateX(-2px);
    }

    .vz-edge-tab.visible {
      display: flex;
    }

    /* ── Bottom Nav Sound Button ── */
    .vz-sound-btn {
      margin-left: 2px;
      transition: all 0.2s ease;
    }
    .vz-sound-btn.playing {
      color: #00e5ff;
    }
    .vz-sound-btn.muted {
      color: rgba(224, 232, 255, 0.45);
    }
    .vz-sound-btn:hover {
      color: #00e5ff;
      background: rgba(0, 229, 255, 0.15);
    }
    .vz-nav-music-svg {
      display: block;
      transition: transform 0.2s ease;
    }
    .vz-sound-btn:hover .vz-nav-music-svg {
      transform: scale(1.15);
    }

    .vz-panel-row {
      margin-bottom: 14px;
    }

    .vz-panel-row:last-child {
      margin-bottom: 0;
    }

    .vz-panel-label {
      font-size: 9px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      opacity: 0.6;
      margin-bottom: 6px;
      display: block;
    }

    .vz-panel-info {
      font-size: 11px;
      opacity: 0.5;
      line-height: 1.5;
    }

    /* ── Custom range slider ── */
    .vz-slider {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background: rgba(255, 255, 255, 0.1);
      outline: none;
      pointer-events: auto;
      cursor: pointer;
    }

    .vz-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #ffffff;
      border: 2px solid #00e5ff;
      cursor: pointer;
      box-shadow: 0 0 8px rgba(0, 229, 255, 0.4);
      transition: box-shadow 0.2s ease;
    }

    .vz-slider::-webkit-slider-thumb:hover {
      box-shadow: 0 0 14px rgba(0, 229, 255, 0.7);
    }

    .vz-slider::-moz-range-thumb {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #ffffff;
      border: 2px solid #00e5ff;
      cursor: pointer;
      box-shadow: 0 0 8px rgba(0, 229, 255, 0.4);
    }

    .vz-slider::-webkit-slider-runnable-track {
      height: 4px;
      border-radius: 2px;
      background: linear-gradient(to right, #00e5ff var(--fill, 50%), rgba(255,255,255,0.1) var(--fill, 50%));
    }

    .vz-slider::-moz-range-track {
      height: 4px;
      border-radius: 2px;
      background: rgba(255, 255, 255, 0.1);
    }

    .vz-slider::-moz-range-progress {
      height: 4px;
      border-radius: 2px;
      background: #00e5ff;
    }

    .vz-slider-value {
      font-size: 12px;
      font-weight: 600;
      color: #00e5ff;
      text-align: right;
      margin-top: 4px;
    }

    /* ── Organelle buttons ── */
    .vz-btn-group {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .vz-btn-pill {
      padding: 6px 12px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.04);
      color: #e0e8ff;
      font-family: inherit;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      cursor: pointer;
      transition: all 0.2s ease;
      pointer-events: auto;
    }

    .vz-btn-pill:hover {
      background: rgba(0, 229, 255, 0.1);
      border-color: rgba(0, 229, 255, 0.3);
    }

    .vz-btn-pill.active {
      background: rgba(0, 229, 255, 0.15);
      border-color: #00e5ff;
      color: #00e5ff;
    }

    /* ── Weld target dual-axis control ── */
    .vz-dual-slider {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .vz-dual-slider .vz-axis-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .vz-dual-slider .vz-axis-label {
      font-size: 10px;
      font-weight: 700;
      opacity: 0.5;
      width: 12px;
      flex-shrink: 0;
    }

    .vz-dual-slider .vz-slider {
      flex: 1;
    }

    /* ═══════════════════════════════
       RESPONSIVE — Device & Orientation Tailored HUD (Phones, Tablets & iPads)
    ═══════════════════════════════ */

    /* ── 1. PORTRAIT MODE (Phones & Tablets) ── */
    @media (orientation: portrait), (max-width: 640px) and (orientation: portrait) {
      .vz-nav-label {
        display: none;
      }

      .vz-nav-btn {
        min-width: 38px;
        padding: 7px 5px;
      }

      #vz-navbar {
        bottom: 12px;
        padding: 4px 6px;
      }

      /* Compact bottom-right corner card in portrait mode */
      #vz-panel-container {
        top: auto;
        bottom: 78px;
        right: 12px;
        left: auto;
        width: 300px;
        max-width: calc(100vw - 24px);
        max-height: 48vh;
        transform: none;
      }

      #vz-panel-container.hidden-state {
        transform: translateY(20px);
      }

      .vz-edge-tab {
        top: auto;
        bottom: 78px;
        right: 12px;
        border-radius: 20px;
        border-right: 1px solid rgba(0, 229, 255, 0.5);
        transform: none;
        padding: 7px 14px;
      }

      .vz-edge-tab:hover {
        transform: translateY(-2px);
      }

      .vz-text-short {
        display: inline;
      }

      .vz-text-full {
        display: none;
      }

      .vz-panel-header {
        gap: 4px;
      }

      .vz-panel-title {
        font-size: 10px;
        letter-spacing: 0.05em;
        max-width: 110px;
      }

      .vz-panel-header-actions {
        gap: 4px;
      }

      .vz-panel-autohide-btn {
        padding: 3px 6px;
        font-size: 8.5px;
        gap: 3px;
      }

      .vz-panel-close-btn {
        padding: 3px 6px;
        font-size: 8.5px;
      }
    }

    /* ── 2. LANDSCAPE MODE (Mobile Phones, Tablets & iPads) ── */
    @media (orientation: landscape) {
      #vz-navbar {
        bottom: 10px;
        padding: 3px 6px;
        gap: 2px;
      }

      .vz-nav-btn {
        padding: 5px 8px;
        min-width: 44px;
      }

      .vz-nav-icon {
        font-size: 15px;
      }

      .vz-nav-label {
        font-size: 8px;
        letter-spacing: 0.05em;
      }

      /* Wide landscape-oriented card on the right, neatly below top-right status controls */
      #vz-panel-container {
        top: 68px;
        bottom: 58px;
        right: 18px;
        left: auto;
        width: 390px;
        max-width: calc(100% - 90px);
        max-height: calc(100% - 130px);
        transform: none;
      }

      #vz-panel-container.hidden-state {
        transform: translateX(35px);
      }

      .vz-panel {
        padding: 12px 16px;
        max-height: calc(100% - 70px);
      }

      /* In landscape mode, arrange buttons in a clean 2-3 column grid */
      .vz-btn-group {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(115px, 1fr));
        gap: 6px;
      }

      .vz-btn-pill {
        padding: 5px 8px;
        font-size: 9.5px;
        text-align: center;
      }

      .vz-panel-info {
        font-size: 10px !important;
        padding: 8px !important;
        line-height: 1.38 !important;
      }

      .vz-edge-tab {
        top: auto;
        bottom: 58px;
        right: 14px;
        border-radius: 20px;
        border-right: 1px solid rgba(0, 229, 255, 0.5);
        transform: none;
        padding: 7px 14px;
      }

      .vz-edge-tab:hover {
        transform: translateY(-2px);
      }

      .vz-text-short {
        display: none;
      }

      .vz-text-full {
        display: inline;
      }
    }

    body.vz-orientation-landscape #vz-navbar {
      bottom: 10px;
      padding: 3px 6px;
      gap: 2px;
    }

    body.vz-orientation-landscape .vz-nav-btn {
      padding: 5px 8px;
      min-width: 44px;
    }

    body.vz-orientation-landscape .vz-nav-icon {
      font-size: 15px;
    }

    body.vz-orientation-landscape .vz-nav-label {
      font-size: 8px;
      letter-spacing: 0.05em;
    }

    body.vz-orientation-landscape #vz-panel-container {
      top: 68px;
      bottom: 58px;
      right: 18px;
      left: auto;
      width: 390px;
      max-width: calc(100% - 90px);
      max-height: calc(100% - 130px);
      transform: none;
    }

    body.vz-orientation-landscape #vz-panel-container.hidden-state {
      transform: translateX(35px);
    }

    body.vz-orientation-landscape .vz-panel {
      padding: 12px 16px;
      max-height: calc(100% - 70px);
    }

    body.vz-orientation-landscape .vz-btn-group {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(115px, 1fr));
      gap: 6px;
    }

    body.vz-orientation-landscape .vz-btn-pill {
      padding: 5px 8px;
      font-size: 9.5px;
      text-align: center;
    }

    body.vz-orientation-landscape .vz-panel-info {
      font-size: 10px !important;
      padding: 8px !important;
      line-height: 1.38 !important;
    }

    body.vz-orientation-landscape .vz-edge-tab {
      top: auto;
      bottom: 58px;
      right: 18px;
      border-radius: 20px;
      border-right: 1px solid rgba(0, 229, 255, 0.5);
      transform: none;
      padding: 7px 14px;
    }

    body.vz-orientation-landscape .vz-edge-tab:hover {
      transform: translateY(-2px);
    }

    body.vz-orientation-landscape .vz-text-short {
      display: none;
    }

    body.vz-orientation-landscape .vz-text-full {
      display: inline;
    }

    /* ── Desktop Screens (>= 1025px): Center right, clear of top status controls ── */
    @media (min-width: 1025px) {
      #vz-panel-container {
        top: 50% !important;
        bottom: auto !important;
        right: 24px !important;
        transform: translateY(-50%) !important;
        width: 380px !important;
        max-height: calc(100vh - 160px) !important;
      }

      #vz-panel-container.hidden-state {
        transform: translateY(-50%) translateX(35px) !important;
      }

      .vz-edge-tab {
        top: 50% !important;
        bottom: auto !important;
        right: 0 !important;
        transform: translateY(-50%) !important;
        border-radius: 10px 0 0 10px !important;
        border-right: none !important;
      }

      .vz-edge-tab:hover {
        transform: translateY(-50%) translateX(-2px) !important;
      }
    }

    /* ── Portrait Orientation Override for Locked Modes ── */
    body.vz-orientation-portrait .vz-text-short {
      display: inline;
    }

    body.vz-orientation-portrait .vz-text-full {
      display: none;
    }

    body.vz-orientation-portrait .vz-panel-header {
      gap: 4px;
    }

    body.vz-orientation-portrait .vz-panel-title {
      font-size: 10px;
      letter-spacing: 0.05em;
      max-width: 110px;
    }

    body.vz-orientation-portrait .vz-panel-header-actions {
      gap: 4px;
    }

    body.vz-orientation-portrait .vz-panel-autohide-btn {
      padding: 3px 6px;
      font-size: 8.5px;
      gap: 3px;
    }

    body.vz-orientation-portrait .vz-panel-close-btn {
      padding: 3px 6px;
      font-size: 8.5px;
    }

    body.vz-orientation-portrait #vz-panel-container {
      top: auto;
      bottom: 78px;
      right: 12px;
      left: auto;
      width: 300px;
      max-width: calc(100vw - 24px);
      max-height: 48vh;
      transform: none;
    }

    body.vz-orientation-portrait #vz-panel-container.hidden-state {
      transform: translateY(20px);
    }

    body.vz-orientation-portrait .vz-edge-tab {
      top: auto;
      bottom: 78px;
      right: 12px;
      border-radius: 20px;
      border-right: 1px solid rgba(0, 229, 255, 0.5);
      transform: none;
      padding: 7px 14px;
    }

    body.vz-orientation-portrait .vz-edge-tab:hover {
      transform: translateY(-2px);
    }

    /* ── 3. TABLETS & IPAD SPECIFIC OPTIMIZATIONS ── */
    @media (min-width: 641px) and (max-width: 1024px) and (orientation: portrait) {
      .vz-nav-label {
        display: block;
        font-size: 8.5px;
      }

      .vz-nav-btn {
        min-width: 50px;
        padding: 8px 10px;
      }

      #vz-panel-container {
        width: 340px;
        max-height: 52vh;
        bottom: 84px;
        right: 18px;
      }

      .vz-edge-tab {
        top: auto;
        bottom: 84px;
        right: 18px;
        border-radius: 20px;
        border-right: 1px solid rgba(0, 229, 255, 0.5);
        transform: none;
        padding: 7px 14px;
      }

      .vz-text-short {
        display: none;
      }

      .vz-text-full {
        display: inline;
      }
    }
  `,document.head.appendChild(a)}function fe(a,{cls:e,attrs:o,html:n,children:i}={}){const s=document.createElement(a);if(e&&(s.className=e),o)for(const[t,r]of Object.entries(o))s.setAttribute(t,r);if(n&&(s.innerHTML=n),i)for(const t of i)s.appendChild(t);return s}function fo(a){const e=parseFloat(a.min)||0,o=parseFloat(a.max)||100,i=(parseFloat(a.value)-e)/(o-e)*100;a.style.setProperty("--fill",`${i}%`)}function So(a,e){const o=typeof e=="function"?{onHide:e}:e||{},{onHide:n,onToggleAutoHide:i,registerHeaderControls:s}=o,t=fe("div",{cls:"vz-panel-header-wrap"}),r=fe("div",{cls:"vz-panel-header"}),u=fe("div",{cls:"vz-panel-title",html:a}),p=fe("div",{cls:"vz-panel-header-actions"}),h=fe("button",{cls:"vz-panel-autohide-btn active",attrs:{type:"button",title:"Auto-hide is ON (hides after 6s of inactivity). Click to keep controls open."}}),d=fe("span",{cls:"vz-autohide-dot active"}),m=fe("span",{cls:"vz-autohide-icon",html:"⏱️"}),v=fe("span",{cls:"vz-autohide-text vz-text-full",html:"AUTO-HIDE: ON"}),S=fe("span",{cls:"vz-autohide-text vz-text-short",html:"AUTO: ON"});h.appendChild(d),h.appendChild(m),h.appendChild(v),h.appendChild(S),h.addEventListener("click",P=>{P.stopPropagation(),i?.()});const y=fe("button",{cls:"vz-panel-close-btn",html:'<span style="font-size:10px; margin-right:3px;">✕</span> HIDE',attrs:{type:"button",title:"Hide controls for unobstructed 3D viewing"}});y.addEventListener("click",P=>{P.stopPropagation(),n?.()}),p.appendChild(h),p.appendChild(y),r.appendChild(u),r.appendChild(p),t.appendChild(r);const f=fe("div",{cls:"vz-autohide-track"}),c=fe("div",{cls:"vz-autohide-fill"});return f.appendChild(c),t.appendChild(f),s&&s(h,c,v,S,d,f),t}function qa(a){Wa();const{cameraAnim:e}=a,o=fe("div",{attrs:{id:"vizon-hud"}}),n=oo();n.appendChild(o);const i=fe("div",{cls:"vz-glass",attrs:{id:"vz-navbar"}});o.appendChild(i);const s=fe("button",{cls:"vz-nav-btn",html:'<span class="vz-nav-icon">🏠</span><span class="vz-nav-label">Home</span>'});s.addEventListener("click",()=>{window.__sim?.mobileRobots?.telemetry?.deselect?.(),re(null),e.transitionToSpawn()}),i.appendChild(s),i.appendChild(fe("div",{cls:"vz-nav-divider"}));const t={};for(const X of bo){const O=fe("button",{cls:"vz-nav-btn",html:`<span class="vz-nav-icon">${X.icon}</span><span class="vz-nav-label">${X.label}</span>`});O.addEventListener("click",()=>{window.__sim?.mobileRobots?.telemetry?.deselect?.(),re(X.key),e.transitionTo(X.key)}),i.appendChild(O),t[X.key]=O}i.appendChild(fe("div",{cls:"vz-nav-divider"}));const r=fe("button",{cls:"vz-nav-btn vz-sound-btn playing",attrs:{id:"vz-nav-sound-btn",title:"Mute Ambient Sound"}}),u=fe("span",{cls:"vz-nav-icon"}),p=fe("span",{cls:"vz-nav-label",html:"Mute"});r.appendChild(u),r.appendChild(p),i.appendChild(r);function h(){$t.isMuted?(u.innerHTML=`
        <svg class="vz-nav-music-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3" fill="currentColor"></circle>
          <circle cx="18" cy="16" r="3" fill="currentColor"></circle>
        </svg>
      `,p.textContent="Unmute",r.classList.add("muted"),r.classList.remove("playing"),r.setAttribute("title","Click to Unmute Ambient Sound")):(u.innerHTML=`
        <svg class="vz-nav-music-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3" fill="currentColor"></circle>
          <circle cx="18" cy="16" r="3" fill="currentColor"></circle>
          <line x1="3" y1="3" x2="21" y2="21" stroke="#ff4757" stroke-width="2.5"></line>
        </svg>
      `,p.textContent="Mute",r.classList.remove("muted"),r.classList.add("playing"),r.setAttribute("title","Click to Mute Ambient Sound"))}r.addEventListener("click",X=>{X.stopPropagation(),$t.toggle(),h()}),$t.onStateChange(()=>{h()}),h();const d=fe("div",{attrs:{id:"vz-panel-container"}});o.appendChild(d);let m=!1;const v=fe("button",{cls:"vz-edge-tab",attrs:{id:"vz-global-edge-tab",title:"Show Station Controls"}});v.innerHTML='<span class="vz-edge-icon">⚙️</span><span class="vz-edge-label">SHOW CONTROLS</span>',n.appendChild(v);const S="vz_pod_autohide_enabled";let y=!0;try{const X=localStorage.getItem(S);X!==null&&(y=X==="true")}catch{}const f=6e3;let c=null,P=0,M=!1,I=null;const H=[],x=[];function R(){for(const X of H){const{btn:O,fullTxt:L,shortTxt:te,dot:se,track:Se}=X;O.classList.toggle("active",y),se&&se.classList.toggle("active",y),L&&(L.textContent=y?"AUTO-HIDE: ON":"AUTO-HIDE: OFF"),te&&(te.textContent=y?"AUTO: ON":"AUTO: OFF"),O.setAttribute("title",y?"Auto-hide is ON (hides after 6s of inactivity). Click to keep controls open.":"Auto-hide is OFF (controls stay open). Click to enable 6s auto-hide."),Se&&(Se.style.display=y?"block":"none")}for(const X of x)y||(X.style.width="100%")}function w(X){for(const O of x)O.style.width=`${Math.max(0,Math.min(100,X))}%`}function C(){c&&(clearTimeout(c),c=null),I&&(cancelAnimationFrame(I),I=null)}function g(){if(C(),!y||m||q===null){w(100);return}if(M){w(100);return}P=performance.now(),w(100);const X=()=>{if(!y||m||q===null||M)return;const O=performance.now()-P,L=Math.max(0,f-O),te=L/f*100;w(te),L>0&&(I=requestAnimationFrame(X))};I=requestAnimationFrame(X),c=setTimeout(()=>{y&&!m&&q!==null&&!M&&_()},f)}function A(){y=!y;try{localStorage.setItem(S,String(y))}catch{}R(),y?g():(C(),w(100))}function _(){if(m=!0,d.classList.add("hidden-state"),C(),q){const X=bo.find(O=>O.key===q);v.innerHTML=`<span class="vz-edge-icon">${X?.icon||"⚙️"}</span><span class="vz-edge-label">SHOW ${X?.label.toUpperCase()||"CONTROLS"}</span>`,v.classList.add("visible")}}function V(){m=!1,d.classList.remove("hidden-state"),v.classList.remove("visible"),g()}v.addEventListener("click",X=>{X.stopPropagation(),V()}),d.addEventListener("mouseenter",()=>{M=!0,C(),w(100)}),d.addEventListener("mouseleave",()=>{M=!1,g()}),d.addEventListener("pointerdown",()=>{M=!0,C(),w(100)}),window.addEventListener("pointerup",()=>{M&&(M=!1,g())}),d.addEventListener("touchstart",()=>{M=!0,C(),w(100)},{passive:!0}),window.addEventListener("touchend",()=>{M&&(M=!1,g())},{passive:!0}),d.addEventListener("input",()=>{g()}),d.addEventListener("change",()=>{g()}),d.addEventListener("scroll",()=>{g()},{passive:!0}),d.addEventListener("wheel",()=>{g()},{passive:!0}),d.addEventListener("click",X=>{!X.target.closest(".vz-panel-close-btn")&&!X.target.closest(".vz-panel-autohide-btn")&&g()});const Z={onHide:()=>_(),onToggleAutoHide:()=>A(),registerHeaderControls:(X,O,L,te,se,Se)=>{H.push({btn:X,fullTxt:L,shortTxt:te,dot:se,track:Se}),O&&x.push(O)},resetAutoHide:()=>g()},ee={};ee.physics=ja(a.physics,Z),d.appendChild(ee.physics),ee.chemistry=Xa(a.chemistry,Z),d.appendChild(ee.chemistry),ee.biology=Ka(a.biology,Z),d.appendChild(ee.biology),ee.mathematics=Qa(a.math,Z),d.appendChild(ee.mathematics),ee.astronomy=$a(a.astroRobotics,Z),d.appendChild(ee.astronomy),R();let q=null;function re(X){q=X,s.classList.toggle("active",X===null);for(const O of bo)t[O.key].classList.toggle("active",O.key===X);if(X===null){C(),v.classList.remove("visible"),d.classList.remove("hidden-state"),m=!1;for(const O of bo)ee[O.key].classList.remove("visible"),ee[O.key].style.display="none";return}m=!1,d.classList.remove("hidden-state"),v.classList.remove("visible");for(const O of bo){const L=ee[O.key];if(O.key===X)L.style.display="block",L.offsetHeight,L.classList.add("visible");else{L.classList.remove("visible");const te=L,se=()=>{te.classList.contains("visible")||(te.style.display="none"),te.removeEventListener("transitionend",se)};te.addEventListener("transitionend",se),setTimeout(()=>{te.classList.contains("visible")||(te.style.display="none")},400)}}g()}return e.onStationChange&&e.onStationChange(X=>{re(X)}),re(null),{setActiveStation:re,get currentStation(){return q},toggleAutoHide:A,resetAutoHide:g,hideControls:_,showControls:V}}function ja(a,e){const o=fe("div",{cls:"vz-panel vz-glass"});o.appendChild(So("⚡ Physics Controls",e));const n=fe("div",{cls:"vz-panel-row"}),i=fe("span",{cls:"vz-panel-label",html:"Voltage"});n.appendChild(i);const s=fe("input",{cls:"vz-slider",attrs:{type:"range",min:"0",max:"100",step:"1",value:"50"}}),t=fe("div",{cls:"vz-slider-value",html:"50%"});return s.addEventListener("input",()=>{const r=parseFloat(s.value)/100;t.textContent=`${s.value}%`,fo(s),a?.controls?.voltage&&(a.controls.voltage.value=r),e?.resetAutoHide?.()}),fo(s),n.appendChild(s),n.appendChild(t),o.appendChild(n),o}function Xa(a,e){const o=fe("div",{cls:"vz-panel vz-glass"});o.appendChild(So("🧪 Flame Test & Spectroscopy",e));const n=fe("div",{cls:"vz-panel-row"}),i=fe("span",{cls:"vz-panel-label",html:"Inoculate Element Salt"});n.appendChild(i);const s=fe("div",{cls:"vz-btn-group"}),t=[{key:"sodium",label:"🟡 Na⁺ (589nm)"},{key:"copper",label:"🟢 Cu²⁺ (521nm)"},{key:"strontium",label:"🔴 Sr²⁺ (668nm)"},{key:"potassium",label:"🟣 K⁺ (404nm)"},{key:"barium",label:"🍏 Ba²⁺ (553nm)"},{key:"calcium",label:"🟠 Ca²⁺ (622nm)"},{key:"clean",label:"🔵 Pure Blue (HCl)"}],r={},u=fe("div",{cls:"vz-panel-info"});function p(S){const y=_t[S]||_t.sodium;u.style.borderLeftColor=y.spectralLines[0]?.color||"#00e5ff",u.innerHTML=`
      <div style="font-weight:700; color:#fff; margin-bottom:3px;">${y.name} [${y.ion}]</div>
      <div style="opacity:0.85; margin-bottom:2px;"><b>Salt:</b> ${y.salt}</div>
      <div style="opacity:0.85; margin-bottom:2px;"><b>Flame:</b> ${y.colorName}</div>
      <div style="opacity:0.85; margin-bottom:2px;"><b>Key Lines:</b> ${y.wavelengths.join(", ")}</div>
      <div style="opacity:0.75; font-size:10px; margin-top:4px; color:#00e5ff;"><b>Quantum Transition:</b> ${y.quantumTransition} (ΔE ≈ ${y.deltaE})</div>
    `}for(const S of t){const y=fe("button",{cls:`vz-btn-pill${S.key==="sodium"?" active":""}`,html:S.label});y.addEventListener("click",()=>{S.key;for(const[f,c]of Object.entries(r))c.classList.toggle("active",f===S.key);a?.controls?.setElement?.(S.key),p(S.key),e?.resetAutoHide?.()}),r[S.key]=y,s.appendChild(y)}n.appendChild(s),o.appendChild(n);const h=fe("div",{cls:"vz-panel-row"}),d=fe("span",{cls:"vz-panel-label",html:"Air Collar (Premix Ratio)"});h.appendChild(d);const m=fe("input",{cls:"vz-slider",attrs:{id:"vz-chem-air-slider",type:"range",min:"0",max:"100",step:"1",value:"100"}}),v=fe("div",{cls:"vz-slider-value",html:"Roaring Flame (100% Air)"});return m.addEventListener("input",()=>{const S=parseFloat(m.value)/100;S<.25?v.textContent="Safety Flame (Yellow/Cool)":S<.75?v.textContent=`Partial Premix (${m.value}%)`:v.textContent=`Roaring Flame (${m.value}% Air)`,fo(m),a?.controls?.airCollar&&(a.controls.airCollar.value=S),e?.resetAutoHide?.()}),fo(m),h.appendChild(m),h.appendChild(v),o.appendChild(h),p("sodium"),o.appendChild(u),o}function Ka(a,e){const o=fe("div",{cls:"vz-panel vz-glass"});o.appendChild(So("🧬 Biology Controls",e));const n=fe("div",{cls:"vz-panel-row"}),i=fe("span",{cls:"vz-panel-label",html:"Organelle Isolation"});n.appendChild(i);const s=fe("div",{cls:"vz-btn-group"}),t=[{key:"all",label:"All"},{key:"nucleus",label:"Nucleus"},{key:"mitochondria",label:"Mito"},{key:"er",label:"ER & Ribosomes"},{key:"golgi",label:"Golgi"},{key:"centrioles",label:"Centrioles"}],r={};for(const h of t){const d=fe("button",{cls:`vz-btn-pill${h.key==="all"?" active":""}`,html:h.label});d.addEventListener("click",()=>{h.key;for(const[m,v]of Object.entries(r))v.classList.toggle("active",m===h.key);a?.controls?.organelleIsolation&&(a.controls.organelleIsolation.value=h.key),e?.resetAutoHide?.()}),r[h.key]=d,s.appendChild(d)}n.appendChild(s),o.appendChild(n);const u=fe("div",{cls:"vz-panel-row"}),p=fe("button",{cls:"vz-btn-pill",html:"🔬 Launch SGU 3.5M Cell Atlas"});return p.addEventListener("click",()=>{a?.openSguModal?.(),e?.resetAutoHide?.()}),u.appendChild(p),o.appendChild(u),o}function Qa(a,e){const o=fe("div",{cls:"vz-panel vz-glass"});o.appendChild(So("📐 Mathematics",e));const n=fe("div",{cls:"vz-panel-row"}),i=fe("span",{cls:"vz-panel-label",html:"Topological Geometry"});n.appendChild(i);const s=fe("div",{cls:"vz-btn-group"}),t=[{key:"hypercube",label:"4D Hypercube"},{key:"harmonic",label:"Harmonic"},{key:"dual",label:"Dual Overlay"}],r={};for(const v of t){const S=fe("button",{cls:`vz-tag-btn ${v.key==="hypercube"?"active":""}`,html:v.label});S.addEventListener("click",()=>{for(const[y,f]of Object.entries(r))f.classList.toggle("active",y===v.key);a?.controls?.displayMode&&(a.controls.displayMode.value=v.key),e?.resetAutoHide?.()}),r[v.key]=S,s.appendChild(S)}n.appendChild(s),o.appendChild(n);const u=fe("div",{cls:"vz-panel-row"}),p=fe("span",{cls:"vz-panel-label",html:"4D Rotation Speed"});u.appendChild(p);const h=fe("input",{cls:"vz-slider",attrs:{type:"range",min:"0.1",max:"3.0",step:"0.1",value:"1.0"}});h.addEventListener("input",v=>{a?.controls?.rotationSpeed&&(a.controls.rotationSpeed.value=parseFloat(v.target.value)),e?.resetAutoHide?.()}),u.appendChild(h),o.appendChild(u);const d=fe("div",{cls:"vz-panel-row"}),m=fe("div",{cls:"vz-panel-info",html:"Visualizing 4D tesseract stereographic projection and standing-wave spherical harmonics."});return d.appendChild(m),o.appendChild(d),o}function $a(a,e){const o=fe("div",{cls:"vz-panel vz-glass",attrs:{id:"vz-astro-panel"}});o.appendChild(So("🔭 Kepler Orrery & Deep Space",e));const n=fe("div",{cls:"vz-panel-row"}),i=fe("span",{cls:"vz-panel-label",html:"Orbital Time Scale"});n.appendChild(i);const s=fe("input",{cls:"vz-slider",attrs:{type:"range",min:"0.1",max:"10",step:"0.1",value:"1"}}),t=fe("div",{cls:"vz-slider-value",html:"1.0×"});s.addEventListener("input",()=>{const p=parseFloat(s.value);t.textContent=`${p.toFixed(1)}×`,fo(s),a?.controls?.orbitalTimeScale&&(a.controls.orbitalTimeScale.value=p),e?.resetAutoHide?.()}),fo(s),n.appendChild(s),n.appendChild(t),o.appendChild(n);const r=fe("div",{cls:"vz-panel-row"}),u=fe("div",{cls:"vz-panel-info",html:"Touch or click any planet or the Sun to reveal live scientific telemetry cards and atmospheric data."});return r.appendChild(u),o.appendChild(r),o}class mo{static createButton(e,o={}){const n=document.createElement("button");function i(){let p=null;async function h(v){v.addEventListener("end",d),await e.xr.setSession(v),n.textContent="EXIT VR",p=v}function d(){p.removeEventListener("end",d),n.textContent="ENTER VR",p=null}n.style.display="",n.style.cursor="pointer",n.style.left="calc(50% - 50px)",n.style.width="100px",n.textContent="ENTER VR";const m={...o,optionalFeatures:["local-floor","bounded-floor","layers",...o.optionalFeatures||[]]};n.onmouseenter=function(){n.style.opacity="1.0"},n.onmouseleave=function(){n.style.opacity="0.5"},n.onclick=function(){p===null?navigator.xr.requestSession("immersive-vr",m).then(h):(p.end(),navigator.xr.offerSession!==void 0&&navigator.xr.offerSession("immersive-vr",m).then(h).catch(v=>{console.warn(v)}))},navigator.xr.offerSession!==void 0&&navigator.xr.offerSession("immersive-vr",m).then(h).catch(v=>{console.warn(v)})}function s(){n.style.display="",n.style.cursor="auto",n.style.left="calc(50% - 75px)",n.style.width="150px",n.onmouseenter=null,n.onmouseleave=null,n.onclick=null}function t(){s(),n.textContent="VR NOT SUPPORTED"}function r(p){s(),console.warn("Exception when trying to call xr.isSessionSupported",p),n.textContent="VR NOT ALLOWED"}function u(p){p.style.position="absolute",p.style.bottom="20px",p.style.padding="12px 6px",p.style.border="1px solid #fff",p.style.borderRadius="4px",p.style.background="rgba(0,0,0,0.1)",p.style.color="#fff",p.style.font="normal 13px sans-serif",p.style.textAlign="center",p.style.opacity="0.5",p.style.outline="none",p.style.zIndex="999"}if("xr"in navigator)return n.id="VRButton",n.style.display="none",u(n),navigator.xr.isSessionSupported("immersive-vr").then(function(p){p?i():t(),p&&mo.xrSessionIsGranted&&n.click()}).catch(r),n;{const p=document.createElement("a");return window.isSecureContext===!1?(p.href=document.location.href.replace(/^http:/,"https:"),p.innerHTML="WEBXR NEEDS HTTPS"):(p.href="https://immersiveweb.dev/",p.innerHTML="WEBXR NOT AVAILABLE"),p.style.left="calc(50% - 90px)",p.style.width="180px",p.style.textDecoration="none",u(p),p}}static registerSessionGrantedListener(){if(typeof navigator<"u"&&"xr"in navigator){if(/WebXRViewer\//i.test(navigator.userAgent))return;navigator.xr.addEventListener("sessiongranted",()=>{mo.xrSessionIsGranted=!0})}}}mo.xrSessionIsGranted=!1;mo.registerSessionGrantedListener();function Za(a){Qt()||"xr"in navigator&&navigator.xr.isSessionSupported("immersive-vr").then(e=>{if(!(!e||Qt()))try{a.xr.enabled=!0,a.xr.setReferenceSpaceType("local-floor");const o=mo.createButton(a);if(o){if(o.textContent.toUpperCase().includes("NOT SUPPORTED")||Qt()){o.style.display="none";return}o.id="vz-vr-btn",o.style.position="fixed",o.style.top="20px",o.style.right="20px",o.style.bottom="auto",o.style.padding="10px 18px",o.style.border="1px solid rgba(0, 229, 255, 0.4)",o.style.borderRadius="12px",o.style.background="rgba(10, 14, 26, 0.7)",o.style.backdropFilter="blur(16px)",o.style.webkitBackdropFilter="blur(16px)",o.style.color="#00e5ff",o.style.fontFamily="'Inter', system-ui, sans-serif",o.style.fontSize="12px",o.style.fontWeight="600",o.style.letterSpacing="0.12em",o.style.textTransform="uppercase",o.style.cursor="pointer",o.style.zIndex="999",o.style.transition="all 0.3s ease",o.style.boxShadow="0 0 15px rgba(0, 229, 255, 0.2)",o.addEventListener("mouseenter",()=>{o.style.borderColor="#00e5ff",o.style.boxShadow="0 0 25px rgba(0, 229, 255, 0.5)",o.style.background="rgba(0, 229, 255, 0.15)"}),o.addEventListener("mouseleave",()=>{o.style.borderColor="rgba(0, 229, 255, 0.4)",o.style.boxShadow="0 0 15px rgba(0, 229, 255, 0.2)",o.style.background="rgba(10, 14, 26, 0.7)"}),document.body.appendChild(o)}}catch(o){console.warn("WebXR initialization failed:",o)}}).catch(()=>{})}function Ja(){return $t.loadTrack("/audio/ambient_space.wav").catch(a=>{console.warn("[Audio] Preload notice:",a)}),window.addEventListener("keydown",a=>{a.target&&(a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA")||(a.key==="m"||a.key==="M")&&$t.toggle()}),{ambientAudio:$t}}function es(a,e={}){const o={uTime:a.uTime,uResolution:a.uResolution,uVoltage:{value:e.voltage??.65},uWidth:{value:e.width??.042},uColorCore:{value:new he(16777215)},uColorCyan:{value:new he(62975)},uColorViolet:{value:new he(11868062)},uColorDeep:{value:new he(7473591)}};return{material:new ft({uniforms:o,vertexShader:`
      attribute float aSide;       // -1.0 for left edge, +1.0 for right edge
      attribute float aProgress;   // 0.0 at electrode to 1.0 at glass
      attribute vec3  aTangent;    // Direction vector along arc segment
      attribute float aFilamentId; // Unique ID per filament for de-synchronized flicker

      uniform float uTime;
      uniform float uVoltage;
      uniform float uWidth;

      varying float vSide;
      varying float vProgress;
      varying float vFilamentId;

      void main() {
        vSide = aSide;
        vProgress = aProgress;
        vFilamentId = aFilamentId;

        vec3 t = aTangent;
        if (length(t) < 0.0001) {
          t = vec3(0.0, 1.0, 0.0);
        }

        vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        vec3 worldTangent = normalize((modelMatrix * vec4(t, 0.0)).xyz);
        vec3 viewDir = normalize(cameraPosition - worldPos);

        vec3 billboardPerp = cross(worldTangent, viewDir);
        if (length(billboardPerp) < 0.0001) {
          billboardPerp = vec3(0.0, 1.0, 0.0);
        } else {
          billboardPerp = normalize(billboardPerp);
        }

        // Width tapers at the electrode contact and expands slightly towards the glass
        float widthFactor = (0.75 + 0.5 * sin(aProgress * 3.14159)) * (0.85 + uVoltage * 0.45);
        float width = uWidth * widthFactor;

        // High-frequency electrical micro-jitter (crackle)
        float jitterPhase = uTime * 45.0 + aFilamentId * 17.3 + aProgress * 25.0;
        vec3 jitter = billboardPerp * (sin(jitterPhase) * 0.006 * uVoltage);

        vec3 expandedWorldPos = worldPos + billboardPerp * (aSide * width) + jitter;

        gl_Position = projectionMatrix * viewMatrix * vec4(expandedWorldPos, 1.0);
      }
    `,fragmentShader:`
      precision highp float;

      uniform float uTime;
      uniform float uVoltage;
      uniform vec3  uColorCore;
      uniform vec3  uColorCyan;
      uniform vec3  uColorViolet;
      uniform vec3  uColorDeep;

      varying float vSide;
      varying float vProgress;
      varying float vFilamentId;

      void main() {
        float distFromCenter = abs(vSide); // 0.0 at center line, 1.0 at outer edge

        // 1. Ultra-intense white-hot central core (luminance > 4.0 to cleanly hit bloom threshold)
        float core = exp(-distFromCenter * distFromCenter * 28.0);

        // 2. High-energy electric cyan ionization channel
        float innerGlow = exp(-distFromCenter * distFromCenter * 6.0);

        // 3. Radiant noble gas ultraviolet/magenta corona fringe
        float outerCorona = exp(-distFromCenter * 2.2);

        // 4. Longitudinal traveling charge pulse (electrons streaming to the glass)
        float pulseSpeed = 28.0 + uVoltage * 20.0;
        float pulse = 0.85 + 0.25 * sin(vProgress * 36.0 - uTime * pulseSpeed + vFilamentId * 4.7);

        // 5. High-frequency stochastic micro-flicker (20kHz AC Tesla discharge simulation)
        float flicker = 0.88 + 0.15 * fract(sin(uTime * 85.0 + vFilamentId * 31.7) * 43758.5453);

        // Composite multi-spectrum color gradient
        vec3 col = uColorCore * core * (4.2 + uVoltage * 2.5);
        col += uColorCyan * innerGlow * (2.8 + uVoltage * 1.8);
        col += mix(uColorViolet, uColorDeep, vProgress) * outerCorona * (1.8 + uVoltage * 1.2);

        // Modulate by dynamic electrical pulses
        col *= pulse * flicker;

        float alpha = clamp(core * 1.5 + innerGlow * 1.0 + outerCorona * 0.5, 0.0, 1.0);

        gl_FragColor = vec4(col, alpha);
      }
    `,transparent:!0,side:Ve,depthWrite:!1,blending:ot}),uniforms:o}}function ts(a){const e={uTime:a.uTime,uVoltage:{value:.65},uColorGas:{value:new he(46296)},uColorRim:{value:new he(7473591)}};return{material:new ft({uniforms:e,vertexShader:`
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPos.xyz;
        gl_Position = projectionMatrix * mvPos;
      }
    `,fragmentShader:`
      precision highp float;

      uniform float uTime;
      uniform float uVoltage;
      uniform vec3  uColorGas;
      uniform vec3  uColorRim;

      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);

        // Delicate inverted Fresnel: translucent center, subtly luminous rim
        float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 2.6);
        float pulse = 0.9 + 0.1 * sin(uTime * 3.0);

        vec3 col = mix(uColorGas * 0.35, uColorRim * 0.75, fresnel) * (0.6 + uVoltage * 0.6) * pulse;
        float alpha = clamp(fresnel * (0.16 + uVoltage * 0.12) + 0.03, 0.0, 0.35);

        gl_FragColor = vec4(col, alpha);
      }
    `,transparent:!0,side:_o,depthWrite:!1,blending:ot}),uniforms:e}}function os(a){const e={uTime:a.uTime,uVoltage:{value:.65},uColorSpot:{value:new he(62975)},uColorHalo:{value:new he(13959417)}};return{material:new ft({uniforms:e,vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      precision highp float;

      uniform float uTime;
      uniform float uVoltage;
      uniform vec3  uColorSpot;
      uniform vec3  uColorHalo;

      varying vec2 vUv;

      void main() {
        vec2 p = vUv * 2.0 - 1.0;
        float r = length(p);
        if (r > 1.0) discard;

        float core = exp(-r * r * 14.0);
        float halo = exp(-r * r * 3.0);

        vec3 col = vec3(1.0) * core * 3.5 + uColorSpot * core * 2.5 + uColorHalo * halo * 1.8;
        col *= (0.8 + uVoltage * 0.8);
        float alpha = clamp(core * 1.0 + halo * 0.6, 0.0, 1.0);

        gl_FragColor = vec4(col, alpha);
      }
    `,transparent:!0,side:Ve,depthWrite:!1,blending:ot}),uniforms:e}}function ns(a){const e={uTime:a.uTime,uVoltage:{value:.65}};return{material:new ft({uniforms:e,vertexShader:`
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPos.xyz;
        gl_Position = projectionMatrix * mvPos;
      }
    `,fragmentShader:`
      precision highp float;

      uniform float uTime;
      uniform float uVoltage;

      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);

        float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 1.8);
        float pulse = 0.85 + 0.15 * sin(uTime * 14.0);

        vec3 col = mix(vec3(0.0, 0.9, 1.0), vec3(0.7, 0.1, 1.0), fresnel);
        col *= (2.0 + uVoltage * 2.5) * pulse;
        float alpha = clamp(fresnel * 0.75 + 0.25, 0.0, 1.0) * (0.6 + uVoltage * 0.4);

        gl_FragColor = vec4(col, alpha);
      }
    `,transparent:!0,side:Ve,depthWrite:!1,blending:ot}),uniforms:e}}function is(a,e={}){const o=e.color!==void 0?e.color instanceof he?e.color:new he(e.color):new he(58879),n={uTime:a.uTime,uColor:{value:o},uOpacity:{value:e.opacity??.7},uScanlineSpeed:{value:e.scanlineSpeed??2},uScanlineDensity:{value:e.scanlineDensity??80},uFlickerSpeed:{value:e.flickerSpeed??8}};return new ft({uniforms:n,vertexShader:`
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;
      varying vec3 vWorldPosition;

      void main() {
        vPosition = position;
        vNormal = normalize(normalMatrix * normal);
        vUv = uv;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPosition = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,fragmentShader:`
      precision highp float;

      uniform float uTime;
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uScanlineSpeed;
      uniform float uScanlineDensity;
      uniform float uFlickerSpeed;

      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;
      varying vec3 vWorldPosition;

      float random(vec2 st) {
        return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      void main() {
        // Scanlines
        float scanline = sin((vWorldPosition.y + uTime * uScanlineSpeed) * uScanlineDensity) * 0.5 + 0.5;
        scanline = smoothstep(0.3, 0.7, scanline);

        // Flicker
        float flicker = 0.95 + 0.05 * sin(uTime * uFlickerSpeed);
        flicker *= 0.97 + 0.03 * sin(uTime * uFlickerSpeed * 3.17);

        // Fresnel edge glow
        float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);

        // Noise grain
        float grain = random(vUv + uTime * 0.01) * 0.08;

        // Composite color
        vec3 col = uColor * (0.6 + 0.4 * scanline);
        col += uColor * fresnel * 0.5;
        col += grain;
        col *= flicker;

        // Holographic edge highlight
        col += vec3(1.0) * pow(fresnel, 4.0) * 0.3;

        float alpha = uOpacity * (0.5 + 0.5 * scanline) * flicker;
        alpha = clamp(alpha, 0.0, 1.0);

        gl_FragColor = vec4(col, alpha);
      }
    `,transparent:!0,side:e.doubleSide!==!1?Ve:Do,depthWrite:!1,blending:ot})}class as extends Fn{constructor(e=.5,o=2.2,n=8){super(),this.radius=e,this.height=o,this.turns=n}getPoint(e,o=new E){const n=o,i=e*Math.PI*2*this.turns,s=Math.cos(i)*this.radius,t=e*this.height,r=Math.sin(i)*this.radius;return n.set(s,t,r)}}function ss(a,e,o){const n=new J;n.name="PhysicsStation";const i=to("physics");n.position.copy(i),a.add(n);const s={voltage:{value:.65}},t=new B({color:qt,roughness:.92,metalness:0}),r=new xe({color:jt,metalness:.94,roughness:.22,clearcoat:.6}),u=new B({color:xo,roughness:.88,metalness:.1}),p=new D(2.8,3.1,.7,64),h=new l(p,t);h.position.y=.35,h.castShadow=!0,h.receiveShadow=!0,n.add(h);const d=new l(new at(2.68,.04,8,64),u);d.position.y=.68,d.rotation.x=Math.PI/2,n.add(d);const m=new D(2.6,2.6,.05,64),v=new l(m,t);v.position.y=.725,v.receiveShadow=!0,n.add(v);const S=new It(2.1,2.22,64);S.rotateX(-Math.PI/2);const y=new xe({color:4386,emissive:vo,emissiveIntensity:2.2,roughness:.2}),f=new l(S,y);f.position.y=.751,n.add(f);const c=new xe({color:14253112,metalness:.96,roughness:.18,clearcoat:.8,clearcoatRoughness:.1}),P=new B({color:qt,roughness:.92,metalness:0});[new E(0,.74,-1.5),new E(0,.74,1.5)].forEach(oe=>{const Ge=new l(new D(.55,.65,.5,32),P);Ge.position.set(oe.x,oe.y+.25,oe.z),Ge.castShadow=!0,n.add(Ge);const Ue=new l(new D(.32,.32,2.3,32),t);Ue.position.set(oe.x,oe.y+1.6,oe.z),Ue.castShadow=!0,n.add(Ue);const Ie=new as(.48,2.1,10),He=new Ut(Ie,240,.04,16,!1),$e=new l(He,c);$e.position.set(oe.x,oe.y+.52,oe.z),$e.castShadow=!0,n.add($e);const tt=new l(new at(.55,.18,24,48),c);tt.rotation.x=Math.PI/2,tt.position.set(oe.x,oe.y+2.7,oe.z),tt.castShadow=!0,n.add(tt)});const I=2.4,H=1.15,x=new E(0,I,0),R=.18,w=1.11,C=new J;C.name="PlasmaGlobeAssembly",n.add(C);const g=new B({color:1447968,roughness:.55,metalness:.15}),A=new l(new D(.045,.055,.72,24),g);A.position.set(0,.75+.36,0),A.castShadow=!0,C.add(A);const _=new l(new D(.065,.065,.06,24),r);_.position.set(0,I-R-.03,0),C.add(_);const V=new xe({color:1316898,roughness:.38,metalness:.75,clearcoat:.3}),Z=new l(new qe(R,32,32),V);Z.position.copy(x),Z.renderOrder=2,C.add(Z);const ee=ns(e),q=new l(new qe(R*1.15,32,32),ee);q.position.copy(x),q.renderOrder=3,C.add(q);const re=ts(e),X=new l(new qe(H*.99,48,48),re);X.position.copy(x),X.renderOrder=4,C.add(X);const O=18,L=32,te=[];for(let oe=0;oe<O;oe++){const Ge=oe===0,Ue=oe>=12,Ie=Ue?oe%6:null;te.push({id:oe,isPrimary:Ge,isBranch:Ue,parentId:Ie,branchT:.65+Math.random()*.2,theta:Ge?1:Math.random()*Math.PI*.6+.35,phi:Ge?0:Math.random()*Math.PI*2,convectionSpeed:.08+Math.random()*.14,seed:Math.random()*500,targetPos:new E,active:!0,intensity:1})}const se=L*2,Se=O*se,N=new Float32Array(Se*3),b=new Float32Array(Se*3),z=new Float32Array(Se),F=new Float32Array(Se),k=new Float32Array(Se),T=[];for(let oe=0;oe<O;oe++){const Ge=oe*se;for(let Ue=0;Ue<L;Ue++){const Ie=Ge+Ue*2,He=Ie+1,$e=Ue/(L-1);if(z[Ie]=-1,z[He]=1,F[Ie]=$e,F[He]=$e,k[Ie]=oe,k[He]=oe,Ue<L-1){const tt=Ie,dt=He,Qe=Ie+2,ht=He+2;T.push(tt,dt,Qe),T.push(dt,ht,Qe)}}}for(let oe=0;oe<Se;oe++)b[oe*3]=0,b[oe*3+1]=1,b[oe*3+2]=0;const le=new kt;le.setAttribute("position",new Gt(N,3)),le.setAttribute("aTangent",new Gt(b,3)),le.setAttribute("aSide",new Gt(z,1)),le.setAttribute("aProgress",new Gt(F,1)),le.setAttribute("aFilamentId",new Gt(k,1)),le.setIndex(T);const{material:Y,uniforms:j}=es(e,{voltage:s.voltage.value,width:.042}),Te=new l(le,Y);Te.renderOrder=15,C.add(Te);const Oe=14,ne=new zo(.08,16),we=os(e),Me=[];for(let oe=0;oe<Oe;oe++){const Ge=new l(ne,we);Ge.renderOrder=18,C.add(Ge),Me.push(Ge)}const me=new Zt(58879,2.5,7.5,1.8);me.position.copy(x),C.add(me);const Pe=new xe({color:15463935,transparent:!0,opacity:.18,roughness:.03,metalness:.05,clearcoat:1,clearcoatRoughness:.02,reflectivity:.95,depthWrite:!1}),$=new l(new qe(H,64,64),Pe);$.position.copy(x),$.renderOrder=30,C.add($);const pe=new J;pe.position.set(0,4.6,0);const ue=new at(2.2,.16,24,64);ue.rotateX(Math.PI/2);const be=new xe({color:2238004,metalness:.9,roughness:.25,clearcoat:.4}),ye=new l(ue,be);pe.add(ye);const Fe=[];for(let oe=0;oe<8;oe++){const Ge=oe/8*Math.PI*2,Ue=new l(new qe(.05,16,16),new xe({color:58879,emissive:58879,emissiveIntensity:2.5}));Ue.position.set(Math.cos(Ge)*2.2,0,Math.sin(Ge)*2.2),pe.add(Ue),Fe.push(Ue)}for(let oe=0;oe<3;oe++){const Ge=oe/3*Math.PI*2+.5,Ue=new l(new D(.03,.03,1.8,16),be);Ue.position.set(Math.cos(Ge)*2.2,.9,Math.sin(Ge)*2.2),pe.add(Ue)}n.add(pe);function ke(oe,Ge,Ue,Ie){const He=Math.sin(oe*4.2+Ie*3.8)*Math.cos(Ge*3.6-Ie*3.2),$e=Math.sin(Ue*4.8+Ie*4.4)*Math.cos(oe*5.1+Ie*2.9)*.5,tt=Math.sin((oe+Ge+Ue)*12+Ie*18)*.25;return He+$e+tt}const ge=new Jt,Be=new Ne,Re=new E,ze=new E;let De=!1;const K=[];for(let oe=0;oe<O;oe++){const Ge=[];for(let Ue=0;Ue<L;Ue++)Ge.push(new E);K.push(Ge)}const de=(oe,Ge,Ue)=>{const Ie=s.voltage.value,He=Ue||e;if(j.uVoltage.value=Ie,ee.uniforms.uVoltage.value=Ie,re.uniforms.uVoltage.value=Ie,we.uniforms.uVoltage.value=Ie,$.getWorldPosition(Re),o&&He.uPointer){Be.copy(He.uPointer.value),ge.setFromCamera(Be,o);const W=ge.ray,Q=Re.clone().sub(W.origin).dot(W.direction),ce=W.origin.clone().addScaledVector(W.direction,Q);if(ce.distanceTo(Re)<H*1.35&&Q>0){De=!0;const We=ce.clone().sub(Re).normalize();ze.copy(Re).addScaledVector(We,w)}else De=!1}const $e=Math.floor(6+Ie*(O-6));for(let W=0;W<O;W++){const U=te[W];if(U.active=W<$e,!!U.active)if(U.isPrimary)if(De){const Q=ze.clone().sub(Re);U.targetPos.lerp(Q,.22),U.intensity=1.6}else{const Q=new E(Math.sin(1.1)*Math.cos(oe*.4)*w,Math.cos(1.1)*w,Math.sin(1.1)*Math.sin(oe*.4)*w);U.targetPos.lerp(Q,.08),U.intensity=1}else if(U.isBranch){const Q=te[U.parentId];if(Q&&Q.active){const ce=U.id*1.3,ve=Q.targetPos.clone();ve.x+=Math.cos(ce)*.35,ve.z+=Math.sin(ce)*.35,ve.normalize().multiplyScalar(w),U.targetPos.copy(ve),U.intensity=Q.intensity*.75}}else U.theta-=U.convectionSpeed*Ge*(.8+Ie*.6),U.theta<.28&&(U.theta=1.9+Math.random()*.5,U.phi=Math.random()*Math.PI*2,U.seed=Math.random()*500,U.convectionSpeed=.08+Math.random()*.14),U.targetPos.set(Math.sin(U.theta)*Math.cos(U.phi)*w,Math.cos(U.theta)*w,Math.sin(U.theta)*Math.sin(U.phi)*w),U.intensity=1}const tt=le.attributes.position,dt=le.attributes.aTangent,Qe=tt.array,ht=dt.array,wt=oe*(1.2+Ie*1.5);for(let W=0;W<O;W++){const U=te[W],Q=W*se,ce=K[W];if(!U.active){for(let Ke=0;Ke<L;Ke++){const it=(Q+Ke*2)*3,St=it+3;Qe[it]=Qe[St]=0,Qe[it+1]=Qe[St+1]=I,Qe[it+2]=Qe[St+2]=0}continue}let ve;if(U.isBranch&&te[U.parentId]){const Ke=K[U.parentId],it=Math.floor(L*U.branchT);ve=Ke[it].clone().sub(new E(0,I,0))}else ve=U.targetPos.clone().normalize().multiplyScalar(R);const je=U.targetPos.clone().sub(ve),Et=je.length();je.normalize();let ut=new E(0,1,0);Math.abs(je.dot(ut))>.9&&(ut=new E(1,0,0));const ie=new E().crossVectors(je,ut).normalize(),xt=new E().crossVectors(je,ie).normalize();for(let Ke=0;Ke<L;Ke++){const it=Ke/(L-1),St=Math.sin(it*Math.PI),vt=ve.clone().addScaledVector(je,it*Et),Bt=.16*St*(1-it*.25)*(.8+Ie*.5);vt.y+=Bt;const gt=vt.clone().multiplyScalar(3.2),Lt=ke(gt.x+U.seed,gt.y,gt.z,wt)*.15*St,Mo=ke(gt.z,gt.x-U.seed,gt.y,wt+37)*.15*St,To=(Math.random()-.5)*.024*St*Ie,Co=(Math.random()-.5)*.024*St*Ie;vt.addScaledVector(ie,(Lt+To)*(.7+Ie*.5)),vt.addScaledVector(xt,(Mo+Co)*(.7+Ie*.5)),vt.length()>w&&vt.normalize().multiplyScalar(w),ce[Ke].set(vt.x,vt.y+I,vt.z)}for(let Ke=0;Ke<L;Ke++){const it=ce[Ke],St=Ke<L-1?ce[Ke+1]:it,vt=Ke>0?ce[Ke-1]:it,Bt=St.clone().sub(vt).normalize(),gt=(Q+Ke*2)*3,Lt=gt+3;Qe[gt]=Qe[Lt]=it.x,Qe[gt+1]=Qe[Lt+1]=it.y,Qe[gt+2]=Qe[Lt+2]=it.z,ht[gt]=ht[Lt]=Bt.x,ht[gt+1]=ht[Lt+1]=Bt.y,ht[gt+2]=ht[Lt+2]=Bt.z}}tt.needsUpdate=!0,dt.needsUpdate=!0;let ae=0;for(let W=0;W<O&&ae<Oe;W++){const U=te[W];if(!U.active)continue;const Q=Me[ae++];Q.visible=!0;const ce=U.targetPos.clone();Q.position.set(ce.x,ce.y+I,ce.z),Q.lookAt(0,I,0);const ve=(U.isPrimary&&De?1.5:.85)*(.8+Ie*.5);Q.scale.setScalar(ve)}for(let W=ae;W<Oe;W++)Me[W].visible=!1;const Le=1.6+Ie*2.8,G=.86+.14*Math.sin(oe*45)*Math.sin(oe*97);me.intensity=Le*G,pe.rotation.y=oe*.15;for(let W=0;W<Fe.length;W++){const U=oe*4+W*.8,Q=1+Math.sin(U)*1.5;Fe[W].material.emissiveIntensity=Math.max(.5,Q*Ie)}};return de(0,.016,e),{group:n,update:de,controls:s}}function rs(a,e,o){const n=new J;n.name="BiologyStation";const i=to("biology");n.position.copy(i),a.add(n);const s={organelleIsolation:{value:"all"}},t=[],r=new B({color:qt,roughness:.92,metalness:0}),u=new l(new D(2.6,2.9,.6,64),r);u.position.y=.3,u.castShadow=!0,u.receiveShadow=!0,n.add(u);const p=new at(2.7,.04,16,64);p.rotateX(Math.PI/2);const h=new l(p,new xe({color:8721,emissive:new he(65416),emissiveIntensity:2.2}));h.position.y=.05,n.add(h);const d=new J;d.name="EukaryoticCellModel",d.position.set(0,2.15,0),n.add(d);const m=new D(.85,.95,.18,48),v=new l(m,r);v.position.set(0,.65,0),n.add(v);const S=new l(new It(.65,.82,48),new xe({color:58879,emissive:new he(58879),emissiveIntensity:2.2,side:Ve}));S.rotateX(-Math.PI/2),S.position.set(0,.742,0),n.add(S);const y=new D(1,.75,1.4,32,1,!0),f=new _e({color:58879,transparent:!0,opacity:.08,side:Ve,blending:ot,depthWrite:!1}),c=new l(y,f);c.position.set(0,1.45,0),n.add(c);const P=new Zt(58879,1.5,3.5,1.8);P.position.set(0,1,0),n.add(P);const M=new J;M.name="Organelle_Membrane",d.add(M);const I=Math.PI*1.55,H=new xe({color:165063,roughness:.22,metalness:.04,transmission:.45,thickness:.35,ior:1.35,sheen:.85,sheenColor:new he(8246268),clearcoat:.7,side:Ve}),x=new xe({color:223649,roughness:.3,metalness:.02,transmission:.3,side:Ve}),R=1.2,w=1.13,C=new l(new qe(R,64,48,0,I),H);M.add(C);const g=new l(new qe(w,64,48,0,I),x);M.add(g),new At(R-w,2,1,32),new xe({color:16317180,roughness:.25,metalness:.05,side:Ve});const A=85,_=new qe(.045,12,12);_.scale(1,1.8,1);const V=new xe({color:3718648,roughness:.3,sheen:.6}),Z=new No(_,V,A),ee=new jo;let q=0;for(let G=0;G<A*2&&q<A;G++){const W=Math.acos(2*Math.random()-1),U=Math.random()*I,Q=R*Math.sin(W)*Math.cos(U),ce=R*Math.cos(W),ve=R*Math.sin(W)*Math.sin(U);ee.position.set(Q,ce,ve),ee.lookAt(Q*2,ce*2,ve*2),ee.scale.setScalar(.7+Math.random()*.5),ee.updateMatrix(),Z.setMatrixAt(q++,ee.matrix)}Z.instanceMatrix.needsUpdate=!0,M.add(Z);const re=new xe({color:165063,transmission:.88,roughness:.15,ior:1.33,transparent:!0,opacity:.22,side:Ve,depthWrite:!1}),X=new l(new qe(w-.01,36,24,0,I),re);M.add(X);const O=new J;O.name="Organelle_Nucleus";const L=new E(-.1,.05,.02);O.position.copy(L),d.add(O);const te=.46,se=new xe({color:8141549,emissive:new he(4988309),emissiveIntensity:.25,roughness:.35,metalness:.05,sheen:.9,sheenColor:new he(12616956),side:Ve}),Se=new l(new qe(te,48,36,0,I),se);O.add(Se);const N=new xe({color:3868516,roughness:.5,side:_o}),b=new l(new qe(te-.02,36,24,0,I),N);O.add(b);const z=new at(.022,.007,8,16),F=new xe({color:14202110,roughness:.2,emissive:new he(11032055),emissiveIntensity:.4});for(let G=0;G<36;G++){const W=.3+Math.random()*(Math.PI-.6),U=Math.random()*I,Q=te*Math.sin(W)*Math.cos(U),ce=te*Math.cos(W),ve=te*Math.sin(W)*Math.sin(U),We=new l(z,F);We.position.set(Q,ce,ve),We.lookAt(Q*2,ce*2,ve*2),O.add(We)}const k=new qe(.18,32,32),T=new xe({color:16096779,emissive:new he(14251782),emissiveIntensity:.65,roughness:.4,clearcoat:.5}),le=new l(k,T);O.add(le);const Y=new xe({color:15485081,roughness:.4,sheen:.7});for(let G=0;G<4;G++){const W=[],U=.24+G*.04;for(let ve=0;ve<16;ve++){const We=ve/16*Math.PI*2;W.push(new E(Math.sin(We*2.5)*U,Math.cos(We*3.2)*(U*.75),Math.sin(We*1.8)*U))}const Q=new so(W,!0),ce=new l(new Ut(Q,36,.012,8,!0),Y);O.add(ce)}const j=new J;j.name="Organelle_RER",d.add(j);const Te=new xe({color:16007006,emissive:new he(10424889),emissiveIntensity:.2,roughness:.35,sheen:.75,sheenColor:new he(16698835),side:Ve}),Oe=4,ne=[];for(let G=0;G<Oe;G++){const W=.58+G*.09,U=Math.PI*.95,Q=Math.PI*.55,ce=[],ve=32;for(let ut=0;ut<=ve;ut++){const ie=ut/ve,xt=Q+ie*U,Ke=Math.sin(ie*Math.PI*4)*.045,it=(W+Ke)*Math.cos(xt),St=(W+Ke)*Math.sin(xt),vt=(ie-.5)*.5;ce.push(new E(it,vt,St).add(L))}const We=new so(ce),je=new Ut(We,32,.038,12,!1),Et=new l(je,Te);j.add(Et);for(let ut=1;ut<ve;ut+=2){const ie=ce[ut];for(let xt=0;xt<3;xt++)ne.push(new E(ie.x+(Math.random()-.5)*.05,ie.y+(xt-1)*.035,ie.z+(Math.random()-.5)*.05))}}const we=ne.length,Me=new qe(.013,8,8),me=new xe({color:14742270,emissive:new he(3718648),emissiveIntensity:.6,roughness:.25}),Pe=new No(Me,me,we);ne.forEach((G,W)=>{ee.position.copy(G),ee.scale.setScalar(1),ee.updateMatrix(),Pe.setMatrixAt(W,ee.matrix)}),Pe.instanceMatrix.needsUpdate=!0,j.add(Pe);const $=new J;$.name="Organelle_SER",d.add($);const pe=new xe({color:16486972,emissive:new he(12730636),emissiveIntensity:.2,roughness:.25,clearcoat:.6});[[new E(-.6,-.1,.4),new E(-.75,-.05,.55),new E(-.9,-.15,.45)],[new E(-.75,-.05,.55),new E(-.7,.15,.65),new E(-.85,.25,.55)],[new E(-.6,-.25,.2),new E(-.8,-.35,.3),new E(-.7,-.45,.15)],[new E(-.7,.15,.65),new E(-.6,.35,.55),new E(-.5,.45,.4)]].forEach(G=>{const W=new so(G),U=new Ut(W,16,.024,10,!1),Q=new l(U,pe);$.add(Q)});const be=new J;be.name="Organelle_Golgi",be.position.set(.48,.12,.32),be.rotation.set(-.25,.4,.2),d.add(be);const ye=new xe({color:15381256,emissive:new he(10576391),emissiveIntensity:.25,roughness:.2,transmission:.25,clearcoat:.85,sheen:.8,side:Ve});for(let G=0;G<6;G++){const W=Math.PI*.75,U=.22+G*.035,Q=new at(U,.025,12,36,W);Q.scale(1,.45,1);const ce=new l(Q,ye);ce.position.y=(G-2.5)*.045,ce.rotation.x=Math.PI/2,be.add(ce)}const Fe=new xe({color:16638023,roughness:.15,transmission:.4,clearcoat:.9,emissive:new he(13273604),emissiveIntensity:.4}),ke=[];for(let G=0;G<16;G++){const W=.028+Math.random()*.025,U=new l(new qe(W,16,16),Fe);U.position.set((Math.random()-.5)*.35+.15,(Math.random()-.5)*.35,(Math.random()-.5)*.35+.12),U.userData={initialPos:U.position.clone(),speed:1.5+Math.random()*2},be.add(U),ke.push(U)}const ge=new J;ge.name="Organelle_Mitochondria",d.add(ge);const Be=new xe({color:366185,roughness:.3,metalness:.05,clearcoat:.6,side:Ve}),Re=new xe({color:3462041,emissive:new he(1096065),emissiveIntensity:.65,roughness:.25,side:Ve});function ze(){const G=new J,W=new Mi(.11,.28,16,16),U=new l(W,Be);G.add(U);const Q=6;for(let ce=0;ce<Q;ce++){const ve=(ce-(Q-1)/2)*.055,We=.14*(1-Math.abs(ve)*1.5),je=new Ee(We,.012,.16);je.rotateZ((ce%2===0?1:-1)*.2);const Et=new l(je,Re);Et.position.set(ce%2===0?.02:-.02,ve,.04),G.add(Et)}return G}[{pos:new E(-.55,-.28,.45),rot:new wo(.4,.8,-.3)},{pos:new E(.4,-.42,-.35),rot:new wo(-.6,-.4,.9)},{pos:new E(-.48,.45,-.38),rot:new wo(.8,-.5,.3)},{pos:new E(.52,.4,.22),rot:new wo(-.3,1.1,-.6)}].forEach(G=>{const W=ze();W.position.copy(G.pos),W.rotation.copy(G.rot),ge.add(W)});const K=new J;K.name="Organelle_Centrioles",K.position.set(-.25,.48,.12),d.add(K);const de=new xe({color:14251782,metalness:.45,roughness:.25,clearcoat:.5});function oe(){const G=new J;for(let W=0;W<9;W++){const U=W/9*Math.PI*2,Q=Math.cos(U)*.055,ce=Math.sin(U)*.055,ve=new D(.012,.012,.22,8),We=new l(ve,de);We.position.set(Q,0,ce),G.add(We)}return G}const Ge=oe();K.add(Ge);const Ue=oe();Ue.rotation.z=Math.PI/2,Ue.position.set(.08,.08,.02),K.add(Ue);const Ie=new J;Ie.name="Organelle_Vesicles",d.add(Ie);const He=new xe({color:2450411,emissive:new he(1920728),emissiveIntensity:.35,roughness:.25,transmission:.35,clearcoat:.8}),$e=new xe({color:6514417,emissive:new he(4405450),emissiveIntensity:.3,roughness:.3});[new E(.25,-.35,.45),new E(-.35,-.45,-.25),new E(.65,.15,-.3),new E(-.15,.35,-.55),new E(.35,.55,-.15)].forEach(G=>{const W=new l(new qe(.062,16,16),He);W.position.copy(G),Ie.add(W)}),[new E(.45,-.15,.55),new E(-.45,.25,.35),new E(.15,-.55,-.15),new E(-.55,-.15,-.45),new E(.55,.3,.45)].forEach(G=>{const W=new l(new qe(.052,16,16),$e);W.position.copy(G);const U=new l(new qe(.022,8,8),new _e({color:1973067}));W.add(U),Ie.add(W)});const Qe=new J;Qe.name="Organelle_Cytoskeleton",d.add(Qe);const ht=new _e({color:3718648,transparent:!0,opacity:.65});for(let G=0;G<12;G++){const W=Math.random()*Math.PI,U=Math.random()*I,Q=new E(w*Math.sin(W)*Math.cos(U)*.92,w*Math.cos(W)*.92,w*Math.sin(W)*Math.sin(U)*.92),ce=K.position.clone().lerp(Q,.5).add(new E((Math.random()-.5)*.2,(Math.random()-.5)*.2,(Math.random()-.5)*.2)),ve=new so([K.position.clone(),ce,Q]),We=new Ut(ve,20,.006,6,!1),je=new l(We,ht);Qe.add(je)}function wt(){let G=document.getElementById("vz-sgu-modal");if(!G){G=document.createElement("div"),G.id="vz-sgu-modal",G.style.cssText=`
        position: fixed;
        inset: 0;
        z-index: 99999;
        background: rgba(4, 10, 24, 0.90);
        backdrop-filter: blur(14px);
        display: flex;
        flex-direction: column;
        animation: vzFadeIn 0.25s ease;
        font-family: 'Inter', -apple-system, sans-serif;
      `,G.innerHTML=`
        <div style="display:flex; justify-content:space-between; align-items:center; padding:16px 24px; background:rgba(6, 14, 30, 0.96); border-bottom:1px solid rgba(0, 229, 255, 0.35);">
          <div>
            <div style="font-size:18px; font-weight:900; color:#ffffff; letter-spacing:0.5px; display:flex; align-items:center; gap:10px;">
              <span style="color:#00e5ff; font-size:22px;">🔬</span> THE CENTER FOR BIOMEDICAL VISUALIZATION AT SGU (@SGUMedArt)
            </div>
            <div style="font-size:13px; color:#94a3b8; margin-top:2px; font-family:monospace;">
              High-Resolution Eukaryotic Cell 3D Anatomical Atlas • 3.53M Polygons • St. George's University
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:16px;">
            <a href="https://sketchfab.com/3d-models/eukaryotic-cell-b7d84e5f2d5e411fbb195ab2742f2256" target="_blank" rel="noopener noreferrer" style="color:#38bdf8; font-size:13px; text-decoration:none; font-weight:700; padding:8px 14px; border:1px solid rgba(56, 189, 248, 0.4); border-radius:6px; background:rgba(56, 189, 248, 0.12);">
              View on Sketchfab ↗
            </a>
            <button id="vz-sgu-modal-close" style="background:#ef4444; color:#ffffff; border:none; border-radius:6px; padding:8px 18px; font-weight:800; font-size:13px; cursor:pointer; transition:background 0.2s;">
              ✕ CLOSE [ESC]
            </button>
          </div>
        </div>
        <div style="flex:1; position:relative; width:100%; height:100%; background:#000000;">
          <iframe title="Eukaryotic Cell - SGUMedArt" src="https://sketchfab.com/models/b7d84e5f2d5e411fbb195ab2742f2256/embed?autostart=1&ui_theme=dark&annotations_visible=1" style="width:100%; height:100%; border:none;" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share allowfullscreen></iframe>
        </div>
      `,oo().appendChild(G);const U=G.querySelector("#vz-sgu-modal-close"),Q=()=>{G.remove(),window.removeEventListener("keydown",ce)};U.addEventListener("click",Q);const ce=ve=>{ve.key==="Escape"&&Q()};window.addEventListener("keydown",ce)}}return{group:n,update:(G,W)=>{d.rotation.y=-1.2+G*.16;const U=1+Math.sin(G*1.5)*.012;d.scale.set(U,U,U),ke.forEach((ie,xt)=>{const Ke=ie.userData;ie.position.x=Ke.initialPos.x+Math.sin(G*Ke.speed+xt)*.018,ie.position.y=Ke.initialPos.y+Math.cos(G*Ke.speed*.8+xt)*.018});const Q=s.organelleIsolation.value,ce=Q==="all"||Q===0||!Q,ve=ce||Q==="nucleus"||Q===1,We=ce||Q==="mitochondria"||Q===2,je=ce||Q==="er"||Q===3,Et=ce||Q==="golgi"||Q===4,ut=ce||Q==="centrioles"||Q===5;M.visible=ce,O.visible=ve,ge.visible=We,j.visible=je,$.visible=je,be.visible=Et,K.visible=ut,Ie.visible=ce||Et,Qe.visible=ce||ut,Q==="nucleus"?(se.emissiveIntensity=.8,T.emissiveIntensity=1):(se.emissiveIntensity=.25,T.emissiveIntensity=.65),Q==="mitochondria"?Re.emissiveIntensity=1.2:Re.emissiveIntensity=.65,Q==="er"?(Te.emissiveIntensity=.7,me.emissiveIntensity=1.2):(Te.emissiveIntensity=.2,me.emissiveIntensity=.6),Q==="golgi"?ye.emissiveIntensity=.8:ye.emissiveIntensity=.25},controls:s,openSguModal:wt,interactiveTargets:t,destroy:()=>{}}}function ls(a,e){const o=new J;o.name="MathStation";const n=to("mathematics");o.position.copy(n),a.add(o);const i={displayMode:{value:"hypercube"},rotationSpeed:{value:1},morphSpeed:{value:1}},s=new B({color:qt,roughness:.92,metalness:0}),t=new xe({color:jt,metalness:.94,roughness:.22,clearcoat:.6}),r=new B({color:xo,roughness:.88,metalness:.1}),u=new l(new D(2.4,2.7,.7,64),s);u.position.y=.35,u.castShadow=!0,u.receiveShadow=!0,o.add(u);const p=new l(new at(2.38,.04,8,64),r);p.position.y=.69,p.rotation.x=Math.PI/2,o.add(p);const h=new l(new D(2.35,2.35,.08,64),t);h.position.y=.74,o.add(h);const d=new xe({color:6698,emissive:vo,emissiveIntensity:2.2,roughness:.15}),m=new l(new zo(1.9,64),d);m.rotateX(-Math.PI/2),m.position.y=.781,o.add(m);const v=new Ye(1.9,2.6,64,1,!0);v.translate(0,1.3,0);const S=new _e({color:58879,transparent:!0,opacity:.07,side:Ve,blending:ot,depthWrite:!1}),y=new l(v,S);y.position.y=.78,o.add(y);const f=[];for(let ne=0;ne<16;ne++)f.push([(ne&1?1:-1)*.72,(ne&2?1:-1)*.72,(ne&4?1:-1)*.72,(ne&8?1:-1)*.72]);const c=[];for(let ne=0;ne<16;ne++)for(let we=ne+1;we<16;we++){let Me=0;for(let me=0;me<4;me++)f[ne][me]!==f[we][me]&&Me++;Me===1&&c.push([ne,we])}const P=new Float32Array(c.length*2*3),M=new kt;M.setAttribute("position",new Gt(P,3));const I=new eo({color:61695,transparent:!0,opacity:.85,blending:ot,linewidth:2}),H=new Ti(M,I);H.position.set(0,2.3,0),o.add(H);const x=new qe(.045,16,16),R=new xe({color:58879,emissive:8146431,emissiveIntensity:2.5,roughness:.1}),w=new No(x,R,16);H.add(w);const C=2.4;function g(ne,we,Me){let[me,Pe,$,pe]=ne;const ue=Math.cos(we),be=Math.sin(we),ye=me*ue-pe*be,Fe=me*be+pe*ue,ke=Math.cos(Me),ge=Math.sin(Me),Be=Pe*ke-$*ge,Re=Pe*ge+$*ke,ze=1/(C-Fe);return{pos:new E(ye*ze*2.2,Be*ze*2.2,Re*ze*2.2),w:Fe}}const A=48,_=24,V=new kt,Z=(A+1)*(_+1),ee=new Float32Array(Z*3),q=new Float32Array(Z*2),re=[];function X(ne,we,Me=0){const me=we*Math.PI,Pe=ne*Math.PI*2,$=Math.sin(Me*.8)*.5+.5,pe=Math.pow(Math.sin(me),2)*Math.cos(me)*Math.cos(2*Pe),ue=Math.pow(Math.sin(me),3)*Math.cos(me)*Math.cos(3*Pe),be=(1-$)*pe+$*ue,ye=.52+Math.abs(be)*1.15,Fe=ye*Math.sin(me)*Math.cos(Pe),ke=ye*Math.cos(me),ge=ye*Math.sin(me)*Math.sin(Pe);return new E(Fe,ke,ge)}let O=0,L=0;for(let ne=0;ne<=_;ne++){const we=ne/_;for(let Me=0;Me<=A;Me++){const me=Me/A,Pe=X(me,we,0);ee[O]=Pe.x,ee[O+1]=Pe.y,ee[O+2]=Pe.z,q[L]=me,q[L+1]=we,O+=3,L+=2}}for(let ne=0;ne<_;ne++)for(let we=0;we<A;we++){const Me=ne*(A+1)+we,me=(ne+1)*(A+1)+we,Pe=(ne+1)*(A+1)+(we+1),$=ne*(A+1)+(we+1);re.push(Me,me,$),re.push(me,Pe,$)}V.setIndex(re),V.setAttribute("position",new Gt(ee,3)),V.setAttribute("uv",new Gt(q,2)),V.computeVertexNormals();const te=is(e,{color:8146431,opacity:.65,scanlineSpeed:1.8,scanlineDensity:60}),se=new l(V,te);se.position.set(0,2.3,0),se.scale.setScalar(.85),o.add(se);const Se=new _e({color:11766015,wireframe:!0,transparent:!0,opacity:.22}),N=new l(V,Se);se.add(N);const b=48,z=new Ye(.03,.1,8);z.rotateX(Math.PI/2);const F=new xe({color:16770560,emissive:16752640,emissiveIntensity:1.8,roughness:.2}),k=new No(z,F,b);k.instanceMatrix.setUsage(Ci),se.add(k);const T=new jo,le=[];for(let ne=0;ne<b;ne++)le.push({u:Math.random(),v:.1+Math.random()*.8,speed:.15+Math.random()*.25,phase:Math.random()*Math.PI*2});const Y=["∇²ψ + k²ψ = 0","V_4 = ½π²r⁴  (Tesseract)","Y_l^m(θ, φ) = N e^{imφ} P_l^m","χ = V - E + F - C = 0"],j=[];Y.forEach((ne,we)=>{const Me=document.createElement("canvas");Me.width=512,Me.height=128;const me=Me.getContext("2d");me.clearRect(0,0,Me.width,Me.height),me.font='italic 32px "Times New Roman", Times, serif',me.fillStyle="#00f0ff",me.shadowColor="#00e5ff",me.shadowBlur=10,me.textAlign="center",me.textBaseline="middle",me.fillText(ne,256,64);const Pe=new Xe(Me);Pe.needsUpdate=!0;const $=new lo({map:Pe,transparent:!0,blending:ot,depthWrite:!1}),pe=new co($);pe.scale.set(1.4,.35,1);const ue=we/Y.length*Math.PI*2,be=1.75;pe.position.set(Math.cos(ue)*be,2.1+we%2*.45,Math.sin(ue)*be),o.add(pe),j.push({sprite:pe,angle:ue,baseY:pe.position.y})});const Te=new jo;return{group:o,update:(ne,we)=>{const Me=i.rotationSpeed.value,me=i.morphSpeed.value,Pe=ne*.65*Me,$=ne*.48*Me,pe=f.map(ge=>g(ge,Pe,$)),ue=M.attributes.position.array;let be=0;for(let ge=0;ge<c.length;ge++){const[Be,Re]=c[ge],ze=pe[Be].pos,De=pe[Re].pos;ue[be++]=ze.x,ue[be++]=ze.y,ue[be++]=ze.z,ue[be++]=De.x,ue[be++]=De.y,ue[be++]=De.z}M.attributes.position.needsUpdate=!0;for(let ge=0;ge<16;ge++){const Be=pe[ge].pos,Re=.8+pe[ge].w*.25;Te.position.copy(Be),Te.scale.setScalar(Math.max(Re,.4)),Te.updateMatrix(),w.setMatrixAt(ge,Te.matrix)}w.instanceMatrix.needsUpdate=!0;const ye=V.attributes.position.array;let Fe=0;for(let ge=0;ge<=_;ge++){const Be=ge/_;for(let Re=0;Re<=A;Re++){const ze=Re/A,De=X(ze,Be,ne*me);ye[Fe++]=De.x,ye[Fe++]=De.y,ye[Fe++]=De.z}}V.attributes.position.needsUpdate=!0,V.computeVertexNormals(),se.rotation.y=ne*.15,le.forEach((ge,Be)=>{const Re=(ge.u+ne*ge.speed)%1,ze=X(Re,ge.v,ne*me),K=X((Re+.02)%1,ge.v,ne*me).clone().sub(ze).normalize();T.position.copy(ze),T.quaternion.setFromUnitVectors(new E(0,0,1),K),T.scale.setScalar(.6+Math.sin(ne*3+ge.phase)*.18),T.updateMatrix(),k.setMatrixAt(Be,T.matrix)}),k.instanceMatrix.needsUpdate=!0,j.forEach((ge,Be)=>{const Re=ge.angle+ne*.12;ge.sprite.position.x=Math.cos(Re)*1.75,ge.sprite.position.z=Math.sin(Re)*1.75,ge.sprite.position.y=ge.baseY+Math.sin(ne*1.5+Be)*.05});const ke=i.displayMode.value;ke==="hypercube"?(H.visible=!0,se.visible=!1):ke==="harmonic"?(H.visible=!1,se.visible=!0):(H.visible=!0,se.visible=!0)},controls:i}}const cs=[{title:"PILLARS OF CREATION",sub:"MESSIER 16 // EAGLE NEBULA",category:"EMISSION NEBULA & STAR NURSERY",image:"/astronomy/nebula_pillars.jpg",type:"Ionized Hydrogen (H II) & Molecular Gas Columns",dist:"6,500 Light-Years",sector:"Serpens // Sagittarius Arm",instrument:"JWST NIRCam & Hubble WFC3",facts:"Towering interstellar dust columns 4-5 light-years tall harboring active protostellar Evaporating Gaseous Globules (EGGs). Infrared imaging penetrates obscuring dust to reveal newborn star clusters.",accentColor:"#00e5ff",accentHex:58879},{title:"VOYAGER 1 PROBE",sub:"NASA JPL // INTERSTELLAR MISSION",category:"DEEP-SPACE INTERSTELLAR EXPLORER",image:"/astronomy/voyager1_interstellar.jpg",type:"Interstellar Boundary & Plasma Wave Explorer",dist:"163.8 AU (24.5 Billion km)",sector:"Heliosheath Outer Boundary // Ophiuchus",instrument:"Cosmic Ray Subsystem // Golden Record",facts:"First human-made spacecraft to cross the Heliopause into interstellar space (Aug 2012). Traveling at 17 km/s (38,000 mph) carrying the Golden Record message for distant civilizations.",accentColor:"#f59e0b",accentHex:16096779},{title:"ANDROMEDA GALAXY",sub:"MESSIER 31 // NGC 224",category:"MAJOR LOCAL GROUP SPIRAL GALAXY",image:"/astronomy/galaxy_andromeda.jpg",type:"Barred Spiral Galaxy (SA(s)b)",dist:"2.537 Million Light-Years",sector:"Andromeda Constellation",instrument:"Hubble Space Telescope HD Mosaic",facts:"Nearest major spiral galaxy to the Milky Way, spanning 220,000 light-years and containing over one trillion stars. Approaching our galaxy at 110 km/s on a cosmic merger trajectory.",accentColor:"#c084fc",accentHex:12616956},{title:"CARINA NEBULA",sub:"NGC 3372 // COSMIC CLIFFS",category:"DIFFUSE GIANT STAR-FORMING NURSERY",image:"/astronomy/nebula_carina.jpg",type:"Massive Emission & Reflection Nebula Complex",dist:"7,600 Light-Years",sector:"Carina-Sagittarius Arm",instrument:"JWST NIRCam / MIRI Infrared Suite",facts:"Spectacular hyper-active star factory carved by intense ultraviolet radiation from monstrous O-type stars. The famous Cosmic Cliffs reveal embryonic stars emerging from dense molecular gas ridges.",accentColor:"#00e5ff",accentHex:58879},{title:"INTERNATIONAL SPACE STATION",sub:"ISS // LOW EARTH ORBIT OBSERVATORY",category:"CREWED MICROGRAVITY LABORATORY",image:"/astronomy/iss_orbit.jpg",type:"Permanently Crewed Orbital Research Platform",dist:"Orbital Altitude: 418 km",sector:"Low Earth Orbit (Thermosphere)",instrument:"8 Solar Wings (120 kW) // AMS-02",facts:"Spanning 108.5 meters with a mass of 450,000 kg, the ISS has maintained continuous human presence in space since Nov 2000, orbiting Earth every 92 minutes at 27,600 km/h (7.66 km/s).",accentColor:"#fbbf24",accentHex:16498468},{title:"WHIRLPOOL GALAXY",sub:"MESSIER 51a // NGC 5194",category:"GRAND-DESIGN INTERACTING SPIRAL",image:"/astronomy/galaxy_whirlpool.jpg",type:"Grand-Design Spiral Galaxy with Companion",dist:"23 Million Light-Years",sector:"Canes Venatici",instrument:"Hubble Space Telescope ACS",facts:"Archetypal grand-design spiral galaxy engaged in violent gravitational tidal interaction with dwarf companion NGC 5195, triggering intense shockwaves and burst star formation along spiral arms.",accentColor:"#c084fc",accentHex:12616956},{title:"CRAB NEBULA",sub:"MESSIER 1 // NGC 1952",category:"SUPERNOVA REMNANT & PULSAR WIND",image:"/astronomy/nebula_crab.jpg",type:"Synchrotron Radiation Filamentary Remnant",dist:"6,500 Light-Years",sector:"Taurus Constellation",instrument:"Hubble / Chandra X-Ray Observatory",facts:"Expanding debris field from historic core-collapse supernova witnessed in 1054 AD. Driven from within by a 30 Hz spinning neutron star emitting intense magnetic synchrotron radiation.",accentColor:"#00e5ff",accentHex:58879},{title:"ISS OVER PLANET EARTH",sub:"ISS // HIGH-INCLINATION OVERFLIGHT",category:"EARTH OBSERVATION FROM THERMOSPHERE",image:"/astronomy/iss_earth.jpg",type:"Orbital Inclination: 51.64 Degrees",dist:"Velocity: 7.66 km/s (17,100 mph)",sector:"Circum-Terrestrial Low Orbit",instrument:"Cupola 7-Window Observation Bay",facts:"Completing 15.5 full orbits around Earth each day, astronauts aboard the ISS witness 16 sunrises and sunsets every 24 hours while capturing environmental climate telemetry.",accentColor:"#38bdf8",accentHex:3718648},{title:"SOMBRERO GALAXY",sub:"MESSIER 104 // NGC 4594",category:"HYBRID SPIRAL / LENTICULAR GALAXY",image:"/astronomy/galaxy_sombrero.jpg",type:"Unbarred Spiral with Enormous Central Bulge",dist:"29.3 Million Light-Years",sector:"Virgo / Corvus Border",instrument:"Hubble Space Telescope & Spitzer",facts:"Distinguished by its brilliant white central bulbous core and prominent symmetric dark dust lane. Anchored by an ultra-massive central black hole exceeding one billion solar masses.",accentColor:"#c084fc",accentHex:12616956}];function ds(a,e){const o=new J;o.name="AstronomyCurvedHolographicScreenGroup",a.add(o);const n=[],i=cs,s=to("astronomy"),t=new E(-s.x,0,-s.z).normalize(),r=t.clone().negate(),u=Math.atan2(t.x,t.z),p=4.4,h=1.65,d=2.65,m=r.clone().multiplyScalar(2.6),v=2.05,S=8.85,y=new J;y.name="AstroSingleCurvedScreenConsole",y.position.set(m.x,0,m.z),y.rotation.y=u,o.add(y);const f=document.createElement("canvas");f.width=1920,f.height=1080;const c=f.getContext("2d"),P=new Xe(f);P.minFilter=Rt,P.magFilter=Rt,P.generateMipmaps=!1;const M=[];i.forEach($=>{const pe=new Image;pe.crossOrigin="anonymous",pe.src=$.image,pe.onload=()=>{A()},M.push(pe)});let I=0,H=0,x=1,R=0,w=!1;const C=2.5,g=.55;function A(){c.clearRect(0,0,1920,1080);const $=x>.5?i[H]:i[I],pe=(x>.5?H:I)+1,ue=$.accentColor;c.fillStyle="rgba(4, 8, 18, 0.96)",c.fillRect(0,0,1920,1080),c.strokeStyle="rgba(0, 229, 255, 0.04)",c.lineWidth=1;for(let He=80;He<1920;He+=160)c.beginPath(),c.moveTo(He,0),c.lineTo(He,1080),c.stroke();function be(He,$e){if(He<0||He>=M.length)return;const tt=M[He];if(!tt||!tt.complete||tt.naturalWidth===0)return;c.save(),c.globalAlpha=Math.max(0,Math.min(1,$e))*.95;const dt=1920/1080,Qe=tt.naturalWidth/tt.naturalHeight;let ht,wt,ae,Le;Qe>dt?(wt=1080,ht=1080*Qe,ae=(1920-ht)/2,Le=0):(ht=1920,wt=1920/Qe,ae=0,Le=(1080-wt)/2),c.drawImage(tt,ae,Le,ht,wt);const G=c.createRadialGradient(960,540,280,960,540,960);G.addColorStop(0,"rgba(4, 8, 18, 0.0)"),G.addColorStop(.6,"rgba(4, 8, 18, 0.30)"),G.addColorStop(1,"rgba(4, 8, 18, 0.92)"),c.fillStyle=G,c.fillRect(0,0,1920,1080),c.restore()}x>=1?be(I,1):(be(I,1-x),be(H,x)),c.strokeStyle="rgba(255, 255, 255, 0.15)",c.lineWidth=1.5,c.beginPath(),c.moveTo(960,80),c.lineTo(960,140),c.moveTo(960,920),c.lineTo(960,980),c.moveTo(840,540),c.lineTo(900,540),c.moveTo(1020,540),c.lineTo(1080,540),c.stroke(),c.fillStyle="rgba(6, 12, 26, 0.94)",c.fillRect(0,0,1920,68),c.fillStyle=ue,c.fillRect(0,0,1920,5),c.font='900 22px "Inter", monospace',c.fillStyle=ue,c.textAlign="left",c.textBaseline="middle",c.fillText(`★ NASA / ESA / JWST ASTRONOMY ATLAS // ${$.category}`,50,36),c.textAlign="right",c.font='bold 22px "Inter", monospace',c.fillStyle=w?"#f59e0b":"rgba(255, 255, 255, 0.90)",c.fillText(w?"[ ⏸ STREAM PAUSED ]":`[ LIVE STREAM // SLIDE ${String(pe).padStart(2,"0")} / 09  •  2.5s DYNAMIC CYCLE ]`,1870,36);const ye=120,Fe=820,ke=570;c.fillStyle="rgba(6, 12, 26, 0.94)",c.fillRect(50,ye,ke,Fe),c.strokeStyle=ue,c.lineWidth=2.5,c.strokeRect(50,ye,ke,Fe),Pn(c,50,ye,ke,Fe,ue),c.textAlign="left",c.font='900 50px "Inter", "Segoe UI", sans-serif',c.fillStyle="#ffffff",c.fillText($.title,80,ye+68),c.font='900 24px "Inter", monospace',c.fillStyle=ue,c.fillText($.sub,80,ye+116),c.strokeStyle="rgba(255, 255, 255, 0.20)",c.lineWidth=2,c.beginPath(),c.moveTo(80,ye+145),c.lineTo(50+ke-30,ye+145),c.stroke();const ge=80;let Be=ye+195;const Re=88;[{label:"CLASSIFICATION:",val:$.type,color:"#f1f5f9"},{label:"DISTANCE / RANGE:",val:$.dist,color:"#38bdf8"},{label:"CONSTELLATION / SECTOR:",val:$.sector,color:"#c084fc"},{label:"OBSERVATION INSTRUMENT:",val:$.instrument,color:"#fbbf24"}].forEach(He=>{c.font='900 18px "Inter", monospace',c.fillStyle="#94a3b8",c.fillText(He.label,ge,Be),c.font='900 26px "Inter", "Segoe UI", sans-serif',c.fillStyle=He.color,Rn(c,He.val,ge,Be+34,ke-60,32),Be+=Re+28});const De=1300,K=570;c.fillStyle="rgba(6, 12, 26, 0.94)",c.fillRect(De,ye,K,Fe),c.strokeStyle=ue,c.lineWidth=2.5,c.strokeRect(De,ye,K,Fe),Pn(c,De,ye,K,ue),c.font='900 24px "Inter", monospace',c.fillStyle=ue,c.fillText("MISSION & ASTROPHYSICAL SUMMARY",De+35,ye+60),c.strokeStyle="rgba(255, 255, 255, 0.20)",c.lineWidth=2,c.beginPath(),c.moveTo(De+35,ye+90),c.lineTo(De+K-35,ye+90),c.stroke(),c.font='bold 24px "Inter", "Segoe UI", sans-serif',c.fillStyle="#f8fafc",Rn(c,$.facts,De+35,ye+140,K-70,38);const de=ye+490;c.fillStyle="rgba(8, 16, 34, 0.95)",c.fillRect(De+35,de,K-70,280),c.strokeStyle="rgba(255, 255, 255, 0.18)",c.lineWidth=1.5,c.strokeRect(De+35,de,K-70,280),c.font='900 20px "Inter", monospace',c.fillStyle="#38bdf8",c.fillText("OPTICAL PAYLOAD TELEMETRY:",De+60,de+45),c.font='bold 20px "Inter", monospace',c.fillStyle="#cbd5e1",c.fillText("• QUANTUM SENSOR EFFICIENCY: 99.4%",De+60,de+95),c.fillText("• ATMOSPHERIC EXTINCTION: ZERO (SPACE)",De+60,de+145),c.fillText("• MULTI-WAVELENGTH INFRARED: ACTIVE",De+60,de+195),c.fillText("• TIME-STEP REFRESH: 2.50 SECONDS",De+60,de+245);const oe=1015;c.fillStyle="rgba(5, 12, 26, 0.94)",c.fillRect(0,960,1920,120),c.strokeStyle="rgba(255, 255, 255, 0.20)",c.lineWidth=2,c.beginPath(),c.moveTo(0,960),c.lineTo(1920,960),c.stroke(),c.font='900 26px "Inter", monospace',c.fillStyle=ue,c.textAlign="left",c.fillText("◀ PREV SLIDE  (Click Left)",60,oe+15),c.textAlign="center",c.font='bold 20px "Inter", monospace',c.fillStyle=w?"#f59e0b":"rgba(255, 255, 255, 0.85)",c.fillText(w?"[ ⏸ STREAM PAUSED — CLICK TO RESUME ]":"[ CLICK CENTER TO PAUSE / RESUME ]",960,oe-8);const Ge=i.length,Ue=36,Ie=960-(Ge-1)*Ue/2;for(let He=0;He<Ge;He++){const $e=Ie+He*Ue;c.beginPath(),c.arc($e,oe+26,He===pe-1?8:4.5,0,Math.PI*2),c.fillStyle=He===pe-1?ue:"rgba(255, 255, 255, 0.35)",c.fill()}c.textAlign="right",c.fillStyle=ue,c.fillText("NEXT SLIDE ▶  (Click Right)",1860,oe+15),P.needsUpdate=!0}A();const _=new At(p,h,48,16),V=_.attributes.position;for(let $=0;$<V.count;$++){const pe=V.getX($),ue=Math.max(-.95,Math.min(.95,pe/d)),be=d*(1-Math.cos(Math.asin(ue)));V.setZ($,be)}_.computeVertexNormals();const Z=new he(i[0].accentHex),ee=new ft({uniforms:{uTexture:{value:P},uTime:{value:0},uAccentColor:{value:Z},uOpacity:{value:.96}},vertexShader:`
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying vec3 vViewPosition;

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPosition = wp.xyz;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,fragmentShader:`
      uniform sampler2D uTexture;
      uniform float uTime;
      uniform vec3 uAccentColor;
      uniform float uOpacity;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying vec3 vViewPosition;

      void main() {
        vec4 texColor = texture2D(uTexture, vUv);

        // Perceptual brightness of texel
        float lum = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

        // Horizontal digital scanlines
        float scanline = sin((vWorldPosition.y + uTime * 0.35) * 110.0) * 0.5 + 0.5;
        scanline = smoothstep(0.15, 0.85, scanline) * 0.12 + 0.88;

        // Subtle digital matrix grain
        float dotGrid = sin(vUv.x * 480.0) * sin(vUv.y * 280.0);
        float gridPulse = smoothstep(0.75, 1.0, dotGrid) * 0.06;

        // Holographic flicker
        float flicker = 0.99 + 0.01 * sin(uTime * 15.0) * cos(uTime * 25.0);

        // Luminous Fresnel rim glow along edges
        vec3 viewDir = normalize(vViewPosition);
        vec3 normal = normalize(vNormal);
        float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 2.6);

        // Color composition
        vec3 col = texColor.rgb * scanline * flicker;
        col += uAccentColor * gridPulse * 0.4;
        col += (uAccentColor + vec3(0.20)) * fresnel * 0.35;

        // HOLOGRAPHIC 3-5% TRANSPARENCY (95-97% OPACITY):
        // User requested around 3 to 5% transparency (95-97% opacity)
        // so content, high-res photos and text are ultra-crisp, rich and punchy
        // while maintaining subtle holographic depth pass-through.
        float baseAlpha = texColor.a * (0.95 + lum * 0.03);
        float alpha = clamp((baseAlpha + fresnel * 0.10) * uOpacity, 0.94, 0.98);

        gl_FragColor = vec4(col, alpha);
      }
    `,transparent:!0,side:Ve,depthWrite:!1}),q=new J;q.position.set(0,v,0),q.rotation.x=-.06,y.add(q);const re=new l(_,ee);re.name="AstroSingleCurvedScreenMesh",re.userData={isScreen:!0},q.add(re),n.push(re);const X=new B({color:qt,roughness:.92,metalness:0}),O=new xe({color:jt,metalness:.94,roughness:.22,clearcoat:.6}),L=new xe({color:i[0].accentHex,emissive:new he(i[0].accentHex),emissiveIntensity:2.5,roughness:.2});function te($,pe,ue,be){const ye=new Ee($,pe,ue,48,1,1),Fe=ye.attributes.position;for(let ze=0;ze<Fe.count;ze++){const De=Fe.getX(ze),K=Math.max(-.95,Math.min(.95,De/d)),de=d*(1-Math.cos(Math.asin(K)));Fe.setZ(ze,Fe.getZ(ze)+de)}ye.computeVertexNormals();const ke=new l(ye,X);ke.position.y=be,ke.castShadow=!0,q.add(ke);const ge=new Ee($-.04,.012,ue+.01,48,1,1),Be=ge.attributes.position;for(let ze=0;ze<Be.count;ze++){const De=Be.getX(ze),K=Math.max(-.95,Math.min(.95,De/d)),de=d*(1-Math.cos(Math.asin(K)));Be.setZ(ze,Be.getZ(ze)+de)}ge.computeVertexNormals();const Re=new l(ge,L);return Re.position.y=be,q.add(Re),{railMesh:ke,neonMesh:Re}}te(p+.08,.035,.035,h/2+.018),te(p+.08,.035,.035,-h/2-.018);const se=new J;y.add(se);const Se=new Ee(2.4,.06,.05,32,1,1),N=Se.attributes.position;for(let $=0;$<N.count;$++){const pe=N.getX($),ue=Math.max(-.95,Math.min(.95,pe/d)),be=d*(1-Math.cos(Math.asin(ue)));N.setZ($,N.getZ($)+be)}Se.computeVertexNormals();const b=new l(Se,O);b.position.set(0,v,-.035),b.rotation.x=-.06,y.add(b);const z=v+h/2+.018,F=S-z,k=z+F/2;[-1.65,-.55,.55,1.65].forEach($=>{const pe=Math.max(-.95,Math.min(.95,$/d)),ue=d*(1-Math.cos(Math.asin(pe))),be=new D(.01,.01,F,16),ye=new l(be,O);ye.position.set($,k,ue),se.add(ye);const Fe=new D(.022,.022,.09,16),ke=new l(Fe,O);ke.position.set($,z+.045,ue),se.add(ke);const ge=new D(.12,.14,.04,24),Be=new l(ge,X);Be.position.set($,S,ue),se.add(Be);const Re=new at(.13,.01,12,24);Re.rotateX(Math.PI/2);const ze=new l(Re,L);ze.position.set($,S-.02,ue),se.add(ze)});const le=new Zt(i[0].accentHex,1.4,6,1.6);le.position.set(0,v-.4,.3),le.position.set(0,.35,.3),y.add(le);function Y(){x<1||(H=(I+1)%i.length,x=0,R=0)}function j(){x<1||(H=(I-1+i.length)%i.length,x=0,R=0)}function Te(){w=!w,A()}const Oe={screenMesh:re,nextSlide:Y,prevSlide:j,togglePause:Te,update($){if(w||(R+=$,R>=C&&x>=1&&(H=(I+1)%i.length,x=0,R=0)),x<1){if(x+=$/g,x>=1){x=1,I=H;const pe=i[I];Z.set(pe.accentHex),L.color.set(pe.accentHex),L.emissive.set(pe.accentHex),le.color.set(pe.accentHex)}A()}ee.uniforms.uTime.value+=$}},ne=new Jt,we=new Ne;let Me={x:0,y:0,time:0};const me=$=>{Me={x:$.clientX??$.touches?.[0]?.clientX??0,y:$.clientY??$.touches?.[0]?.clientY??0,time:performance.now()}},Pe=$=>{if(!e)return;const pe=$.clientX??$.changedTouches?.[0]?.clientX??0,ue=$.clientY??$.changedTouches?.[0]?.clientY??0,be=Math.hypot(pe-Me.x,ue-Me.y),ye=performance.now()-Me.time;if(be>12||ye>650||$.target&&($.target.closest("#hud-container")||$.target.closest(".hud-panel")||$.target.closest("button")||$.target.closest("input")))return;we.x=pe/window.innerWidth*2-1,we.y=-(ue/window.innerHeight)*2+1,ne.setFromCamera(we,e);const Fe=ne.intersectObjects(n,!0);if(Fe.length>0){const ke=Fe[0];ke.uv&&(ke.uv.x<.28?Oe.prevSlide():ke.uv.x>.72?Oe.nextSlide():Oe.togglePause())}};return window.addEventListener("pointerdown",me,{passive:!0}),window.addEventListener("pointerup",Pe,{passive:!0}),{screens:[Oe],interactiveTargets:n,group:o,update($){Oe.update($)},destroy(){window.removeEventListener("pointerdown",me),window.removeEventListener("pointerup",Pe)}}}function Rn(a,e,o,n,i,s){const t=e.split(" ");let r="",u=n;for(let p=0;p<t.length;p++){const h=r+t[p]+" ";a.measureText(h).width>i&&p>0?(a.fillText(r.trim(),o,u),r=t[p]+" ",u+=s):r=h}return a.fillText(r.trim(),o,u),u+s}function Pn(a,e,o,n,i,s){a.strokeStyle=s,a.lineWidth=2.5;const t=20;a.beginPath(),a.moveTo(e,o+t),a.lineTo(e,o),a.lineTo(e+t,o),a.stroke(),a.beginPath(),a.moveTo(e+n-t,o),a.lineTo(e+n,o),a.lineTo(e+n,o+t),a.stroke(),a.beginPath(),a.moveTo(e,o+i-t),a.lineTo(e,o+i),a.lineTo(e+t,o+i),a.stroke(),a.beginPath(),a.moveTo(e+n-t,o+i),a.lineTo(e+n,o+i),a.lineTo(e+n,o+i-t),a.stroke()}function hs(a,e){const n={uTime:e.uTime,uGranulationScale:{value:28},uSunspotIntensity:{value:1},uLimbDarkening:{value:.65}},i=new ft({uniforms:n,vertexShader:`
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,fragmentShader:`
      uniform float uTime;
      uniform float uGranulationScale;
      uniform float uSunspotIntensity;
      uniform float uLimbDarkening;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying vec3 vViewPosition;

      // ── GLSL 3D Simplex-Style Noise for Solar Convection ──
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      // Fractal Brownian Motion for turbulent granulation
      float fbm(vec3 p) {
        float total = 0.0;
        float amp = 0.55;
        float freq = 1.0;
        for (int i = 0; i < 4; i++) {
          total += snoise(p * freq) * amp;
          freq *= 2.15;
          amp *= 0.48;
        }
        return total;
      }

      // Procedural Sunspot Calculation with Umbra & Penumbra
      // Sunspots occur predominantly at solar active latitudes (+/- 15° to +/- 30°)
      float getSunspotMask(vec3 pos, vec3 center, float radius, out float penumbraMask) {
        float d = distance(pos, center);
        float umbra = smoothstep(radius * 0.45, radius * 0.25, d);
        penumbraMask = smoothstep(radius, radius * 0.4, d);
        return umbra;
      }

      void main() {
        vec3 norm = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);

        // Slow differential solar rotation
        float rotAngle = uTime * 0.08;
        mat3 rotY = mat3(
          cos(rotAngle), 0.0, sin(rotAngle),
          0.0,           1.0, 0.0,
          -sin(rotAngle), 0.0, cos(rotAngle)
        );
        vec3 rotPos = rotY * normalize(vPosition);

        // 1. Convective Granulation (Boiling Plasma Convection Cells)
        vec3 noiseCoords = rotPos * uGranulationScale;
        float granTime = uTime * 0.35;
        float granulation = fbm(noiseCoords + vec3(0.0, granTime, 0.0));
        granulation = granulation * 0.5 + 0.5;

        // Base Photosphere Color Palette (T ~ 5,800 K)
        vec3 interGranularDark = vec3(0.92, 0.42, 0.04); // Deep orange convective lane
        vec3 granuleMid        = vec3(1.00, 0.76, 0.22); // Solar gold photosphere
        vec3 granuleCoreHot    = vec3(1.00, 0.98, 0.88); // Hot incandescent white-yellow cell center

        vec3 photoColor = mix(interGranularDark, granuleMid, smoothstep(0.3, 0.65, granulation));
        photoColor = mix(photoColor, granuleCoreHot, smoothstep(0.72, 0.95, granulation));

        // 2. Realistic Bipolar Sunspot Groups (Active Magnetic Regions)
        // Group A (Northern Active Latitude ~ +22°)
        vec3 spotCenterA1 = normalize(vec3(0.65, 0.36, 0.65));
        vec3 spotCenterA2 = normalize(vec3(0.78, 0.38, 0.52));
        vec3 spotCenterA3 = normalize(vec3(0.72, 0.34, 0.60));

        // Group B (Southern Active Latitude ~ -18°)
        vec3 spotCenterB1 = normalize(vec3(-0.62, -0.32, 0.70));
        vec3 spotCenterB2 = normalize(vec3(-0.52, -0.28, 0.80));

        // Group C (Equatorial Active Drift)
        vec3 spotCenterC1 = normalize(vec3(0.20, 0.15, -0.96));
        vec3 spotCenterC2 = normalize(vec3(0.32, 0.18, -0.92));

        float penA1, penA2, penA3, penB1, penB2, penC1, penC2;
        float umbA1 = getSunspotMask(rotPos, spotCenterA1, 0.12, penA1);
        float umbA2 = getSunspotMask(rotPos, spotCenterA2, 0.09, penA2);
        float umbA3 = getSunspotMask(rotPos, spotCenterA3, 0.06, penA3);
        float umbB1 = getSunspotMask(rotPos, spotCenterB1, 0.14, penB1);
        float umbB2 = getSunspotMask(rotPos, spotCenterB2, 0.08, penB2);
        float umbC1 = getSunspotMask(rotPos, spotCenterC1, 0.11, penC1);
        float umbC2 = getSunspotMask(rotPos, spotCenterC2, 0.07, penC2);

        float totalUmbra = clamp(umbA1 + umbA2 + umbA3 + umbB1 + umbB2 + umbC1 + umbC2, 0.0, 1.0);
        float totalPenumbra = clamp(penA1 + penA2 + penA3 + penB1 + penB2 + penC1 + penC2, 0.0, 1.0);

        // Magnetic Penumbral Striations (Radial filaments)
        float striation = snoise(rotPos * 80.0) * 0.15 + 0.85;

        // Faculae: Hot magnetic plages surrounding sunspots (T ~ 6,500 K)
        float faculae = smoothstep(0.3, 0.7, totalPenumbra) * (1.0 - totalUmbra) * snoise(rotPos * 40.0);
        faculae = max(0.0, faculae) * 0.7;

        // Apply Penumbra (dark brownish-orange with magnetic filaments, T ~ 4,500 K)
        vec3 penumbraColor = vec3(0.48, 0.20, 0.04) * striation;
        photoColor = mix(photoColor, penumbraColor, totalPenumbra * 0.88);

        // Apply Umbra (Deep, cool core T ~ 3,800 K)
        vec3 umbraColor = vec3(0.08, 0.03, 0.02);
        photoColor = mix(photoColor, umbraColor, totalUmbra * 0.98);

        // Add Faculae highlight around sunspot active regions
        photoColor += vec3(0.8, 0.7, 0.4) * faculae;

        // 3. Solar Limb Darkening (Eddington Approximation)
        // Center of disk is brighter; limb is cooler and dimmer
        float mu = max(0.0, dot(norm, viewDir));
        float limbFactor = 1.0 - uLimbDarkening * (1.0 - pow(mu, 0.75));
        photoColor *= limbFactor;

        // Limb Emission Boost (Atmospheric Chromosphere edge rim)
        float rim = 1.0 - mu;
        vec3 chromoRim = vec3(1.0, 0.35, 0.05) * pow(rim, 3.5) * 2.2;
        photoColor += chromoRim;

        gl_FragColor = vec4(photoColor, 1.0);
      }
    `}),s=new l(new qe(.24,64,64),i);s.name="SunMesh",a.add(s);const t=new qe(.24*1.5,16,16),r=new _e({visible:!1}),u=new l(t,r);u.name="SunHitMesh",u.userData={isSun:!0,name:"Sun"},s.add(u);const p=new Zt(16755268,2.8,8,1.6);a.add(p);const h=new ft({uniforms:{uTime:e.uTime},vertexShader:`
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,fragmentShader:`
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec3 norm = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);
        float d = dot(norm, viewDir);
        float rim = 1.0 - abs(d);
        float alpha = pow(rim, 2.8) * 0.85;

        // Coronal streamer pulsation
        float pulse = sin(uTime * 1.5) * 0.1 + 0.9;
        vec3 coronaColor = mix(vec3(1.0, 0.55, 0.1), vec3(1.0, 0.88, 0.4), rim);
        gl_FragColor = vec4(coronaColor * pulse, alpha);
      }
    `,transparent:!0,blending:ot,side:_o,depthWrite:!1}),d=new l(new qe(.24*1.35,48,48),h);a.add(d);const m=new J;a.add(m);const v=new ft({uniforms:{uTime:e.uTime},vertexShader:`
      varying vec2 vUv;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vPosition;

      void main() {
        // Plasma flow speed along arch
        float flow = vUv.x * 6.0 - uTime * 3.5;
        float stream = sin(flow) * 0.35 + 0.65;
        float edge = sin(vUv.y * 3.14159);

        // Blazing H-Alpha crimson & white-hot magnetic core
        vec3 plasmaCore = vec3(1.0, 0.95, 0.8);
        vec3 plasmaMid  = vec3(1.0, 0.45, 0.05);
        vec3 plasmaEdge = vec3(0.9, 0.12, 0.05);

        vec3 col = mix(plasmaMid, plasmaCore, pow(edge, 2.0));
        col = mix(plasmaEdge, col, stream);

        float alpha = edge * (0.65 + 0.35 * sin(flow * 1.5));
        gl_FragColor = vec4(col * 2.2, alpha * 0.9);
      }
    `,transparent:!0,blending:ot,side:Ve,depthWrite:!1});[{p0:[.65,.36,.65],apex:[.95,.58,.85],p1:[.78,.38,.52],radius:.012},{p0:[.6,.42,.68],apex:[.88,.72,.75],p1:[.72,.34,.6],radius:.009},{p0:[-.62,-.32,.7],apex:[-.92,-.45,.95],p1:[-.52,-.28,.8],radius:.013},{p0:[-.55,-.35,.65],apex:[-.8,-.62,.82],p1:[-.48,-.22,.85],radius:.008},{p0:[.2,.15,-.96],apex:[.38,.28,-1.35],p1:[.32,.18,-.92],radius:.011},{p0:[.95,-.1,.1],apex:[1.38,-.12,.14],p1:[.9,-.22,.18],radius:.014}].forEach(x=>{const R=new E(...x.p0).normalize().multiplyScalar(.2352),w=new E(...x.apex).normalize().multiplyScalar(.24*(1.3+Math.random()*.3)),C=new E(...x.p1).normalize().multiplyScalar(.24*.98),g=new so([R,w,C]),A=new Ut(g,32,x.radius,12,!1),_=new l(A,v);m.add(_)});const y=new J;a.add(y);const f=I(),c=new lo({map:f,color:16772829,blending:ot,transparent:!0,opacity:.85,depthWrite:!1}),P=[];[new E(.72,.36,.58).normalize().multiplyScalar(.24*1.05),new E(-.58,-.3,.75).normalize().multiplyScalar(.24*1.05),new E(.26,.16,-.94).normalize().multiplyScalar(.24*1.05),new E(.95,-.15,.14).normalize().multiplyScalar(.24*1.05)].forEach((x,R)=>{const w=new co(c.clone());w.position.copy(x),w.scale.set(.18,.18,.18),y.add(w),P.push({sprite:w,basePos:x.clone(),phase:R*1.5,scaleSpeed:2+R*.5})});function I(){const x=document.createElement("canvas");x.width=128,x.height=128;const R=x.getContext("2d"),w=R.createRadialGradient(64,64,0,64,64,64);return w.addColorStop(0,"rgba(255, 255, 255, 1.0)"),w.addColorStop(.2,"rgba(255, 200, 80, 0.9)"),w.addColorStop(.5,"rgba(255, 100, 20, 0.5)"),w.addColorStop(.8,"rgba(200, 30, 10, 0.15)"),w.addColorStop(1,"rgba(0, 0, 0, 0)"),R.fillStyle=w,R.fillRect(0,0,128,128),R.strokeStyle="rgba(255, 240, 200, 0.6)",R.lineWidth=2,R.beginPath(),R.moveTo(64,10),R.lineTo(64,118),R.moveTo(10,64),R.lineTo(118,64),R.stroke(),new Xe(x)}return{sunMesh:s,hitMesh:u,update:(x,R)=>{s.rotation.y=x*.05,m.rotation.y=x*.05,y.rotation.y=x*.05,P.forEach(w=>{const C=Math.sin(x*w.scaleSpeed+w.phase),g=C>.4,A=g?.22+(C-.4)*.35:.12+Math.abs(C)*.06;w.sprite.scale.set(A,A,A),w.sprite.material.opacity=g?.95:.4+Math.abs(C)*.3}),p.intensity=2.6+Math.sin(x*4)*.3+Math.random()*.15}}}const Wn={Sun:{name:"THE SUN (SOL)",designation:"G-Type Main-Sequence Star // Spectral Class G2V // Solar Anchor",accentColor:"#ffaa00",stats:[{label:"EQUATORIAL RADIUS",value:"696,340 km (109.3 × Earth)"},{label:"SOLAR MASS",value:"1.989 × 10³⁰ kg (333,000 × Earth)"},{label:"SURFACE TEMPERATURE",value:"5,500 °C (5,778 K Photosphere)"},{label:"CORE TEMPERATURE",value:"15,700,000 °C (Proton Fusion)"},{label:"ROTATION PERIOD",value:"25.05 Days (Equator) / 34.4 Days (Poles)"},{label:"LUMINOSITY OUTPUT",value:"3.828 × 10²⁶ Watts (Continuous Power)"},{label:"CORE PRESSURE",value:"2.477 × 10¹¹ bar (Center of Gravity)"},{label:"SYSTEM MASS RATIO",value:"99.86% of Total Solar System Mass"},{label:"CORONAL TEMPERATURE",value:"1,000,000 to 3,000,000 K"},{label:"SOLAR WIND VELOCITY",value:"400 – 750 km/s (Supersonic Plasma)"},{label:"CHEMICAL ABUNDANCE",value:"73.46% Hydrogen, 24.85% Helium, 1.69% Heavy"},{label:"FLAGSHIP MISSIONS",value:"Parker Solar Probe, SOHO, SDO, Aditya-L1"}],summary:"The gravitational anchor and thermodynamic powerhouse of our solar system. A 4.6-billion-year-old yellow dwarf fusing 600 million metric tons of hydrogen into helium every second in its core. Dynamic twisted magnetic flux tubes power sunspot cycles, eruptive solar flares, and coronal mass ejections."},Mercury:{name:"MERCURY",designation:"Terrestrial Metalloid Planet // 1st from Sun",accentColor:"#a1a1aa",stats:[{label:"DISTANCE FROM SUN",value:"57.91 Million km (0.387 AU)"},{label:"MEAN RADIUS",value:"2,439.7 km (0.383 × Earth)"},{label:"ORBITAL PERIOD",value:"87.97 Earth Days (Eccentricity 0.2056)"},{label:"ROTATION (DAY LENGTH)",value:"58.65 Earth Days (3:2 Spin-Orbit)"},{label:"SURFACE TEMPERATURE",value:"-180 °C (Night) to +430 °C (Day)"},{label:"SURFACE GRAVITY",value:"3.70 m/s² (0.378 g)"},{label:"METALLIC CORE",value:"85% of Radius (Molten Iron Dynamo)"},{label:"NATURAL SATELLITES",value:"0 Moons"},{label:"EXOSPHERE DENSITY",value:"Trace (Oxygen, Sodium, Hydrogen, Helium)"},{label:"IMPACT BASIN",value:"Caloris Basin (1,550 km Diameter)"},{label:"ORBITAL SPEED",value:"47.36 km/s (Fastest in Solar System)"},{label:"FLAGSHIP MISSIONS",value:"Mariner 10, MESSENGER, BepiColombo"}],summary:"Smallest planet and closest to the Sun. Possesses a disproportionately enormous metallic iron-nickel core creating an active global magnetic field. Heavily battered by craters and compression scarps, experiencing the most extreme temperature swings in the solar system (+430°C to -180°C)."},Venus:{name:"VENUS",designation:"Terrestrial Super-Greenhouse Planet // 2nd from Sun",accentColor:"#f59e0b",stats:[{label:"DISTANCE FROM SUN",value:"108.2 Million km (0.723 AU)"},{label:"MEAN RADIUS",value:"6,051.8 km (0.949 × Earth)"},{label:"ORBITAL PERIOD",value:"224.7 Earth Days"},{label:"RETROGRADE ROTATION",value:"243.0 Earth Days (Clockwise Spin)"},{label:"SURFACE TEMPERATURE",value:"+465 °C (Hotter than Mercury)"},{label:"ATMOSPHERIC PRESSURE",value:"92.0 bar (900m Underwater Equivalent)"},{label:"ATMOSPHERIC COMP.",value:"96.5% CO₂, 3.5% N₂, H₂SO₄ Clouds"},{label:"NATURAL SATELLITES",value:"0 Moons"},{label:"SUPER-ROTATION",value:"Cloud Winds reach 360 km/h (4-day cycle)"},{label:"VOLCANIC LANDMARKS",value:"Maat Mons, Maxwell Montes (11 km high)"},{label:"SURFACE GRAVITY",value:"8.87 m/s² (0.904 g)"},{label:"FLAGSHIP MISSIONS",value:"Venera 7–14, Magellan, Akatsuki, DAVINCI+"}],summary:"Earth’s topological twin transformed into a hellish pressure-cooker by an ancient runaway greenhouse catastrophe. Its dense carbon dioxide atmosphere and sulfuric acid cloud decks trap heat to a uniform 465°C. Spins backwards (retrograde) so slowly that its day is longer than its orbital year."},Earth:{name:"EARTH (TERRA)",designation:"Habitable Ocean World // 3rd from Sun // Planetary Biosphere",accentColor:"#0ea5e9",stats:[{label:"DISTANCE FROM SUN",value:"149.6 Million km (1.000 AU)"},{label:"EQUATORIAL RADIUS",value:"6,378.1 km (Mean: 6,371.0 km)"},{label:"ORBITAL PERIOD",value:"365.256 Days (Mean Speed 29.78 km/s)"},{label:"ROTATION PERIOD",value:"23h 56m 04s (Sidereal Day)"},{label:"SURFACE TEMPERATURE",value:"Mean +15 °C (-89.2 °C to +56.7 °C)"},{label:"SURFACE GRAVITY",value:"9.807 m/s² (1.000 g Standard)"},{label:"SURFACE LIQUID WATER",value:"70.8% Oceans (1.332 Billion km³)"},{label:"ATMOSPHERIC COMP.",value:"78.08% N₂, 20.95% O₂, 0.93% Ar, 0.04% CO₂"},{label:"NATURAL SATELLITES",value:"1 (The Moon / Luna, Orbit 384,400 km)"},{label:"AXIAL TILT (OBLIQUITY)",value:"23.44° (Stable Four-Season Cycle)"},{label:"GEODYNAMO FIELD",value:"Dipole Shield Deflecting Cosmic Radiation"},{label:"BIOSPHERE STATUS",value:"Only Confirmed Life-Bearing Astronomical Body"}],summary:"Humanity’s oasis in deep space. Possesses dynamic active plate tectonics, expansive liquid water oceans, an oxygen-rich atmosphere, and a molten iron core geodynamo creating a protective magnetosphere that shields millions of species of terrestrial and marine life."},Mars:{name:"MARS",designation:"Terrestrial Desert Planet // 4th from Sun",accentColor:"#f97316",stats:[{label:"DISTANCE FROM SUN",value:"227.9 Million km (1.524 AU)"},{label:"EQUATORIAL RADIUS",value:"3,396.2 km (0.533 × Earth)"},{label:"ORBITAL PERIOD",value:"686.98 Earth Days (1.88 Earth Years)"},{label:"SOL (DAY LENGTH)",value:"24h 37m 22s (Nearly Identical to Earth)"},{label:"SURFACE TEMPERATURE",value:"-140 °C (Winter Pole) to +20 °C (Noon)"},{label:"SURFACE GRAVITY",value:"3.72 m/s² (0.379 g)"},{label:"ATMOSPHERIC PRESSURE",value:"6.1 mbar (0.6% of Earth, 95.3% CO₂)"},{label:"SHIELD VOLCANO",value:"Olympus Mons (21.9 km High, Solar System Record)"},{label:"GRAND CANYON",value:"Valles Marineris (4,000 km Long, 7 km Deep)"},{label:"POLAR ICE RESERVOIRS",value:"North & South Caps (Water Ice + CO₂ Dry Ice)"},{label:"NATURAL SATELLITES",value:"2 (Phobos & Deimos, Captured Asteroids)"},{label:"EXPLORATION FLEET",value:"Curiosity, Perseverance, Ingenuity, MRO, MAVEN"}],summary:"The Red Planet, tinted by oxidized iron mineral dust across its ancient river valleys, dried lakebeds, and basaltic dune fields. Hosts the colossal Olympus Mons volcano and the planetary Valles Marineris rift. Active rovers are currently extracting cores to search for ancient biosignatures."},Jupiter:{name:"JUPITER",designation:"Gas Giant Jovian Anchor // 5th from Sun",accentColor:"#ea580c",stats:[{label:"DISTANCE FROM SUN",value:"778.5 Million km (5.204 AU)"},{label:"EQUATORIAL RADIUS",value:"71,492 km (11.209 × Earth)"},{label:"PLANETARY MASS",value:"1.898 × 10²⁷ kg (317.8 × Earth, 2.5× All Planets)"},{label:"ORBITAL PERIOD",value:"11.86 Earth Years"},{label:"ROTATION PERIOD",value:"9h 55m 30s (Fastest Spin in Solar System)"},{label:"GREAT RED SPOT",value:"16,350 km Anticyclone (Raging >350 Years)"},{label:"CLOUD TOP TEMP.",value:"-110 °C (Mantle Core: ~24,000 °C)"},{label:"NATURAL SATELLITES",value:"95 Moons (Io, Europa, Ganymede, Callisto)"},{label:"ATMOSPHERIC COMP.",value:"89.8% H₂, 10.2% He, NH₃ Crystals & CH₄"},{label:"MAGNETOSPHERE SPAN",value:"Largest Structure in Solar System (20,000× Earth)"},{label:"INTERIOR STRUCTURE",value:"Liquid Metallic Hydrogen Dynamo"},{label:"FLAGSHIP MISSIONS",value:"Voyager 1 & 2, Galileo, Juno, JUICE, Europa Clipper"}],summary:"The undisputed titan of the planetary system. A vast gas giant featuring alternating turbulent ammonia cloud belts and zones with the iconic Great Red Spot storm. Inside, immense gravitational pressures turn hydrogen into liquid electrical metal, generating a ferocious radiation belt and magnetosphere."},Saturn:{name:"SATURN",designation:"Ringed Gas Giant // 6th from Sun",accentColor:"#eab308",stats:[{label:"DISTANCE FROM SUN",value:"1.434 Billion km (9.582 AU)"},{label:"EQUATORIAL RADIUS",value:"60,268 km (9.449 × Earth)"},{label:"ORBITAL PERIOD",value:"29.45 Earth Years"},{label:"ROTATION PERIOD",value:"10h 33m 38s (Rapid Oblate Flattening)"},{label:"MEAN BULK DENSITY",value:"0.687 g/cm³ (Would Float in Water Ocean)"},{label:"RING SYSTEM SPAN",value:"282,000 km Across, Only ~10–30m Thick"},{label:"RING COMPOSITION",value:"99% Pure Water Ice Particles with Tholins"},{label:"NATURAL SATELLITES",value:"146 Confirmed Moons (Titan, Enceladus, Mimas)"},{label:"OCEAN MOONS",value:"Enceladus (Cryovolcanoes) & Titan (Methane Seas)"},{label:"POLAR PHENOMENON",value:"North Polar Hexagonal Jet Stream (30,000 km wide)"},{label:"ATMOSPHERIC COMP.",value:"96.3% H₂, 3.25% He, 0.45% CH₄ & Ammonia"},{label:"FLAGSHIP MISSIONS",value:"Pioneer 11, Voyager 1 & 2, Cassini-Huygens"}],summary:"Renowned for its breathtaking ring system of pure reflective water ice sheets spanning 282,000 km. Saturn has the lowest bulk density of any planet. Orbits Titan—possessing a thick nitrogen sky and liquid ethane/methane lakes—and Enceladus, erupting geysers from its warm subsurface liquid ocean."},Uranus:{name:"URANUS",designation:"Ice Giant Planet // 7th from Sun // Retrograde Rolling World",accentColor:"#38bdf8",stats:[{label:"DISTANCE FROM SUN",value:"2.871 Billion km (19.19 AU)"},{label:"EQUATORIAL RADIUS",value:"25,559 km (4.007 × Earth)"},{label:"ORBITAL PERIOD",value:"84.02 Earth Years"},{label:"ROTATION PERIOD",value:"17h 14m 24s"},{label:"AXIAL TILT (OBLIQUITY)",value:"97.77° (Rotates Completely on its Side)"},{label:"CLOUD TOP TEMP.",value:"-224.2 °C (Coldest Planetary Atmosphere)"},{label:"METHANE ABSORPTION",value:"Absorbs Red Photons, Reflects Cyan Sky"},{label:"NATURAL SATELLITES",value:"28 Known Moons (Titania, Oberon, Miranda, Ariel)"},{label:"RING SYSTEM",value:"13 Narrow Opaque Dark Rings (Epsilon Ring)"},{label:"MANTLE COMPOSITION",value:"Water, Ammonia & Methane Supercritical Ices"},{label:"MAGNETIC FIELD",value:"Tilted 59° from Rotational Axis & Off-Center"},{label:"PRIMARY MISSIONS",value:"Voyager 2 Flyby (January 1986)"}],summary:"A serene pale-cyan ice giant knocked completely onto its side by an ancient proto-planetary cataclysm, producing 42-year long seasonal extremes of polar sunlight and darkness. Its icy mantle of dense supercritical fluids envelopes a small rocky core surrounded by 13 charcoal-dark rings."},Neptune:{name:"NEPTUNE",designation:"Ice Giant Outer World // 8th from Sun // Supersonic Storm System",accentColor:"#3b82f6",stats:[{label:"DISTANCE FROM SUN",value:"4.495 Billion km (30.07 AU)"},{label:"EQUATORIAL RADIUS",value:"24,764 km (3.883 × Earth)"},{label:"ORBITAL PERIOD",value:"164.79 Earth Years (Discovered 1846)"},{label:"ROTATION PERIOD",value:"16h 06m 36s"},{label:"SUPERSONIC WINDS",value:"Up to 2,100 km/h (Fastest in Solar System)"},{label:"INTERNAL HEAT FLUX",value:"Radiates 2.61× More Energy than Absorbed"},{label:"CLOUD TOP TEMP.",value:"-218 °C"},{label:"NATURAL SATELLITES",value:"16 Known Moons (Triton, Proteus, Nereid)"},{label:"RETROGRADE MOON",value:"Triton (Captured Kuiper Belt Object, N₂ Geysers)"},{label:"ATMOSPHERIC COMP.",value:"80% H₂, 19% He, 1.5% CH₄ (Deep Azure Azure)"},{label:"STORM SYSTEMS",value:"Great Dark Spot & Rapid Methane Cirrus Bands"},{label:"PRIMARY MISSIONS",value:"Voyager 2 Flyby (August 1989)"}],summary:"The outermost major planet of our solar system, an azure blue ice world whipped by violent supersonic winds exceeding 2,100 km/h. It generates strong internal geothermal heat driving turbulent storm systems. Its largest moon, Triton, orbits backward and vents nitrogen cryovolcanic geysers into vacuum."},Comet:{name:"COMET 1P/HALLEY & NEOWISE",designation:"Periodic Primitive Icy Body // Highly Eccentric Keplerian Orbit",accentColor:"#22d3ee",stats:[{label:"ORBITAL ECCENTRICITY",value:"e = 0.967 (Highly Elliptical Trajectory)"},{label:"PERIHELION DISTANCE",value:"0.586 AU (Whips Close to the Sun)"},{label:"APHELION DISTANCE",value:"35.1 AU (Extends Past Neptune / Kuiper)"},{label:"ORBITAL PERIOD",value:"75.3 – 76.0 Earth Years"},{label:"NUCLEUS GEOMETRY",value:'15 × 8 × 8 km (Porous "Dirty Snowball")'},{label:"NUCLEUS ALBEDO",value:"0.04 (Darker than Coal / Charcoal)"},{label:"SUBLIMATION RATE",value:"10 – 50 Tonnes/sec of Water Ice & Dust"},{label:"ION TAIL (TYPE I)",value:"Blue Plasma (CO⁺/N₂⁺) Points Exactly Away from Sun"},{label:"DUST TAIL (TYPE II)",value:"Golden-White Silicate Dust Curved by Radiation Pressure"},{label:"MAX TAIL LENGTH",value:"Up to 100 Million km at Perihelion"},{label:"METEOR SHOWERS",value:"Eta Aquariids (May) & Orionids (October)"},{label:"HISTORIC FLYBYS",value:"Giotto (ESA), Vega 1 & 2, Suisei, Sakigake"}],summary:"A pristine frozen relic from the dawn of the solar system 4.6 billion years ago. Composed of water ice, frozen methane, carbon monoxide, and dark carbonaceous silicate dust. As it plunges toward the Sun, solar heat sublimates its ice into a luminous glowing coma and produces two distinct tails: a narrow electric-blue ion tail pushed by the solar wind, and a sweeping curved white dust tail."}};function us(a,e){const o=new J;o.name="CelestialTelemetryCard",o.visible=!1,a.add(o);const n=document.createElement("canvas");n.width=1024,n.height=512;const i=n.getContext("2d"),s=new Xe(n);s.minFilter=Rt,s.magFilter=Rt;const t=new At(1.1,.55),r=new _e({map:s,transparent:!0,side:Ve,depthWrite:!1}),u=new l(t,r);o.add(u);const p=new kt().setFromPoints([new E(0,0,0),new E(.5,.4,0)]),h=new eo({color:58879,transparent:!0,opacity:.85,linewidth:2}),d=new go(p,h);o.add(d);const m=new It(.12,.15,32),v=new _e({color:58879,transparent:!0,opacity:.9,side:Ve}),S=new l(m,v);S.rotation.x=Math.PI/2,o.add(S);function y(){return Qt()}let f=document.getElementById("celestial-telemetry-hud");if(!f){f=document.createElement("div"),f.id="celestial-telemetry-hud";const w=document.createElement("style");w.textContent=`
      @media (max-width: 768px), (pointer: coarse) {
        #celestial-telemetry-hud {
          display: none !important;
          pointer-events: none !important;
        }
      }
      body.vz-mobile-tablet #celestial-telemetry-hud {
        display: none !important;
        pointer-events: none !important;
      }
    `,document.head.appendChild(w),f.style.cssText=`
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 440px;
      max-width: calc(100vw - 48px);
      max-height: 82vh;
      background: rgba(10, 14, 24, 0.94);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(0, 229, 255, 0.35);
      border-radius: 14px;
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.75), 0 0 24px rgba(0, 229, 255, 0.2);
      color: #f1f5f9;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      z-index: 9999;
      transform: translateY(120%);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
      opacity: 0;
      pointer-events: auto;
      overflow-y: auto;
    `,oo().appendChild(f)}let c=null;function P(w){i.clearRect(0,0,1024,512),i.fillStyle="#080c16",i.fillRect(0,0,1024,512),i.strokeStyle=w.accentColor,i.lineWidth=3,i.strokeRect(4,4,1016,504),i.fillStyle=w.accentColor,i.fillRect(0,0,1024,56),i.font='900 26px "Inter", "Segoe UI", sans-serif',i.fillStyle="#0a0e1c",i.textAlign="left",i.textBaseline="middle",i.fillText(`★ CELESTIAL TELEMETRY // ${w.name}`,24,28),i.font='bold 20px "Inter", sans-serif',i.fillStyle="#0a0e1c",i.textAlign="right",i.fillText("✕",1e3,28),i.font='bold 16px "Inter", monospace',i.fillStyle=w.accentColor,i.fillText(w.designation,24,82);const C=24,g=530;let A=118;w.stats.slice(0,8).forEach((_,V)=>{const Z=V%2===0?C:g;V%2===0&&V>0&&(A+=46),i.font='bold 12px "Inter", monospace',i.fillStyle="#94a3b8",i.fillText(_.label,Z,A),i.font='bold 15px "Inter", "Segoe UI", sans-serif',i.fillStyle="#ffffff",i.fillText(_.value,Z,A+18)}),i.fillStyle="rgba(255, 255, 255, 0.05)",i.fillRect(24,308,976,180),i.strokeStyle="rgba(255, 255, 255, 0.12)",i.strokeRect(24,308,976,180),i.font='italic 15px "Inter", "Segoe UI", sans-serif',i.fillStyle="#e2e8f0",I(i,w.summary,42,335,940,24),s.needsUpdate=!0}function M(w){const C=w.stats.map(g=>`
        <div style="display:flex; justify-content:space-between; align-items:baseline; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.06); font-size:12px;">
          <span style="color:#94a3b8; font-family:monospace; font-weight:600; letter-spacing:0.04em;">${g.label}</span>
          <span style="color:#ffffff; font-weight:700; text-align:right; margin-left:12px;">${g.value}</span>
        </div>
      `).join("");f.innerHTML=`
      <div style="background:${w.accentColor}; color:#0a0e1c; padding:12px 18px; display:flex; justify-content:space-between; align-items:center; font-weight:900; font-size:13px; letter-spacing:0.05em;">
        <span>★ CELESTIAL TELEMETRY // ${w.name}</span>
        <button id="close-telemetry-hud" style="background:transparent; border:none; color:#0a0e1c; font-size:18px; font-weight:900; cursor:pointer; padding:0 4px; line-height:1;">✕</button>
      </div>
      <div style="padding:16px 20px; max-height:480px; overflow-y:auto;">
        <div style="color:${w.accentColor}; font-size:11px; font-weight:700; font-family:monospace; margin-bottom:12px; letter-spacing:0.08em;">
          ${w.designation}
        </div>
        <div style="margin-bottom:14px;">
          ${C}
        </div>
        <div style="background:rgba(255,255,255,0.04); border-left:3px solid ${w.accentColor}; padding:10px 12px; font-size:12px; line-height:1.55; color:#cbd5e1; border-radius:0 6px 6px 0;">
          ${w.summary}
        </div>
      </div>
    `,document.getElementById("close-telemetry-hud")?.addEventListener("click",g=>{g.stopPropagation(),x()}),f.style.transform="translateY(0)",f.style.opacity="1"}function I(w,C,g,A,_,V){const Z=C.split(" ");let ee="";for(let q=0;q<Z.length;q++){const re=ee+Z[q]+" ";w.measureText(re).width>_&&q>0?(w.fillText(ee,g,A),ee=Z[q]+" ",A+=V):ee=re}w.fillText(ee,g,A)}function H(w,C){let g,A;typeof w=="string"?(g=w,A=C):(A=w,g=C);const _=Wn[g];if(!_)return;typeof window<"u"&&window.__sim&&(window.__sim.scientistTelemetry?.deselect(),window.__sim.rocketTelemetry?.deselect(),window.__sim.mobileRobots?.telemetry?.deselect()),c={mesh:A,dataKey:g};const V=parseInt(_.accentColor.replace("#","0x"),16);h.color.setHex(V),v.color.setHex(V),P(_),o.visible=!0,y()||M(_)}function x(){c=null,o.visible=!1,f.style.transform="translateY(120%)",f.style.opacity="0"}function R(w=.016){if(!o.visible||!c||!c.mesh)return;const C=new E;c.mesh.getWorldPosition(C);const g=C.clone();a.worldToLocal(g);const A=g.clone();if(e){const V=new E(1,0,0).applyQuaternion(e.quaternion);A.add(V.multiplyScalar(.5))}else A.x+=.5;A.y+=.42,u.position.copy(A),e&&u.quaternion.copy(e.quaternion);const _=p.attributes.position.array;_[0]=g.x,_[1]=g.y,_[2]=g.z,_[3]=A.x,_[4]=A.y-.25,_[5]=A.z,p.attributes.position.needsUpdate=!0,S.position.copy(g),S.rotation.z+=w*1.5}return{selectBody:H,deselect:x,update:R,cardGroup:o,getCurrentTarget:()=>c}}function ps(){const a=document.createElement("canvas");a.width=1024,a.height=512;const e=a.getContext("2d"),o=e.createLinearGradient(0,0,0,512);o.addColorStop(0,"#52525b"),o.addColorStop(.5,"#71717a"),o.addColorStop(1,"#3f3f46"),e.fillStyle=o,e.fillRect(0,0,1024,512);const n=e.getImageData(0,0,1024,512),i=n.data;for(let r=0;r<i.length;r+=4){const u=(Math.random()-.5)*45;i[r]=Math.max(0,Math.min(255,i[r]+u)),i[r+1]=Math.max(0,Math.min(255,i[r+1]+u)),i[r+2]=Math.max(0,Math.min(255,i[r+2]+u*.9))}e.putImageData(n,0,0),e.fillStyle="rgba(39, 39, 42, 0.45)";for(let r=0;r<14;r++){const u=Math.random()*1024,p=80+Math.random()*350,h=40+Math.random()*80;e.beginPath(),e.ellipse(u,p,h,h*.7,Math.random()*Math.PI,0,Math.PI*2),e.fill()}for(let r=0;r<120;r++){const u=Math.random()*1024,p=30+Math.random()*450,h=4+Math.random()*26;e.beginPath(),e.arc(u,p,h,0,Math.PI*2),e.fillStyle="rgba(24, 24, 27, 0.7)",e.fill(),e.beginPath(),e.arc(u,p,h,Math.PI*.75,Math.PI*1.75),e.lineWidth=Math.max(1,h*.2),e.strokeStyle="rgba(212, 212, 216, 0.85)",e.stroke(),e.beginPath(),e.arc(u,p,h,-Math.PI*.25,Math.PI*.75),e.lineWidth=Math.max(1,h*.2),e.strokeStyle="rgba(9, 9, 11, 0.9)",e.stroke(),h>14&&(e.beginPath(),e.arc(u,p,h*.2,0,Math.PI*2),e.fillStyle="rgba(244, 244, 245, 0.8)",e.fill())}[{x:340,y:220,r:24},{x:780,y:310,r:18},{x:160,y:150,r:15}].forEach(({x:r,y:u,r:p})=>{e.strokeStyle="rgba(244, 244, 245, 0.35)",e.lineWidth=1.2;for(let h=0;h<16;h++){const d=h/16*Math.PI*2+(Math.random()-.5)*.2,m=p*3+Math.random()*p*4;e.beginPath(),e.moveTo(r+Math.cos(d)*(p*.8),u+Math.sin(d)*(p*.8)),e.lineTo(r+Math.cos(d)*m,u+Math.sin(d)*m),e.stroke()}});const t=new Xe(a);return t.wrapS=Mt,t.wrapT=yt,t}function fs(){const a=document.createElement("canvas");a.width=1024,a.height=512;const e=a.getContext("2d"),o=e.createLinearGradient(0,0,0,512);o.addColorStop(0,"#fef3c7"),o.addColorStop(.2,"#fde68a"),o.addColorStop(.5,"#f59e0b"),o.addColorStop(.8,"#d97706"),o.addColorStop(1,"#fef3c7"),e.fillStyle=o,e.fillRect(0,0,1024,512);for(let i=0;i<16;i++){const s=i/16*512;e.beginPath(),e.moveTo(0,s);for(let t=0;t<=1024;t+=16){const r=(s-256)/256,u=Math.abs(Math.sin(t/1024*Math.PI*4))*30*Math.sign(r),p=Math.sin(t/80+i)*12+Math.cos(t/140*2)*8;e.lineTo(t,s+u+p)}e.lineWidth=16+Math.random()*22,e.strokeStyle=i%2===0?"rgba(254, 240, 138, 0.45)":"rgba(180, 83, 9, 0.28)",e.stroke()}for(let i=0;i<25;i++){const s=Math.random()*1024,t=100+Math.random()*312,r=60+Math.random()*120,u=e.createRadialGradient(s,t,0,s,t,r);u.addColorStop(0,"rgba(255, 251, 235, 0.4)"),u.addColorStop(.5,"rgba(251, 191, 36, 0.2)"),u.addColorStop(1,"transparent"),e.fillStyle=u,e.fillRect(s-r,t-r,r*2,r*2)}const n=new Xe(a);return n.wrapS=Mt,n.wrapT=yt,n}function ms(){const a=document.createElement("canvas");a.width=1024,a.height=512;const e=a.getContext("2d"),o=e.createLinearGradient(0,0,0,512);o.addColorStop(0,"#0c2340"),o.addColorStop(.3,"#103768"),o.addColorStop(.5,"#1e4b8a"),o.addColorStop(.7,"#103768"),o.addColorStop(1,"#0c2340"),e.fillStyle=o,e.fillRect(0,0,1024,512),e.fillStyle="rgba(6, 182, 212, 0.4)";function n(s,t,r,u=!0){u&&(e.beginPath(),s.forEach((p,h)=>{const d=p[0]*1024,m=p[1]*512;h===0?e.moveTo(d,m):e.lineTo(d,m)}),e.closePath(),e.lineWidth=14,e.strokeStyle="rgba(6, 182, 212, 0.35)",e.stroke()),e.beginPath(),s.forEach((p,h)=>{const d=p[0]*1024,m=p[1]*512;h===0?e.moveTo(d,m):e.lineTo(d,m)}),e.closePath(),e.fillStyle=t,e.fill(),r&&(e.beginPath(),s.forEach((p,h)=>{const d=(p[0]*.75+.12)*1024,m=(p[1]*.75+.12)*512;h===0?e.moveTo(d,m):e.lineTo(d,m)}),e.closePath(),e.fillStyle=r,e.fill())}n([[.46,.18],[.55,.15],[.68,.16],[.82,.19],[.88,.32],[.78,.42],[.72,.46],[.68,.4],[.6,.48],[.52,.42],[.48,.34],[.44,.26]],"#15803d","#ca8a04"),n([[.46,.36],[.56,.38],[.62,.48],[.56,.68],[.52,.74],[.48,.65],[.44,.48]],"#166534","#d97706"),n([[.12,.16],[.26,.14],[.32,.22],[.28,.36],[.22,.42],[.16,.38],[.1,.28]],"#15803d","#ca8a04"),n([[.24,.44],[.34,.48],[.36,.58],[.3,.72],[.26,.8],[.22,.65],[.2,.52]],"#166534",null),n([[.78,.58],[.88,.56],[.92,.66],[.86,.74],[.76,.7]],"#15803d","#ea580c"),n([[.66,.38],[.73,.4],[.7,.54],[.65,.46]],"#15803d","#ca8a04"),e.fillStyle="#f8fafc",e.beginPath(),e.ellipse(512,18,480,26,0,0,Math.PI*2),e.fill(),e.beginPath(),e.ellipse(512,498,512,38,0,0,Math.PI*2),e.fill();const i=new Xe(a);return i.wrapS=Mt,i.wrapT=yt,i}function gs(){const a=document.createElement("canvas");a.width=1024,a.height=512;const e=a.getContext("2d");e.clearRect(0,0,1024,512),e.fillStyle="rgba(255, 255, 255, 0.65)";for(let i=0;i<6;i++){const s=230+Math.sin(i)*35;e.beginPath(),e.moveTo(0,s);for(let t=0;t<=1024;t+=32){const r=s+Math.sin(t/60+i)*16+Math.cos(t/120)*12;e.lineTo(t,r)}e.lineWidth=16+Math.random()*20,e.strokeStyle="rgba(255, 255, 255, 0.45)",e.stroke()}[{x:220,y:150,r:80},{x:680,y:140,r:90},{x:380,y:360,r:75},{x:820,y:370,r:85}].forEach(({x:i,y:s,r:t})=>{e.strokeStyle="rgba(255, 255, 255, 0.7)";for(let r=0;r<5;r++){e.beginPath();const u=r*1.2;for(let p=0;p<40;p++){const h=u+p/40*Math.PI*2.5,d=p/40*t,m=i+Math.cos(h)*d,v=s+Math.sin(h)*d*.7;p===0?e.moveTo(m,v):e.lineTo(m,v)}e.lineWidth=4+Math.random()*6,e.stroke()}});const n=new Xe(a);return n.wrapS=Mt,n.wrapT=yt,n}function ys(){const a=document.createElement("canvas");a.width=1024,a.height=512;const e=a.getContext("2d"),o=e.createLinearGradient(0,0,0,512);o.addColorStop(0,"#7c2d12"),o.addColorStop(.2,"#c2410c"),o.addColorStop(.5,"#ea580c"),o.addColorStop(.8,"#9a3412"),o.addColorStop(1,"#7c2d12"),e.fillStyle=o,e.fillRect(0,0,1024,512);const n=e.getImageData(0,0,1024,512),i=n.data;for(let r=0;r<i.length;r+=4){const u=(Math.random()-.5)*35;i[r]=Math.max(0,Math.min(255,i[r]+u)),i[r+1]=Math.max(0,Math.min(255,i[r+1]+u*.7)),i[r+2]=Math.max(0,Math.min(255,i[r+2]+u*.5))}e.putImageData(n,0,0),e.fillStyle="rgba(67, 20, 7, 0.65)",[{x:550,y:240,rx:90,ry:60,rot:-.3},{x:320,y:160,rx:110,ry:70,rot:.2},{x:420,y:310,rx:130,ry:45,rot:.1},{x:780,y:290,rx:100,ry:50,rot:-.2}].forEach(({x:r,y:u,rx:p,ry:h,rot:d})=>{e.beginPath(),e.ellipse(r,u,p,h,d,0,Math.PI*2),e.fill()}),e.beginPath(),e.moveTo(180,270),e.quadraticCurveTo(280,285,380,275),e.lineWidth=10,e.strokeStyle="rgba(40, 10, 4, 0.85)",e.stroke(),e.beginPath(),e.arc(140,220,32,0,Math.PI*2),e.fillStyle="rgba(234, 88, 12, 0.8)",e.fill(),e.lineWidth=4,e.strokeStyle="rgba(67, 20, 7, 0.7)",e.stroke(),e.beginPath(),e.arc(140,220,8,0,Math.PI*2),e.fillStyle="rgba(40, 10, 4, 0.9)",e.fill(),e.fillStyle="#f8fafc",e.beginPath(),e.ellipse(512,22,240,24,0,0,Math.PI*2),e.fill(),e.beginPath(),e.ellipse(512,492,180,22,0,0,Math.PI*2),e.fill();const t=new Xe(a);return t.wrapS=Mt,t.wrapT=yt,t}function vs(){const a=document.createElement("canvas");a.width=1024,a.height=512;const e=a.getContext("2d"),o=[{y:0,h:45,col:"#78350f"},{y:45,h:35,col:"#fef3c7"},{y:80,h:40,col:"#9a3412"},{y:120,h:45,col:"#fed7aa"},{y:165,h:50,col:"#7c2d12"},{y:215,h:55,col:"#fffbeb"},{y:270,h:55,col:"#9a3412"},{y:325,h:45,col:"#ffedd5"},{y:370,h:45,col:"#78350f"},{y:415,h:40,col:"#fed7aa"},{y:455,h:57,col:"#451a03"}];o.forEach(({y:p,h,col:d})=>{e.fillStyle=d,e.fillRect(0,p,1024,h)}),o.forEach(({y:p})=>{if(p!==0){e.beginPath(),e.moveTo(0,p);for(let h=0;h<=1024;h+=16){const d=Math.sin(h/24)*5+Math.cos(h/48)*4;e.lineTo(h,p+d)}e.lineWidth=5,e.strokeStyle="rgba(69, 26, 3, 0.4)",e.stroke()}});for(let p=0;p<8;p++){const h=p/8*1024+40,d=345+(Math.random()-.5)*10;e.beginPath(),e.ellipse(h,d,14,7,0,0,Math.PI*2),e.fillStyle="#ffffff",e.fill(),e.lineWidth=2,e.strokeStyle="rgba(120, 53, 15, 0.4)",e.stroke()}const n=620,i=295,s=54,t=32;e.beginPath(),e.ellipse(n,i,s+6,t+4,-.05,0,Math.PI*2),e.fillStyle="rgba(69, 26, 3, 0.5)",e.fill();const r=e.createRadialGradient(n,i,4,n,i,s);r.addColorStop(0,"#ef4444"),r.addColorStop(.4,"#b91c1c"),r.addColorStop(.85,"#7f1d1d"),r.addColorStop(1,"#991b1b"),e.beginPath(),e.ellipse(n,i,s,t,-.05,0,Math.PI*2),e.fillStyle=r,e.fill(),e.strokeStyle="rgba(254, 202, 202, 0.65)",e.lineWidth=3,e.beginPath(),e.ellipse(n,i,s*.55,t*.5,-.05,0,Math.PI*1.8),e.stroke(),e.beginPath(),e.moveTo(n-s,i),e.quadraticCurveTo(n-s-40,i-14,n-s-110,i-4),e.lineWidth=10,e.strokeStyle="rgba(254, 243, 199, 0.6)",e.stroke();const u=new Xe(a);return u.wrapS=Mt,u.wrapT=yt,u}function bs(){const a=document.createElement("canvas");a.width=1024,a.height=512;const e=a.getContext("2d"),o=e.createLinearGradient(0,0,0,512);o.addColorStop(0,"#78552b"),o.addColorStop(.15,"#eab308"),o.addColorStop(.35,"#fde047"),o.addColorStop(.5,"#fef08a"),o.addColorStop(.65,"#fde047"),o.addColorStop(.85,"#ca8a04"),o.addColorStop(1,"#654321"),e.fillStyle=o,e.fillRect(0,0,1024,512);for(let i=0;i<40;i++){const s=i/40*512;e.beginPath(),e.moveTo(0,s),e.lineTo(1024,s),e.lineWidth=3+Math.random()*4,e.strokeStyle=i%2===0?"rgba(254, 240, 138, 0.25)":"rgba(161, 98, 7, 0.18)",e.stroke()}e.fillStyle="rgba(66, 75, 54, 0.45)",e.beginPath(),e.ellipse(512,28,160,24,0,0,Math.PI*2),e.fill();const n=new Xe(a);return n.wrapS=Mt,n.wrapT=yt,n}function ws(){const a=document.createElement("canvas");a.width=1024,a.height=64;const e=a.getContext("2d");e.clearRect(0,0,1024,64);for(let n=0;n<1024;n++){let i=0,s=240,t=220,r=180;if(n>=140&&n<330){const u=(n-140)/190;i=.25+Math.sin(u*25)*.08,s=180,t=165,r=140}else if(n>=330&&n<680){const u=(n-330)/350;i=.88+Math.sin(u*45)*.08,s=248,t=236,r=205}else if(n>=680&&n<735)i=.02,s=40,t=35,r=25;else if(n>=735&&n<965)if(n>=885&&n<=895)i=.08;else{const u=(n-735)/230;i=.68+Math.sin(u*30)*.06,s=235,t=220,r=190}else n>=980&&n<1005&&(i=.35,s=245,t=235,r=210);e.fillStyle=`rgba(${s}, ${t}, ${r}, ${i})`,e.fillRect(n,0,1,64)}const o=new Xe(a);return o.wrapS=yt,o.wrapT=yt,o}function xs(){const a=document.createElement("canvas");a.width=1024,a.height=512;const e=a.getContext("2d"),o=e.createLinearGradient(0,0,0,512);o.addColorStop(0,"#0284c7"),o.addColorStop(.2,"#38bdf8"),o.addColorStop(.5,"#7dd3fc"),o.addColorStop(.8,"#38bdf8"),o.addColorStop(1,"#0369a1"),e.fillStyle=o,e.fillRect(0,0,1024,512);for(let i=0;i<18;i++){const s=i/18*512;e.beginPath(),e.moveTo(0,s),e.lineTo(1024,s),e.lineWidth=12,e.strokeStyle=i%2===0?"rgba(186, 230, 253, 0.28)":"rgba(2, 132, 199, 0.18)",e.stroke()}const n=new Xe(a);return n.wrapS=Mt,n.wrapT=yt,n}function Ss(){const a=document.createElement("canvas");a.width=1024,a.height=512;const e=a.getContext("2d"),o=e.createLinearGradient(0,0,0,512);o.addColorStop(0,"#172554"),o.addColorStop(.3,"#1e40af"),o.addColorStop(.5,"#2563eb"),o.addColorStop(.7,"#1d4ed8"),o.addColorStop(1,"#172554"),e.fillStyle=o,e.fillRect(0,0,1024,512);for(let r=0;r<22;r++){const u=r/22*512;e.beginPath(),e.moveTo(0,u),e.lineTo(1024,u),e.lineWidth=14,e.strokeStyle=r%2===0?"rgba(59, 130, 246, 0.3)":"rgba(30, 58, 138, 0.35)",e.stroke()}const n=580,i=320;e.beginPath(),e.ellipse(n,i,48,26,-.15,0,Math.PI*2),e.fillStyle="rgba(15, 23, 42, 0.65)",e.fill(),[{x:540,y:300,w:90,h:6},{x:320,y:220,w:120,h:8},{x:740,y:190,w:100,h:7},{x:620,y:350,w:80,h:5}].forEach(({x:r,y:u,w:p,h})=>{e.beginPath(),e.ellipse(r,u,p*.5,h*.5,-.05,0,Math.PI*2),e.fillStyle="rgba(255, 255, 255, 0.85)",e.fill()});const t=new Xe(a);return t.wrapS=Mt,t.wrapT=yt,t}function Ms(a){const e=new J;e.name="Comet_1P_Halley",e.userData={name:"Comet",isComet:!0},a.add(e);const o=.36,n=2.12,i=(o+n)/2,s=(n-o)/(n+o),t=i*Math.sqrt(1-s*s),r=i*s,u=.38,p=.65;function h(T){const le=i*Math.cos(T)-r,Y=t*Math.sin(T),j=le*Math.cos(p)-Y*Math.sin(p),Te=le*Math.sin(p)+Y*Math.cos(p),Oe=j,ne=Te*Math.sin(u),we=Te*Math.cos(u);return new E(Oe,ne,we)}const d=[],m=128;for(let T=0;T<=m;T++){const le=T/m*Math.PI*2;d.push(h(le))}const v=new kt().setFromPoints(d),S=new eo({color:3718648,transparent:!0,opacity:.32,linewidth:1}),y=new go(v,S);a.add(y);const f=new Ii(.024,2),c=f.attributes.position;for(let T=0;T<c.count;T++){const le=c.getX(T),Y=c.getY(T),j=c.getZ(T),Te=1+(Math.sin(le*40)+Math.cos(Y*35)+Math.sin(j*50))*.18;c.setXYZ(T,le*Te,Y*Te*.8,j*Te)}f.computeVertexNormals();const P=new B({color:4674921,roughness:.95,metalness:.05,emissive:new he(165063),emissiveIntensity:.15}),M=new l(f,P);e.add(M);const I=new l(new qe(.24,16,16),new _e({visible:!1}));I.name="HitMesh_Comet",I.userData={name:"Comet",isHitBox:!0},e.add(I);const H=document.createElement("canvas");H.width=256,H.height=256;const x=H.getContext("2d"),R=x.createRadialGradient(128,128,4,128,128,120);R.addColorStop(0,"rgba(255, 255, 255, 1.0)"),R.addColorStop(.25,"rgba(56, 189, 248, 0.85)"),R.addColorStop(.6,"rgba(14, 165, 233, 0.35)"),R.addColorStop(1,"rgba(0, 0, 0, 0)"),x.fillStyle=R,x.fillRect(0,0,256,256);const w=new Xe(H),C=new lo({map:w,color:3718648,transparent:!0,opacity:.95,blending:ot,depthWrite:!1}),g=new co(C);g.scale.set(.16,.16,1),e.add(g);const A=1.1,_=new D(.005,.055,A,16,1,!0);_.translate(0,A/2,0);const V=new ft({uniforms:{uColor:{value:new he(58879)},uOpacity:{value:.85},uLengthFactor:{value:1}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 uColor;
      uniform float uOpacity;
      varying vec2 vUv;
      void main() {
        // vUv.y: 0 at base (nucleus), 1 at tip
        float fade = pow(1.0 - vUv.y, 1.4);
        float edge = sin(vUv.x * 3.14159);
        float alpha = fade * edge * uOpacity;
        vec3 col = mix(uColor, vec3(0.7, 0.9, 1.0), (1.0 - vUv.y) * 0.4);
        gl_FragColor = vec4(col, alpha);
      }
    `,transparent:!0,blending:ot,side:Ve,depthWrite:!1}),Z=new l(_,V);a.add(Z);const ee=24,q=new At(.12,.95,4,ee);q.attributes.position;const re=new ft({uniforms:{uColor:{value:new he(16707722)},uOpacity:{value:.75}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 uColor;
      uniform float uOpacity;
      varying vec2 vUv;
      void main() {
        // vUv.y: 0 at base, 1 at tip
        float fade = pow(1.0 - vUv.y, 1.6);
        float edge = sin(vUv.x * 3.14159);
        float alpha = fade * edge * uOpacity;
        vec3 col = mix(uColor, vec3(1.0, 0.95, 0.85), (1.0 - vUv.y) * 0.5);
        gl_FragColor = vec4(col, alpha);
      }
    `,transparent:!0,blending:ot,side:Ve,depthWrite:!1}),X=new l(q,re);a.add(X);const O=60,L=new kt,te=new Float32Array(O*3),se=[];for(let T=0;T<O;T++)te[T*3]=0,te[T*3+1]=0,te[T*3+2]=0,se.push({life:Math.random(),speed:.4+Math.random()*.8,spread:(Math.random()-.5)*.08});L.setAttribute("position",new Gt(te,3));const Se=new Un({color:9684477,size:.016,transparent:!0,opacity:.7,blending:ot,depthWrite:!1}),N=new Hn(L,Se);a.add(N);let b=.8;const z=[],F=32;return{group:e,nucleusMesh:M,hitMesh:I,orbitLine:y,update:(T,le)=>{const j=e.position.length()||1,Te=.18,Oe=Math.min(6.5,Math.max(.35,Math.pow(i/j,1.8)));b+=Te*Oe*le,b>Math.PI*2&&(b-=Math.PI*2);const ne=h(b);e.position.copy(ne),z.unshift(ne.clone()),z.length>F&&z.pop();const we=Math.min(1,Math.max(.05,Math.pow((1.75-j)/1.4,2))),Me=et.lerp(.08,.28,we);g.scale.set(Me,Me,1),C.opacity=et.lerp(.15,.95,we);const me=ne.clone().normalize(),Pe=et.lerp(.08,A,we);Z.position.copy(ne);const $=new E(0,1,0);if(Z.quaternion.setFromUnitVectors($,me),Z.scale.set(1,Pe/A,1),V.uniforms.uOpacity.value=et.lerp(.04,.88,we),z.length>=8){X.visible=!0;const ue=q.attributes.position,be=ee+1,ye=z[Math.min(z.length-1,6)],Fe=ne.clone().sub(ye).normalize(),ke=me.clone().multiplyScalar(.7).sub(Fe.clone().multiplyScalar(.35)).normalize(),ge=new E().crossVectors(ke,new E(0,1,0)).normalize();X.position.copy(ne);const Be=et.lerp(.06,.85,we);for(let Re=0;Re<be;Re++){const ze=Re/ee,De=Math.pow(ze,1.3)*Be,K=et.lerp(.015,.16,ze),de=ke.clone().multiplyScalar(De).sub(Fe.clone().multiplyScalar(De*.38*ze));for(let oe=0;oe<=4;oe++){const Ge=(oe/4-.5)*2,Ue=Re*5+oe,Ie=de.x+ge.x*K*Ge,He=de.y+ge.y*K*Ge,$e=de.z+ge.z*K*Ge;ue.setXYZ(Ue,Ie,He,$e)}}ue.needsUpdate=!0,q.computeVertexNormals(),re.uniforms.uOpacity.value=et.lerp(.03,.72,we)}else X.visible=!1;const pe=L.attributes.position.array;for(let ue=0;ue<O;ue++){const be=se[ue];if(be.life+=le*be.speed*(.8+we*1.5),be.life>1)be.life=0,pe[ue*3]=ne.x,pe[ue*3+1]=ne.y,pe[ue*3+2]=ne.z;else{const ye=be.life*Pe*.75;pe[ue*3]=ne.x+me.x*ye+be.spread*ye,pe[ue*3+1]=ne.y+me.y*ye+be.spread*ye,pe[ue*3+2]=ne.z+me.z*ye}}L.attributes.position.needsUpdate=!0,Se.opacity=et.lerp(.05,.75,we),M.rotation.x+=le*.4,M.rotation.y+=le*.6},getPosition:()=>e.position}}function Ts(a,e,o){const n=new J;n.name="AstronomyObservationHub";const i=to("astronomy");n.position.copy(i),a.add(n);const s={orbitalTimeScale:{value:1}},t=new B({color:qt,roughness:.92,metalness:0}),r=new l(new D(3,3.3,.6,64),t);r.position.y=.3,r.castShadow=!0,r.receiveShadow=!0,n.add(r);const u=new l(new at(3.1,.04,16,64),new xe({color:1114146,emissive:new he(10309341),emissiveIntensity:2.5}));u.rotation.x=Math.PI/2,u.position.y=.05,n.add(u);const p=new J;p.position.set(0,1.42,0),n.add(p);const h=hs(p,e),d=h.sunMesh,m=[{name:"Mercury",dist:.38,size:.035,speed:4.15,axialTilt:.001,spinSpeed:.25,createMaterial:()=>new B({map:ps(),roughness:.88,metalness:.05})},{name:"Venus",dist:.52,size:.052,speed:1.62,axialTilt:3.09,spinSpeed:-.18,createMaterial:()=>new B({map:fs(),roughness:.42,metalness:.02})},{name:"Earth",dist:.68,size:.06,speed:1,axialTilt:.41,spinSpeed:.75,hasClouds:!0,createMaterial:()=>new B({map:ms(),roughness:.52,metalness:.08})},{name:"Mars",dist:.84,size:.045,speed:.53,axialTilt:.44,spinSpeed:.7,createMaterial:()=>new B({map:ys(),roughness:.82,metalness:.04})},{name:"Jupiter",dist:1.08,size:.105,speed:.24,axialTilt:.054,spinSpeed:1.4,createMaterial:()=>new B({map:vs(),roughness:.54,metalness:.02})},{name:"Saturn",dist:1.34,size:.085,speed:.12,axialTilt:.466,spinSpeed:1.25,hasRing:!0,createMaterial:()=>new B({map:bs(),roughness:.55,metalness:.02})},{name:"Uranus",dist:1.62,size:.065,speed:.06,axialTilt:1.707,spinSpeed:.85,hasRing:!0,isUranusRing:!0,createMaterial:()=>new B({map:xs(),roughness:.46,metalness:.02})},{name:"Neptune",dist:1.85,size:.06,speed:.03,axialTilt:.494,spinSpeed:.9,createMaterial:()=>new B({map:Ss(),roughness:.45,metalness:.02})}],v=[],S=[h.hitMesh,d],y=ws(),f=new ft({uniforms:{uRingTex:{value:y}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform sampler2D uRingTex;
      varying vec2 vUv;
      void main() {
        float r = length(vUv - vec2(0.5)) * 2.0;
        float innerR = 0.4737;
        float outerR = 1.0;
        if (r < innerR || r > outerR) discard;
        float u = clamp((r - innerR) / (outerR - innerR), 0.0, 1.0);
        vec4 col = texture2D(uRingTex, vec2(u, 0.5));
        if (col.a < 0.02) discard;
        gl_FragColor = col;
      }
    `,transparent:!0,side:Ve,depthWrite:!1});m.forEach(g=>{const _=new Ei(0,0,g.dist,g.dist,0,2*Math.PI,!1,0).getPoints(96),V=new kt().setFromPoints(_.map(te=>new E(te.x,0,te.y))),Z=new eo({color:4491451,transparent:!0,opacity:.35}),ee=new go(V,Z);p.add(ee);const q=g.createMaterial(),re=new l(new qe(g.size,32,32),q);re.name=`Planet_${g.name}`,re.userData={name:g.name,isPlanet:!0},re.rotation.z=g.axialTilt,p.add(re);const X=Math.max(.18,g.size*2.4),O=new l(new qe(X,16,16),new _e({visible:!1}));O.name=`HitMesh_${g.name}`,O.userData={name:g.name,isHitBox:!0},re.add(O),S.push(O,re);let L=null;if(g.hasClouds){const te=gs(),se=new B({map:te,transparent:!0,opacity:.85,depthWrite:!1,roughness:.7});L=new l(new qe(g.size*1.018,32,32),se),re.add(L)}if(g.hasRing&&!g.isUranusRing){const te=new l(new It(g.size*1.35,g.size*2.85,64),f);te.rotation.x=Math.PI/2.3,re.add(te)}if(g.isUranusRing){const te=new _e({color:8246268,transparent:!0,opacity:.28,side:Ve}),se=new l(new It(g.size*1.3,g.size*1.7,48),te);se.rotation.x=Math.PI/2,re.add(se)}v.push({mesh:re,cloudsMesh:L,name:g.name,dist:g.dist,speed:g.speed,spinSpeed:g.spinSpeed,angle:Math.random()*Math.PI*2})});const c=Ms(p);S.push(c.hitMesh,c.nucleusMesh);const P=ds(n,o),M=us(p,o),I=new Jt,H=new Ne;let x={x:0,y:0,time:0};const R=g=>{x={x:g.clientX??g.touches?.[0]?.clientX??0,y:g.clientY??g.touches?.[0]?.clientY??0,time:performance.now()}},w=g=>{if(!o)return;const A=g.clientX??g.changedTouches?.[0]?.clientX??0,_=g.clientY??g.changedTouches?.[0]?.clientY??0,V=Math.hypot(A-x.x,_-x.y),Z=performance.now()-x.time;if(V>12||Z>650||g.target&&(g.target.closest("#celestial-telemetry-hud")||g.target.closest("#hud-container")||g.target.closest(".hud-panel")||g.target.closest("button")||g.target.closest("input")))return;H.x=A/window.innerWidth*2-1,H.y=-(_/window.innerHeight)*2+1,I.setFromCamera(H,o);const ee=I.intersectObjects(S,!0);if(ee.length>0){const q=ee[0].object,re=q.userData?.name||q.parent?.userData?.name,X=q.userData?.isHitBox?q.parent:q;re&&Wn[re]&&(M.getCurrentTarget&&M.getCurrentTarget()?.dataKey===re?M.deselect():M.selectBody(X,re))}else M.getCurrentTarget&&M.getCurrentTarget()&&M.deselect()};return window.addEventListener("pointerdown",R,{passive:!0}),window.addEventListener("pointerup",w,{passive:!0}),{group:n,update:(g,A)=>{const _=s.orbitalTimeScale.value;v.forEach(V=>{V.angle+=V.speed*.25*_*A,V.mesh.position.x=Math.cos(V.angle)*V.dist,V.mesh.position.z=Math.sin(V.angle)*V.dist,V.mesh.rotation.y+=V.spinSpeed*A,V.cloudsMesh&&(V.cloudsMesh.rotation.y+=V.spinSpeed*1.3*A)}),c.update(g,A),P.update(A),h.update(g),M.update(g,A)},controls:s,telemetry:M,comet:c,selectCelestialBody:g=>{if(g==="Sun")M.selectBody(d,"Sun");else if(g==="Comet")M.selectBody(c.group,"Comet");else{const A=v.find(_=>_.name===g);A&&M.selectBody(A.mesh,g)}}}}const Cs={Pragyan:{name:"ISRO PRAGYAN ROVER",designation:"Chandrayaan-3 Lunar Surface Exploration Robot // Shiv Shakti Point",accentColor:"#10b981",stats:[{label:"MISSION OBJECTIVE",value:"In-Situ Lunar South Pole Surface Science"},{label:"LANDING LOCATION",value:"Shiv Shakti Point (69.373° S, 32.319° E)"},{label:"LANDING DATE",value:"August 23, 2023 // 18:04 IST"},{label:"ROVER MASS",value:"26 kg (Ultralight Carbon-Composite Chassis)"},{label:"MOBILITY SYSTEM",value:"6-Wheel Rocker-Bogie Suspension"},{label:"POWER GENERATION",value:"50W Solar Array + High-Capacity Li-Ion"},{label:"TOP VELOCITY",value:"1 cm/second (Stereo NavCam Guidance)"},{label:"SPECTROMETER (LIBS)",value:"Laser-Induced Breakdown Spectroscope"},{label:"X-RAY PAYLOAD (APXS)",value:"Alpha Particle X-Ray Spectrometer"},{label:"LUNAR DISCOVERY",value:"Direct In-Situ Confirmation of Sulphur (S), Al, Fe, Ca"},{label:"WHEEL EMBOSS",value:"ISRO Emblem & National Ashoka Lion Capital"},{label:"OPERATIONAL STATUS",value:"Primary Mission Accomplished // Lunar Night Hibernation"}],summary:"India's historic lunar surface rover that achieved the world's first soft landing near the unexplored lunar south pole. Utilizing a 6-wheel rocker-bogie mechanism, Pragyan rolled across the regolith and fired laser pulses to vaporize soil samples, conducting groundbreaking in-situ spectroscopy that confirmed elemental sulphur, aluminum, calcium, and iron around Shiv Shakti Point."},R2D2:{name:"R2-D2 ASTROMECH DROID",designation:"Industrial Automaton R2 Series // Astrogation & Starship Mechanic",accentColor:"#00e5ff",stats:[{label:"MANUFACTURER",value:"Industrial Automaton (R2 Series)"},{label:"PRIMARY ROLE",value:"Starship Hyperspace Astrogation & Repair"},{label:"HEIGHT / WEIGHT",value:"1.09 meters // 32 kg"},{label:"CHASSIS ALLOY",value:"Reinforced Durasteel & Polished Cobalt Trim"},{label:"PROPULSION",value:"Dual All-Terrain Treads + Deployable Center Caster"},{label:"SENSOR ARRAYS",value:"Radar Eye, Heat Sensor, Acoustic & Life Scanner"},{label:"PROJECTOR SYSTEM",value:"Holographic Emitter & 3D Optical Recording Diode"},{label:"COMPUTER INTERFACE",value:"Universal High-Speed Retractable Scomp Link"},{label:"TOOL ARSENAL",value:"Fusion Welder, Scomp Jack, Circular Saw, Periscope"},{label:"ROCKET BOOSTERS",value:"Liquid-Fuel Leg Thrusters for Brief Flight"},{label:"VOCAL SYNTHESIS",value:"Binary Acoustic Beeps, Whistles, Chirps & Trills"},{label:"OPERATING STATUS",value:"Fully Autonomous // Logic Matrix Online"}],summary:"The legendary astromech droid renowned for resourceful heroics, brilliant starship repairs under fire, and intricate computer slicing. Equipped with a spinning radar eye dome, multi-tool mechanical appendages, holographic projector, and an expressive binary vocabulary, R2-D2 remains the galaxy’s most indispensable robotic companion."}};function Is(a,e,o=null){let n=o,i=!1,s=!1,t=0,r=!0;const u=1.1,p=new E,h=new E,d=new E,m=new E;function v(O){n=O}const S=new J;S.name="RobotTelemetryCard",S.visible=!1,a.add(S);const y=document.createElement("canvas");y.width=1024,y.height=512;const f=y.getContext("2d"),c=new Xe(y);c.minFilter=Rt,c.magFilter=Rt;const P=new At(1.15,.58),M=new _e({map:c,transparent:!0,side:Ve,depthWrite:!1}),I=new l(P,M);S.add(I);const H=new kt().setFromPoints([new E(0,0,0),new E(.5,.5,0)]),x=new eo({color:58879,transparent:!0,opacity:.85,linewidth:2}),R=new go(H,x);S.add(R);const w=new It(.32,.38,36),C=new _e({color:58879,transparent:!0,opacity:.9,side:Ve}),g=new l(w,C);g.rotation.x=-Math.PI/2,S.add(g);let A=document.getElementById("robot-telemetry-hud");if(!A){A=document.createElement("div"),A.id="robot-telemetry-hud";const O=document.createElement("style");O.textContent=`
      @media (max-width: 768px), (pointer: coarse) {
        #robot-telemetry-hud {
          display: none !important;
          pointer-events: none !important;
        }
      }
      body.vz-mobile-tablet #robot-telemetry-hud {
        display: none !important;
        pointer-events: none !important;
      }
    `,document.head.appendChild(O),A.style.cssText=`
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 440px;
      max-width: calc(100vw - 48px);
      max-height: 82vh;
      background: rgba(10, 14, 24, 0.94);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(0, 229, 255, 0.35);
      border-radius: 14px;
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.75), 0 0 24px rgba(0, 229, 255, 0.2);
      color: #f1f5f9;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      z-index: 9999;
      transform: translateY(120%);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
      opacity: 0;
      pointer-events: auto;
      overflow-y: auto;
    `,oo().appendChild(A)}let _=null;function V(O){f.clearRect(0,0,1024,512),f.fillStyle="#080c16",f.fillRect(0,0,1024,512),f.strokeStyle=O.accentColor,f.lineWidth=3,f.strokeRect(4,4,1016,504),f.fillStyle=O.accentColor,f.fillRect(0,0,1024,56),f.font='900 24px "Inter", "Segoe UI", sans-serif',f.fillStyle="#0a0e1c",f.textAlign="left",f.textBaseline="middle",f.fillText(`★ ROBOT TELEMETRY // ${O.name}`,24,28),f.font='bold 20px "Inter", sans-serif',f.fillStyle="#0a0e1c",f.textAlign="right",f.fillText("✕",1e3,28),f.font='bold 16px "Inter", monospace',f.fillStyle=O.accentColor,f.fillText(O.designation,24,82);const L=24,te=530;let se=118;O.stats.slice(0,8).forEach((Se,N)=>{const b=N%2===0,z=b?L:te;!b&&N>0&&(se+=52),f.fillStyle="rgba(255, 255, 255, 0.05)",f.fillRect(z,se-18,470,44),f.strokeStyle="rgba(255, 255, 255, 0.12)",f.lineWidth=1,f.strokeRect(z,se-18,470,44),f.font='bold 12px "Inter", monospace',f.fillStyle="#94a3b8",f.textAlign="left",f.fillText(Se.label,z+12,se-2),f.font='bold 15px "Inter", sans-serif',f.fillStyle="#f8fafc",f.fillText(Se.value,z+12,se+16)}),f.fillStyle="rgba(255, 255, 255, 0.04)",f.fillRect(24,342,976,146),f.strokeStyle="rgba(255, 255, 255, 0.1)",f.strokeRect(24,342,976,146),f.font='bold 13px "Inter", monospace',f.fillStyle=O.accentColor,f.fillText("MISSION OVERVIEW & ROBOTIC ANALYSIS",38,362),f.font='14px "Inter", sans-serif',f.fillStyle="#cbd5e1",ee(f,O.summary,38,386,948,20),c.needsUpdate=!0}function Z(O){A.innerHTML=`
      <div style="padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.12); display: flex; justify-content: space-between; align-items: center; background: rgba(15, 23, 42, 0.6);">
        <div>
          <div style="font-size: 11px; letter-spacing: 1.5px; color: ${O.accentColor}; font-weight: 800; font-family: monospace;">AUTONOMOUS FLEET // ROBOT TELEMETRY</div>
          <div style="font-size: 22px; font-weight: 900; letter-spacing: 0.5px; color: #fff; margin-top: 2px;">${O.name}</div>
        </div>
        <button id="close-robot-hud" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #fff; width: 34px; height: 34px; border-radius: 8px; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s;">✕</button>
      </div>

      <div style="padding: 18px 20px;">
        <div style="font-size: 13px; color: ${O.accentColor}; font-weight: 700; margin-bottom: 14px; font-family: monospace; letter-spacing: 0.5px;">${O.designation}</div>

        <div style="display: grid; grid-template-columns: 1fr; gap: 10px; margin-bottom: 18px;">
          ${O.stats.map(te=>`
            <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px 14px;">
              <div style="font-size: 11px; color: #94a3b8; font-family: monospace; font-weight: 700; letter-spacing: 0.5px;">${te.label}</div>
              <div style="font-size: 14px; color: #f8fafc; font-weight: 600; margin-top: 2px;">${te.value}</div>
            </div>
          `).join("")}
        </div>

        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
          <div style="font-size: 11px; color: ${O.accentColor}; font-family: monospace; font-weight: 800; letter-spacing: 1px; margin-bottom: 6px;">ROBOTIC MISSION PROFILE</div>
          <div style="font-size: 13px; color: #cbd5e1; line-height: 1.6;">${O.summary}</div>
        </div>
      </div>
    `;const L=A.querySelector("#close-robot-hud");L&&(L.onclick=()=>re()),A.style.transform="translateY(0)",A.style.opacity="1"}function ee(O,L,te,se,Se,N){const b=L.split(" ");let z="";for(let F=0;F<b.length;F++){const k=z+b[F]+" ";O.measureText(k).width>Se&&F>0?(O.fillText(z,te,se),z=b[F]+" ",se+=N):z=k}O.fillText(z,te,se)}function q(O,L){const te=Cs[L];if(!te)return;typeof window<"u"&&window.__sim&&(window.__sim.scientistTelemetry?.deselect(),window.__sim.rocketTelemetry?.deselect(),window.__sim.astroCtx?.telemetry?.deselect()),_={group:O,dataKey:L};const se=parseInt(te.accentColor.replace("#","0x"),16);x.color.setHex(se),C.color.setHex(se),V(te),S.visible=!0,Qt()||Z(te);const Se=n||(typeof window<"u"?window.__sim?.controls:null);if(e&&Se){n=Se,n.enablePan!==void 0&&(r=n.enablePan,n.enablePan=!1);const N=new E;O.getWorldPosition(N);const b=L==="Pragyan"?.45:.75,z=new E(N.x,N.y+b,N.z),F=e.position.clone().sub(z);F.y=0,F.lengthSq()<.04?F.set(0,0,1):F.normalize();const k=L==="Pragyan"?2.5:2.8,T=L==="Pragyan"?1.35:1.65;d.copy(F).multiplyScalar(k),d.y=T-z.y,p.copy(e.position),h.copy(n.target),m.copy(z),t=0,s=!0,i=!0,n.autoRotate=!1}}function re(){n&&r!==void 0&&(n.enablePan=r),_=null,i=!1,s=!1,S.visible=!1,A.style.transform="translateY(120%)",A.style.opacity="0"}function X(O=.016){if(!S.visible||!_||!_.group)return;const L=new E;_.group.getWorldPosition(L);const te=_.dataKey==="Pragyan"?.48:.88,se=L.y+te+.52,Se=L.clone();if(e){const z=new E(1,0,0).applyQuaternion(e.quaternion);Se.add(z.multiplyScalar(.48))}else Se.x+=.48;Se.y=se,I.position.copy(Se),e&&I.quaternion.copy(e.quaternion);const N=H.attributes.position.array;N[0]=L.x,N[1]=L.y+te,N[2]=L.z,N[3]=Se.x,N[4]=Se.y-.28,N[5]=Se.z,H.attributes.position.needsUpdate=!0,g.position.set(L.x,.02,L.z),g.rotation.z+=O*1.5;const b=n||(typeof window<"u"?window.__sim?.controls:null);if(i&&e&&b){if(n=b,typeof window<"u"&&window.__sim?.cameraAnim?.isTransitioning){re();return}const z=_.dataKey==="Pragyan"?.45:.75,F=new E(L.x,L.y+z,L.z);if(s){t+=O;const k=Math.min(1,t/u),T=k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2,le=F.clone().add(d);e.position.lerpVectors(p,le,T),n.target.lerpVectors(h,F,T),n.update(),Jo(e,n),k>=1&&(s=!1,m.copy(F))}else{const k=F.clone().sub(n.target),T=Math.min(1,O*10),le=k.multiplyScalar(T);n.target.add(le),e.position.add(le),n.update(),Jo(e,n)}}}return{selectRobot:q,deselect:re,update:X,cardGroup:S,setControls:v,get isTrackingCamera(){return i},getCurrentTarget:()=>_}}function Es(a,e,o=null){const n=new J;n.name="MobileRobotsFleet",a.add(n);const i=Is(a,e,o),s=new J;s.name="R2D2",n.add(s);const t=new B({color:16119802,roughness:.35,metalness:.12}),r=new B({color:675517,roughness:.3,metalness:.45}),u=new B({color:14476012,roughness:.22,metalness:.82}),p=new B({color:1711652,roughness:.6,metalness:.5}),h=new xe({color:329744,roughness:.1,metalness:.9,clearcoat:1}),d=.2,m=.46,v=.44,S=new l(new D(d,d,m,32),t);S.position.y=v,S.castShadow=!0,s.add(S);const y=new l(new D(.38,.38,.95,16),new _e({visible:!1}));y.position.y=.45,y.name="HitMesh_R2D2",y.userData={isRobot:!0,robotKey:"R2D2"},s.add(y);for(let ae=0;ae<4;ae++){const Le=new l(new Ee(.08,.08,.015),r),G=(ae-1.5)*.35;Le.position.set(Math.sin(G)*(d+.005),v+.08,Math.cos(G)*(d+.005)),Le.rotation.y=G,s.add(Le)}const f=new l(new Ee(.12,.09,.015),u);f.position.set(0,v-.12,d+.005),s.add(f);const c=new J;c.position.set(0,v+m/2,0),s.add(c);const P=new l(new qe(d,32,16,0,Math.PI*2,0,Math.PI*.5),u);P.castShadow=!0,c.add(P);const M=new l(new D(d*1.002,d*1.002,.035,32,1,!0),r);M.position.y=.02,c.add(M);for(let ae=0;ae<6;ae++){const Le=new l(new Ee(.05,.06,.01),r),G=ae/6*Math.PI*2;Le.position.set(Math.sin(G)*(d*.88),.11,Math.cos(G)*(d*.88)),Le.rotation.y=G,c.add(Le)}const I=new l(new D(.045,.05,.035,16),p);I.rotation.x=Math.PI/2,I.position.set(0,.1,d*.86),c.add(I);const H=new l(new qe(.032,16,16),h);H.position.set(0,.1,d*.9),c.add(H);const x=new l(new D(.025,.03,.03,16),u);x.rotation.x=Math.PI/2.2,x.position.set(.08,.07,d*.86),c.add(x);const R=new _e({color:58879,transparent:!0,opacity:0,blending:ot,side:Ve,depthWrite:!1}),w=new l(new Ye(.35,1.2,16,1,!0),R);w.rotation.x=-Math.PI/2.2,w.position.set(.08,.07,d*.86+.6),c.add(w);const C=new _e({color:16716066}),g=new _e({color:58879}),A=new l(new Ee(.02,.03,.01),C);A.position.set(-.06,.12,d*.88),c.add(A);const _=new l(new Ee(.02,.025,.01),g);_.position.set(-.06,.07,d*.88),c.add(_);const V=.06,Z=.08,ee=.52;[-.25,.25].forEach(ae=>{const Le=new J;Le.position.set(ae,v+.16,0),s.add(Le);const G=new l(new D(.07,.07,.04,24),u);G.rotation.z=Math.PI/2,Le.add(G);const W=new l(new Ee(V,ee,Z),t);W.position.set(0,-ee/2,0),W.castShadow=!0,Le.add(W);const U=new l(new Ee(V+.005,.16,.04),r);U.position.set(0,-ee*.45,0),Le.add(U);const Q=new l(new Ee(.12,.07,.24),t);Q.position.set(0,-ee-.02,0),Q.castShadow=!0,Le.add(Q);const ce=new l(new D(.028,.028,.09,16),p);ce.rotation.z=Math.PI/2,ce.position.set(0,-ee-.045,.06),Le.add(ce);const ve=new l(new D(.028,.028,.09,16),p);ve.rotation.z=Math.PI/2,ve.position.set(0,-ee-.045,-.06),Le.add(ve)});const q=new J;q.position.set(0,.14,.15),s.add(q);const re=new l(new Ee(.06,.14,.06),t);re.rotation.x=Math.PI/8,q.add(re);const X=new l(new Ee(.1,.06,.18),t);X.position.set(0,-.08,.05),q.add(X);const O=new l(new D(.028,.028,.08,16),p);O.rotation.z=Math.PI/2,O.position.set(0,-.1,.05),q.add(O),s.scale.set(1,1,1);const L=new J;L.name="PragyanMoonRover",n.add(L);const te=new B({color:16038706,roughness:.42,metalness:.45,emissive:4008196,emissiveIntensity:.35}),se=new B({color:2237998,roughness:.45,metalness:.75}),Se=new B({color:10133672,roughness:.35,metalness:.85}),N=new xe({color:660520,roughness:.2,metalness:.4,clearcoat:.8}),b=new l(new Ee(.46,.18,.65),te);b.position.y=.26,b.castShadow=!0,L.add(b);const z=new l(new Ee(.72,.65,.88),new _e({visible:!1}));z.position.y=.36,z.name="HitMesh_Pragyan",z.userData={isRobot:!0,robotKey:"Pragyan"},L.add(z);const F=new l(new Ee(.44,.02,.63),se);F.position.set(0,.36,0),L.add(F);const k=new J;k.position.set(0,.37,.05),k.rotation.x=-Math.PI/4.8,L.add(k);const T=new l(new Ee(.5,.015,.44),N);T.castShadow=!0,k.add(T);const le=new l(new Ee(.52,.012,.46),te);k.add(le);const Y=document.createElement("canvas");Y.width=256,Y.height=128;const j=Y.getContext("2d");j.fillStyle="#ff9933",j.fillRect(0,0,256,32),j.fillStyle="#ffffff",j.fillRect(0,32,256,32),j.fillStyle="#138808",j.fillRect(0,64,256,32),j.strokeStyle="#000080",j.lineWidth=2,j.beginPath(),j.arc(128,48,12,0,Math.PI*2),j.stroke();for(let ae=0;ae<24;ae++){const Le=ae/24*Math.PI*2;j.beginPath(),j.moveTo(128,48),j.lineTo(128+Math.cos(Le)*12,48+Math.sin(Le)*12),j.stroke()}j.fillStyle="#0a101c",j.fillRect(0,96,256,32),j.font='bold 16px "Inter", sans-serif',j.fillStyle="#ffaa00",j.textAlign="center",j.textBaseline="middle",j.fillText("ISRO // PRAGYAN ROVER",128,112);const Te=new Xe(Y),Oe=new l(new At(.18,.09),new _e({map:Te,side:Ve}));Oe.position.set(.231,.26,.08),Oe.rotation.y=Math.PI/2,L.add(Oe);const ne=Oe.clone();ne.position.set(-.231,.26,.08),ne.rotation.y=-Math.PI/2,L.add(ne);const we=new l(new At(.2,.095),new _e({map:Te,side:Ve}));we.position.set(0,.26,.326),L.add(we);const Me=new J;Me.position.set(.12,.37,.26),L.add(Me);const me=new l(new D(.015,.018,.26,16),te);me.position.y=.13,Me.add(me);const Pe=new J;Pe.position.set(0,.26,0),Me.add(Pe);const $=new l(new Ee(.14,.05,.06),se);Pe.add($),[-.045,.045].forEach(ae=>{const Le=new l(new D(.016,.018,.025,16),h);Le.rotation.x=Math.PI/2,Le.position.set(ae,0,.035),Pe.add(Le)});const pe=new _e({color:1096065}),ue=new l(new qe(.012,12,12),pe);ue.position.set(0,.035,.03),Pe.add(ue);const be=new J;be.position.set(0,.22,-.34),L.add(be);const ye=new l(new D(.04,.05,.08,16),te);ye.rotation.x=Math.PI/3,be.add(ye);const Fe=[],ke=.095,ge=.065,Be=[-.25,0,.25];[-.28,.28].forEach(ae=>{const Le=new l(new Ee(.025,.03,.54),se);Le.position.set(ae*.9,.16,0),L.add(Le),Be.forEach(G=>{const W=new J;W.position.set(ae,ke,G),L.add(W);const U=new l(new D(ke,ke,ge,24),Se);U.rotation.z=Math.PI/2,U.castShadow=!0,W.add(U);for(let Q=0;Q<12;Q++){const ce=Q/12*Math.PI*2,ve=new l(new Ee(ge+.005,.012,.008),se);ve.position.set(0,Math.sin(ce)*ke,Math.cos(ce)*ke),W.add(ve)}Fe.push(W)})}),L.scale.set(1,1,1),s.position.set(2.5,0,3.5),L.position.set(-2.5,0,-3.5);const Re=15.5,ze=3.6,De=[new E(12,0,0),new E(3.71,0,11.41),new E(-9.71,0,7.05),new E(-9.71,0,-7.05),new E(3.71,0,-11.41)],K={pos:s.position,yaw:.5,targetYaw:.5,speed:1.1,turnTimer:0,domeAngle:0,targetDomeAngle:0,headTurnTimer:0,isInteracting:!1},de={pos:L.position,yaw:Math.PI+.4,targetYaw:Math.PI+.4,speed:.95,turnTimer:0,mastAngle:0,targetMastAngle:0,wheelAngle:0,isInteracting:!1};let oe=0,Ge=6;const Ue=2.8,Ie=(ae,Le)=>{const G=Math.min(Le,.1),W=K.pos.distanceTo(de.pos);if(Ge-=G,!K.isInteracting&&Ge<=0&&W<3.2){K.isInteracting=!0,de.isInteracting=!0,oe=Ue;const U=de.pos.clone().sub(K.pos).normalize(),Q=K.pos.clone().sub(de.pos).normalize();K.targetYaw=Math.atan2(U.x,U.z),de.targetYaw=Math.atan2(Q.x,Q.z)}if(K.isInteracting)oe-=G,K.speed=et.lerp(K.speed,0,G*6),de.speed=et.lerp(de.speed,0,G*6),K.yaw=et.lerp(K.yaw,K.targetYaw,G*4),de.yaw=et.lerp(de.yaw,de.targetYaw,G*4),c.rotation.y=Math.sin(ae*9)*.65,R.opacity=Math.sin(ae*12)>0?.65:.15,C.color.setHex(Math.sin(ae*16)>0?16711748:4456465),g.color.setHex(Math.cos(ae*16)>0?65535:8772),Pe.rotation.y=Math.sin(ae*6)*.45,pe.color.setHex(Math.sin(ae*14)>0?1096065:16096779),oe<=0&&(K.isInteracting=!1,de.isInteracting=!1,Ge=18+Math.random()*12,K.targetYaw+=(Math.random()>.5?1:-1)*(Math.PI*.6+Math.random()*.5),de.targetYaw+=(Math.random()>.5?1:-1)*(Math.PI*.6+Math.random()*.5),K.speed=1.1,de.speed=.95,R.opacity=0,Pe.rotation.y=0);else{R.opacity=0,K.turnTimer-=G,K.turnTimer<=0&&(K.turnTimer=3.5+Math.random()*4,K.targetYaw+=(Math.random()-.5)*1.4),Math.hypot(K.pos.x,K.pos.z)>Re&&(K.targetYaw=Math.atan2(-K.pos.x,-K.pos.z)),De.forEach(We=>{if(K.pos.distanceTo(We)<ze){const je=K.pos.clone().sub(We).normalize();K.targetYaw=Math.atan2(je.x,je.z)}}),K.yaw=et.lerp(K.yaw,K.targetYaw,G*2.5);const Q=K.speed*G;K.pos.x+=Math.sin(K.yaw)*Q,K.pos.z+=Math.cos(K.yaw)*Q,s.rotation.y=K.yaw,s.rotation.z=Math.sin(ae*8)*.02,K.headTurnTimer-=G,K.headTurnTimer<=0&&(K.headTurnTimer=2+Math.random()*3,K.targetDomeAngle=(Math.random()-.5)*1.2),K.domeAngle=et.lerp(K.domeAngle,K.targetDomeAngle,G*3),c.rotation.y=K.domeAngle,C.color.setHex(Math.sin(ae*5)>0?16720418:5570560),g.color.setHex(Math.cos(ae*4)>0?58879:13158),de.turnTimer-=G,de.turnTimer<=0&&(de.turnTimer=4+Math.random()*5,de.targetYaw+=(Math.random()-.5)*1.2),Math.hypot(de.pos.x,de.pos.z)>Re&&(de.targetYaw=Math.atan2(-de.pos.x,-de.pos.z)),De.forEach(We=>{if(de.pos.distanceTo(We)<ze){const je=de.pos.clone().sub(We).normalize();de.targetYaw=Math.atan2(je.x,je.z)}}),de.yaw=et.lerp(de.yaw,de.targetYaw,G*2.2);const ve=de.speed*G;de.pos.x+=Math.sin(de.yaw)*ve,de.pos.z+=Math.cos(de.yaw)*ve,L.rotation.y=de.yaw,de.wheelAngle+=ve/ke,Fe.forEach(We=>{We.children[0].rotation.x=de.wheelAngle}),Pe.rotation.y=Math.sin(ae*1.5)*.15,pe.color.setHex(Math.sin(ae*3)>0?1096065:344096)}i.update(G)},He=[y,z,s,L],$e=new Jt,tt=new Ne;let dt={x:0,y:0,time:0};const Qe=ae=>{dt={x:ae.clientX??ae.touches?.[0]?.clientX??0,y:ae.clientY??ae.touches?.[0]?.clientY??0,time:performance.now()}},ht=ae=>{if(!e)return;const Le=ae.clientX??ae.changedTouches?.[0]?.clientX??0,G=ae.clientY??ae.changedTouches?.[0]?.clientY??0,W=Math.hypot(Le-dt.x,G-dt.y),U=performance.now()-dt.time;if(W>14||U>650||ae.target&&(ae.target.closest("#robot-telemetry-hud")||ae.target.closest("#celestial-telemetry-hud")||ae.target.closest("#rocket-telemetry-hud")||ae.target.closest("#hud-container")||ae.target.closest(".hud-panel")||ae.target.closest("button")||ae.target.closest("input")))return;tt.x=Le/window.innerWidth*2-1,tt.y=-(G/window.innerHeight)*2+1,$e.setFromCamera(tt,e);const Q=$e.intersectObjects(He,!0);if(Q.length>0){let ce=null,ve=null;for(const We of Q){let je=We.object;for(;je;){if(je.userData?.robotKey){ce=je.userData.robotKey,ve=ce==="Pragyan"?L:s;break}if(je===s){ce="R2D2",ve=s;break}if(je===L){ce="Pragyan",ve=L;break}je=je.parent}if(ce)break}ce&&ve&&(i.getCurrentTarget()?.dataKey===ce?i.deselect():i.selectRobot(ve,ce))}else i.getCurrentTarget()&&i.deselect()};window.addEventListener("pointerdown",Qe,{passive:!0}),window.addEventListener("pointerup",ht,{passive:!0});function wt(ae=2.8){K.isInteracting=!0,de.isInteracting=!0,oe=ae;const Le=de.pos.clone().sub(K.pos).normalize(),G=K.pos.clone().sub(de.pos).normalize();K.targetYaw=Math.atan2(Le.x,Le.z),de.targetYaw=Math.atan2(G.x,G.z),K.yaw=K.targetYaw,de.yaw=de.targetYaw,s.rotation.y=K.yaw,L.rotation.y=de.yaw}return{group:n,r2d2:s,pragyan:L,r2State:K,pragyanState:de,telemetry:i,update:Ie,triggerInteraction:wt,setControls:ae=>i.setControls(ae),selectRobot:ae=>i.selectRobot(ae==="Pragyan"?L:s,ae),deselect:()=>i.deselect()}}const uo={pslv:{id:"pslv",name:"PSLV",fullName:"POLAR SATELLITE LAUNCH VEHICLE",operator:"ISRO (INDIA)",category:"ISRO OPERATIONAL",status:"OPERATIONAL",statusColor:"#10b981",accentColor:"#00e5ff",height:"44.0 m (144.3 ft)",diameter:"2.8 m (9.2 ft)",liftOffMass:"320 tonnes (XL variant)",stages:"4 Stages (Solid / Liquid / Solid / Liquid)",payloadLeo:"1,750 kg to Sun-Synchronous Polar Orbit (600 km)",payloadGto:"1,425 kg to Sub-GTO",propulsion:"PS1 Solid (HTPB) + 6 PSOM-XL strap-ons, PS2 Vikas Liquid (UDMH+N₂O₄), PS3 Solid, PS4 Dual Liquid (MMH+MON-3)",firstFlight:"September 20, 1993 (59+ launches)",famousMissions:"Chandrayaan-1 (2008), Mars Orbiter Mission / Mangalyaan (2013), Aditya-L1 (2023), World Record 104 Satellites in Single Flight (PSLV-C37, 2017).",description:`Widely revered as the "Workhorse of ISRO", PSLV is India's third-generation launch vehicle. Equipped with alternating solid and liquid propulsion stages, PSLV has established an internationally renowned track record for precision orbital injection, launching satellites from over 36 countries across polar, geosynchronous, and deep-space trajectories.`},lvm3:{id:"lvm3",name:"LVM3",fullName:"LAUNCH VEHICLE MARK-3 (GSLV MK III)",operator:"ISRO (INDIA)",category:"ISRO OPERATIONAL",status:"OPERATIONAL",statusColor:"#10b981",accentColor:"#f59e0b",height:"43.5 m (142.7 ft)",diameter:"4.0 m core / 5.0 m fairing",liftOffMass:"640 tonnes",stages:"3 Stages (Solid Boosters + Liquid Core + Cryogenic Upper Stage)",payloadLeo:"8,000 kg to Low Earth Orbit",payloadGto:"4,300 kg to Geosynchronous Transfer Orbit",propulsion:"2× S200 Solid Strap-ons (207 t solid each), L110 Core with 2× Vikas liquid engines, C25 Cryogenic Upper Stage (CE-20 engine, 200 kN thrust, LH₂+LOX)",firstFlight:"December 18, 2014 (Experimental) / June 5, 2017 (Orbital)",famousMissions:"Chandrayaan-2 (2019), Chandrayaan-3 (Historic Lunar South Pole Landing, 2023), OneWeb 72-satellite commercial constellations, Gaganyaan TV-D1 test.",description:"LVM3 is India’s heaviest operational orbital launch vehicle. Powered by the world’s second-largest solid rocket boosters (S200) and the indigenous CE-20 cryogenic engine, LVM3 achieved the historic Chandrayaan-3 lunar landing mission and is fully human-rated for India's upcoming Gaganyaan crewed spaceflights."},gslv:{id:"gslv",name:"GSLV MK II",fullName:"GEOSYNCHRONOUS SATELLITE LAUNCH VEHICLE",operator:"ISRO (INDIA)",category:"ISRO OPERATIONAL",status:"OPERATIONAL",statusColor:"#10b981",accentColor:"#38bdf8",height:"51.7 m (169.6 ft)",diameter:"2.8 m core / 3.4 m fairing",liftOffMass:"414 tonnes",stages:"3 Stages (Solid Core + 4 Liquid Strap-ons + Liquid GS2 + Cryogenic CUS)",payloadLeo:"5,000 kg to Low Earth Orbit",payloadGto:"2,500 kg to Geosynchronous Transfer Orbit",propulsion:"S139 Solid Core + 4× L40 Vikas Liquid Strap-ons, GS2 Vikas Liquid Stage, CUS indigenous Cryogenic Upper Stage (CE-7.5 engine, LH₂+LOX)",firstFlight:"April 18, 2001 (Indigenous Cryogenic Mark-II operational since 2014)",famousMissions:"GSAT communication fleet (GSAT-6, 7A, 9 South Asia Satellite), INSAT weather satellites, NVS-01 Navigation Satellite (NavIC constellation).",description:"GSLV Mk II solved one of India’s most critical aerospace challenges by demonstrating full mastery over the indigenous cryogenic upper stage (CE-7.5). Operating with liquid hydrogen and liquid oxygen at 20 Kelvin (-253°C), GSLV regularly deploys India’s national telecommunications and NavIC satellites."},sounding:{id:"sounding",name:"SOUNDING ROCKET",fullName:"ROHINI RH-200 METEOROLOGICAL ROCKET",operator:"ISRO (INDIA)",category:"ISRO OPERATIONAL",status:"OPERATIONAL",statusColor:"#10b981",accentColor:"#ef4444",height:"3.5 m (11.5 ft)",diameter:"0.2 m (7.9 in)",liftOffMass:"108 kg",stages:"2 Stages (Solid / Solid)",payloadLeo:"Suborbital Apogee: 70 – 80 km",payloadGto:"N/A (Suborbital Sounding)",propulsion:"Two-stage solid propellant rocket motor with high-energy composite fuel",firstFlight:"Rohini series active since 1967; RH-200 launched over 1,700 times",famousMissions:"Equatorial Electrojet aeronomy surveys, Indian Monsoon upper-atmospheric dynamics, atmospheric chemical payload releases from TERLS (Thumba).",description:"The Rohini Sounding Rocket program was the bedrock of India’s space journey, initiated under Dr. Vikram Sarabhai at Thumba in 1963. The reliable two-stage RH-200 is launched regularly from TERLS to probe equatorial mesosphere phenomena and upper-altitude weather systems."},slv3:{id:"slv3",name:"SLV-3",fullName:"SATELLITE LAUNCH VEHICLE-3",operator:"ISRO (INDIA)",category:"ISRO RETIRED",status:"RETIRED (HISTORIC)",statusColor:"#f59e0b",accentColor:"#d97706",height:"22.7 m (74.5 ft)",diameter:"1.0 m (3.3 ft)",liftOffMass:"17 tonnes",stages:"4 Stages (All-Solid Propellant)",payloadLeo:"40 kg to Low Earth Orbit (300 km)",payloadGto:"N/A",propulsion:"4 Solid propellant rocket motors (composite propellant with open-nozzle control)",firstFlight:"July 18, 1980 (Historical orbital success placing Rohini RS-1 into space)",famousMissions:"Rohini RS-1 (1980), RS-D1 (1981), RS-D2 (1983). Project Director: Dr. A.P.J. Abdul Kalam.",description:"India’s first sovereign satellite launch vehicle. Directed by Dr. A.P.J. Abdul Kalam, the historic launch of SLV-3 on July 18, 1980 catapulted India into the elite club of just six nations possessing independent orbital launch capability. SLV-3 laid the fundamental architecture for all subsequent Indian space vehicles."},aslv:{id:"aslv",name:"ASLV",fullName:"AUGMENTED SATELLITE LAUNCH VEHICLE",operator:"ISRO (INDIA)",category:"ISRO RETIRED",status:"RETIRED",statusColor:"#f59e0b",accentColor:"#b45309",height:"24.0 m (78.7 ft)",diameter:"1.0 m core / 2.8 m booster span",liftOffMass:"41 tonnes",stages:"5 Stages (All-Solid, including 2 Strap-on Solid Boosters)",payloadLeo:"150 kg to 400 km circular Low Earth Orbit",payloadGto:"N/A",propulsion:"5 Solid stages (2 Stage-0 strap-ons identical to core stage 1, bulbous payload fairing)",firstFlight:"March 24, 1987 / Successful orbital injections in 1992 & 1994",famousMissions:"SROSS-C (1992) and SROSS-C2 (1994) missions carrying celestial gamma-ray burst detectors and aeronomy payloads.",description:"Developed as an intermediate technology demonstrator, ASLV pioneered essential launch technologies including strap-on solid booster staging, bulbous payload fairings, canted nozzles, and closed-loop digital autopilot inertial guidance that paved the way directly for the PSLV."},hrlv:{id:"hrlv",name:"HRLV / NGLV",fullName:"HEAVY / HUMAN-RATED REUSABLE LAUNCH VEHICLE",operator:"ISRO (INDIA)",category:"ISRO UNDER DEVELOPMENT",status:"UNDER DEVELOPMENT",statusColor:"#00e5ff",accentColor:"#00e5ff",height:"75.0 m (246 ft)",diameter:"5.4 m (17.7 ft)",liftOffMass:"700 tonnes",stages:"3 Stages (Reusable Methane-LOX Booster + Semi-cryo + Cryogenic)",payloadLeo:"20,000 – 30,000 kg to Low Earth Orbit",payloadGto:"10,000 kg to Geosynchronous Transfer Orbit",propulsion:"Reusable first-stage booster with cluster of methalox (liquid methane + liquid oxygen) engines with grid fins & VTVL landing legs",firstFlight:"Projected 2030 (Development approved by Government of India)",famousMissions:"Bharatiya Antariksh Station (BAS modules), Indian Crewed Lunar Landing (2040), interplanetary deep-space cargo.",description:"HRLV / NGLV (Next Generation Launch Vehicle) is ISRO’s future heavy-lift reusable launch system. Featuring high-efficiency green methalox propulsion, vertical takeoff and vertical propulsive landing (VTVL), and a modular design, it will power India’s permanent space station and human missions to the Moon."},sslv:{id:"sslv",name:"SSLV",fullName:"SMALL SATELLITE LAUNCH VEHICLE",operator:"ISRO / NSIL (INDIA)",category:"ISRO UNDER DEVELOPMENT",status:"UNDER DEVELOPMENT / ROLLOUT",statusColor:"#00e5ff",accentColor:"#38bdf8",height:"34.0 m (111.5 ft)",diameter:"2.0 m (6.6 ft)",liftOffMass:"120 tonnes",stages:"3 Solid Stages + Liquid Velocity Trimming Module (VTM)",payloadLeo:"500 kg to 500 km planar orbit / 300 kg to SSPO",payloadGto:"N/A (Specialized SmallSat launcher)",propulsion:"SS1, SS2, SS3 Solid Propellant stages + Liquid Velocity Trimming Module with multiple reaction thrusters",firstFlight:"August 7, 2022 (D1) / February 10, 2023 (D2 Success) / SSLV-D3 (2024)",famousMissions:"EOS-07 earth observation satellite, Janus-1 (USA), AzaadiSAT-2 student payload. Ready for full commercial transfer to Indian aerospace industry.",description:"SSLV is designed for ultra-rapid turnarounds, capable of being integrated and launched in under 72 hours by a compact operations crew. Aimed at commercial rideshare constellations, SSLV provides dedicated, low-cost access to space for micro, nano, and mini satellites."},apollo11:{id:"apollo11",name:"APOLLO 11 (SATURN V)",fullName:"SATURN V SUPER HEAVY-LIFT LAUNCH VEHICLE",operator:"NASA (USA)",category:"INTERNATIONAL HISTORIC",status:"HISTORIC (RETIRED)",statusColor:"#f59e0b",accentColor:"#eab308",height:"110.6 m (363 ft)",diameter:"10.1 m (33 ft)",liftOffMass:"2,970 tonnes (6.5 million lb)",stages:"3 Stages (S-IC + S-II + S-IVB) + Apollo CSM & Lunar Module + LES Tower",payloadLeo:"140,000 kg (310,000 lb) to Low Earth Orbit",payloadGto:"48,600 kg (107,100 lb) Trans-Lunar Injection (TLI)",propulsion:"S-IC: 5× Rocketdyne F-1 engines (34.5 MN thrust, RP-1/LOX); S-II: 5× J-2 engines (LH₂/LOX); S-IVB: 1× J-2 engine (restartable)",firstFlight:"November 9, 1967 (Apollo 4) / July 16, 1969 (Apollo 11 Moon Landing)",famousMissions:"Apollo 11 (Neil Armstrong & Buzz Aldrin first humans on the Moon, July 20, 1969), Apollo 8 (First lunar orbit), Apollo 13, Skylab orbital space station.",description:"The most powerful launch vehicle ever brought to operational success in human history. Standing 110.6 meters tall and generating 34.5 Meganewtons of liftoff thrust, Saturn V remains the only spacecraft that has propelled human beings beyond Low Earth Orbit to land on another celestial world."},falcon9:{id:"falcon9",name:"FALCON 9",fullName:"FALCON 9 FULL THRUST (BLOCK 5)",operator:"SPACEX (USA)",category:"COMMERCIAL REUSABLE",status:"OPERATIONAL",statusColor:"#10b981",accentColor:"#ffffff",height:"70.0 m (229.6 ft)",diameter:"3.7 m (12.1 ft)",liftOffMass:"549 tonnes",stages:"2 Stages (Reusable Booster + Expendable/Vacuum Second Stage)",payloadLeo:"22,800 kg (Expendable) / 17,500 kg (Drone ship landing recovery)",payloadGto:"8,300 kg (Expendable) / 5,500 kg (Reusable)",propulsion:"Stage 1: 9× SpaceX Merlin 1D engines (RP-1/LOX, 7.6 MN thrust) with 4 titanium grid fins & 4 carbon landing legs; Stage 2: 1× Merlin Vacuum engine",firstFlight:"June 4, 2010 (Over 350+ flights with 300+ booster landings)",famousMissions:"NASA Commercial Crew astronaut launches to ISS, Starlink global broadband constellation, DART asteroid deflection probe, Europa Clipper launch support.",description:"The world's first orbital-class reusable rocket. Falcon 9 revolutionized global space economics through routine vertical propulsive booster recovery on ocean drone ships and landing pads, with individual boosters achieving over 20 successful flights each."},dragon:{id:"dragon",name:"CREW DRAGON",fullName:"SPACEX DRAGON 2 SPACECRAFT & TRUNK",operator:"SPACEX / NASA (USA)",category:"COMMERCIAL SPACECRAFT",status:"OPERATIONAL",statusColor:"#10b981",accentColor:"#38bdf8",height:"8.1 m (26.7 ft) capsule + trunk",diameter:"4.0 m (13.0 ft)",liftOffMass:"12,500 kg",stages:"Reusable Capsule Pressure Vessel + Unpressurized Trunk with Solar Array",payloadLeo:"Crew: Up to 4 – 7 astronauts / 6,000 kg pressurized & trunk cargo",payloadGto:"Orbital Autonomous Rendezvous & Soft Ocean Splashdown Recovery",propulsion:"16× Draco reaction control thrusters + 8× SuperDraco launch abort engines (hypergolic MMH/NTO with 71 kN thrust each)",firstFlight:"March 2, 2019 (Demo-1) / May 30, 2020 (Demo-2 first crewed flight)",famousMissions:"NASA Crew-1 through Crew-9 long-duration ISS expeditions, Inspiration4 (first all-civilian orbital mission), Polaris Dawn commercial spacewalk mission.",description:"The world’s first commercially developed orbital crew transport vehicle. Featuring touchscreen controls, fully autonomous rendezvous and docking to the International Space Station, PICA-X heat shield thermal protection, and quad-parachute water recovery."},vikram1:{id:"vikram1",name:"VIKRAM-1",fullName:"SKYROOT AEROSPACE VIKRAM-1",operator:"SKYROOT AEROSPACE (INDIA)",category:"INDIAN PRIVATE SPACE",status:"OPERATIONAL TESTING / IMMINENT",statusColor:"#10b981",accentColor:"#f97316",height:"20.0 m (65.6 ft)",diameter:"1.7 m (5.6 ft)",liftOffMass:"30 tonnes",stages:"3 Solid Stages (Kalam Series) + 1 Liquid Upper Stage (Raman Engine)",payloadLeo:"480 kg to 500 km Low Inclination Orbit / 290 kg to SSPO",payloadGto:"N/A (Dedicated SmallSat commercial launch)",propulsion:"Kalam-1200, Kalam-250, Kalam-100 high-strength carbon composite solid motors + Raman 4× 3D-printed bi-propellant liquid upper stage",firstFlight:"Suborbital precursor Vikram-S launched Nov 18, 2022 (Mission Prarambh)",famousMissions:"Mission Prarambh (First privately developed rocket launched from India), upcoming orbital maiden test launch.",description:"Spearheading India’s private NewSpace revolution, Vikram-1 is an all-carbon-fiber multi-stage launch vehicle built by Skyroot Aerospace in Hyderabad. Equipped with state-of-the-art 3D-printed liquid engines (Raman) and solid rocket motors named after Dr. A.P.J. Abdul Kalam."},vikram2:{id:"vikram2",name:"VIKRAM-2",fullName:"SKYROOT AEROSPACE VIKRAM-2 (CRYOGENIC)",operator:"SKYROOT AEROSPACE (INDIA)",category:"INDIAN PRIVATE SPACE",status:"UNDER DEVELOPMENT",statusColor:"#00e5ff",accentColor:"#06b6d4",height:"24.0 m (78.7 ft)",diameter:"1.7 m (5.6 ft)",liftOffMass:"38 tonnes",stages:"Multi-stage with 3D-Printed Cryogenic Upper Stage (Dhawan Engine)",payloadLeo:"592 kg to 500 km Low Earth Orbit / 400 kg to SSPO",payloadGto:"Multi-orbit satellite constellation injection",propulsion:"Carbon composite solid booster stages + Dhawan-II indigenous 3D-printed Cryogenic Upper Stage (Liquid Methane LNG + Liquid Oxygen)",firstFlight:"Target 2025–2026 (Dhawan-I and Dhawan-II cryogenic tests completed successfully)",famousMissions:"Dedicated commercial small-satellite constellation deployments across multiple independent orbital inclinations.",description:"Vikram-2 represents the cutting edge of Indian private aerospace engineering, featuring the indigenous Dhawan-II cryogenic engine fueled by green liquefied natural gas (LNG) and liquid oxygen. The 3D-printed cryogenic upper stage enables multi-restart capabilities for complex multi-orbit satellite insertions."}};function As(a,e){const o=new J;o.name="RocketTelemetryAnchorGroup",a.add(o);let n=null;const i=new E,s=document.createElement("canvas");s.width=1024,s.height=640;const t=s.getContext("2d"),r=new Xe(s);r.minFilter=Rt,r.magFilter=Rt;const u=new At(1.8,1.125),p=new _e({map:r,transparent:!0,side:Ve,depthWrite:!1}),h=new l(u,p);h.name="Rocket3DTelemetryCard",h.userData={isCardMesh:!0,isRocketCard:!0},h.visible=!1,o.add(h);const d=new kt().setFromPoints([new E(0,0,0),new E(.4,.4,0)]),m=new eo({color:58879,transparent:!0,opacity:.85}),v=new go(d,m);v.visible=!1,o.add(v);const S=new _e({color:58879,side:Ve,transparent:!0,opacity:.85}),y=new l(new It(.08,.11,32),S);y.visible=!1,o.add(y);let f=document.getElementById("rocket-telemetry-hud");f||(f=document.createElement("div"),f.id="rocket-telemetry-hud",f.innerHTML=`
      <style>
        #rocket-telemetry-hud {
          position: fixed;
          bottom: 24px;
          right: -520px;
          width: 440px;
          max-width: calc(100vw - 32px);
          max-height: 82vh;
          overflow-y: auto;
          background: rgba(10, 14, 24, 0.94);
          border: 1px solid rgba(0, 229, 255, 0.35);
          border-left: 5px solid #00e5ff;
          border-radius: 14px;
          padding: 22px 24px;
          color: #e2e8f0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.75), 0 0 24px rgba(0, 229, 255, 0.2);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
          opacity: 0;
          z-index: 9999;
          pointer-events: auto;
        }
        #rocket-telemetry-hud.active {
          right: 24px;
          opacity: 1;
        }

        /* ── PORTRAIT MODE (Phones & Tablets) ──
           Transforms the rocket data display into a bottom sheet drawer, keeping the rocket visible above */
        @media (orientation: portrait), (max-width: 640px) and (orientation: portrait) {
          #rocket-telemetry-hud {
            bottom: 74px;
            left: 12px;
            right: 12px;
            top: auto;
            width: auto;
            max-width: calc(100% - 24px);
            max-height: 52vh;
            padding: 16px 18px;
            border-radius: 16px;
            transform: translateY(120%);
            transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
          }
          #rocket-telemetry-hud.active {
            transform: translateY(0);
            right: 12px;
            opacity: 1;
          }
          .rkt-title {
            font-size: 20px;
          }
          .rkt-grid {
            grid-template-columns: 1fr 1fr;
            gap: 8px 10px;
            padding: 10px 12px;
          }
        }

        /* ── LANDSCAPE MODE (Phones, Tablets & iPads — Native & Virtual Rotation) ──
           Adapts into a landscape side-drawer on the right, keeping center and left open for the rocket */
        @media (orientation: landscape) {
          #rocket-telemetry-hud {
            top: 12px;
            bottom: 58px;
            right: -520px;
            left: auto;
            width: 440px;
            max-width: calc(100% - 80px);
            max-height: calc(100% - 70px);
            padding: 14px 18px;
            border-radius: 14px;
            transform: none;
            transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
          }
          #rocket-telemetry-hud.active {
            right: 14px;
            opacity: 1;
          }
          .rkt-title {
            font-size: 20px;
          }
          .rkt-grid {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 6px 10px;
            padding: 8px 12px;
            margin-bottom: 12px;
          }
        }

        body.vz-orientation-landscape #rocket-telemetry-hud {
          top: 12px;
          bottom: 58px;
          right: -520px;
          left: auto;
          width: 440px;
          max-width: calc(100% - 80px);
          max-height: calc(100% - 70px);
          padding: 14px 18px;
          border-radius: 14px;
          transform: none;
          transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
        }
        body.vz-orientation-landscape #rocket-telemetry-hud.active {
          right: 14px;
          opacity: 1;
        }
        body.vz-orientation-landscape .rkt-grid {
          grid-template-columns: 1fr 1fr 1fr;
          gap: 6px 10px;
          padding: 8px 12px;
          margin-bottom: 12px;
        }
          .rkt-section {
            margin-bottom: 10px;
          }
          .rkt-sec-body {
            font-size: 11.5px;
            line-height: 1.4;
          }
          .rkt-missions {
            font-size: 10.5px;
            line-height: 1.4;
            padding: 6px 8px;
            margin-bottom: 10px;
          }
        }
        .rkt-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          padding-bottom: 12px;
        }
        .rkt-title-area {
          flex: 1;
        }
        .rkt-title {
          font-size: 24px;
          font-weight: 900;
          letter-spacing: 0.05em;
          color: #ffffff;
          line-height: 1.1;
          margin-bottom: 4px;
        }
        .rkt-sub {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #00e5ff;
          text-transform: uppercase;
        }
        .rkt-close {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #e2e8f0;
          font-size: 16px;
          font-weight: bold;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .rkt-close:hover {
          background: rgba(239, 68, 68, 0.4);
          border-color: #ef4444;
          color: #ffffff;
        }
        .rkt-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 3px 8px;
          border-radius: 4px;
          margin-bottom: 14px;
          text-transform: uppercase;
        }
        .rkt-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 14px;
          margin-bottom: 16px;
          background: rgba(0, 0, 0, 0.25);
          padding: 12px 14px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .rkt-stat {
          display: flex;
          flex-direction: column;
        }
        .rkt-stat-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #94a3b8;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        .rkt-stat-val {
          font-size: 12px;
          font-weight: 700;
          color: #f8fafc;
        }
        .rkt-section {
          margin-bottom: 14px;
        }
        .rkt-sec-title {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #38bdf8;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .rkt-sec-body {
          font-size: 12px;
          line-height: 1.5;
          color: #cbd5e1;
        }
        .rkt-missions {
          font-size: 11px;
          line-height: 1.45;
          color: #fbbf24;
          background: rgba(251, 191, 36, 0.08);
          padding: 8px 10px;
          border-radius: 6px;
          border-left: 3px solid #fbbf24;
          margin-bottom: 14px;
        }
      </style>
      <div class="rkt-header">
        <div class="rkt-title-area">
          <div class="rkt-title" id="rkt-title">PSLV</div>
          <div class="rkt-sub" id="rkt-sub">POLAR SATELLITE LAUNCH VEHICLE // ISRO</div>
        </div>
        <button class="rkt-close" id="rkt-close-btn" title="Close Telemetry">✕</button>
      </div>
      <div id="rkt-badge-container"></div>
      <div class="rkt-grid">
        <div class="rkt-stat">
          <span class="rkt-stat-label">Height</span>
          <span class="rkt-stat-val" id="rkt-height">44.0 m</span>
        </div>
        <div class="rkt-stat">
          <span class="rkt-stat-label">Diameter</span>
          <span class="rkt-stat-val" id="rkt-diameter">2.8 m</span>
        </div>
        <div class="rkt-stat">
          <span class="rkt-stat-label">Liftoff Mass</span>
          <span class="rkt-stat-val" id="rkt-mass">320 tonnes</span>
        </div>
        <div class="rkt-stat">
          <span class="rkt-stat-label">Stages</span>
          <span class="rkt-stat-val" id="rkt-stages">4 Stages</span>
        </div>
        <div class="rkt-stat" style="grid-column: span 2;">
          <span class="rkt-stat-label">Payload Capacity (LEO / Polar)</span>
          <span class="rkt-stat-val" id="rkt-payload-leo">1,750 kg to SSPO</span>
        </div>
        <div class="rkt-stat" style="grid-column: span 2;">
          <span class="rkt-stat-label">Payload Capacity (GTO)</span>
          <span class="rkt-stat-val" id="rkt-payload-gto">1,425 kg to GTO</span>
        </div>
      </div>
      <div class="rkt-section">
        <div class="rkt-sec-title">Propulsion Architecture</div>
        <div class="rkt-sec-body" id="rkt-propulsion">Stage 1 Solid, Stage 2 Vikas...</div>
      </div>
      <div class="rkt-section">
        <div class="rkt-sec-title">Key Missions & Flight Heritage</div>
        <div class="rkt-missions" id="rkt-missions">Chandrayaan-1, Mangalyaan, Aditya-L1...</div>
      </div>
      <div class="rkt-section">
        <div class="rkt-sec-title">Engineering Overview</div>
        <div class="rkt-sec-body" id="rkt-description">...</div>
      </div>
    `,oo().appendChild(f),document.getElementById("rkt-close-btn")?.addEventListener("click",R=>{R.stopPropagation(),I()}));function c(x,R,w,C,g,A,_=4){if(!R)return C;const V=R.split(" ");let Z="",ee=0;for(let q=0;q<V.length;q++){const re=Z+V[q]+" ";if(x.measureText(re).width>g&&q>0){if(ee++,ee>=_)return x.fillText(Z.trim()+"...",w,C),C+A;x.fillText(Z,w,C),Z=V[q]+" ",C+=A}else Z=re}return x.fillText(Z,w,C),C+A}function P(x){t.clearRect(0,0,1024,640),t.fillStyle="rgba(7, 11, 20, 0.94)",t.fillRect(0,0,1024,640),t.strokeStyle=x.accentColor,t.lineWidth=3,t.strokeRect(4,4,1016,632);const R=20;t.lineWidth=4,t.strokeStyle=x.accentColor,t.beginPath(),t.moveTo(4,4+R),t.lineTo(4,4),t.lineTo(4+R,4),t.stroke(),t.beginPath(),t.moveTo(1020-R,4),t.lineTo(1020,4),t.lineTo(1020,4+R),t.stroke(),t.beginPath(),t.moveTo(4,636-R),t.lineTo(4,636),t.lineTo(4+R,636),t.stroke(),t.beginPath(),t.moveTo(1020-R,636),t.lineTo(1020,636),t.lineTo(1020,636-R),t.stroke(),t.fillStyle=x.accentColor,t.fillRect(4,4,1016,52),t.textAlign="right",t.font='bold 14px "Inter", monospace';const w=`● [${x.status}]  ✕`,C=t.measureText(w).width;t.fillStyle="#0a0e1c",t.fillText(w,1e3,30),t.textAlign="left",t.textBaseline="middle",t.font='900 21px "Inter", "Segoe UI", sans-serif',t.fillStyle="#0a0e1c";let g=`★ ${x.name}`;x.fullName&&x.fullName!==x.name&&(g+=` — ${x.fullName}`);const A=1e3-C-44;if(t.measureText(g).width>A){for(;t.measureText(g+"…").width>A&&g.length>8;)g=g.slice(0,-1);g=g.trim()+"…"}t.fillText(g,24,30),t.textAlign="left",t.textBaseline="alphabetic",t.font='bold 14px "Inter", monospace',t.fillStyle="#94a3b8",t.fillText(`OPERATOR: ${x.operator}   |   CATEGORY: ${x.category}`,24,82),t.fillStyle="rgba(255, 255, 255, 0.03)",t.fillRect(20,96,984,126),t.strokeStyle="rgba(255, 255, 255, 0.08)",t.lineWidth=1,t.strokeRect(20,96,984,126);const _=36,V=520;t.font='bold 12px "Inter", monospace',t.fillStyle="#94a3b8",t.fillText("HEIGHT:",_,120),t.font='bold 13px "Inter", sans-serif',t.fillStyle="#ffffff",t.fillText(x.height,_+130,120),t.font='bold 12px "Inter", monospace',t.fillStyle="#94a3b8",t.fillText("DIAMETER:",_,148),t.font='bold 13px "Inter", sans-serif',t.fillStyle="#ffffff",t.fillText(x.diameter,_+130,148),t.font='bold 12px "Inter", monospace',t.fillStyle="#94a3b8",t.fillText("LIFTOFF MASS:",_,176),t.font='bold 13px "Inter", sans-serif',t.fillStyle="#ffffff",t.fillText(x.liftOffMass,_+130,176),t.font='bold 12px "Inter", monospace',t.fillStyle="#94a3b8",t.fillText("STAGES:",_,204),t.font='bold 13px "Inter", sans-serif',t.fillStyle="#ffffff",t.fillText(x.stages,_+130,204),t.font='bold 12px "Inter", monospace',t.fillStyle="#94a3b8",t.fillText("LEO / POLAR:",V,120),t.font='bold 13px "Inter", sans-serif',t.fillStyle="#ffffff",t.fillText(x.payloadLeo,V+120,120),t.font='bold 12px "Inter", monospace',t.fillStyle="#94a3b8",t.fillText("GTO / TLI:",V,148),t.font='bold 13px "Inter", sans-serif',t.fillStyle="#ffffff",t.fillText(x.payloadGto,V+120,148),t.font='bold 12px "Inter", monospace',t.fillStyle="#94a3b8",t.fillText("FIRST FLIGHT:",V,176),t.font='bold 13px "Inter", sans-serif',t.fillStyle="#ffffff";let Z=x.firstFlight;const ee=350;if(t.measureText(Z).width>ee){for(;t.measureText(Z+"…").width>ee&&Z.length>5;)Z=Z.slice(0,-1);Z=Z.trim()+"…"}t.fillText(Z,V+120,176),t.fillStyle="rgba(0, 229, 255, 0.04)",t.fillRect(20,230,984,106),t.strokeStyle="rgba(0, 229, 255, 0.22)",t.strokeRect(20,230,984,106),t.font='bold 12px "Inter", monospace',t.fillStyle="#00e5ff",t.fillText("PROPULSION ARCHITECTURE",36,250),t.font='13px "Inter", sans-serif',t.fillStyle="#e2e8f0",c(t,x.propulsion,36,272,952,20,3),t.fillStyle="rgba(251, 191, 36, 0.05)",t.fillRect(20,344,984,106),t.strokeStyle="rgba(251, 191, 36, 0.25)",t.strokeRect(20,344,984,106),t.font='bold 12px "Inter", monospace',t.fillStyle="#fbbf24",t.fillText("FLIGHT HERITAGE & FAMOUS MISSIONS",36,364),t.font='13px "Inter", sans-serif',t.fillStyle="#fef08a",c(t,x.famousMissions,36,386,952,20,3),t.fillStyle="rgba(56, 189, 248, 0.04)",t.fillRect(20,458,984,138),t.strokeStyle="rgba(56, 189, 248, 0.18)",t.strokeRect(20,458,984,138),t.font='bold 12px "Inter", monospace',t.fillStyle="#38bdf8",t.fillText("AEROSPACE ENGINEERING OVERVIEW",36,478),t.font='italic 13px "Inter", sans-serif',t.fillStyle="#cbd5e1",c(t,x.description,36,500,952,20,4),t.font='bold 12px "Inter", monospace',t.fillStyle="#64748b",t.textAlign="center",t.fillText("✕ TOUCH CARD, ROCKET OR EMPTY SPACE TO CLOSE TELEMETRY",512,622),r.needsUpdate=!0}function M(x,R){const w=uo[R];if(!w)return;typeof window<"u"&&window.__sim&&(window.__sim.scientistTelemetry?.deselect(),window.__sim.astroCtx?.telemetry?.deselect(),window.__sim.mobileRobots?.telemetry?.deselect()),n=w,P(w);const C=new E;x.getWorldPosition(C);const g=new E(-C.x,0,-C.z).normalize(),A=new E(-g.z,0,g.x),_=C.clone().add(g.clone().multiplyScalar(1.2)).add(A.clone().multiplyScalar(.7)).add(new E(0,1.85,0));i.copy(_),h.position.copy(_),h.visible=!0,y.position.copy(C).add(new E(0,1.85,0)),y.visible=!0;const V=[y.position.clone(),h.position.clone()];v.geometry.setFromPoints(V),m.color.set(w.accentColor),S.color.set(w.accentColor),v.visible=!0;const Z=document.getElementById("rkt-title"),ee=document.getElementById("rkt-sub"),q=document.getElementById("rkt-height"),re=document.getElementById("rkt-diameter"),X=document.getElementById("rkt-mass"),O=document.getElementById("rkt-stages"),L=document.getElementById("rkt-payload-leo"),te=document.getElementById("rkt-payload-gto"),se=document.getElementById("rkt-propulsion"),Se=document.getElementById("rkt-missions"),N=document.getElementById("rkt-description");Z&&(Z.textContent=w.name),ee&&(ee.textContent=`${w.fullName} // ${w.operator}`),q&&(q.textContent=w.height),re&&(re.textContent=w.diameter),X&&(X.textContent=w.liftOffMass),O&&(O.textContent=w.stages),L&&(L.textContent=w.payloadLeo),te&&(te.textContent=w.payloadGto),se&&(se.textContent=w.propulsion),Se&&(Se.textContent=w.famousMissions),N&&(N.textContent=w.description);const b=document.getElementById("rkt-badge-container");b&&(b.innerHTML=`
        <span class="rkt-badge" style="background: ${w.statusColor}22; color: ${w.statusColor}; border: 1px solid ${w.statusColor}66;">
          ● ${w.status}
        </span>
        <span class="rkt-badge" style="background: rgba(255,255,255,0.08); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.15); margin-left: 6px;">
          ${w.category}
        </span>
      `),f.style.borderLeftColor=w.accentColor,f.classList.add("active")}function I(){n=null,h.visible=!1,v.visible=!1,y.visible=!1,f&&f.classList.remove("active")}function H(x,R){if(!n||!h.visible||!e)return;h.quaternion.copy(e.quaternion),y.quaternion.copy(e.quaternion),h.position.y=i.y+Math.sin(x*2)*.03;const w=[y.position.clone(),h.position.clone()];v.geometry.setFromPoints(w);const C=1+Math.sin(x*4)*.08;y.scale.set(C,C,C)}return{selectRocket:M,deselect:I,update:H,getActiveRocket:()=>n,cardMesh:h}}function Rs(a,e,o){const n=new J;n.name="RocketExhibitsMasterGroup",a.add(n);const i=[],s=new B({color:16119802,roughness:.85,metalness:.04}),t=new xe({color:14475496,roughness:.25,metalness:.9,clearcoat:.5}),r=new B({color:15462646,roughness:.6,metalness:.25}),u=new B({color:13159636,roughness:.35,metalness:.85}),p=new B({color:3359061,roughness:.3,metalness:.9}),h=new B({color:2566707,roughness:.28,metalness:.88}),d=new B({color:15051058,roughness:.3,metalness:.85});new B({color:1711656,roughness:.45,metalness:.7});function m({name:N,subtitle:b,isCryoFoam:z=!1,hasTricolor:F=!0}){const k=document.createElement("canvas");k.width=1024,k.height=1024;const T=k.getContext("2d");if(z){const Y=T.createLinearGradient(0,0,1024,0);Y.addColorStop(0,"#be4b18"),Y.addColorStop(.3,"#d35920"),Y.addColorStop(.7,"#c24e1a"),Y.addColorStop(1,"#a83e12"),T.fillStyle=Y,T.fillRect(0,0,1024,1024),T.fillStyle="rgba(0, 0, 0, 0.08)";for(let j=30;j<1024;j+=45)T.fillRect(0,j,1024,3);T.fillStyle="rgba(255, 255, 255, 0.05)";for(let j=33;j<1024;j+=45)T.fillRect(0,j,1024,2)}else{const Y=T.createLinearGradient(0,0,1024,0);Y.addColorStop(0,"#f1f4f8"),Y.addColorStop(.5,"#ffffff"),Y.addColorStop(1,"#e5e9f0"),T.fillStyle=Y,T.fillRect(0,0,1024,1024),T.strokeStyle="rgba(0, 0, 0, 0.12)",T.lineWidth=2;for(let j=60;j<1024;j+=120){T.beginPath(),T.moveTo(0,j),T.lineTo(1024,j),T.stroke(),T.fillStyle="rgba(0, 0, 0, 0.18)";for(let Te=20;Te<1024;Te+=32)T.beginPath(),T.arc(Te,j-4,1.5,0,Math.PI*2),T.fill()}}T.strokeStyle=z?"rgba(0, 0, 0, 0.25)":"rgba(0, 0, 0, 0.10)",T.lineWidth=3,T.beginPath(),T.moveTo(256,0),T.lineTo(256,1024),T.moveTo(768,0),T.lineTo(768,1024),T.stroke(),F&&[256,768].forEach(Y=>{const Te=Y-100,Oe=160;T.fillStyle="#ff9933",T.fillRect(Te,Oe,200,33),T.fillStyle="#ffffff",T.fillRect(Te,Oe+33,200,34),T.fillStyle="#138808",T.fillRect(Te,Oe+67,200,33),T.strokeStyle="#000080",T.lineWidth=2.5,T.beginPath(),T.arc(Y,Oe+50,14,0,Math.PI*2),T.stroke();for(let ne=0;ne<24;ne++){const we=ne/24*Math.PI*2;T.beginPath(),T.moveTo(Y,Oe+50),T.lineTo(Y+Math.cos(we)*13,Oe+50+Math.sin(we)*13),T.stroke()}}),[256,768].forEach(Y=>{T.fillStyle="#0284c7",T.beginPath(),T.moveTo(Y,290),T.lineTo(Y+28,335),T.lineTo(Y+12,330),T.lineTo(Y,310),T.lineTo(Y-12,330),T.lineTo(Y-28,335),T.closePath(),T.fill(),T.fillStyle="#ea580c",T.beginPath(),T.arc(Y+16,306,10,0,Math.PI*2),T.fill(),T.font='900 46px "Inter", sans-serif',T.fillStyle=z?"#ffffff":"#0f172a",T.textAlign="center",T.fillText("ISRO",Y,388),T.font='bold 30px "Inter", sans-serif',T.fillStyle=z?"#ffedd5":"#ea580c",T.fillText("इसरो  |  भारत",Y,426),T.font='900 64px "Inter", sans-serif',T.fillStyle=z?"#ffffff":"#0f172a",T.fillText(N,Y,540),b&&(T.font='bold 26px "Inter", monospace',T.fillStyle=z?"#ffedd5":"#0284c7",T.fillText(b,Y,585))});const le=new Xe(k);return le.wrapS=Mt,le.wrapT=yt,le}function v(){const N=document.createElement("canvas");N.width=1024,N.height=1024;const b=N.getContext("2d");b.fillStyle="#f8fafc",b.fillRect(0,0,1024,1024),b.fillStyle="#111318",b.fillRect(180,260,240,764),b.fillRect(680,260,240,764),b.strokeStyle="rgba(0, 0, 0, 0.15)",b.lineWidth=2;for(let F=0;F<1024;F+=16)b.beginPath(),b.moveTo(F,0),b.lineTo(F,260),b.stroke();b.fillStyle="#0a0d14",b.fillRect(0,252,1024,8),b.fillRect(0,520,1024,6),[60,560].forEach(F=>{b.save(),b.translate(F,600),b.rotate(-Math.PI/2),b.font='900 52px "Inter", sans-serif',b.fillStyle="#b22234",b.textAlign="center",b.fillText("UNITED STATES",0,0),b.restore();const k=F-50,T=660;b.fillStyle="#ffffff",b.fillRect(k,T,100,55);for(let le=0;le<7;le++)b.fillStyle="#b22234",b.fillRect(k,T+le*8,100,4);b.fillStyle="#3c3b6e",b.fillRect(k,T,44,28)}),[60,560].forEach(F=>{b.font='900 68px "Inter", sans-serif',b.fillStyle="#111318",b.textAlign="center",b.fillText("USA",F,160)});const z=new Xe(N);return z.wrapS=Mt,z.wrapT=yt,z}function S(){const N=document.createElement("canvas");N.width=1024,N.height=1024;const b=N.getContext("2d");b.fillStyle="#f8fafc",b.fillRect(0,0,1024,1024),b.fillStyle="#12141a",b.fillRect(0,0,1024,180),b.strokeStyle="#232733",b.lineWidth=2;for(let F=0;F<1024;F+=32)b.beginPath(),b.moveTo(F,0),b.lineTo(F,180),b.stroke();b.strokeStyle="rgba(0, 0, 0, 0.08)",b.lineWidth=2;for(let F=200;F<1024;F+=140)b.beginPath(),b.moveTo(0,F),b.lineTo(1024,F),b.stroke();[256,768].forEach(F=>{b.save(),b.translate(F,620),b.rotate(-Math.PI/2),b.font='900 76px "Inter", sans-serif',b.fillStyle="#0f172a",b.textAlign="center",b.letterSpacing="12px",b.fillText("SPACEX",0,0),b.restore(),b.font='bold 34px "Inter", sans-serif',b.fillStyle="#334155",b.textAlign="center",b.fillText("FALCON 9",F,280);const k=F-36,T=310;b.fillStyle="#ffffff",b.fillRect(k,T,72,40);for(let le=0;le<7;le++)b.fillStyle="#b22234",b.fillRect(k,T+le*6,72,3);b.fillStyle="#3c3b6e",b.fillRect(k,T,32,21)});const z=new Xe(N);return z.wrapS=Mt,z.wrapT=yt,z}function y({title:N,subtitle:b,accentCol:z="#00e5ff"}){const F=document.createElement("canvas");F.width=1024,F.height=1024;const k=F.getContext("2d");k.fillStyle="#14171e",k.fillRect(0,0,1024,1024);const T=16;for(let Y=0;Y<1024;Y+=T)for(let j=0;j<1024;j+=T){const Te=(j/T+Y/T)%2===0;k.fillStyle=Te?"#1e232d":"#101319",k.fillRect(j,Y,T,T),k.fillStyle=Te?"rgba(255, 255, 255, 0.04)":"rgba(0, 0, 0, 0.2)",k.fillRect(j,Y,T/2,T/2)}k.fillStyle=z,k.fillRect(0,480,1024,8),[256,768].forEach(Y=>{k.fillStyle=z,k.beginPath(),k.moveTo(Y,232),k.lineTo(Y+38,278),k.lineTo(Y+14,272),k.lineTo(Y,254),k.lineTo(Y-14,272),k.lineTo(Y-38,278),k.closePath(),k.fill(),k.font='900 48px "Inter", sans-serif',k.fillStyle="#ffffff",k.textAlign="center",k.fillText(N,Y,340),k.font='bold 24px "Inter", monospace',k.fillStyle=z,k.fillText(b,Y,380);const Te=Y-40,Oe=420;k.fillStyle="#ff9933",k.fillRect(Te,Oe,80,14),k.fillStyle="#ffffff",k.fillRect(Te,Oe+14,80,14),k.fillStyle="#138808",k.fillRect(Te,Oe+28,80,14)});const le=new Xe(F);return le.wrapS=Mt,le.wrapT=yt,le}function f(){const N=document.createElement("canvas");N.width=1024,N.height=1024;const b=N.getContext("2d");b.fillStyle="#f8fafc",b.fillRect(0,0,1024,1024),b.strokeStyle="rgba(0, 0, 0, 0.08)",b.lineWidth=1.5;for(let F=0;F<1024;F+=40)b.beginPath(),b.moveTo(0,F),b.lineTo(1024,F),b.stroke();[256,768].forEach(F=>{b.strokeStyle="#334155",b.lineWidth=4,b.strokeRect(F-65,360,130,200),b.fillStyle="#0f172a",b.beginPath(),b.arc(F,440,28,0,Math.PI*2),b.fill(),b.strokeStyle="#64748b",b.lineWidth=3,b.stroke(),b.font='900 36px "Inter", sans-serif',b.fillStyle="#0f172a",b.textAlign="center",b.fillText("DRAGON",F,630),b.font='bold 20px "Inter", monospace',b.fillStyle="#0284c7",b.fillText("COMMERCIAL CREW",F,665)});const z=new Xe(N);return z.wrapS=Mt,z.wrapT=yt,z}function c(){const N=document.createElement("canvas");N.width=1024,N.height=1024;const b=N.getContext("2d");b.fillStyle="#f8fafc",b.fillRect(0,0,1024,1024),b.fillStyle="#111318",b.fillRect(0,180,1024,220),b.fillRect(0,580,1024,200),[256,768].forEach(F=>{b.font='900 64px "Inter", sans-serif',b.fillStyle="#ffffff",b.textAlign="center",b.fillText("SLV-3",F,305),b.font='900 52px "Inter", sans-serif',b.fillStyle="#111318",b.fillText("ISRO",F,500);const k=F-50,T=830;b.fillStyle="#ff9933",b.fillRect(k,T,100,20),b.fillStyle="#ffffff",b.fillRect(k,T+20,100,20),b.fillStyle="#138808",b.fillRect(k,T+40,100,20)});const z=new Xe(N);return z.wrapS=Mt,z.wrapT=yt,z}const P=new B({map:m({name:"PSLV",subtitle:"POLAR SATELLITE LAUNCH VEHICLE"}),roughness:.35,metalness:.1}),M=new B({map:m({name:"LVM3",subtitle:"CHANDRAYAAN-3",isCryoFoam:!0}),roughness:.55,metalness:.05}),I=new B({map:m({name:"S200",subtitle:"SOLID BOOSTER",hasTricolor:!0}),roughness:.4,metalness:.1}),H=new B({map:m({name:"GSLV",subtitle:"GEOSYNCHRONOUS LAUNCH VEHICLE"}),roughness:.35,metalness:.1}),x=new B({map:v(),roughness:.35,metalness:.12}),R=new B({map:S(),roughness:.32,metalness:.1}),w=new B({map:f(),roughness:.3,metalness:.08}),C=new B({map:y({title:"VIKRAM-I",subtitle:"SKYROOT AEROSPACE",accentCol:"#f97316"}),roughness:.45,metalness:.35}),g=new B({map:y({title:"VIKRAM-II",subtitle:"CRYOGENIC DHAWAN-II",accentCol:"#00e5ff"}),roughness:.45,metalness:.35}),A=new B({map:c(),roughness:.4,metalness:.1}),_=new B({map:m({name:"ASLV",subtitle:"AUGMENTED SATELLITE LAUNCH VEHICLE"}),roughness:.4,metalness:.1}),V=new B({map:m({name:"HRLV",subtitle:"NEXT GEN REUSABLE LAUNCH VEHICLE"}),roughness:.32,metalness:.15}),Z=new B({map:m({name:"SSLV",subtitle:"SMALL SATELLITE LAUNCH VEHICLE"}),roughness:.35,metalness:.1});function ee(N){const b=document.createElement("canvas");b.width=640,b.height=200;const z=b.getContext("2d");z.fillStyle="#ffffff",z.fillRect(0,0,640,200),z.fillStyle=N.accentColor,z.fillRect(0,0,16,200),z.strokeStyle="rgba(0, 0, 0, 0.1)",z.lineWidth=3,z.strokeRect(1,1,638,198),z.font='900 40px "Inter", sans-serif',z.fillStyle="#0f172a",z.textAlign="left",z.textBaseline="top",z.fillText(N.name,36,24),z.font='bold 20px "Inter", monospace',z.fillStyle=N.accentColor,z.fillText(N.operator,36,76),z.fillStyle=N.statusColor,z.font='bold 18px "Inter", monospace',z.fillText(`STATUS: [ ${N.status} ]`,36,112),z.fillStyle="#64748b",z.font='italic 16px "Inter", sans-serif',z.fillText("TOUCH TO VIEW TELEMETRY ➜",36,152);const F=new Xe(b);return new l(new At(.85,.265),new _e({map:F,side:Do}))}function q(N,b,z){for(let F=0;F<4;F++){const k=F/4*Math.PI*2+Math.PI/4,T=new J;T.position.set(Math.cos(k)*(b+.16),z+.02,Math.sin(k)*(b+.16)),T.rotation.y=-k+Math.PI/2;const le=new l(new Ee(.18,.16,.26),u);le.position.y=.08,T.add(le);const Y=new l(new Ee(.08,.32,.12),u);Y.position.set(0,.22,-.1),Y.rotation.x=-.35,T.add(Y);const j=new l(new D(.03,.03,.24,16),p);j.position.set(0,.18,.08),j.rotation.x=.3,T.add(j),N.add(T)}}const re=[{bayIndex:1,rocketId:"slv3"},{bayIndex:3,rocketId:"aslv"},{bayIndex:5,rocketId:"sounding"},{bayIndex:7,rocketId:"pslv"},{bayIndex:9,rocketId:"gslv"},{bayIndex:11,rocketId:"lvm3"},{bayIndex:13,rocketId:"hrlv"},{bayIndex:15,rocketId:"sslv"},{bayIndex:17,rocketId:"apollo11"},{bayIndex:19,rocketId:"falcon9"},{bayIndex:21,rocketId:"dragon"},{bayIndex:23,rocketId:"skyroot"}],X=24,O=16.35;re.forEach(N=>{const b=N.bayIndex/X*Math.PI*2,z=(N.bayIndex+1)/X*Math.PI*2,F=(b+z)/2,k=new J;k.name=`RocketBay_${N.rocketId}`,k.position.set(Math.cos(F)*O,ct,Math.sin(F)*O),k.lookAt(0,ct,0),n.add(k);const le=N.rocketId==="skyroot"?1.55:1.15,Y=.35,j=new l(new D(le,le*1.06,Y,16),s);j.position.y=Y/2,j.castShadow=!0,j.receiveShadow=!0,k.add(j);const Te=new l(new D(le*1.02,le*1.02,.04,16),t);Te.position.y=Y,k.add(Te);const Oe=new l(new D(le*.92,le*.92,.02,32),r);Oe.position.y=Y+.015,Oe.receiveShadow=!0,k.add(Oe);const ne=N.rocketId==="skyroot"?47316:uo[N.rocketId]?.accentColor||58879,we=new l(new at(le*1.04,.018,12,48),new _e({color:ne}));if(we.rotation.x=Math.PI/2,we.position.y=.02,k.add(we),N.rocketId!=="skyroot"){const Me=ee(uo[N.rocketId]);Me.position.set(0,.18,le*.88),Me.rotation.x=-.32,k.add(Me)}N.rocketId==="pslv"?Ps(k,Y,i,P,h,d,q):N.rocketId==="lvm3"?Os(k,Y,i,M,I,h,q):N.rocketId==="gslv"?ks(k,Y,i,H,h,q):N.rocketId==="sounding"?Ls(k,Y,i):N.rocketId==="slv3"?Ns(k,Y,i,A,h,q):N.rocketId==="aslv"?_s(k,Y,i,_,h,q):N.rocketId==="hrlv"?zs(k,Y,i,V,h,q):N.rocketId==="sslv"?Ds(k,Y,i,Z,h,q):N.rocketId==="apollo11"?Gs(k,Y,i,x,h,q):N.rocketId==="falcon9"?Us(k,Y,i,R,h,q):N.rocketId==="dragon"?Hs(k,Y,i,w):N.rocketId==="skyroot"&&Fs(k,Y,i,C,g,h,ee,q)}),e.cardMesh&&i.push(e.cardMesh);let L={x:0,y:0,time:0};const te=N=>{L={x:N.clientX??N.touches?.[0]?.clientX??0,y:N.clientY??N.touches?.[0]?.clientY??0,time:performance.now()}},se=N=>{if(!o)return;const b=N.clientX??N.changedTouches?.[0]?.clientX??0,z=N.clientY??N.changedTouches?.[0]?.clientY??0,F=Math.hypot(b-L.x,z-L.y),k=performance.now()-L.time;if(F>8||k>650)return;const T=new Jt,le=new Ne(b/window.innerWidth*2-1,-(z/window.innerHeight)*2+1);T.setFromCamera(le,o);const Y=T.intersectObjects(i,!0);if(Y.length>0){const j=Y[0].object;if(j.userData?.isCardMesh||j.userData?.isRocketCard){e.deselect();return}const Te=j.userData?.rocketId||j.parent?.userData?.rocketId;Te&&uo[Te]&&(e.getActiveRocket&&e.getActiveRocket()?.id===Te?e.deselect():e.selectRocket(j,Te))}else e.getActiveRocket&&e.getActiveRocket()&&e.deselect()};return window.addEventListener("pointerdown",te,{passive:!0}),window.addEventListener("pointerup",se,{passive:!0}),{group:n,update:(N,b)=>{e.update(N,b)},interactiveTargets:i}}function Ps(a,e,o,n,i,s,t){const r=new J;r.name="Rocket_PSLV",r.position.set(0,e+.02,0),a.add(r);const u=.24,p=new B({color:2040878,roughness:.5,metalness:.7}),h=new l(new D(u,u,2.1,32),n);h.position.y=1.05,h.castShadow=!0,r.add(h);const d=new l(new Ye(.18,.28,24),i);d.rotation.x=Math.PI,d.position.y=.04,r.add(d);const m=new l(new D(u*1.01,u*1.01,.14,32),p);m.position.y=2.17,r.add(m);const v=new l(new D(u,u,1.35,32),n);v.position.y=2.24+.675,v.castShadow=!0,r.add(v),[-.26,.26].forEach(M=>{const I=new l(new Ee(.06,.24,.06),p);I.position.set(M,2.38,0),r.add(I)});const S=new l(new D(u*.95,u,1.15,32),n);S.position.y=3.59+.575,r.add(S);const y=new l(new D(u*.9,u*.95,.65,32),p);y.position.y=4.74+.325,r.add(y);const f=new l(new Ye(u*1.02,1.25,32),s);f.position.y=5.39+.625,r.add(f);for(let M=0;M<6;M++){const I=M/6*Math.PI*2,H=new J;H.position.set(Math.cos(I)*.36,.95,Math.sin(I)*.36);const x=new l(new D(.075,.075,1.65,20),n);H.add(x);const R=new l(new Ye(.075,.32,20),p);R.position.y=.825+.16,H.add(R);const w=new l(new Ye(.055,.14,16),i);w.rotation.x=Math.PI,w.position.y=-.825-.07,H.add(w);const C=new l(new Ee(.06,.08,.08),p);C.position.set(0,.6,-.06),H.add(C),r.add(H)}const c=new l(new Ee(.04,4.8,.04),p);c.position.set(0,2.5,u+.015),r.add(c),t(a,u,e);const P=Pt("pslv",.65,6.6,3.3);r.add(P),o.push(P)}function Os(a,e,o,n,i,s,t){const r=new J;r.name="Rocket_LVM3",r.position.set(0,e+.02,0),a.add(r);const u=.34,p=new B({color:2040878,roughness:.5,metalness:.7}),h=new B({color:16317180,roughness:.35}),d=new l(new D(u,u,2.75,32),n);d.position.y=1.375,d.castShadow=!0,r.add(d),[-.14,.14].forEach(c=>{const P=new l(new Ye(.12,.28,20),s);P.rotation.x=Math.PI,P.position.set(c,.05,0),r.add(P)});const m=new l(new D(u,u,1.35,32),h);m.position.y=2.75+.675,m.castShadow=!0,r.add(m);const v=new l(new D(u*1.01,u*1.01,.18,32),p);v.position.y=2.75,r.add(v);const S=new l(new Ye(u*1.25,2.1,32),h);S.position.y=4.1+1.05,S.castShadow=!0,r.add(S),[-.62,.62].forEach(c=>{const P=new J;P.position.set(c,1.6,0);const M=new l(new D(.24,.24,3.15,24),i);P.add(M);const I=new l(new Ye(.24,.68,24),p);I.position.y=1.575+.34,P.add(I);const H=new l(new Ye(.18,.35,20),s);H.rotation.x=Math.PI,H.position.y=-1.575-.175,P.add(H);const x=new l(new Ee(.24,.12,.12),p);x.position.set(c>0?-.16:.16,1.2,0),P.add(x);const R=new l(new Ee(.24,.14,.14),p);R.position.set(c>0?-.16:.16,-1.2,0),P.add(R),r.add(P)});const y=new l(new Ee(.06,3.8,.05),p);y.position.set(0,2.1,u+.02),r.add(y),t(a,u*1.35,e);const f=Pt("lvm3",.95,6.5,3.25);r.add(f),o.push(f)}function ks(a,e,o,n,i,s){const t=new J;t.name="Rocket_GSLV",t.position.set(0,e+.02,0),a.add(t);const r=.24,u=new B({color:1975344,roughness:.5}),p=new B({color:16317180,roughness:.35}),h=new l(new D(r,r,2.5,32),n);h.position.y=1.25,t.add(h);const d=new l(new D(r,r,1.45,32),n);d.position.y=2.5+.725,t.add(d);const m=new l(new D(r,r,1.2,32),p);m.position.y=3.95+.6,t.add(m);const v=new l(new Ye(r*1.2,1.55,32),p);v.position.y=5.15+.775,t.add(v);for(let y=0;y<4;y++){const f=y/4*Math.PI*2+Math.PI/4,c=new J;c.position.set(Math.cos(f)*.4,1.25,Math.sin(f)*.4);const P=new l(new D(.1,.1,2.3,20),n);c.add(P);const M=new l(new Ye(.1,.45,20),u);M.position.y=1.15+.225,c.add(M);const I=new l(new Ye(.08,.18,16),i);I.rotation.x=Math.PI,I.position.y=-1.15-.09,c.add(I),t.add(c)}s(a,r,e);const S=Pt("gslv",.75,6.7,3.35);t.add(S),o.push(S)}function Ls(a,e,o,n){const i=new J;i.name="Rocket_Sounding",i.position.set(0,e+.02,0),a.add(i);const s=new B({color:4674921,metalness:.85,roughness:.25}),t=new B({color:16317180,roughness:.35}),r=new B({color:16726784,roughness:.35}),u=new J;u.rotation.x=-.1,i.add(u);const p=new l(new Ee(.12,6.2,.12),s);p.position.set(0,3.1,-.12),u.add(p);for(let y=.4;y<6;y+=.35){const f=new l(new D(.015,.015,.24,8),s);f.rotation.z=Math.PI/2,f.position.set(0,y,-.12),u.add(f)}[-.18,.18].forEach(y=>{const f=new l(new D(.04,.04,1.2,16),s);f.position.set(y,.6,.2),f.rotation.x=.45,i.add(f)});const h=new J;h.position.set(0,.85,.06),u.add(h);const d=new l(new D(.065,.065,2.1,24),t);d.position.y=1.05,h.add(d);const m=new l(new D(.06,.06,2.2,24),t);m.position.y=2.1+1.1,h.add(m);const v=new l(new Ye(.06,.75,24),r);v.position.y=4.3+.375,h.add(v);for(let y=0;y<4;y++){const f=y/4*Math.PI*2,c=new l(new Ee(.01,.45,.28),r);c.position.set(Math.cos(f)*.16,.25,Math.sin(f)*.16),c.rotation.y=-f,h.add(c)}const S=Pt("sounding",.55,6.3,3.15);i.add(S),o.push(S)}function Ns(a,e,o,n,i,s){const t=new J;t.name="Rocket_SLV3",t.position.set(0,e+.02,0),a.add(t);const r=new B({color:14230050,roughness:.35}),u=new B({color:15051058,roughness:.3,metalness:.8}),p=new l(new D(.2,.2,1.9,28),n);p.position.y=.95,t.add(p);const h=new l(new D(.18,.2,1.4,28),n);h.position.y=1.9+.7,t.add(h);const d=new l(new D(.16,.18,1.15,28),n);d.position.y=3.3+.575,t.add(d);const m=new l(new D(.14,.16,.8,28),n);m.position.y=4.45+.4,t.add(m);const v=new l(new Ye(.14,.65,28),n);v.position.y=5.25+.325,t.add(v);const S=new l(new D(.142,.142,.06,28),u);S.position.y=5.25,t.add(S);for(let f=0;f<4;f++){const c=f/4*Math.PI*2,P=new l(new Ee(.015,.48,.32),r);P.position.set(Math.cos(c)*.28,.3,Math.sin(c)*.28),P.rotation.y=-c,t.add(P)}s(a,.2,e);const y=Pt("slv3",.55,6,3);t.add(y),o.push(y)}function _s(a,e,o,n,i,s){const t=new J;t.name="Rocket_ASLV",t.position.set(0,e+.02,0),a.add(t);const r=.18,u=new B({color:2040878,roughness:.5}),p=new l(new D(r,r,4.4,28),n);p.position.y=2.2,t.add(p);const h=new l(new qe(r*1.35,24,18),n);h.position.y=4.4+.18,t.add(h);const d=new l(new Ye(r*1.3,.85,24),n);d.position.y=4.58+.425,t.add(d),[-.38,.38].forEach(v=>{const S=new J;S.position.set(v,1.45,0);const y=new l(new D(.14,.14,2.5,20),n);S.add(y);const f=new l(new Ye(.14,.45,20),u);f.position.y=1.25+.225,S.add(f);const c=new l(new Ye(.1,.18,16),i);c.rotation.x=Math.PI,c.position.y=-1.25-.09,S.add(c),t.add(S)}),s(a,r,e);const m=Pt("aslv",.65,6.2,3.1);t.add(m),o.push(m)}function zs(a,e,o,n,i,s){const t=new J;t.name="Rocket_HRLV",t.position.set(0,e+.02,0),a.add(t);const r=.35,u=new B({color:1120295,roughness:.5}),p=new B({color:4674921,metalness:.88,roughness:.22}),h=new l(new D(r,r,3.8,32),n);h.position.y=1.9,t.add(h);for(let y=0;y<8;y++){const f=y/8*Math.PI*2,c=new l(new Ye(.07,.22,16),i);c.rotation.x=Math.PI,c.position.set(Math.cos(f)*.2,.04,Math.sin(f)*.2),t.add(c)}const d=new l(new Ye(.08,.24,16),i);d.rotation.x=Math.PI,d.position.set(0,.04,0),t.add(d);const m=new l(new D(r*.95,r,1.6,32),p);m.position.y=3.8+.8,t.add(m);const v=new l(new Ye(r*1.02,1.5,32),n);v.position.y=5.4+.75,t.add(v);for(let y=0;y<4;y++){const f=y/4*Math.PI*2,c=new l(new Ee(.02,.26,.26),u);c.position.set(Math.cos(f)*(r+.1),3.65,Math.sin(f)*(r+.1)),c.rotation.y=-f,t.add(c)}for(let y=0;y<4;y++){const f=y/4*Math.PI*2+Math.PI/4,c=new l(new Ee(.03,1.45,.03),u);c.position.set(Math.cos(f)*(r+.02),.75,Math.sin(f)*(r+.02)),t.add(c)}s(a,r,e);const S=Pt("hrlv",.85,7,3.5);t.add(S),o.push(S)}function Ds(a,e,o,n,i,s){const t=new J;t.name="Rocket_SSLV",t.position.set(0,e+.02,0),a.add(t);const r=.22,u=new B({color:58879,roughness:.3}),p=new B({color:1447967,roughness:.45,metalness:.5}),h=new l(new D(r,r,2.2,28),n);h.position.y=1.1,t.add(h);const d=new l(new D(r,r,1.3,28),n);d.position.y=2.2+.65,t.add(d);const m=new l(new D(r*.92,r,1,28),n);m.position.y=3.5+.5,t.add(m);const v=new l(new D(r*.92,r*.92,.16,28),u);v.position.y=4.5+.08,t.add(v);const S=new l(new Ye(r*1.05,1.15,28),p);S.position.y=4.66+.575,t.add(S),s(a,r,e);const y=Pt("sslv",.55,6,3);t.add(y),o.push(y)}function Gs(a,e,o,n,i,s){const t=new J;t.name="Rocket_Apollo11",t.position.set(0,e+.02,0),a.add(t);const r=.38,u=new B({color:11674164,roughness:.35}),p=new B({color:14870768,roughness:.25,metalness:.85}),h=new l(new D(r,r,2.6,36),n);h.position.y=1.3,h.castShadow=!0,t.add(h);for(let I=0;I<4;I++){const H=I/4*Math.PI*2,x=new l(new Ye(.12,.32,20),i);x.rotation.x=Math.PI,x.position.set(Math.cos(H)*.22,.06,Math.sin(H)*.22),t.add(x)}const d=new l(new Ye(.14,.34,20),i);d.rotation.x=Math.PI,d.position.set(0,.06,0),t.add(d);for(let I=0;I<4;I++){const H=I/4*Math.PI*2,x=new l(new Ee(.025,.65,.42),p);x.position.set(Math.cos(H)*(r+.16),.45,Math.sin(H)*(r+.16)),x.rotation.y=-H,t.add(x)}const m=new l(new D(r,r,1.7,36),n);m.position.y=2.6+.85,m.castShadow=!0,t.add(m);const v=new l(new D(r*.7,r,1.25,36),n);v.position.y=4.3+.625,t.add(v);const S=new l(new D(r*.48,r*.48,.55,32),p);S.position.y=5.55+.275,t.add(S);const y=new l(new Ye(r*.48,.38,32),p);y.position.y=6.1+.19,t.add(y);const f=new J;f.position.y=6.29;for(let I=0;I<4;I++){const H=I/4*Math.PI*2+Math.PI/4,x=new l(new D(.008,.008,.55,8),u);x.position.set(Math.cos(H)*.06,.275,Math.sin(H)*.06),f.add(x)}const c=new l(new D(.025,.035,.45,16),u);c.position.y=.55+.225,f.add(c);const P=new l(new Ye(.025,.2,16),u);P.position.y=1+.1,f.add(P),t.add(f),s(a,r,e);const M=Pt("apollo11",.95,7.3,3.65);t.add(M),o.push(M)}function Us(a,e,o,n,i,s){const t=new J;t.name="Rocket_Falcon9",t.position.set(0,e+.02,0),a.add(t);const r=.26,u=new B({color:1119258,roughness:.5}),p=new B({color:16317180,roughness:.32}),h=new l(new D(r,r,4.2,32),n);h.position.y=2.1,h.castShadow=!0,t.add(h);for(let f=0;f<8;f++){const c=f/8*Math.PI*2,P=new l(new Ye(.06,.2,16),i);P.rotation.x=Math.PI,P.position.set(Math.cos(c)*.16,.04,Math.sin(c)*.16),t.add(P)}const d=new l(new Ye(.065,.22,16),i);d.rotation.x=Math.PI,d.position.set(0,.04,0),t.add(d);const m=new l(new D(r,r,.6,32),u);m.position.y=4.2+.3,t.add(m);const v=new l(new D(r,r,.9,32),p);v.position.y=4.8+.45,t.add(v);const S=new l(new Ye(r*1.25,1.45,32),p);S.position.y=5.7+.725,t.add(S);for(let f=0;f<4;f++){const c=f/4*Math.PI*2,P=new J;P.position.set(Math.cos(c)*(r+.08),4.35,Math.sin(c)*(r+.08)),P.rotation.y=-c;const M=new l(new Ee(.015,.24,.22),u);P.add(M),t.add(P)}for(let f=0;f<4;f++){const c=f/4*Math.PI*2+Math.PI/4,P=new l(new Ee(.025,1.65,.025),u);P.position.set(Math.cos(c)*(r+.02),.85,Math.sin(c)*(r+.02)),t.add(P)}s(a,r,e);const y=Pt("falcon9",.8,6.9,3.45);t.add(y),o.push(y)}function Hs(a,e,o,n,i){const s=new J;s.name="Spacecraft_Dragon",s.position.set(0,e+.02,0),a.add(s);const t=new B({color:16317180,roughness:.35}),r=new B({color:659480,roughness:.35,metalness:.7}),u=new B({color:1447967,roughness:.65}),p=new B({color:15594231,roughness:.55,metalness:.2}),h=new l(new D(.38,.45,3.6,32),p);h.position.y=1.8,h.castShadow=!0,s.add(h);const d=new l(new Ee(.08,3.55,.08),u);d.position.set(0,1.8,.4),s.add(d);const m=new l(new D(.42,.42,1.15,32),r);m.position.y=3.6+.575,s.add(m);for(let c=0;c<4;c++){const P=c/4*Math.PI*2,M=new l(new Ee(.12,1.05,.025),t);M.position.set(Math.cos(P)*.48,3.6+.525,Math.sin(P)*.48),M.rotation.y=-P,s.add(M)}const v=new l(new D(.42,.43,.12,32),u);v.position.y=4.75+.06,s.add(v);const S=new l(new D(.24,.42,.95,32),n);S.position.y=4.87+.475,s.add(S);const y=new l(new qe(.24,32,20,0,Math.PI*2,0,Math.PI*.45),t);y.position.y=5.82,s.add(y);for(let c=0;c<4;c++){const P=c/4*Math.PI*2+Math.PI/4,M=new l(new Ee(.08,.18,.06),u);M.position.set(Math.cos(P)*.38,5.25,Math.sin(P)*.38),M.rotation.y=-P,s.add(M)}const f=Pt("dragon",.85,6,3);s.add(f),o.push(f)}function Fs(a,e,o,n,i,s,t,r){const u=new B({color:16317180,roughness:.35}),p=new B({color:16347926,roughness:.35}),h=new B({color:58879,roughness:.3}),d=new J;d.name="Rocket_Vikram1",d.position.set(-.65,e+.02,0),a.add(d);const m=.2,v=new l(new D(m,m,4.1,28),n);v.position.y=2.05,v.castShadow=!0,d.add(v);const S=new l(new D(m,m,.45,28),p);S.position.y=4.1+.225,d.add(S);const y=new l(new Ye(m*1.05,1.25,28),u);y.position.y=4.55+.625,d.add(y);const f=new l(new Ye(.12,.26,20),s);f.rotation.x=Math.PI,f.position.y=.04,d.add(f);const c=t(uo.vikram1);c.position.set(-.65,.18,1.25),c.rotation.x=-.32,a.add(c),r(d,m,0);const P=Pt("vikram1",.55,6.2,3.1);d.add(P),o.push(P);const M=new J;M.name="Rocket_Vikram2",M.position.set(.65,e+.02,0),a.add(M);const I=.21,H=new l(new D(I,I,4.3,28),u);H.position.y=2.15,H.castShadow=!0,M.add(H);const x=new l(new D(I,I,.65,28),h);x.position.y=4.3+.325,M.add(x);const R=new l(new Ye(I*1.05,1.45,28),i);R.position.y=4.95+.725,M.add(R);const w=new l(new Ye(.14,.28,20),s);w.rotation.x=Math.PI,w.position.y=.04,M.add(w);const C=t(uo.vikram2);C.position.set(.65,.18,1.25),C.rotation.x=-.32,a.add(C),r(M,I,0);const g=Pt("vikram2",.55,6.5,3.25);M.add(g),o.push(g)}function Pt(a,e,o,n){const i=new D(e,e,o,16),s=new _e({visible:!1}),t=new l(i,s);return t.position.y=n,t.name=`HitMesh_${a}`,t.userData={rocketId:a,isHitBox:!0},t}const Bs={kalam:{id:"kalam",name:"DR. A.P.J. ABDUL KALAM",fullName:"Avul Pakir Jainulabdeen Abdul Kalam",honorific:"Missile Man of India & 11th President of India (2002–2007)",category:"INDIAN SCIENTIFIC PIONEER",lifespan:"1931 – 2015",field:"Aerospace Engineering & Rocket Propulsion",almaMater:"Madras Institute of Technology (MIT)",recognition:"Bharat Ratna (1997), Padma Vibhushan (1990)",accentColor:"#00e5ff",keyInventions:"Architect of SLV-3 (India’s first Satellite Launch Vehicle); Guided Missile Program (Agni & Prithvi); Carbon-Composite Re-Entry Heat Shields; Kalam-Raju Stent for affordable cardiac care.",famousQuote:"“Dream is not that which you see while sleeping, it is something that does not let you sleep. To succeed in your mission, you must have single-minded devotion to your goal.”",biography:'Widely revered as the "People’s President", Dr. Kalam was the visionary architect of India’s indigenous aerospace and missile launch systems. As Project Director at ISRO, he led the historic SLV-3 mission that placed the Rohini satellite in orbit in 1980. He later spearheaded the Integrated Guided Missile Development Programme (DRDO) and dedicated his post-presidency to educating and inspiring millions of youth toward scientific innovation and national self-reliance.'},radhakrishnan:{id:"radhakrishnan",name:"DR. S. RADHAKRISHNAN",fullName:"Sarvepalli Radhakrishnan",honorific:"Statesman, Philosopher & 2nd President of India (1962–1967)",category:"INDIAN SCHOLAR & PHILOSOPHER",lifespan:"1888 – 1975",field:"Epistemology, Ethics & Comparative Philosophy",almaMater:"Madras Christian College | Oxford Spalding Professor",recognition:"Bharat Ratna (1954), Templeton Prize (1975)",accentColor:"#f59e0b",keyInventions:"Synthesis of Eastern Epistemology with Modern Scientific Rationality; Global UNESCO Intellectual Leadership; Inspiration for National Teachers’ Day (5th September).",famousQuote:"“The true teachers are those who help us think for ourselves. Knowledge gives power, but wisdom gives fullness. When we think we know, we cease to learn.”",biography:"One of the 20th century’s most luminous thinkers, Dr. Radhakrishnan illuminated the vital connection between scientific empirical inquiry and ethical humanism. As a distinguished Spalding Professor of Eastern Religions and Ethics at the University of Oxford, he built profound bridges between Western scientific logic and Eastern philosophical wisdom, championing higher education, intellectual curiosity, and freedom of thought across global forums."},raman:{id:"raman",name:"SIR C.V. RAMAN",fullName:"Chandrasekhara Venkata Raman",honorific:"Nobel Laureate in Physics (1930)",category:"INDIAN SCIENTIFIC PIONEER",lifespan:"1888 – 1970",field:"Optics, Molecular Light Scattering & Spectroscopy",almaMater:"Presidency College, Chennai (University of Madras)",recognition:"Nobel Prize in Physics (1930), Bharat Ratna (1954)",accentColor:"#38bdf8",keyInventions:"The Raman Effect (Inelastic scattering of photons by molecular vibrations); Raman Spectroscopy (Fundamental tool in molecular crystallography, chemistry & medicine).",famousQuote:"“The essence of science is independent thinking, hard work, and not equipment. I am the master of my failure. If I never fail how will I ever learn?”",biography:"Sir C.V. Raman was the first Asian scientist to receive the Nobel Prize in Physics for his 1928 discovery that light scattered by molecules undergoes frequency shifts corresponding to internal molecular energy levels. This phenomenon, known globally as the Raman Effect, revolutionized non-destructive chemical analysis and crystallography. He founded the Indian Academy of Sciences and the Raman Research Institute in Bangalore."},ramanujan:{id:"ramanujan",name:"SRINIVASA RAMANUJAN",fullName:"Srinivasa Ramanujan Aiyangar",honorific:"Fellow of the Royal Society, Cambridge",category:"INDIAN SCIENTIFIC PIONEER",lifespan:"1887 – 1920",field:"Pure Mathematics, Analytic Number Theory & Infinite Series",almaMater:"Trinity College, Cambridge (Collaborated with G.H. Hardy)",recognition:"Fellow of the Royal Society (1918), Trinity Fellow (1918)",accentColor:"#10b981",keyInventions:"Ramanujan Theta Functions; Mock Modular Forms; Highly Composite Numbers; Rapidly Convergent Infinite Series for π; Hardy-Ramanujan Asymptotic Partition Formula p(n).",famousQuote:"“An equation for me has no meaning unless it expresses a thought of God. It is impossible to set value on work which is entirely original and of extraordinary depth.”",biography:"An astonishing mathematical prodigy who, with minimal formal university training, independently discovered nearly 3,900 identities, infinite series, and asymptotic formulas. Working with G.H. Hardy at Cambridge, Ramanujan introduced foundational concepts into partition theory and mock theta functions that today solve deep problems in string theory, statistical mechanics, and quantum black hole entropy."},snbose:{id:"snbose",name:"SATYENDRA NATH BOSE",fullName:"Satyendra Nath Bose",honorific:"Pioneer of Quantum Statistics & Bosons",category:"INDIAN SCIENTIFIC PIONEER",lifespan:"1894 – 1974",field:"Quantum Statistical Mechanics & Theoretical Physics",almaMater:"Presidency College, Kolkata",recognition:"Padma Vibhushan (1954), Fellow of the Royal Society (1958)",accentColor:"#a855f7",keyInventions:'Bose-Einstein Statistics; Prediction of Bose-Einstein Condensate (5th state of matter); Naming namesake for all integer-spin subatomic particles: "Bosons".',famousQuote:"“If science is to flourish, it must be pursued for the love of truth and with absolute freedom of spirit. The mind must remain open to the surprising ways of nature.”",biography:'Renowned for providing the revolutionary derivation of Planck’s blackbody radiation law without reference to classical electrodynamics, founding the field of quantum statistics. Albert Einstein recognized the brilliance of Bose’s short paper, translated it into German, and expanded it to atomic gases. In recognition of his seminal work, Paul Dirac named all fundamental force-carrying particles (photons, gluons, Higgs) "Bosons".'},bhabha:{id:"bhabha",name:"DR. HOMI J. BHABHA",fullName:"Homi Jehangir Bhabha",honorific:"Father of the Indian Nuclear Programme",category:"INDIAN SCIENTIFIC PIONEER",lifespan:"1909 – 1966",field:"Nuclear Physics & Cosmic Ray Electrodynamics",almaMater:"Cambridge University (Gonville and Caius College)",recognition:"Adams Prize (1942), Fellow of the Royal Society (1941)",accentColor:"#ef4444",keyInventions:"Bhabha Scattering (Relativistic electron-positron cross section in QED); Cascade Theory of Cosmic Ray Showers; India’s Three-Stage Nuclear Power Strategy (Thorium Cycle).",famousQuote:"“For the full industrialisation of any country, the vastest physical basis is atomic energy. Science does not simply solve problems; it builds the intellectual infrastructure of civilization.”",biography:"Visionary nuclear physicist who laid the institutional foundation of modern Indian science. He formulated the quantum relativistic cross-section for electron-positron scattering (Bhabha Scattering) and designed India’s innovative 3-stage nuclear energy program centered on tapping abundant indigenous thorium resources. He founded the Tata Institute of Fundamental Research (TIFR) and the Bhabha Atomic Research Centre (BARC)."},sarabhai:{id:"sarabhai",name:"DR. VIKRAM SARABHAI",fullName:"Vikram Ambalal Sarabhai",honorific:"Father of the Indian Space Programme (ISRO)",category:"INDIAN SCIENTIFIC PIONEER",lifespan:"1919 – 1971",field:"Cosmic Ray Astrophysics & Satellite Technology",almaMater:"Cambridge University (Doctorate under Sir C.V. Raman)",recognition:"Padma Bhushan (1966), Padma Vibhushan (Posthumous 1972)",accentColor:"#f97316",keyInventions:"Founding of ISRO; Thumba Equatorial Rocket Launching Station (TERLS); Physical Research Laboratory (PRL); Satellite Instructional Television Experiment (SITE); IIM Ahmedabad.",famousQuote:"“We must be second to none in the application of advanced technologies to the real problems of man and society. He who can listen to music in the midst of noise can achieve the greatest things.”",biography:"The visionary industrialist and scientist who founded India’s space program. Sarabhai firmly believed that developing nations must harness cutting-edge satellite and space technologies directly to empower rural education, telecommunications, agriculture, and cyclone warning. He founded ISRO, spearheaded the launch of India’s first satellite Aryabhata, and established world-class institutions including PRL and IIMA."},jcbose:{id:"jcbose",name:"SIR JAGADISH CHANDRA BOSE",fullName:"Jagadish Chandra Bose",honorific:"Pioneer of Millimetre Radio Waves & Plant Biophysics",category:"INDIAN SCIENTIFIC PIONEER",lifespan:"1858 – 1937",field:"Microwave Optics, Wireless Telecom & Plant Neurobiology",almaMater:"Christ’s College, Cambridge & University of London",recognition:"Companion of the Star of India (1903), Knighthood (1917), FRS (1920)",accentColor:"#14b8a6",keyInventions:"60 GHz Millimetre-Wave Radio Apparatus; Semiconductor Galena Crystal Point-Contact Detector (Precursor to Diodes); Crescograph (Magnifying plant growth movements 10,000×).",famousQuote:"“The true laboratory is the mind, where behind all illusions we uncover the immutable laws of truth. In the pursuit of science, there is no barrier of race or country.”",biography:"A brilliant polymath who conducted groundbreaking experiments in 1895 generating and detecting 60 GHz microwave radiation, anticipating modern 5G and Wi-Fi by more than a century. Bose invented semiconductor crystal detectors and later pioneered plant electrophysiology using his ultra-sensitive Crescograph, demonstrating that living plant tissue exhibits electrical impulses and fatigue analogous to animal nerve cells."},einstein:{id:"einstein",name:"ALBERT EINSTEIN",fullName:"Albert Einstein",honorific:"Nobel Laureate in Physics (1921)",category:"GLOBAL SCIENTIFIC HERITAGE",lifespan:"1879 – 1955",field:"Theoretical Physics & Relativistic Spacetime Geometry",almaMater:"Federal Polytechnic School, Zurich (ETH) & University of Zurich",recognition:"Nobel Prize in Physics (1921), Copley Medal (1925)",accentColor:"#eab308",keyInventions:"Special & General Theory of Relativity; Mass-Energy Equivalence (E = mc²); Photoelectric Effect (Light Quantum Hypothesis); Einstein Field Equations (Spacetime Curvature).",famousQuote:"“Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution.”",biography:'Widely regarded as the most influential physicist of the modern age. In his "Annus Mirabilis" of 1905, Einstein published four revolutionary papers introducing special relativity, the photon hypothesis, and mass-energy equivalence. In 1915, he completed General Relativity, demonstrating that gravitational forces arise from the geometrical warping of four-dimensional spacetime by mass and energy.'},newton:{id:"newton",name:"SIR ISAAC NEWTON",fullName:"Sir Isaac Newton",honorific:"Foundations of Modern Mathematical Physics",category:"GLOBAL SCIENTIFIC HERITAGE",lifespan:"1643 – 1727",field:"Classical Mechanics, Universal Gravitation & Optics",almaMater:"Trinity College, Cambridge",recognition:"President of the Royal Society (1703–1727), Knighthood (1705)",accentColor:"#60a5fa",keyInventions:"Three Fundamental Laws of Motion; Law of Universal Gravitation; Infinitesimal Calculus; Reflecting Telescope; Prismatic Dispersion of White Light Spectrum.",famousQuote:"“If I have seen further, it is by standing on the shoulders of giants. I do not know what I may appear to the world, but to myself I seem to have been only like a boy playing on the seashore.”",biography:'Newton’s 1687 masterpiece "Philosophiae Naturalis Principia Mathematica" laid the mathematical foundations of classical mechanics and universal gravitation. He proved that planetary motions and falling objects on Earth obey identical physical laws, invented calculus independently, and designed the reflecting telescope using curved parabolic mirrors.'},curie:{id:"curie",name:"MARIE SKŁODOWSKA CURIE",fullName:"Maria Salomea Skłodowska-Curie",honorific:"Two-Time Nobel Laureate (Physics 1903, Chemistry 1911)",category:"GLOBAL SCIENTIFIC HERITAGE",lifespan:"1867 – 1934",field:"Radiochemistry & Atomic Physics",almaMater:"University of Paris (Sorbonne)",recognition:"Nobel Prize in Physics (1903), Nobel Prize in Chemistry (1911)",accentColor:"#ec4899",keyInventions:'Discovery and Isolation of Radium and Polonium; Coined the term "Radioactivity"; Mobile Battlefield X-Ray Radiography Units ("Petites Curies") during World War I.',famousQuote:"“Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less. Be less curious about people and more curious about ideas.”",biography:"The first woman to win a Nobel Prize, the first person to win twice, and the only individual honored across two distinct scientific fields (Physics and Chemistry). Curie discovered the radioactive elements Polonium and Radium, developed rigorous methods for isolating radioactive isotopes, and pioneered the therapeutic medical applications of radiation in oncology."},tesla:{id:"tesla",name:"NIKOLA TESLA",fullName:"Nikola Tesla",honorific:"Visionary Pioneer of Alternating Current & Electromagnetism",category:"GLOBAL SCIENTIFIC HERITAGE",lifespan:"1856 – 1943",field:"Electrical Engineering, High-Frequency AC & Resonant Circuits",almaMater:"Graz University of Technology & Charles-Ferdinand University, Prague",recognition:"Edison Medal (1916), Over 300 Global Patents in Electrical Power",accentColor:"#818cf8",keyInventions:"AC Polyphase Induction Motor; Tesla Resonant Transformer Coil; Rotating Magnetic Field Principle; Niagara Falls Hydroelectric Power System; Wireless Teleautomation.",famousQuote:"“If you want to find the secrets of the universe, think in terms of energy, frequency and vibration. The present is theirs; the future, for which I really worked, is mine.”",biography:"Visionary inventor whose pioneering work on alternating current (AC) electricity transformed human civilization and enabled modern global electrification. Tesla invented the brushless AC induction motor, patented polyphase power transmission, built high-frequency resonant transformers, and demonstrated wireless telecommunications and remote-controlled vessels."}};function Vs(a,e){const o=new J;o.name="ScientistTelemetryAnchorGroup",a.add(o);let n=null;const i=new E,s=document.createElement("canvas");s.width=1024,s.height=640;const t=s.getContext("2d"),r=new Xe(s);r.minFilter=Rt,r.magFilter=Rt;const u=new At(2.1,1.31),p=new _e({map:r,transparent:!0,side:Ve,depthWrite:!1}),h=new l(u,p);h.name="Scientist3DTelemetryCard",h.userData={isCardMesh:!0,isScientistCard:!0},h.visible=!1,o.add(h);const d=new kt().setFromPoints([new E(0,0,0),new E(.5,.5,0)]),m=new eo({color:58879,transparent:!0,opacity:.88,linewidth:2}),v=new go(d,m);v.visible=!1,o.add(v);const S=new _e({color:58879,side:Ve,transparent:!0,opacity:.9}),y=new l(new It(.12,.16,32),S);y.visible=!1,o.add(y);let f=document.getElementById("scientist-telemetry-hud");f||(f=document.createElement("div"),f.id="scientist-telemetry-hud",f.innerHTML=`
      <style>
        #scientist-telemetry-hud {
          position: fixed;
          bottom: 24px;
          right: -520px;
          width: 440px;
          max-width: calc(100vw - 32px);
          max-height: 82vh;
          overflow-y: auto;
          background: rgba(10, 14, 24, 0.95);
          border: 1px solid rgba(0, 229, 255, 0.35);
          border-left: 5px solid #00e5ff;
          border-radius: 14px;
          padding: 22px 24px;
          color: #e2e8f0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.8), 0 0 24px rgba(0, 229, 255, 0.2);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
          opacity: 0;
          z-index: 9999;
          pointer-events: auto;
        }
        #scientist-telemetry-hud.active {
          right: 24px;
          opacity: 1;
        }

        /* ── PORTRAIT MODE (Phones & Tablets) ──
           Transforms the scientist data card into a bottom sheet drawer */
        @media (orientation: portrait), (max-width: 640px) and (orientation: portrait) {
          #scientist-telemetry-hud {
            bottom: 74px;
            left: 12px;
            right: 12px;
            top: auto;
            width: auto;
            max-width: calc(100% - 24px);
            max-height: 52vh;
            padding: 16px 18px;
            border-radius: 16px;
            transform: translateY(120%);
            transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
          }
          #scientist-telemetry-hud.active {
            transform: translateY(0);
            right: 12px;
            opacity: 1;
          }
          .sci-title {
            font-size: 20px;
          }
          .sci-grid {
            grid-template-columns: 1fr 1fr;
            gap: 8px 10px;
            padding: 10px 12px;
          }
        }

        /* ── LANDSCAPE MODE (Phones, Tablets & iPads) ──
           Adapts into a landscape side-drawer on the right */
        @media (orientation: landscape) {
          #scientist-telemetry-hud {
            top: 12px;
            bottom: 58px;
            right: -520px;
            left: auto;
            width: 440px;
            max-width: calc(100% - 80px);
            max-height: calc(100% - 70px);
            padding: 14px 18px;
            border-radius: 14px;
            transform: none;
            transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
          }
          #scientist-telemetry-hud.active {
            right: 14px;
            opacity: 1;
          }
          .sci-title {
            font-size: 20px;
          }
          .sci-grid {
            grid-template-columns: 1fr 1fr;
            gap: 6px 10px;
            padding: 8px 12px;
            margin-bottom: 12px;
          }
        }

        body.vz-orientation-landscape #scientist-telemetry-hud {
          top: 12px;
          bottom: 58px;
          right: -520px;
          left: auto;
          width: 440px;
          max-width: calc(100% - 80px);
          max-height: calc(100% - 70px);
          padding: 14px 18px;
          border-radius: 14px;
          transform: none;
          transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
        }
        body.vz-orientation-landscape #scientist-telemetry-hud.active {
          right: 14px;
          opacity: 1;
        }

        .sci-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          padding-bottom: 12px;
        }
        .sci-title-area {
          flex: 1;
        }
        .sci-title {
          font-size: 22px;
          font-weight: 900;
          letter-spacing: 0.04em;
          color: #ffffff;
          line-height: 1.15;
          margin-bottom: 4px;
        }
        .sci-sub {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #00e5ff;
          text-transform: uppercase;
        }
        .sci-close {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #e2e8f0;
          font-size: 16px;
          font-weight: bold;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .sci-close:hover {
          background: rgba(239, 68, 68, 0.4);
          border-color: #ef4444;
          color: #ffffff;
        }
        .sci-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 3px 8px;
          border-radius: 4px;
          margin-bottom: 14px;
          text-transform: uppercase;
        }
        .sci-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 14px;
          margin-bottom: 16px;
          background: rgba(0, 0, 0, 0.28);
          padding: 12px 14px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .sci-stat {
          display: flex;
          flex-direction: column;
        }
        .sci-stat-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #94a3b8;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        .sci-stat-val {
          font-size: 12px;
          font-weight: 700;
          color: #f8fafc;
        }
        .sci-quote {
          font-size: 12px;
          line-height: 1.5;
          font-style: italic;
          color: #fbbf24;
          background: rgba(251, 191, 36, 0.08);
          padding: 10px 12px;
          border-radius: 6px;
          border-left: 3px solid #fbbf24;
          margin-bottom: 14px;
        }
        .sci-section {
          margin-bottom: 14px;
        }
        .sci-sec-title {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #38bdf8;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .sci-sec-body {
          font-size: 12px;
          line-height: 1.55;
          color: #cbd5e1;
        }
      </style>
      <div class="sci-header">
        <div class="sci-title-area">
          <div class="sci-title" id="sci-title">DR. A.P.J. ABDUL KALAM</div>
          <div class="sci-sub" id="sci-sub">INDIAN SCIENTIFIC PIONEER</div>
        </div>
        <button class="sci-close" id="sci-close-btn" title="Close Scientist Info">✕</button>
      </div>
      <div id="sci-badge-container"></div>
      <div class="sci-grid">
        <div class="sci-stat">
          <span class="sci-stat-label">Field of Study</span>
          <span class="sci-stat-val" id="sci-field">Aerospace Engineering</span>
        </div>
        <div class="sci-stat">
          <span class="sci-stat-label">Lifespan</span>
          <span class="sci-stat-val" id="sci-lifespan">1931 – 2015</span>
        </div>
        <div class="sci-stat" style="grid-column: span 2;">
          <span class="sci-stat-label">Alma Mater / Affiliation</span>
          <span class="sci-stat-val" id="sci-alma">Madras Institute of Technology</span>
        </div>
        <div class="sci-stat" style="grid-column: span 2;">
          <span class="sci-stat-label">Key Honors / Distinction</span>
          <span class="sci-stat-val" id="sci-recognition">Bharat Ratna (1997)</span>
        </div>
      </div>
      <div class="sci-quote" id="sci-quote">“Dream is not that which you see while sleeping...”</div>
      <div class="sci-section">
        <div class="sci-sec-title">Key Scientific Inventions & Discoveries</div>
        <div class="sci-sec-body" id="sci-inventions">SLV-3, Agni & Prithvi Missile Systems...</div>
      </div>
      <div class="sci-section">
        <div class="sci-sec-title">Biographical Overview & Legacy</div>
        <div class="sci-sec-body" id="sci-bio">...</div>
      </div>
    `,oo().appendChild(f),document.getElementById("sci-close-btn")?.addEventListener("click",R=>{R.stopPropagation(),I()}));function c(x,R,w,C,g,A,_=4){if(!R)return C;const V=R.split(" ");let Z="",ee=0;for(let q=0;q<V.length;q++){const re=Z+V[q]+" ";if(x.measureText(re).width>g&&q>0){if(ee++,ee>=_)return x.fillText(Z.trim()+"…",w,C),C+A;x.fillText(Z,w,C),Z=V[q]+" ",C+=A}else Z=re}return x.fillText(Z,w,C),C+A}function P(x){t.clearRect(0,0,1024,640),t.fillStyle="#080c16",t.fillRect(0,0,1024,640),t.strokeStyle=x.accentColor,t.lineWidth=3,t.strokeRect(4,4,1016,632),t.fillStyle=x.accentColor,t.fillRect(0,0,1024,56),t.font='900 24px "Inter", "Segoe UI", sans-serif',t.fillStyle="#070b14",t.textAlign="left",t.textBaseline="middle",t.fillText(`★ SCIENTIST PROFILE // ${x.name}`,24,28),t.font='bold 20px "Inter", sans-serif',t.fillStyle="#070b14",t.textAlign="right",t.fillText("✕",1e3,28),t.textAlign="left",t.textBaseline="alphabetic",t.font='bold 14px "Inter", monospace',t.fillStyle=x.accentColor,t.fillText(`CATEGORY: ${x.category}   |   ERA: ${x.lifespan}`,24,84),t.fillStyle="rgba(255, 255, 255, 0.04)",t.fillRect(20,98,984,114),t.strokeStyle="rgba(255, 255, 255, 0.08)",t.lineWidth=1,t.strokeRect(20,98,984,114);const R=36,w=520;t.font='bold 12px "Inter", monospace',t.fillStyle="#94a3b8",t.fillText("FIELD OF STUDY:",R,124),t.font='bold 13px "Inter", sans-serif',t.fillStyle="#ffffff",t.fillText(x.field,R+130,124),t.font='bold 12px "Inter", monospace',t.fillStyle="#94a3b8",t.fillText("HONORS / PRIZES:",R,156),t.font='bold 13px "Inter", sans-serif',t.fillStyle="#ffffff",t.fillText(x.recognition,R+130,156),t.font='bold 12px "Inter", monospace',t.fillStyle="#94a3b8",t.fillText("ALMA MATER:",w,124),t.font='bold 13px "Inter", sans-serif',t.fillStyle="#ffffff";let C=x.almaMater;if(t.measureText(C).width>340){for(;t.measureText(C+"…").width>340&&C.length>5;)C=C.slice(0,-1);C=C.trim()+"…"}t.fillText(C,w+120,124),t.font='bold 12px "Inter", monospace',t.fillStyle="#94a3b8",t.fillText("ROLE / TITLE:",w,156),t.font='bold 13px "Inter", sans-serif',t.fillStyle="#ffffff";let g=x.honorific;if(t.measureText(g).width>340){for(;t.measureText(g+"…").width>340&&g.length>5;)g=g.slice(0,-1);g=g.trim()+"…"}t.fillText(g,w+120,156),t.fillStyle="rgba(251, 191, 36, 0.05)",t.fillRect(20,222,984,92),t.strokeStyle="rgba(251, 191, 36, 0.28)",t.strokeRect(20,222,984,92),t.font='bold 12px "Inter", monospace',t.fillStyle="#fbbf24",t.fillText("WORDS OF WISDOM & PHILOSOPHY",36,242),t.font='italic 13px "Inter", sans-serif',t.fillStyle="#fef08a",c(t,x.famousQuote,36,264,952,20,2),t.fillStyle="rgba(0, 229, 255, 0.04)",t.fillRect(20,324,984,114),t.strokeStyle="rgba(0, 229, 255, 0.22)",t.strokeRect(20,324,984,114),t.font='bold 12px "Inter", monospace',t.fillStyle="#00e5ff",t.fillText("KEY SCIENTIFIC INVENTIONS & BREAKTHROUGHS",36,344),t.font='13px "Inter", sans-serif',t.fillStyle="#e2e8f0",c(t,x.keyInventions,36,366,952,20,3),t.fillStyle="rgba(56, 189, 248, 0.04)",t.fillRect(20,448,984,142),t.strokeStyle="rgba(56, 189, 248, 0.18)",t.strokeRect(20,448,984,142),t.font='bold 12px "Inter", monospace',t.fillStyle="#38bdf8",t.fillText("BIOGRAPHICAL OVERVIEW & LEGACY",36,468),t.font='13px "Inter", sans-serif',t.fillStyle="#cbd5e1",c(t,x.biography,36,490,952,20,4),t.font='bold 12px "Inter", monospace',t.fillStyle="#64748b",t.textAlign="center",t.fillText("✕ TOUCH CARD, PLAQUE OR EMPTY SPACE TO CLOSE",512,622),r.needsUpdate=!0}function M(x,R){let w,C;typeof x=="string"?(C=x,w=R):(w=x,C=R);const g=Bs[C];if(!g)return;if(typeof window<"u"&&window.__sim&&(window.__sim.rocketTelemetry?.deselect(),window.__sim.astroCtx?.telemetry?.deselect(),window.__sim.mobileRobots?.telemetry?.deselect()),!w&&typeof window<"u"&&window.__sim?.wallExhibits){const z=window.__sim.wallExhibits.exhibits?.find(F=>F.scientist.id===C);z&&(w=z.anchor)}n=g,P(g);const A=new E;w.getWorldPosition(A);const _=new E(-A.x,0,-A.z).normalize(),V=new E(-_.z,0,_.x),Z=A.clone().add(_.clone().multiplyScalar(2.2)).add(V.clone().multiplyScalar(.85)).add(new E(0,.35,0));i.copy(Z),h.position.copy(Z),h.visible=!0,y.position.copy(A).add(_.clone().multiplyScalar(.08)),y.visible=!0;const ee=[y.position.clone(),h.position.clone()];v.geometry.setFromPoints(ee),m.color.set(g.accentColor),S.color.set(g.accentColor),v.visible=!0;const q=document.getElementById("sci-title"),re=document.getElementById("sci-sub"),X=document.getElementById("sci-field"),O=document.getElementById("sci-lifespan"),L=document.getElementById("sci-alma"),te=document.getElementById("sci-recognition"),se=document.getElementById("sci-quote"),Se=document.getElementById("sci-inventions"),N=document.getElementById("sci-bio");q&&(q.textContent=g.name),re&&(re.textContent=`${g.category} // ${g.honorific}`),X&&(X.textContent=g.field),O&&(O.textContent=g.lifespan),L&&(L.textContent=g.almaMater),te&&(te.textContent=g.recognition),se&&(se.textContent=g.famousQuote),Se&&(Se.textContent=g.keyInventions),N&&(N.textContent=g.biography);const b=document.getElementById("sci-badge-container");b&&(b.innerHTML=`
        <span class="sci-badge" style="background: ${g.accentColor}22; color: ${g.accentColor}; border: 1px solid ${g.accentColor}66;">
          ● ${g.category}
        </span>
        <span class="sci-badge" style="background: rgba(255,255,255,0.08); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.15); margin-left: 6px;">
          ${g.lifespan}
        </span>
      `),f.style.borderLeftColor=g.accentColor,f.classList.add("active")}function I(){n=null,h.visible=!1,v.visible=!1,y.visible=!1,f&&f.classList.remove("active")}function H(x,R){if(!n||!h.visible||!e)return;h.quaternion.copy(e.quaternion),y.quaternion.copy(e.quaternion),h.position.y=i.y+Math.sin(x*2)*.04;const w=[y.position.clone(),h.position.clone()];v.geometry.setFromPoints(w);const C=1+Math.sin(x*4)*.08;y.scale.set(C,C,C)}return{selectScientist:M,deselect:I,update:H,getActiveScientist:()=>n,cardMesh:h}}const qn=[],jn=a=>{qn.push(a)};jn.getAll=()=>qn;const On=document.getElementById("loading-screen"),Ys=document.getElementById("loader-fill"),Ws=document.getElementById("loading-pct");function bt(a,e){Ys.style.width=`${a}%`,Ws.textContent=e||`${Math.round(a)}%`}async function qs(){bt(5,"CREATING RENDERER…");const a=document.getElementById("app"),e=la(a),o=ca(),n=new _n;n.background=new he(395796),bt(10,"COMPOSITING POST-PROCESSING…");const{composer:i}=da(e,n,o);ha(e,o,i);const s=new kn,t={uTime:{value:0},uResolution:{value:new Ne(window.innerWidth,window.innerHeight)},uPointer:{value:new Ne(0,0)},uPointerWorld:{value:new E(0,0,0)}};window.addEventListener("pointermove",R=>{t.uPointer.value.set(R.clientX/window.innerWidth*2-1,-(R.clientY/window.innerHeight)*2+1)});const r=new Jt;new Ne,bt(15,"BUILDING ATRIUM & SCIENTIST EXHIBITS…");const u=Vs(n,o),p=pa(n,t,u,o);bt(25,"CONFIGURING LIGHTING…"),Sa(n),bt(35,"ASSEMBLING PHYSICS STATION…");const h=ss(n,t,o);bt(45,"ASSEMBLING CHEMISTRY STATION…");const d=Ba(n,t);bt(55,"ASSEMBLING BIOLOGY STATION…");const m=rs(n);bt(65,"ASSEMBLING MATHEMATICS STATION…");const v=ls(n,t);bt(75,"ASSEMBLING ASTRONOMY OBSERVATION STATION…");const S=Ts(n,t,o);bt(80,"DEPLOYING AUTONOMOUS MOBILE ROBOTS (R2-D2 & PRAGYAN ROVER)…");const y=Es(n,o);bt(85,"INITIALIZING CONTROLS…");const f=Ga(o,e),c=Ha(o,f),P=ra(o,f);y.setControls(f),bt(90,"BUILDING HUD…"),qa({physics:h,chemistry:d,biology:m,math:v,astroRobotics:S,cameraAnim:c}),bt(93,"DEPLOYING ROCKET FLEET (ISRO, NASA, SPACEX & SKYROOT)…");const M=As(n,o),I=Rs(n,M,o);bt(96,"TUNING COSMIC AMBIENT SOUNDSCAPE…");const H=Ja();bt(98,"ENABLING WEBXR…"),Za(e),bt(100,"LAUNCH"),await new Promise(R=>setTimeout(R,400)),On.classList.add("fade-out"),setTimeout(()=>On.remove(),1e3),window.THREE=Ai,window.__sim={renderer:e,composer:i,camera:o,controls:f,cameraAnim:c,scene:n,gyroManager:P,astroCtx:S,mobileRobots:y,rocketTelemetry:M,rocketExhibits:I,scientistTelemetry:u,wallExhibits:p.userData.wallExhibits,ambientAudio:$t,audioWidget:H};const x=jn.getAll();e.setAnimationLoop((R,w)=>{const C=s.getDelta(),g=s.getElapsedTime();t.uTime.value=g,r.setFromCamera(t.uPointer.value,o);const A=new Gn(new E(0,1,0),0),_=new E;r.ray.intersectPlane(A,_),_&&t.uPointerWorld.value.copy(_),c.update?.(C),c.isTransitioning||(P.enabled&&P.hasSensorData?P.update(C):f.update()),Jo(o,f);for(const V of x)V(g,C,t);h.update?.(g,C,t),d.update?.(g,C,t),m.update?.(g,C,t),v.update?.(g,C,t),S.update?.(g,C,t),y.update?.(g,C,t),I.update?.(g,C,t),u.update?.(g,C),i.render()})}qs().catch(a=>{console.error("VIZON init failed:",a),document.getElementById("loading-pct").textContent=`ERROR: ${a.message}`});
