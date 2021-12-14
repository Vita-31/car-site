import { dom } from "./dom.js";
const tabs = document.getElementById('tabs');

console.log(dom);

if(tabs) {
    tabs.addEventListener('click', (e) => {
        if(e.target.classList.contains('fa-columns')) {
            dom.feed.classList.add('feed-column')
        }
        if(e.target.classList.contains('fa-minus-square')) {
            dom.feed.classList.remove('feed-column')
        }
    })
}



