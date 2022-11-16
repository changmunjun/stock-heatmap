import { addBookAsync } from './bookSlice';
import { store } from '../../app/store';
import { Formik, Form, Field, ErrorMessage,FormikErrors } from 'formik';
import { Modal } from 'react-bootstrap'
import { useState } from 'react';
import DropWrapper from '../common/DropWrapper';
import useHover from '../common/useHover';

interface errorValidation{
    title:string;
    author:string;
}

interface BookFormParam{
    show:boolean;
    onHide: any;
}


function BookForm(param: BookFormParam) {

    const hoverReturn = useHover();
    const [image,setImage] = useState(undefined);

    function hoverStyle() {
        return hoverReturn.isHovering ? { opacity: '25%' } :
                           { opacity: '100%' };  }


    const handleImageChosen = (e:any) => {
        let size = 160;
        let newHeight;
        let newWidth;
        let files = e.target.files || e.dataTransfer.files;
        if (files && files.length > 0) {
            let f = files[0];
            let reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e2:any) {
                    let image:any = new Image();
                    image.onload = function () {
                        newHeight = this.height;
                        newWidth = this.width;
                        if (this.height > size) {
                            newHeight = size;
                            newWidth = (newHeight * this.width) / this.height;
                        }
                        if (newWidth > size) {
                            let oldWidth = newWidth;
                            newWidth = size;
                            newHeight = (newWidth * newHeight) / oldWidth;
                        }
                        let canvas:any = document.createElement("canvas");
                        let ctx:any = canvas.getContext("2d");
                        canvas.width = newWidth;
                        canvas.height = newHeight;
                        ctx.drawImage(image, 0, 0, newWidth, newHeight);
                        //insert code here
                        setImage(canvas.toDataURL(f.type));    
                    };
                    image.src = e2.target.result;
                };
            })(f);
            reader.readAsDataURL(f);
        }
    }


    return (
        <Modal show={param.show} onHide={param.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Add a New Book
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik 
                    onSubmit={(values, { resetForm }) => {
                        store.dispatch(addBookAsync({title: values.title, 
                                                    author: values.author,
                                                    cover: image}));
                        resetForm(); 
                        setImage(undefined);  
                        param.onHide();                                      
                    }}
                    initialValues={{
                        title: '',
                        author: ''
                    }}
                    validate={values => {
                        let errors: FormikErrors<errorValidation> = {};
                        if (!values.title || values.title.length < 3) {
                            errors.title = 'Title Required';
                        }
                        if (values.title.length < 3) {
                            errors.title = 'Title Required at least 3 more characters';
                        }
                        if (!values.author) {
                            errors.author = 'Author Required';
                        }
                        if (values.author.length < 3) {
                            errors.author = 'Author Required at least 3 more characters';
                        }
                        return errors;
                    }}
                    >
                    <Form className="form-group form-inline">
                        <label className="control-label">Title:<Field type="text"  name="title" className="form-control" /></label><br/>
                        <label className="control-label">Author:<Field type="text"   name="author" className="form-control" /></label><br/>
                        <DropWrapper dropped={handleImageChosen}>
                            <img  src={image || './drop.png'} alt=""  ref={hoverReturn.ref} style={hoverStyle()} />
                        </DropWrapper>
                        <button type="submit"  className="btn btn-primary">Add Book</button>
                        <ErrorMessage name="title"
                            className="alert alert-danger"
                            component="div" />    
                        <ErrorMessage name="author"
                            className="alert alert-danger"
                            component="div" />    
                    </Form>
                </Formik>
            </Modal.Body>
        </Modal>            
    );
}

export default BookForm;
