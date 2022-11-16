import { render, screen } from '@testing-library/react';
import Review from './Review';

test('it should build the table row from strings passed as props', () => {
    const input = {
        reviewer: 'Reviewer 1',
        stars: 1,
        review: 'review 1'
    }
    render(<table><tbody><Review review={input.review} /></tbody></table>);
    const reviewer = screen.getByText(input.reviewer);
    expect(reviewer).toBeInTheDocument();
    
    const stars = screen.getByText(input.stars);
    expect(stars).toBeInTheDocument()

    const review = screen.getByText(input.review);
    expect(review).toBeInTheDocument();
});