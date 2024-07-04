import React from 'react'

const TablaNoticias = ({noticias}) => {
  return (
    <>
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
                        noticias.map(n=>(
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