(() => {
    window.addEventListener('localStorageUPD', (e) => {
        if (window.__localStorage_isLoading) return;
        try {
            var localStorage_json = JSON.stringify(localStorage);
            if (typeof pycmd !== 'undefined') {
                pycmd("save_localStorage::" + localStorage_json);
            }
        } catch(err) {
            console.error("localStorage listener error: ", err);
        }
    });

    var originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
        originalSetItem.apply(this, arguments);
        window.dispatchEvent(new Event('localStorageUPD'));
    };

    var originalRemoveItem = localStorage.removeItem;
    localStorage.removeItem = function(key) {
        originalRemoveItem.apply(this, arguments);
        window.dispatchEvent(new Event('localStorageUPD'));
    };

    var originalClear = localStorage.clear;
    localStorage.clear = function() {
        originalClear.apply(this, arguments);
        window.dispatchEvent(new Event('localStorageUPD'));
    };
})();
