import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import ShowErrorMessage from '../ShowErrorMessage/ShowErrorMessage'


const InsertEmployee = () => {
    const formInitializeValues = {
        nameproduct: '',
        priceproduct: 0,
        countproduct: 0,
        producer: ''
    }
    const formValidationSchema = Yup.object().shape({
        nameproduct: Yup.string().required('نام محصول رو وارد کنید'),
        priceproduct: Yup.string().required('قیمت محصول رو وارد کنید'),
        countproduct: Yup.string().required('تغداد محصول رو وارد کنید'),
        producer: Yup.string().required('نام سازنده محصول رو وارد کنید')
    })

    const Onbtnsave = values => {
        alert(JSON.stringify(values))
    }

    return (
        <div>
            <h1>InsertEmployee</h1>
            <Formik
                initialValues={formInitializeValues}
                validationSchema={formValidationSchema}
                onSubmit={Onbtnsave}
            >
                <Form>
                    <div className='form-group'>
                        <label>nameproduct</label>
                        <Field className="form-control"
                            name="name"></Field>
                        <ErrorMessage nameproduct="nameproduct"
                            component={ShowErrorMessage}></ErrorMessage>
                    </div>
                    <div className='form-group'>
                        <label> priceproduct</label>
                        <Field className="form-control"
                            priceproduct="priceproduct"></Field>
                        <ErrorMessage priceproduct="priceproduct"
                            component={ShowErrorMessage}></ErrorMessage>
                    </div>
                    <div className='form-group'>
                        <label> countproduct</label>
                        <Field className="form-control"
                            countroduct="countroduct"></Field>
                        <ErrorMessage countproduct="countproduct"
                            component={ShowErrorMessage}></ErrorMessage>
                    </div>
                    <div className='form-group'>
                        <label> producer</label>
                        <Field className="form-control"
                            producer="producer"></Field>
                        <ErrorMessage producer="producer"
                            component={ShowErrorMessage}></ErrorMessage>
                    </div>
                    <button className='btn btn-primary'>ذخیره</button>
                </Form>
            </Formik>
        </div>
    )
}
export default InsertEmployee