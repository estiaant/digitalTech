/* Render imported artwork onto a real 64×64 grid and snap every pixel to the GPL. */
// Source bounding boxes isolate the generated objects; its spacing is not a perfect grid.
const atlasBounds={case:[40,58,246,294],keyboard:[322,114,320,229],mouse:[676,144,253,190],monitor:[977,75,240,279],motherboard:[47,410,261,257],cpu:[354,413,245,235],ram:[636,425,287,242],rom:[969,432,258,214],bus:[32,719,264,230],gpu:[322,686,314,265],hdd:[659,703,286,248],ssd:[979,715,248,227],speakers:[38,984,267,240],external:[353,1010,274,224],usb:[659,1031,263,192],laptop:[943,974,274,268]};
const artCache = new Map();
const rgbPalette = PALETTE.map(hex=>[0,2,4].map(i=>parseInt(hex.slice(i,i+2),16)));
const colourCache = new Map();
function snapColours(ctx,w,h) {
 const image=ctx.getImageData(0,0,w,h), pixels=image.data;
 for(let i=0;i<pixels.length;i+=4){
  if(pixels[i+3]<128){pixels[i+3]=0;continue;}
  const key=(pixels[i]<<16)|(pixels[i+1]<<8)|pixels[i+2];
  let colour=colourCache.get(key);
  if(!colour){let distance=Infinity;for(const p of rgbPalette){const d=(p[0]-pixels[i])**2+(p[1]-pixels[i+1])**2+(p[2]-pixels[i+2])**2;if(d<distance){distance=d;colour=p;}}colourCache.set(key,colour);}
  pixels[i]=colour[0];pixels[i+1]=colour[1];pixels[i+2]=colour[2];pixels[i+3]=255;
 }
 ctx.putImageData(image,0,0);
}
function sprite(id,cls='') {return `<canvas width="64" height="64" data-sprite="${id}" class="pixel-art ${cls}" role="img" aria-label="${parts[id]?.[0] || id}"></canvas>`;}
function paintArt(){document.querySelectorAll('canvas[data-sprite]').forEach(canvas=>{const source=artCache.get(canvas.dataset.sprite);if(source){const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;ctx.clearRect(0,0,64,64);ctx.drawImage(source,0,0);}});}
const artReady = new Promise(resolve=>{
 const image=new Image();image.src=ART_SOURCES.hardware;
 image.onload=()=>{for(const id of Object.keys(atlasBounds)){const canvas=document.createElement('canvas');canvas.width=canvas.height=64;const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.imageSmoothingEnabled=false;const [x,y,w,h]=atlasBounds[id];const scale=60/Math.max(w,h);const dw=Math.round(w*scale),dh=Math.round(h*scale);ctx.drawImage(image,x,y,w,h,Math.floor((64-dw)/2),Math.floor((64-dh)/2),dw,dh);snapColours(ctx,64,64);artCache.set(id,canvas);}makePhone();paintArt();resolve();};
 image.onerror=()=>{document.querySelector('#asset-error').hidden=false;resolve();};
});
function makePhone(){const c=document.createElement('canvas');c.width=c.height=64;const ctx=c.getContext('2d');const r=(x,y,w,h,hex)=>{ctx.fillStyle=hex;ctx.fillRect(x,y,w,h);};r(18,3,28,58,'#10121c');r(16,6,32,52,'#10121c');r(19,6,26,52,'#5e5b8c');r(21,12,22,36,'#d3eed3');r(27,8,10,2,'#deceed');r(23,15,16,2,'#006554');for(let i=0;i<6;i++)r(23+(i%3)*6,23+Math.floor(i/3)*9,4,5,i%2?'#c878af':'#8c78a5');r(24,42,16,3,'#ffa2ac');r(29,52,6,2,'#deceed');artCache.set('phone',c);}
const labImage=new Image();labImage.src=ART_SOURCES.lab;labImage.onload=()=>{const c=document.querySelector('#world');const ctx=c.getContext('2d',{willReadFrequently:true});ctx.imageSmoothingEnabled=false;ctx.drawImage(labImage,0,0,c.width,c.height);snapColours(ctx,c.width,c.height);};
