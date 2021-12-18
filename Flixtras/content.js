const overlayElementContainer = document.createElement("div");
const overlayElement = document.createElement("p");
overlayElementContainer.append(overlayElement);

var overlayTimer = 0;
var volume = {
    "increment": 1,
    "container": {
        "alignItems": "center",
        "justifyContent": "center",
    },
    "element": {
        "backgroundColor": "#000000",
        "color": "#ffffff",
        "opacity": "50%",
    },
};

// standard css for the overlay elements
$(overlayElementContainer).css({
    "pointerEvents": "none", // make mouse events go through to element behind
    "width": "100%",
    "height": "100%",
    "display": "flex",
});
$(overlayElement).css({
    "position": "relative",
    "width": "fit-content",
    "height": "fit-content",
    "padding": "0.5em",
    "paddingLeft": "1em",
    "paddingRight": "1em",
});

function updateOverlay() {
    $(overlayElementContainer).css(volume.container);
    $(overlayElement).css(volume.element);
}

// load stored settings
chrome.storage.local.get(["volume"], (result) => {
    if (result.volume.increment)
        volume.increment = result.volume.increment;
    if (result.volume.container)
        volume.container = result.volume.container;
    if (result.volume.element)
        volume.element = result.volume.element;

    updateOverlay();
});

// update settings when changes are made
chrome.storage.onChanged.addListener((changes) => {
    if (changes.volume) {
        if (changes.volume.newValue.increment != changes.volume.oldValue.increment) {
            volume.increment = changes.volume.newValue.increment;
        }

        let overlayUpdated = false;
        if (changes.volume.newValue.container != changes.volume.oldValue.container) {
            volume.container = changes.volume.newValue.container;
            overlayUpdated = true;
        }
        if (changes.volume.newValue.element != changes.volume.oldValue.element) {
            volume.element = changes.volume.newValue.element;
            overlayUpdated = true;
        }
        if (overlayUpdated) {
            updateOverlay();
        }
    }
});


$("div").on("wheel", "video", function (event) {
    event.preventDefault(); // prevent page scrolling on videos

    let newVolume = parseFloat((this.volume + ((event.originalEvent.deltaY < 0 ? 0.01 : -0.01) * volume.increment)).toFixed(2));

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