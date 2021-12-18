const overlayElementContainer = document.createElement("div");
const overlayElement = document.createElement("p");
overlayElementContainer.append(overlayElement);

var overlayTimer = 0;
var volume = {
    "increment": 0.01,
    "align-items": "center",
    "justify-content": "center",
    "background-color": "#000000",
    "color": "#ffffff",
    "opacity": "50",
};

// standard css for the overlay elements
$(overlayElementContainer).css({
    "pointer-events": "none", // make mouse events go through to element behind
    "width": "100%",
    "height": "100%",
    "display": "flex",
});
$(overlayElement).css({
    "position": "relative",
    "width": "fit-content",
    "height": "fit-content",
    "padding": "0.5em",
    "padding-left": "1em",
    "padding-right": "1em",
});

function updateOverlay() {
    $(overlayElementContainer).css({
        "align-items": volume.align-items,
        "justify-content": volume.justify-content,
    });

    $(overlayElement).css({
        "background-color": volume.background-color,
        "color": volume.color,
        "opacity": volume.opacity + "%",
    });
}

// load stored settings
chrome.storage.local.get(["volume"], (result) => {
    if (result.volume.increment)
        volume.increment = result.volume.increment / 100;
    if (result.volume.vertical)
        volume.vertical = result.volume.vertical;
    if (result.volume.horizontal)
        volume.horizontal = result.volume.horizontal;
    if (result.volume.backgroundColor)
        volume.backgroundColor = result.volume.backgroundColor;
    if (result.volume.color)
        volume.color = result.volume.color;
    if (result.volume.opacity)
        volume.opacity = result.volume.opacity;

    updateOverlay();
});


$("div").on("wheel", "video", function (event) {
    event.preventDefault(); // prevent page scrolling on videos

    let newVolume = parseFloat((this.volume + ((event.originalEvent.deltaY < 0 ? 1 : -1) * volume.increment)).toFixed(2));

    // Ensure the new volume value is between 0 and 1
    if (newVolume < 0) {
        newVolume = 0;
    }
    else if (newVolume > 1) {
        newVolume = 1;
    }

    this.muted = (newVolume == 0); // mute volume if 0, otherwise make sure volume is unmuted
    this.volume = newVolume;

    // Set and display volume overlay
    displayOverlay(this.parentElement, (newVolume * 100).toFixed());


    return false; // cancels event to prevent it registering again on 1 scroll
});

function displayOverlay(parent, text, time = 1000) {
    overlayElement.innerText = text;
    parent.append(overlayElementContainer);
    clearTimeout(overlayTimer);
    overlayTimer = setTimeout(function () {
        overlayElementContainer.remove();
    }, time);
}