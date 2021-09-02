// connected with search field search button and also with url
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs, data.numFound));
};
// total function of of output
const displayBooks = (books, count) => {
    const searchResult = document.getElementById('search-result')
    const searchCount = document.getElementById('search-count')
    // empty field after search
    searchResult.textContent = '';
    searchCount.textContent = '';
    if (count === 0) {
        // search count added 
        searchCount.innerHTML = `<p class="fs-4 fw-bold text-danger">No Results Found...</p>`
    }
    else {
        searchCount.innerHTML = `<p class="fs-4 fw-bold">Total <span class="text-info">${count}</span> Results Found...</p>`
        // function for results and added details for output
        books.forEach(book => {
            let authorName = book?.author_name?.[0];
            let publisherName = book?.publisher?.[0];
            let publishingDate = book?.publish_date?.[0];
            if (!authorName) {
                authorName = 'Author name is not declared';
            }
            else if (!publisherName) {
                publisherName = 'Publisher name is not declared';
            }
            else if (!publishingDate) {
                publishingDate = 'Publishing year is not declared';
            }
            const div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML = `
                    <div class="card border-warning h-100">
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="images/books.    jpg"    height="300px">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5> <br>
                            <p class="card-text">Author Name: <strong>${authorName}</strong></p>
                            <p class="card-text">Publisher Name: <strong>${publisherName}</strong></p>
                            <p class="card-text">Publishing Date: <strong>${publishingDate}</strong></p>
                        </div>
                    </div>
                `;
            searchResult.appendChild(div);
        });
    }
}
