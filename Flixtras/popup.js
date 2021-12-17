chrome.storage.local.get(["volume"], (result) => {
    if (!result.volume) {
        return;
    }

    if (result.volume.backgroundColor)
        volBackgroundColor.value = result.volume.backgroundColor;
    if (result.volume.color)
        volColor.value = result.volume.color;
});

submitSettings.addEventListener("click", async () => {
    chrome.storage.local.set({
        "volume": {
            "backgroundColor": volBackgroundColor.value,
            "color": volColor.value
        }
    });
});
