import React, { useState } from 'react'

const TablaNoticias = ({noticias}) => {
    const [buscar, setBuscar ] = useState('')
    const buscador = (e) =>{
        setBuscar(e.target.value)
        
    }
    const resultados= noticias.filter(
        (r)=>r.title.toLowerCase().includes(buscar.toLowerCase())
    )

    const onClickEliminar = (e) => {
        const notis = JSON.parse(localStorage.getItem('noticias'))
        const index = e.target.parentElement.parentElement.id
        const articulo = e.target.parentElement.parentElement.children[0].innerText;
        const aux = notis.filter(
            (r)=> r.title != articulo)
        console.log(aux)
        aux.forEach((e,x) => {
            e.id = x+1
        });
        localStorage.setItem("noticias",JSON.stringify(aux));
        document.getElementById(index).remove()
    }

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