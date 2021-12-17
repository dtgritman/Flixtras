chrome.storage.local.get(["volumeBColor", "volumeTColor"], (result) => {
    if (result.volumeBColor)
        volumeBColor.value = result.volumeBColor;
    if (result.volumeTColor)
        volumeTColor.value = result.volumeTColor;
});

submitColors.addEventListener("click", async () => {
    setVolumeBackgroundColor(volumeBColor.value);
    setVolumeTextColor(volumeTColor.value);
});

function setVolumeBackgroundColor(newColor) {
    chrome.storage.local.set({ "volumeBColor": newColor });
}

function setVolumeTextColor(newColor) {
    chrome.storage.local.set({ "volumeTColor": newColor });
}