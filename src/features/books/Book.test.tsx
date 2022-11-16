import { render, screen } from '@testing-library/react';
import Book from './Book';

test('it should build the table row from strings passed as props', () => {
    const input = {
        bookId: 1,
        cover: 'Cover 1',
        title: 'Title 1',
        author: 'Author 1'
    }
    render(<table><tbody><Book bookId={input.bookId} cover={input.cover} author={input.author} title={input.title} /></tbody></table>);
    const title = screen.getByText(input.title);
    expect(title).toBeInTheDocument();
    
    const author = screen.getByText(input.author);
    expect(author).toBeInTheDocument();
});