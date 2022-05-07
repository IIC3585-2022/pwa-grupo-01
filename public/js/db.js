const tokens = []
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


// real-time listener
db.collection('tokens').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        // console.log(change, change.doc.data(), change.doc.id);
        if (change.type === 'added') {
            // add the document data to the web page
            tokens.push(change.doc.data().token)
        }
        if (change.type === 'removed') {
            // remove the document data from the web page
            const index = tokens.indexOf(change.doc.data().token)
            if (index !== -1) {
                tokens.splice(index, 1)
            }
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
    
    const bodyToSend = {
        notification: {
            title: form.title.value,
            body: form.body.value,
            icon: '/img/icons/icon-128x128.png'
        },
        android:{
            priority:"normal"
          },
        registration_ids: tokens
    }
    
    fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
            Authorization: 'key=AAAAgkVZn9Y:APA91bE9ipGA3bzFqPzqzA0xK7q2zbJ6BKhkPjVDvyz_Ccualva7eJmmj4et_HbcZUuFRHMGhfBPnOiMyhHNDQgXoX8217owT2BiQpePB_feDkwDCJKAbsheB6Lirw436QHX3eX_vfAS',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyToSend)

    }).catch(() => console.log('error sending notification'))

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

