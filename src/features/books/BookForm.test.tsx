import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookForm from './BookForm';

test('renders learn react link', () => {
    const addBook = jest.fn();
    function onHideFunction(){
    }
    const {getByText} = render(<BookForm show={true} onHide={onHideFunction} />);
    fireEvent.click(getByText(/Add Book/i));
    expect(onsubmit).toBeCalled;
  });