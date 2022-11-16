import React from "react";

interface ReviewProp{
    review: string
}


function Review( prop: ReviewProp){
    let review : ReviewProp = {
        review : prop.review!=null? prop.review : "unkown"
    };

    return (
        <tr>
            <td>{review.review}</td>
        </tr>
    );
}

export default Review;