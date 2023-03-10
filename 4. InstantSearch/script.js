class InstantSearch {
    constructor(configuration) {
        this.DEFAULT_DELAY_TIME = 500;
        this.subscription = null;
        this.callback = configuration.changeEvent;
        this.delayTime = configuration.delayTime || this.DEFAULT_DELAY_TIME;
        this.textinputElement = this.initialize(document.querySelector(configuration.selector), configuration);
        this.eventBinding();
    }

    initialize(selector, configuration) {
        const textinput = document.createElement('input');
        textinput.setAttribute('type', 'text');
        textinput.setAttribute('placeholder', configuration.placeholder);
        textinput.classList.add(configuration.css);
        selector.appendChild(textinput);
        return textinput;
    }

    eventBinding() {
        const dispatchEvent = debounce((targetText) => {
            this.callback(targetText);
        }, this.delayTime);

        this.textinputElement.addEventListener('keyup', (event) => {
            dispatchEvent(event.target.value);
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const getFetchDataList = (word) => {
        return new Promise((resolve) => {
            resolve(
                data.filter((item) => item.word.indexOf(word) > -1)
            );
        });
    };
    
    const displayWordList = (selector, data) => {
        let itemList = '';
        for (let i = 0; i < data.length; i++) {
            itemList +=`
                <div>
                <span>${data[i].word}</span>
                </div>
            `
        }
        selector.innerHTML = itemList;
    };
    
    const getData = (targetWord = '') => {
        getFetchDataList(targetWord).then(result => {
            displayWordList(document.querySelector('#wordlist'), result);
        })
    };
    
    const instantSearch = new InstantSearch({
        selector: '#instant-search',
        css: 'instant-search-input',
        placeholder: 'Please enter keyword',
        changeEvent: (eventText) => {
            getData(eventText);
        }
    });

    getData();
});