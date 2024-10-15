import React, { useState, useEffect } from 'react'
import $ from 'jquery';
import 'jquery-validation';
import Button from './Button';
function FormProduct() {

    useEffect(() => {
        // Inicializar jQuery Validation cuando el componente se monta
        $('#product').validate({
          rules: {
            nombre: {
              required: true,
              minlength: 3,
            },
            precio: {
              required: true,
              number:true,
              min:0
            },
            cantidad: {
              required: true,
              number:true,
              min: 1,
            },

            stock: {
                required: true,
                number:true,
                min: 1,
              },
          },
          messages: {
            nombre: {
              required: 'Por favor, ingresa tu nombre',
              minlength: 'Tu nombre debe tener al menos 3 caracteres',
            },
            precio: {
              required: 'Por favor, ingrese el precio',
              number: 'Ingrese un numero',
              min:'debe ser por lo menos 0'
            },
            cantidad: {
              required: 'Por igrese la cantidad',
              number: 'Debe ser numero',
              min: 'Debe ser un numero positivp'
            },

            stock: {
                required: 'Por igrese la cantidad de Stock',
                number: 'Debe ser numero',
                min: 'Debe ser un numero positivp'
              },
          },
         
        });
      }, []);

    const [showModal, setShowModal]=useState(false);
    
    const halndleShowModal=()=>setShowModal(true);

    const halndleClosedModal=()=>setShowModal(false);

    const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productStock, setProductStock] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita la recarga de la página
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Datos del producto que vamos a enviar a la API
    const newProduct = {
      nombre: productName,
      precio: productPrice,
      cantidad: productQuantity,
      stock: productStock
    };

    try {
      // Hacer la petición POST a la API
      const response = await fetch('http://localhost/api/producto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct), // Convertir los datos del producto a JSON
      });

      if (!response.ok) {
        throw new Error('Error al agregar el producto');
      }

      setSuccess(true);
      setProductName('');
      setProductPrice('');
      setProductQuantity('');
      setProductStock('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
    <Button handleShowModal={halndleShowModal}></Button>
      
    <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Agregar producto</h5>
              <button type="button" className="btn-close" onClick={halndleClosedModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
            {success && <div className="alert alert-success">Producto agregado con éxito!</div>}
            {error && <div className="alert alert-danger">Error: {error}</div>}
            <form onSubmit={handleSubmit } id='product'>
            <div className='mb-3 form-group'>
            
              <label htmlFor="nombre" className="form-label">Nombre Producto</label>
             <input type="text" className="form-control" id="nombre" name='nombre' placeholder="Nombre producto" value={productName} onChange={(e)=>setProductName(e.target.value)}  required/>
             </div>
             <div className='mb-3'>
              <label htmlFor="precio" className="form-label">Precio</label>
             <input type="number" className="form-control" id="precio" name='precio' placeholder="Precio de producto" value={productPrice} onChange={(e)=>setProductPrice(e.target.value)} required/>
             </div>
             <div className='mb-3'>
              <label htmlFor="cantidad" className="form-label">Cantidad</label>
             <input type="number" className="form-control" id="cantidad" name='cantidad' placeholder="Cantidad del producto" value={productQuantity} onChange={(e)=>setProductQuantity(e.target.value)} required/>
             </div>
             <div className='mb-3'>
              <label htmlFor="stock" className="form-label">Stock</label>
             <input type="number" className="form-control" id="stock" name='stock' placeholder="Stock del producto" value={productStock} onChange={(e)=>setProductStock(e.target.value)} required />
             </div>
            
            <div className="modal-footer">
            <button type="submit" className="btn btn-primary"  disabled={loading}>{loading? 'Agregando':'Agregar'}</button>
            <button type="button" className="btn btn-secondary" onClick={halndleClosedModal}>Cerrar</button>
            </div>

            </form>
          </div>
         
        </div>
      
      </div>
      </div>
      </div>
   
  )
}

export default FormProduct