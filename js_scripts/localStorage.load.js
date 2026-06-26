(() => {
    window.__localStorage_isLoading = true; // prevent triggering save callback while loading
    try {
        const json_str = document.getElementById('localStorage-old').textContent;
        Object.entries(JSON.parse(json_str)).forEach(([key, value]) => {
            localStorage.setItem(key, value);
        });
    } catch(e) {
        console.error("[LocalStorage] Load error ", e);
    } finally {
        window.__localStorage_isLoading = false;
    }
})();
