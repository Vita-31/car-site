const tabs = document.getElementById('tabs');

if(tabs) {
    tabs.addEventListener('click', (e) => {
        const feed = document.getElementById('feed')
        if(e.target.classList.contains('fa-columns')) {
            feed.classList.add('feed-column')
        }
        if(e.target.classList.contains('fa-minus-square')) {
            feed.classList.remove('feed-column')
        }
    })
}


