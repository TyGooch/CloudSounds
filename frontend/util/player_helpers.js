export function playTrack(el) {
  //remove event listeners from other canvases
  if ($('.playing').length){
    $('.waveform').unbind('click');
  }
  //Add playing class to playlist and play song.
  $('#track-' + $(el).attr('id')).addClass('playing').siblings().removeClass('playing');
  let trackID = $(el).attr('id');
  window.audio.load($(el).attr('data-src'));
  $('#wrapper').removeClass('hidden');
  window.audio.play();

  var playingTrackID = $('.playing').attr('id').split('-')[1];
  var can = $('#waveform-' + playingTrackID);
  //for detectng clicks on the waveform
  function getPosition(event)
  {
    var x = new Number();
    var y = new Number();
    var canvas = $('#waveform-' + playingTrackID)[0];

    if (event.x != undefined && event.y != undefined)
    {
      x = event.x;
      y = event.y;
    }
    else // Firefox method to get the position
    {
      x = event.clientX + document.body.scrollLeft +
          document.documentElement.scrollLeft;
      y = event.clientY + document.body.scrollTop +
          document.documentElement.scrollTop;
    }
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    var wave = $('#waveform-' + trackID + ' wave canvas');
    var waveWidth = wave.width();
    window.audio.skipTo( x / waveWidth);
  }
  can.on("click", getPosition);
}

export function addOlListener() {
  $('ol').click( e => {
    $(e.target).addClass('playing').siblings().removeClass('playing');
    window.audio.load($(e.target).attr('data-src'));
    $('#wrapper').removeClass('hidden');
    window.audio.play();
  });
}