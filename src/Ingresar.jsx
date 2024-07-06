import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TablaNoticias from './TablaNoticias';

const Ingresar = () => {
  const url = 'http://45.236.130.191/noticias.php';
  const [noticias, setNoticias] = useState([]);
  const [idnoticias, setIdnoticias] = useState(0);
  const [titulo,setTitulo] = useState('');
  const [fecha,setFecha] = useState('');

  useEffect(() => {
    const cargarNoticias = async () => {
      try {
        const noticiasGuardadas = JSON.parse(localStorage.getItem('noticias'));
        if (!noticiasGuardadas) {
          axios.get(url).then(response => {
            localStorage.setItem("noticias", JSON.stringify(response.data));
            setIdnoticias((response.data.length > 0 ? response.data[response.data.length - 1].id + 1 : 0));
            setNoticias(response.data);
          });
        } else {
          setIdnoticias((noticiasGuardadas.length > 0 ? noticiasGuardadas[noticiasGuardadas.length - 1].id + 1 : 0));
          setNoticias(noticiasGuardadas)
        }
      } catch (error) {
        console.error('Error al cargar noticias:', error);
      }
    };

    cargarNoticias();
  }, []);
  

  const onClickGuardar = () => {
    /*
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
    */
    const aux = { id: idnoticias, title: titulo, date: fecha };
    const nuevasNoticias = [...noticias, aux];
    setNoticias(nuevasNoticias);
    localStorage.setItem('noticias', JSON.stringify(nuevasNoticias));
    setIdnoticias(idnoticias + 1);
    setTitulo("")
    setFecha("")
  }

  return (
    <div className="container">
      
      <div className="row">
        <div className="col-md-6">
        <h1>Ingresar</h1>
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">Titulo</label>
            <input type="text" className="form-control" id="titulo" 
                  value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="fecha" className="form-label">Fecha</label>
            <input type="date" className="form-control" id="fecha" 
            value={fecha} onChange={(e) => setFecha(e.target.value)}/>
          </div>
          <button className="btn btn-info" onClick={onClickGuardar}>Guardar</button>
        </div>
        <div className="col-md-6">
          <TablaNoticias accion={'eliminar'} listaNoticias={JSON.parse(localStorage.getItem("noticias")) || []} />
        </div>
      </div>
    </div>
  );
};

export default Ingresar;
