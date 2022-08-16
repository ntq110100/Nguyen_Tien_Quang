gsap.registerPlugin(ScrollTrigger);let locoScroll,pageId,WORK,rect,workPos,mRg,BOTTOM,Rect,bottomPos,mrg;const body=document.body,select=a=>document.querySelector(a),selectAll=a=>document.querySelectorAll(a),loader=select(".js-loader"),loaderInner=select("#js-loader__inner"),progressBar=select(".js-loader__progress"),loaderMask=select(".js-loader__mask");function pageTransitionIn({container:b}){let a=gsap.timeline({defaults:{duration:1,ease:"power2.inOut"}});return a.fromTo(loader,{yPercent:-100},{yPercent:0}).fromTo(loaderMask,{yPercent:80},{yPercent:0},0).to(b,{y:150},0),a}function pageTransitionOut({container:b}){let a=gsap.timeline({defaults:{duration:1,ease:"power2.inOut"},onComplete:()=>initScript()});return a.to(loader,{yPercent:100}).to(loaderMask,{yPercent:-80},0).from(b,{y:-150},0),a}function initPageTransitions(){function a(a){(locoScroll=new LocomotiveScroll({el:a.querySelector("[data-scroll-container]"),smooth:!0,tablet:{smooth:!0},smartphone:{smooth:!0},multiplier:.6})).on("scroll",ScrollTrigger.update),ScrollTrigger.scrollerProxy("[data-scroll-container]",{scrollTop(a){return arguments.length?locoScroll.scrollTo(a,0,0):locoScroll.scroll.instance.scroll.y},getBoundingClientRect:()=>({top:0,left:0,width:window.innerWidth,height:window.innerHeight}),pinType:a.querySelector("[data-scroll-container]").style.transform?"transform":"fixed"});let b=selectAll(".c-scrollbar");b.length>1&&b[0].remove(),ScrollTrigger.addEventListener("refresh",()=>locoScroll.update()),ScrollTrigger.refresh()}barba.hooks.before(()=>{select("html").classList.add("is-transitioning")}),barba.hooks.after(()=>{select("html").classList.remove("is-transitioning"),locoScroll.update()}),barba.hooks.enter(()=>{window.scrollTo(0,0)}),barba.init({sync:!0,timeout:7e3,transitions:[{name:"overlay-transition",once(b){a(b.next.container),pageId=b.next.namespace,main_script(),preloader_move(),"home"==pageId?(locoScroll.stop(),workPos=(rect=(WORK=document.querySelector("#work")).getBoundingClientRect()).top,mRg=2.29*window.innerWidth/100,first_load_home(),initLoader(b.next.namespace)):(bottomPos=(Rect=(BOTTOM=document.querySelector("#bottom-work")).getBoundingClientRect()).top,mrg=2.29*window.innerWidth/100,initLoader(b.next.namespace))},async leave(a){pageTransitionIn(a.current),await delay(3000),a.current.container.remove()},async enter(a){pageTransitionOut(a.next)},async beforeEnter(b){ScrollTrigger.getAll().forEach(a=>a.kill()),locoScroll.destroy(),a(b.next.container),main_script(),"home"==(pageId=b.next.namespace)?(workPos=(rect=(WORK=document.querySelector("#work")).getBoundingClientRect()).top,mRg=2.29*window.innerWidth/100):(bottomPos=(Rect=(BOTTOM=document.querySelector("#bottom-work")).getBoundingClientRect()).top,mrg=2.29*window.innerWidth/100)}}]})}function initLoader(){gsap.set(loader,{yPercent:-100}),initScript();let a=gsap.timeline({id:"tlLoaderOut",defaults:{duration:1.2,ease:"power2.inOut"},delay:1});a.from(".site-main",{y:150},.2),"home"!=pageId&&gsap.timeline().add(a)}function delay(a){return a=a||2e3,new Promise(b=>{setTimeout(()=>{b()},a)})}function initScript(){select("body").classList.remove("is-loading"),"home"==pageId?home_script():sub_script()}gsap.set(loader,{autoAlpha:1}),initPageTransitions(),CustomEase.create("customEase",".3,.86,.36,.95"),CustomEase.create("strongEase",".9,0,.1,1");const tll=gsap.timeline({paused:"true",onComplete(){locoScroll.start()}});tll.to("#percent",{duration:.35,color:"#99FF00",ease:"strongEase",delay:.5}),tll.to("#percent",{duration:.35,ease:"strongEase",scale:0,opacity:0,delay:.5}),tll.to("#hi",{opacity:1,duration:.5,ease:"customEase"}),tll.to("#hi",{opacity:0,duration:.5,ease:"customEase",delay:.5}),tll.to("#imntq",{opacity:1,duration:.5,ease:"customEase"}),tll.to("#imntq",{opacity:0,duration:.5,ease:"customEase",delay:.5}),tll.to("#preloader",{duration:1,ease:"customEase",height:"0%"});var id,width=0;function preloader_move(){id=setInterval(frame,40)}function frame(){width>=100?(clearInterval(id),tll.play()):(width++,document.getElementById("percent").innerHTML=width)}function disableScroll(){scrollTop=window.pageYOffset||document.documentElement.scrollTop,scrollLeft=window.pageXOffset||document.documentElement.scrollLeft,window.onscroll=function(){window.scrollTo(scrollLeft,scrollTop)}}function enableScroll(){window.onscroll=function(){}}function first_load_home(){gsap.set("#menu-link span, #logo img",{y:"-100% - 2.29vw",opacity:0}),gsap.set("#bottomleft, #bottomright",{y:"5.49vw",opacity:0}),gsap.set(".behind-dp",{opacity:0}),new SplitType(".text-lines",{types:"lines"}),new SplitType(".text-lines .line",{types:"lines"}),tll.from(".text-lines .line .line",{y:"100%",duration:.75,stagger:.2}),tll.fromTo("#ntq",{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",webkitClipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"},{clipPath:"polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",webkitClipPath:"polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",duration:1,ease:"strongEase"}),tll.to(".behind-dp",{opacity:1,duration:0}),tll.to("nav ul span, #logo img",{y:"0%",opacity:1,duration:.7,ease:"customEase",delay:-0.75}),tll.to("#bottomleft, #bottomright",{y:"0%",opacity:1,duration:.7,ease:"customEase",delay:-0.5})}function tilt_effect(){VanillaTilt.init(document.querySelectorAll(".bigtilt"),{max:20,scale:1.1,speed:1500})}function ntq_scale(){gsap.to("#ntq",{scale:7.5,opacity:0,transformOrigin:"50% 28%",scrollTrigger:{scroller:"[data-scroll-container]",trigger:"#ntq",start:"top top",end:1.2*window.innerHeight,scrub:!0}})}function text_reveal(){let a=Splitting({target:document.querySelector(".text-reveal-1"),by:"lines"}),b=document.querySelector(".text-reveal-2"),c=Splitting({target:b,by:"lines"});a[0].lines.forEach(a=>{gsap.from(a,{opacity:0,y:"100%",ease:"power4.out",scrollTrigger:{scroller:"[data-scroll-container]",trigger:a,start:"top 90%",end:"top 65%",scrub:!0}})}),c[0].lines.forEach(a=>{gsap.from(a,{opacity:0,y:"100%",ease:"power4.out",scrollTrigger:{scroller:"[data-scroll-container]",trigger:a,start:"top 80%",end:"top 40%",scrub:!0}})})}function project_color(){$(".project").hover(function(){var a=$(this).attr("data-color");$("#container").css("background",a)}),$(".project").mouseleave(function(){$("#container").css("background","#08060A")})}function image_hover(){let a=document.querySelectorAll(".project-images img"),b={x:window.innerWidth/2,y:window.innerHeight/2},c={x:b.x,y:b.y},d=gsap.quickSetter(a,"x","px"),e=gsap.quickSetter(a,"y","px");window.addEventListener("mousemove",a=>{c.x=a.clientX-mRg,c.y=a.clientY+locoScroll.scroll.instance.scroll.y-workPos});var f=0,g=0;gsap.ticker.add(()=>{let a=1-Math.pow(.92,gsap.ticker.deltaRatio());b.x+=(c.x-b.x-f)*a,b.y+=(c.y-b.y-g)*a,d(b.x),e(b.y)}),gsap.utils.toArray("#work a").forEach(a=>{let{label:b}=a.dataset;a.addEventListener("mouseenter",()=>{f=$(`img[alt=${b}]`).width()/2,g=$(`img[alt=${b}]`).height()/2,gsap.to(`img[alt=${b}]`,{opacity:1,scale:1}),gsap.set(`img[alt=${b}]`,{zIndex:4}),gsap.set(`a[data-label=${b}]`,{zIndex:5})}),a.addEventListener("mouseleave",()=>{gsap.to(`img[alt=${b}]`,{opacity:0,zIndex:-1,scale:.5}),gsap.set(`a[data-label=${b}]`,{zIndex:0})})})}function item_lines(){gsap.utils.toArray("#work .project-lines").forEach(a=>{gsap.from(a,{transformOrigin:"0%",scaleX:0,scrollTrigger:{scroller:"[data-scroll-container]",trigger:a,start:"top bottom",end:"top 33.33%",scrub:!0}})})}function contact_rec(){gsap.from("#our-dream",{y:"100%",ease:"customEase",duration:1,scrollTrigger:{scroller:"[data-scroll-container]",trigger:"#our-dream",start:"top 85%",toggleActions:"restart none none reverse"}})}function main_script(){custom_cursor(),tilt_effect()}function home_script(){ntq_scale(),text_reveal(),project_color(),image_hover(),item_lines(),contact_rec()}function sub_script(){let c=0;locoScroll.on("scroll",function(){locoScroll.scroll.instance.scroll.y>0&&locoScroll.scroll.instance.scroll.y>c?($("subnav").addClass("title-onScroll"),$("#title").addClass("text40"),$("#title").removeClass("text100 textoutline"),c=locoScroll.scroll.instance.scroll.y):(locoScroll.scroll.instance.scroll.y<=50&&locoScroll.scroll.instance.scroll.y<c&&($("subnav").removeClass("title-onScroll"),$("#title").removeClass("text40"),$("#title").addClass("text100 textoutline")),c=locoScroll.scroll.instance.scroll.y)}),gsap.utils.toArray(".detail-img").forEach(a=>{gsap.from(a,{y:"10vw",opacity:0,duration:1.5,ease:"customEase",stagger:.5,scrollTrigger:{scroller:"[data-scroll-container]",trigger:a,start:"top 98%",toggleActions:"restart none none reverse"}})});let a=document.querySelectorAll("#bottom-work .project-images img"),b={x:window.innerWidth/2,y:window.innerHeight/2},d={x:b.x,y:b.y},e=gsap.quickSetter(a,"x","px"),f=gsap.quickSetter(a,"y","px");window.addEventListener("mousemove",a=>{d.x=a.clientX-mrg,d.y=a.clientY+locoScroll.scroll.instance.scroll.y-bottomPos});var g=0,h=0;gsap.ticker.add(()=>{let a=1-Math.pow(.92,gsap.ticker.deltaRatio());b.x+=(d.x-b.x-g)*a,b.y+=(d.y-b.y-h)*a,e(b.x),f(b.y)}),gsap.utils.toArray("#bottom-work a").forEach(a=>{let{label:b}=a.dataset;a.addEventListener("mouseenter",()=>{g=$(`img[alt=${b}]`).width()/2,h=.85*$(`img[alt=${b}]`).height(),gsap.to(`img[alt=${b}]`,{opacity:1,scale:1}),gsap.set(`img[alt=${b}]`,{zIndex:4}),gsap.set(`a[data-label=${b}]`,{zIndex:5})}),a.addEventListener("mouseleave",()=>{gsap.to(`img[alt=${b}]`,{opacity:0,zIndex:-1,scale:.5}),gsap.set(`a[data-label=${b}]`,{zIndex:0})})})}
