import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Home from './componentes/telas/Home'
import Genero from "./componentes/telas/genero/Genero";
import Livro from "./componentes/telas/livro/Livro";
import Login from "./componentes/telas/login/Login";
import MenuPublico from "./componentes/MenuPublico";
import MenuPrivado from "./componentes/MenuPrivado";

const router = createBrowserRouter([
  {
    path : "/",
    element : <MenuPublico/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "login",
        element :  <Login/>
      }              
    ]
  }
  ,
  {
    path: "/privado",
    element: <MenuPrivado />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "generos",
        element: <Genero />,
      },
      {
        path: "livros",
        element: <Livro />,
      }
    ]
  }
])
function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
