import { useLoaderData, NavLink } from "react-router-dom";

function Product() {
  const product = useLoaderData();

  return (
    <div className="container">
      <div className="product-details">
        <img src={product.thumbnail} alt="Thumbnail"/>
        <div className="info">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p><strong>Precio:</strong> $<span>{product.price}</span></p>
          <p><strong>Descuento:</strong> <span></span>{product.discountPercentage}%</p>
          <p><strong>Valoración:</strong> <span>{product.rating}</span></p>
          <p><strong>Stock:</strong> <span></span>{product.stock}</p>
          <p><strong>Marca:</strong> <span></span>{product.brand}</p>
          <p><strong>Categoría:</strong> <span>{product.category}</span></p>
        </div>
      </div>
      <div className="buttons-container">
        <NavLink to='../../'><button className="buttons">Volver a listado</button></NavLink>
      </div>
    </div>)
}

export default Product
