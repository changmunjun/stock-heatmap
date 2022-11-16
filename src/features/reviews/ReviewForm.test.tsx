import { render, screen,fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewForm from './ReviewForm';

test('it should call the parent function when Add Review is clicked', () => {
    const bookId:number=1;
    const onSubmit = jest.fn();
    const handleClose  = function(){
    }
    const { getByText } = render(<ReviewForm show={true} onHide={handleClose} bookId={bookId} />);
    fireEvent.click(getByText(/Add Review/i));
    expect(onSubmit).toBeCalled();
});

test("it should allow users to enter a review", () => {
    const bookId:number=1;
    const onSubmit = jest.fn();
    const input = "A great book";
    const handleClose  = function(){
    }
    const { getByText } =
          render(<ReviewForm show={true} onHide={handleClose} bookId={bookId} />);
    userEvent.type(screen.getByLabelText(/Review:/i),input);
    expect(screen.getByLabelText(/Review:/i))
             .toHaveValue(input);
  });

  