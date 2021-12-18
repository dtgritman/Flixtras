chrome.storage.local.get(["volume"], (result) => {
    if (!result.volume) {
        return;
    }

    if (result.volume.increment)
        volIncrement.value = result.volume.increment;
    if (result.volume.alignItems)
        volAlignItems.value = result.volume.alignItems;
    if (result.volume.justifyContent)
        volJustifyContent.value = result.volume.justifyContent;
    if (result.volume.backgroundColor)
        volBackgroundColor.value = result.volume.backgroundColor;
    if (result.volume.color)
        volColor.value = result.volume.color;
    if (result.volume.opacity)
        volOpacity.value = result.volume.opacity;
});

submitSettings.addEventListener("click", async () => {
    chrome.storage.local.set({
        "volume": {
            "increment": volIncrement.value,
            "container": {
                "alignItems": volAlignItems.value,
                "justifyContent": volJustifyContent.value,
            },
            "element": {
                "backgroundColor": volBackgroundColor.value,
                "color": volColor.value,
                "opacity": volOpacity.value,
            },
        }
    }, () => {
        alert("Settings updated! Refresh the page for the settings to take effect.");
    });
});
