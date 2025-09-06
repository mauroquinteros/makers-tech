const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { text: "Out of Stock", class: "out-of-stock" };
    if (quantity <= 3) return { text: "Low Stock", class: "low-stock" };
    return { text: "In Stock", class: "in-stock" };
  };

  const stockStatus = getStockStatus(product.quantity);

  return (
    <div className="product-card">
      <div className="product-header">
        <div className="product-name">{product.name}</div>
        <div className="product-brand">{product.brand}</div>
      </div>

      <div className="product-details">
        <div className="detail-row">
          <span className="detail-label">Price:</span>
          <span className="detail-value price">
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Quantity:</span>
          <div className="quantity-info">
            <span className="detail-value">{product.quantity}</span>
            <span className={`stock-status ${stockStatus.class}`}>
              {stockStatus.text}
            </span>
          </div>
        </div>

        {product.specifications && (
          <div className="specifications">
            <div className="detail-label">Specifications:</div>
            <div className="spec-list">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="spec-item">
                  <span className="spec-key">{key}:</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .product-card {
          background-color: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          margin-top: var(--spacing-sm);
          transition: border-color 0.2s ease;
        }

        .product-card:hover {
          border-color: var(--color-primary);
        }

        .product-header {
          margin-bottom: var(--spacing-md);
        }

        .product-name {
          font-weight: 600;
          color: var(--color-text);
          font-size: 0.875rem;
          margin-bottom: var(--spacing-xs);
        }

        .product-brand {
          color: var(--color-text-secondary);
          font-size: 0.75rem;
        }

        .product-details {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .detail-label {
          color: var(--color-text-secondary);
          font-size: 0.75rem;
          font-weight: 500;
        }

        .detail-value {
          color: var(--color-text);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .detail-value.price {
          color: var(--color-primary);
          font-weight: 700;
        }

        .quantity-info {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .stock-status {
          padding: 2px var(--spacing-xs);
          border-radius: var(--radius-sm);
          font-size: 0.6rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stock-status.in-stock {
          background-color: #dcfce7;
          color: #166534;
        }

        .stock-status.low-stock {
          background-color: #fef3c7;
          color: #92400e;
        }

        .stock-status.out-of-stock {
          background-color: #fee2e2;
          color: #dc2626;
        }

        .specifications {
          border-top: 1px solid var(--color-border);
          padding-top: var(--spacing-sm);
          margin-top: var(--spacing-xs);
        }

        .spec-list {
          margin-top: var(--spacing-xs);
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .spec-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.7rem;
        }

        .spec-key {
          color: var(--color-text-secondary);
          text-transform: capitalize;
        }

        .spec-value {
          color: var(--color-text);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
