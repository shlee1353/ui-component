class Scrollspy {
    constructor(navElem, contentsElem) {
        this.navElem = navElem;
        this.navItems = Array.from(this.navElem.children);
        this.contentsElem = contentsElem;
        this.contentItems = Array.from(this.contentsElem.children);
        this.offsetTops = [];

        this.initScrollspy();
    }

    getOffsetTops() {
        this.offsetTops = this.contentItems.map(elem => {
            const [ofs, clh] = [elem.offsetTop, elem.clientHeight];
            return [ofs - clh / 2, ofs + clh / 2];
        });
    }

    initScrollspy() {
        this.getOffsetTops();
    }

    setEventListeners(scrollspy) {
        window.addEventListener('resize', scrollspy.getOffsetTops.bind(scrollspy));

        window.addEventListener("scroll", (e) => {
            const { scrollTop } = e.target.scrollingElement;
            const targetIndex = this.offsetTops.findIndex(([from, to]) => (
                scrollTop >= from && scrollTop < to
            ));

            this.navItems.forEach((c, i) => {
                if (i !== targetIndex)
                    c.classList.remove("on");
                else
                    c.classList.add("on");
            });
        });

        this.navElem.addEventListener("click", (e) => {
            const targetElem = e.target;
            if (targetElem.tagName === "BUTTON") {
                const targetIndex = this.navItems.indexOf(targetElem.parentElement);
                this.contentItems[targetIndex].scrollIntoView({
                    block: "start",
                    behavior: "smooth",
                });
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const navElem = document.querySelector("#nav");
    const contentsElem = document.querySelector("#contents");

    const scrollspy = new Scrollspy(navElem, contentsElem);

    scrollspy.setEventListeners(scrollspy);
});

// 1. 이벤트 헨들러 내부의 this는 이벤트 객체의 currentTarget 프로퍼티와 동일하기 대문에 bind를 사용해서 다시 연결

