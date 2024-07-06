import React, { useState } from 'react'
import TablaNoticias from './TablaNoticias';

const Editar = () => {

  const [idEditar,setIdEditar] = useState(0)
  const [tituloEditar, setTituloEditar] = useState("");
  const [tituloEstado,setTituloEstado] = useState(true);
  const [fechaEditar, setFechaEditar] = useState(new Date());
  const [fechaEstado,setFechaEstado] = useState(true);
  const [botonEstado,setBotonEstado] = useState(true);

  const setEditar = (idEdit, tituloEdit, fechaEdit) => {
    setIdEditar(idEdit);
    setTituloEditar(tituloEdit);
    setFechaEditar(fechaEdit);
    setTituloEstado(false);
    setFechaEstado(false);
    setBotonEstado(false);
  }

    
  const onClickGuardar = () => {
    console.log(idEditar);
    console.log(tituloEditar);
    console.log(fechaEditar);
    if (tituloEditar !== ""){
      const aux = JSON.parse(localStorage.getItem("noticias"));
      const nuevo = aux.map((r) => {
        if (r.id === idEditar){
          return {id: Number(idEditar), title: tituloEditar, date: fechaEditar}
        }
        return r
      });
      localStorage.setItem("noticias",JSON.stringify(nuevo));
      setEditar(0,"","");
      setTituloEstado(true);
      setFechaEstado(true);
      setBotonEstado(true);
    }else{
      alert("Debe ingresar texto aunque sea.")
    }
  }

  return (
    <div>
    
    <div className="container">

    <div className="row">
      <div className="col-md-6">
      <h1>Editar</h1>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Titulo</label>
          <input type="text" className="form-control" id="titulo" disabled={tituloEstado}
                value={tituloEditar} onChange={(e) => setTituloEditar(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">Fecha</label>
          <input type="date" className="form-control" id="fecha" disabled={fechaEstado}
                value={fechaEditar} onChange={(e) => setFechaEditar(e.target.value)}/>
        </div>
        <button className="btn btn-info" onClick={onClickGuardar} 
                disabled={botonEstado}>Guardar</button>
      </div>
      <div className="col-md-6">
        <TablaNoticias setEditar={setEditar} accion={"editar"} listaNoticias={JSON.parse(localStorage.getItem("noticias")) || []}/>
      </div>
    </div>
  </div></div>
  )
}

export default Editar