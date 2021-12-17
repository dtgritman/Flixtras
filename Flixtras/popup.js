chrome.storage.local.get(["volume"], (result) => {
    if (!result.volume) {
        return;
    }

    if (result.volume.increment)
        volIncrement.value = result.volume.increment;
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

    chrome.storage.local.set({
        "volume": {
            "increment": volIncrement.value,
            "backgroundColor": volBackgroundColor.value,
            "color": volColor.value
        }
    });
});
