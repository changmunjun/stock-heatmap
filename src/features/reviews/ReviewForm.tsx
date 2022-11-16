import React, { useState } from "react";
import { addReviewAsync } from './reviewSlice';
import { store } from '../../app/store';
import { Formik, Form, Field, ErrorMessage,FormikErrors } from 'formik';
import { Modal } from 'react-bootstrap';

interface  ReviewFormProp{
    bookId:number;
    show:boolean;
    onHide: any;
}
interface errorValidation{
    content:string;
}

function ReviewForm(param : ReviewFormProp ){
    const [bookId,setBookId] = useState(param.bookId);

    return (
        <Modal show={param.show} onHide={param.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Add a New Book
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
            <Formik onSubmit={(values, { resetForm }) => {
                    store.dispatch(addReviewAsync({content: values.content, bookId: bookId}));
                    resetForm();
                    param.onHide();
                }}
            
                initialValues={{
                content: ''
                }}
                            
                validate={values => { 
                const errors: FormikErrors<errorValidation> = {}; 
                if (!values.content) {
                    errors.content = 'Review Required';
                }
                if (values.content.length <5) {
                    errors.content = 'Review Required';
                }
                return errors;
                }}
                >
                <Form className="form-group form-inline">
                    <label className="control-label"> Review: <Field type="text" name="content" className="form-control"/></label>
                    <button type="submit" className="btn btn-primary">Add Review</button>
                    <ErrorMessage name="content"
                        className="alert alert-danger"
                        component="div" />
                </Form>

            </Formik>
            </Modal.Body>
        </Modal>            
    );
}

export default ReviewForm;