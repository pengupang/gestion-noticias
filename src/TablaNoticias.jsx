import React, { useState } from 'react'

const TablaNoticias = ()=> {
    const storedNoticias = localStorage.getItem('noticias');
    const initialNoticias = storedNoticias ? JSON.parse(storedNoticias) : [];
    const [noticias, setNoticias] = useState(initialNoticias);
    const [buscar, setBuscar] = useState('');
    const [desde, setDesde] = useState('');
    const [hasta, setHasta] = useState('');
    
    const buscador = (e) =>{
        setBuscar(e.target.value)
    }

    const onClickEliminar = (e) => {
        const index = e.target.parentElement.parentElement.id;
        console.log(index)
        const aux = noticias.filter(
            noti => noti.id !== index
        )
        localStorage.setItem('noticias',JSON.stringify(aux))
        setNoticias(JSON.parse(localStorage.getItem("noticias")))
    }
    const fDesde = (e) => {
        setDesde(e.target.value)
        console.log(e.target.value)
    }
    const fHasta = (e) => {
        setHasta(e.target.value)
        console.log(e.target.value)
    }
    
    const filtroTitulo = (n) => {
        return n.title.toLowerCase().includes(buscar.toLowerCase())
    }

    const filtroFecha = (f) => {
        const fechaNoticias = new Date (f.date).toISOString().split('T')[0]
        const fechaDesde = desde ? fechaNoticias >= new Date (desde).toISOString().split('T')[0] : true
        const fechaHasta = hasta ? fechaNoticias <= new Date (hasta).toISOString().split('T')[0]: true
        return fechaDesde && fechaHasta
    }

    const resultados= noticias.filter(
        r=> filtroTitulo(r) && filtroFecha(r)
    )
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
        value={buscar}/>
    </div>
    <div className="row">
        <div className="col-md">
            <label htmlFor="desde">Desde</label>
            <input type="date" 
            className='form-control' value={desde} onChange={fDesde}
            />
        </div>
        <div className="col-md">
            <label htmlFor="hasta">Hasta</label>
            <input type="date" 
            className='form-control' value={hasta} onChange={fHasta}/>
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
                        {
                        resultados.map(n=>(
                            <tr key={n.id} id={n.id}>
                                <td>{n.title}</td>
                                <td>{n.date}</td>
                                <td><button className='btn btn-danger' onClick={onClickEliminar}>eliminar</button></td>
                            </tr>
                        ))
                        }
                </tbody>
            </table>
    </>
  )
}

export default TablaNoticias