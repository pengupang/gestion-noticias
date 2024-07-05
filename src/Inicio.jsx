import React from 'react'
import { BrowserRouter , Route,Link,Routes} from 'react-router-dom'
import Editar from './Editar'
import Ingresar from './Ingresar'
import './estilos.css'

const Inicio = () => {
  return (
    <BrowserRouter>
        <div>
            <nav>
                <ul>
                    <li><Link to="/ingresar">Ingresar</Link></li>
                    <li><Link to="/editar">Editar</Link></li>
                </ul>
            </nav>
        </div>
        <Routes>
            <Route path='/ingresar'element={<Ingresar/>} />
            <Route path='/editar'element={<Editar/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Inicio