(function() {
    chrome.storage.local.get("cfProblemCode", (data) => {
        const problemCode = data.cfProblemCode;

        if (!problemCode) return;

        const input = document.querySelector(
            'input[name="submittedProblemCode"]'
        );

        if (!input) return;

        input.focus();

        input.value = problemCode;

        input.dispatchEvent(
            new Event("input", {
                bubbles: true
            })
        );

        input.dispatchEvent(
            new Event("change", {
                bubbles: true
            })
        );

        chrome.storage.local.remove("cfProblemCode");
    });
})();