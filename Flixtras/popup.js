chrome.storage.local.get(["volume"], (result) => {
    if (!result.volume) {
        return;
    }

    if (result.volume.increment)
        volIncrement.value = result.volume.increment;
    if (result.volume.container) {
        volAlignItems.value = result.volume.container.alignItems;
        volJustifyContent.value = result.volume.container.justifyContent;
    }
    if (result.volume.element) {
        volBackgroundColor.value = result.volume.element.backgroundColor;
        volColor.value = result.volume.element.color;
        volOpacity.value = result.volume.element.opacity;
    }
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
    });
});
