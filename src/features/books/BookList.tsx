import React, { useEffect,useState } from "react";
import Book from "./Book";
import BookForm from "./BookForm";
import { booksAsync, selectAllBooks } from './bookSlice';
import { useSelector } from 'react-redux';
import { store } from "../../app/store";
import { Button } from 'react-bootstrap';


function BookList(){

    const books = useSelector(state => selectAllBooks(state));

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(() => { store.dispatch(booksAsync()); }, [] );

    return (
        <div className="table-responsive">
            <Button onClick={handleShow} variant="primary" >
            Add Book
            </Button>
            <BookForm show={showModal} onHide={handleClose} />

            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>Cover</th>
                    <th>Book</th>
                    <th>Author</th>
                </tr>
                </thead>
                <tbody>
                {
                    books.map(function (item:any, i:any) {
                    return <Book bookId={item.bookId} cover={item.cover || undefined} author={item.author} title={item.title} key={i} />;
                    })
                }
                </tbody>
            </table>
        </div>    

    );

} 

export default BookList;