//offline data
db.enablePersistence()
    .catch(err => {
        if (error.code === 'failed-precondition') {
            // probably multiple tabs open at once
            console.log('persistence failed')
        } else if (err.code === 'unimplemented') {
            // lack of browser support
            console.log('persistence is not available')
        }
    })

// real-time listener
db.collection('news').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        // console.log(change, change.doc.data(), change.doc.id);
        if (change.type === 'added') {
            // add the document data to the web page
            renderNew(change.doc.data(), change.doc.id)
        }
        if (change.type === 'removed') {
            // remove the document data from the web page
            removeNew(change.doc.id);
        }
    })
})


// add news
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault();

    const news = {
        title: form.title.value,
        body: form.body.value,
    };

    db.collection('news').add(news)
        .catch(err => console.log(err));

    form.title.value = '';
    form.body.value = '';

})

// delete news
const newsContainer = document.querySelector('.news');
newsContainer.addEventListener('click', evt => {
    // console.log(evt)
    if (evt.target.tagName === 'I') {
        const id = evt.target.getAttribute('data-id');
        db.collection('news').doc(id).delete();
    }
})

