import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import Review from "./Review";
import { useSelector } from 'react-redux';
import { selectBookById } from '../books/bookSlice';
import { reviewsAsync,selectAllReviews } from './reviewSlice';
import { store } from "../../app/store";
import { Button } from 'react-bootstrap';


function ReviewList(){
    const { bookId,title } = useParams();
    const book = useSelector((state:any) => selectBookById(state, Number(bookId)));
    const reviews = useSelector((state:any) => selectAllReviews(state));

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(() => {  
        store.dispatch(reviewsAsync(bookId)); 
    }, [Number(bookId)]);

    return(
        <div className="row">
            <h2>Reviews of {title} by {book.author}:</h2>
            <div className="row">
                <div className="col"><img src={book.cover}></img></div>
                <div className="col">{book.author}</div>
            </div>
            <div className="table-responsive">
            <Button onClick={handleShow} variant="primary" >
            Add Comment
            </Button>

            <ReviewForm show={showModal} onHide={handleClose} bookId={Number(bookId)} />
            <table  className="table table-bordered table-striped">
            <thead>
                <tr>
                    <td>Review</td>
                </tr>
                </thead> 
                <tbody>
                    {
                        reviews.map(function( item:any,i:any){
                        return  <Review review={item.content} key={i}/>   
                        })
                    }
                </tbody>
            </table>

            </div>
        </div>
    );
}

export default ReviewList;