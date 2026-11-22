// src/shaders/shaderRegistry.js — Central tick registry for shader/VFX updaters
const ticks = [];

export const registerShaderTick = (fn) => {
  ticks.push(fn);
};

registerShaderTick.getAll = () => ticks;
