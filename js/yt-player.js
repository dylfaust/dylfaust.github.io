
// 2. This code loads the IFrame Player API code asynchronously.
var tag;
var videoReady = false;
var animReady = false;
var startSeconds = 233;
var endSeconds = 671;
var videoId = 'btmN-bWwv0A';
var player;

function setupYtPlayer()
{
  videoReady = false;
  if (tag == null)
  {
    tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  else
  {
    myYouTubeIframeAPIReady();
  }

}

// HACK DUPE FUNCTION
function myYouTubeIframeAPIReady()
{
  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId: videoId,
    playerVars: {
      // autoplay: 1, // Auto-play the video on load
      controls: 0, // Show pause/play buttons in player
      showinfo: 0, // Hide the video title
      modestbranding: 1, // Hide the Youtube Logo
      fs: 0, // Hide the full screen button
      cc_load_policy: 0, // Hide closed captions
      iv_load_policy: 3, // Hide the Video Annotations
      start: startSeconds,
      end: endSeconds,
      autohide: 1, // Hide video controls when playing
      loop: 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady()
{
  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId: videoId,
    playerVars: {
      // autoplay: 1, // Auto-play the video on load
      controls: 0, // Show pause/play buttons in player
      showinfo: 0, // Hide the video title
      modestbranding: 1, // Hide the Youtube Logo
      fs: 0, // Hide the full screen button
      cc_load_policy: 0, // Hide closed captions
      iv_load_policy: 3, // Hide the Video Annotations
      start: startSeconds,
      end: endSeconds,
      autohide: 1, // Hide video controls when playing
      loop: 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event)
{
  videoReady = true;
  player.setVolume(0);
  // event.target.playVideo();
  attemptPlayVideo(false);
  // event.target.playVideo();
  // event.target.mute();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event)
{
  if (event.data === YT.PlayerState.ENDED)
  {
    player.loadVideoById({
      videoId: videoId,
      startSeconds: startSeconds,
      endSeconds: endSeconds

    });

  }
  // if (event.data == YT.PlayerState.PLAYING && !done) {
  //   setTimeout(stopVideo, 6000);
  //   done = true;
  // }
}
// function stopVideo() {
// player.stopVideo();
// }

function attemptPlayVideo(fromIntroAnim)
{
  if (fromIntroAnim)
    animReady = true;

  if (videoReady && animReady)
  {
    player.playVideo();
  }
}