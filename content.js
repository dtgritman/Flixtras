var volumeAdj = 5;

$("div").on("wheel", "video", function(event) {
    event.preventDefault(); // prevent page scrolling on videos

    let newVolume = parseFloat((this.volume + ((event.originalEvent.deltaY < 0 ? 0.01 : -0.01) * volumeAdj)).toFixed(2));
    if (newVolume < 0) {
        newVolume = 0;
    }
    else if (newVolume > 1) {
        newVolume = 1;
    }

    this.muted = (newVolume == 0); // mute volume if 0, otherwise make sure volume is unmuted
    this.volume = newVolume;

    return false; // cancels event to prevent it registering again on 1 scroll
});
