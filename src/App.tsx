import { createBrowserRouter, RouterProvider } from "react-router"
import Layout from "./Components/Layout/Layout"
import DisplayTasks from "./Components/DisplayTasks/DisplayTasks"
import CreateTask from "./Components/CreateTask/CreateTask"
import Login from "./Components/Login/Login"
import Expenses from "./Components/Expenses/Expenses"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import UserDataProvider from "./Components/Context/UserContext/UserDataProvider"
import ProtectAuth from "./Components/ProtectAuth/ProtectAuth"


function App() {

  const myRouting = createBrowserRouter([
    {path: '/', element: <Layout/>, children: [
      {index: true, element: <ProtectedRoute><DisplayTasks/></ProtectedRoute>},
      {path: '/createTask', element: <ProtectedRoute><CreateTask/></ProtectedRoute>},
      {path: '/login', element: <ProtectAuth><Login/></ProtectAuth>},
      {path: '/expenses', element: <ProtectedRoute><Expenses/></ProtectedRoute>},
    ]}
  ])

  return (
    <>
      <UserDataProvider>
        <RouterProvider router={myRouting}></RouterProvider>
      </UserDataProvider>
    </>
  )
}

export default App
