class Draggable {
    constructor(container, box) {
        this.box = box;
        this.container = container;

        const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
        const { width: boxWidth, height: boxHeight } = box.getBoundingClientRect();

        this.containerWidth = containerWidth;
        this.containerHeight = containerHeight;
        this.boxWidth = boxWidth;
        this.boxHeight = boxHeight;

        this.isDragging = null;
        this.originLeft = null;
        this.originTop = null;
        this.originX = null;
        this.originY = null;

        this.setEventListeners();
    }

    setEventListeners() {
        this.box.addEventListener("mousedown", (e) => {
            this.isDragging = true;
            this.originX = e.clientX;
            this.originY = e.clientY;
            this.originLeft = this.box.offsetLeft;
            this.originTop = this.box.offsetTop;
        });

        document.addEventListener("mouseup", (e) => {
            this.isDragging = false;
        });

        document.addEventListener("mousemove", (e) => {
            if (this.isDragging) {
                const diffX = e.clientX - this.originX;
                const diffY = e.clientY - this.originY;

                const endOfXPoint = this.containerWidth - this.boxWidth;
                const endOfYPoint = this.containerHeight - this.boxHeight;

                this.box.style.left = `${Math.min(Math.max(0, this.originLeft + diffX), endOfXPoint)}px`;
                this.box.style.top = `${Math.min(Math.max(0, this.originTop + diffY), endOfYPoint)}px`;
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.area');
    const box = container.querySelector('.area_box');

    const draggable = new Draggable(container, box);
});