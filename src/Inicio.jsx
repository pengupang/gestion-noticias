import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TablaNoticias from './TablaNoticias';

const Inicio = () => {
  const url = 'http://45.236.130.191/noticias.php';
  const [noticias, setNoticias] = useState([]);
  const [idnoticias, setIdnoticias] = useState(0);
  const [titulo,setTitulo] = useState('');
  const [fecha,setFecha] = useState('');

  useEffect(() => {
    axios.get(url).then(response => {
      localStorage.setItem("noticias", JSON.stringify(response.data));
      setIdnoticias((response.data[response.data.length-1].id)+1)
      setNoticias(JSON.parse(localStorage.getItem("noticias")));
    });
    console.log("recarga")
  }, []);

  const onChangeTitulo = (event) => {
    setTitulo(event.target.value)
  }
  
  const onChangeFecha= (event) => {
    setFecha(event.target.value)
  }

  const onClickGuardar = () => {
    console.log(idnoticias)
    const noti = JSON.parse(localStorage.getItem("noticias"));
    setIdnoticias(idnoticias+1);
    console.log(idnoticias)
    
    const aux = {
      id: idnoticias,
      title: titulo,
      date: fecha
    }
    noti.push(aux)
    localStorage.setItem("noticias", JSON.stringify(noti))
    setNoticias(JSON.parse(localStorage.getItem("noticias")));
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">Titulo</label>
            <input type="text" className="form-control" id="titulo" 
                  value={titulo} onChange={onChangeTitulo}/>
          </div>
          <div className="mb-3">
            <label htmlFor="fecha" className="form-label">Fecha</label>
            <input type="text" className="form-control" id="fecha"
                  value={fecha} onChange={onChangeFecha}/>
          </div>
          <button className="btn btn-info" onClick={onClickGuardar}>Guardar</button>
        </div>
        <div className="col-md-6">
          <TablaNoticias noticias={noticias} />
        </div>
      </div>
    </div>
  );
};

export default Inicio;
