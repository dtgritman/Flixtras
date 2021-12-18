chrome.storage.local.get(["volume"], (result) => {
    if (!result.volume) {
        return;
    }

    if (result.volume.increment)
        volIncrement.value = result.volume.increment;
    if (result.volume.vertical)
        volOverlayV.value = result.volume.vertical;
    if (result.volume.horizontal)
        volOverlayH.value = result.volume.horizontal;
    if (result.volume.backgroundColor)
        volBackgroundColor.value = result.volume.backgroundColor;
    if (result.volume.color)
        volColor.value = result.volume.color;
    if (result.volume.opacity)
        volOverlayO.value = result.volume.opacity;
});

submitSettings.addEventListener("click", async () => {
    // make sure values are within their range
    if (volIncrement.value < 1 || volIncrement.value > 50)
        volIncrement.value = 0;
    if (volOverlayO.value < 10 || volOverlayO.value > 100)
        volOverlayH.value = 50;

    chrome.storage.local.set({
        "volume": {
            "increment": volIncrement.value,
            "alignItems": volOverlayV.value,
            "justifyContent": volOverlayH.value,
            "backgroundColor": volBackgroundColor.value,
            "color": volColor.value,
            "opacity": volOverlayO.value,
        }
    }, () => {
        alert("Settings updated! Refresh the page for the settings to take effect.");
    });
});
