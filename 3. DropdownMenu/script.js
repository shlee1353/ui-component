const websiteIndex = selectorDataItems.reduce((map, { id, label }) => {
    map[id] = label;
    return map;
}, {});

class DropdownList {
    constructor(selectorEl, selectorOptionsEl, dataItems = [], updateSelectorIndexCallbackFn = () => null) {

        this.selectorEl = selectorEl;
        this.selectorOptionsEl = selectorOptionsEl;
        this.currentSelectedIndex = 0;
        this.dataItems = dataItems;

        this.updateSelectorIndexCallbackFn = updateSelectorIndexCallbackFn;
        this.renderSelector();
        this.renderSelectorOptions();
        this.bindSelectorEvents();
        this.bindSelectorOptionsEvents();
    }

    getCurrentSelectedIndex() {
        return this.currentSelectedIndex;
    }

    getCurrentSelectedItem() {
        const { dataItems, currentSelectedIndex } = this;
        return dataItems[currentSelectedIndex];
    }

    renderSelector() {
        const { currentSelectedIndex, dataItems, selectorEl } = this;
        const selectedItem = dataItems[currentSelectedIndex];
        selectorEl.innerHTML = `
        <div class="dropdown-select-label-container">
            <span class="dropdown-select-label">${selectedItem.label}</span>
            <div class="dropdown-select-arrow-container">
                <div class="dropdown-select-arrow"></div>
            </div>
        </div>
        `;
    }

    renderSelectorOptions() {
        const { currentSelectedIndex, selectorOptionsEl, selectorEl } = this;
        const items = this.dataItems.map((item, index) => {
            const { label } = item;
            return `
            <div class="dropdown-item-box ${currentSelectedIndex === index ? 'selected' : ''}" data-index=${index}>
                <span>${label}</span>
            </div>
            `;
        });
        const { height } = selectorEl.getBoundingClientRect();
        selectorOptionsEl.style.cssText = `display: none; position: absolute; top: ${height}px; `;
        selectorOptionsEl.innerHTML = `
        <div class="dropdown-item-list-box">
            ${items.join('')}
        </div>
        `;
    }

    bindSelectorEvents() {
        const { selectorEl, selectorOptionsEl } = this;
        selectorEl.addEventListener('click', (e) => {
            e.preventDefault();
            selectorOptionsEl.style.display = 'block';
        });
    }

    bindSelectorOptionsEvents() {
        const {
            dataItems,
            selectorOptionsEl,
        } = this;

        selectorOptionsEl.addEventListener('click', ({ target }) => {
            let el = target;

            if (el.tagName === 'SPAN') {
                el = el.parentElement;
            }
            
            const index = Number(el.dataset.index);
            this.currentSelectedIndex = index;
 
            this.renderSelector();
            this.updateSelectorIndexCallbackFn(dataItems[index], index);
        });

        document.addEventListener('click', () => {
            this.selectorOptionsEl.style.display = 'none';
        }, 'click')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const selectorEl = document.querySelector('#dropdown');
    const selectorOptionsEl = document.querySelector('.back-drop');
    const userListEl = document.querySelector('#userlist');

    const renderUserList = (item) => {
        const { id } = item;
        const userItems = userDataItems.filter(({ favorites }) => {
            return id === '' ? true : id === favorites;
        });
        
        userListEl.innerHTML = userItems.map((user) => {
            const { favorites, userName } = user;
            const favoriteLabel = websiteIndex[favorites];
            return (`
            <div>
                <span>User: ${userName}</span>,
                <span>favorites: ${favoriteLabel}</span>
            </div>`);
        }).join('');
    };

    const dropDownList = new DropdownList(selectorEl, selectorOptionsEl, selectorDataItems, renderUserList);
    const currentSelectedItem = dropDownList.getCurrentSelectedItem();

    renderUserList(currentSelectedItem);
});