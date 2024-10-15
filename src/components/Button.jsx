import React from 'react'

function Button({handleShowModal}) {
  return (
    <div className="  container  d-flex justify-content-end mt-3 mb-3 text-nowrap">
    <button className="btn btn-primary btn-sm   text-center "><i className="bi bi-plus-square me-1"  onClick={handleShowModal}></i>Agregar</button>   
    </div>
  )
}

export default Button