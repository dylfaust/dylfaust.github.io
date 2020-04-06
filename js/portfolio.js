var leftSlots;
var offsetActive = false;

function setPortfolioActive(value) {
    if (value) {
        window.addEventListener("resize", checkDetailResize);

        leftSlots = document.getElementsByClassName("aos-slot-offset-vert");
        // Init
        checkDetailResize();
    } else {
        window.removeEventListener("resize", checkDetailResize);
    }
}

function checkDetailResize() {
    var w = document.documentElement.clientWidth;

    if (w < 950 && w > 767.98) {
        if (offsetActive == false) {
            offsetActive = true;
            for (let i = 0; i < leftSlots.length; i++) {
                let leftSlot = leftSlots[i];
                leftSlot.offset = leftSlot.clientHeight + 26;
            }
        }
        //offset by height - 26px

    } else if (offsetActive) {
        offsetActive = false;
        for (let i = 0; i < leftSlots.length; i++) {
            let leftSlot = leftSlots[i];
            leftSlot.offset = 0;
        }
    }
}