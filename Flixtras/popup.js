chrome.storage.local.get(["volume"], (result) => {
    if (!result.volume) {
        return;
    }

    if (result.volume.increment)
        volIncrement.value = result.volume.increment;
    if (result.volume.overylayV)
        volOverlayV.value = result.volume.overylayV;
    if (result.volume.overylayH)
        volOverlayH.value = result.volume.overylayH;
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
    if (volOverlayV.value < 0 || volOverlayV.value > 2)
        volOverlayV.value = 1;
    if (volOverlayH.value < 0 || volOverlayH.value > 2)
        volOverlayH.value = 1;
    if (volOverlayO.value < 10 || volOverlayO.value > 100)
        volOverlayH.value = 50;

    chrome.storage.local.set({
        "volume": {
            "increment": volIncrement.value,
            "vertical": volOverlayV.value,
            "horizontal": volOverlayH.value,
            "backgroundColor": volBackgroundColor.value,
            "color": volColor.value,
            "opacity": volOverlayO.value,
        }
    }, () => {
        alert("Settings updated! Refresh the page for the settings to take effect.");
    });
});
