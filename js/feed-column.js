import { dom } from "./dom.js";
const tabs = document.getElementById('tabs');

if(tabs) {
    tabs.addEventListener('click', (e) => {
        const iconColumn = e.target.dataset.icon;
        const iconRow = e.target.dataset.icon
        if(e.target.dataset.icon === iconColumn) {
            dom.feed.classList.add('feed-column')
        }
        if(e.target.dataset.icon === iconRow) {
            dom.feed.classList.remove('feed-column')
        }
    })
}



