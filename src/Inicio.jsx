import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TablaNoticias from './TablaNoticias';

const Inicio = () => {
  const url = 'http://45.236.130.191/noticias.php';
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    axios.get(url).then(response => {
      localStorage.setItem("noticias", JSON.stringify(response.data));
      setNoticias(JSON.parse(localStorage.getItem("noticias")));
    });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">Titulo</label>
            <input type="text" className="form-control" id="titulo" />
          </div>
          <div className="mb-3">
            <label htmlFor="fecha" className="form-label">Fecha</label>
            <input type="text" className="form-control" id="fecha" />
          </div>
          <button className="btn btn-info">Guardar</button>
        </div>
        <div className="col-md-6">
          <TablaNoticias noticias={noticias} />
        </div>
      </div>
    </div>
  );
};

export default Inicio;
