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
});

submitSettings.addEventListener("click", async () => {
    if (volIncrement.value < 1)
        volIncrement.value = 1;
    else if (volIncrement.value > 100)
        volIncrement.value = 100;

    if (volOverlayV.value < 1 || volOverlayV.value > 3)
        volOverlayV.value = 2;
    if (volOverlayH.value < 1 || volOverlayH.value > 3)
        volOverlayH.value = 2;

    chrome.storage.local.set({
        "volume": {
            "increment": volIncrement.value,
            "vertical": volOverlayV.value,
            "horizontal": volOverlayH.value,
            "backgroundColor": volBackgroundColor.value,
            "color": volColor.value
        }
    }, () => {
        alert("Settings updated! Refresh the page for the settings to take effect.");
    });
});
