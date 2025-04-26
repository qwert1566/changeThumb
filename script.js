document.querySelector("#selectBtn").addEventListener("click", () => document.querySelector("input[type='file']").click());
document.querySelector("input[type='file']").addEventListener("change", () => {
    if (!(document.querySelector('[type="file"]').files[0].type == "image/png"))
        alarm("png만 선택하실 수 있습니다\ngif는 apng로 변환 후 사용해 주세요", "https://ezgif.com/gif-to-apng");
    else document.querySelector("#selectBtn").style.backgroundColor = "cornflowerblue";
    if (document.querySelector('[type="file"]').files[0].size > 1000000)
        alarm("용량이 매우 큽니다\n적용되지 않을 수 있습니다", "https://ezgif.com/apng-maker");
});

document.querySelector("#saveBtn").addEventListener("click", () => {
    if (document.querySelector("input[type='file']").files[0] == undefined) return;
    let reader = new FileReader();
    reader.readAsDataURL(document.querySelector("input[type='file']").files[0]);
    reader.addEventListener("load", (data) => {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                world: "MAIN",
                func: (image) => (Entry.canvas_.toDataURL = () => image),
                args: [data.target.result],
            });
        });
        document.querySelector("div:not(#alarm)").innerHTML = "";
        document.querySelector("div:not(#alarm)").appendChild(document.createElement("span"));
        document.querySelector("span:not(#alarm>span)").innerText = "작품을 저장하여 주십시오";
    });
});

function alarm(msg, web) {
    document.querySelector("#alarm>span").innerText = msg;
    document.querySelector("#alarm>span").appendChild(document.createElement("br"));
    document.querySelector("#alarm>span").appendChild(document.createElement("a"));
    document.querySelector("#alarm>span>a").innerText = web;
    document.querySelector("#alarm>span>a").href = web;
    document.querySelector("#alarm>span>a").target = "_blank";
    document.querySelector("#alarm").style.display = "flex";
}
