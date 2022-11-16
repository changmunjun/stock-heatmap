import React from "react";
import {Link} from "react-router-dom"

interface BookProp {
    bookId:number;
    cover: string;
    title: string;
    author: string;
}

function Book(prop:BookProp) {
    let book: BookProp = {
        bookId: prop.bookId!=null?prop.bookId: -1,
        cover: prop.cover!=null?prop.cover: "/NoImage.png",
        title: prop.title!=null?prop.title: "unknown",
        author: prop.author!=null?prop.author: "unknown"
    }
    
    return (
        <tr>
            <td> <img src={book.cover}/>
            </td>
            <td> <Link to={`/reviews/${book.bookId}/${book.title}`}>{book.title}</Link>
            </td>
            <td>{book.author}</td>
        </tr>

    );
}

export default Book;