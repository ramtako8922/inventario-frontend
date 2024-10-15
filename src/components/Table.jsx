import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import EditProductModal from './EditProductForm';

function Table() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const tableRef = useRef(null);
  let dataTableInstance = null;

  // Obtener los datos de la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/api/producto');
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Inicializar DataTable cuando los datos estén listos y asegurarse de que no se reinicialice
  useEffect(() => {
    if (data.length > 0) {
      // Destruir DataTable si ya ha sido inicializado previamente
      if (dataTableInstance) {
        dataTableInstance.destroy();
      }

      // Inicializar DataTable
      dataTableInstance = $(tableRef.current).DataTable();
    }

    return () => {
      // Limpiar DataTable al desmontar el componente
      if (dataTableInstance) {
        dataTableInstance.destroy();
      }
    };
  }, [data]); // Solo se ejecuta cuando los datos cambian

  const handleEdit = (product) => {
    setSelectedProduct(product);
    const modal = new window.bootstrap.Modal(document.getElementById('editProductModal'));
    modal.show();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost/api/producto/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      // Si el producto se elimina correctamente
      setSuccess(true);
      setData(data.filter((item) => item.producto_id !== id));
    } catch (error) {
      console.error(error);
      alert('Hubo un error al eliminar el producto');
    }
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container-fluid mt-6">
      <table ref={tableRef} className="table table-hover">
        <thead>
          <tr>
            <th scope="col" className="bg-primary text-light">Código</th>
            <th scope="col" className="bg-primary text-light">Nombre</th>
            <th scope="col" className="bg-primary text-light">Precio</th>
            <th scope="col" className="bg-primary text-light">Cantidad</th>
            <th scope="col" className="bg-primary text-light">Stock</th>
            <th scope="col" className="bg-primary text-light">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.producto_id}>
              <th scope="row">{item.producto_id}</th>
              <td>{item.nombre}</td>
              <td>{item.precio}</td>
              <td>{item.cantidad}</td>
              <td>{item.stock}</td>
              <td className="row d-flex">
                <button className="btn btn-primary btn-sm col-4 mx-1" onClick={() => handleEdit(item)}>
                  <i className="bi bi-pen"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm col-4 mx-1"
                  onClick={() => handleDelete(item.producto_id)}
                >
                  <i className="bi bi-x-circle"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {success && <div className="alert alert-danger">Producto eliminado</div>}
      <EditProductModal product={selectedProduct} />
    </div>
  );
}

export default Table;
