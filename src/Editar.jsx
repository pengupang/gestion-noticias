import React from 'react'
import TablaNoticias from './TablaNoticias';

const Editar = () => {
  return (
    <div>
    
    <div className="container">

    <div className="row">
      <div className="col-md-6">
      <h1>Editar</h1>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Titulo</label>
          <input type="text" className="form-control" id="titulo" 
                />
        </div>
        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">Fecha</label>
          <input type="date" className="form-control" id="fecha" 
          />
        </div>
        <button className="btn btn-info" >Guardar</button>
      </div>
      <div className="col-md-6">
        <TablaNoticias/>
      </div>
    </div>
  </div></div>
  )
}

export default Editar