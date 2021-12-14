import { dom } from "./dom.js";
const tabs = document.getElementById('tabs');

if(tabs) {
    tabs.addEventListener('click', (e) => {
        if(e.target.dataset.icon === 'column') {
            dom.feed.classList.add('feed-column')
        }
        if(e.target.dataset.icon === 'row') {
            dom.feed.classList.remove('feed-column')
        }
    })
}



