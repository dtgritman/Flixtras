chrome.storage.local.get(["volume"], (result) => {
    if (!result.volume) {
        return;
    }

    if (result.volume.increment)
        volIncrement.value = result.volume.increment;
    if (result.volume.alignItems)
        volOverlayV.value = result.volume.alignItems;
    if (result.volume.justifyContent)
        volOverlayH.value = result.volume.justifyContent;
    if (result.volume.backgroundColor)
        volBackgroundColor.value = result.volume.backgroundColor;
    if (result.volume.color)
        volColor.value = result.volume.color;
    if (result.volume.opacity)
        volOverlayO.value = result.volume.opacity;
});

submitSettings.addEventListener("click", async () => {
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
