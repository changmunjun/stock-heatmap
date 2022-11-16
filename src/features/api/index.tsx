const url = process.env.REACT_APP_URL; //"http://localhost:3030/api/bookreactions/";

const headers = {
    accept: 'application/json',
    'content-type': 'application/json'
  };
  
export const addBook = (book:any) => {
    return fetch(url + 'Books',{  method: 'post',
                                  mode: 'cors',
                                  headers: headers,
                                  body: JSON.stringify(book)
                                }).then((response) => {
                    return response.json();
                });
}

export const fetchAllBooks = () => {
        return fetch(url + 'Books').then((response) => {
        return response.json(); });
    }

export const fetchReviews = (bookId:any) => {
    return fetch(url + 'Reviews/' + bookId)
        .then(function (response) {
            return response.json();
        });
}

export const addReview = (review:any) => {
    return fetch(url + 'Reviews',
        {
            method: 'post',
            mode: 'cors',
            headers: headers,
            body: JSON.stringify(review)
        }).then((response) => {
            return response.json();
        });
}