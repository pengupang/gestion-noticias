import React, { useState } from 'react'

const TablaNoticias = ()=> {
    const [noticias, setNoticias] = useState(JSON.parse(localStorage.getItem("noticias")));
    const [buscar, setBuscar ] = useState('')

    const buscador = (e) =>{
        setBuscar(e.target.value)
    }

    const onClickEliminar = (e) => {
        const index = e.target.parentElement.parentElement.id;
        console.log(index)
        const aux = noticias.filter(
            noti => noti.id != index
        )
        localStorage.setItem('noticias',JSON.stringify(aux))
        setNoticias(JSON.parse(localStorage.getItem("noticias")))
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
                        noticias.filter(noti => {
                            if (buscar === ''){
                                return noti;
                            }else if (noti.title.toLowerCase().includes(buscar.toLowerCase())){
                                return noti;
                            }
                        }).map(n=>(
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