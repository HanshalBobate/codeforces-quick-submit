(function() {
    let match = null;

    const patterns = [
        /\/problemset\/problem\/(\d+)\/([A-Za-z0-9]+)/,
        /\/contest\/(\d+)\/problem\/([A-Za-z0-9]+)/,
        /\/gym\/(\d+)\/problem\/([A-Za-z0-9]+)/
    ];

    for (const pattern of patterns) {
        match = window.location.pathname.match(pattern);
        if (match) break;
    }

    if (!match) return;

    const contestId = match[1];
    const problemIndex = match[2];
    const problemCode = `${contestId}${problemIndex}`;

    const menu = document.querySelector(".second-level-menu-list");

    if (!menu) return;

    if (document.getElementById("cfQuickSubmitBtn")) return;

    const btn = document.createElement("li");

    btn.innerHTML = `
        <a href="#" id="cfQuickSubmitBtn">
            Quick Submit
        </a>
    `;

    const submitLi = [...menu.querySelectorAll("li")]
        .find(li => li.textContent.trim() === "Submit");

    if (submitLi) {
        submitLi.insertAdjacentElement("afterend", btn);
    } else {
        menu.appendChild(btn);
    }

    btn.querySelector("a").addEventListener("click", function(e) {
        e.preventDefault();

        chrome.storage.local.set({
                cfProblemCode: problemCode
            },
            () => {
                window.open(
                    "https://codeforces.com/problemset/submit",
                    "_blank"
                );
            }
        );
    });
})();