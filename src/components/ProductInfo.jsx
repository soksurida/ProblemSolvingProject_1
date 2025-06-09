import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products';

const ProductInfo = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>상품 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ marginBottom: '20px' }}>상품 상세 정보</h3>
      <img
        src={product.explain}
        alt={`${product.name} 설명 이미지`}
        style={{ width: '100%', maxWidth: '800px', display: 'block', margin: '0 auto' }}
      />
    </div>
  );
};

export default ProductInfo;
