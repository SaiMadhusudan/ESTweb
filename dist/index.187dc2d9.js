var t,e={},i=function(t,e){if(!(t instanceof e))throw TypeError("Cannot call a class as a function")},s=function(){function t(e){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(i(this,t),!(e instanceof Node))throw"Can't initialize VanillaTilt because "+e+" is not a Node.";this.width=null,this.height=null,this.clientWidth=null,this.clientHeight=null,this.left=null,this.top=null,// for Gyroscope sampling
this.gammazero=null,this.betazero=null,this.lastgammazero=null,this.lastbetazero=null,this.transitionTimeout=null,this.updateCall=null,this.event=null,this.updateBind=this.update.bind(this),this.resetBind=this.reset.bind(this),this.element=e,this.settings=this.extendSettings(s),this.reverse=this.settings.reverse?-1:1,this.glare=t.isSettingTrue(this.settings.glare),this.glarePrerender=t.isSettingTrue(this.settings["glare-prerender"]),this.fullPageListening=t.isSettingTrue(this.settings["full-page-listening"]),this.gyroscope=t.isSettingTrue(this.settings.gyroscope),this.gyroscopeSamples=this.settings.gyroscopeSamples,this.elementListener=this.getElementListener(),this.glare&&this.prepareGlare(),this.fullPageListening&&this.updateClientSize(),this.addEventListeners(),this.reset(),this.updateInitialPosition()}return t.isSettingTrue=function(t){return""===t||!0===t||1===t},/**
   * Method returns element what will be listen mouse events
   * @return {Node}
   */t.prototype.getElementListener=function(){if(this.fullPageListening)return window.document;if("string"==typeof this.settings["mouse-event-element"]){var t=document.querySelector(this.settings["mouse-event-element"]);if(t)return t}return this.settings["mouse-event-element"]instanceof Node?this.settings["mouse-event-element"]:this.element},/**
   * Method set listen methods for this.elementListener
   * @return {Node}
   */t.prototype.addEventListeners=function(){this.onMouseEnterBind=this.onMouseEnter.bind(this),this.onMouseMoveBind=this.onMouseMove.bind(this),this.onMouseLeaveBind=this.onMouseLeave.bind(this),this.onWindowResizeBind=this.onWindowResize.bind(this),this.onDeviceOrientationBind=this.onDeviceOrientation.bind(this),this.elementListener.addEventListener("mouseenter",this.onMouseEnterBind),this.elementListener.addEventListener("mouseleave",this.onMouseLeaveBind),this.elementListener.addEventListener("mousemove",this.onMouseMoveBind),(this.glare||this.fullPageListening)&&window.addEventListener("resize",this.onWindowResizeBind),this.gyroscope&&window.addEventListener("deviceorientation",this.onDeviceOrientationBind)},/**
   * Method remove event listeners from current this.elementListener
   */t.prototype.removeEventListeners=function(){this.elementListener.removeEventListener("mouseenter",this.onMouseEnterBind),this.elementListener.removeEventListener("mouseleave",this.onMouseLeaveBind),this.elementListener.removeEventListener("mousemove",this.onMouseMoveBind),this.gyroscope&&window.removeEventListener("deviceorientation",this.onDeviceOrientationBind),(this.glare||this.fullPageListening)&&window.removeEventListener("resize",this.onWindowResizeBind)},t.prototype.destroy=function(){clearTimeout(this.transitionTimeout),null!==this.updateCall&&cancelAnimationFrame(this.updateCall),this.reset(),this.removeEventListeners(),this.element.vanillaTilt=null,delete this.element.vanillaTilt,this.element=null},t.prototype.onDeviceOrientation=function(t){if(null!==t.gamma&&null!==t.beta){this.updateElementPosition(),this.gyroscopeSamples>0&&(this.lastgammazero=this.gammazero,this.lastbetazero=this.betazero,null===this.gammazero?(this.gammazero=t.gamma,this.betazero=t.beta):(this.gammazero=(t.gamma+this.lastgammazero)/2,this.betazero=(t.beta+this.lastbetazero)/2),this.gyroscopeSamples-=1);var e=this.settings.gyroscopeMaxAngleX-this.settings.gyroscopeMinAngleX,i=this.settings.gyroscopeMaxAngleY-this.settings.gyroscopeMinAngleY,s=e/this.width,n=i/this.height,a=t.gamma-(this.settings.gyroscopeMinAngleX+this.gammazero),o=t.beta-(this.settings.gyroscopeMinAngleY+this.betazero);null!==this.updateCall&&cancelAnimationFrame(this.updateCall),this.event={clientX:a/s+this.left,clientY:o/n+this.top},this.updateCall=requestAnimationFrame(this.updateBind)}},t.prototype.onMouseEnter=function(){this.updateElementPosition(),this.element.style.willChange="transform",this.setTransition()},t.prototype.onMouseMove=function(t){null!==this.updateCall&&cancelAnimationFrame(this.updateCall),this.event=t,this.updateCall=requestAnimationFrame(this.updateBind)},t.prototype.onMouseLeave=function(){this.setTransition(),this.settings.reset&&requestAnimationFrame(this.resetBind)},t.prototype.reset=function(){this.event={clientX:this.left+this.width/2,clientY:this.top+this.height/2},this.element&&this.element.style&&(this.element.style.transform="perspective("+this.settings.perspective+"px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"),this.resetGlare()},t.prototype.resetGlare=function(){this.glare&&(this.glareElement.style.transform="rotate(180deg) translate(-50%, -50%)",this.glareElement.style.opacity="0")},t.prototype.updateInitialPosition=function(){if(0!==this.settings.startX||0!==this.settings.startY){this.onMouseEnter(),this.fullPageListening?this.event={clientX:(this.settings.startX+this.settings.max)/(2*this.settings.max)*this.clientWidth,clientY:(this.settings.startY+this.settings.max)/(2*this.settings.max)*this.clientHeight}:this.event={clientX:this.left+(this.settings.startX+this.settings.max)/(2*this.settings.max)*this.width,clientY:this.top+(this.settings.startY+this.settings.max)/(2*this.settings.max)*this.height};var t=this.settings.scale;this.settings.scale=1,this.update(),this.settings.scale=t,this.resetGlare()}},t.prototype.getValues=function(){var t=void 0,e=void 0;return this.fullPageListening?(t=this.event.clientX/this.clientWidth,e=this.event.clientY/this.clientHeight):(t=(this.event.clientX-this.left)/this.width,e=(this.event.clientY-this.top)/this.height),t=Math.min(Math.max(t,0),1),e=Math.min(Math.max(e,0),1),{tiltX:(this.reverse*(this.settings.max-t*this.settings.max*2)).toFixed(2),tiltY:(this.reverse*(e*this.settings.max*2-this.settings.max)).toFixed(2),percentageX:100*t,percentageY:100*e,angle:Math.atan2(this.event.clientX-(this.left+this.width/2),-(this.event.clientY-(this.top+this.height/2)))*(180/Math.PI)}},t.prototype.updateElementPosition=function(){var t=this.element.getBoundingClientRect();this.width=this.element.offsetWidth,this.height=this.element.offsetHeight,this.left=t.left,this.top=t.top},t.prototype.update=function(){var t=this.getValues();this.element.style.transform="perspective("+this.settings.perspective+"px) rotateX("+("x"===this.settings.axis?0:t.tiltY)+"deg) rotateY("+("y"===this.settings.axis?0:t.tiltX)+"deg) scale3d("+this.settings.scale+", "+this.settings.scale+", "+this.settings.scale+")",this.glare&&(this.glareElement.style.transform="rotate("+t.angle+"deg) translate(-50%, -50%)",this.glareElement.style.opacity=""+t.percentageY*this.settings["max-glare"]/100),this.element.dispatchEvent(new CustomEvent("tiltChange",{detail:t})),this.updateCall=null},/**
   * Appends the glare element (if glarePrerender equals false)
   * and sets the default style
   */t.prototype.prepareGlare=function(){// If option pre-render is enabled we assume all html/css is present for an optimal glare effect.
if(!this.glarePrerender){// Create glare element
var t=document.createElement("div");t.classList.add("js-tilt-glare");var e=document.createElement("div");e.classList.add("js-tilt-glare-inner"),t.appendChild(e),this.element.appendChild(t)}this.glareElementWrapper=this.element.querySelector(".js-tilt-glare"),this.glareElement=this.element.querySelector(".js-tilt-glare-inner"),this.glarePrerender||(Object.assign(this.glareElementWrapper.style,{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",overflow:"hidden","pointer-events":"none"}),Object.assign(this.glareElement.style,{position:"absolute",top:"50%",left:"50%","pointer-events":"none","background-image":"linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",transform:"rotate(180deg) translate(-50%, -50%)","transform-origin":"0% 0%",opacity:"0"}),this.updateGlareSize())},t.prototype.updateGlareSize=function(){if(this.glare){var t=(this.element.offsetWidth>this.element.offsetHeight?this.element.offsetWidth:this.element.offsetHeight)*2;Object.assign(this.glareElement.style,{width:t+"px",height:t+"px"})}},t.prototype.updateClientSize=function(){this.clientWidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,this.clientHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},t.prototype.onWindowResize=function(){this.updateGlareSize(),this.updateClientSize()},t.prototype.setTransition=function(){var t=this;clearTimeout(this.transitionTimeout),this.element.style.transition=this.settings.speed+"ms "+this.settings.easing,this.glare&&(this.glareElement.style.transition="opacity "+this.settings.speed+"ms "+this.settings.easing),this.transitionTimeout=setTimeout(function(){t.element.style.transition="",t.glare&&(t.glareElement.style.transition="")},this.settings.speed)},/**
   * Method return patched settings of instance
   * @param {boolean} settings.reverse - reverse the tilt direction
   * @param {number} settings.max - max tilt rotation (degrees)
   * @param {startX} settings.startX - the starting tilt on the X axis, in degrees. Default: 0
   * @param {startY} settings.startY - the starting tilt on the Y axis, in degrees. Default: 0
   * @param {number} settings.perspective - Transform perspective, the lower the more extreme the tilt gets
   * @param {string} settings.easing - Easing on enter/exit
   * @param {number} settings.scale - 2 = 200%, 1.5 = 150%, etc..
   * @param {number} settings.speed - Speed of the enter/exit transition
   * @param {boolean} settings.transition - Set a transition on enter/exit
   * @param {string|null} settings.axis - What axis should be disabled. Can be X or Y
   * @param {boolean} settings.glare - What axis should be disabled. Can be X or Y
   * @param {number} settings.max-glare - the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
   * @param {boolean} settings.glare-prerender - false = VanillaTilt creates the glare elements for you, otherwise
   * @param {boolean} settings.full-page-listening - If true, parallax effect will listen to mouse move events on the whole document, not only the selected element
   * @param {string|object} settings.mouse-event-element - String selector or link to HTML-element what will be listen mouse events
   * @param {boolean} settings.reset - false = If the tilt effect has to be reset on exit
   * @param {gyroscope} settings.gyroscope - Enable tilting by deviceorientation events
   * @param {gyroscopeSensitivity} settings.gyroscopeSensitivity - Between 0 and 1 - The angle at which max tilt position is reached. 1 = 90deg, 0.5 = 45deg, etc..
   * @param {gyroscopeSamples} settings.gyroscopeSamples - How many gyroscope moves to decide the starting position.
   */t.prototype.extendSettings=function(t){var e={reverse:!1,max:15,startX:0,startY:0,perspective:1e3,easing:"cubic-bezier(.03,.98,.52,.99)",scale:1,speed:300,transition:!0,axis:null,glare:!1,"max-glare":1,"glare-prerender":!1,"full-page-listening":!1,"mouse-event-element":null,reset:!0,gyroscope:!0,gyroscopeMinAngleX:-45,gyroscopeMaxAngleX:45,gyroscopeMinAngleY:-45,gyroscopeMaxAngleY:45,gyroscopeSamples:10},i={};for(var s in e)if(s in t)i[s]=t[s];else if(this.element.hasAttribute("data-tilt-"+s)){var n=this.element.getAttribute("data-tilt-"+s);try{i[s]=JSON.parse(n)}catch(t){i[s]=n}}else i[s]=e[s];return i},t.init=function(e,i){e instanceof Node&&(e=[e]),e instanceof NodeList&&(e=[].slice.call(e)),e instanceof Array&&e.forEach(function(e){"vanillaTilt"in e||(e.vanillaTilt=new t(e,i))})},t}();"undefined"!=typeof document&&(/* expose the class to window */window.VanillaTilt=s,/**
   * Auto load
   */s.init(document.querySelectorAll("[data-tilt]"))),e=s;const n=[{element:".section-title",animation:{delay:300,distance:"0px",origin:"bottom"}},{element:".hero-title",animation:{delay:500,origin:window.innerWidth>768?"left":"bottom"}},{element:".hero-cta",animation:{delay:1e3,origin:window.innerWidth>768?"left":"bottom"}},{element:".about-wrapper__image",animation:{delay:600,origin:"bottom"}},{element:".about-wrapper__info",animation:{delay:1e3,origin:window.innerWidth>768?"left":"bottom"}},{element:".project-wrapper__text",animation:{delay:500,origin:window.innerWidth>768?"left":"bottom"}},{element:".project-wrapper__image",animation:{delay:1e3,origin:window.innerWidth>768?"right":"bottom"}},{element:".contact-wrapper",animation:{delay:800,origin:"bottom"}}];t={easing:"cubic-bezier(0.5, 0, 0, 1)",distance:"30px",duration:1e3,desktop:!0,mobile:!0},n.length&&(ScrollReveal({reset:!1}),n.forEach(({element:e,animation:i})=>{ScrollReveal().reveal(e,Object.assign({},t,i))})),function(){var t;let i=document.querySelectorAll(".js-tilt");((t=e)&&t.__esModule?t.default:t).init(i)}();//# sourceMappingURL=index.187dc2d9.js.map

//# sourceMappingURL=index.187dc2d9.js.map
