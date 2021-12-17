chrome.storage.local.get(["volumeBColor", "volumeTColor"], (result) => {
    if (result.volumeBColor)
        volumeBColor.value = result.volumeBColor;
    if (result.volumeTColor)
        volumeTColor.value = result.volumeTColor;
});

submitSettings.addEventListener("click", async () => {
    chrome.storage.local.set({ "volumeBColor": volumeBColor.value });
    chrome.storage.local.set({ "volumeTColor": volumeTColor.value });
});
