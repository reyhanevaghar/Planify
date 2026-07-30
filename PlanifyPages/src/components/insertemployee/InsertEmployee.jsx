import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import ShowErrorMessage from '../ShowErrorMessage/ShowErrorMessage'

const AddTask = () => {

    const formInitializevalues = {
        title: '',
        details: '',
        month: '',
        day: ''
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('write down the title of your task'),
        details: Yup.string().required()('write down the deatils of the task'),
        month: Yup.string().required('pls choose one of the months'),
        day: Yup.number().required('pls choose a day')
    })
    const months = ['january', 'february', 'march', 'april', 'may', 'june',
        'july', 'agust', 'september', 'octobr', 'november', 'december']


    const days = Array.from({ length: 31 }, (_, i) => i + 1)
    //adding tasks by submitting 
    const onbtnsave = (values) => {
        // fetch(`http://localhost:5000/addtask`,{
        //     method:'post',
        //     headers:{'content-type':'application/Json'},
        //     body:{title:`${title}`,details:`${details}`,month:`${month}`,day:`${day}`,}

        // }).then(x=>x.json).then(x=>{
        //     if(x.result){
        //       alert('successfully added')
        //     }
        //     else{
        //          alert('didnt added ')
        //     }
        // })
        alert(JSON.stringify(values))
    }
    return (
        <div>
            <Formik
                initialValues={formInitializevalues}
                validationSchema={validationSchema}
                onSubmit={onbtnsave}>
                <Form>
                    <div className='form-group'>
                        <label>Title</label>
                        <Field className='form-control' name='title'></Field>
                        <ErrorMessage name='title' component={ShowErrorMessage}></ErrorMessage>

                    </div>
                    <div className='form-group'>
                        <label>Details</label>
                        <Field className='form-control' name='details'></Field>
                        <ErrorMessage name='details' component={ShowErrorMessage}></ErrorMessage>

                    </div>
                    <div className='form-group'>
                        <label>months</label>
                        <Field as='select' className='form-control' name='month'>

                            <option value=''>Select Month</option>
                            {months.map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </Field>
                        <ErrorMessage name='month' component={ShowErrorMessage}></ErrorMessage>
                    </div>
                    <div className='form-group'>
                        <label>days</label>
                        <Field as='select' className='form-control' name='day'>
                            <option value=''>Select Day</option>
                            {days.map((d) => <option key={d} value={d}>{d}</option>)}
                        </Field>
                        <ErrorMessage name='day' component={ShowErrorMessage}></ErrorMessage>
                    </div>


                    <button type='submit' className='btn btn-secondary'>submit</button>
                </Form>
            </Formik>
        </div>
    )
}
export default AddTask
