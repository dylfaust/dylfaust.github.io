var leftSlots;
var rightSlots;
var offsetLeft = false;
var offsetRight = false;

function setPortfolioActive(value) {
    if (value) {
        window.addEventListener("resize", checkDetailResize);

        leftSlots = document.getElementsByClassName("aos-slot-offset-left");
        rightSlots = document.getElementsByClassName("aos-slot-offset-right");
        // Init
        checkDetailResize();
    } else {
        window.removeEventListener("resize", checkDetailResize);
    }
}

function checkDetailResize() {
    var w = document.documentElement.clientWidth;

    if (w < 950 && w > 767.98) {
        if (offsetLeft == false) {
            offsetLeft = true;
            for (let i = 0; i < leftSlots.length; i++) {
                let leftSlot = leftSlots[i];
                leftSlot.offset = leftSlot.clientHeight + 26;
            }
        }
        //offset by height - 26px

    } else if (offsetLeft) {
        offsetLeft = false;
        for (let i = 0; i < leftSlots.length; i++) {
            let leftSlot = leftSlots[i];
            leftSlot.offset = 0;
        }
    }

    if (w > 950) {
        if (offsetRight == false) {
            offsetRight = true;
            for (let i = 0; i < rightSlots.length; i++) {
                let rightSlot = rightSlots[i];
                rightSlot.offset = rightSlot.clientHeight * -.25;
            }
        } else if (offsetRight == true) {
            for (let i = 0; i < rightSlots.length; i++) {
                let rightSlot = rightSlots[i];
                rightSlot.offset = 0;
            }
        }
    }
}