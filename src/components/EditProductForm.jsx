import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'jquery-validation';

const EditProductModal = ({ product, updateProduct }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    cantidad: '',
    stock: '',
  });

  

  // Actualiza el formulario cuando se selecciona un nuevo producto
  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
        stock: product.stock,
      });
    }

    // Inicializar jQuery Validation cuando el componente se monta
    $('#editproduct').validate({
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
  }, [product]);

  // Maneja los cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product) {
      await updateProduct(product.producto_id, formData);
      const modal = window.bootstrap.Modal.getInstance(document.getElementById('editProductModal'));
      modal.hide();
    }
  };

  return (
    <div
      className="modal fade"
      id="editProductModal"
      tabIndex="-1"
      aria-labelledby="editProductModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editProductModalLabel">Editar Producto</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} id='editproduct'>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Precio</label>
                <input
                  type="number"
                  name="precio"
                  className="form-control"
                  value={formData.precio}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Cantidad</label>
                <input
                  type="number"
                  name="cantidad"
                  className="form-control"
                  value={formData.cantidad}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Stock</label>
                <input
                  type="number"
                  name="stock"
                  className="form-control"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Actualizar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
