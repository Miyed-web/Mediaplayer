//select all the controls

const video_player = document.querySelector(".video_player");

const mainVideo = document.getElementById("mainVideo");
const  controls = document.querySelector(".controls");
const videoProgress = document.querySelector("#video-progress");
const  fast_rewind = document.getElementById("fast_rewind");
const playPause = document.getElementById("play");
 const fast_forward = document.getElementById("fast_forward");
  const volume = document.querySelector(".volume");
const  inputValue = document.querySelector("#inputValue");

 const current = document.getElementById("timeline");
const  totaldDuration = document.querySelector(".duration");
 const autoPlay = document.querySelector(".autoplay");
const  settings = document.querySelector(".settings");
 const fullscreen = document.querySelector(".fullscreen");
 const speedSettings = document.querySelector("#speed-settings");
const  playback = document.querySelectorAll(".playback li");
 const videoList = document.querySelectorAll(".video-list .vid");
const title = document.getElementById("title");

const fileInput = document.getElementById('file');




// video list



videoList.forEach(video =>{
  video.onclick = ()=>{
    videoList.forEach(vid => vid.classList.remove('active'));
    video.classList.add('active');
    if(video.classList.contains('active')){
      let src = video.children[0].getAttribute("src");
      mainVideo.src = src;
      let text = video.children[1].innerHTML
      title.innerHTML = text;
    }
    if (mainVideo.played) {
      mainVideo.pause();
      playPause.textContent = "play_arrow";
    }
    else {
      mainVideo.play();
      playPause.textContent = "pause";
    }
    title.style.fontSize="17px";
    title.style.color="#000";
  
  
  }
})

//input file video
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];

  if (file) {
    const videoURL = URL.createObjectURL(file);
    mainVideo.src = videoURL;
    
  }
  if(mainVideo.paused){
    playPause.textContent= "play_arrow"
  }else{
    playPause.textContent= "pause"
  }
});

// 
// 
totaldDuration.style.color="#cccc";
playPause.style.fontSize="2.5rem";

//play pause action

document.addEventListener("DOMContentLoaded", function() {
   playPause.addEventListener("click", () =>{
    
    if (mainVideo.paused) {
      mainVideo.play();
      playPause.textContent = "pause";
    }
    else {
      mainVideo.pause();
      playPause.textContent = "play_arrow";
    }
  });
  // when video is ended
  mainVideo.addEventListener("ended",()=>{
    playPause.textContent= "play_arrow"
  })
});
//fast forward

fast_forward.addEventListener("click",() =>{
 mainVideo.currentTime += 10;
 });

//fast rewind

 fast_rewind.addEventListener("click",( ) =>{
 mainVideo.currentTime -= 10;
 });
 // video duration
 
 
 mainVideo.addEventListener("loadeddata",()=>{
   totaldDuration.textContent = formatduration(mainVideo.duration);
   
 });
 mainVideo.addEventListener("timeupdate",()=>{
   current.textContent= formatduration(mainVideo.currentTime);
   
 })
 const timeformator = new Intl.NumberFormat(undefined,{
   minimumIntegerDigits:2,
   })
 function formatduration(time){
   const seconds = Math.floor(time % 60);
   const minutes = Math.floor(time / 60) % 60;
   const hours = Math.floor(time / 3600) ;
   if(hours=== 0){
     return `${minutes}:${timeformator.format(seconds)}`;
     
   }
   else{
     `${hours}:${timeformator.format(minutes)}:${timeformator.format(seconds)}`
   }
 }
 
 

 
 // current video timeline

setInterval(()=>{
    let videoDuration = mainVideo.duration;
    let videoCurrentTime = mainVideo.currentTime;
  videoProgress.value = (videoCurrentTime  / videoDuration) * 100;
},1000);

videoProgress.onchange=(e)=>{
  let videoDuration = mainVideo.duration;
  mainVideo.currentTime=(e.target.value * videoDuration) / 100;
}

  

 
 
 
 
// speed setting display
 speedSettings.style.display = "none";


settings.addEventListener("click", ()=> {
 
  speedSettings.style.display = speedSettings.style.display === "none" ? "block" : "none"; 
});

//  volume 

 inputValue.addEventListener('change',()=>{
   
   mainVideo.volume = inputValue.value / 100;
   if(inputValue.value ==0){
     volume.textContent = "volume_off"
   }else if(inputValue.value < 40){
     volume.textContent = "volume_down"
   }
   else{
     volume.textContent = "volume_up"
   }
 })
 volume.addEventListener("click",()=>{
   if(inputValue.value == 0){
     mainVideo.volume = 1;
     volume.textContent = "volume_up";
     inputValue.value = 100;
   }
   else{
     mainVideo.volume = 0;
     volume.textContent = "volume_off";
     inputValue.value = 0;
   }
 })
 // fullscreen
 
 fullscreen.addEventListener("click",()=>{
   if(!video_player.classList.contains("openFullScreen")){
     video_player.classList.add("openFullScreen");
     fullscreen.textContent= "fullscreen_exit";
     video_player.requestFullscreen();
   }else{
     video_player.classList.remove("openFullScreen");
     fullscreen.textContent= "fullscreen";
     document.exitFullscreen();
   }
   
 })
 // auto play
 
window.addEventListener('DOMContentLoaded', () => {
  

  autoPlay.addEventListener('click', () => {
    autoPlay.classList.toggle('active'); 
   
  });
  mainVideo.addEventListener("ended",()=>{
    if(autoPlay.classList.contains("active")){
      mainVideo.play()
    }
  })
});



// playback speed

playback.forEach((e)=>{
  e.addEventListener("click",()=>{
    playback.forEach(e=>{
  e.classList.remove("active")
})
    e.classList.add("active")
   let speed = e.getAttribute("data-speed");
   mainVideo.playbackRate = speed
 
  })
})



video_player.addEventListener("touchstart",( )=>{
  controls.classList.add("active")
setTimeout(function() {
  controls.classList.remove("active")
}, 8000);
  
  
})

video_player.addEventListener("touchmove",( )=>{
  if (video_player.classList.contains("paused")){
    controls.classList.remove("active")
  }else{
    controls.classList.add("active")
  }
})

// store the video duration and path to local storage


window.addEventListener("unload",( )=>{
  let setDuration = localStorage.setItem('duration',`${mainVideo.currentTime }`)
let setSrc = localStorage.setItem('src',`${mainVideo.getAttribute("src") }`)
  
})

window.addEventListener("load",( )=>{
  let getDuration = localStorage.getItem("duration");
  let getSrc = localStorage.getItem("src");
  if (getSrc) {
    mainVideo.src = getSrc;
    mainVideo.currentTime = getDuration;
  }
});

mainVideo.addEventListener("contextmenu", (e)=>{
  e.preventDefault();
})

const historyList = document.getElementById("historyList");

// Load history from localStorage
const videoHistory = JSON.parse(localStorage.getItem("videoHistory")) || [];
displayHistory();

function playVideo(videoUrl) {
  mainVideo.src = videoUrl;
  mainVideo.play();

  // Add video to history (if not already present)
  if (!videoHistory.includes(videoUrl)) {
    videoHistory.push(videoUrl);
    localStorage.setItem("videoHistory", JSON.stringify(videoHistory));
    displayHistory();
  }
}

function displayHistory() {
  historyList.innerHTML = "";
  videoHistory.forEach((videoUrl) => {
    const historyItem = document.createElement("li");
    historyItem.textContent = videoUrl;
    historyItem.addEventListener("click", () => playVideo(videoUrl));
    historyList.appendChild(historyItem);
  });
}
