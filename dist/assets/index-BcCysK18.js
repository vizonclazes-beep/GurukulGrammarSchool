import{M as r,O as Kn,B as Yt,F as fn,S as ft,U as No,V as Ie,W as Oo,H as Lo,N as $n,C as Rn,a as $,b as C,A as tt,c as De,R as Zn,d as Qn,e as Jn,L as es,f as ts,g as os,h as On,i as ns,j as ss,k as Ln,P as as,l as Jo,m as is,G as U,n as ee,o as F,p as me,q as Lt,r as ht,s as Ft,D as We,t as rs,u as kn,T as ot,v as ls,w as cs,x as P,y as zt,z as Nn,E as zo,Q as ds,I as Ot,J as Do,K as hs,X as mn,Y as us,Z as ps,_ as Wt,$ as fs,a0 as ms,a1 as io,a2 as Vt,a3 as Zt,a4 as gn,a5 as gs,a6 as _n,a7 as lt,a8 as go,a9 as yo,aa as _e,ab as Ut,ac as vs,ad as ws,ae as vo,af as wo,ag as He,ah as ys,ai as bs,aj as ao,ak as zn,al as bo,am as _o,an as Ko,ao as xs,ap as Ss,aq as Go,ar as Ms,as as Cs,at as en,au as Ts,av as oo,aw as no}from"./three-uh_HwfYD.js";import{g as Is}from"./gsap-DdEiTQuA.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();const Dn={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class uo{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Es=new Kn(-1,1,1,-1,0,1);class As extends Yt{constructor(){super(),this.setAttribute("position",new fn([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new fn([0,2,0,0,2,0],2))}}const Ps=new As;class tn{constructor(e){this._mesh=new r(Ps,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Es)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Rs extends uo{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof ft?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=No.clone(e.uniforms),this.material=new ft({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new tn(this.material)}render(e,t,o){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=o.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class vn extends uo{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,o){const n=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let i,l;this.inverse?(i=0,l=1):(i=1,l=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),s.buffers.stencil.setFunc(n.ALWAYS,i,4294967295),s.buffers.stencil.setClear(l),s.buffers.stencil.setLocked(!0),e.setRenderTarget(o),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(n.EQUAL,1,4294967295),s.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),s.buffers.stencil.setLocked(!0)}}class Os extends uo{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Ls{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const o=e.getSize(new Ie);this._width=o.width,this._height=o.height,t=new Oo(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Lo}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Rs(Dn),this.copyPass.material.blending=$n,this.clock=new Rn}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let o=!1;for(let n=0,s=this.passes.length;n<s;n++){const i=this.passes[n];if(i.enabled!==!1){if(i.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),i.render(this.renderer,this.writeBuffer,this.readBuffer,e,o),i.needsSwap){if(o){const l=this.renderer.getContext(),h=this.renderer.state.buffers.stencil;h.setFunc(l.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),h.setFunc(l.EQUAL,1,4294967295)}this.swapBuffers()}vn!==void 0&&(i instanceof vn?o=!0:i instanceof Os&&(o=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Ie);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const o=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(o,n),this.renderTarget2.setSize(o,n);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(o,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class ks extends uo{constructor(e,t,o=null,n=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=o,this.clearColor=n,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new $}render(e,t,o){const n=e.autoClear;e.autoClear=!1;let s,i;this.overrideMaterial!==null&&(i=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:o),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=i),e.autoClear=n}}const Ns={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new $(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class lo extends uo{constructor(e,t,o,n){super(),this.strength=t!==void 0?t:1,this.radius=o,this.threshold=n,this.resolution=e!==void 0?new Ie(e.x,e.y):new Ie(256,256),this.clearColor=new $(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),i=Math.round(this.resolution.y/2);this.renderTargetBright=new Oo(s,i,{type:Lo}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const f=new Oo(s,i,{type:Lo});f.texture.name="UnrealBloomPass.h"+d,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const m=new Oo(s,i,{type:Lo});m.texture.name="UnrealBloomPass.v"+d,m.texture.generateMipmaps=!1,this.renderTargetsVertical.push(m),s=Math.round(s/2),i=Math.round(i/2)}const l=Ns;this.highPassUniforms=No.clone(l.uniforms),this.highPassUniforms.luminosityThreshold.value=n,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ft({uniforms:this.highPassUniforms,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader}),this.separableBlurMaterials=[];const h=[3,5,7,9,11];s=Math.round(this.resolution.x/2),i=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(h[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new Ie(1/s,1/i),s=Math.round(s/2),i=Math.round(i/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const u=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=u,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const p=Dn;this.copyUniforms=No.clone(p.uniforms),this.blendMaterial=new ft({uniforms:this.copyUniforms,vertexShader:p.vertexShader,fragmentShader:p.fragmentShader,blending:tt,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new $,this.oldClearAlpha=1,this.basic=new De,this.fsQuad=new tn(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let o=Math.round(e/2),n=Math.round(t/2);this.renderTargetBright.setSize(o,n);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(o,n),this.renderTargetsVertical[s].setSize(o,n),this.separableBlurMaterials[s].uniforms.invSize.value=new Ie(1/o,1/n),o=Math.round(o/2),n=Math.round(n/2)}render(e,t,o,n,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const i=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=o.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=o.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let l=this.renderTargetBright;for(let h=0;h<this.nMips;h++)this.fsQuad.material=this.separableBlurMaterials[h],this.separableBlurMaterials[h].uniforms.colorTexture.value=l.texture,this.separableBlurMaterials[h].uniforms.direction.value=lo.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[h]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[h].uniforms.colorTexture.value=this.renderTargetsHorizontal[h].texture,this.separableBlurMaterials[h].uniforms.direction.value=lo.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[h]),e.clear(),this.fsQuad.render(e),l=this.renderTargetsVertical[h];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(o),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=i}getSeperableBlurMaterial(e){const t=[];for(let o=0;o<e;o++)t.push(.39894*Math.exp(-.5*o*o/(e*e))/e);return new ft({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Ie(.5,.5)},direction:{value:new Ie(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}}lo.BlurDirectionX=new Ie(1,0);lo.BlurDirectionY=new Ie(0,1);const _s={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class zs extends uo{constructor(){super();const e=_s;this.uniforms=No.clone(e.uniforms),this.material=new Zn({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new tn(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,o){this.uniforms.tDiffuse.value=o.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Qn.getTransfer(this._outputColorSpace)===Jn&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===es?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===ts?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===os?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===On?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ns?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ss&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const jt=18,ko=12,ct=0,wn=12,on={physics:0,chemistry:2*Math.PI/5,biology:2*(2*Math.PI)/5,mathematics:3*(2*Math.PI)/5,astronomy:4*(2*Math.PI)/5};function Qt(a){const e=on[a];return new C(Math.cos(e)*wn,ct,Math.sin(e)*wn)}const Ds=50,Gs=.1,Us=200,$o=new C(0,3.2,6.8),Zo=new C(0,1.8,0),Fs=2,Hs=.88,Vs=.35,Bs=.25,Ys=new $(15264495);new $(15396079);const Ws=new $(15132908),js=new $(14672616),qt=new $(15922423),xo=new $(2238e3),qs=new $(2040877),Ht=new $(13159636),po=new $(58879),Gn=new $(8146431),Xs=new $(16774630),Ks=new $(14739711),Qo=new $(16774112),yn=new $(16754470);function $s(a){const e=new Ln({antialias:!0,powerPreference:"high-performance",alpha:!1});return e.setPixelRatio(Math.min(window.devicePixelRatio,Fs)),e.setSize(window.innerWidth,window.innerHeight),e.toneMapping=On,e.toneMappingExposure=.94,e.shadowMap.enabled=!0,e.shadowMap.type=as,e.outputColorSpace=Jo,e.xr.enabled=!0,a.appendChild(e.domElement),e}function Zs(){const a=new is(Ds,window.innerWidth/window.innerHeight,Gs,Us);return a.position.copy($o),a}function Qs(a,e,t){const o=new Ie;a.getSize(o);const n=new Ls(a);n.addPass(new ks(e,t));const s=new lo(o,Vs,Bs,Hs);return n.addPass(s),n.addPass(new zs),{composer:n,bloomPass:s}}function Js(a,e,t){const o=()=>{const n=window.innerWidth,s=window.innerHeight;e.aspect=n/s,e.updateProjectionMatrix(),a.setSize(n,s),t.setSize(n,s)};return window.addEventListener("resize",o),o}const so=[{id:"kalam",name:"DR. A.P.J. ABDUL KALAM",category:"INDIAN SCIENTIFIC PIONEER",lifespan:"1931 – 2015  |  AEROSPACE & DEFENCE",subtitle:"Missile Man of India & 11th President of India",image:"/scientists/kalam.jpg",slides:[{quote:"“Dream is not that which you see while sleeping, it is something that does not let you sleep.”",equationName:"ROCKET PROPULSION & THRUST DYNAMICS",equation:"v(t) = v₀ + u · ln(m₀ / m) - g · t",discovery:"Architect of India’s first Satellite Launch Vehicle (SLV-3) and Indigenous Guided Missile Programme (AGNI & PRITHVI)."},{quote:"“To succeed in your mission, you must have single-minded devotion to your goal.”",equationName:"AERODYNAMIC RE-ENTRY HEATING",equation:"q̇ = C · √(ρ / R_n) · V³",discovery:"Pioneered carbon-composite heat shield structures for ballistic missile atmospheric re-entry protection."},{quote:"“Excellence happens not by accident. It is a process where an individual strives to better themselves.”",equationName:"ISRO-DRDO INDIGENOUS INTEGRATION",equation:"Technology Self-Reliance = Applied R&D × Vision",discovery:"Spearheaded nuclear technology integration and modernised India’s defence and aerospace infrastructure."}]},{id:"radhakrishnan",name:"DR. S. RADHAKRISHNAN",category:"INDIAN SCHOLAR & PHILOSOPHER",lifespan:"1888 – 1975  |  EPISTEMOLOGY & ETHICS",subtitle:"Statesman, Thinker & 2nd President of India",image:"/scientists/radhakrishnan.jpg",slides:[{quote:"“The true teachers are those who help us think for ourselves. Knowledge gives power, wisdom gives fullness.”",equationName:"EPISTEMOLOGY OF SCIENTIFIC DISCOVERY",equation:"Satyam · Shivam · Sundaram  [Truth & Goodness]",discovery:"Bridged eastern philosophy and modern scientific inquiry, championing rational thought in democratic nation-building."},{quote:"“When we think we know, we cease to learn. Humility is the foundation of genuine knowledge.”",equationName:"SYNTHESIS OF SCIENCE & SPIRIT",equation:"Progress = Empirical Truth × Ethical Responsibility",discovery:"Represented India at UNESCO and inspired national Teachers’ Day to celebrate mentorship in science and philosophy."}]},{id:"raman",name:"SIR C.V. RAMAN",category:"INDIAN SCIENTIFIC PIONEER",lifespan:"1888 – 1970  |  OPTICS & QUANTUM SPECTROSCOPY",subtitle:"Nobel Laureate in Physics (1930)",image:"/scientists/raman.JPG",slides:[{quote:"“The essence of science is independent thinking, hard work, and not equipment. I am the master of my failure.”",equationName:"THE RAMAN EFFECT (INELASTIC SCATTERING)",equation:"Δν = ν₀ - ν_s = ΔE_vib / h",discovery:"Discovered that photons scattered by molecules undergo frequency shifts revealing their vibrational quantum energy levels."},{quote:"“I would like to tell young men and women: Do not lose hope. Courage is the finest attribute of a scientist.”",equationName:"MOLECULAR LIGHT SCATTERING INTENSITY",equation:"I_s ∝ (1 + cos²θ) / λ⁴ · |α_ij|²",discovery:"First Asian scientist to receive the Nobel Prize in Physics; transformed chemical identification and molecular crystallography."}]},{id:"ramanujan",name:"SRINIVASA RAMANUJAN",category:"INDIAN SCIENTIFIC PIONEER",lifespan:"1887 – 1920  |  PURE MATHEMATICS & NUMBER THEORY",subtitle:"Fellow of the Royal Society, Cambridge",image:"/scientists/ramanujan.jpg",slides:[{quote:"“An equation for me has no meaning unless it expresses a thought of God.”",equationName:"RAMANUJAN INFINITE SERIES FOR π",equation:"1/π = (2√2 / 9801) ∑ₖ [(4k)!(1103 + 26390k)] / [(k!)⁴ 396⁴ᵏ]",discovery:"Formulated revolutionary identities in elliptic modular functions, mock theta series, and asymptotic partition theory p(n)."},{quote:"“To have made such discoveries with no formal training is the work of absolute mathematical genius.”",equationName:"HARDY-RAMANUJAN ASYMPTOTIC FORMULA",equation:"p(n) ∼ (1 / 4n√3) · exp( π √(2n/3) )",discovery:"Unveiled profound connections in analytic number theory now applied in string theory and black hole entropy."}]},{id:"snbose",name:"SATYENDRA NATH BOSE",category:"INDIAN SCIENTIFIC PIONEER",lifespan:"1894 – 1974  |  QUANTUM STATISTICAL MECHANICS",subtitle:"Pioneer of Quantum Statistics & Bosons",image:"/scientists/snbose.jpg",slides:[{quote:"“If science is to flourish, it must be pursued for the love of truth and with absolute freedom of spirit.”",equationName:"BOSE-EINSTEIN DISTRIBUTION FUNCTION",equation:"⟨nᵢ⟩ = gᵢ / [ e^( (εᵢ - μ) / k_B T ) - 1 ]",discovery:"Derived Planck’s law without classical electrodynamics, founding quantum statistics for integer-spin particles (Bosons)."},{quote:"“The mind must remain open, for the truth of nature is beyond all human pre-conceived notions.”",equationName:"BOSE-EINSTEIN CONDENSATION CRITICALITY",equation:"T_c = (2πℏ² / m k_B) · (n / 2.612)^(2/3)",discovery:"Predicted a new fifth state of matter where macroscopic ensembles of bosons condense into a single quantum wave function."}]},{id:"bhabha",name:"DR. HOMI J. BHABHA",category:"INDIAN SCIENTIFIC PIONEER",lifespan:"1909 – 1966  |  NUCLEAR & PARTICLE PHYSICS",subtitle:"Father of the Indian Nuclear Programme",image:"/scientists/bhabha.jpg",slides:[{quote:"“For the full industrialisation of any country, the vastest physical basis is atomic energy.”",equationName:"BHABHA SCATTERING CROSS-SECTION (e⁺ e⁻ → e⁺ e⁻)",equation:"dσ/dΩ = (α² / 8E²) [ (1 + cos⁴(θ/2))/sin⁴(θ/2) + ... ]",discovery:"Calculated electron-positron relativistic scattering in quantum electrodynamics and founded TIFR & BARC."},{quote:"“Science does not simply solve problems; it builds the intellectual infrastructure of an entire civilization.”",equationName:"THREE-STAGE NUCLEAR POWER PROGRAMME",equation:"²³²Th + n → ²³³Th → ²³³Pa → ²³³U  (Thorium Fuel Cycle)",discovery:"Devised India’s long-term energy security strategy utilizing abundant indigenous thorium deposits."}]},{id:"sarabhai",name:"DR. VIKRAM SARABHAI",category:"INDIAN SCIENTIFIC PIONEER",lifespan:"1919 – 1971  |  COSMIC RAYS & SPACE EXPLORATION",subtitle:"Father of the Indian Space Programme (ISRO)",image:"/scientists/sarabhai.jpg",slides:[{quote:"“We must be second to none in the application of advanced technologies to the real problems of man and society.”",equationName:"COSMIC RAY SOLAR DIURNAL VARIATION",equation:"J⃗ = q n (v⃗_E + v⃗_D + v⃗_‖)  [Plasma Drift]",discovery:"Established India’s space program, launched the Thumba Equatorial Rocket Station, and founded ISRO."},{quote:"“He who can listen to the music in the midst of noise can achieve the greatest things.”",equationName:"SATELLITE INSTRUCTIONAL TELEVISION (SITE)",equation:"Broadband Satellite Communication = Direct Social Impact",discovery:"Pioneered direct satellite educational broadcasts to rural communities, demonstrating technological humanitarianism."}]},{id:"jcbose",name:"SIR JAGADISH CHANDRA BOSE",category:"INDIAN SCIENTIFIC PIONEER",lifespan:"1858 – 1937  |  MICROWAVE OPTICS & PLANT BIOPHYSICS",subtitle:"Pioneer of Millimetre Radio Waves & Crescograph",image:"/scientists/jcbose.JPG",slides:[{quote:"“The true laboratory is the mind, where behind all illusions we uncover the immutable laws of truth.”",equationName:"MICROWAVE OPTICS GENERATION (λ = 5mm, 60 GHz)",equation:"∇ × E⃗ = -∂B⃗/∂t,   ∇ × B⃗ = μ₀ε₀ ∂E⃗/∂t",discovery:"Invented millimetre-wave radio transmitters using semiconductor galena crystal detectors, preceding modern Wi-Fi & 5G."},{quote:"“In the pursuit of science, there is no barrier of race or country. Science is universal.”",equationName:"CRESCOGRAPH CELLULAR PLANT RESPONSE",equation:"ΔL = M · Δx  [10,000× Magnification of Plant Growth]",discovery:"Demonstrated electrical conduction and fatigue responses in living plants analogous to animal nervous tissue."}]},{id:"einstein",name:"ALBERT EINSTEIN",category:"GLOBAL SCIENTIFIC HERITAGE",lifespan:"1879 – 1955  |  THEORETICAL PHYSICS",subtitle:"Nobel Laureate in Physics (1921)",image:"/scientists/einstein.jpg",slides:[{quote:"“Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the world.”",equationName:"EINSTEIN FIELD EQUATIONS & MASS-ENERGY",equation:"G_μν + Λ g_μν = (8πG / c⁴) T_μν ,   E = mc²",discovery:"Formulated Special and General Relativity, revolutionizing gravity as spacetime curvature and explaining the photoelectric effect."}]},{id:"newton",name:"SIR ISAAC NEWTON",category:"GLOBAL SCIENTIFIC HERITAGE",lifespan:"1643 – 1727  |  CLASSICAL MECHANICS & OPTICS",subtitle:"Foundations of Modern Mathematical Physics",image:"/scientists/newton.jpg",slides:[{quote:"“If I have seen further, it is by standing on the shoulders of giants.”",equationName:"LAW OF UNIVERSAL GRAVITATION & MOTION",equation:"F⃗ = -G (m₁ m₂ / r²) r̂,   F⃗ = dp⃗/dt = m a⃗",discovery:"Established the three fundamental laws of motion, universal gravitation, infinitesimal calculus, and optical prism refraction."}]},{id:"curie",name:"MARIE SKŁODOWSKA CURIE",category:"GLOBAL SCIENTIFIC HERITAGE",lifespan:"1867 – 1934  |  RADIOCHEMISTRY & NUCLEAR PHYSICS",subtitle:"Two-Time Nobel Laureate (Physics 1903, Chemistry 1911)",image:"/scientists/curie.jpg",slides:[{quote:"“Nothing in life is to be feared, it is only to be understood. Now is the time to understand more.”",equationName:"LAW OF RADIOACTIVE DISINTEGRATION",equation:"N(t) = N₀ e^(-λ t),   A(t) = -dN/dt = λ N(t)",discovery:"Discovered Polonium and Radium, defined the nature of radioactivity, and developed mobile radiography units for battlefield surgery."}]},{id:"tesla",name:"NIKOLA TESLA",category:"GLOBAL SCIENTIFIC HERITAGE",lifespan:"1856 – 1943  |  ELECTROMAGNETISM & POWER SYSTEMS",subtitle:"Visionary Pioneer of Alternating Current",image:"/scientists/tesla.jpg",slides:[{quote:"“If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.”",equationName:"LC RESONANT FREQUENCY & TESLA TRANSFORMER",equation:"f_r = 1 / (2π √(L C)),   ω = 2π f",discovery:"Invented the polyphase AC induction motor, alternating current power grid, radio remote control, and the resonant Tesla transformer."}]}];function bn(a,e=null){const t=document.createElement("canvas");t.width=1400,t.height=1640;const o=t.getContext("2d"),n=t.width,s=t.height,i=o.createLinearGradient(0,0,0,s);i.addColorStop(0,"#151923"),i.addColorStop(.3,"#10131b"),i.addColorStop(.8,"#0b0d14"),i.addColorStop(1,"#07090e"),o.fillStyle=i,o.fillRect(0,0,n,s),o.strokeStyle="#262f3f",o.lineWidth=14,o.strokeRect(7,7,n-14,s-14),o.strokeStyle="rgba(212, 175, 55, 0.45)",o.lineWidth=2,o.strokeRect(22,22,n-44,s-44);const l=28;o.strokeStyle="#d4af37",o.lineWidth=3,o.strokeRect(26,26,l,l),o.strokeRect(n-26-l,26,l,l),o.strokeRect(26,s-26-l,l,l),o.strokeRect(n-26-l,s-26-l,l,l);const h=1200,u=1260,p=75;if(e&&e.complete&&e.naturalWidth>0){const w=Math.min(h/e.naturalWidth,u/e.naturalHeight),c=Math.round(e.naturalWidth*w),b=Math.round(e.naturalHeight*w),x=Math.round((n-c)/2),R=Math.round(p+(u-b)/2);o.shadowColor="rgba(0, 0, 0, 0.9)",o.shadowBlur=24,o.shadowOffsetY=6,o.fillStyle="#06080d",o.fillRect(x,R,c,b),o.shadowColor="transparent",o.drawImage(e,0,0,e.naturalWidth,e.naturalHeight,x,R,c,b),o.strokeStyle="rgba(212, 175, 55, 0.85)",o.lineWidth=3.5,o.strokeRect(x,R,c,b),o.strokeStyle="rgba(255, 255, 255, 0.2)",o.lineWidth=1.5,o.strokeRect(x+6,R+6,c-12,b-12)}else{const b=(n-1e3)/2,x=p+30;o.fillStyle="#181e28",o.fillRect(b,x,1e3,1200),o.fillStyle="#6b7280",o.font='italic 24px "Georgia", serif',o.textAlign="center",o.fillText("Archival Portrait Loading…",n/2,x+1200/2)}const d=p+u+125;let f=74;for(o.font=`900 ${f}px "Inter", "Segoe UI", "Arial Black", sans-serif`;o.measureText(a.name).width>n-180&&f>48;)f-=2,o.font=`900 ${f}px "Inter", "Segoe UI", "Arial Black", sans-serif`;o.textAlign="center",o.textBaseline="middle",o.letterSpacing="4px",o.shadowColor="rgba(0, 0, 0, 0.9)",o.shadowBlur=16,o.shadowOffsetY=4,o.fillStyle="#ffffff",o.fillText(a.name,n/2,d),o.shadowColor="transparent",o.shadowBlur=0,o.shadowOffsetY=0;const m=o.measureText(a.name).width,y=Math.min(m+80,n-280),g=d+46;return o.strokeStyle="rgba(212, 175, 55, 0.65)",o.lineWidth=2,o.beginPath(),o.moveTo(n/2-y/2,g),o.lineTo(n/2+y/2,g),o.stroke(),o.fillStyle="#d4af37",o.font='16px "Inter", sans-serif',o.fillText("◆",n/2,g),t}function ea(a){const e=new U;e.name="ScientistMuseumExhibits",a.add(e);const t=24,o=18-.05,n=3.44,s=n*(1400/1640),i=[],l=new ee({color:13159636,metalness:.94,roughness:.24,clearcoat:.5}),h=new F({color:1580068,roughness:.85,metalness:.15}),u=new Map;so.forEach(d=>{const f=new Image;f.crossOrigin="anonymous",f.src=d.image,u.set(d.id,f)});let p=0;for(let d=0;d<t;d++){if(d%2!==0)continue;let f=p%so.length,m=so[f];p++;const y=d/t*Math.PI*2,g=(d+1)/t*Math.PI*2,w=(y+g)/2,c=new U;c.position.set(Math.cos(w)*(o-.06),3.4,Math.sin(w)*(o-.06)),c.lookAt(0,3.4,0),e.add(c);const b=new me(s,n,.08),x=new r(b,h);x.position.set(0,0,-.04),x.receiveShadow=!0,c.add(x);const R=new me(s+.04,n+.04,.03),I=new r(R,l);I.position.set(0,0,-.01),c.add(I);const k=new Lt(s*.94,n*.94),_=u.get(m.id),E=bn(m,_),T=new ht(E);T.colorSpace=Jo,T.minFilter=Ft,T.generateMipmaps=!0;const q=new F({map:T,emissive:16777215,emissiveMap:T,emissiveIntensity:.65,roughness:.88,metalness:0,side:We,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),W=new r(k,q);W.position.set(0,0,.025),c.add(W);const ae=ge=>{f=(ge+so.length)%so.length,m=so[f];const be=u.get(m.id),ue=bn(m,be);T.image=ue,T.needsUpdate=!0};_&&!_.complete&&(_.onload=()=>ae(f)),i.push({get scientist(){return m},get currentScientistIdx(){return f},mesh:W,texture:T,redraw:ae})}return{exhibits:i}}function ta(a,e){const t=new U;return t.name="AtriumGroup",a.add(t),oa(a),na(t),sa(t),aa(t),ea(t),ia(t),ra(t),la(t),t}function oa(a){const e=new Ln({antialias:!1}),t=new rs(e);t.compileEquirectangularShader();const o=new kn;o.background=new $(790552);const n=new me(8,.35,1.5),s=new De({color:47316}),i=new De({color:16773341});new De({color:6174129});for(let p=0;p<8;p++){const d=p/8*Math.PI*2,f=new r(n,p%2===0?i:s);f.position.set(Math.cos(d)*14,7.5+Math.sin(p)*1.5,Math.sin(d)*14),f.rotation.y=-d,o.add(f)}const l=new r(new ot(8,.3,16,64),i);l.position.set(0,11,0),l.rotation.x=Math.PI/2,o.add(l);const h=new ls(.1,100,new cs(256));h.update(e,o);const u=t.fromCubemap(h.renderTarget.texture).texture;a.environment=u,e.dispose(),t.dispose()}function na(a){const e=jt+.5,t=new P(e,e,.2,128),o=new ee({color:js,roughness:.3,metalness:.04,clearcoat:.22,clearcoatRoughness:.28,reflectivity:.45,envMapIntensity:.7}),n=new r(t,o);n.position.y=ct-.1,n.receiveShadow=!0,a.add(n);const s=[4.2,8.2,12,15.6],i=new ee({color:Ht,metalness:.94,roughness:.24,clearcoat:.5}),l=new F({color:xo,roughness:.88,metalness:.1});for(const h of s){const u=new zt(h-.08,h+.08,96);u.rotateX(-Math.PI/2);const p=new r(u,l);p.position.y=ct+.001,p.receiveShadow=!0,a.add(p);const d=new zt(h-.04,h+.04,96);d.rotateX(-Math.PI/2);const f=new r(d,i);f.position.y=ct+.002,f.receiveShadow=!0,a.add(f)}for(let h=0;h<24;h++){const u=h/24*Math.PI*2,p=e-3.2,d=new Lt(.045,p);d.rotateX(-Math.PI/2),d.rotateY(u);const f=new r(d,l);f.position.set(Math.cos(u)*(p/2+2.8),ct+.0015,Math.sin(u)*(p/2+2.8)),a.add(f)}}function sa(a){const e=[],t=jt,o=ko;e.push(new Ie(t+.6,ct)),e.push(new Ie(t,ct+.05));for(let l=0;l<=12;l++){const h=l/12,u=ct+.05+h*6.2,p=t+Math.sin(h*Math.PI)*.35;e.push(new Ie(p,u))}e.push(new Ie(t-.25,ct+6.8)),e.push(new Ie(t-1.15,ct+7.9));for(let l=0;l<=12;l++){const u=l/12*Math.PI/2,p=ct+7.9+Math.sin(u)*(o-7.9),d=(t-1.15)*(1-Math.sin(u*.94));e.push(new Ie(Math.max(d,2.6),p))}e.push(new Ie(2.6,o+.15)),e.push(new Ie(2.9,o+.45));const n=new Nn(e,96);n.computeVertexNormals();const s=new F({color:Ws,roughness:.74,metalness:.04,side:zo}),i=new r(n,s);i.receiveShadow=!0,a.add(i)}function aa(a){const t=jt-.05,o=new ee({color:Ht,metalness:.94,roughness:.22,clearcoat:.5}),n=new F({color:xo,roughness:.88,metalness:.12}),s=new F({color:Ys,roughness:.72,metalness:.04});new ee({color:qs,roughness:.35,metalness:.65,clearcoat:.3});for(let i=0;i<24;i++){const l=i/24*Math.PI*2,h=(i+1)/24*Math.PI*2,u=(l+h)/2,p=new me(.18,6.3,.32),d=new r(p,n);d.position.set(Math.cos(l)*(t+.02),ct+3.2,Math.sin(l)*(t+.02)),d.rotation.y=-l+Math.PI/2,a.add(d);const f=new me(.1,6.2,.22),m=new r(f,o);m.position.set(Math.cos(l)*t,ct+3.2,Math.sin(l)*t),m.rotation.y=-l+Math.PI/2,m.castShadow=!0,m.receiveShadow=!0,a.add(m);const y=2*Math.PI*t/24-.26,g=new me(y,5.8,.06),w=new r(g,s);w.position.set(Math.cos(u)*(t-.02),ct+3.2,Math.sin(u)*(t-.02)),w.rotation.y=-u+Math.PI/2,w.receiveShadow=!0,a.add(w)}}function ia(a){const e=new U;e.name="CeilingGrid";const t=new ee({color:Ht,metalness:.94,roughness:.22,clearcoat:.5}),o=new F({color:xo,roughness:.88,metalness:.1}),n=[{r:15.2,y:8.2,w:.12},{r:12.4,y:9.3,w:.1},{r:9,y:10.3,w:.1},{r:5.6,y:11.2,w:.08}];for(const f of n){const m=new ot(f.r,f.w*.7,8,96),y=new r(m,o);y.position.y=f.y,y.rotation.x=Math.PI/2,e.add(y);const g=new ot(f.r,f.w*.45,8,96),w=new r(g,t);w.position.y=f.y+.02,w.rotation.x=Math.PI/2,e.add(w)}const s=12;for(let f=0;f<s;f++){const m=f/s*Math.PI*2,y=new ds(new C(Math.cos(m)*(jt-1.2),7.8,Math.sin(m)*(jt-1.2)),new C(Math.cos(m)*7.5,11.2,Math.sin(m)*7.5),new C(Math.cos(m)*2.7,ko+.05,Math.sin(m)*2.7)),g=new Ot(y,32,.07,8,!1),w=new r(g,t);w.castShadow=!0,w.receiveShadow=!0,e.add(w)}const i=new ot(2.65,.16,16,64),l=new ee({color:Ht,roughness:.18,metalness:.92,clearcoat:.6}),h=new r(i,l);h.position.set(0,ko+.1,0),h.rotation.x=Math.PI/2,e.add(h);const u=new Do(2.55,48);u.rotateX(Math.PI/2);const p=new ee({color:792102,transmission:.82,roughness:.15,ior:1.48,transparent:!0,opacity:.85}),d=new r(u,p);d.position.set(0,ko+.14,0),e.add(d),a.add(e)}function ra(a){const e=jt,t=new ot(e-.12,.045,12,96),o=new F({color:8755,emissive:po,emissiveIntensity:2.2,roughness:.2}),n=new r(t,o);n.position.y=ct+.06,n.rotation.x=Math.PI/2,a.add(n);const s=new ot(e-1.22,.05,12,96),i=new F({color:3351057,emissive:Qo,emissiveIntensity:2,roughness:.2}),l=new r(s,i);l.position.y=ct+7.65,l.rotation.x=Math.PI/2,a.add(l);const h=new ot(e+.08,.035,12,96),u=new F({color:2232627,emissive:Gn,emissiveIntensity:2,roughness:.2}),p=new r(h,u);p.position.y=ct+4.2,p.rotation.x=Math.PI/2,a.add(p)}function la(a){const e=new U;e.position.set(0,ct,0);const t=new P(2.4,2.6,.15,64),o=new F({color:qt,roughness:.92,metalness:0}),n=new r(t,o);n.position.y=.075,n.receiveShadow=!0,e.add(n);const s=new zt(1.8,1.95,64);s.rotateX(-Math.PI/2);const i=new F({emissive:po,emissiveIntensity:2,color:58879}),l=new r(s,i);l.position.y=.151,e.add(l);const h=ca(),u=new Do(1.68,64);u.rotateX(-Math.PI/2);const p=new F({map:h,roughness:.25,metalness:.1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),d=new r(u,p);d.position.y=.152,e.add(d);const f=new zt(1.67,1.71,64);f.rotateX(-Math.PI/2);const m=new F({color:13938487,metalness:.85,roughness:.2}),y=new r(f,m);y.position.y=.153,e.add(y),a.add(e)}function ca(){const a=document.createElement("canvas");a.width=2048,a.height=2048;const e=a.getContext("2d"),t=2048,o=2048,n=t/2,s=o/2,i=new ht(a);i.colorSpace=Jo,i.anisotropy=16,i.generateMipmaps=!0,i.minFilter=hs,i.magFilter=Ft;function l(d){e.clearRect(0,0,t,o),e.save(),e.beginPath(),e.arc(n,s,995,0,Math.PI*2),e.fillStyle="#ffffff",e.shadowColor="rgba(0, 229, 255, 0.45)",e.shadowBlur=45,e.fill(),e.restore();const f=e.createLinearGradient(0,0,t,o);f.addColorStop(0,"#ffd700"),f.addColorStop(.2,"#fff2a3"),f.addColorStop(.45,"#d4af37"),f.addColorStop(.7,"#fff8db"),f.addColorStop(1,"#a38426"),e.beginPath(),e.arc(n,s,985,0,Math.PI*2),e.fillStyle=f,e.fill(),e.beginPath(),e.arc(n,s,962,0,Math.PI*2),e.fillStyle="#022116",e.fill();const m=e.createRadialGradient(n,s,660,n,s,960);if(m.addColorStop(0,"#064e3b"),m.addColorStop(.4,"#046a48"),m.addColorStop(.8,"#023826"),m.addColorStop(1,"#012015"),e.beginPath(),e.arc(n,s,952,0,Math.PI*2),e.arc(n,s,668,0,Math.PI*2,!0),e.fillStyle=m,e.fill(),e.lineWidth=4,e.strokeStyle="#d4af37",e.beginPath(),e.arc(n,s,944,0,Math.PI*2),e.stroke(),e.beginPath(),e.arc(n,s,676,0,Math.PI*2),e.stroke(),u(e,"SENIOR GREEN HOUSE",n,s,810,-Math.PI/2,!1,86),u(e,"2026-27",n,s,810,Math.PI/2,!0,86),h(e,n-810,s,5,34,16,"#ffd700"),h(e,n+810,s,5,34,16,"#ffd700"),e.beginPath(),e.arc(n,s,664,0,Math.PI*2),e.fillStyle=f,e.fill(),e.beginPath(),e.arc(n,s,642,0,Math.PI*2),e.fillStyle="#ffffff",e.fill(),d&&d.complete&&d.naturalWidth>0){e.save(),e.beginPath(),e.arc(n,s,634,0,Math.PI*2),e.clip();const y=1240;e.drawImage(d,n-y/2,s-y/2,y,y),e.restore()}e.lineWidth=6,e.strokeStyle="#d4af37",e.beginPath(),e.arc(n,s,634,0,Math.PI*2),e.stroke()}function h(d,f,m,y,g,w,c){let b=Math.PI/2*3,x=f,R=m;const I=Math.PI/y;d.save(),d.beginPath(),d.moveTo(f,m-g);for(let k=0;k<y;k++)x=f+Math.cos(b)*g,R=m+Math.sin(b)*g,d.lineTo(x,R),b+=I,x=f+Math.cos(b)*w,R=m+Math.sin(b)*w,d.lineTo(x,R),b+=I;d.lineTo(f,m-g),d.closePath(),d.fillStyle=c,d.shadowColor="#ffe066",d.shadowBlur=18,d.fill(),d.restore()}function u(d,f,m,y,g,w,c,b=84){d.save(),d.font=`900 ${b}px "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,d.fillStyle="#ffffff",d.shadowColor="rgba(0, 0, 0, 0.85)",d.shadowBlur=14,d.shadowOffsetX=2,d.shadowOffsetY=3;const x=f.split(""),R=x.map(E=>d.measureText(E).width+10),k=R.reduce((E,T)=>E+T,0)/g;let _=c?w+k/2:w-k/2;for(let E=0;E<x.length;E++){const T=x[E],q=R[E],W=q/g;if(d.save(),c){_-=W/2;const ae=m+g*Math.cos(_),ge=y+g*Math.sin(_);d.translate(ae,ge),d.rotate(_-Math.PI/2),d.fillText(T,-q/2,0),_-=W/2}else{_+=W/2;const ae=m+g*Math.cos(_),ge=y+g*Math.sin(_);d.translate(ae,ge),d.rotate(_+Math.PI/2),d.fillText(T,-q/2,0),_+=W/2}d.restore()}d.restore()}l(null);const p=new Image;return p.crossOrigin="anonymous",p.onload=()=>{l(p),i.needsUpdate=!0},p.src="/2077927617.jpg",i}function da(a){const e=new mn(Xs,1.05);e.position.set(12,22,10),e.castShadow=!0;const t=jt+2;e.shadow.camera.left=-t,e.shadow.camera.right=t,e.shadow.camera.top=t,e.shadow.camera.bottom=-t,e.shadow.camera.near=1,e.shadow.camera.far=45,e.shadow.mapSize.width=1024,e.shadow.mapSize.height=1024,e.shadow.bias=-3e-4,e.shadow.normalBias=.02,a.add(e);const o=new mn(Ks,.28);o.position.set(-14,15,-12),o.castShadow=!1,a.add(o);const n=new us(15134199,14014946,.5);n.position.set(0,20,0),a.add(n);const s=new ps(2106414,.25);a.add(s);const i=8,l=jt-.9;for(let d=0;d<i;d++){const f=d/i*Math.PI*2;let m;d%4===0?m=Qo:d%4===1?m=po:d%4===2?m=yn:m=Gn;const y=new Wt(m,.85,9,1.8);y.position.set(Math.cos(f)*l,.45,Math.sin(f)*l),a.add(y)}const h=8,u=15;for(let d=0;d<h;d++){const f=d/h*Math.PI*2,m=d%2===0?Qo:yn,y=new Wt(m,.85,12,1.7);y.position.set(Math.cos(f)*u,7.75,Math.sin(f)*u),a.add(y)}const p=new fs(16054271,.75,18,Math.PI/4.5,.45,1.4);p.position.set(0,11.5,0),p.target.position.set(0,0,0),a.add(p),a.add(p.target)}const xn={type:"change"},nn={type:"start"},Un={type:"end"},Ro=new gs,Sn=new _n,ha=Math.cos(70*lt.DEG2RAD),dt=new C,Ct=2*Math.PI,je={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Xo=1e-6;class ua extends ms{constructor(e,t=null){super(e,t),this.state=je.NONE,this.enabled=!0,this.target=new C,this.cursor=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:io.ROTATE,MIDDLE:io.DOLLY,RIGHT:io.PAN},this.touches={ONE:Vt.ROTATE,TWO:Vt.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new C,this._lastQuaternion=new Zt,this._lastTargetPosition=new C,this._quat=new Zt().setFromUnitVectors(e.up,new C(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new gn,this._sphericalDelta=new gn,this._scale=1,this._panOffset=new C,this._rotateStart=new Ie,this._rotateEnd=new Ie,this._rotateDelta=new Ie,this._panStart=new Ie,this._panEnd=new Ie,this._panDelta=new Ie,this._dollyStart=new Ie,this._dollyEnd=new Ie,this._dollyDelta=new Ie,this._dollyDirection=new C,this._mouse=new Ie,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=fa.bind(this),this._onPointerDown=pa.bind(this),this._onPointerUp=ma.bind(this),this._onContextMenu=Sa.bind(this),this._onMouseWheel=wa.bind(this),this._onKeyDown=ya.bind(this),this._onTouchStart=ba.bind(this),this._onTouchMove=xa.bind(this),this._onMouseDown=ga.bind(this),this._onMouseMove=va.bind(this),this._interceptControlDown=Ma.bind(this),this._interceptControlUp=Ca.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(xn),this.update(),this.state=je.NONE}update(e=null){const t=this.object.position;dt.copy(t).sub(this.target),dt.applyQuaternion(this._quat),this._spherical.setFromVector3(dt),this.autoRotate&&this.state===je.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let o=this.minAzimuthAngle,n=this.maxAzimuthAngle;isFinite(o)&&isFinite(n)&&(o<-Math.PI?o+=Ct:o>Math.PI&&(o-=Ct),n<-Math.PI?n+=Ct:n>Math.PI&&(n-=Ct),o<=n?this._spherical.theta=Math.max(o,Math.min(n,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(o+n)/2?Math.max(o,this._spherical.theta):Math.min(n,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const i=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=i!=this._spherical.radius}if(dt.setFromSpherical(this._spherical),dt.applyQuaternion(this._quatInverse),t.copy(this.target).add(dt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let i=null;if(this.object.isPerspectiveCamera){const l=dt.length();i=this._clampDistance(l*this._scale);const h=l-i;this.object.position.addScaledVector(this._dollyDirection,h),this.object.updateMatrixWorld(),s=!!h}else if(this.object.isOrthographicCamera){const l=new C(this._mouse.x,this._mouse.y,0);l.unproject(this.object);const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=h!==this.object.zoom;const u=new C(this._mouse.x,this._mouse.y,0);u.unproject(this.object),this.object.position.sub(u).add(l),this.object.updateMatrixWorld(),i=dt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;i!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(i).add(this.object.position):(Ro.origin.copy(this.object.position),Ro.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ro.direction))<ha?this.object.lookAt(this.target):(Sn.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ro.intersectPlane(Sn,this.target))))}else if(this.object.isOrthographicCamera){const i=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),i!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Xo||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Xo||this._lastTargetPosition.distanceToSquared(this.target)>Xo?(this.dispatchEvent(xn),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Ct/60*this.autoRotateSpeed*e:Ct/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){dt.setFromMatrixColumn(t,0),dt.multiplyScalar(-e),this._panOffset.add(dt)}_panUp(e,t){this.screenSpacePanning===!0?dt.setFromMatrixColumn(t,1):(dt.setFromMatrixColumn(t,0),dt.crossVectors(this.object.up,dt)),dt.multiplyScalar(e),this._panOffset.add(dt)}_pan(e,t){const o=this.domElement;if(this.object.isPerspectiveCamera){const n=this.object.position;dt.copy(n).sub(this.target);let s=dt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/o.clientHeight,this.object.matrix),this._panUp(2*t*s/o.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/o.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/o.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const o=this.domElement.getBoundingClientRect(),n=e-o.left,s=t-o.top,i=o.width,l=o.height;this._mouse.x=n/i*2-1,this._mouse.y=-(s/l)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Ct*this._rotateDelta.x/t.clientHeight),this._rotateUp(Ct*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(Ct*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-Ct*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(Ct*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-Ct*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),o=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._rotateStart.set(o,n)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),o=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._panStart.set(o,n)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),o=e.pageX-t.x,n=e.pageY-t.y,s=Math.sqrt(o*o+n*n);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const o=this._getSecondPointerPosition(e),n=.5*(e.pageX+o.x),s=.5*(e.pageY+o.y);this._rotateEnd.set(n,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Ct*this._rotateDelta.x/t.clientHeight),this._rotateUp(Ct*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),o=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._panEnd.set(o,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),o=e.pageX-t.x,n=e.pageY-t.y,s=Math.sqrt(o*o+n*n);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const i=(e.pageX+t.x)*.5,l=(e.pageY+t.y)*.5;this._updateZoomParameters(i,l)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ie,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,o={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:o.deltaY*=16;break;case 2:o.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(o.deltaY*=10),o}}function pa(a){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(a.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(a)&&(this._addPointer(a),a.pointerType==="touch"?this._onTouchStart(a):this._onMouseDown(a)))}function fa(a){this.enabled!==!1&&(a.pointerType==="touch"?this._onTouchMove(a):this._onMouseMove(a))}function ma(a){switch(this._removePointer(a),this._pointers.length){case 0:this.domElement.releasePointerCapture(a.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Un),this.state=je.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function ga(a){let e;switch(a.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case io.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(a),this.state=je.DOLLY;break;case io.ROTATE:if(a.ctrlKey||a.metaKey||a.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(a),this.state=je.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(a),this.state=je.ROTATE}break;case io.PAN:if(a.ctrlKey||a.metaKey||a.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(a),this.state=je.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(a),this.state=je.PAN}break;default:this.state=je.NONE}this.state!==je.NONE&&this.dispatchEvent(nn)}function va(a){switch(this.state){case je.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(a);break;case je.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(a);break;case je.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(a);break}}function wa(a){this.enabled===!1||this.enableZoom===!1||this.state!==je.NONE||(a.preventDefault(),this.dispatchEvent(nn),this._handleMouseWheel(this._customWheelEvent(a)),this.dispatchEvent(Un))}function ya(a){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(a)}function ba(a){switch(this._trackPointer(a),this._pointers.length){case 1:switch(this.touches.ONE){case Vt.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(a),this.state=je.TOUCH_ROTATE;break;case Vt.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(a),this.state=je.TOUCH_PAN;break;default:this.state=je.NONE}break;case 2:switch(this.touches.TWO){case Vt.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(a),this.state=je.TOUCH_DOLLY_PAN;break;case Vt.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(a),this.state=je.TOUCH_DOLLY_ROTATE;break;default:this.state=je.NONE}break;default:this.state=je.NONE}this.state!==je.NONE&&this.dispatchEvent(nn)}function xa(a){switch(this._trackPointer(a),this.state){case je.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(a),this.update();break;case je.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(a),this.update();break;case je.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(a),this.update();break;case je.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(a),this.update();break;default:this.state=je.NONE}}function Sa(a){this.enabled!==!1&&a.preventDefault()}function Ma(a){a.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ca(a){a.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Ta=10;function Ia(a,e){const t=new ua(a,e.domElement);t.enableDamping=!0,t.dampingFactor=.08,t.minDistance=3,t.maxDistance=35,t.maxPolarAngle=Math.PI*.48,t.target.copy(Zo),t.update(),t.touches={ONE:Vt.ROTATE,TWO:Vt.DOLLY_PAN},t.enablePan=!0,t.autoRotate=!1,t.autoRotateSpeed=.3;let o=null;const n=()=>{t.autoRotate=!1,o!==null&&clearTimeout(o),o=setTimeout(()=>{t.autoRotate=!0},Ta*1e3)},s=e.domElement,i=["pointerdown","pointermove","pointerup","wheel","touchstart","touchmove"];for(const l of i)s.addEventListener(l,n,{passive:!0});return n(),t}function Ea(a){const e=Qt(a),t=on[a],o=Math.cos(t),n=Math.sin(t),s=a==="astronomy",i=new C(e.x-o*(s?4.6:5.2),e.y+(s?2.1:2.5),e.z-n*(s?4.6:5.2)),l=new C(e.x,e.y+(s?1.5:2.2),e.z);return{cameraPos:i,lookTarget:l}}function Aa(a,e){let t=null,o=null;const n=[];function s(h,u,p){t&&(t.kill(),t=null),e.enableDamping=!1,e.autoRotate=!1;const d=Is.timeline({defaults:{duration:1.4,ease:"power2.inOut"},onComplete:()=>{a.position.copy(h),e.target.copy(u),e.enableDamping=!0,e.update(),t=null,o=p;for(const f of n)f(p)}});d.to(a.position,{x:h.x,y:h.y,z:h.z},0),d.to(e.target,{x:u.x,y:u.y,z:u.z},0),t=d}function i(h,u=!1){const{cameraPos:p,lookTarget:d}=Ea(h);if(u){t&&(t.kill(),t=null),a.position.copy(p),e.target.copy(d),e.update(),o=h;for(const f of n)f(h);return}s(p,d,h)}function l(h=!1){if(h){t&&(t.kill(),t=null),a.position.copy($o),e.target.copy(Zo),e.update(),o=null;for(const u of n)u(null);return}s($o.clone(),Zo.clone(),null)}return{transitionTo:i,transitionToSpawn:l,onStationChange(h){n.push(h)},get activeStation(){return o}}}const Pa=new C(0,0,1),Ra=new C(0,1,0),Mn=new go,Oa=new Zt,La=new Zt(-Math.sqrt(.5),0,0,Math.sqrt(.5)),Cn=new Zt;function ka(){if(typeof navigator>"u")return!1;const a=navigator.userAgent||"",e=typeof navigator.maxTouchPoints=="number"&&navigator.maxTouchPoints>1;return/Android|iPhone|iPad|iPod|Windows Phone|Mobile|Tablet/i.test(a)||e}function Na(){return typeof window>"u"?0:window.screen&&window.screen.orientation&&typeof window.screen.orientation.angle=="number"?window.screen.orientation.angle:typeof window.orientation=="number"?window.orientation:0}class _a{constructor(e,t){if(this.camera=e,this.controls=t,this.enabled=!1,this.hasSensorData=!1,this.permissionGranted=!1,this.alpha=0,this.beta=0,this.gamma=0,this.screenOrientation=0,this.yawOffset=0,this.initialHeadingCalibrated=!1,this.targetQuat=new Zt,this.currentQuat=new Zt,this._onDeviceOrientation=this._onDeviceOrientation.bind(this),this._onScreenOrientationChange=this._onScreenOrientationChange.bind(this),this._initListeners(),this._injectStyles(),this._createUI(),ka()){const o=async()=>{window.removeEventListener("touchstart",o),window.removeEventListener("touchend",o),this.enabled||await this.enable()};window.addEventListener("touchend",o,{passive:!0,once:!0})}}_initListeners(){window.addEventListener("orientationchange",this._onScreenOrientationChange,!1),window.screen&&window.screen.orientation&&window.screen.orientation.addEventListener("change",this._onScreenOrientationChange,!1),this._onScreenOrientationChange();let e=0,t=!1;window.addEventListener("touchstart",o=>{o.touches&&o.touches.length===1&&(e=o.touches[0].clientX,t=!0)},{passive:!0}),window.addEventListener("touchmove",o=>{if(t&&this.enabled&&o.touches&&o.touches.length===1){const n=o.touches[0].clientX-e;e=o.touches[0].clientX,this.yawOffset-=n*.0035}},{passive:!0}),window.addEventListener("touchend",()=>{t=!1},{passive:!0})}_onScreenOrientationChange(){this.screenOrientation=Na()}_onDeviceOrientation(e){if(!(e.alpha===null||typeof e.alpha>"u")){if(this.alpha=e.alpha,this.beta=e.beta||0,this.gamma=e.gamma||0,this.hasSensorData=!0,!this.initialHeadingCalibrated){this.initialHeadingCalibrated=!0;const t=new C(0,0,-1).applyQuaternion(this.camera.quaternion),o=Math.atan2(-t.x,-t.z),n=lt.degToRad(this.alpha);this.yawOffset=o-(Math.PI-n)}this._uiBtn&&!this._uiBtn.classList.contains("active")&&this._updateUIState(!0)}}async requestPermission(){if(typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function")try{const e=await DeviceOrientationEvent.requestPermission();return this.permissionGranted=e==="granted",this.permissionGranted}catch(e){return console.warn("DeviceOrientationEvent.requestPermission failed:",e),!1}return this.permissionGranted=!0,!0}async enable(){return await this.requestPermission()?(this.enabled=!0,window.addEventListener("deviceorientation",this._onDeviceOrientation,!1),window.addEventListener("deviceorientationabsolute",this._onDeviceOrientation,!1),this._updateUIState(!0),!0):(console.warn("Gyroscope permission not granted."),!1)}disable(){this.enabled=!1,window.removeEventListener("deviceorientation",this._onDeviceOrientation,!1),window.removeEventListener("deviceorientationabsolute",this._onDeviceOrientation,!1),this._updateUIState(!1)}async toggle(){this.enabled?this.disable():await this.enable()}update(e=.016){if(!this.enabled||!this.hasSensorData)return;const t=lt.degToRad(this.alpha),o=lt.degToRad(this.beta),n=lt.degToRad(this.gamma),s=lt.degToRad(this.screenOrientation);Mn.set(o,t,-n,"YXZ"),this.targetQuat.setFromEuler(Mn),this.targetQuat.multiply(La),this.targetQuat.multiply(Oa.setFromAxisAngle(Pa,-s)),this.yawOffset!==0&&(Cn.setFromAxisAngle(Ra,this.yawOffset),this.targetQuat.premultiply(Cn));const i=Math.min(1,e*22);this.camera.quaternion.slerp(this.targetQuat,i);const l=new C(0,0,-1).applyQuaternion(this.camera.quaternion);this.controls.target.copy(this.camera.position).addScaledVector(l,6)}_injectStyles(){if(document.getElementById("vz-gyro-styles"))return;const e=document.createElement("style");e.id="vz-gyro-styles",e.textContent=`
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
    `,e.addEventListener("click",t=>{t.stopPropagation(),this.toggle()}),document.body.appendChild(e),this._uiBtn=e}_updateUIState(e){if(this._uiBtn)if(e){this._uiBtn.classList.add("active");const t=this._uiBtn.querySelector(".vz-gyro-text");t&&(t.textContent="GYRO ACTIVE")}else{this._uiBtn.classList.remove("active");const t=this._uiBtn.querySelector(".vz-gyro-text");t&&(t.textContent="GYRO 360°")}}}function za(a,e){return new _a(a,e)}function Da(a,e={}){const t={uTime:a.uTime,uFlameMode:{value:e.flameMode??1},uColorOuter:{value:new $(e.colorOuter??30719)},uColorInner:{value:new $(e.colorInner??6750207)},uColorTip:{value:new $(e.colorTip??13226)},uFlicker:{value:1},uHeightScale:{value:1},uTurbulence:{value:1.1},uIntensity:{value:e.intensity??1.4}};return{material:new ft({uniforms:t,vertexShader:`
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

        // Soft Fresnel edge
        float edgeGlow = pow(1.0 - abs(vNormal.z), 1.6) * 0.35;
        col += uColorOuter * edgeGlow;

        // Clamp to strictly prevent bloom blowout / NaN overflow
        col = clamp(col, 0.0, 1.85);

        // Vertical alpha taper
        float alpha = radialAlpha * (1.0 - pow(y, 2.5)) * jitter;
        alpha = clamp(alpha * 1.1, 0.0, 0.92);

        if (alpha < 0.015) discard;

        gl_FragColor = vec4(col, alpha);
      }
    `,transparent:!0,blending:tt,depthWrite:!1,side:yo}),uniforms:t}}const Rt={clean:{name:"Base Blue (Hydrocarbon)",ion:"CH* / C₂*",salt:"Pure Fuel (Methane/Propane)",colorName:"Electric Premixed Blue",outerColor:26367,innerColor:61695,tipColor:8840,lightColor:30719,lightIntensity:.85,wavelengths:["431.4 nm (CH*)","473.7 nm (Swan)","516.5 nm (C₂*)"],spectralLines:[{nm:431.4,color:"#00ccff",intensity:.8},{nm:473.7,color:"#00aaff",intensity:.9},{nm:516.5,color:"#00ffaa",intensity:.85}],quantumTransition:"Radical electronic band transitions (Swan & CH*)",deltaE:"2.4–2.9 eV"},copper:{name:"Copper",ion:"Cu²⁺",salt:"Copper(II) Chloride (CuCl₂)",colorName:"Emerald Green & Turquoise",outerColor:58998,innerColor:8454107,tipColor:46296,lightColor:58998,lightIntensity:.95,wavelengths:["510.5 nm","515.3 nm","521.8 nm","578.2 nm"],spectralLines:[{nm:510.5,color:"#00ff88",intensity:.95},{nm:515.3,color:"#10f590",intensity:.9},{nm:521.8,color:"#38ef7d",intensity:1},{nm:578.2,color:"#c6ff00",intensity:.7}],quantumTransition:"4p → 4s (Excited d-orbital & s-orbital relaxation)",deltaE:"2.38 eV"},strontium:{name:"Strontium",ion:"Sr²⁺",salt:"Strontium Chloride (SrCl₂)",colorName:"Brilliant Crimson Scarlet",outerColor:16717636,innerColor:16741783,tipColor:13959168,lightColor:16717636,lightIntensity:1.05,wavelengths:["460.7 nm","605.0 nm","668.0 nm","683.0 nm"],spectralLines:[{nm:460.7,color:"#3d5afe",intensity:.4},{nm:605,color:"#ff5252",intensity:.75},{nm:646,color:"#ff1744",intensity:.85},{nm:668,color:"#d50000",intensity:1},{nm:683,color:"#b71c1c",intensity:.9}],quantumTransition:"5p → 5s (Singlet & triplet de-excitation)",deltaE:"1.85 eV"},sodium:{name:"Sodium",ion:"Na⁺",salt:"Sodium Chloride (NaCl / Halite)",colorName:"Intense Golden Yellow (D-Lines)",outerColor:16757504,innerColor:16773494,tipColor:16748288,lightColor:16752640,lightIntensity:1.1,wavelengths:["589.0 nm (D₂)","589.6 nm (D₁)"],spectralLines:[{nm:589,color:"#ffea00",intensity:1},{nm:589.6,color:"#ffd600",intensity:.95}],quantumTransition:"3p → 3s (Fine-structure spin-orbit doublet)",deltaE:"2.10 eV"},potassium:{name:"Potassium",ion:"K⁺",salt:"Potassium Chloride (KCl)",colorName:"Ethereal Lilac / Violet",outerColor:11766015,innerColor:15984117,tipColor:8146431,lightColor:11141375,lightIntensity:.9,wavelengths:["404.4 nm (Violet)","766.5 nm (Near-IR)","769.9 nm"],spectralLines:[{nm:404.4,color:"#b388ff",intensity:.9},{nm:404.7,color:"#d1c4e9",intensity:.7},{nm:693.9,color:"#b71c1c",intensity:.3},{nm:766.5,color:"#880e4f",intensity:.95}],quantumTransition:"4p → 4s and 5p → 4s (High-energy violet & IR)",deltaE:"3.06 eV & 1.62 eV"},barium:{name:"Barium",ion:"Ba²⁺",salt:"Barium Chloride (BaCl₂)",colorName:"Apple Pale Green",outerColor:8702998,innerColor:15531211,tipColor:5078031,lightColor:8702998,lightIntensity:.9,wavelengths:["513.7 nm","524.2 nm","534.1 nm","553.5 nm"],spectralLines:[{nm:513.7,color:"#65a30d",intensity:.75},{nm:524.2,color:"#84cc16",intensity:.95},{nm:534.1,color:"#a3e635",intensity:.9},{nm:553.5,color:"#bef264",intensity:1}],quantumTransition:"6p → 6s (Multiplet green line cascade)",deltaE:"2.24 eV"},calcium:{name:"Calcium",ion:"Ca²⁺",salt:"Calcium Chloride (CaCl₂)",colorName:"Fiery Brick-Red / Orange",outerColor:16733986,innerColor:16764092,tipColor:14172949,lightColor:16733986,lightIntensity:.95,wavelengths:["422.7 nm (Violet)","616.2 nm","622.0 nm (Orange-Red)"],spectralLines:[{nm:422.7,color:"#7c4dff",intensity:.5},{nm:616.2,color:"#ff7043",intensity:.85},{nm:622,color:"#ff5722",intensity:1}],quantumTransition:"4p → 4s and molecular CaOH orange bands",deltaE:"2.00 eV"}};function Ga(a,e){const t=new U;t.name="ChemistryStation";const o=Qt("chemistry");t.position.copy(o),a.add(t);const n=on.chemistry,s=Math.cos(n),i=Math.sin(n),l=i,h=-s,u=-i,p=s,d=-s,f=-i,m=Math.atan2(d,f),y={element:{value:"sodium"},airCollar:{value:1},setElement:null},g=new F({color:qt,roughness:.92,metalness:0}),w=new ee({color:Ht,metalness:.95,roughness:.15,clearcoat:.8}),c=new ee({color:13938487,metalness:.88,roughness:.28,clearcoat:.5}),b=new F({color:1447967,roughness:.82,metalness:.1}),x=new P(2.1,2.25,.82,48),R=new r(x,g);R.position.y=.41,R.receiveShadow=!0,R.castShadow=!0,t.add(R);const I=new ot(2.12,.03,16,64),k=new r(I,w);k.rotation.x=Math.PI/2,k.position.y=.82,t.add(k);const _=new ot(2.26,.02,16,64),E=new De({color:po,transparent:!0,opacity:.7}),T=new r(_,E);T.rotation.x=Math.PI/2,T.position.y=.03,t.add(T);const q=new P(1.4,1.45,.06,48),W=new r(q,b);W.position.y=.85,W.receiveShadow=!0,t.add(W);const ae=new ot(.55,.015,16,48),ge=new r(ae,w);ge.rotation.x=Math.PI/2,ge.position.y=.88,t.add(ge);const be=new U;be.position.set(0,.88,0),t.add(be);const ue=new P(.24,.28,.07,6),Y=new r(ue,c);Y.position.y=.035,Y.castShadow=!0,be.add(Y);const Be=new P(.025,.02,.22,16),Ve=new r(Be,c);Ve.rotation.z=Math.PI/2,Ve.position.set(-.24,.05,0),be.add(Ve);class Le extends zn{getPoint(ie,Ke=new C){const st=-.35-ie*.45,et=.05-Math.sin(ie*Math.PI)*.12-ie*.07,rt=Math.sin(ie*1.5)*.15;return Ke.set(st,et,rt)}}const ke=new Ot(new Le,24,.016,12,!1),nt=new r(ke,w);be.add(nt);const Ge=new U;Ge.position.y=.14,be.add(Ge);const $e=new P(.068,.068,.09,32),D=new r($e,w);Ge.add(D);const v=new De({color:328965});for(let fe=0;fe<2;fe++){const ie=new r(new me(.03,.05,.14),v);ie.rotation.y=fe*Math.PI/2,Ge.add(ie)}const V=new P(.052,.052,.62,32),O=new r(V,w);O.position.y=.48,O.castShadow=!0,be.add(O);const N=new P(.062,.052,.04,32),S=new r(N,w);S.position.y=.8,be.add(S);const oe=new P(.05,.05,.005,16),z=new r(oe,b);z.position.y=.815,be.add(z);const te=new U;te.position.set(0,.82,0),be.add(te);const{material:Me,uniforms:ve}=Da(e,{flameMode:1,intensity:1.4}),Q=new P(.008,.065,.92,32,48,!0);Q.translate(0,.46,0);const we=new r(Q,Me);te.add(we);const xe=new _e(.046,.42,32,24,!0);xe.translate(0,.21,0);const ce=new De({color:65535,transparent:!0,opacity:.95,blending:tt,side:yo,depthWrite:!1}),Ye=new r(xe,ce);te.add(Ye);const H=new Wt(16752640,1.1,4.5,2);H.position.set(0,.45,0),te.add(H);const Z=65,ne=new Yt,Ce=new Float32Array(Z*3),he=[];for(let fe=0;fe<Z;fe++){const ie=Math.random()*Math.PI*2,Ke=Math.random()*.055;Ce[fe*3+0]=Math.cos(ie)*Ke,Ce[fe*3+1]=Math.random()*.92,Ce[fe*3+2]=Math.sin(ie)*Ke,he.push({vx:(Math.random()-.5)*.08,vy:.65+Math.random()*.85,vz:(Math.random()-.5)*.08,seed:Math.random()*100})}ne.setAttribute("position",new Ut(Ce,3));const Ae=new vs({size:.026,color:16763972,transparent:!0,opacity:.85,blending:tt,depthWrite:!1}),ze=new ws(ne,Ae);te.add(ze);const A=new U;A.position.set(0,.88,0),t.add(A);const B=new ee({color:15792383,transmission:.92,ior:1.5,roughness:.04,metalness:.05,transparent:!0,opacity:.85}),Ee=[{key:"copper",label:"Cu²⁺",saltName:"CuCl₂",color:366185,alpha:-.65},{key:"strontium",label:"Sr²⁺",saltName:"SrCl₂",color:14427686,alpha:-.39},{key:"sodium",label:"Na⁺",saltName:"NaCl",color:16096779,alpha:-.13},{key:"potassium",label:"K⁺",saltName:"KCl",color:11032055,alpha:.13},{key:"barium",label:"Ba²⁺",saltName:"BaCl₂",color:8702998,alpha:.39},{key:"calcium",label:"Ca²⁺",saltName:"CaCl₂",color:15357964,alpha:.65}],Te={};Ee.forEach(fe=>{const ie=new U,Ke=Math.cos(fe.alpha),st=Math.sin(fe.alpha),et=.98*(Ke*d+st*u),rt=.98*(Ke*f+st*p);ie.position.set(et,.01,rt);const Kt=[new Ie(.001,0),new Ie(.08,.005),new Ie(.11,.02),new Ie(.12,.024)],At=new Nn(Kt,32),pt=new r(At,B);pt.receiveShadow=!0,ie.add(pt);const Mt=new _e(.085,.026,24);Mt.translate(0,.013,0);const $t=new F({color:fe.color,roughness:.65,metalness:.1}),Qe=new r(Mt,$t);ie.add(Qe);const _t=document.createElement("canvas");_t.width=256,_t.height=128;const Pt=_t.getContext("2d");Pt.clearRect(0,0,256,128),Pt.font="bold 50px monospace",Pt.fillStyle="#ffffff",Pt.textAlign="center",Pt.textBaseline="middle",Pt.fillText(fe.label,128,64);const Po=new ht(_t),Xn=new vo({map:Po,transparent:!0,opacity:.88}),qo=new wo(Xn);qo.scale.set(.32,.16,1),qo.position.set(0,.06,.12),ie.add(qo),A.add(ie),Te[fe.key]={group:ie,position:new C(et,.89,rt)}});const Se=new U,qe=.98*(Math.cos(-.95)*d+Math.sin(-.95)*u),at=.98*(Math.cos(-.95)*f+Math.sin(-.95)*p);Se.position.set(qe,.01,at);const L=new r(new P(.09,.09,.14,24),B);L.position.y=.07,Se.add(L);const j=new r(new P(.086,.086,.09,24),new ee({color:8965375,transmission:.9,opacity:.8,transparent:!0}));j.position.y=.06,Se.add(j);const X=document.createElement("canvas");X.width=256,X.height=128;const se=X.getContext("2d");se.font="bold 44px monospace",se.fillStyle="#88ccff",se.textAlign="center",se.textBaseline="middle",se.fillText("HCl Rinse",128,64);const pe=new ht(X),Pe=new wo(new vo({map:pe,transparent:!0,opacity:.8}));Pe.scale.set(.32,.16,1),Pe.position.set(0,.06,.12),Se.add(Pe),A.add(Se);const Ue=new U;Ue.position.set(u*.55,.88,p*.55),t.add(Ue);const Xe=new r(new P(.05,.06,.45,24),w);Xe.position.y=.225,Xe.castShadow=!0,Ue.add(Xe);const Ne=new U;Ne.position.y=.45,Ue.add(Ne);const Je=new r(new He(.06,16,16),c);Ne.add(Je);const Ze=new U;Ne.add(Ze);const Tt=new r(new P(.012,.012,.82,16),w);Tt.rotation.z=Math.PI/2,Tt.position.x=.41,Ze.add(Tt);const kt=new ee({color:16777215,metalness:.98,roughness:.1,clearcoat:1}),Et=new r(new ot(.018,.003,16,32),kt);Et.rotation.y=Math.PI/2,Et.position.set(.84,0,0),Ze.add(Et);const Re=new De({color:16766464,transparent:!0,opacity:0,blending:tt}),le=new r(new He(.014,16,16),Re);le.position.set(.84,0,0),Ze.add(le);const Oe=new U;Oe.position.set(l*1.35,1.82,h*1.35);const ut=o.x+l*1.35,yt=o.z+h*1.35,fo=Math.atan2(-ut,-yt);Oe.rotation.y=fo,t.add(Oe);const mt=new ys;mt.moveTo(-.12,-.1),mt.lineTo(.12,-.1),mt.lineTo(0,.14),mt.closePath();const Jt=new bs(mt,{depth:.18,bevelEnabled:!1});Jt.center();const Xt=new ee({color:16777215,transmission:.98,ior:1.58,roughness:.01,metalness:0,clearcoat:1,transparent:!0,opacity:.9}),eo=new r(Jt,Xt);eo.position.set(.78,-.15,0),Oe.add(eo);const Mo=new De({color:16777215,transparent:!0,opacity:.45,blending:tt}),G=new P(.007,.007,.9,8),K=new r(G,Mo);K.position.set(1.15,-.32,0),K.rotation.z=-Math.PI*.3,Oe.add(K);const J=document.createElement("canvas");J.width=1024,J.height=256;const M=J.getContext("2d"),de=new ht(J);de.minFilter=Ft;const ye=new Lt(2,.6,32,1),Fe=ye.attributes.position;for(let fe=0;fe<Fe.count;fe++){const ie=Fe.getX(fe);Fe.setZ(fe,-Math.sin((ie+1)/2*Math.PI)*.15)}ye.computeVertexNormals();const bt=new De({map:de,transparent:!0,opacity:.97,side:We,depthWrite:!1}),St=new r(ye,bt);St.position.set(-.2,0,0),Oe.add(St);const gt=new ao([new C(-1-.2,0,0),new C(-.5-.2,0,-.1),new C(0-.2,0,-.15),new C(.5-.2,0,-.1),new C(1-.2,0,0)]),it=new Ot(gt,32,.012,12,!1),vt=new r(it,w);vt.position.y=.3,Oe.add(vt);const xt=new r(it,w);xt.position.y=-.3,Oe.add(xt);const Nt=new De({color:58879}),Co=new Ot(gt,32,.0035,8,!1),To=new r(Co,Nt);To.position.y=.29,Oe.add(To);const sn=new r(Co,Nt);sn.position.y=-.29,Oe.add(sn);const an=w,rn=new r(new P(.014,.018,.95,16),an);rn.position.set(-1.18,-.48,0),Oe.add(rn);const ln=new r(new P(.014,.018,.95,16),an);ln.position.set(.78,-.48,0),Oe.add(ln);function cn(fe){const ie=Rt[fe]||Rt.sodium;M.clearRect(0,0,1024,256),M.fillStyle="rgba(5, 10, 24, 0.97)",M.fillRect(6,6,1012,244),M.strokeStyle="rgba(0, 229, 255, 0.85)",M.lineWidth=2.5,M.strokeRect(6,6,1012,244),M.strokeStyle="#00e5ff",M.lineWidth=4,M.beginPath(),M.moveTo(6,32),M.lineTo(6,6),M.lineTo(32,6),M.stroke(),M.beginPath(),M.moveTo(992,6),M.lineTo(1018,6),M.lineTo(1018,32),M.stroke(),M.beginPath(),M.moveTo(6,218),M.lineTo(6,244),M.lineTo(32,244),M.stroke(),M.beginPath(),M.moveTo(992,244),M.lineTo(1018,244),M.lineTo(1018,218),M.stroke(),M.font="bold 22px monospace",M.fillStyle="#00e5ff",M.textAlign="left",M.fillText(`ATOMIC EMISSION SPECTRUM — ${ie.name.toUpperCase()} [${ie.ion}]`,30,42),M.font="16px monospace",M.fillStyle="rgba(224, 232, 255, 0.85)",M.fillText(`Salt: ${ie.salt} | ΔE = ${ie.deltaE}`,30,68);const Ke=40,st=88,et=944,rt=88,Kt=380,At=750,pt=M.createLinearGradient(Ke,0,Ke+et,0);pt.addColorStop(0,"rgba(120, 0, 220, 0.15)"),pt.addColorStop(.18,"rgba(0, 80, 255, 0.15)"),pt.addColorStop(.35,"rgba(0, 220, 180, 0.15)"),pt.addColorStop(.48,"rgba(0, 240, 50, 0.15)"),pt.addColorStop(.6,"rgba(240, 230, 0, 0.15)"),pt.addColorStop(.75,"rgba(255, 100, 0, 0.15)"),pt.addColorStop(1,"rgba(220, 20, 20, 0.15)"),M.fillStyle=pt,M.fillRect(Ke,st,et,rt),M.strokeStyle="rgba(255, 255, 255, 0.25)",M.strokeRect(Ke,st,et,rt),ie.spectralLines.forEach(Mt=>{const $t=Math.max(Kt,Math.min(At,Mt.nm)),Qe=Ke+($t-Kt)/(At-Kt)*et;M.save(),M.shadowColor=Mt.color,M.shadowBlur=18,M.fillStyle=Mt.color,M.fillRect(Qe-2.5,st,5,rt),M.restore(),M.fillStyle="#ffffff",M.fillRect(Qe-.75,st,1.5,rt),M.font="bold 15px monospace",M.fillStyle=Mt.color,M.textAlign="center",M.fillText(`${Mt.nm.toFixed(1)} nm`,Qe,st+rt+22),M.beginPath(),M.moveTo(Qe,st+rt),M.lineTo(Qe,st+rt+6),M.strokeStyle=Mt.color,M.stroke()}),M.font="14px monospace",M.fillStyle="rgba(0, 229, 255, 0.9)",M.textAlign="right",M.fillText("Photon Emission: ΔE = h·c / λ",980,42),M.font="13px monospace",M.fillStyle="rgba(224, 232, 255, 0.7)",M.fillText(ie.quantumTransition,980,68),de.needsUpdate=!0}const Dt=new U;Dt.position.set(u*1.35,1.78,p*1.35),Dt.rotation.y=m+.18,t.add(Dt);const Io=new U;Dt.add(Io);const Bn=new F({color:16724838,roughness:.3,emissive:6684689}),Yn=new F({color:52479,roughness:.3,emissive:13158});for(let fe=0;fe<9;fe++){const ie=fe%2===0,Ke=new r(new He(.024,16,16),ie?Bn:Yn),st=Math.random()*Math.PI*2,et=Math.random()*Math.PI,rt=Math.random()*.04;Ke.position.set(rt*Math.sin(et)*Math.cos(st),rt*Math.sin(et)*Math.sin(st),rt*Math.cos(et)),Io.add(Ke)}const to=[.18,.32,.48,.64];to.forEach((fe,ie)=>{const Ke=new ot(fe,.0025,12,64),st=new De({color:58879,transparent:!0,opacity:.35+ie*.1,blending:tt}),et=new r(Ke,st);et.rotation.x=Math.PI/2+ie*.12,et.rotation.y=ie*.18,Dt.add(et)});const Wn=new De({color:16777215,blending:tt}),dn=new r(new He(.022,16,16),Wn);Dt.add(dn);const jn=new zt(.015,.025,32),Eo=new De({color:16771584,transparent:!0,opacity:0,side:yo,blending:tt,depthWrite:!1}),Uo=new r(jn,Eo);Uo.rotation.x=Math.PI/2,Dt.add(Uo);const Ao=document.createElement("canvas");Ao.width=512,Ao.height=128;const Gt=Ao.getContext("2d");Gt.clearRect(0,0,512,128),Gt.font="bold 36px monospace",Gt.fillStyle="#00e5ff",Gt.textAlign="center",Gt.textBaseline="middle",Gt.fillText("BOHR QUANTUM ATOM",256,45),Gt.font="24px monospace",Gt.fillStyle="rgba(224, 232, 255, 0.8)",Gt.fillText("ΔE = h·ν = hc / λ",256,85);const qn=new ht(Ao),Fo=new wo(new vo({map:qn,transparent:!0,opacity:.9}));Fo.scale.set(.9,.22,1),Fo.position.set(0,.65,0),Dt.add(Fo);let Ho=new $(Rt.sodium.outerColor),Vo=new $(Rt.sodium.innerColor),Bo=new $(Rt.sodium.tipColor),hn=new $(Rt.sodium.lightColor),un=Rt.sodium.lightIntensity;cn("sodium");let Yo=0,Wo=0,jo=1;const pn=fe=>{Rt[fe]||(fe="sodium"),y.element.value=fe;const ie=Rt[fe];Ho.setHex(ie.outerColor),Vo.setHex(ie.innerColor),Bo.setHex(ie.tipColor),hn.setHex(ie.lightColor),un=ie.lightIntensity,Ae.color.setHex(ie.outerColor),Re.color.setHex(ie.outerColor),Eo.color.setHex(ie.outerColor),cn(fe),fe==="clean"?(Yo=-.85,Wo=.3,jo=0):(Yo=.12,Wo=-.06,jo=.95)};return y.setElement=pn,pn("sodium"),{group:t,update:(fe,ie)=>{const Ke=y.airCollar.value;Ge.rotation.y=lt.lerp(Ge.rotation.y,(1-Ke)*Math.PI*.45,ie*5),ve.uFlameMode&&(ve.uFlameMode.value=lt.lerp(ve.uFlameMode.value,Ke,ie*4));const st=new $,et=new $,rt=new $;if(Ke<.99){const Qe=new $(16746496),_t=new $(16773792),Pt=new $(14238720);st.lerpColors(Qe,Ho,Ke),et.lerpColors(_t,Vo,Ke),rt.lerpColors(Pt,Bo,Ke)}else st.copy(Ho),et.copy(Vo),rt.copy(Bo);ve.uColorOuter.value.lerp(st,ie*6),ve.uColorInner.value.lerp(et,ie*6),ve.uColorTip.value.lerp(rt,ie*6),ce.color.lerp(et,ie*6),H.color.lerp(hn,ie*6);const Kt=.97+.03*Math.sin(fe*52)*Math.sin(fe*67);H.intensity=un*Kt*(.85+Ke*.25),Ne.rotation.y=lt.lerp(Ne.rotation.y,Yo,ie*3.5),Ze.rotation.z=lt.lerp(Ze.rotation.z,Wo,ie*3.5),Re.opacity=lt.lerp(Re.opacity,jo,ie*4);const At=ne.attributes.position.array;for(let Qe=0;Qe<Z;Qe++){const _t=he[Qe];if(At[Qe*3+1]+=_t.vy*ie,At[Qe*3+0]+=Math.sin(fe*4+_t.seed)*.003,At[Qe*3+2]+=Math.cos(fe*4+_t.seed)*.003,At[Qe*3+1]>.95){At[Qe*3+1]=.05;const Pt=Math.random()*Math.PI*2,Po=Math.random()*.035;At[Qe*3+0]=Math.cos(Pt)*Po,At[Qe*3+2]=Math.sin(Pt)*Po}}ne.attributes.position.needsUpdate=!0,Io.rotation.y=fe*.4,Io.rotation.x=Math.sin(fe*.3)*.2;const pt=fe%3/3;let Mt=to[1];if(pt>.35&&pt<.75)Mt=lt.lerp(to[1],to[3],(pt-.35)/.1);else if(pt>=.75){Mt=lt.lerp(to[3],to[1],(pt-.75)/.1);const Qe=(pt-.75)/.25;Uo.scale.setScalar(1+Qe*3.5),Eo.opacity=Math.max(0,1-Qe*1.5)*.7}else Eo.opacity=0;const $t=fe*5;dn.position.set(Math.cos($t)*Mt,Math.sin($t*.7)*.05,Math.sin($t)*Mt),Oe.position.y=1.78+Math.sin(fe*1.5)*.02,Dt.position.y=1.78+Math.cos(fe*1.5)*.02},controls:y}}const Tn="vizon_ambient_muted",In="vizon_ambient_volume",Ua=.35;class Fa{constructor(){this.audioCtx=null,this.masterGain=null,this.filterNode=null,this.analyser=null,this.analyserData=null,this.sourceNode=null,this.audioBuffer=null,this.isLoaded=!1,this.isPlaying=!1,this.targetVolume=Ua,this.isMuted=!1,this.listeners=new Set,this.isUnlocked=!1,this._loadPreferences(),this._setupAutoplayUnlock()}_loadPreferences(){try{const e=localStorage.getItem(Tn);e!==null&&(this.isMuted=e==="true");const t=localStorage.getItem(In);if(t!==null){const o=parseFloat(t);!isNaN(o)&&o>=0&&o<=1&&(this.targetVolume=o)}}catch(e){console.warn("[Audio] LocalStorage not available:",e)}}_savePreferences(){try{localStorage.setItem(Tn,String(this.isMuted)),localStorage.setItem(In,String(this.targetVolume))}catch{}}_ensureAudioContext(){if(this.audioCtx)return this.audioCtx;const e=window.AudioContext||window.webkitAudioContext;return e?(this.audioCtx=new e,this.filterNode=this.audioCtx.createBiquadFilter(),this.filterNode.type="lowpass",this.filterNode.frequency.setValueAtTime(11500,this.audioCtx.currentTime),this.filterNode.Q.setValueAtTime(.7,this.audioCtx.currentTime),this.masterGain=this.audioCtx.createGain(),this.masterGain.gain.setValueAtTime(0,this.audioCtx.currentTime),this.analyser=this.audioCtx.createAnalyser(),this.analyser.fftSize=64,this.analyser.smoothingTimeConstant=.82,this.analyserData=new Uint8Array(this.analyser.frequencyBinCount),this.filterNode.connect(this.analyser),this.analyser.connect(this.masterGain),this.masterGain.connect(this.audioCtx.destination),this.audioCtx):(console.warn("[Audio] Web Audio API is not supported in this browser."),null)}async loadTrack(e="/audio/ambient_space.wav"){if(this._ensureAudioContext(),!!this.audioCtx)try{const t=await fetch(e);if(!t.ok)throw new Error(`Failed to load audio asset: ${t.status} ${t.statusText}`);const o=await t.arrayBuffer();this.audioBuffer=await this.audioCtx.decodeAudioData(o),this.isLoaded=!0,console.log(`[Audio] Ambient space soundscape loaded (${this.audioBuffer.duration.toFixed(1)}s, ${this.audioBuffer.numberOfChannels}ch).`),this.isUnlocked&&!this.isMuted&&this.play()}catch(t){console.warn("[Audio] Failed to load WAV, engaging procedural ambient fallback:",t.message),this._setupProceduralFallback()}}_setupProceduralFallback(){if(this._ensureAudioContext(),!this.audioCtx)return;const e=[[73.42,110,146.83,174.61,220],[58.27,87.31,116.54,146.83,220],[65.41,98,130.81,174.61,196],[55,82.41,98,146.83,220]],t=this.audioCtx.createOscillator();t.type="sine",t.frequency.setValueAtTime(36.71,this.audioCtx.currentTime);const o=this.audioCtx.createGain();o.gain.setValueAtTime(.2,this.audioCtx.currentTime),t.connect(o),o.connect(this.filterNode),t.start(),e[0].forEach(n=>{const s=this.audioCtx.createOscillator();s.type="triangle",s.frequency.setValueAtTime(n,this.audioCtx.currentTime);const i=this.audioCtx.createGain();i.gain.setValueAtTime(.06,this.audioCtx.currentTime),s.connect(i),i.connect(this.filterNode),s.start()}),this.isLoaded=!0,this.isUnlocked&&!this.isMuted&&this._fadeIn()}play(){if(this._ensureAudioContext(),!!this.audioCtx){if(this.audioCtx.state==="suspended"&&this.audioCtx.resume(),this.audioBuffer&&(!this.sourceNode||!this.isPlaying)){if(this.sourceNode)try{this.sourceNode.stop()}catch{}this.sourceNode=this.audioCtx.createBufferSource(),this.sourceNode.buffer=this.audioBuffer,this.sourceNode.loop=!0,this.sourceNode.connect(this.filterNode),this.sourceNode.start(0)}this.isPlaying=!0,this.isMuted=!1,this._savePreferences(),this._fadeIn(),this._notify()}}pause(){this.isMuted=!0,this._savePreferences(),this._fadeOut(()=>{this.isPlaying=!1,this._notify()}),this._notify()}toggle(){return this.unlock(),this.isPlaying&&!this.isMuted?(this.pause(),!0):(this.play(),!1)}setVolume(e){if(this.targetVolume=Math.max(0,Math.min(1,e)),this._savePreferences(),this.audioCtx&&this.masterGain&&this.isPlaying&&!this.isMuted){const t=this.audioCtx.currentTime;this.masterGain.gain.cancelScheduledValues(t),this.masterGain.gain.linearRampToValueAtTime(this.targetVolume,t+.15)}this._notify()}_fadeIn(e=2.5){if(!this.audioCtx||!this.masterGain)return;const t=this.audioCtx.currentTime,o=this.masterGain.gain.value;this.masterGain.gain.cancelScheduledValues(t),this.masterGain.gain.setValueAtTime(o,t),this.masterGain.gain.linearRampToValueAtTime(this.targetVolume,t+e)}_fadeOut(e,t=1.2){if(!this.audioCtx||!this.masterGain){e&&e();return}const o=this.audioCtx.currentTime,n=this.masterGain.gain.value;this.masterGain.gain.cancelScheduledValues(o),this.masterGain.gain.setValueAtTime(n,o),this.masterGain.gain.linearRampToValueAtTime(1e-4,o+t),setTimeout(()=>{this.isMuted&&this.masterGain&&this.masterGain.gain.setValueAtTime(0,this.audioCtx.currentTime),e&&e()},t*1e3+50)}unlock(){this.isUnlocked=!0,this._ensureAudioContext(),this.audioCtx&&this.audioCtx.state==="suspended"&&this.audioCtx.resume(),!this.isPlaying&&!this.isMuted&&this.isLoaded&&this.play()}_setupAutoplayUnlock(){const e=()=>{this.unlock(),window.removeEventListener("pointerdown",e),window.removeEventListener("touchstart",e),window.removeEventListener("keydown",e)};window.addEventListener("pointerdown",e,{once:!0,passive:!0}),window.addEventListener("touchstart",e,{once:!0,passive:!0}),window.addEventListener("keydown",e,{once:!0,passive:!0})}getVisualizerData(){if(!this.analyser||!this.isPlaying||this.isMuted||!this.audioCtx||this.audioCtx.state!=="running")return{level:0,bars:[.15,.1,.2,.12]};this.analyser.getByteFrequencyData(this.analyserData);const e=(this.analyserData[1]||0)/255,t=(this.analyserData[3]||0)/255,o=(this.analyserData[7]||0)/255,n=(this.analyserData[14]||0)/255;return{level:(e+t+o+n)/4,bars:[e,t,o,n]}}onStateChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}_notify(){const e={isLoaded:this.isLoaded,isPlaying:this.isPlaying&&!this.isMuted,isMuted:this.isMuted,volume:this.targetVolume};for(const t of this.listeners)try{t(e)}catch{}}}const Bt=new Fa,mo=[{key:"physics",icon:"⚡",label:"Physics"},{key:"chemistry",icon:"🧪",label:"Chemistry"},{key:"biology",icon:"🧬",label:"Biology"},{key:"mathematics",icon:"📐",label:"Mathematics"},{key:"astronomy",icon:"🔭",label:"Astronomy"}];function Ha(){if(document.getElementById("vizon-hud-styles"))return;const a=document.createElement("style");a.id="vizon-hud-styles",a.textContent=`
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

    .vz-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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
    }

    .vz-panel-close-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 6px;
      color: rgba(224, 232, 255, 0.8);
      cursor: pointer;
      font-size: 10px;
      font-weight: 700;
      font-family: inherit;
      padding: 3px 8px;
      line-height: 1;
      letter-spacing: 0.06em;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      transition: all 0.2s ease;
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
       RESPONSIVE — Device-Tailored HUD
    ═══════════════════════════════ */
    @media (max-width: 900px) {
      #vz-navbar {
        bottom: 12px;
        padding: 4px 6px;
        gap: 2px;
      }

      .vz-nav-btn {
        padding: 6px 8px;
        min-width: 46px;
      }

      .vz-nav-icon {
        font-size: 15px;
      }

      .vz-nav-label {
        font-size: 8px;
      }

      #vz-panel-container {
        right: 14px;
        width: 245px;
      }

      .vz-panel {
        padding: 14px 16px;
      }
    }

    @media (max-width: 640px) {
      .vz-nav-label {
        display: none;
      }

      .vz-nav-btn {
        min-width: 38px;
        padding: 7px 5px;
      }

      /* Compact corner positioning on mobile so main 3D experiment is 100% visible */
      #vz-panel-container {
        top: auto;
        bottom: 78px;
        right: 10px;
        left: auto;
        width: 285px;
        max-width: calc(100vw - 20px);
        max-height: 42vh;
        transform: none;
      }

      #vz-panel-container.hidden-state {
        transform: translateY(20px);
      }

      .vz-edge-tab {
        top: auto;
        bottom: 78px;
        right: 10px;
        border-radius: 20px;
        border-right: 1px solid rgba(0, 229, 255, 0.5);
        transform: none;
        padding: 7px 14px;
      }

      .vz-edge-tab:hover {
        transform: translateY(-2px);
      }
    }
  `,document.head.appendChild(a)}function re(a,{cls:e,attrs:t,html:o,children:n}={}){const s=document.createElement(a);if(e&&(s.className=e),t)for(const[i,l]of Object.entries(t))s.setAttribute(i,l);if(o&&(s.innerHTML=o),n)for(const i of n)s.appendChild(i);return s}function co(a){const e=parseFloat(a.min)||0,t=parseFloat(a.max)||100,n=(parseFloat(a.value)-e)/(t-e)*100;a.style.setProperty("--fill",`${n}%`)}function So(a,e){const t=re("div",{cls:"vz-panel-header"}),o=re("div",{cls:"vz-panel-title",html:a}),n=re("button",{cls:"vz-panel-close-btn",html:'<span style="font-size:11px; margin-right:3px;">✕</span> HIDE',attrs:{title:"Hide controls for unobstructed 3D viewing"}});return n.addEventListener("click",s=>{s.stopPropagation(),e?.()}),t.appendChild(o),t.appendChild(n),t}function Va(a){Ha();const{cameraAnim:e}=a,t=re("div",{attrs:{id:"vizon-hud"}});document.body.appendChild(t);const o=re("div",{cls:"vz-glass",attrs:{id:"vz-navbar"}});t.appendChild(o);const n=re("button",{cls:"vz-nav-btn",html:'<span class="vz-nav-icon">🏠</span><span class="vz-nav-label">Home</span>'});n.addEventListener("click",()=>{c(null),e.transitionToSpawn()}),o.appendChild(n),o.appendChild(re("div",{cls:"vz-nav-divider"}));const s={};for(const b of mo){const x=re("button",{cls:"vz-nav-btn",html:`<span class="vz-nav-icon">${b.icon}</span><span class="vz-nav-label">${b.label}</span>`});x.addEventListener("click",()=>{c(b.key),e.transitionTo(b.key)}),o.appendChild(x),s[b.key]=x}o.appendChild(re("div",{cls:"vz-nav-divider"}));const i=re("button",{cls:"vz-nav-btn vz-sound-btn muted",attrs:{id:"vz-nav-sound-btn",title:"Unmute Ambient Sound"}}),l=re("span",{cls:"vz-nav-icon"}),h=re("span",{cls:"vz-nav-label",html:"Sound"});i.appendChild(l),i.appendChild(h),o.appendChild(i);function u(){Bt.isMuted||!Bt.isPlaying?(l.innerHTML=`
        <svg class="vz-nav-music-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3" fill="currentColor"></circle>
          <circle cx="18" cy="16" r="3" fill="currentColor"></circle>
        </svg>
      `,h.textContent="Unmute",i.classList.add("muted"),i.classList.remove("playing"),i.setAttribute("title","Click to Unmute Ambient Sound")):(l.innerHTML=`
        <svg class="vz-nav-music-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3" fill="currentColor"></circle>
          <circle cx="18" cy="16" r="3" fill="currentColor"></circle>
          <line x1="3" y1="3" x2="21" y2="21" stroke="#ff4757" stroke-width="2.5"></line>
        </svg>
      `,h.textContent="Mute",i.classList.remove("muted"),i.classList.add("playing"),i.setAttribute("title","Click to Mute Ambient Sound"))}i.addEventListener("click",b=>{b.stopPropagation(),Bt.toggle(),u()}),Bt.onStateChange(()=>{u()}),u();const p=re("div",{attrs:{id:"vz-panel-container"}});t.appendChild(p);const d=re("button",{cls:"vz-edge-tab",attrs:{id:"vz-global-edge-tab",title:"Show Station Controls"}});d.innerHTML='<span class="vz-edge-icon">⚙️</span><span class="vz-edge-label">SHOW CONTROLS</span>',document.body.appendChild(d);function f(){if(p.classList.add("hidden-state"),w){const b=mo.find(x=>x.key===w);d.innerHTML=`<span class="vz-edge-icon">${b?.icon||"⚙️"}</span><span class="vz-edge-label">SHOW ${b?.label.toUpperCase()||"CONTROLS"}</span>`,d.classList.add("visible")}}function m(){p.classList.remove("hidden-state"),d.classList.remove("visible")}d.addEventListener("click",b=>{b.stopPropagation(),m()});const y=()=>{f()},g={};g.physics=Ba(a.physics,y),p.appendChild(g.physics),g.chemistry=Ya(a.chemistry,y),p.appendChild(g.chemistry),g.biology=Wa(a.biology,y),p.appendChild(g.biology),g.mathematics=ja(a.math,y),p.appendChild(g.mathematics),g.astronomy=qa(a.astroRobotics,y),p.appendChild(g.astronomy);let w=null;function c(b){w=b,n.classList.toggle("active",b===null);for(const x of mo)s[x.key].classList.toggle("active",x.key===b);if(b===null){d.classList.remove("visible"),p.classList.remove("hidden-state");for(const x of mo)g[x.key].classList.remove("visible"),g[x.key].style.display="none";return}p.classList.remove("hidden-state"),d.classList.remove("visible");for(const x of mo){const R=g[x.key];if(x.key===b)R.style.display="block",R.offsetHeight,R.classList.add("visible");else{R.classList.remove("visible");const I=R,k=()=>{I.classList.contains("visible")||(I.style.display="none"),I.removeEventListener("transitionend",k)};I.addEventListener("transitionend",k),setTimeout(()=>{I.classList.contains("visible")||(I.style.display="none")},400)}}}return e.onStationChange&&e.onStationChange(b=>{c(b)}),c(null),{setActiveStation:c,get currentStation(){return w}}}function Ba(a,e){const t=re("div",{cls:"vz-panel vz-glass"});t.appendChild(So("⚡ Physics Controls",e));const o=re("div",{cls:"vz-panel-row"}),n=re("span",{cls:"vz-panel-label",html:"Voltage"});o.appendChild(n);const s=re("input",{cls:"vz-slider",attrs:{type:"range",min:"0",max:"100",step:"1",value:"50"}}),i=re("div",{cls:"vz-slider-value",html:"50%"});return s.addEventListener("input",()=>{const l=parseFloat(s.value)/100;i.textContent=`${s.value}%`,co(s),a?.controls?.voltage&&(a.controls.voltage.value=l)}),co(s),o.appendChild(s),o.appendChild(i),t.appendChild(o),t}function Ya(a,e){const t=re("div",{cls:"vz-panel vz-glass"});t.appendChild(So("🧪 Flame Test & Spectroscopy",e));const o=re("div",{cls:"vz-panel-row"}),n=re("span",{cls:"vz-panel-label",html:"Inoculate Element Salt"});o.appendChild(n);const s=re("div",{cls:"vz-btn-group"}),i=[{key:"sodium",label:"🟡 Na⁺ (589nm)"},{key:"copper",label:"🟢 Cu²⁺ (521nm)"},{key:"strontium",label:"🔴 Sr²⁺ (668nm)"},{key:"potassium",label:"🟣 K⁺ (404nm)"},{key:"barium",label:"🍏 Ba²⁺ (553nm)"},{key:"calcium",label:"🟠 Ca²⁺ (622nm)"},{key:"clean",label:"🔵 Pure Blue (HCl)"}],l={},h=re("div",{cls:"vz-panel-info"});function u(y){const g=Rt[y]||Rt.sodium;h.style.borderLeftColor=g.spectralLines[0]?.color||"#00e5ff",h.innerHTML=`
      <div style="font-weight:700; color:#fff; margin-bottom:3px;">${g.name} [${g.ion}]</div>
      <div style="opacity:0.85; margin-bottom:2px;"><b>Salt:</b> ${g.salt}</div>
      <div style="opacity:0.85; margin-bottom:2px;"><b>Flame:</b> ${g.colorName}</div>
      <div style="opacity:0.85; margin-bottom:2px;"><b>Key Lines:</b> ${g.wavelengths.join(", ")}</div>
      <div style="opacity:0.75; font-size:10px; margin-top:4px; color:#00e5ff;"><b>Quantum Transition:</b> ${g.quantumTransition} (ΔE ≈ ${g.deltaE})</div>
    `}for(const y of i){const g=re("button",{cls:`vz-btn-pill${y.key==="sodium"?" active":""}`,html:y.label});g.addEventListener("click",()=>{y.key;for(const[w,c]of Object.entries(l))c.classList.toggle("active",w===y.key);a?.controls?.setElement?.(y.key),u(y.key)}),l[y.key]=g,s.appendChild(g)}o.appendChild(s),t.appendChild(o);const p=re("div",{cls:"vz-panel-row"}),d=re("span",{cls:"vz-panel-label",html:"Air Collar (Premix Ratio)"});p.appendChild(d);const f=re("input",{cls:"vz-slider",attrs:{id:"vz-chem-air-slider",type:"range",min:"0",max:"100",step:"1",value:"100"}}),m=re("div",{cls:"vz-slider-value",html:"Roaring Flame (100% Air)"});return f.addEventListener("input",()=>{const y=parseFloat(f.value)/100;y<.25?m.textContent="Safety Flame (Yellow/Cool)":y<.75?m.textContent=`Partial Premix (${f.value}%)`:m.textContent=`Roaring Flame (${f.value}% Air)`,co(f),a?.controls?.airCollar&&(a.controls.airCollar.value=y)}),co(f),p.appendChild(f),p.appendChild(m),t.appendChild(p),u("sodium"),t.appendChild(h),t}function Wa(a,e){const t=re("div",{cls:"vz-panel vz-glass"});t.appendChild(So("🧬 Biology Controls",e));const o=re("div",{cls:"vz-panel-row"}),n=re("span",{cls:"vz-panel-label",html:"Organelle Isolation"});o.appendChild(n);const s=re("div",{cls:"vz-btn-group"}),i=[{key:"all",label:"All"},{key:"nucleus",label:"Nucleus"},{key:"mitochondria",label:"Mito"},{key:"er",label:"ER & Ribosomes"},{key:"golgi",label:"Golgi"},{key:"centrioles",label:"Centrioles"}],l={};for(const p of i){const d=re("button",{cls:`vz-btn-pill${p.key==="all"?" active":""}`,html:p.label});d.addEventListener("click",()=>{p.key;for(const[f,m]of Object.entries(l))m.classList.toggle("active",f===p.key);a?.controls?.organelleIsolation&&(a.controls.organelleIsolation.value=p.key)}),l[p.key]=d,s.appendChild(d)}o.appendChild(s),t.appendChild(o);const h=re("div",{cls:"vz-panel-row"}),u=re("button",{cls:"vz-btn-pill",html:"🔬 Launch SGU 3.5M Cell Atlas"});return u.addEventListener("click",()=>{a?.openSguModal?.()}),h.appendChild(u),t.appendChild(h),t}function ja(a,e){const t=re("div",{cls:"vz-panel vz-glass"});t.appendChild(So("📐 Mathematics",e));const o=re("div",{cls:"vz-panel-row"}),n=re("span",{cls:"vz-panel-label",html:"Topological Geometry"});o.appendChild(n);const s=re("div",{cls:"vz-btn-group"}),i=[{key:"hypercube",label:"4D Hypercube"},{key:"harmonic",label:"Harmonic"},{key:"dual",label:"Dual Overlay"}],l={};for(const m of i){const y=re("button",{cls:`vz-tag-btn ${m.key==="hypercube"?"active":""}`,html:m.label});y.addEventListener("click",()=>{for(const[g,w]of Object.entries(l))w.classList.toggle("active",g===m.key);a?.controls?.displayMode&&(a.controls.displayMode.value=m.key)}),l[m.key]=y,s.appendChild(y)}o.appendChild(s),t.appendChild(o);const h=re("div",{cls:"vz-panel-row"}),u=re("span",{cls:"vz-panel-label",html:"4D Rotation Speed"});h.appendChild(u);const p=re("input",{cls:"vz-slider",attrs:{type:"range",min:"0.1",max:"3.0",step:"0.1",value:"1.0"}});p.addEventListener("input",m=>{a?.controls?.rotationSpeed&&(a.controls.rotationSpeed.value=parseFloat(m.target.value))}),h.appendChild(p),t.appendChild(h);const d=re("div",{cls:"vz-panel-row"}),f=re("div",{cls:"vz-panel-info",html:"Visualizing 4D tesseract stereographic projection and standing-wave spherical harmonics."});return d.appendChild(f),t.appendChild(d),t}function qa(a,e){const t=re("div",{cls:"vz-panel vz-glass",attrs:{id:"vz-astro-panel"}});t.appendChild(So("🔭 Kepler Orrery & Deep Space",e));const o=re("div",{cls:"vz-panel-row"}),n=re("span",{cls:"vz-panel-label",html:"Orbital Time Scale"});o.appendChild(n);const s=re("input",{cls:"vz-slider",attrs:{type:"range",min:"0.1",max:"10",step:"0.1",value:"1"}}),i=re("div",{cls:"vz-slider-value",html:"1.0×"});s.addEventListener("input",()=>{const u=parseFloat(s.value);i.textContent=`${u.toFixed(1)}×`,co(s),a?.controls?.orbitalTimeScale&&(a.controls.orbitalTimeScale.value=u),resetAutoHide()}),co(s),o.appendChild(s),o.appendChild(i),t.appendChild(o);const l=re("div",{cls:"vz-panel-row"}),h=re("div",{cls:"vz-panel-info",html:"Touch or click any planet or the Sun to reveal live scientific telemetry cards and atmospheric data."});return l.appendChild(h),t.appendChild(l),t}class ho{static createButton(e,t={}){const o=document.createElement("button");function n(){let u=null;async function p(m){m.addEventListener("end",d),await e.xr.setSession(m),o.textContent="EXIT VR",u=m}function d(){u.removeEventListener("end",d),o.textContent="ENTER VR",u=null}o.style.display="",o.style.cursor="pointer",o.style.left="calc(50% - 50px)",o.style.width="100px",o.textContent="ENTER VR";const f={...t,optionalFeatures:["local-floor","bounded-floor","layers",...t.optionalFeatures||[]]};o.onmouseenter=function(){o.style.opacity="1.0"},o.onmouseleave=function(){o.style.opacity="0.5"},o.onclick=function(){u===null?navigator.xr.requestSession("immersive-vr",f).then(p):(u.end(),navigator.xr.offerSession!==void 0&&navigator.xr.offerSession("immersive-vr",f).then(p).catch(m=>{console.warn(m)}))},navigator.xr.offerSession!==void 0&&navigator.xr.offerSession("immersive-vr",f).then(p).catch(m=>{console.warn(m)})}function s(){o.style.display="",o.style.cursor="auto",o.style.left="calc(50% - 75px)",o.style.width="150px",o.onmouseenter=null,o.onmouseleave=null,o.onclick=null}function i(){s(),o.textContent="VR NOT SUPPORTED"}function l(u){s(),console.warn("Exception when trying to call xr.isSessionSupported",u),o.textContent="VR NOT ALLOWED"}function h(u){u.style.position="absolute",u.style.bottom="20px",u.style.padding="12px 6px",u.style.border="1px solid #fff",u.style.borderRadius="4px",u.style.background="rgba(0,0,0,0.1)",u.style.color="#fff",u.style.font="normal 13px sans-serif",u.style.textAlign="center",u.style.opacity="0.5",u.style.outline="none",u.style.zIndex="999"}if("xr"in navigator)return o.id="VRButton",o.style.display="none",h(o),navigator.xr.isSessionSupported("immersive-vr").then(function(u){u?n():i(),u&&ho.xrSessionIsGranted&&o.click()}).catch(l),o;{const u=document.createElement("a");return window.isSecureContext===!1?(u.href=document.location.href.replace(/^http:/,"https:"),u.innerHTML="WEBXR NEEDS HTTPS"):(u.href="https://immersiveweb.dev/",u.innerHTML="WEBXR NOT AVAILABLE"),u.style.left="calc(50% - 90px)",u.style.width="180px",u.style.textDecoration="none",h(u),u}}static registerSessionGrantedListener(){if(typeof navigator<"u"&&"xr"in navigator){if(/WebXRViewer\//i.test(navigator.userAgent))return;navigator.xr.addEventListener("sessiongranted",()=>{ho.xrSessionIsGranted=!0})}}}ho.xrSessionIsGranted=!1;ho.registerSessionGrantedListener();function Xa(a){"xr"in navigator&&navigator.xr.isSessionSupported("immersive-vr").then(e=>{if(e)try{a.xr.enabled=!0,a.xr.setReferenceSpaceType("local-floor");const t=ho.createButton(a);if(t){if(t.textContent.toUpperCase().includes("NOT SUPPORTED")){t.style.display="none";return}t.style.position="fixed",t.style.top="20px",t.style.right="20px",t.style.bottom="auto",t.style.padding="10px 18px",t.style.border="1px solid rgba(0, 229, 255, 0.4)",t.style.borderRadius="12px",t.style.background="rgba(10, 14, 26, 0.7)",t.style.backdropFilter="blur(16px)",t.style.webkitBackdropFilter="blur(16px)",t.style.color="#00e5ff",t.style.fontFamily="'Inter', system-ui, sans-serif",t.style.fontSize="12px",t.style.fontWeight="600",t.style.letterSpacing="0.12em",t.style.textTransform="uppercase",t.style.cursor="pointer",t.style.zIndex="999",t.style.transition="all 0.3s ease",t.style.boxShadow="0 0 15px rgba(0, 229, 255, 0.2)",t.addEventListener("mouseenter",()=>{t.style.borderColor="#00e5ff",t.style.boxShadow="0 0 25px rgba(0, 229, 255, 0.5)",t.style.background="rgba(0, 229, 255, 0.15)"}),t.addEventListener("mouseleave",()=>{t.style.borderColor="rgba(0, 229, 255, 0.4)",t.style.boxShadow="0 0 15px rgba(0, 229, 255, 0.2)",t.style.background="rgba(10, 14, 26, 0.7)"}),document.body.appendChild(t)}}catch(t){console.warn("WebXR initialization failed:",t)}}).catch(()=>{})}function Ka(){return Bt.loadTrack("/audio/ambient_space.wav").catch(a=>{console.warn("[Audio] Preload notice:",a)}),window.addEventListener("keydown",a=>{a.target&&(a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA")||(a.key==="m"||a.key==="M")&&Bt.toggle()}),{ambientAudio:Bt}}function $a(a,e={}){const t={uTime:a.uTime,uResolution:a.uResolution,uVoltage:{value:e.voltage??.65},uWidth:{value:e.width??.042},uColorCore:{value:new $(16777215)},uColorCyan:{value:new $(62975)},uColorViolet:{value:new $(11868062)},uColorDeep:{value:new $(7473591)}};return{material:new ft({uniforms:t,vertexShader:`
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
    `,transparent:!0,side:We,depthWrite:!1,blending:tt}),uniforms:t}}function Za(a){const e={uTime:a.uTime,uVoltage:{value:.65},uColorGas:{value:new $(46296)},uColorRim:{value:new $(7473591)}};return{material:new ft({uniforms:e,vertexShader:`
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
    `,transparent:!0,side:zo,depthWrite:!1,blending:tt}),uniforms:e}}function Qa(a){const e={uTime:a.uTime,uVoltage:{value:.65},uColorSpot:{value:new $(62975)},uColorHalo:{value:new $(13959417)}};return{material:new ft({uniforms:e,vertexShader:`
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
    `,transparent:!0,side:We,depthWrite:!1,blending:tt}),uniforms:e}}function Ja(a){const e={uTime:a.uTime,uVoltage:{value:.65}};return{material:new ft({uniforms:e,vertexShader:`
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
    `,transparent:!0,side:We,depthWrite:!1,blending:tt}),uniforms:e}}function ei(a,e={}){const t=e.color!==void 0?e.color instanceof $?e.color:new $(e.color):new $(58879),o={uTime:a.uTime,uColor:{value:t},uOpacity:{value:e.opacity??.7},uScanlineSpeed:{value:e.scanlineSpeed??2},uScanlineDensity:{value:e.scanlineDensity??80},uFlickerSpeed:{value:e.flickerSpeed??8}};return new ft({uniforms:o,vertexShader:`
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
    `,transparent:!0,side:e.doubleSide!==!1?We:yo,depthWrite:!1,blending:tt})}class ti extends zn{constructor(e=.5,t=2.2,o=8){super(),this.radius=e,this.height=t,this.turns=o}getPoint(e,t=new C){const o=t,n=e*Math.PI*2*this.turns,s=Math.cos(n)*this.radius,i=e*this.height,l=Math.sin(n)*this.radius;return o.set(s,i,l)}}function oi(a,e,t){const o=new U;o.name="PhysicsStation";const n=Qt("physics");o.position.copy(n),a.add(o);const s={voltage:{value:.65}},i=new F({color:qt,roughness:.92,metalness:0}),l=new ee({color:Ht,metalness:.94,roughness:.22,clearcoat:.6}),h=new F({color:xo,roughness:.88,metalness:.1}),u=new P(2.8,3.1,.7,64),p=new r(u,i);p.position.y=.35,p.castShadow=!0,p.receiveShadow=!0,o.add(p);const d=new r(new ot(2.68,.04,8,64),h);d.position.y=.68,d.rotation.x=Math.PI/2,o.add(d);const f=new P(2.6,2.6,.05,64),m=new r(f,i);m.position.y=.725,m.receiveShadow=!0,o.add(m);const y=new zt(2.1,2.22,64);y.rotateX(-Math.PI/2);const g=new ee({color:4386,emissive:po,emissiveIntensity:2.2,roughness:.2}),w=new r(y,g);w.position.y=.751,o.add(w);const c=new ee({color:14253112,metalness:.96,roughness:.18,clearcoat:.8,clearcoatRoughness:.1}),b=new F({color:qt,roughness:.92,metalness:0});[new C(0,.74,-1.5),new C(0,.74,1.5)].forEach(L=>{const j=new r(new P(.55,.65,.5,32),b);j.position.set(L.x,L.y+.25,L.z),j.castShadow=!0,o.add(j);const X=new r(new P(.32,.32,2.3,32),i);X.position.set(L.x,L.y+1.6,L.z),X.castShadow=!0,o.add(X);const se=new ti(.48,2.1,10),pe=new Ot(se,240,.04,16,!1),Pe=new r(pe,c);Pe.position.set(L.x,L.y+.52,L.z),Pe.castShadow=!0,o.add(Pe);const Ue=new r(new ot(.55,.18,24,48),c);Ue.rotation.x=Math.PI/2,Ue.position.set(L.x,L.y+2.7,L.z),Ue.castShadow=!0,o.add(Ue)});const R=2.4,I=1.15,k=new C(0,R,0),_=.18,E=1.11,T=new U;T.name="PlasmaGlobeAssembly",o.add(T);const q=new F({color:1447968,roughness:.55,metalness:.15}),W=new r(new P(.045,.055,.72,24),q);W.position.set(0,.75+.36,0),W.castShadow=!0,T.add(W);const ae=new r(new P(.065,.065,.06,24),l);ae.position.set(0,R-_-.03,0),T.add(ae);const ge=new ee({color:1316898,roughness:.38,metalness:.75,clearcoat:.3}),be=new r(new He(_,32,32),ge);be.position.copy(k),be.renderOrder=2,T.add(be);const ue=Ja(e),Y=new r(new He(_*1.15,32,32),ue);Y.position.copy(k),Y.renderOrder=3,T.add(Y);const Be=Za(e),Ve=new r(new He(I*.99,48,48),Be);Ve.position.copy(k),Ve.renderOrder=4,T.add(Ve);const Le=18,ke=32,nt=[];for(let L=0;L<Le;L++){const j=L===0,X=L>=12,se=X?L%6:null;nt.push({id:L,isPrimary:j,isBranch:X,parentId:se,branchT:.65+Math.random()*.2,theta:j?1:Math.random()*Math.PI*.6+.35,phi:j?0:Math.random()*Math.PI*2,convectionSpeed:.08+Math.random()*.14,seed:Math.random()*500,targetPos:new C,active:!0,intensity:1})}const Ge=ke*2,$e=Le*Ge,D=new Float32Array($e*3),v=new Float32Array($e*3),V=new Float32Array($e),O=new Float32Array($e),N=new Float32Array($e),S=[];for(let L=0;L<Le;L++){const j=L*Ge;for(let X=0;X<ke;X++){const se=j+X*2,pe=se+1,Pe=X/(ke-1);if(V[se]=-1,V[pe]=1,O[se]=Pe,O[pe]=Pe,N[se]=L,N[pe]=L,X<ke-1){const Ue=se,Xe=pe,Ne=se+2,Je=pe+2;S.push(Ue,Xe,Ne),S.push(Xe,Je,Ne)}}}for(let L=0;L<$e;L++)v[L*3]=0,v[L*3+1]=1,v[L*3+2]=0;const oe=new Yt;oe.setAttribute("position",new Ut(D,3)),oe.setAttribute("aTangent",new Ut(v,3)),oe.setAttribute("aSide",new Ut(V,1)),oe.setAttribute("aProgress",new Ut(O,1)),oe.setAttribute("aFilamentId",new Ut(N,1)),oe.setIndex(S);const{material:z,uniforms:te}=$a(e,{voltage:s.voltage.value,width:.042}),Me=new r(oe,z);Me.renderOrder=15,T.add(Me);const ve=14,Q=new Do(.08,16),we=Qa(e),xe=[];for(let L=0;L<ve;L++){const j=new r(Q,we);j.renderOrder=18,T.add(j),xe.push(j)}const ce=new Wt(58879,2.5,7.5,1.8);ce.position.copy(k),T.add(ce);const Ye=new ee({color:15463935,transparent:!0,opacity:.18,roughness:.03,metalness:.05,clearcoat:1,clearcoatRoughness:.02,reflectivity:.95,depthWrite:!1}),H=new r(new He(I,64,64),Ye);H.position.copy(k),H.renderOrder=30,T.add(H);const Z=new U;Z.position.set(0,4.6,0);const ne=new ot(2.2,.16,24,64);ne.rotateX(Math.PI/2);const Ce=new ee({color:2238004,metalness:.9,roughness:.25,clearcoat:.4}),he=new r(ne,Ce);Z.add(he);const Ae=[];for(let L=0;L<8;L++){const j=L/8*Math.PI*2,X=new r(new He(.05,16,16),new ee({color:58879,emissive:58879,emissiveIntensity:2.5}));X.position.set(Math.cos(j)*2.2,0,Math.sin(j)*2.2),Z.add(X),Ae.push(X)}for(let L=0;L<3;L++){const j=L/3*Math.PI*2+.5,X=new r(new P(.03,.03,1.8,16),Ce);X.position.set(Math.cos(j)*2.2,.9,Math.sin(j)*2.2),Z.add(X)}o.add(Z);function ze(L,j,X,se){const pe=Math.sin(L*4.2+se*3.8)*Math.cos(j*3.6-se*3.2),Pe=Math.sin(X*4.8+se*4.4)*Math.cos(L*5.1+se*2.9)*.5,Ue=Math.sin((L+j+X)*12+se*18)*.25;return pe+Pe+Ue}const A=new bo,B=new Ie,Ee=new C,Te=new C;let Se=!1;const qe=[];for(let L=0;L<Le;L++){const j=[];for(let X=0;X<ke;X++)j.push(new C);qe.push(j)}const at=(L,j,X)=>{const se=s.voltage.value,pe=X||e;if(te.uVoltage.value=se,ue.uniforms.uVoltage.value=se,Be.uniforms.uVoltage.value=se,we.uniforms.uVoltage.value=se,H.getWorldPosition(Ee),t&&pe.uPointer){B.copy(pe.uPointer.value),A.setFromCamera(B,t);const Re=A.ray,Oe=Ee.clone().sub(Re.origin).dot(Re.direction),ut=Re.origin.clone().addScaledVector(Re.direction,Oe);if(ut.distanceTo(Ee)<I*1.35&&Oe>0){Se=!0;const fo=ut.clone().sub(Ee).normalize();Te.copy(Ee).addScaledVector(fo,E)}else Se=!1}const Pe=Math.floor(6+se*(Le-6));for(let Re=0;Re<Le;Re++){const le=nt[Re];if(le.active=Re<Pe,!!le.active)if(le.isPrimary)if(Se){const Oe=Te.clone().sub(Ee);le.targetPos.lerp(Oe,.22),le.intensity=1.6}else{const Oe=new C(Math.sin(1.1)*Math.cos(L*.4)*E,Math.cos(1.1)*E,Math.sin(1.1)*Math.sin(L*.4)*E);le.targetPos.lerp(Oe,.08),le.intensity=1}else if(le.isBranch){const Oe=nt[le.parentId];if(Oe&&Oe.active){const ut=le.id*1.3,yt=Oe.targetPos.clone();yt.x+=Math.cos(ut)*.35,yt.z+=Math.sin(ut)*.35,yt.normalize().multiplyScalar(E),le.targetPos.copy(yt),le.intensity=Oe.intensity*.75}}else le.theta-=le.convectionSpeed*j*(.8+se*.6),le.theta<.28&&(le.theta=1.9+Math.random()*.5,le.phi=Math.random()*Math.PI*2,le.seed=Math.random()*500,le.convectionSpeed=.08+Math.random()*.14),le.targetPos.set(Math.sin(le.theta)*Math.cos(le.phi)*E,Math.cos(le.theta)*E,Math.sin(le.theta)*Math.sin(le.phi)*E),le.intensity=1}const Ue=oe.attributes.position,Xe=oe.attributes.aTangent,Ne=Ue.array,Je=Xe.array,Ze=L*(1.2+se*1.5);for(let Re=0;Re<Le;Re++){const le=nt[Re],Oe=Re*Ge,ut=qe[Re];if(!le.active){for(let G=0;G<ke;G++){const K=(Oe+G*2)*3,J=K+3;Ne[K]=Ne[J]=0,Ne[K+1]=Ne[J+1]=R,Ne[K+2]=Ne[J+2]=0}continue}let yt;if(le.isBranch&&nt[le.parentId]){const G=qe[le.parentId],K=Math.floor(ke*le.branchT);yt=G[K].clone().sub(new C(0,R,0))}else yt=le.targetPos.clone().normalize().multiplyScalar(_);const mt=le.targetPos.clone().sub(yt),Jt=mt.length();mt.normalize();let Xt=new C(0,1,0);Math.abs(mt.dot(Xt))>.9&&(Xt=new C(1,0,0));const eo=new C().crossVectors(mt,Xt).normalize(),Mo=new C().crossVectors(mt,eo).normalize();for(let G=0;G<ke;G++){const K=G/(ke-1),J=Math.sin(K*Math.PI),M=yt.clone().addScaledVector(mt,K*Jt),de=.16*J*(1-K*.25)*(.8+se*.5);M.y+=de;const ye=M.clone().multiplyScalar(3.2),Fe=ze(ye.x+le.seed,ye.y,ye.z,Ze)*.15*J,bt=ze(ye.z,ye.x-le.seed,ye.y,Ze+37)*.15*J,St=(Math.random()-.5)*.024*J*se,gt=(Math.random()-.5)*.024*J*se;M.addScaledVector(eo,(Fe+St)*(.7+se*.5)),M.addScaledVector(Mo,(bt+gt)*(.7+se*.5)),M.length()>E&&M.normalize().multiplyScalar(E),ut[G].set(M.x,M.y+R,M.z)}for(let G=0;G<ke;G++){const K=ut[G],J=G<ke-1?ut[G+1]:K,M=G>0?ut[G-1]:K,de=J.clone().sub(M).normalize(),ye=(Oe+G*2)*3,Fe=ye+3;Ne[ye]=Ne[Fe]=K.x,Ne[ye+1]=Ne[Fe+1]=K.y,Ne[ye+2]=Ne[Fe+2]=K.z,Je[ye]=Je[Fe]=de.x,Je[ye+1]=Je[Fe+1]=de.y,Je[ye+2]=Je[Fe+2]=de.z}}Ue.needsUpdate=!0,Xe.needsUpdate=!0;let Tt=0;for(let Re=0;Re<Le&&Tt<ve;Re++){const le=nt[Re];if(!le.active)continue;const Oe=xe[Tt++];Oe.visible=!0;const ut=le.targetPos.clone();Oe.position.set(ut.x,ut.y+R,ut.z),Oe.lookAt(0,R,0);const yt=(le.isPrimary&&Se?1.5:.85)*(.8+se*.5);Oe.scale.setScalar(yt)}for(let Re=Tt;Re<ve;Re++)xe[Re].visible=!1;const kt=1.6+se*2.8,Et=.86+.14*Math.sin(L*45)*Math.sin(L*97);ce.intensity=kt*Et,Z.rotation.y=L*.15;for(let Re=0;Re<Ae.length;Re++){const le=L*4+Re*.8,Oe=1+Math.sin(le)*1.5;Ae[Re].material.emissiveIntensity=Math.max(.5,Oe*se)}};return at(0,.016,e),{group:o,update:at,controls:s}}function ni(a,e,t){const o=new U;o.name="BiologyStation";const n=Qt("biology");o.position.copy(n),a.add(o);const s={organelleIsolation:{value:"all"}},i=[],l=new F({color:qt,roughness:.92,metalness:0}),h=new r(new P(2.6,2.9,.6,64),l);h.position.y=.3,h.castShadow=!0,h.receiveShadow=!0,o.add(h);const u=new ot(2.7,.04,16,64);u.rotateX(Math.PI/2);const p=new r(u,new ee({color:8721,emissive:new $(65416),emissiveIntensity:2.2}));p.position.y=.05,o.add(p);const d=new U;d.position.set(-1.1,.6,0);const f=new ee({color:Ht,metalness:.95,roughness:.2,clearcoat:.6}),m=new r(new P(.85,.9,.25,32),f);m.position.y=.125,m.castShadow=!0,d.add(m);const y=new ee({transmission:.94,ior:1.5,roughness:.03,metalness:.02,thickness:.12,transparent:!0,opacity:1,color:16777215,clearcoat:1}),g=new r(new P(.82,.82,2.8,48,1,!0),y);g.position.y=1.65,d.add(g);const w=new r(new P(.9,.85,.3,32),f);w.position.y=3.2,w.castShadow=!0,d.add(w);const c=new r(new P(.78,.78,.15,32),new ee({color:2234896,roughness:.8}));c.position.y=.32,d.add(c);const b=new Wt(4521864,1.2,4,1.8);b.position.set(0,3,0),d.add(b);const x=new U;x.position.set(0,.4,0);const R=new ee({color:4007959,roughness:.85,metalness:.05}),I=new ee({color:2394692,roughness:.3,metalness:.05,sheen:.6,sheenColor:new $(5631607),transmission:.28,thickness:.3,side:We});function k(G,K,J,M,de){if(de<=0||J<.12)return;const ye=G.clone().add(K.clone().multiplyScalar(J)),Fe=new xs(G,ye),bt=new Ot(Fe,8,M,8,!1),St=new r(bt,R);if(x.add(St),de<=2){const it=2+Math.floor(Math.random()*3);for(let vt=0;vt<it;vt++){const xt=new Lt(.18,.32);xt.translate(0,.16,0);const Nt=new r(xt,I);Nt.position.copy(ye),Nt.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI*2,Math.random()*Math.PI),x.add(Nt)}}const gt=2;for(let it=0;it<gt;it++){const vt=.35+Math.random()*.25,xt=it*Math.PI+(Math.random()-.5)*.5,Nt=K.clone().applyAxisAngle(new C(1,0,0),vt).applyAxisAngle(new C(0,1,0),xt).normalize();k(ye,Nt,J*.72,M*.65,de-1)}}k(new C(0,0,0),new C(0,1,0),.75,.065,4),d.add(x),o.add(d);const _=new U;_.name="EukaryoticCellModel",_.position.set(1.2,2.15,0),o.add(_);const E=new P(.85,.95,.18,48),T=new r(E,l);T.position.set(1.2,.65,0),o.add(T);const q=new r(new zt(.65,.82,48),new ee({color:58879,emissive:new $(58879),emissiveIntensity:2.2,side:We}));q.rotateX(-Math.PI/2),q.position.set(1.2,.742,0),o.add(q);const W=new P(1,.75,1.4,32,1,!0),ae=new De({color:58879,transparent:!0,opacity:.08,side:We,blending:tt,depthWrite:!1}),ge=new r(W,ae);ge.position.set(1.2,1.45,0),o.add(ge);const be=new Wt(58879,1.5,3.5,1.8);be.position.set(1.2,1,0),o.add(be);const ue=new U;ue.name="Organelle_Membrane",_.add(ue);const Y=Math.PI*1.55,Be=new ee({color:165063,roughness:.22,metalness:.04,transmission:.45,thickness:.35,ior:1.35,sheen:.85,sheenColor:new $(8246268),clearcoat:.7,side:We}),Ve=new ee({color:223649,roughness:.3,metalness:.02,transmission:.3,side:We}),Le=1.2,ke=1.13,nt=new r(new He(Le,64,48,0,Y),Be);ue.add(nt);const Ge=new r(new He(ke,64,48,0,Y),Ve);ue.add(Ge),new Lt(Le-ke,2,1,32),new ee({color:16317180,roughness:.25,metalness:.05,side:We});const $e=85,D=new He(.045,12,12);D.scale(1,1.8,1);const v=new ee({color:3718648,roughness:.3,sheen:.6}),V=new _o(D,v,$e),O=new Ko;let N=0;for(let G=0;G<$e*2&&N<$e;G++){const K=Math.acos(2*Math.random()-1),J=Math.random()*Y,M=Le*Math.sin(K)*Math.cos(J),de=Le*Math.cos(K),ye=Le*Math.sin(K)*Math.sin(J);O.position.set(M,de,ye),O.lookAt(M*2,de*2,ye*2),O.scale.setScalar(.7+Math.random()*.5),O.updateMatrix(),V.setMatrixAt(N++,O.matrix)}V.instanceMatrix.needsUpdate=!0,ue.add(V);const S=new ee({color:165063,transmission:.88,roughness:.15,ior:1.33,transparent:!0,opacity:.22,side:We,depthWrite:!1}),oe=new r(new He(ke-.01,36,24,0,Y),S);ue.add(oe);const z=new U;z.name="Organelle_Nucleus";const te=new C(-.1,.05,.02);z.position.copy(te),_.add(z);const Me=.46,ve=new ee({color:8141549,emissive:new $(4988309),emissiveIntensity:.25,roughness:.35,metalness:.05,sheen:.9,sheenColor:new $(12616956),side:We}),Q=new r(new He(Me,48,36,0,Y),ve);z.add(Q);const we=new ee({color:3868516,roughness:.5,side:zo}),xe=new r(new He(Me-.02,36,24,0,Y),we);z.add(xe);const ce=new ot(.022,.007,8,16),Ye=new ee({color:14202110,roughness:.2,emissive:new $(11032055),emissiveIntensity:.4});for(let G=0;G<36;G++){const K=.3+Math.random()*(Math.PI-.6),J=Math.random()*Y,M=Me*Math.sin(K)*Math.cos(J),de=Me*Math.cos(K),ye=Me*Math.sin(K)*Math.sin(J),Fe=new r(ce,Ye);Fe.position.set(M,de,ye),Fe.lookAt(M*2,de*2,ye*2),z.add(Fe)}const H=new He(.18,32,32),Z=new ee({color:16096779,emissive:new $(14251782),emissiveIntensity:.65,roughness:.4,clearcoat:.5}),ne=new r(H,Z);z.add(ne);const Ce=new ee({color:15485081,roughness:.4,sheen:.7});for(let G=0;G<4;G++){const K=[],J=.24+G*.04;for(let ye=0;ye<16;ye++){const Fe=ye/16*Math.PI*2;K.push(new C(Math.sin(Fe*2.5)*J,Math.cos(Fe*3.2)*(J*.75),Math.sin(Fe*1.8)*J))}const M=new ao(K,!0),de=new r(new Ot(M,36,.012,8,!0),Ce);z.add(de)}const he=new U;he.name="Organelle_RER",_.add(he);const Ae=new ee({color:16007006,emissive:new $(10424889),emissiveIntensity:.2,roughness:.35,sheen:.75,sheenColor:new $(16698835),side:We}),ze=4,A=[];for(let G=0;G<ze;G++){const K=.58+G*.09,J=Math.PI*.95,M=Math.PI*.55,de=[],ye=32;for(let gt=0;gt<=ye;gt++){const it=gt/ye,vt=M+it*J,xt=Math.sin(it*Math.PI*4)*.045,Nt=(K+xt)*Math.cos(vt),Co=(K+xt)*Math.sin(vt),To=(it-.5)*.5;de.push(new C(Nt,To,Co).add(te))}const Fe=new ao(de),bt=new Ot(Fe,32,.038,12,!1),St=new r(bt,Ae);he.add(St);for(let gt=1;gt<ye;gt+=2){const it=de[gt];for(let vt=0;vt<3;vt++)A.push(new C(it.x+(Math.random()-.5)*.05,it.y+(vt-1)*.035,it.z+(Math.random()-.5)*.05))}}const B=A.length,Ee=new He(.013,8,8),Te=new ee({color:14742270,emissive:new $(3718648),emissiveIntensity:.6,roughness:.25}),Se=new _o(Ee,Te,B);A.forEach((G,K)=>{O.position.copy(G),O.scale.setScalar(1),O.updateMatrix(),Se.setMatrixAt(K,O.matrix)}),Se.instanceMatrix.needsUpdate=!0,he.add(Se);const qe=new U;qe.name="Organelle_SER",_.add(qe);const at=new ee({color:16486972,emissive:new $(12730636),emissiveIntensity:.2,roughness:.25,clearcoat:.6});[[new C(-.6,-.1,.4),new C(-.75,-.05,.55),new C(-.9,-.15,.45)],[new C(-.75,-.05,.55),new C(-.7,.15,.65),new C(-.85,.25,.55)],[new C(-.6,-.25,.2),new C(-.8,-.35,.3),new C(-.7,-.45,.15)],[new C(-.7,.15,.65),new C(-.6,.35,.55),new C(-.5,.45,.4)]].forEach(G=>{const K=new ao(G),J=new Ot(K,16,.024,10,!1),M=new r(J,at);qe.add(M)});const j=new U;j.name="Organelle_Golgi",j.position.set(.48,.12,.32),j.rotation.set(-.25,.4,.2),_.add(j);const X=new ee({color:15381256,emissive:new $(10576391),emissiveIntensity:.25,roughness:.2,transmission:.25,clearcoat:.85,sheen:.8,side:We});for(let G=0;G<6;G++){const K=Math.PI*.75,J=.22+G*.035,M=new ot(J,.025,12,36,K);M.scale(1,.45,1);const de=new r(M,X);de.position.y=(G-2.5)*.045,de.rotation.x=Math.PI/2,j.add(de)}const se=new ee({color:16638023,roughness:.15,transmission:.4,clearcoat:.9,emissive:new $(13273604),emissiveIntensity:.4}),pe=[];for(let G=0;G<16;G++){const K=.028+Math.random()*.025,J=new r(new He(K,16,16),se);J.position.set((Math.random()-.5)*.35+.15,(Math.random()-.5)*.35,(Math.random()-.5)*.35+.12),J.userData={initialPos:J.position.clone(),speed:1.5+Math.random()*2},j.add(J),pe.push(J)}const Pe=new U;Pe.name="Organelle_Mitochondria",_.add(Pe);const Ue=new ee({color:366185,roughness:.3,metalness:.05,clearcoat:.6,side:We}),Xe=new ee({color:3462041,emissive:new $(1096065),emissiveIntensity:.65,roughness:.25,side:We});function Ne(){const G=new U,K=new Ss(.11,.28,16,16),J=new r(K,Ue);G.add(J);const M=6;for(let de=0;de<M;de++){const ye=(de-(M-1)/2)*.055,Fe=.14*(1-Math.abs(ye)*1.5),bt=new me(Fe,.012,.16);bt.rotateZ((de%2===0?1:-1)*.2);const St=new r(bt,Xe);St.position.set(de%2===0?.02:-.02,ye,.04),G.add(St)}return G}[{pos:new C(-.55,-.28,.45),rot:new go(.4,.8,-.3)},{pos:new C(.4,-.42,-.35),rot:new go(-.6,-.4,.9)},{pos:new C(-.48,.45,-.38),rot:new go(.8,-.5,.3)},{pos:new C(.52,.4,.22),rot:new go(-.3,1.1,-.6)}].forEach(G=>{const K=Ne();K.position.copy(G.pos),K.rotation.copy(G.rot),Pe.add(K)});const Ze=new U;Ze.name="Organelle_Centrioles",Ze.position.set(-.25,.48,.12),_.add(Ze);const Tt=new ee({color:14251782,metalness:.45,roughness:.25,clearcoat:.5});function kt(){const G=new U;for(let K=0;K<9;K++){const J=K/9*Math.PI*2,M=Math.cos(J)*.055,de=Math.sin(J)*.055,ye=new P(.012,.012,.22,8),Fe=new r(ye,Tt);Fe.position.set(M,0,de),G.add(Fe)}return G}const Et=kt();Ze.add(Et);const Re=kt();Re.rotation.z=Math.PI/2,Re.position.set(.08,.08,.02),Ze.add(Re);const le=new U;le.name="Organelle_Vesicles",_.add(le);const Oe=new ee({color:2450411,emissive:new $(1920728),emissiveIntensity:.35,roughness:.25,transmission:.35,clearcoat:.8}),ut=new ee({color:6514417,emissive:new $(4405450),emissiveIntensity:.3,roughness:.3});[new C(.25,-.35,.45),new C(-.35,-.45,-.25),new C(.65,.15,-.3),new C(-.15,.35,-.55),new C(.35,.55,-.15)].forEach(G=>{const K=new r(new He(.062,16,16),Oe);K.position.copy(G),le.add(K)}),[new C(.45,-.15,.55),new C(-.45,.25,.35),new C(.15,-.55,-.15),new C(-.55,-.15,-.45),new C(.55,.3,.45)].forEach(G=>{const K=new r(new He(.052,16,16),ut);K.position.copy(G);const J=new r(new He(.022,8,8),new De({color:1973067}));K.add(J),le.add(K)});const mt=new U;mt.name="Organelle_Cytoskeleton",_.add(mt);const Jt=new De({color:3718648,transparent:!0,opacity:.65});for(let G=0;G<12;G++){const K=Math.random()*Math.PI,J=Math.random()*Y,M=new C(ke*Math.sin(K)*Math.cos(J)*.92,ke*Math.cos(K)*.92,ke*Math.sin(K)*Math.sin(J)*.92),de=Ze.position.clone().lerp(M,.5).add(new C((Math.random()-.5)*.2,(Math.random()-.5)*.2,(Math.random()-.5)*.2)),ye=new ao([Ze.position.clone(),de,M]),Fe=new Ot(ye,20,.006,6,!1),bt=new r(Fe,Jt);mt.add(bt)}function Xt(){let G=document.getElementById("vz-sgu-modal");if(!G){G=document.createElement("div"),G.id="vz-sgu-modal",G.style.cssText=`
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
      `,document.body.appendChild(G);const K=G.querySelector("#vz-sgu-modal-close"),J=()=>{G.remove(),window.removeEventListener("keydown",M)};K.addEventListener("click",J);const M=de=>{de.key==="Escape"&&J()};window.addEventListener("keydown",M)}}return{group:o,update:(G,K)=>{x.rotation.z=Math.sin(G*.8)*.02,_.rotation.y=-1.2+G*.16;const J=1+Math.sin(G*1.5)*.012;_.scale.set(J,J,J),pe.forEach((it,vt)=>{const xt=it.userData;it.position.x=xt.initialPos.x+Math.sin(G*xt.speed+vt)*.018,it.position.y=xt.initialPos.y+Math.cos(G*xt.speed*.8+vt)*.018});const M=s.organelleIsolation.value,de=M==="all"||M===0||!M,ye=de||M==="nucleus"||M===1,Fe=de||M==="mitochondria"||M===2,bt=de||M==="er"||M===3,St=de||M==="golgi"||M===4,gt=de||M==="centrioles"||M===5;ue.visible=de,z.visible=ye,Pe.visible=Fe,he.visible=bt,qe.visible=bt,j.visible=St,Ze.visible=gt,le.visible=de||St,mt.visible=de||gt,M==="nucleus"?(ve.emissiveIntensity=.8,Z.emissiveIntensity=1):(ve.emissiveIntensity=.25,Z.emissiveIntensity=.65),M==="mitochondria"?Xe.emissiveIntensity=1.2:Xe.emissiveIntensity=.65,M==="er"?(Ae.emissiveIntensity=.7,Te.emissiveIntensity=1.2):(Ae.emissiveIntensity=.2,Te.emissiveIntensity=.6),M==="golgi"?X.emissiveIntensity=.8:X.emissiveIntensity=.25},controls:s,openSguModal:Xt,interactiveTargets:i,destroy:()=>{}}}function si(a,e){const t=new U;t.name="MathStation";const o=Qt("mathematics");t.position.copy(o),a.add(t);const n={displayMode:{value:"hypercube"},rotationSpeed:{value:1},morphSpeed:{value:1}},s=new F({color:qt,roughness:.92,metalness:0}),i=new ee({color:Ht,metalness:.94,roughness:.22,clearcoat:.6}),l=new F({color:xo,roughness:.88,metalness:.1}),h=new r(new P(2.4,2.7,.7,64),s);h.position.y=.35,h.castShadow=!0,h.receiveShadow=!0,t.add(h);const u=new r(new ot(2.38,.04,8,64),l);u.position.y=.69,u.rotation.x=Math.PI/2,t.add(u);const p=new r(new P(2.35,2.35,.08,64),i);p.position.y=.74,t.add(p);const d=new ee({color:6698,emissive:po,emissiveIntensity:2.2,roughness:.15}),f=new r(new Do(1.9,64),d);f.rotateX(-Math.PI/2),f.position.y=.781,t.add(f);const m=new _e(1.9,2.6,64,1,!0);m.translate(0,1.3,0);const y=new De({color:58879,transparent:!0,opacity:.07,side:We,blending:tt,depthWrite:!1}),g=new r(m,y);g.position.y=.78,t.add(g);const w=[];for(let Q=0;Q<16;Q++)w.push([(Q&1?1:-1)*.72,(Q&2?1:-1)*.72,(Q&4?1:-1)*.72,(Q&8?1:-1)*.72]);const c=[];for(let Q=0;Q<16;Q++)for(let we=Q+1;we<16;we++){let xe=0;for(let ce=0;ce<4;ce++)w[Q][ce]!==w[we][ce]&&xe++;xe===1&&c.push([Q,we])}const b=new Float32Array(c.length*2*3),x=new Yt;x.setAttribute("position",new Ut(b,3));const R=new Go({color:61695,transparent:!0,opacity:.85,blending:tt,linewidth:2}),I=new Ms(x,R);I.position.set(0,2.3,0),t.add(I);const k=new He(.045,16,16),_=new ee({color:58879,emissive:8146431,emissiveIntensity:2.5,roughness:.1}),E=new _o(k,_,16);I.add(E);const T=2.4;function q(Q,we,xe){let[ce,Ye,H,Z]=Q;const ne=Math.cos(we),Ce=Math.sin(we),he=ce*ne-Z*Ce,Ae=ce*Ce+Z*ne,ze=Math.cos(xe),A=Math.sin(xe),B=Ye*ze-H*A,Ee=Ye*A+H*ze,Te=1/(T-Ae);return{pos:new C(he*Te*2.2,B*Te*2.2,Ee*Te*2.2),w:Ae}}const W=48,ae=24,ge=new Yt,be=(W+1)*(ae+1),ue=new Float32Array(be*3),Y=new Float32Array(be*2),Be=[];function Ve(Q,we,xe=0){const ce=we*Math.PI,Ye=Q*Math.PI*2,H=Math.sin(xe*.8)*.5+.5,Z=Math.pow(Math.sin(ce),2)*Math.cos(ce)*Math.cos(2*Ye),ne=Math.pow(Math.sin(ce),3)*Math.cos(ce)*Math.cos(3*Ye),Ce=(1-H)*Z+H*ne,he=.52+Math.abs(Ce)*1.15,Ae=he*Math.sin(ce)*Math.cos(Ye),ze=he*Math.cos(ce),A=he*Math.sin(ce)*Math.sin(Ye);return new C(Ae,ze,A)}let Le=0,ke=0;for(let Q=0;Q<=ae;Q++){const we=Q/ae;for(let xe=0;xe<=W;xe++){const ce=xe/W,Ye=Ve(ce,we,0);ue[Le]=Ye.x,ue[Le+1]=Ye.y,ue[Le+2]=Ye.z,Y[ke]=ce,Y[ke+1]=we,Le+=3,ke+=2}}for(let Q=0;Q<ae;Q++)for(let we=0;we<W;we++){const xe=Q*(W+1)+we,ce=(Q+1)*(W+1)+we,Ye=(Q+1)*(W+1)+(we+1),H=Q*(W+1)+(we+1);Be.push(xe,ce,H),Be.push(ce,Ye,H)}ge.setIndex(Be),ge.setAttribute("position",new Ut(ue,3)),ge.setAttribute("uv",new Ut(Y,2)),ge.computeVertexNormals();const nt=ei(e,{color:8146431,opacity:.65,scanlineSpeed:1.8,scanlineDensity:60}),Ge=new r(ge,nt);Ge.position.set(0,2.3,0),Ge.scale.setScalar(.85),t.add(Ge);const $e=new De({color:11766015,wireframe:!0,transparent:!0,opacity:.22}),D=new r(ge,$e);Ge.add(D);const v=48,V=new _e(.03,.1,8);V.rotateX(Math.PI/2);const O=new ee({color:16770560,emissive:16752640,emissiveIntensity:1.8,roughness:.2}),N=new _o(V,O,v);N.instanceMatrix.setUsage(Cs),Ge.add(N);const S=new Ko,oe=[];for(let Q=0;Q<v;Q++)oe.push({u:Math.random(),v:.1+Math.random()*.8,speed:.15+Math.random()*.25,phase:Math.random()*Math.PI*2});const z=["∇²ψ + k²ψ = 0","V_4 = ½π²r⁴  (Tesseract)","Y_l^m(θ, φ) = N e^{imφ} P_l^m","χ = V - E + F - C = 0"],te=[];z.forEach((Q,we)=>{const xe=document.createElement("canvas");xe.width=512,xe.height=128;const ce=xe.getContext("2d");ce.clearRect(0,0,xe.width,xe.height),ce.font='italic 32px "Times New Roman", Times, serif',ce.fillStyle="#00f0ff",ce.shadowColor="#00e5ff",ce.shadowBlur=10,ce.textAlign="center",ce.textBaseline="middle",ce.fillText(Q,256,64);const Ye=new ht(xe);Ye.needsUpdate=!0;const H=new vo({map:Ye,transparent:!0,blending:tt,depthWrite:!1}),Z=new wo(H);Z.scale.set(1.4,.35,1);const ne=we/z.length*Math.PI*2,Ce=1.75;Z.position.set(Math.cos(ne)*Ce,2.1+we%2*.45,Math.sin(ne)*Ce),t.add(Z),te.push({sprite:Z,angle:ne,baseY:Z.position.y})});const Me=new Ko;return{group:t,update:(Q,we)=>{const xe=n.rotationSpeed.value,ce=n.morphSpeed.value,Ye=Q*.65*xe,H=Q*.48*xe,Z=w.map(A=>q(A,Ye,H)),ne=x.attributes.position.array;let Ce=0;for(let A=0;A<c.length;A++){const[B,Ee]=c[A],Te=Z[B].pos,Se=Z[Ee].pos;ne[Ce++]=Te.x,ne[Ce++]=Te.y,ne[Ce++]=Te.z,ne[Ce++]=Se.x,ne[Ce++]=Se.y,ne[Ce++]=Se.z}x.attributes.position.needsUpdate=!0;for(let A=0;A<16;A++){const B=Z[A].pos,Ee=.8+Z[A].w*.25;Me.position.copy(B),Me.scale.setScalar(Math.max(Ee,.4)),Me.updateMatrix(),E.setMatrixAt(A,Me.matrix)}E.instanceMatrix.needsUpdate=!0;const he=ge.attributes.position.array;let Ae=0;for(let A=0;A<=ae;A++){const B=A/ae;for(let Ee=0;Ee<=W;Ee++){const Te=Ee/W,Se=Ve(Te,B,Q*ce);he[Ae++]=Se.x,he[Ae++]=Se.y,he[Ae++]=Se.z}}ge.attributes.position.needsUpdate=!0,ge.computeVertexNormals(),Ge.rotation.y=Q*.15,oe.forEach((A,B)=>{const Ee=(A.u+Q*A.speed)%1,Te=Ve(Ee,A.v,Q*ce),qe=Ve((Ee+.02)%1,A.v,Q*ce).clone().sub(Te).normalize();S.position.copy(Te),S.quaternion.setFromUnitVectors(new C(0,0,1),qe),S.scale.setScalar(.6+Math.sin(Q*3+A.phase)*.18),S.updateMatrix(),N.setMatrixAt(B,S.matrix)}),N.instanceMatrix.needsUpdate=!0,te.forEach((A,B)=>{const Ee=A.angle+Q*.12;A.sprite.position.x=Math.cos(Ee)*1.75,A.sprite.position.z=Math.sin(Ee)*1.75,A.sprite.position.y=A.baseY+Math.sin(Q*1.5+B)*.05});const ze=n.displayMode.value;ze==="hypercube"?(I.visible=!0,Ge.visible=!1):ze==="harmonic"?(I.visible=!1,Ge.visible=!0):(I.visible=!0,Ge.visible=!0)},controls:n}}const ai=[{title:"PILLARS OF CREATION",sub:"MESSIER 16 // EAGLE NEBULA",category:"EMISSION NEBULA & STAR NURSERY",image:"/astronomy/nebula_pillars.jpg",type:"Ionized Hydrogen (H II) & Molecular Gas Columns",dist:"6,500 Light-Years",sector:"Serpens // Sagittarius Arm",instrument:"JWST NIRCam & Hubble WFC3",facts:"Towering interstellar dust columns 4-5 light-years tall harboring active protostellar Evaporating Gaseous Globules (EGGs). Infrared imaging penetrates obscuring dust to reveal newborn star clusters.",accentColor:"#00e5ff",accentHex:58879},{title:"VOYAGER 1 PROBE",sub:"NASA JPL // INTERSTELLAR MISSION",category:"DEEP-SPACE INTERSTELLAR EXPLORER",image:"/astronomy/voyager1_interstellar.jpg",type:"Interstellar Boundary & Plasma Wave Explorer",dist:"163.8 AU (24.5 Billion km)",sector:"Heliosheath Outer Boundary // Ophiuchus",instrument:"Cosmic Ray Subsystem // Golden Record",facts:"First human-made spacecraft to cross the Heliopause into interstellar space (Aug 2012). Traveling at 17 km/s (38,000 mph) carrying the Golden Record message for distant civilizations.",accentColor:"#f59e0b",accentHex:16096779},{title:"ANDROMEDA GALAXY",sub:"MESSIER 31 // NGC 224",category:"MAJOR LOCAL GROUP SPIRAL GALAXY",image:"/astronomy/galaxy_andromeda.jpg",type:"Barred Spiral Galaxy (SA(s)b)",dist:"2.537 Million Light-Years",sector:"Andromeda Constellation",instrument:"Hubble Space Telescope HD Mosaic",facts:"Nearest major spiral galaxy to the Milky Way, spanning 220,000 light-years and containing over one trillion stars. Approaching our galaxy at 110 km/s on a cosmic merger trajectory.",accentColor:"#c084fc",accentHex:12616956},{title:"CARINA NEBULA",sub:"NGC 3372 // COSMIC CLIFFS",category:"DIFFUSE GIANT STAR-FORMING NURSERY",image:"/astronomy/nebula_carina.jpg",type:"Massive Emission & Reflection Nebula Complex",dist:"7,600 Light-Years",sector:"Carina-Sagittarius Arm",instrument:"JWST NIRCam / MIRI Infrared Suite",facts:"Spectacular hyper-active star factory carved by intense ultraviolet radiation from monstrous O-type stars. The famous Cosmic Cliffs reveal embryonic stars emerging from dense molecular gas ridges.",accentColor:"#00e5ff",accentHex:58879},{title:"INTERNATIONAL SPACE STATION",sub:"ISS // LOW EARTH ORBIT OBSERVATORY",category:"CREWED MICROGRAVITY LABORATORY",image:"/astronomy/iss_orbit.jpg",type:"Permanently Crewed Orbital Research Platform",dist:"Orbital Altitude: 418 km",sector:"Low Earth Orbit (Thermosphere)",instrument:"8 Solar Wings (120 kW) // AMS-02",facts:"Spanning 108.5 meters with a mass of 450,000 kg, the ISS has maintained continuous human presence in space since Nov 2000, orbiting Earth every 92 minutes at 27,600 km/h (7.66 km/s).",accentColor:"#fbbf24",accentHex:16498468},{title:"WHIRLPOOL GALAXY",sub:"MESSIER 51a // NGC 5194",category:"GRAND-DESIGN INTERACTING SPIRAL",image:"/astronomy/galaxy_whirlpool.jpg",type:"Grand-Design Spiral Galaxy with Companion",dist:"23 Million Light-Years",sector:"Canes Venatici",instrument:"Hubble Space Telescope ACS",facts:"Archetypal grand-design spiral galaxy engaged in violent gravitational tidal interaction with dwarf companion NGC 5195, triggering intense shockwaves and burst star formation along spiral arms.",accentColor:"#c084fc",accentHex:12616956},{title:"CRAB NEBULA",sub:"MESSIER 1 // NGC 1952",category:"SUPERNOVA REMNANT & PULSAR WIND",image:"/astronomy/nebula_crab.jpg",type:"Synchrotron Radiation Filamentary Remnant",dist:"6,500 Light-Years",sector:"Taurus Constellation",instrument:"Hubble / Chandra X-Ray Observatory",facts:"Expanding debris field from historic core-collapse supernova witnessed in 1054 AD. Driven from within by a 30 Hz spinning neutron star emitting intense magnetic synchrotron radiation.",accentColor:"#00e5ff",accentHex:58879},{title:"ISS OVER PLANET EARTH",sub:"ISS // HIGH-INCLINATION OVERFLIGHT",category:"EARTH OBSERVATION FROM THERMOSPHERE",image:"/astronomy/iss_earth.jpg",type:"Orbital Inclination: 51.64 Degrees",dist:"Velocity: 7.66 km/s (17,100 mph)",sector:"Circum-Terrestrial Low Orbit",instrument:"Cupola 7-Window Observation Bay",facts:"Completing 15.5 full orbits around Earth each day, astronauts aboard the ISS witness 16 sunrises and sunsets every 24 hours while capturing environmental climate telemetry.",accentColor:"#38bdf8",accentHex:3718648},{title:"SOMBRERO GALAXY",sub:"MESSIER 104 // NGC 4594",category:"HYBRID SPIRAL / LENTICULAR GALAXY",image:"/astronomy/galaxy_sombrero.jpg",type:"Unbarred Spiral with Enormous Central Bulge",dist:"29.3 Million Light-Years",sector:"Virgo / Corvus Border",instrument:"Hubble Space Telescope & Spitzer",facts:"Distinguished by its brilliant white central bulbous core and prominent symmetric dark dust lane. Anchored by an ultra-massive central black hole exceeding one billion solar masses.",accentColor:"#c084fc",accentHex:12616956}];function ii(a,e){const t=new U;t.name="AstronomyCurvedHolographicScreenGroup",a.add(t);const o=[],n=ai,s=Qt("astronomy"),i=new C(-s.x,0,-s.z).normalize(),l=i.clone().negate(),h=Math.atan2(i.x,i.z),u=4.4,p=1.65,d=2.65,f=l.clone().multiplyScalar(2.6),m=2.05,y=8.85,g=new U;g.name="AstroSingleCurvedScreenConsole",g.position.set(f.x,0,f.z),g.rotation.y=h,t.add(g);const w=document.createElement("canvas");w.width=1920,w.height=1080;const c=w.getContext("2d"),b=new ht(w);b.minFilter=Ft,b.magFilter=Ft,b.generateMipmaps=!1;const x=[];n.forEach(H=>{const Z=new Image;Z.crossOrigin="anonymous",Z.src=H.image,Z.onload=()=>{W()},x.push(Z)});let R=0,I=0,k=1,_=0,E=!1;const T=2.5,q=.55;function W(){c.clearRect(0,0,1920,1080);const H=k>.5?n[I]:n[R],Z=(k>.5?I:R)+1,ne=H.accentColor;c.fillStyle="rgba(4, 8, 18, 0.96)",c.fillRect(0,0,1920,1080),c.strokeStyle="rgba(0, 229, 255, 0.04)",c.lineWidth=1;for(let pe=80;pe<1920;pe+=160)c.beginPath(),c.moveTo(pe,0),c.lineTo(pe,1080),c.stroke();function Ce(pe,Pe){if(pe<0||pe>=x.length)return;const Ue=x[pe];if(!Ue||!Ue.complete||Ue.naturalWidth===0)return;c.save(),c.globalAlpha=Math.max(0,Math.min(1,Pe))*.95;const Xe=1920/1080,Ne=Ue.naturalWidth/Ue.naturalHeight;let Je,Ze,Tt,kt;Ne>Xe?(Ze=1080,Je=1080*Ne,Tt=(1920-Je)/2,kt=0):(Je=1920,Ze=1920/Ne,Tt=0,kt=(1080-Ze)/2),c.drawImage(Ue,Tt,kt,Je,Ze);const Et=c.createRadialGradient(960,540,280,960,540,960);Et.addColorStop(0,"rgba(4, 8, 18, 0.0)"),Et.addColorStop(.6,"rgba(4, 8, 18, 0.30)"),Et.addColorStop(1,"rgba(4, 8, 18, 0.92)"),c.fillStyle=Et,c.fillRect(0,0,1920,1080),c.restore()}k>=1?Ce(R,1):(Ce(R,1-k),Ce(I,k)),c.strokeStyle="rgba(255, 255, 255, 0.15)",c.lineWidth=1.5,c.beginPath(),c.moveTo(960,80),c.lineTo(960,140),c.moveTo(960,920),c.lineTo(960,980),c.moveTo(840,540),c.lineTo(900,540),c.moveTo(1020,540),c.lineTo(1080,540),c.stroke(),c.fillStyle="rgba(6, 12, 26, 0.94)",c.fillRect(0,0,1920,68),c.fillStyle=ne,c.fillRect(0,0,1920,5),c.font='900 22px "Inter", monospace',c.fillStyle=ne,c.textAlign="left",c.textBaseline="middle",c.fillText(`★ NASA / ESA / JWST ASTRONOMY ATLAS // ${H.category}`,50,36),c.textAlign="right",c.font='bold 22px "Inter", monospace',c.fillStyle=E?"#f59e0b":"rgba(255, 255, 255, 0.90)",c.fillText(E?"[ ⏸ STREAM PAUSED ]":`[ LIVE STREAM // SLIDE ${String(Z).padStart(2,"0")} / 09  •  2.5s DYNAMIC CYCLE ]`,1870,36);const he=120,Ae=820,ze=570;c.fillStyle="rgba(6, 12, 26, 0.94)",c.fillRect(50,he,ze,Ae),c.strokeStyle=ne,c.lineWidth=2.5,c.strokeRect(50,he,ze,Ae),An(c,50,he,ze,Ae,ne),c.textAlign="left",c.font='900 50px "Inter", "Segoe UI", sans-serif',c.fillStyle="#ffffff",c.fillText(H.title,80,he+68),c.font='900 24px "Inter", monospace',c.fillStyle=ne,c.fillText(H.sub,80,he+116),c.strokeStyle="rgba(255, 255, 255, 0.20)",c.lineWidth=2,c.beginPath(),c.moveTo(80,he+145),c.lineTo(50+ze-30,he+145),c.stroke();const A=80;let B=he+195;const Ee=88;[{label:"CLASSIFICATION:",val:H.type,color:"#f1f5f9"},{label:"DISTANCE / RANGE:",val:H.dist,color:"#38bdf8"},{label:"CONSTELLATION / SECTOR:",val:H.sector,color:"#c084fc"},{label:"OBSERVATION INSTRUMENT:",val:H.instrument,color:"#fbbf24"}].forEach(pe=>{c.font='900 18px "Inter", monospace',c.fillStyle="#94a3b8",c.fillText(pe.label,A,B),c.font='900 26px "Inter", "Segoe UI", sans-serif',c.fillStyle=pe.color,En(c,pe.val,A,B+34,ze-60,32),B+=Ee+28});const Se=1300,qe=570;c.fillStyle="rgba(6, 12, 26, 0.94)",c.fillRect(Se,he,qe,Ae),c.strokeStyle=ne,c.lineWidth=2.5,c.strokeRect(Se,he,qe,Ae),An(c,Se,he,qe,ne),c.font='900 24px "Inter", monospace',c.fillStyle=ne,c.fillText("MISSION & ASTROPHYSICAL SUMMARY",Se+35,he+60),c.strokeStyle="rgba(255, 255, 255, 0.20)",c.lineWidth=2,c.beginPath(),c.moveTo(Se+35,he+90),c.lineTo(Se+qe-35,he+90),c.stroke(),c.font='bold 24px "Inter", "Segoe UI", sans-serif',c.fillStyle="#f8fafc",En(c,H.facts,Se+35,he+140,qe-70,38);const at=he+490;c.fillStyle="rgba(8, 16, 34, 0.95)",c.fillRect(Se+35,at,qe-70,280),c.strokeStyle="rgba(255, 255, 255, 0.18)",c.lineWidth=1.5,c.strokeRect(Se+35,at,qe-70,280),c.font='900 20px "Inter", monospace',c.fillStyle="#38bdf8",c.fillText("OPTICAL PAYLOAD TELEMETRY:",Se+60,at+45),c.font='bold 20px "Inter", monospace',c.fillStyle="#cbd5e1",c.fillText("• QUANTUM SENSOR EFFICIENCY: 99.4%",Se+60,at+95),c.fillText("• ATMOSPHERIC EXTINCTION: ZERO (SPACE)",Se+60,at+145),c.fillText("• MULTI-WAVELENGTH INFRARED: ACTIVE",Se+60,at+195),c.fillText("• TIME-STEP REFRESH: 2.50 SECONDS",Se+60,at+245);const L=1015;c.fillStyle="rgba(5, 12, 26, 0.94)",c.fillRect(0,960,1920,120),c.strokeStyle="rgba(255, 255, 255, 0.20)",c.lineWidth=2,c.beginPath(),c.moveTo(0,960),c.lineTo(1920,960),c.stroke(),c.font='900 26px "Inter", monospace',c.fillStyle=ne,c.textAlign="left",c.fillText("◀ PREV SLIDE  (Click Left)",60,L+15),c.textAlign="center",c.font='bold 20px "Inter", monospace',c.fillStyle=E?"#f59e0b":"rgba(255, 255, 255, 0.85)",c.fillText(E?"[ ⏸ STREAM PAUSED — CLICK TO RESUME ]":"[ CLICK CENTER TO PAUSE / RESUME ]",960,L-8);const j=n.length,X=36,se=960-(j-1)*X/2;for(let pe=0;pe<j;pe++){const Pe=se+pe*X;c.beginPath(),c.arc(Pe,L+26,pe===Z-1?8:4.5,0,Math.PI*2),c.fillStyle=pe===Z-1?ne:"rgba(255, 255, 255, 0.35)",c.fill()}c.textAlign="right",c.fillStyle=ne,c.fillText("NEXT SLIDE ▶  (Click Right)",1860,L+15),b.needsUpdate=!0}W();const ae=new Lt(u,p,48,16),ge=ae.attributes.position;for(let H=0;H<ge.count;H++){const Z=ge.getX(H),ne=Math.max(-.95,Math.min(.95,Z/d)),Ce=d*(1-Math.cos(Math.asin(ne)));ge.setZ(H,Ce)}ae.computeVertexNormals();const be=new $(n[0].accentHex),ue=new ft({uniforms:{uTexture:{value:b},uTime:{value:0},uAccentColor:{value:be},uOpacity:{value:.96}},vertexShader:`
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
    `,transparent:!0,side:We,depthWrite:!1}),Y=new U;Y.position.set(0,m,0),Y.rotation.x=-.06,g.add(Y);const Be=new r(ae,ue);Be.name="AstroSingleCurvedScreenMesh",Be.userData={isScreen:!0},Y.add(Be),o.push(Be);const Ve=new F({color:qt,roughness:.92,metalness:0}),Le=new ee({color:Ht,metalness:.94,roughness:.22,clearcoat:.6}),ke=new ee({color:n[0].accentHex,emissive:new $(n[0].accentHex),emissiveIntensity:2.5,roughness:.2});function nt(H,Z,ne,Ce){const he=new me(H,Z,ne,48,1,1),Ae=he.attributes.position;for(let Te=0;Te<Ae.count;Te++){const Se=Ae.getX(Te),qe=Math.max(-.95,Math.min(.95,Se/d)),at=d*(1-Math.cos(Math.asin(qe)));Ae.setZ(Te,Ae.getZ(Te)+at)}he.computeVertexNormals();const ze=new r(he,Ve);ze.position.y=Ce,ze.castShadow=!0,Y.add(ze);const A=new me(H-.04,.012,ne+.01,48,1,1),B=A.attributes.position;for(let Te=0;Te<B.count;Te++){const Se=B.getX(Te),qe=Math.max(-.95,Math.min(.95,Se/d)),at=d*(1-Math.cos(Math.asin(qe)));B.setZ(Te,B.getZ(Te)+at)}A.computeVertexNormals();const Ee=new r(A,ke);return Ee.position.y=Ce,Y.add(Ee),{railMesh:ze,neonMesh:Ee}}nt(u+.08,.035,.035,p/2+.018),nt(u+.08,.035,.035,-p/2-.018);const Ge=new U;g.add(Ge);const $e=new me(2.4,.06,.05,32,1,1),D=$e.attributes.position;for(let H=0;H<D.count;H++){const Z=D.getX(H),ne=Math.max(-.95,Math.min(.95,Z/d)),Ce=d*(1-Math.cos(Math.asin(ne)));D.setZ(H,D.getZ(H)+Ce)}$e.computeVertexNormals();const v=new r($e,Le);v.position.set(0,m,-.035),v.rotation.x=-.06,g.add(v);const V=m+p/2+.018,O=y-V,N=V+O/2;[-1.65,-.55,.55,1.65].forEach(H=>{const Z=Math.max(-.95,Math.min(.95,H/d)),ne=d*(1-Math.cos(Math.asin(Z))),Ce=new P(.01,.01,O,16),he=new r(Ce,Le);he.position.set(H,N,ne),Ge.add(he);const Ae=new P(.022,.022,.09,16),ze=new r(Ae,Le);ze.position.set(H,V+.045,ne),Ge.add(ze);const A=new P(.12,.14,.04,24),B=new r(A,Ve);B.position.set(H,y,ne),Ge.add(B);const Ee=new ot(.13,.01,12,24);Ee.rotateX(Math.PI/2);const Te=new r(Ee,ke);Te.position.set(H,y-.02,ne),Ge.add(Te)});const oe=new Wt(n[0].accentHex,1.4,6,1.6);oe.position.set(0,m-.4,.3),oe.position.set(0,.35,.3),g.add(oe);function z(){k<1||(I=(R+1)%n.length,k=0,_=0)}function te(){k<1||(I=(R-1+n.length)%n.length,k=0,_=0)}function Me(){E=!E,W()}const ve={screenMesh:Be,nextSlide:z,prevSlide:te,togglePause:Me,update(H){if(E||(_+=H,_>=T&&k>=1&&(I=(R+1)%n.length,k=0,_=0)),k<1){if(k+=H/q,k>=1){k=1,R=I;const Z=n[R];be.set(Z.accentHex),ke.color.set(Z.accentHex),ke.emissive.set(Z.accentHex),oe.color.set(Z.accentHex)}W()}ue.uniforms.uTime.value+=H}},Q=new bo,we=new Ie;let xe={x:0,y:0,time:0};const ce=H=>{xe={x:H.clientX??H.touches?.[0]?.clientX??0,y:H.clientY??H.touches?.[0]?.clientY??0,time:performance.now()}},Ye=H=>{if(!e)return;const Z=H.clientX??H.changedTouches?.[0]?.clientX??0,ne=H.clientY??H.changedTouches?.[0]?.clientY??0,Ce=Math.hypot(Z-xe.x,ne-xe.y),he=performance.now()-xe.time;if(Ce>12||he>650||H.target&&(H.target.closest("#hud-container")||H.target.closest(".hud-panel")||H.target.closest("button")||H.target.closest("input")))return;we.x=Z/window.innerWidth*2-1,we.y=-(ne/window.innerHeight)*2+1,Q.setFromCamera(we,e);const Ae=Q.intersectObjects(o,!0);if(Ae.length>0){const ze=Ae[0];ze.uv&&(ze.uv.x<.28?ve.prevSlide():ze.uv.x>.72?ve.nextSlide():ve.togglePause())}};return window.addEventListener("pointerdown",ce,{passive:!0}),window.addEventListener("pointerup",Ye,{passive:!0}),{screens:[ve],interactiveTargets:o,group:t,update(H){ve.update(H)},destroy(){window.removeEventListener("pointerdown",ce),window.removeEventListener("pointerup",Ye)}}}function En(a,e,t,o,n,s){const i=e.split(" ");let l="",h=o;for(let u=0;u<i.length;u++){const p=l+i[u]+" ";a.measureText(p).width>n&&u>0?(a.fillText(l.trim(),t,h),l=i[u]+" ",h+=s):l=p}return a.fillText(l.trim(),t,h),h+s}function An(a,e,t,o,n,s){a.strokeStyle=s,a.lineWidth=2.5;const i=20;a.beginPath(),a.moveTo(e,t+i),a.lineTo(e,t),a.lineTo(e+i,t),a.stroke(),a.beginPath(),a.moveTo(e+o-i,t),a.lineTo(e+o,t),a.lineTo(e+o,t+i),a.stroke(),a.beginPath(),a.moveTo(e,t+n-i),a.lineTo(e,t+n),a.lineTo(e+i,t+n),a.stroke(),a.beginPath(),a.moveTo(e+o-i,t+n),a.lineTo(e+o,t+n),a.lineTo(e+o,t+n-i),a.stroke()}function ri(a,e){const o={uTime:e.uTime,uGranulationScale:{value:28},uSunspotIntensity:{value:1},uLimbDarkening:{value:.65}},n=new ft({uniforms:o,vertexShader:`
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
    `}),s=new r(new He(.24,64,64),n);s.name="SunMesh",a.add(s);const i=new He(.24*1.5,16,16),l=new De({visible:!1}),h=new r(i,l);h.name="SunHitMesh",h.userData={isSun:!0,name:"Sun"},s.add(h);const u=new Wt(16755268,2.8,8,1.6);a.add(u);const p=new ft({uniforms:{uTime:e.uTime},vertexShader:`
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
    `,transparent:!0,blending:tt,side:zo,depthWrite:!1}),d=new r(new He(.24*1.35,48,48),p);a.add(d);const f=new U;a.add(f);const m=new ft({uniforms:{uTime:e.uTime},vertexShader:`
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
    `,transparent:!0,blending:tt,side:We,depthWrite:!1});[{p0:[.65,.36,.65],apex:[.95,.58,.85],p1:[.78,.38,.52],radius:.012},{p0:[.6,.42,.68],apex:[.88,.72,.75],p1:[.72,.34,.6],radius:.009},{p0:[-.62,-.32,.7],apex:[-.92,-.45,.95],p1:[-.52,-.28,.8],radius:.013},{p0:[-.55,-.35,.65],apex:[-.8,-.62,.82],p1:[-.48,-.22,.85],radius:.008},{p0:[.2,.15,-.96],apex:[.38,.28,-1.35],p1:[.32,.18,-.92],radius:.011},{p0:[.95,-.1,.1],apex:[1.38,-.12,.14],p1:[.9,-.22,.18],radius:.014}].forEach(k=>{const _=new C(...k.p0).normalize().multiplyScalar(.2352),E=new C(...k.apex).normalize().multiplyScalar(.24*(1.3+Math.random()*.3)),T=new C(...k.p1).normalize().multiplyScalar(.24*.98),q=new ao([_,E,T]),W=new Ot(q,32,k.radius,12,!1),ae=new r(W,m);f.add(ae)});const g=new U;a.add(g);const w=R(),c=new vo({map:w,color:16772829,blending:tt,transparent:!0,opacity:.85,depthWrite:!1}),b=[];[new C(.72,.36,.58).normalize().multiplyScalar(.24*1.05),new C(-.58,-.3,.75).normalize().multiplyScalar(.24*1.05),new C(.26,.16,-.94).normalize().multiplyScalar(.24*1.05),new C(.95,-.15,.14).normalize().multiplyScalar(.24*1.05)].forEach((k,_)=>{const E=new wo(c.clone());E.position.copy(k),E.scale.set(.18,.18,.18),g.add(E),b.push({sprite:E,basePos:k.clone(),phase:_*1.5,scaleSpeed:2+_*.5})});function R(){const k=document.createElement("canvas");k.width=128,k.height=128;const _=k.getContext("2d"),E=_.createRadialGradient(64,64,0,64,64,64);return E.addColorStop(0,"rgba(255, 255, 255, 1.0)"),E.addColorStop(.2,"rgba(255, 200, 80, 0.9)"),E.addColorStop(.5,"rgba(255, 100, 20, 0.5)"),E.addColorStop(.8,"rgba(200, 30, 10, 0.15)"),E.addColorStop(1,"rgba(0, 0, 0, 0)"),_.fillStyle=E,_.fillRect(0,0,128,128),_.strokeStyle="rgba(255, 240, 200, 0.6)",_.lineWidth=2,_.beginPath(),_.moveTo(64,10),_.lineTo(64,118),_.moveTo(10,64),_.lineTo(118,64),_.stroke(),new ht(k)}return{sunMesh:s,hitMesh:h,update:(k,_)=>{s.rotation.y=k*.05,f.rotation.y=k*.05,g.rotation.y=k*.05,b.forEach(E=>{const T=Math.sin(k*E.scaleSpeed+E.phase),q=T>.4,W=q?.22+(T-.4)*.35:.12+Math.abs(T)*.06;E.sprite.scale.set(W,W,W),E.sprite.material.opacity=q?.95:.4+Math.abs(T)*.3}),u.intensity=2.6+Math.sin(k*4)*.3+Math.random()*.15}}}const Fn={Sun:{name:"THE SUN (SOL)",designation:"G-Type Main-Sequence Star // Spectral Class G2V",accentColor:"#ffaa00",stats:[{label:"EQUATORIAL RADIUS",value:"696,340 km (109.3 × Earth)"},{label:"SOLAR MASS",value:"1.989 × 10³⁰ kg (333,000 × Earth)"},{label:"SURFACE TEMPERATURE",value:"5,500 °C (5,778 K Photosphere)"},{label:"CORE TEMPERATURE",value:"15,000,000 °C (Nuclear Fusion)"},{label:"ROTATION PERIOD",value:"25.05 Days (Equator) to 34.4 Days (Poles)"},{label:"SYSTEM MASS FRACTION",value:"99.86% of Total Solar System Mass"},{label:"COMPOSITION",value:"73.46% Hydrogen, 24.85% Helium, 1.69% O/C/Fe"},{label:"MAGNETIC PHENOMENA",value:"Sunspots, Coronal Loops, Solar Flares & CMEs"}],summary:"The central gravitational anchor of our solar system. A middle-aged G2V yellow dwarf star generating 3.828 × 10²⁶ Watts via proton-proton chain nuclear fusion in its core. Active magnetic fields drive sunspots and eruptive coronal mass ejections."},Mercury:{name:"MERCURY",designation:"Terrestrial Planet // 1st from Sun",accentColor:"#9e9e9e",stats:[{label:"DISTANCE FROM SUN",value:"57.9 Million km (0.387 AU)"},{label:"MEAN RADIUS",value:"2,439.7 km (0.383 × Earth)"},{label:"ORBITAL PERIOD",value:"87.97 Earth Days"},{label:"SURFACE TEMPERATURE",value:"-180 °C (Night) to +430 °C (Day)"},{label:"SURFACE GRAVITY",value:"3.7 m/s² (0.38 g)"},{label:"NATURAL SATELLITES",value:"0 Moons"},{label:"ATMOSPHERE",value:"Trace Exosphere (Oxygen, Sodium, Hydrogen)"},{label:"PRIMARY MISSIONS",value:"Mariner 10, MESSENGER, BepiColombo"}],summary:"Smallest planet in the solar system and closest to the Sun. Heavily cratered surface resembling Earth’s Moon, with a massive iron-nickel metallic core making up 85% of its planetary radius."},Venus:{name:"VENUS",designation:"Terrestrial Planet // 2nd from Sun",accentColor:"#e6c280",stats:[{label:"DISTANCE FROM SUN",value:"108.2 Million km (0.723 AU)"},{label:"MEAN RADIUS",value:"6,051.8 km (0.949 × Earth)"},{label:"ORBITAL PERIOD",value:"224.7 Earth Days (Retrograde Rotation)"},{label:"SURFACE TEMPERATURE",value:"+465 °C (Lead-Melting Greenhouse)"},{label:"SURFACE PRESSURE",value:"92 bar (Equivalent to 900m Underwater)"},{label:"NATURAL SATELLITES",value:"0 Moons"},{label:"ATMOSPHERIC COMP.",value:"96.5% CO₂, 3.5% N₂, Sulfuric Acid Clouds"},{label:"PRIMARY MISSIONS",value:"Venera 7-14, Magellan, Akatsuki, DAVINCI+"}],summary:"Often called Earth’s twin in size and mass, but afflicted by a runaway greenhouse effect making it the hottest planet in the solar system. Rotates backwards relative to most planets with a day longer than its year (243 Earth days)."},Earth:{name:"EARTH (TERRA)",designation:"Terrestrial Planet // 3rd from Sun",accentColor:"#3b82f6",stats:[{label:"DISTANCE FROM SUN",value:"149.6 Million km (1.000 AU)"},{label:"MEAN RADIUS",value:"6,371.0 km (Equatorial: 6,378.1 km)"},{label:"ORBITAL PERIOD",value:"365.256 Days (1.000 Year)"},{label:"SURFACE TEMPERATURE",value:"Mean +15 °C (-89.2 °C to +56.7 °C)"},{label:"SURFACE GRAVITY",value:"9.807 m/s² (1.00 g)"},{label:"NATURAL SATELLITES",value:"1 (The Moon / Luna, R = 1,737 km)"},{label:"ATMOSPHERE",value:"78.08% N₂, 20.95% O₂, 0.93% Ar, 0.04% CO₂"},{label:"BIOSPHERE STATUS",value:"Only Known Astronomical Body Harboring Life"}],summary:"Humanity’s home world. The only known celestial body possessing liquid water oceans on its surface, an active dynamic plate tectonic system, a protective geomagnetic field, and an oxygen-rich atmosphere sustaining complex life."},Mars:{name:"MARS",designation:"Terrestrial Planet // 4th from Sun",accentColor:"#ef4444",stats:[{label:"DISTANCE FROM SUN",value:"227.9 Million km (1.524 AU)"},{label:"MEAN RADIUS",value:"3,389.5 km (0.532 × Earth)"},{label:"ORBITAL PERIOD",value:"686.98 Earth Days (Sol = 24h 37m)"},{label:"SURFACE TEMPERATURE",value:"-140 °C to +20 °C (Mean -63 °C)"},{label:"SURFACE GRAVITY",value:"3.72 m/s² (0.379 g)"},{label:"NATURAL SATELLITES",value:"2 Moons (Phobos & Deimos)"},{label:"ATMOSPHERE",value:"95.32% CO₂, 2.6% N₂, 1.9% Ar (Thin 6.1 mbar)"},{label:"EXPLORATION FLEET",value:"Curiosity, Perseverance, Ingenuity, MRO"}],summary:"The Red Planet, colored by ferric oxide (rust) dust on its surface. Hosts Olympus Mons (the largest volcano in the solar system, 21.9 km high) and Valles Marineris canyon. Abundant evidence of ancient flowing liquid water riverbeds and lake basins."},Jupiter:{name:"JUPITER",designation:"Gas Giant // 5th from Sun",accentColor:"#d97706",stats:[{label:"DISTANCE FROM SUN",value:"778.5 Million km (5.204 AU)"},{label:"EQUATORIAL RADIUS",value:"71,492 km (11.209 × Earth)"},{label:"ORBITAL PERIOD",value:"11.86 Earth Years (Rotation: 9h 55m)"},{label:"CLOUD TOP TEMP.",value:"-110 °C (Core: ~24,000 °C)"},{label:"PLANETARY MASS",value:"1.898 × 10²⁷ kg (317.8 × Earth, 2.5× All Others)"},{label:"NATURAL SATELLITES",value:"95 Confirmed Moons (Io, Europa, Ganymede, Callisto)"},{label:"ATMOSPHERE",value:"89.8% H₂, 10.2% He, Ammonia & Methane Clouds"},{label:"PRIMARY MISSIONS",value:"Pioneer, Voyager, Galileo, Juno, JUICE"}],summary:"The undisputed king of planets. A colossal gas giant with an internal metallic hydrogen mantle generating an immense magnetosphere. Features the Great Red Spot—an anticyclonic storm larger than Earth that has raged for over 350 years."},Saturn:{name:"SATURN",designation:"Gas Giant // 6th from Sun",accentColor:"#fde047",stats:[{label:"DISTANCE FROM SUN",value:"1.434 Billion km (9.582 AU)"},{label:"EQUATORIAL RADIUS",value:"60,268 km (9.449 × Earth)"},{label:"ORBITAL PERIOD",value:"29.45 Earth Years (Rotation: 10h 33m)"},{label:"MEAN DENSITY",value:"0.687 g/cm³ (Less Dense than Liquid Water)"},{label:"RING SYSTEM SPAN",value:"282,000 km Wide, Only ~10–30 Meters Thick"},{label:"NATURAL SATELLITES",value:"146 Confirmed Moons (Titan, Enceladus, Mimas)"},{label:"RING COMPOSITION",value:"99% Pure Water Ice Particles with Silicate Dust"},{label:"PRIMARY MISSIONS",value:"Pioneer 11, Voyager 1 & 2, Cassini-Huygens"}],summary:"Celebrated for its majestic ring system made of billions of icy fragments. Saturn is orbited by Titan (possessing a dense nitrogen atmosphere and liquid methane lakes) and Enceladus (harboring an active subsurface ocean with erupting cryovolcanic geysers)."},Uranus:{name:"URANUS",designation:"Ice Giant // 7th from Sun",accentColor:"#38bdf8",stats:[{label:"DISTANCE FROM SUN",value:"2.871 Billion km (19.19 AU)"},{label:"EQUATORIAL RADIUS",value:"25,559 km (4.007 × Earth)"},{label:"ORBITAL PERIOD",value:"84.02 Earth Years (Rotation: 17h 14m)"},{label:"AXIAL TILT",value:"97.77° (Rotates Completely on its Side)"},{label:"CLOUD TOP TEMP.",value:"-224 °C (Coldest Planetary Atmosphere)"},{label:"NATURAL SATELLITES",value:"28 Known Moons (Titania, Oberon, Miranda)"},{label:"ATMOSPHERE",value:"83% H₂, 15% He, 2.3% CH₄ (Methane Blue Tint)"},{label:"PRIMARY MISSIONS",value:"Voyager 2 Flyby (January 1986)"}],summary:"An enigmatic ice giant rolling through space on its side due to a catastrophic ancient proto-planetary collision. Its blue-green cyan color stems from atmospheric methane absorbing red wavelengths of sunlight."},Neptune:{name:"NEPTUNE",designation:"Ice Giant // 8th from Sun",accentColor:"#2563eb",stats:[{label:"DISTANCE FROM SUN",value:"4.495 Billion km (30.07 AU)"},{label:"EQUATORIAL RADIUS",value:"24,764 km (3.883 × Earth)"},{label:"ORBITAL PERIOD",value:"164.8 Earth Years (Rotation: 16h 06m)"},{label:"SUPERSONIC WINDS",value:"Up to 2,100 km/h (Fastest in Solar System)"},{label:"CLOUD TOP TEMP.",value:"-218 °C"},{label:"NATURAL SATELLITES",value:"16 Known Moons (Triton, Proteus, Nereid)"},{label:"ATMOSPHERE",value:"80% H₂, 19% He, 1.5% CH₄ (Deep Azure Azure)"},{label:"PRIMARY MISSIONS",value:"Voyager 2 Flyby (August 1989)"}],summary:"The outermost major planet of the solar system, shrouded in deep vivid blue skies swept by violent supersonic winds. Its largest moon, Triton, orbits retrograde and shoots active nitrogen ice geysers into its tenuous atmosphere."}};function li(a,e){const t=new U;t.name="CelestialTelemetryCard",t.visible=!1,a.add(t);const o=document.createElement("canvas");o.width=1024,o.height=512;const n=o.getContext("2d"),s=new ht(o);s.minFilter=Ft,s.magFilter=Ft;const i=new Lt(1.05,.52),l=new De({map:s,transparent:!0,side:We,depthWrite:!1}),h=new r(i,l);t.add(h);const u=new Yt().setFromPoints([new C(0,0,0),new C(.5,.4,0)]),p=new Go({color:58879,transparent:!0,opacity:.85,linewidth:2}),d=new en(u,p);t.add(d);const f=new zt(.12,.15,32),m=new De({color:58879,transparent:!0,opacity:.9,side:We}),y=new r(f,m);y.rotation.x=Math.PI/2,t.add(y);let g=document.getElementById("celestial-telemetry-hud");g||(g=document.createElement("div"),g.id="celestial-telemetry-hud",g.style.cssText=`
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 420px;
      max-width: calc(100vw - 48px);
      background: rgba(10, 14, 24, 0.92);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(0, 229, 255, 0.35);
      border-radius: 12px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 24px rgba(0, 229, 255, 0.15);
      color: #f1f5f9;
      font-family: 'Inter', -apple-system, sans-serif;
      z-index: 9999;
      transform: translateY(120%);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
      opacity: 0;
      pointer-events: auto;
      overflow: hidden;
    `,document.body.appendChild(g));let w=null;function c(E){n.clearRect(0,0,1024,512),n.fillStyle="rgba(8, 12, 22, 0.92)",n.fillRect(0,0,1024,512),n.strokeStyle=E.accentColor,n.lineWidth=3,n.strokeRect(4,4,1016,504),n.fillStyle=E.accentColor,n.fillRect(0,0,1024,60),n.font='900 28px "Inter", "Segoe UI", sans-serif',n.fillStyle="#0a0e1c",n.textAlign="left",n.textBaseline="middle",n.fillText(`★ CELESTIAL TELEMETRY // ${E.name}`,24,30),n.font='bold 18px "Inter", monospace',n.fillStyle=E.accentColor,n.fillText(E.designation,24,90);const T=24,q=530;let W=130;E.stats.slice(0,6).forEach((ae,ge)=>{const be=ge%2===0?T:q;ge%2===0&&ge>0&&(W+=52),n.font='bold 13px "Inter", monospace',n.fillStyle="#94a3b8",n.fillText(ae.label,be,W),n.font='bold 17px "Inter", "Segoe UI", sans-serif',n.fillStyle="#ffffff",n.fillText(ae.value,be,W+22)}),n.fillStyle="rgba(255, 255, 255, 0.05)",n.fillRect(24,320,976,160),n.strokeStyle="rgba(255, 255, 255, 0.12)",n.strokeRect(24,320,976,160),n.font='italic 16px "Inter", "Segoe UI", sans-serif',n.fillStyle="#e2e8f0",x(n,E.summary,44,345,936,26),s.needsUpdate=!0}function b(E){const T=E.stats.map(q=>`
        <div style="display:flex; justify-content:space-between; align-items:baseline; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.06); font-size:12.5px;">
          <span style="color:#94a3b8; font-family:monospace; font-weight:600; letter-spacing:0.04em;">${q.label}</span>
          <span style="color:#ffffff; font-weight:700; text-align:right; margin-left:12px;">${q.value}</span>
        </div>
      `).join("");g.innerHTML=`
      <div style="background:${E.accentColor}; color:#0a0e1c; padding:10px 16px; display:flex; justify-content:space-between; align-items:center; font-weight:900; font-size:13px; letter-spacing:0.05em;">
        <span>★ CELESTIAL DATA // ${E.name}</span>
        <button id="close-telemetry-hud" style="background:transparent; border:none; color:#0a0e1c; font-size:18px; font-weight:900; cursor:pointer; padding:0 4px; line-height:1;">✕</button>
      </div>
      <div style="padding:16px 20px; max-height:480px; overflow-y:auto;">
        <div style="color:${E.accentColor}; font-size:11px; font-weight:700; font-family:monospace; margin-bottom:12px; letter-spacing:0.08em;">
          ${E.designation}
        </div>
        <div style="margin-bottom:14px;">
          ${T}
        </div>
        <div style="background:rgba(255,255,255,0.04); border-left:3px solid ${E.accentColor}; padding:10px 12px; font-size:12px; line-height:1.55; color:#cbd5e1; border-radius:0 6px 6px 0;">
          ${E.summary}
        </div>
      </div>
    `,document.getElementById("close-telemetry-hud")?.addEventListener("click",q=>{q.stopPropagation(),I()}),g.style.transform="translateY(0)",g.style.opacity="1"}function x(E,T,q,W,ae,ge){const be=T.split(" ");let ue="";for(let Y=0;Y<be.length;Y++){const Be=ue+be[Y]+" ";E.measureText(Be).width>ae&&Y>0?(E.fillText(ue,q,W),ue=be[Y]+" ",W+=ge):ue=Be}E.fillText(ue,q,W)}function R(E,T){const q=Fn[T];q&&(w={mesh:E,dataKey:T,data:q},c(q),b(q),t.visible=!0,p.color.set(q.accentColor),m.color.set(q.accentColor))}function I(){w=null,t.visible=!1,g.style.transform="translateY(120%)",g.style.opacity="0"}new C;const k=new C;return{selectBody:R,deselect:I,update:(E,T)=>{if(!w||!t.visible)return;const q=w.mesh.position;y.position.copy(q);const W=1+Math.sin(E*4)*.15;y.scale.set(W,W,1);const ge=w.dataKey==="Sun"?.65:q.x>0?.45:-.45;k.set(q.x+ge,q.y+.42,q.z),h.position.copy(k),e&&h.quaternion.copy(e.quaternion);const be=ge>0?-.45:.45,ue=[q.clone(),k.clone().add(new C(be,-.15,0))];d.geometry.setFromPoints(ue)},cardGroup:t}}function ci(a,e,t){const o=new U;o.name="AstronomyObservationHub";const n=Qt("astronomy");o.position.copy(n),a.add(o);const s={orbitalTimeScale:{value:1}},i=new F({color:qt,roughness:.92,metalness:0}),l=new r(new P(3,3.3,.6,64),i);l.position.y=.3,l.castShadow=!0,l.receiveShadow=!0,o.add(l);const h=new r(new ot(3.1,.04,16,64),new ee({color:1114146,emissive:new $(10309341),emissiveIntensity:2.5}));h.rotation.x=Math.PI/2,h.position.y=.05,o.add(h);const u=new U;u.position.set(0,1.42,0),o.add(u);const p=ri(u,e),d=p.sunMesh,f=[{name:"Mercury",dist:.38,size:.035,speed:4.15,color:10395294},{name:"Venus",dist:.52,size:.052,speed:1.62,color:15123072},{name:"Earth",dist:.68,size:.06,speed:1,color:3900150},{name:"Mars",dist:.84,size:.045,speed:.53,color:15680580},{name:"Jupiter",dist:1.08,size:.105,speed:.24,color:14251782,bands:!0},{name:"Saturn",dist:1.34,size:.085,speed:.12,color:16638023,ring:!0},{name:"Uranus",dist:1.62,size:.065,speed:.06,color:3718648},{name:"Neptune",dist:1.85,size:.06,speed:.03,color:2450411}],m=[],y=[p.hitMesh,d],g=new ft({vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      varying vec2 vUv;
      void main() {
        float r = length(vUv - 0.5) * 2.0;
        if (r < 0.4 || r > 1.0) discard;
        float band = sin(r * 35.0) * 0.2 + 0.8;
        float alpha = smoothstep(0.4, 0.5, r) * smoothstep(1.0, 0.85, r) * 0.85;
        vec3 col = vec3(0.92, 0.82, 0.65) * band;
        gl_FragColor = vec4(col, alpha);
      }
    `,transparent:!0,side:We,depthWrite:!1}),w=new ft({uniforms:{uTime:e.uTime},vertexShader:`
      varying vec3 vNormal;
      varying vec2 vUv;
      void main() {
        vNormal = normal;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform float uTime;
      varying vec3 vNormal;
      varying vec2 vUv;
      void main() {
        float bands = sin(vUv.y * 30.0 + sin(vUv.x * 10.0 + uTime * 0.2) * 1.5) * 0.5 + 0.5;
        vec3 colorA = vec3(0.85, 0.55, 0.35);
        vec3 colorB = vec3(0.95, 0.88, 0.75);
        vec3 col = mix(colorA, colorB, bands);
        gl_FragColor = vec4(col, 1.0);
      }
    `});f.forEach(T=>{const W=new Ts(0,0,T.dist,T.dist,0,2*Math.PI,!1,0).getPoints(96),ae=new Yt().setFromPoints(W.map(Le=>new C(Le.x,0,Le.y))),ge=new Go({color:4491451,transparent:!0,opacity:.35}),be=new en(ae,ge);u.add(be);let ue;T.bands?ue=w:ue=new ee({color:T.color,roughness:.4,metalness:.1});const Y=new r(new He(T.size,24,24),ue);Y.name=`Planet_${T.name}`,Y.userData={name:T.name,isPlanet:!0},u.add(Y);const Be=Math.max(.18,T.size*2.4),Ve=new r(new He(Be,16,16),new De({visible:!1}));if(Ve.name=`HitMesh_${T.name}`,Ve.userData={name:T.name,isHitBox:!0},Y.add(Ve),y.push(Ve,Y),T.ring){const Le=new r(new zt(T.size*1.4,T.size*2.8,32),g);Le.rotation.x=Math.PI/2.3,Y.add(Le)}m.push({mesh:Y,name:T.name,dist:T.dist,speed:T.speed,angle:Math.random()*Math.PI*2})});const c=ii(o,t),b=li(u,t),x=new bo,R=new Ie;let I={x:0,y:0,time:0};const k=T=>{I={x:T.clientX??T.touches?.[0]?.clientX??0,y:T.clientY??T.touches?.[0]?.clientY??0,time:performance.now()}},_=T=>{if(!t)return;const q=T.clientX??T.changedTouches?.[0]?.clientX??0,W=T.clientY??T.changedTouches?.[0]?.clientY??0,ae=Math.hypot(q-I.x,W-I.y),ge=performance.now()-I.time;if(ae>12||ge>650||T.target&&(T.target.closest("#celestial-telemetry-hud")||T.target.closest("#hud-container")||T.target.closest(".hud-panel")||T.target.closest("button")||T.target.closest("input")))return;R.x=q/window.innerWidth*2-1,R.y=-(W/window.innerHeight)*2+1,x.setFromCamera(R,t);const be=x.intersectObjects(y,!0);if(be.length>0){const ue=be[0].object,Y=ue.userData?.name||ue.parent?.userData?.name,Be=ue.userData?.isHitBox?ue.parent:ue;Y&&Fn[Y]&&b.selectBody(Be,Y)}};return window.addEventListener("pointerdown",k,{passive:!0}),window.addEventListener("pointerup",_,{passive:!0}),{group:o,update:(T,q)=>{const W=s.orbitalTimeScale.value;m.forEach(ae=>{ae.angle+=ae.speed*.25*W*q,ae.mesh.position.x=Math.cos(ae.angle)*ae.dist,ae.mesh.position.z=Math.sin(ae.angle)*ae.dist}),c.update(q),p.update(T),b.update(T,q)},controls:s,telemetry:b,selectCelestialBody:T=>{if(T==="Sun")b.selectBody(d,"Sun");else{const q=m.find(W=>W.name===T);q&&b.selectBody(q.mesh,T)}}}}function di(a){const e=new U;e.name="MobileRobotsFleet",a.add(e);const t=new U;t.name="R2D2",e.add(t);const o=new F({color:16119802,roughness:.35,metalness:.12}),n=new F({color:675517,roughness:.3,metalness:.45}),s=new F({color:14476012,roughness:.22,metalness:.82}),i=new F({color:1711652,roughness:.6,metalness:.5}),l=new ee({color:329744,roughness:.1,metalness:.9,clearcoat:1}),h=.2,u=.46,p=.44,d=new r(new P(h,h,u,32),o);d.position.y=p,d.castShadow=!0,t.add(d);for(let L=0;L<4;L++){const j=new r(new me(.08,.08,.015),n),X=(L-1.5)*.35;j.position.set(Math.sin(X)*(h+.005),p+.08,Math.cos(X)*(h+.005)),j.rotation.y=X,t.add(j)}const f=new r(new me(.12,.09,.015),s);f.position.set(0,p-.12,h+.005),t.add(f);const m=new U;m.position.set(0,p+u/2,0),t.add(m);const y=new r(new He(h,32,16,0,Math.PI*2,0,Math.PI*.5),s);y.castShadow=!0,m.add(y);const g=new r(new P(h*1.002,h*1.002,.035,32,1,!0),n);g.position.y=.02,m.add(g);for(let L=0;L<6;L++){const j=new r(new me(.05,.06,.01),n),X=L/6*Math.PI*2;j.position.set(Math.sin(X)*(h*.88),.11,Math.cos(X)*(h*.88)),j.rotation.y=X,m.add(j)}const w=new r(new P(.045,.05,.035,16),i);w.rotation.x=Math.PI/2,w.position.set(0,.1,h*.86),m.add(w);const c=new r(new He(.032,16,16),l);c.position.set(0,.1,h*.9),m.add(c);const b=new r(new P(.025,.03,.03,16),s);b.rotation.x=Math.PI/2.2,b.position.set(.08,.07,h*.86),m.add(b);const x=new De({color:58879,transparent:!0,opacity:0,blending:tt,side:We,depthWrite:!1}),R=new r(new _e(.35,1.2,16,1,!0),x);R.rotation.x=-Math.PI/2.2,R.position.set(.08,.07,h*.86+.6),m.add(R);const I=new De({color:16716066}),k=new De({color:58879}),_=new r(new me(.02,.03,.01),I);_.position.set(-.06,.12,h*.88),m.add(_);const E=new r(new me(.02,.025,.01),k);E.position.set(-.06,.07,h*.88),m.add(E);const T=.06,q=.08,W=.52;[-.25,.25].forEach(L=>{const j=new U;j.position.set(L,p+.16,0),t.add(j);const X=new r(new P(.07,.07,.04,24),s);X.rotation.z=Math.PI/2,j.add(X);const se=new r(new me(T,W,q),o);se.position.set(0,-W/2,0),se.castShadow=!0,j.add(se);const pe=new r(new me(T+.005,.16,.04),n);pe.position.set(0,-W*.45,0),j.add(pe);const Pe=new r(new me(.12,.07,.24),o);Pe.position.set(0,-W-.02,0),Pe.castShadow=!0,j.add(Pe);const Ue=new r(new P(.028,.028,.09,16),i);Ue.rotation.z=Math.PI/2,Ue.position.set(0,-W-.045,.06),j.add(Ue);const Xe=new r(new P(.028,.028,.09,16),i);Xe.rotation.z=Math.PI/2,Xe.position.set(0,-W-.045,-.06),j.add(Xe)});const ae=new U;ae.position.set(0,.14,.15),t.add(ae);const ge=new r(new me(.06,.14,.06),o);ge.rotation.x=Math.PI/8,ae.add(ge);const be=new r(new me(.1,.06,.18),o);be.position.set(0,-.08,.05),ae.add(be);const ue=new r(new P(.028,.028,.08,16),i);ue.rotation.z=Math.PI/2,ue.position.set(0,-.1,.05),ae.add(ue),t.scale.set(1,1,1);const Y=new U;Y.name="PragyanMoonRover",e.add(Y);const Be=new F({color:16038706,roughness:.42,metalness:.45,emissive:4008196,emissiveIntensity:.35}),Ve=new F({color:2237998,roughness:.45,metalness:.75}),Le=new F({color:10133672,roughness:.35,metalness:.85}),ke=new ee({color:660520,roughness:.2,metalness:.4,clearcoat:.8}),nt=new r(new me(.46,.18,.65),Be);nt.position.y=.26,nt.castShadow=!0,Y.add(nt);const Ge=new r(new me(.44,.02,.63),Ve);Ge.position.set(0,.36,0),Y.add(Ge);const $e=new U;$e.position.set(0,.37,.05),$e.rotation.x=-Math.PI/4.8,Y.add($e);const D=new r(new me(.5,.015,.44),ke);D.castShadow=!0,$e.add(D);const v=new r(new me(.52,.012,.46),Be);$e.add(v);const V=document.createElement("canvas");V.width=256,V.height=128;const O=V.getContext("2d");O.fillStyle="#ff9933",O.fillRect(0,0,256,32),O.fillStyle="#ffffff",O.fillRect(0,32,256,32),O.fillStyle="#138808",O.fillRect(0,64,256,32),O.strokeStyle="#000080",O.lineWidth=2,O.beginPath(),O.arc(128,48,12,0,Math.PI*2),O.stroke();for(let L=0;L<24;L++){const j=L/24*Math.PI*2;O.beginPath(),O.moveTo(128,48),O.lineTo(128+Math.cos(j)*12,48+Math.sin(j)*12),O.stroke()}O.fillStyle="#0a101c",O.fillRect(0,96,256,32),O.font='bold 16px "Inter", sans-serif',O.fillStyle="#ffaa00",O.textAlign="center",O.textBaseline="middle",O.fillText("ISRO // PRAGYAN ROVER",128,112);const N=new ht(V),S=new r(new Lt(.18,.09),new De({map:N,side:We}));S.position.set(.231,.26,.08),S.rotation.y=Math.PI/2,Y.add(S);const oe=S.clone();oe.position.set(-.231,.26,.08),oe.rotation.y=-Math.PI/2,Y.add(oe);const z=new r(new Lt(.2,.095),new De({map:N,side:We}));z.position.set(0,.26,.326),Y.add(z);const te=new U;te.position.set(.12,.37,.26),Y.add(te);const Me=new r(new P(.015,.018,.26,16),Be);Me.position.y=.13,te.add(Me);const ve=new U;ve.position.set(0,.26,0),te.add(ve);const Q=new r(new me(.14,.05,.06),Ve);ve.add(Q),[-.045,.045].forEach(L=>{const j=new r(new P(.016,.018,.025,16),l);j.rotation.x=Math.PI/2,j.position.set(L,0,.035),ve.add(j)});const we=new De({color:1096065}),xe=new r(new He(.012,12,12),we);xe.position.set(0,.035,.03),ve.add(xe);const ce=new U;ce.position.set(0,.22,-.34),Y.add(ce);const Ye=new r(new P(.04,.05,.08,16),Be);Ye.rotation.x=Math.PI/3,ce.add(Ye);const H=[],Z=.095,ne=.065,Ce=[-.25,0,.25];[-.28,.28].forEach(L=>{const j=new r(new me(.025,.03,.54),Ve);j.position.set(L*.9,.16,0),Y.add(j),Ce.forEach(X=>{const se=new U;se.position.set(L,Z,X),Y.add(se);const pe=new r(new P(Z,Z,ne,24),Le);pe.rotation.z=Math.PI/2,pe.castShadow=!0,se.add(pe);for(let Pe=0;Pe<12;Pe++){const Ue=Pe/12*Math.PI*2,Xe=new r(new me(ne+.005,.012,.008),Ve);Xe.position.set(0,Math.sin(Ue)*Z,Math.cos(Ue)*Z),se.add(Xe)}H.push(se)})}),Y.scale.set(1,1,1),t.position.set(2.5,0,3.5),Y.position.set(-2.5,0,-3.5);const he=15.5,Ae=3.6,ze=[new C(12,0,0),new C(3.71,0,11.41),new C(-9.71,0,7.05),new C(-9.71,0,-7.05),new C(3.71,0,-11.41)],A={pos:t.position,yaw:.5,targetYaw:.5,speed:1.1,turnTimer:0,domeAngle:0,targetDomeAngle:0,headTurnTimer:0,isInteracting:!1},B={pos:Y.position,yaw:Math.PI+.4,targetYaw:Math.PI+.4,speed:.95,turnTimer:0,mastAngle:0,targetMastAngle:0,wheelAngle:0,isInteracting:!1};let Ee=0,Te=6;const Se=2.8,qe=(L,j)=>{const X=Math.min(j,.1),se=A.pos.distanceTo(B.pos);if(Te-=X,!A.isInteracting&&Te<=0&&se<3.2){A.isInteracting=!0,B.isInteracting=!0,Ee=Se;const pe=B.pos.clone().sub(A.pos).normalize(),Pe=A.pos.clone().sub(B.pos).normalize();A.targetYaw=Math.atan2(pe.x,pe.z),B.targetYaw=Math.atan2(Pe.x,Pe.z)}if(A.isInteracting)Ee-=X,A.speed=lt.lerp(A.speed,0,X*6),B.speed=lt.lerp(B.speed,0,X*6),A.yaw=lt.lerp(A.yaw,A.targetYaw,X*4),B.yaw=lt.lerp(B.yaw,B.targetYaw,X*4),m.rotation.y=Math.sin(L*9)*.65,x.opacity=Math.sin(L*12)>0?.65:.15,I.color.setHex(Math.sin(L*16)>0?16711748:4456465),k.color.setHex(Math.cos(L*16)>0?65535:8772),ve.rotation.y=Math.sin(L*6)*.45,we.color.setHex(Math.sin(L*14)>0?1096065:16096779),Ee<=0&&(A.isInteracting=!1,B.isInteracting=!1,Te=18+Math.random()*12,A.targetYaw+=(Math.random()>.5?1:-1)*(Math.PI*.6+Math.random()*.5),B.targetYaw+=(Math.random()>.5?1:-1)*(Math.PI*.6+Math.random()*.5),A.speed=1.1,B.speed=.95,x.opacity=0,ve.rotation.y=0);else{x.opacity=0,A.turnTimer-=X,A.turnTimer<=0&&(A.turnTimer=3.5+Math.random()*4,A.targetYaw+=(Math.random()-.5)*1.4),Math.hypot(A.pos.x,A.pos.z)>he&&(A.targetYaw=Math.atan2(-A.pos.x,-A.pos.z)),ze.forEach(Ne=>{if(A.pos.distanceTo(Ne)<Ae){const Je=A.pos.clone().sub(Ne).normalize();A.targetYaw=Math.atan2(Je.x,Je.z)}}),A.yaw=lt.lerp(A.yaw,A.targetYaw,X*2.5);const Pe=A.speed*X;A.pos.x+=Math.sin(A.yaw)*Pe,A.pos.z+=Math.cos(A.yaw)*Pe,t.rotation.y=A.yaw,t.rotation.z=Math.sin(L*8)*.02,A.headTurnTimer-=X,A.headTurnTimer<=0&&(A.headTurnTimer=2+Math.random()*3,A.targetDomeAngle=(Math.random()-.5)*1.2),A.domeAngle=lt.lerp(A.domeAngle,A.targetDomeAngle,X*3),m.rotation.y=A.domeAngle,I.color.setHex(Math.sin(L*5)>0?16720418:5570560),k.color.setHex(Math.cos(L*4)>0?58879:13158),B.turnTimer-=X,B.turnTimer<=0&&(B.turnTimer=4+Math.random()*5,B.targetYaw+=(Math.random()-.5)*1.2),Math.hypot(B.pos.x,B.pos.z)>he&&(B.targetYaw=Math.atan2(-B.pos.x,-B.pos.z)),ze.forEach(Ne=>{if(B.pos.distanceTo(Ne)<Ae){const Je=B.pos.clone().sub(Ne).normalize();B.targetYaw=Math.atan2(Je.x,Je.z)}}),B.yaw=lt.lerp(B.yaw,B.targetYaw,X*2.2);const Xe=B.speed*X;B.pos.x+=Math.sin(B.yaw)*Xe,B.pos.z+=Math.cos(B.yaw)*Xe,Y.rotation.y=B.yaw,B.wheelAngle+=Xe/Z,H.forEach(Ne=>{Ne.children[0].rotation.x=B.wheelAngle}),ve.rotation.y=Math.sin(L*1.5)*.15,we.color.setHex(Math.sin(L*3)>0?1096065:344096)}};function at(L=2.8){A.isInteracting=!0,B.isInteracting=!0,Ee=L;const j=B.pos.clone().sub(A.pos).normalize(),X=A.pos.clone().sub(B.pos).normalize();A.targetYaw=Math.atan2(j.x,j.z),B.targetYaw=Math.atan2(X.x,X.z),A.yaw=A.targetYaw,B.yaw=B.targetYaw,t.rotation.y=A.yaw,Y.rotation.y=B.yaw}return{group:e,r2d2:t,pragyan:Y,r2State:A,pragyanState:B,update:qe,triggerInteraction:at}}const ro={pslv:{id:"pslv",name:"PSLV",fullName:"POLAR SATELLITE LAUNCH VEHICLE",operator:"ISRO (INDIA)",category:"ISRO OPERATIONAL",status:"OPERATIONAL",statusColor:"#10b981",accentColor:"#00e5ff",height:"44.0 m (144.3 ft)",diameter:"2.8 m (9.2 ft)",liftOffMass:"320 tonnes (XL variant)",stages:"4 Stages (Solid / Liquid / Solid / Liquid)",payloadLeo:"1,750 kg to Sun-Synchronous Polar Orbit (600 km)",payloadGto:"1,425 kg to Sub-GTO",propulsion:"PS1 Solid (HTPB) + 6 PSOM-XL strap-ons, PS2 Vikas Liquid (UDMH+N₂O₄), PS3 Solid, PS4 Dual Liquid (MMH+MON-3)",firstFlight:"September 20, 1993 (59+ launches)",famousMissions:"Chandrayaan-1 (2008), Mars Orbiter Mission / Mangalyaan (2013), Aditya-L1 (2023), World Record 104 Satellites in Single Flight (PSLV-C37, 2017).",description:`Widely revered as the "Workhorse of ISRO", PSLV is India's third-generation launch vehicle. Equipped with alternating solid and liquid propulsion stages, PSLV has established an internationally renowned track record for precision orbital injection, launching satellites from over 36 countries across polar, geosynchronous, and deep-space trajectories.`},lvm3:{id:"lvm3",name:"LVM3",fullName:"LAUNCH VEHICLE MARK-3 (GSLV MK III)",operator:"ISRO (INDIA)",category:"ISRO OPERATIONAL",status:"OPERATIONAL",statusColor:"#10b981",accentColor:"#f59e0b",height:"43.5 m (142.7 ft)",diameter:"4.0 m core / 5.0 m fairing",liftOffMass:"640 tonnes",stages:"3 Stages (Solid Boosters + Liquid Core + Cryogenic Upper Stage)",payloadLeo:"8,000 kg to Low Earth Orbit",payloadGto:"4,300 kg to Geosynchronous Transfer Orbit",propulsion:"2× S200 Solid Strap-ons (207 t solid each), L110 Core with 2× Vikas liquid engines, C25 Cryogenic Upper Stage (CE-20 engine, 200 kN thrust, LH₂+LOX)",firstFlight:"December 18, 2014 (Experimental) / June 5, 2017 (Orbital)",famousMissions:"Chandrayaan-2 (2019), Chandrayaan-3 (Historic Lunar South Pole Landing, 2023), OneWeb 72-satellite commercial constellations, Gaganyaan TV-D1 test.",description:"LVM3 is India’s heaviest operational orbital launch vehicle. Powered by the world’s second-largest solid rocket boosters (S200) and the indigenous CE-20 cryogenic engine, LVM3 achieved the historic Chandrayaan-3 lunar landing mission and is fully human-rated for India's upcoming Gaganyaan crewed spaceflights."},gslv:{id:"gslv",name:"GSLV MK II",fullName:"GEOSYNCHRONOUS SATELLITE LAUNCH VEHICLE",operator:"ISRO (INDIA)",category:"ISRO OPERATIONAL",status:"OPERATIONAL",statusColor:"#10b981",accentColor:"#38bdf8",height:"51.7 m (169.6 ft)",diameter:"2.8 m core / 3.4 m fairing",liftOffMass:"414 tonnes",stages:"3 Stages (Solid Core + 4 Liquid Strap-ons + Liquid GS2 + Cryogenic CUS)",payloadLeo:"5,000 kg to Low Earth Orbit",payloadGto:"2,500 kg to Geosynchronous Transfer Orbit",propulsion:"S139 Solid Core + 4× L40 Vikas Liquid Strap-ons, GS2 Vikas Liquid Stage, CUS indigenous Cryogenic Upper Stage (CE-7.5 engine, LH₂+LOX)",firstFlight:"April 18, 2001 (Indigenous Cryogenic Mark-II operational since 2014)",famousMissions:"GSAT communication fleet (GSAT-6, 7A, 9 South Asia Satellite), INSAT weather satellites, NVS-01 Navigation Satellite (NavIC constellation).",description:"GSLV Mk II solved one of India’s most critical aerospace challenges by demonstrating full mastery over the indigenous cryogenic upper stage (CE-7.5). Operating with liquid hydrogen and liquid oxygen at 20 Kelvin (-253°C), GSLV regularly deploys India’s national telecommunications and NavIC satellites."},sounding:{id:"sounding",name:"SOUNDING ROCKET",fullName:"ROHINI RH-200 METEOROLOGICAL ROCKET",operator:"ISRO (INDIA)",category:"ISRO OPERATIONAL",status:"OPERATIONAL",statusColor:"#10b981",accentColor:"#ef4444",height:"3.5 m (11.5 ft)",diameter:"0.2 m (7.9 in)",liftOffMass:"108 kg",stages:"2 Stages (Solid / Solid)",payloadLeo:"Suborbital Apogee: 70 – 80 km",payloadGto:"N/A (Suborbital Sounding)",propulsion:"Two-stage solid propellant rocket motor with high-energy composite fuel",firstFlight:"Rohini series active since 1967; RH-200 launched over 1,700 times",famousMissions:"Equatorial Electrojet aeronomy surveys, Indian Monsoon upper-atmospheric dynamics, atmospheric chemical payload releases from TERLS (Thumba).",description:"The Rohini Sounding Rocket program was the bedrock of India’s space journey, initiated under Dr. Vikram Sarabhai at Thumba in 1963. The reliable two-stage RH-200 is launched regularly from TERLS to probe equatorial mesosphere phenomena and upper-altitude weather systems."},slv3:{id:"slv3",name:"SLV-3",fullName:"SATELLITE LAUNCH VEHICLE-3",operator:"ISRO (INDIA)",category:"ISRO RETIRED",status:"RETIRED (HISTORIC)",statusColor:"#f59e0b",accentColor:"#d97706",height:"22.7 m (74.5 ft)",diameter:"1.0 m (3.3 ft)",liftOffMass:"17 tonnes",stages:"4 Stages (All-Solid Propellant)",payloadLeo:"40 kg to Low Earth Orbit (300 km)",payloadGto:"N/A",propulsion:"4 Solid propellant rocket motors (composite propellant with open-nozzle control)",firstFlight:"July 18, 1980 (Historical orbital success placing Rohini RS-1 into space)",famousMissions:"Rohini RS-1 (1980), RS-D1 (1981), RS-D2 (1983). Project Director: Dr. A.P.J. Abdul Kalam.",description:"India’s first sovereign satellite launch vehicle. Directed by Dr. A.P.J. Abdul Kalam, the historic launch of SLV-3 on July 18, 1980 catapulted India into the elite club of just six nations possessing independent orbital launch capability. SLV-3 laid the fundamental architecture for all subsequent Indian space vehicles."},aslv:{id:"aslv",name:"ASLV",fullName:"AUGMENTED SATELLITE LAUNCH VEHICLE",operator:"ISRO (INDIA)",category:"ISRO RETIRED",status:"RETIRED",statusColor:"#f59e0b",accentColor:"#b45309",height:"24.0 m (78.7 ft)",diameter:"1.0 m core / 2.8 m booster span",liftOffMass:"41 tonnes",stages:"5 Stages (All-Solid, including 2 Strap-on Solid Boosters)",payloadLeo:"150 kg to 400 km circular Low Earth Orbit",payloadGto:"N/A",propulsion:"5 Solid stages (2 Stage-0 strap-ons identical to core stage 1, bulbous payload fairing)",firstFlight:"March 24, 1987 / Successful orbital injections in 1992 & 1994",famousMissions:"SROSS-C (1992) and SROSS-C2 (1994) missions carrying celestial gamma-ray burst detectors and aeronomy payloads.",description:"Developed as an intermediate technology demonstrator, ASLV pioneered essential launch technologies including strap-on solid booster staging, bulbous payload fairings, canted nozzles, and closed-loop digital autopilot inertial guidance that paved the way directly for the PSLV."},hrlv:{id:"hrlv",name:"HRLV / NGLV",fullName:"HEAVY / HUMAN-RATED REUSABLE LAUNCH VEHICLE",operator:"ISRO (INDIA)",category:"ISRO UNDER DEVELOPMENT",status:"UNDER DEVELOPMENT",statusColor:"#00e5ff",accentColor:"#00e5ff",height:"75.0 m (246 ft)",diameter:"5.4 m (17.7 ft)",liftOffMass:"700 tonnes",stages:"3 Stages (Reusable Methane-LOX Booster + Semi-cryo + Cryogenic)",payloadLeo:"20,000 – 30,000 kg to Low Earth Orbit",payloadGto:"10,000 kg to Geosynchronous Transfer Orbit",propulsion:"Reusable first-stage booster with cluster of methalox (liquid methane + liquid oxygen) engines with grid fins & VTVL landing legs",firstFlight:"Projected 2030 (Development approved by Government of India)",famousMissions:"Bharatiya Antariksh Station (BAS modules), Indian Crewed Lunar Landing (2040), interplanetary deep-space cargo.",description:"HRLV / NGLV (Next Generation Launch Vehicle) is ISRO’s future heavy-lift reusable launch system. Featuring high-efficiency green methalox propulsion, vertical takeoff and vertical propulsive landing (VTVL), and a modular design, it will power India’s permanent space station and human missions to the Moon."},sslv:{id:"sslv",name:"SSLV",fullName:"SMALL SATELLITE LAUNCH VEHICLE",operator:"ISRO / NSIL (INDIA)",category:"ISRO UNDER DEVELOPMENT",status:"UNDER DEVELOPMENT / ROLLOUT",statusColor:"#00e5ff",accentColor:"#38bdf8",height:"34.0 m (111.5 ft)",diameter:"2.0 m (6.6 ft)",liftOffMass:"120 tonnes",stages:"3 Solid Stages + Liquid Velocity Trimming Module (VTM)",payloadLeo:"500 kg to 500 km planar orbit / 300 kg to SSPO",payloadGto:"N/A (Specialized SmallSat launcher)",propulsion:"SS1, SS2, SS3 Solid Propellant stages + Liquid Velocity Trimming Module with multiple reaction thrusters",firstFlight:"August 7, 2022 (D1) / February 10, 2023 (D2 Success) / SSLV-D3 (2024)",famousMissions:"EOS-07 earth observation satellite, Janus-1 (USA), AzaadiSAT-2 student payload. Ready for full commercial transfer to Indian aerospace industry.",description:"SSLV is designed for ultra-rapid turnarounds, capable of being integrated and launched in under 72 hours by a compact operations crew. Aimed at commercial rideshare constellations, SSLV provides dedicated, low-cost access to space for micro, nano, and mini satellites."},apollo11:{id:"apollo11",name:"APOLLO 11 (SATURN V)",fullName:"SATURN V SUPER HEAVY-LIFT LAUNCH VEHICLE",operator:"NASA (USA)",category:"INTERNATIONAL HISTORIC",status:"HISTORIC (RETIRED)",statusColor:"#f59e0b",accentColor:"#eab308",height:"110.6 m (363 ft)",diameter:"10.1 m (33 ft)",liftOffMass:"2,970 tonnes (6.5 million lb)",stages:"3 Stages (S-IC + S-II + S-IVB) + Apollo CSM & Lunar Module + LES Tower",payloadLeo:"140,000 kg (310,000 lb) to Low Earth Orbit",payloadGto:"48,600 kg (107,100 lb) Trans-Lunar Injection (TLI)",propulsion:"S-IC: 5× Rocketdyne F-1 engines (34.5 MN thrust, RP-1/LOX); S-II: 5× J-2 engines (LH₂/LOX); S-IVB: 1× J-2 engine (restartable)",firstFlight:"November 9, 1967 (Apollo 4) / July 16, 1969 (Apollo 11 Moon Landing)",famousMissions:"Apollo 11 (Neil Armstrong & Buzz Aldrin first humans on the Moon, July 20, 1969), Apollo 8 (First lunar orbit), Apollo 13, Skylab orbital space station.",description:"The most powerful launch vehicle ever brought to operational success in human history. Standing 110.6 meters tall and generating 34.5 Meganewtons of liftoff thrust, Saturn V remains the only spacecraft that has propelled human beings beyond Low Earth Orbit to land on another celestial world."},falcon9:{id:"falcon9",name:"FALCON 9",fullName:"FALCON 9 FULL THRUST (BLOCK 5)",operator:"SPACEX (USA)",category:"COMMERCIAL REUSABLE",status:"OPERATIONAL",statusColor:"#10b981",accentColor:"#ffffff",height:"70.0 m (229.6 ft)",diameter:"3.7 m (12.1 ft)",liftOffMass:"549 tonnes",stages:"2 Stages (Reusable Booster + Expendable/Vacuum Second Stage)",payloadLeo:"22,800 kg (Expendable) / 17,500 kg (Drone ship landing recovery)",payloadGto:"8,300 kg (Expendable) / 5,500 kg (Reusable)",propulsion:"Stage 1: 9× SpaceX Merlin 1D engines (RP-1/LOX, 7.6 MN thrust) with 4 titanium grid fins & 4 carbon landing legs; Stage 2: 1× Merlin Vacuum engine",firstFlight:"June 4, 2010 (Over 350+ flights with 300+ booster landings)",famousMissions:"NASA Commercial Crew astronaut launches to ISS, Starlink global broadband constellation, DART asteroid deflection probe, Europa Clipper launch support.",description:"The world's first orbital-class reusable rocket. Falcon 9 revolutionized global space economics through routine vertical propulsive booster recovery on ocean drone ships and landing pads, with individual boosters achieving over 20 successful flights each."},dragon:{id:"dragon",name:"CREW DRAGON",fullName:"SPACEX DRAGON 2 SPACECRAFT & TRUNK",operator:"SPACEX / NASA (USA)",category:"COMMERCIAL SPACECRAFT",status:"OPERATIONAL",statusColor:"#10b981",accentColor:"#38bdf8",height:"8.1 m (26.7 ft) capsule + trunk",diameter:"4.0 m (13.0 ft)",liftOffMass:"12,500 kg",stages:"Reusable Capsule Pressure Vessel + Unpressurized Trunk with Solar Array",payloadLeo:"Crew: Up to 4 – 7 astronauts / 6,000 kg pressurized & trunk cargo",payloadGto:"Orbital Autonomous Rendezvous & Soft Ocean Splashdown Recovery",propulsion:"16× Draco reaction control thrusters + 8× SuperDraco launch abort engines (hypergolic MMH/NTO with 71 kN thrust each)",firstFlight:"March 2, 2019 (Demo-1) / May 30, 2020 (Demo-2 first crewed flight)",famousMissions:"NASA Crew-1 through Crew-9 long-duration ISS expeditions, Inspiration4 (first all-civilian orbital mission), Polaris Dawn commercial spacewalk mission.",description:"The world’s first commercially developed orbital crew transport vehicle. Featuring touchscreen controls, fully autonomous rendezvous and docking to the International Space Station, PICA-X heat shield thermal protection, and quad-parachute water recovery."},vikram1:{id:"vikram1",name:"VIKRAM-1",fullName:"SKYROOT AEROSPACE VIKRAM-1",operator:"SKYROOT AEROSPACE (INDIA)",category:"INDIAN PRIVATE SPACE",status:"OPERATIONAL TESTING / IMMINENT",statusColor:"#10b981",accentColor:"#f97316",height:"20.0 m (65.6 ft)",diameter:"1.7 m (5.6 ft)",liftOffMass:"30 tonnes",stages:"3 Solid Stages (Kalam Series) + 1 Liquid Upper Stage (Raman Engine)",payloadLeo:"480 kg to 500 km Low Inclination Orbit / 290 kg to SSPO",payloadGto:"N/A (Dedicated SmallSat commercial launch)",propulsion:"Kalam-1200, Kalam-250, Kalam-100 high-strength carbon composite solid motors + Raman 4× 3D-printed bi-propellant liquid upper stage",firstFlight:"Suborbital precursor Vikram-S launched Nov 18, 2022 (Mission Prarambh)",famousMissions:"Mission Prarambh (First privately developed rocket launched from India), upcoming orbital maiden test launch.",description:"Spearheading India’s private NewSpace revolution, Vikram-1 is an all-carbon-fiber multi-stage launch vehicle built by Skyroot Aerospace in Hyderabad. Equipped with state-of-the-art 3D-printed liquid engines (Raman) and solid rocket motors named after Dr. A.P.J. Abdul Kalam."},vikram2:{id:"vikram2",name:"VIKRAM-2",fullName:"SKYROOT AEROSPACE VIKRAM-2 (CRYOGENIC)",operator:"SKYROOT AEROSPACE (INDIA)",category:"INDIAN PRIVATE SPACE",status:"UNDER DEVELOPMENT",statusColor:"#00e5ff",accentColor:"#06b6d4",height:"24.0 m (78.7 ft)",diameter:"1.7 m (5.6 ft)",liftOffMass:"38 tonnes",stages:"Multi-stage with 3D-Printed Cryogenic Upper Stage (Dhawan Engine)",payloadLeo:"592 kg to 500 km Low Earth Orbit / 400 kg to SSPO",payloadGto:"Multi-orbit satellite constellation injection",propulsion:"Carbon composite solid booster stages + Dhawan-II indigenous 3D-printed Cryogenic Upper Stage (Liquid Methane LNG + Liquid Oxygen)",firstFlight:"Target 2025–2026 (Dhawan-I and Dhawan-II cryogenic tests completed successfully)",famousMissions:"Dedicated commercial small-satellite constellation deployments across multiple independent orbital inclinations.",description:"Vikram-2 represents the cutting edge of Indian private aerospace engineering, featuring the indigenous Dhawan-II cryogenic engine fueled by green liquefied natural gas (LNG) and liquid oxygen. The 3D-printed cryogenic upper stage enables multi-restart capabilities for complex multi-orbit satellite insertions."}};function hi(a,e){const t=new U;t.name="RocketTelemetryAnchorGroup",a.add(t);let o=null;const n=document.createElement("canvas");n.width=768,n.height=420;const s=n.getContext("2d"),i=new ht(n);i.minFilter=Ft,i.magFilter=Ft;const l=new Lt(1.5,.82),h=new De({map:i,transparent:!0,side:We,depthWrite:!1}),u=new r(l,h);u.visible=!1,t.add(u);const p=new Yt().setFromPoints([new C(0,0,0),new C(.4,.4,0)]),d=new Go({color:58879,transparent:!0,opacity:.8}),f=new en(p,d);f.visible=!1,t.add(f);const m=new r(new zt(.08,.1,32),new De({color:58879,side:We,transparent:!0,opacity:.85}));m.visible=!1,t.add(m);let y=document.getElementById("rocket-telemetry-hud");y||(y=document.createElement("div"),y.id="rocket-telemetry-hud",y.innerHTML=`
      <style>
        #rocket-telemetry-hud {
          position: fixed;
          bottom: 24px;
          right: -480px;
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
          transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
          opacity: 0;
          z-index: 9999;
          pointer-events: auto;
        }
        #rocket-telemetry-hud.active {
          right: 24px;
          opacity: 1;
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
        @media (max-width: 600px) {
          #rocket-telemetry-hud {
            width: calc(100vw - 24px);
            bottom: 12px;
            right: -100vw;
            padding: 16px 18px;
          }
          #rocket-telemetry-hud.active {
            right: 12px;
          }
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
    `,document.body.appendChild(y),document.getElementById("rkt-close-btn").addEventListener("click",()=>{c()}));function g(x){s.clearRect(0,0,768,420),s.fillStyle="rgba(8, 12, 22, 0.92)",s.fillRect(0,0,768,420),s.strokeStyle=x.accentColor,s.lineWidth=3,s.strokeRect(4,4,760,412);const R=16;s.lineWidth=4,s.beginPath(),s.moveTo(4,4+R),s.lineTo(4,4),s.lineTo(4+R,4),s.stroke(),s.beginPath(),s.moveTo(764-R,4),s.lineTo(764,4),s.lineTo(764,4+R),s.stroke(),s.fillStyle="rgba(0, 0, 0, 0.5)",s.fillRect(4,4,760,60),s.fillStyle=x.accentColor,s.fillRect(4,62,760,2),s.font='900 32px "Inter", sans-serif',s.fillStyle="#ffffff",s.textAlign="left",s.textBaseline="middle",s.fillText(x.name,24,34),s.textAlign="right",s.fillStyle=x.statusColor,s.font='bold 15px "Inter", monospace',s.fillText(`● [${x.status}]`,744,34),s.textAlign="left",s.font='bold 16px "Inter", monospace',s.fillStyle=x.accentColor,s.fillText(x.fullName,24,94),s.font='14px "Inter", monospace',s.fillStyle="#94a3b8",s.fillText(`OPERATOR: ${x.operator}`,24,124),s.font='bold 15px "Inter", sans-serif',s.fillStyle="#e2e8f0",s.fillText(`HEIGHT: ${x.height}`,24,160),s.fillText(`DIAMETER: ${x.diameter}`,24,190),s.fillText(`MASS: ${x.liftOffMass}`,24,220),s.fillText(`STAGES: ${x.stages}`,24,250),s.fillStyle=x.accentColor,s.fillText(`LEO / POLAR: ${x.payloadLeo}`,24,290),s.fillStyle="#f8fafc",s.fillText(`GTO / TLI: ${x.payloadGto}`,24,320),s.font='italic 13px "Inter", sans-serif',s.fillStyle="#64748b",s.fillText("CLICK MODEL TO VIEW COMPLETE SPECIFICATIONS DRAWER ➜",24,380),i.needsUpdate=!0}function w(x,R){const I=ro[R];if(!I)return;o=I,g(I);const k=new C;x.getWorldPosition(k);const _=new C(-k.x,0,-k.z).normalize(),E=new C(-_.z,0,_.x),T=k.clone().add(_.clone().multiplyScalar(1.25)).add(E.clone().multiplyScalar(.7)).add(new C(0,2.3,0));u.position.copy(T),u.visible=!0,m.position.copy(k).add(new C(0,2.1,0)),m.visible=!0;const q=[m.position.clone(),u.position.clone()];f.geometry.setFromPoints(q),f.visible=!0,document.getElementById("rkt-title").textContent=I.name,document.getElementById("rkt-sub").textContent=`${I.fullName} // ${I.operator}`,document.getElementById("rkt-height").textContent=I.height,document.getElementById("rkt-diameter").textContent=I.diameter,document.getElementById("rkt-mass").textContent=I.liftOffMass,document.getElementById("rkt-stages").textContent=I.stages,document.getElementById("rkt-payload-leo").textContent=I.payloadLeo,document.getElementById("rkt-payload-gto").textContent=I.payloadGto,document.getElementById("rkt-propulsion").textContent=I.propulsion,document.getElementById("rkt-missions").textContent=I.famousMissions,document.getElementById("rkt-description").textContent=I.description;const W=document.getElementById("rkt-badge-container");W.innerHTML=`
      <span class="rkt-badge" style="background: ${I.statusColor}22; color: ${I.statusColor}; border: 1px solid ${I.statusColor}66;">
        ● ${I.status}
      </span>
      <span class="rkt-badge" style="background: rgba(255,255,255,0.08); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.15); margin-left: 6px;">
        ${I.category}
      </span>
    `,y.style.borderLeftColor=I.accentColor,y.classList.add("active")}function c(){o=null,u.visible=!1,f.visible=!1,m.visible=!1,y.classList.remove("active")}function b(x,R){if(!o||!u.visible||!e)return;u.lookAt(e.position),m.lookAt(e.position),u.position.y+=Math.sin(x*2.5)*.001;const I=1+Math.sin(x*4)*.08;m.scale.set(I,I,I)}return{selectRocket:w,deselect:c,update:b,getActiveRocket:()=>o}}function ui(a,e,t){const o=new U;o.name="RocketExhibitsMasterGroup",a.add(o);const n=[],s=new F({color:16119802,roughness:.85,metalness:.04}),i=new ee({color:14475496,roughness:.25,metalness:.9,clearcoat:.5}),l=new F({color:15462646,roughness:.6,metalness:.25}),h=new F({color:13159636,roughness:.35,metalness:.85}),u=new F({color:3359061,roughness:.3,metalness:.9}),p=new F({color:2566707,roughness:.28,metalness:.88}),d=new F({color:15051058,roughness:.3,metalness:.85});new F({color:1711656,roughness:.45,metalness:.7});function f({name:D,subtitle:v,isCryoFoam:V=!1,hasTricolor:O=!0}){const N=document.createElement("canvas");N.width=1024,N.height=1024;const S=N.getContext("2d");if(V){const z=S.createLinearGradient(0,0,1024,0);z.addColorStop(0,"#be4b18"),z.addColorStop(.3,"#d35920"),z.addColorStop(.7,"#c24e1a"),z.addColorStop(1,"#a83e12"),S.fillStyle=z,S.fillRect(0,0,1024,1024),S.fillStyle="rgba(0, 0, 0, 0.08)";for(let te=30;te<1024;te+=45)S.fillRect(0,te,1024,3);S.fillStyle="rgba(255, 255, 255, 0.05)";for(let te=33;te<1024;te+=45)S.fillRect(0,te,1024,2)}else{const z=S.createLinearGradient(0,0,1024,0);z.addColorStop(0,"#f1f4f8"),z.addColorStop(.5,"#ffffff"),z.addColorStop(1,"#e5e9f0"),S.fillStyle=z,S.fillRect(0,0,1024,1024),S.strokeStyle="rgba(0, 0, 0, 0.12)",S.lineWidth=2;for(let te=60;te<1024;te+=120){S.beginPath(),S.moveTo(0,te),S.lineTo(1024,te),S.stroke(),S.fillStyle="rgba(0, 0, 0, 0.18)";for(let Me=20;Me<1024;Me+=32)S.beginPath(),S.arc(Me,te-4,1.5,0,Math.PI*2),S.fill()}}S.strokeStyle=V?"rgba(0, 0, 0, 0.25)":"rgba(0, 0, 0, 0.10)",S.lineWidth=3,S.beginPath(),S.moveTo(256,0),S.lineTo(256,1024),S.moveTo(768,0),S.lineTo(768,1024),S.stroke(),O&&[256,768].forEach(z=>{const Me=z-100,ve=160;S.fillStyle="#ff9933",S.fillRect(Me,ve,200,33),S.fillStyle="#ffffff",S.fillRect(Me,ve+33,200,34),S.fillStyle="#138808",S.fillRect(Me,ve+67,200,33),S.strokeStyle="#000080",S.lineWidth=2.5,S.beginPath(),S.arc(z,ve+50,14,0,Math.PI*2),S.stroke();for(let Q=0;Q<24;Q++){const we=Q/24*Math.PI*2;S.beginPath(),S.moveTo(z,ve+50),S.lineTo(z+Math.cos(we)*13,ve+50+Math.sin(we)*13),S.stroke()}}),[256,768].forEach(z=>{S.fillStyle="#0284c7",S.beginPath(),S.moveTo(z,290),S.lineTo(z+28,335),S.lineTo(z+12,330),S.lineTo(z,310),S.lineTo(z-12,330),S.lineTo(z-28,335),S.closePath(),S.fill(),S.fillStyle="#ea580c",S.beginPath(),S.arc(z+16,306,10,0,Math.PI*2),S.fill(),S.font='900 46px "Inter", sans-serif',S.fillStyle=V?"#ffffff":"#0f172a",S.textAlign="center",S.fillText("ISRO",z,388),S.font='bold 30px "Inter", sans-serif',S.fillStyle=V?"#ffedd5":"#ea580c",S.fillText("इसरो  |  भारत",z,426),S.font='900 64px "Inter", sans-serif',S.fillStyle=V?"#ffffff":"#0f172a",S.fillText(D,z,540),v&&(S.font='bold 26px "Inter", monospace',S.fillStyle=V?"#ffedd5":"#0284c7",S.fillText(v,z,585))});const oe=new ht(N);return oe.wrapS=oo,oe.wrapT=no,oe}function m(){const D=document.createElement("canvas");D.width=1024,D.height=1024;const v=D.getContext("2d");v.fillStyle="#f8fafc",v.fillRect(0,0,1024,1024),v.fillStyle="#111318",v.fillRect(180,260,240,764),v.fillRect(680,260,240,764),v.strokeStyle="rgba(0, 0, 0, 0.15)",v.lineWidth=2;for(let O=0;O<1024;O+=16)v.beginPath(),v.moveTo(O,0),v.lineTo(O,260),v.stroke();v.fillStyle="#0a0d14",v.fillRect(0,252,1024,8),v.fillRect(0,520,1024,6),[60,560].forEach(O=>{v.save(),v.translate(O,600),v.rotate(-Math.PI/2),v.font='900 52px "Inter", sans-serif',v.fillStyle="#b22234",v.textAlign="center",v.fillText("UNITED STATES",0,0),v.restore();const N=O-50,S=660;v.fillStyle="#ffffff",v.fillRect(N,S,100,55);for(let oe=0;oe<7;oe++)v.fillStyle="#b22234",v.fillRect(N,S+oe*8,100,4);v.fillStyle="#3c3b6e",v.fillRect(N,S,44,28)}),[60,560].forEach(O=>{v.font='900 68px "Inter", sans-serif',v.fillStyle="#111318",v.textAlign="center",v.fillText("USA",O,160)});const V=new ht(D);return V.wrapS=oo,V.wrapT=no,V}function y(){const D=document.createElement("canvas");D.width=1024,D.height=1024;const v=D.getContext("2d");v.fillStyle="#f8fafc",v.fillRect(0,0,1024,1024),v.fillStyle="#12141a",v.fillRect(0,0,1024,180),v.strokeStyle="#232733",v.lineWidth=2;for(let O=0;O<1024;O+=32)v.beginPath(),v.moveTo(O,0),v.lineTo(O,180),v.stroke();v.strokeStyle="rgba(0, 0, 0, 0.08)",v.lineWidth=2;for(let O=200;O<1024;O+=140)v.beginPath(),v.moveTo(0,O),v.lineTo(1024,O),v.stroke();[256,768].forEach(O=>{v.save(),v.translate(O,620),v.rotate(-Math.PI/2),v.font='900 76px "Inter", sans-serif',v.fillStyle="#0f172a",v.textAlign="center",v.letterSpacing="12px",v.fillText("SPACEX",0,0),v.restore(),v.font='bold 34px "Inter", sans-serif',v.fillStyle="#334155",v.textAlign="center",v.fillText("FALCON 9",O,280);const N=O-36,S=310;v.fillStyle="#ffffff",v.fillRect(N,S,72,40);for(let oe=0;oe<7;oe++)v.fillStyle="#b22234",v.fillRect(N,S+oe*6,72,3);v.fillStyle="#3c3b6e",v.fillRect(N,S,32,21)});const V=new ht(D);return V.wrapS=oo,V.wrapT=no,V}function g({title:D,subtitle:v,accentCol:V="#00e5ff"}){const O=document.createElement("canvas");O.width=1024,O.height=1024;const N=O.getContext("2d");N.fillStyle="#14171e",N.fillRect(0,0,1024,1024);const S=16;for(let z=0;z<1024;z+=S)for(let te=0;te<1024;te+=S){const Me=(te/S+z/S)%2===0;N.fillStyle=Me?"#1e232d":"#101319",N.fillRect(te,z,S,S),N.fillStyle=Me?"rgba(255, 255, 255, 0.04)":"rgba(0, 0, 0, 0.2)",N.fillRect(te,z,S/2,S/2)}N.fillStyle=V,N.fillRect(0,480,1024,8),[256,768].forEach(z=>{N.fillStyle=V,N.beginPath(),N.moveTo(z,232),N.lineTo(z+38,278),N.lineTo(z+14,272),N.lineTo(z,254),N.lineTo(z-14,272),N.lineTo(z-38,278),N.closePath(),N.fill(),N.font='900 48px "Inter", sans-serif',N.fillStyle="#ffffff",N.textAlign="center",N.fillText(D,z,340),N.font='bold 24px "Inter", monospace',N.fillStyle=V,N.fillText(v,z,380);const Me=z-40,ve=420;N.fillStyle="#ff9933",N.fillRect(Me,ve,80,14),N.fillStyle="#ffffff",N.fillRect(Me,ve+14,80,14),N.fillStyle="#138808",N.fillRect(Me,ve+28,80,14)});const oe=new ht(O);return oe.wrapS=oo,oe.wrapT=no,oe}function w(){const D=document.createElement("canvas");D.width=1024,D.height=1024;const v=D.getContext("2d");v.fillStyle="#f8fafc",v.fillRect(0,0,1024,1024),v.strokeStyle="rgba(0, 0, 0, 0.08)",v.lineWidth=1.5;for(let O=0;O<1024;O+=40)v.beginPath(),v.moveTo(0,O),v.lineTo(1024,O),v.stroke();[256,768].forEach(O=>{v.strokeStyle="#334155",v.lineWidth=4,v.strokeRect(O-65,360,130,200),v.fillStyle="#0f172a",v.beginPath(),v.arc(O,440,28,0,Math.PI*2),v.fill(),v.strokeStyle="#64748b",v.lineWidth=3,v.stroke(),v.font='900 36px "Inter", sans-serif',v.fillStyle="#0f172a",v.textAlign="center",v.fillText("DRAGON",O,630),v.font='bold 20px "Inter", monospace',v.fillStyle="#0284c7",v.fillText("COMMERCIAL CREW",O,665)});const V=new ht(D);return V.wrapS=oo,V.wrapT=no,V}function c(){const D=document.createElement("canvas");D.width=1024,D.height=1024;const v=D.getContext("2d");v.fillStyle="#f8fafc",v.fillRect(0,0,1024,1024),v.fillStyle="#111318",v.fillRect(0,180,1024,220),v.fillRect(0,580,1024,200),[256,768].forEach(O=>{v.font='900 64px "Inter", sans-serif',v.fillStyle="#ffffff",v.textAlign="center",v.fillText("SLV-3",O,305),v.font='900 52px "Inter", sans-serif',v.fillStyle="#111318",v.fillText("ISRO",O,500);const N=O-50,S=830;v.fillStyle="#ff9933",v.fillRect(N,S,100,20),v.fillStyle="#ffffff",v.fillRect(N,S+20,100,20),v.fillStyle="#138808",v.fillRect(N,S+40,100,20)});const V=new ht(D);return V.wrapS=oo,V.wrapT=no,V}const b=new F({map:f({name:"PSLV",subtitle:"POLAR SATELLITE LAUNCH VEHICLE"}),roughness:.35,metalness:.1}),x=new F({map:f({name:"LVM3",subtitle:"CHANDRAYAAN-3",isCryoFoam:!0}),roughness:.55,metalness:.05}),R=new F({map:f({name:"S200",subtitle:"SOLID BOOSTER",hasTricolor:!0}),roughness:.4,metalness:.1}),I=new F({map:f({name:"GSLV",subtitle:"GEOSYNCHRONOUS LAUNCH VEHICLE"}),roughness:.35,metalness:.1}),k=new F({map:m(),roughness:.35,metalness:.12}),_=new F({map:y(),roughness:.32,metalness:.1}),E=new F({map:w(),roughness:.3,metalness:.08}),T=new F({map:g({title:"VIKRAM-I",subtitle:"SKYROOT AEROSPACE",accentCol:"#f97316"}),roughness:.45,metalness:.35}),q=new F({map:g({title:"VIKRAM-II",subtitle:"CRYOGENIC DHAWAN-II",accentCol:"#00e5ff"}),roughness:.45,metalness:.35}),W=new F({map:c(),roughness:.4,metalness:.1}),ae=new F({map:f({name:"ASLV",subtitle:"AUGMENTED SATELLITE LAUNCH VEHICLE"}),roughness:.4,metalness:.1}),ge=new F({map:f({name:"HRLV",subtitle:"NEXT GEN REUSABLE LAUNCH VEHICLE"}),roughness:.32,metalness:.15}),be=new F({map:f({name:"SSLV",subtitle:"SMALL SATELLITE LAUNCH VEHICLE"}),roughness:.35,metalness:.1});function ue(D){const v=document.createElement("canvas");v.width=640,v.height=200;const V=v.getContext("2d");V.fillStyle="#ffffff",V.fillRect(0,0,640,200),V.fillStyle=D.accentColor,V.fillRect(0,0,16,200),V.strokeStyle="rgba(0, 0, 0, 0.1)",V.lineWidth=3,V.strokeRect(1,1,638,198),V.font='900 40px "Inter", sans-serif',V.fillStyle="#0f172a",V.textAlign="left",V.textBaseline="top",V.fillText(D.name,36,24),V.font='bold 20px "Inter", monospace',V.fillStyle=D.accentColor,V.fillText(D.operator,36,76),V.fillStyle=D.statusColor,V.font='bold 18px "Inter", monospace',V.fillText(`STATUS: [ ${D.status} ]`,36,112),V.fillStyle="#64748b",V.font='italic 16px "Inter", sans-serif',V.fillText("TOUCH TO VIEW TELEMETRY & SPECIFICATIONS ➜",36,152);const O=new ht(v);return new r(new Lt(.85,.265),new De({map:O,side:yo}))}function Y(D,v,V){for(let O=0;O<4;O++){const N=O/4*Math.PI*2+Math.PI/4,S=new U;S.position.set(Math.cos(N)*(v+.16),V+.02,Math.sin(N)*(v+.16)),S.rotation.y=-N+Math.PI/2;const oe=new r(new me(.18,.16,.26),h);oe.position.y=.08,S.add(oe);const z=new r(new me(.08,.32,.12),h);z.position.set(0,.22,-.1),z.rotation.x=-.35,S.add(z);const te=new r(new P(.03,.03,.24,16),u);te.position.set(0,.18,.08),te.rotation.x=.3,S.add(te),D.add(S)}}const Be=[{bayIndex:1,rocketId:"slv3"},{bayIndex:3,rocketId:"aslv"},{bayIndex:5,rocketId:"sounding"},{bayIndex:7,rocketId:"pslv"},{bayIndex:9,rocketId:"gslv"},{bayIndex:11,rocketId:"lvm3"},{bayIndex:13,rocketId:"hrlv"},{bayIndex:15,rocketId:"sslv"},{bayIndex:17,rocketId:"apollo11"},{bayIndex:19,rocketId:"falcon9"},{bayIndex:21,rocketId:"dragon"},{bayIndex:23,rocketId:"skyroot"}],Ve=24,Le=16.35;Be.forEach(D=>{const v=D.bayIndex/Ve*Math.PI*2,V=(D.bayIndex+1)/Ve*Math.PI*2,O=(v+V)/2,N=new U;N.name=`RocketBay_${D.rocketId}`,N.position.set(Math.cos(O)*Le,ct,Math.sin(O)*Le),N.lookAt(0,ct,0),o.add(N);const oe=D.rocketId==="skyroot"?1.55:1.15,z=.35,te=new r(new P(oe,oe*1.06,z,16),s);te.position.y=z/2,te.castShadow=!0,te.receiveShadow=!0,N.add(te);const Me=new r(new P(oe*1.02,oe*1.02,.04,16),i);Me.position.y=z,N.add(Me);const ve=new r(new P(oe*.92,oe*.92,.02,32),l);ve.position.y=z+.015,ve.receiveShadow=!0,N.add(ve);const Q=D.rocketId==="skyroot"?47316:ro[D.rocketId]?.accentColor||58879,we=new r(new ot(oe*1.04,.018,12,48),new De({color:Q}));if(we.rotation.x=Math.PI/2,we.position.y=.02,N.add(we),D.rocketId!=="skyroot"){const xe=ue(ro[D.rocketId]);xe.position.set(0,.18,oe*.88),xe.rotation.x=-.32,N.add(xe)}D.rocketId==="pslv"?pi(N,z,n,b,p,d,Y):D.rocketId==="lvm3"?fi(N,z,n,x,R,p,Y):D.rocketId==="gslv"?mi(N,z,n,I,p,Y):D.rocketId==="sounding"?gi(N,z,n):D.rocketId==="slv3"?vi(N,z,n,W,p,Y):D.rocketId==="aslv"?wi(N,z,n,ae,p,Y):D.rocketId==="hrlv"?yi(N,z,n,ge,p,Y):D.rocketId==="sslv"?bi(N,z,n,be,p,Y):D.rocketId==="apollo11"?xi(N,z,n,k,p,Y):D.rocketId==="falcon9"?Si(N,z,n,_,p,Y):D.rocketId==="dragon"?Mi(N,z,n,E):D.rocketId==="skyroot"&&Ci(N,z,n,T,q,p,ue,Y)});let ke={x:0,y:0,time:0};const nt=D=>{ke={x:D.clientX??D.touches?.[0]?.clientX??0,y:D.clientY??D.touches?.[0]?.clientY??0,time:performance.now()}},Ge=D=>{if(!t)return;const v=D.clientX??D.changedTouches?.[0]?.clientX??0,V=D.clientY??D.changedTouches?.[0]?.clientY??0,O=Math.hypot(v-ke.x,V-ke.y),N=performance.now()-ke.time;if(O>8||N>650)return;const S=new bo,oe=new Ie(v/window.innerWidth*2-1,-(V/window.innerHeight)*2+1);S.setFromCamera(oe,t);const z=S.intersectObjects(n,!0);if(z.length>0){const te=z[0].object,Me=te.userData?.rocketId||te.parent?.userData?.rocketId;Me&&ro[Me]&&e.selectRocket(te,Me)}};return window.addEventListener("pointerdown",nt,{passive:!0}),window.addEventListener("pointerup",Ge,{passive:!0}),{group:o,update:(D,v)=>{e.update(D,v)},interactiveTargets:n}}function pi(a,e,t,o,n,s,i){const l=new U;l.name="Rocket_PSLV",l.position.set(0,e+.02,0),a.add(l);const h=.24,u=new F({color:2040878,roughness:.5,metalness:.7}),p=new r(new P(h,h,2.1,32),o);p.position.y=1.05,p.castShadow=!0,l.add(p);const d=new r(new _e(.18,.28,24),n);d.rotation.x=Math.PI,d.position.y=.04,l.add(d);const f=new r(new P(h*1.01,h*1.01,.14,32),u);f.position.y=2.17,l.add(f);const m=new r(new P(h,h,1.35,32),o);m.position.y=2.24+.675,m.castShadow=!0,l.add(m),[-.26,.26].forEach(x=>{const R=new r(new me(.06,.24,.06),u);R.position.set(x,2.38,0),l.add(R)});const y=new r(new P(h*.95,h,1.15,32),o);y.position.y=3.59+.575,l.add(y);const g=new r(new P(h*.9,h*.95,.65,32),u);g.position.y=4.74+.325,l.add(g);const w=new r(new _e(h*1.02,1.25,32),s);w.position.y=5.39+.625,l.add(w);for(let x=0;x<6;x++){const R=x/6*Math.PI*2,I=new U;I.position.set(Math.cos(R)*.36,.95,Math.sin(R)*.36);const k=new r(new P(.075,.075,1.65,20),o);I.add(k);const _=new r(new _e(.075,.32,20),u);_.position.y=.825+.16,I.add(_);const E=new r(new _e(.055,.14,16),n);E.rotation.x=Math.PI,E.position.y=-.825-.07,I.add(E);const T=new r(new me(.06,.08,.08),u);T.position.set(0,.6,-.06),I.add(T),l.add(I)}const c=new r(new me(.04,4.8,.04),u);c.position.set(0,2.5,h+.015),l.add(c),i(a,h,e);const b=It("pslv",.65,6.6,3.3);l.add(b),t.push(b)}function fi(a,e,t,o,n,s,i){const l=new U;l.name="Rocket_LVM3",l.position.set(0,e+.02,0),a.add(l);const h=.34,u=new F({color:2040878,roughness:.5,metalness:.7}),p=new F({color:16317180,roughness:.35}),d=new r(new P(h,h,2.75,32),o);d.position.y=1.375,d.castShadow=!0,l.add(d),[-.14,.14].forEach(c=>{const b=new r(new _e(.12,.28,20),s);b.rotation.x=Math.PI,b.position.set(c,.05,0),l.add(b)});const f=new r(new P(h,h,1.35,32),p);f.position.y=2.75+.675,f.castShadow=!0,l.add(f);const m=new r(new P(h*1.01,h*1.01,.18,32),u);m.position.y=2.75,l.add(m);const y=new r(new _e(h*1.25,2.1,32),p);y.position.y=4.1+1.05,y.castShadow=!0,l.add(y),[-.62,.62].forEach(c=>{const b=new U;b.position.set(c,1.6,0);const x=new r(new P(.24,.24,3.15,24),n);b.add(x);const R=new r(new _e(.24,.68,24),u);R.position.y=1.575+.34,b.add(R);const I=new r(new _e(.18,.35,20),s);I.rotation.x=Math.PI,I.position.y=-1.575-.175,b.add(I);const k=new r(new me(.24,.12,.12),u);k.position.set(c>0?-.16:.16,1.2,0),b.add(k);const _=new r(new me(.24,.14,.14),u);_.position.set(c>0?-.16:.16,-1.2,0),b.add(_),l.add(b)});const g=new r(new me(.06,3.8,.05),u);g.position.set(0,2.1,h+.02),l.add(g),i(a,h*1.35,e);const w=It("lvm3",.95,6.5,3.25);l.add(w),t.push(w)}function mi(a,e,t,o,n,s){const i=new U;i.name="Rocket_GSLV",i.position.set(0,e+.02,0),a.add(i);const l=.24,h=new F({color:1975344,roughness:.5}),u=new F({color:16317180,roughness:.35}),p=new r(new P(l,l,2.5,32),o);p.position.y=1.25,i.add(p);const d=new r(new P(l,l,1.45,32),o);d.position.y=2.5+.725,i.add(d);const f=new r(new P(l,l,1.2,32),u);f.position.y=3.95+.6,i.add(f);const m=new r(new _e(l*1.2,1.55,32),u);m.position.y=5.15+.775,i.add(m);for(let g=0;g<4;g++){const w=g/4*Math.PI*2+Math.PI/4,c=new U;c.position.set(Math.cos(w)*.4,1.25,Math.sin(w)*.4);const b=new r(new P(.1,.1,2.3,20),o);c.add(b);const x=new r(new _e(.1,.45,20),h);x.position.y=1.15+.225,c.add(x);const R=new r(new _e(.08,.18,16),n);R.rotation.x=Math.PI,R.position.y=-1.15-.09,c.add(R),i.add(c)}s(a,l,e);const y=It("gslv",.75,6.7,3.35);i.add(y),t.push(y)}function gi(a,e,t,o){const n=new U;n.name="Rocket_Sounding",n.position.set(0,e+.02,0),a.add(n);const s=new F({color:4674921,metalness:.85,roughness:.25}),i=new F({color:16317180,roughness:.35}),l=new F({color:16726784,roughness:.35}),h=new U;h.rotation.x=-.1,n.add(h);const u=new r(new me(.12,6.2,.12),s);u.position.set(0,3.1,-.12),h.add(u);for(let g=.4;g<6;g+=.35){const w=new r(new P(.015,.015,.24,8),s);w.rotation.z=Math.PI/2,w.position.set(0,g,-.12),h.add(w)}[-.18,.18].forEach(g=>{const w=new r(new P(.04,.04,1.2,16),s);w.position.set(g,.6,.2),w.rotation.x=.45,n.add(w)});const p=new U;p.position.set(0,.85,.06),h.add(p);const d=new r(new P(.065,.065,2.1,24),i);d.position.y=1.05,p.add(d);const f=new r(new P(.06,.06,2.2,24),i);f.position.y=2.1+1.1,p.add(f);const m=new r(new _e(.06,.75,24),l);m.position.y=4.3+.375,p.add(m);for(let g=0;g<4;g++){const w=g/4*Math.PI*2,c=new r(new me(.01,.45,.28),l);c.position.set(Math.cos(w)*.16,.25,Math.sin(w)*.16),c.rotation.y=-w,p.add(c)}const y=It("sounding",.55,6.3,3.15);n.add(y),t.push(y)}function vi(a,e,t,o,n,s){const i=new U;i.name="Rocket_SLV3",i.position.set(0,e+.02,0),a.add(i);const l=new F({color:14230050,roughness:.35}),h=new F({color:15051058,roughness:.3,metalness:.8}),u=new r(new P(.2,.2,1.9,28),o);u.position.y=.95,i.add(u);const p=new r(new P(.18,.2,1.4,28),o);p.position.y=1.9+.7,i.add(p);const d=new r(new P(.16,.18,1.15,28),o);d.position.y=3.3+.575,i.add(d);const f=new r(new P(.14,.16,.8,28),o);f.position.y=4.45+.4,i.add(f);const m=new r(new _e(.14,.65,28),o);m.position.y=5.25+.325,i.add(m);const y=new r(new P(.142,.142,.06,28),h);y.position.y=5.25,i.add(y);for(let w=0;w<4;w++){const c=w/4*Math.PI*2,b=new r(new me(.015,.48,.32),l);b.position.set(Math.cos(c)*.28,.3,Math.sin(c)*.28),b.rotation.y=-c,i.add(b)}s(a,.2,e);const g=It("slv3",.55,6,3);i.add(g),t.push(g)}function wi(a,e,t,o,n,s){const i=new U;i.name="Rocket_ASLV",i.position.set(0,e+.02,0),a.add(i);const l=.18,h=new F({color:2040878,roughness:.5}),u=new r(new P(l,l,4.4,28),o);u.position.y=2.2,i.add(u);const p=new r(new He(l*1.35,24,18),o);p.position.y=4.4+.18,i.add(p);const d=new r(new _e(l*1.3,.85,24),o);d.position.y=4.58+.425,i.add(d),[-.38,.38].forEach(m=>{const y=new U;y.position.set(m,1.45,0);const g=new r(new P(.14,.14,2.5,20),o);y.add(g);const w=new r(new _e(.14,.45,20),h);w.position.y=1.25+.225,y.add(w);const c=new r(new _e(.1,.18,16),n);c.rotation.x=Math.PI,c.position.y=-1.25-.09,y.add(c),i.add(y)}),s(a,l,e);const f=It("aslv",.65,6.2,3.1);i.add(f),t.push(f)}function yi(a,e,t,o,n,s){const i=new U;i.name="Rocket_HRLV",i.position.set(0,e+.02,0),a.add(i);const l=.35,h=new F({color:1120295,roughness:.5}),u=new F({color:4674921,metalness:.88,roughness:.22}),p=new r(new P(l,l,3.8,32),o);p.position.y=1.9,i.add(p);for(let g=0;g<8;g++){const w=g/8*Math.PI*2,c=new r(new _e(.07,.22,16),n);c.rotation.x=Math.PI,c.position.set(Math.cos(w)*.2,.04,Math.sin(w)*.2),i.add(c)}const d=new r(new _e(.08,.24,16),n);d.rotation.x=Math.PI,d.position.set(0,.04,0),i.add(d);const f=new r(new P(l*.95,l,1.6,32),u);f.position.y=3.8+.8,i.add(f);const m=new r(new _e(l*1.02,1.5,32),o);m.position.y=5.4+.75,i.add(m);for(let g=0;g<4;g++){const w=g/4*Math.PI*2,c=new r(new me(.02,.26,.26),h);c.position.set(Math.cos(w)*(l+.1),3.65,Math.sin(w)*(l+.1)),c.rotation.y=-w,i.add(c)}for(let g=0;g<4;g++){const w=g/4*Math.PI*2+Math.PI/4,c=new r(new me(.03,1.45,.03),h);c.position.set(Math.cos(w)*(l+.02),.75,Math.sin(w)*(l+.02)),i.add(c)}s(a,l,e);const y=It("hrlv",.85,7,3.5);i.add(y),t.push(y)}function bi(a,e,t,o,n,s){const i=new U;i.name="Rocket_SSLV",i.position.set(0,e+.02,0),a.add(i);const l=.22,h=new F({color:58879,roughness:.3}),u=new F({color:1447967,roughness:.45,metalness:.5}),p=new r(new P(l,l,2.2,28),o);p.position.y=1.1,i.add(p);const d=new r(new P(l,l,1.3,28),o);d.position.y=2.2+.65,i.add(d);const f=new r(new P(l*.92,l,1,28),o);f.position.y=3.5+.5,i.add(f);const m=new r(new P(l*.92,l*.92,.16,28),h);m.position.y=4.5+.08,i.add(m);const y=new r(new _e(l*1.05,1.15,28),u);y.position.y=4.66+.575,i.add(y),s(a,l,e);const g=It("sslv",.55,6,3);i.add(g),t.push(g)}function xi(a,e,t,o,n,s){const i=new U;i.name="Rocket_Apollo11",i.position.set(0,e+.02,0),a.add(i);const l=.38,h=new F({color:11674164,roughness:.35}),u=new F({color:14870768,roughness:.25,metalness:.85}),p=new r(new P(l,l,2.6,36),o);p.position.y=1.3,p.castShadow=!0,i.add(p);for(let R=0;R<4;R++){const I=R/4*Math.PI*2,k=new r(new _e(.12,.32,20),n);k.rotation.x=Math.PI,k.position.set(Math.cos(I)*.22,.06,Math.sin(I)*.22),i.add(k)}const d=new r(new _e(.14,.34,20),n);d.rotation.x=Math.PI,d.position.set(0,.06,0),i.add(d);for(let R=0;R<4;R++){const I=R/4*Math.PI*2,k=new r(new me(.025,.65,.42),u);k.position.set(Math.cos(I)*(l+.16),.45,Math.sin(I)*(l+.16)),k.rotation.y=-I,i.add(k)}const f=new r(new P(l,l,1.7,36),o);f.position.y=2.6+.85,f.castShadow=!0,i.add(f);const m=new r(new P(l*.7,l,1.25,36),o);m.position.y=4.3+.625,i.add(m);const y=new r(new P(l*.48,l*.48,.55,32),u);y.position.y=5.55+.275,i.add(y);const g=new r(new _e(l*.48,.38,32),u);g.position.y=6.1+.19,i.add(g);const w=new U;w.position.y=6.29;for(let R=0;R<4;R++){const I=R/4*Math.PI*2+Math.PI/4,k=new r(new P(.008,.008,.55,8),h);k.position.set(Math.cos(I)*.06,.275,Math.sin(I)*.06),w.add(k)}const c=new r(new P(.025,.035,.45,16),h);c.position.y=.55+.225,w.add(c);const b=new r(new _e(.025,.2,16),h);b.position.y=1+.1,w.add(b),i.add(w),s(a,l,e);const x=It("apollo11",.95,7.3,3.65);i.add(x),t.push(x)}function Si(a,e,t,o,n,s){const i=new U;i.name="Rocket_Falcon9",i.position.set(0,e+.02,0),a.add(i);const l=.26,h=new F({color:1119258,roughness:.5}),u=new F({color:16317180,roughness:.32}),p=new r(new P(l,l,4.2,32),o);p.position.y=2.1,p.castShadow=!0,i.add(p);for(let w=0;w<8;w++){const c=w/8*Math.PI*2,b=new r(new _e(.06,.2,16),n);b.rotation.x=Math.PI,b.position.set(Math.cos(c)*.16,.04,Math.sin(c)*.16),i.add(b)}const d=new r(new _e(.065,.22,16),n);d.rotation.x=Math.PI,d.position.set(0,.04,0),i.add(d);const f=new r(new P(l,l,.6,32),h);f.position.y=4.2+.3,i.add(f);const m=new r(new P(l,l,.9,32),u);m.position.y=4.8+.45,i.add(m);const y=new r(new _e(l*1.25,1.45,32),u);y.position.y=5.7+.725,i.add(y);for(let w=0;w<4;w++){const c=w/4*Math.PI*2,b=new U;b.position.set(Math.cos(c)*(l+.08),4.35,Math.sin(c)*(l+.08)),b.rotation.y=-c;const x=new r(new me(.015,.24,.22),h);b.add(x),i.add(b)}for(let w=0;w<4;w++){const c=w/4*Math.PI*2+Math.PI/4,b=new r(new me(.025,1.65,.025),h);b.position.set(Math.cos(c)*(l+.02),.85,Math.sin(c)*(l+.02)),i.add(b)}s(a,l,e);const g=It("falcon9",.8,6.9,3.45);i.add(g),t.push(g)}function Mi(a,e,t,o,n){const s=new U;s.name="Spacecraft_Dragon",s.position.set(0,e+.02,0),a.add(s);const i=new F({color:16317180,roughness:.35}),l=new F({color:659480,roughness:.35,metalness:.7}),h=new F({color:1447967,roughness:.65}),u=new F({color:15594231,roughness:.55,metalness:.2}),p=new r(new P(.38,.45,3.6,32),u);p.position.y=1.8,p.castShadow=!0,s.add(p);const d=new r(new me(.08,3.55,.08),h);d.position.set(0,1.8,.4),s.add(d);const f=new r(new P(.42,.42,1.15,32),l);f.position.y=3.6+.575,s.add(f);for(let c=0;c<4;c++){const b=c/4*Math.PI*2,x=new r(new me(.12,1.05,.025),i);x.position.set(Math.cos(b)*.48,3.6+.525,Math.sin(b)*.48),x.rotation.y=-b,s.add(x)}const m=new r(new P(.42,.43,.12,32),h);m.position.y=4.75+.06,s.add(m);const y=new r(new P(.24,.42,.95,32),o);y.position.y=4.87+.475,s.add(y);const g=new r(new He(.24,32,20,0,Math.PI*2,0,Math.PI*.45),i);g.position.y=5.82,s.add(g);for(let c=0;c<4;c++){const b=c/4*Math.PI*2+Math.PI/4,x=new r(new me(.08,.18,.06),h);x.position.set(Math.cos(b)*.38,5.25,Math.sin(b)*.38),x.rotation.y=-b,s.add(x)}const w=It("dragon",.85,6,3);s.add(w),t.push(w)}function Ci(a,e,t,o,n,s,i,l){const h=new F({color:16317180,roughness:.35}),u=new F({color:16347926,roughness:.35}),p=new F({color:58879,roughness:.3}),d=new U;d.name="Rocket_Vikram1",d.position.set(-.65,e+.02,0),a.add(d);const f=.2,m=new r(new P(f,f,4.1,28),o);m.position.y=2.05,m.castShadow=!0,d.add(m);const y=new r(new P(f,f,.45,28),u);y.position.y=4.1+.225,d.add(y);const g=new r(new _e(f*1.05,1.25,28),h);g.position.y=4.55+.625,d.add(g);const w=new r(new _e(.12,.26,20),s);w.rotation.x=Math.PI,w.position.y=.04,d.add(w);const c=i(ro.vikram1);c.position.set(-.65,.18,1.25),c.rotation.x=-.32,a.add(c),l(d,f,0);const b=It("vikram1",.55,6.2,3.1);d.add(b),t.push(b);const x=new U;x.name="Rocket_Vikram2",x.position.set(.65,e+.02,0),a.add(x);const R=.21,I=new r(new P(R,R,4.3,28),h);I.position.y=2.15,I.castShadow=!0,x.add(I);const k=new r(new P(R,R,.65,28),p);k.position.y=4.3+.325,x.add(k);const _=new r(new _e(R*1.05,1.45,28),n);_.position.y=4.95+.725,x.add(_);const E=new r(new _e(.14,.28,20),s);E.rotation.x=Math.PI,E.position.y=.04,x.add(E);const T=i(ro.vikram2);T.position.set(.65,.18,1.25),T.rotation.x=-.32,a.add(T),l(x,R,0);const q=It("vikram2",.55,6.5,3.25);x.add(q),t.push(q)}function It(a,e,t,o){const n=new P(e,e,t,16),s=new De({visible:!1}),i=new r(n,s);return i.position.y=o,i.name=`HitMesh_${a}`,i.userData={rocketId:a,isHitBox:!0},i}const Hn=[],Vn=a=>{Hn.push(a)};Vn.getAll=()=>Hn;const Pn=document.getElementById("loading-screen"),Ti=document.getElementById("loader-fill"),Ii=document.getElementById("loading-pct");function wt(a,e){Ti.style.width=`${a}%`,Ii.textContent=e||`${Math.round(a)}%`}async function Ei(){wt(5,"CREATING RENDERER…");const a=document.getElementById("app"),e=$s(a),t=Zs(),o=new kn;o.background=new $(395796),wt(10,"COMPOSITING POST-PROCESSING…");const{composer:n}=Qs(e,o,t);Js(e,t,n);const s=new Rn,i={uTime:{value:0},uResolution:{value:new Ie(window.innerWidth,window.innerHeight)},uPointer:{value:new Ie(0,0)},uPointerWorld:{value:new C(0,0,0)}};window.addEventListener("pointermove",I=>{i.uPointer.value.set(I.clientX/window.innerWidth*2-1,-(I.clientY/window.innerHeight)*2+1)});const l=new bo;new Ie,wt(15,"BUILDING ATRIUM…"),ta(o),wt(25,"CONFIGURING LIGHTING…"),da(o),wt(35,"ASSEMBLING PHYSICS STATION…");const h=oi(o,i,t);wt(45,"ASSEMBLING CHEMISTRY STATION…");const u=Ga(o,i);wt(55,"ASSEMBLING BIOLOGY STATION…");const p=ni(o);wt(65,"ASSEMBLING MATHEMATICS STATION…");const d=si(o,i);wt(75,"ASSEMBLING ASTRONOMY OBSERVATION STATION…");const f=ci(o,i,t);wt(80,"DEPLOYING AUTONOMOUS MOBILE ROBOTS (R2-D2 & PRAGYAN ROVER)…");const m=di(o);wt(85,"INITIALIZING CONTROLS…");const y=Ia(t,e),g=Aa(t,y),w=za(t,y);wt(90,"BUILDING HUD…"),Va({physics:h,chemistry:u,biology:p,math:d,astroRobotics:f,cameraAnim:g}),wt(93,"DEPLOYING ROCKET FLEET (ISRO, NASA, SPACEX & SKYROOT)…");const c=hi(o,t),b=ui(o,c,t);wt(96,"TUNING COSMIC AMBIENT SOUNDSCAPE…");const x=Ka();wt(98,"ENABLING WEBXR…"),Xa(e),wt(100,"LAUNCH"),await new Promise(I=>setTimeout(I,400)),Pn.classList.add("fade-out"),setTimeout(()=>Pn.remove(),1e3),window.__sim={camera:t,controls:y,cameraAnim:g,scene:o,gyroManager:w,astroCtx:f,mobileRobots:m,rocketTelemetry:c,rocketExhibits:b,ambientAudio:Bt,audioWidget:x};const R=Vn.getAll();e.setAnimationLoop((I,k)=>{const _=s.getDelta(),E=s.getElapsedTime();i.uTime.value=E,l.setFromCamera(i.uPointer.value,t);const T=new _n(new C(0,1,0),0),q=new C;l.ray.intersectPlane(T,q),q&&i.uPointerWorld.value.copy(q),w.enabled&&w.hasSensorData?w.update(_):y.update();for(const W of R)W(E,_,i);h.update?.(E,_,i),u.update?.(E,_,i),p.update?.(E,_,i),d.update?.(E,_,i),f.update?.(E,_,i),m.update?.(E,_,i),b.update?.(E,_,i),n.render()})}Ei().catch(a=>{console.error("VIZON init failed:",a),document.getElementById("loading-pct").textContent=`ERROR: ${a.message}`});
