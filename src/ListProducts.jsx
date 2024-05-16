import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { APIURL } from './Configuration.js'

const INITIAL_PAGE = 1;

function ListPage() {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]); // Solo se ejecuta cuando currentPage cambia

  const fetchProducts = async (page) => {
    try {
      const response = await fetch(`${APIURL}/shops/products/?page=${page}`);
      const data = await response.json();
      setProductList(data.results);
      setTotalPages(Math.ceil(data.count / 5)); // Suponiendo que hay 5 productos por página
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const changePage = (page) => {
    page = Math.max(1, Math.min(page, totalPages)); // Asegura que la página esté dentro de los límites
    setCurrentPage(page);
    navigate(`/?page=${page}`);
  };

  return (
    <div className="container">
      <h2>Nuestros productos</h2>
      <PageFilter currentPage={currentPage} totalPages={totalPages} changePage={changePage} />
      <ProductList productList={productList} />
    </div>
  );
}

function PageFilter({ currentPage, totalPages, changePage }) {
  return (
    <div className="buttons">
      <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === INITIAL_PAGE}>&lt;</button>
      <input type="number" value={currentPage} onChange={(e) => changePage(parseInt(e.target.value))} />
      <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
    </div>
  );
}

function ProductList({ productList }) {
  return (
    <div>
      {productList.map(product =>
        <Product product={product} key={product.id}/>
      )}
    </div>
  );
}

function Product({product}) {
  return (
    <div className="product-details" id="productDetails">
      <Link to={`./products/${product.id}`}>
        <img src={product.thumbnail} alt="Thumbnail" id="thumbnail" />
      </Link>
      <div className="info">
        <h2>Producto</h2>
        <p>{product.description}</p>
        <p>
          <strong>Precio:</strong><span>{product.price}€</span>
        </p>
        <p>
          <strong>Stock:</strong> <span>{product.stock}</span>
        </p>
      </div>
    </div>)
}

export default ListPage;
