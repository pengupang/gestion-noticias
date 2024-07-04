import React, { useState } from 'react'

const TablaNoticias = ({noticias}) => {
    const [buscar, setBuscar ] = useState('')
    const buscador = (e) =>{
        setBuscar(e.target.value)
        
    }
    const resultados= noticias.filter(
        (r)=>r.title.toLowerCase().includes(buscar.toLowerCase())
    )
  return (
    <>
    <div className='row-2'>
        <h1>Noticias</h1>
    </div>
    <div className='row-md-2'>
        <input 
        type="text" 
        placeholder='Buscar' 
        className='form-control' 
        onChange={buscador}
        value={buscar}/>
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
                            <tr key={n.id}>
                                <td>{n.title}</td>
                                <td>{n.date}</td>
                                <td><button className='btn btn-danger'>eliminar</button></td>
                            </tr>
                        ))
                        }
                </tbody>
            </table>
    </>
  )
}

export default TablaNoticias