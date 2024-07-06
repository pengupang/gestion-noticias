import React, { useState, useEffect } from 'react';

const TablaNoticias = ({ setEditar, accion, listaNoticias }) => {
  const [noticias, setNoticias] = useState([]);
  const [buscar, setBuscar] = useState('');
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');

  useEffect(() => {
    setNoticias(listaNoticias || []);
  }, [listaNoticias]);

  const buscador = (e) => {
    setBuscar(e.target.value);
  }

  const onClickEliminar = (e) => {
    const index = e.target.parentElement.parentElement.id;
    const aux = noticias.filter(
      noti => noti.id !== index
    );
    localStorage.setItem('noticias', JSON.stringify(aux));
    setNoticias(JSON.parse(localStorage.getItem("noticias")));
  }

  const onClickEditar = (e) => {
    const index = parseInt(e.target.parentElement.parentElement.id, 10);
    const aux = noticias.filter(
      noti => noti.id === index
    );
    if (aux.length > 0) {
      setEditar(index, aux[0].title, aux[0].date);
      setNoticias(JSON.parse(localStorage.getItem("noticias")));
    } else {
      console.log('No hay datos');
    }
  }

  const FuncionAccion = (event) => {
    if (accion === 'eliminar') {
      onClickEliminar(event);
    }
    if (accion === 'editar') {
      onClickEditar(event);
    }
  }

  const fDesde = (e) => {
    setDesde(e.target.value);
  }

  const fHasta = (e) => {
    setHasta(e.target.value);
  }

  const limpiaFiltros = () => {
    setBuscar('');
    setDesde('');
    setHasta('');
  }

  const filtroTitulo = (n) => {
    return n.title.toLowerCase().includes(buscar.toLowerCase());
  }

  const filtroFecha = (f) => {
    const fechaNoticias = new Date(f.date).toISOString().split('T')[0];
    const fechaDesde = desde ? fechaNoticias >= new Date(desde).toISOString().split('T')[0] : true;
    const fechaHasta = hasta ? fechaNoticias <= new Date(hasta).toISOString().split('T')[0] : true;
    return fechaDesde && fechaHasta;
  }

  const resultados = noticias.filter(
    r => filtroTitulo(r) && filtroFecha(r)
  );

  return (
    <>
      <div className='row-2'>
        <h1>Noticias</h1>
      </div>
      <div className='row-md-3'>
        <input
          type="text"
          placeholder='Buscar'
          className='form-control'
          onChange={buscador}
          value={buscar} />
      </div>
      <div className="row">
        <div className="col-md">
          <label htmlFor="desde">Desde</label>
          <input
            type="date"
            className='form-control'
            value={desde}
            onChange={fDesde}
          />
        </div>
        <div className="col-md">
          <label htmlFor="hasta">Hasta</label>
          <input
            type="date"
            className='form-control'
            value={hasta}
            onChange={fHasta} />
        </div>
        <div className="col-md-2">
          <button className="btn btn-secondary form-control mt-3" onClick={limpiaFiltros}><i className="bi bi-trash3"></i></button>
        </div>
      </div>

      <table className='table table-borderer'>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map(n => (
            <tr key={n.id} id={n.id}>
              <td>{n.title}</td>
              <td>{n.date}</td>
              <td><button className='btn btn-danger' onClick={FuncionAccion}>{accion}</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default TablaNoticias;
