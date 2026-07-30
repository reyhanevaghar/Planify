import Tasks from './components/tasks/Tasks'
import AddTask from './components/addtasks/AddTasks'
import Modal from './components/modal/Modal'
import Layout from './components/layout/layout/Layout'
//import ListProduct from './components/listproducts/ListProducts'
//import InsertEmployee from './components/insertemployee/InsertEmployee'
import UpdateTask from './components/updatetask/UpdateTask'
import MonthlyTasks from './components/monthlytasks/MonthlyTasks'
import MyCalendar from './components/mycalender/MyCalender'
import SignIn from './components/signin/SignIn'
import SignUp from './components/signup/SignUp'
import MainPage from './components/mainpage/MainPage'
import ProtectedRoute from './components/protectedroutes/ProtectedRoute'
import MyProfile from './components/myprofile/MyProfile'
import { BrowserRouter, Routes, Route } from 'react-router-dom'



const App = () => {
  return (
    <div>

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<MainPage></MainPage>} />
          <Route path='/mainpage' element={<MainPage></MainPage>} />
          <Route path="/signin" element={<SignIn></SignIn>} />
          <Route path="/signup" element={<SignUp></SignUp>} />

          <Route path="/" element={<ProtectedRoute> <Layout /> </ProtectedRoute>} >
            <Route path="tasks" element={<Tasks></Tasks>} />
            <Route path="addtask" element={<AddTask></AddTask>} />
            <Route path="modal" element={<Modal></Modal>} />
            <Route path="updatetask/:id" element={<UpdateTask></UpdateTask>} />
            <Route path="monthlytask" element={<MonthlyTasks></MonthlyTasks>} />
            <Route path="mycalender" element={<MyCalendar></MyCalendar>} />
            <Route path="myprofile" element={<MyProfile></MyProfile>} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div >
  )
}
export default App