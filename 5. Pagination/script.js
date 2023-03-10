class Pagination {
    constructor(commentContainerEl, paginationContainerEl, initialItems = []) {

        this.currentPageIndex = 0;
        this.maxPageItemCount = 5;
        this.commentItems = initialItems;
        this.commentContainerEl = commentContainerEl;
        this.paginationContainerEl = paginationContainerEl;
        this.render();

        const onClickButtons = (event) => {
            /**
             *  버튼 컨테이너에서 이벤트를 위임받아 처리
             */
            const { target } = event;
            if (target.tagName === 'BUTTON') {
                const index = Number(target.dataset.index);
                this.setCurrentPageIndex(index);
            }
        };

        this.paginationContainerEl
            .addEventListener('click', onClickButtons);

        /**
         * 랜더링된 페이지를 지우고 할당된 데이터를 모두 해제
         */
        this.destroy = () => {
            this.currentPageIndex = 0;
            this.commentItems = null;

            this.commentContainerEl.innerHTML = '';
            this.paginationContainerEl.innerHTML = '';

            paginationContainerEl.removeEventListener('click', onClickButtons);

            this.commentContainerEl = undefined;
            this.paginationContainerEl = undefined;
        };
    }

    makeCommentsHtml() {
        const {
            commentItems, currentPageIndex, maxPageItemCount
        } = this;
        const startIndex = currentPageIndex * maxPageItemCount;
        return commentItems
            .slice(startIndex, startIndex + maxPageItemCount)
            .map((item) => {
                const {
                    id, profile_url, author, content, createdAt
                } = item;
                return (
                    `<div class="commentWrap" data-id="${id}">
                    <img src="${profile_url}" alt="" />
                    ${author}
                    <div class="createdAt">
                        ${createdAt}
                    </div>
                    <div class="content">
                        ${content}
                    </div>
                </div>
                <hr />
                `
                );
            })
            .join('');
    }

    makePaginationHtml() {
        const {
            commentItems, currentPageIndex, maxPageItemCount,
        } = this;
        const count = Math.ceil(commentItems.length / maxPageItemCount);
        const buttons = [];
        for (let i = 0; i < count; i++) {
            buttons.push(
                i === currentPageIndex
                    ? `<button class="active" data-index=${i}>${(i + 1)}</button>`
                    : `<button data-index=${i}>${(i + 1)}</button>`
            );
        }
        return buttons.join('');
    }

    render() {
        const {
            commentContainerEl, paginationContainerEl
        } = this;
        if (commentContainerEl && paginationContainerEl) {
            commentContainerEl.innerHTML = this.makeCommentsHtml();
            paginationContainerEl.innerHTML = this.makePaginationHtml();
            return true;
        }
        return false;
    }

    setCurrentPageIndex(pageIndex) {
        this.currentPageIndex = pageIndex;
        this.render();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const commentContainerEl = document.querySelector('#commentContainer');
    const paginationContainerEl = document.querySelector('#pageContainer');
    
    const pagination = new Pagination(commentContainerEl, paginationContainerEl, comments);
})

