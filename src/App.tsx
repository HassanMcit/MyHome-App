import { createBrowserRouter, RouterProvider } from "react-router"
import Layout from "./Components/Layout/Layout"
import DisplayTasks from "./Components/DisplayTasks/DisplayTasks"
import CreateTask from "./Components/CreateTask/CreateTask"
import Login from "./Components/Login/Login"
import Expenses from "./Components/Expenses/Expenses"


function App() {

  const myRouting = createBrowserRouter([
    {path: '/', element: <Layout/>, children: [
      {index: true, element: <DisplayTasks/>},
      {path: '/createTask', element: <CreateTask/>},
      {path: '/login', element: <Login/>},
      {path: '/expenses', element: <Expenses/>},
    ]}
  ])

  return (
    <>
      <RouterProvider router={myRouting}></RouterProvider>
    </>
  )
}

export default App
