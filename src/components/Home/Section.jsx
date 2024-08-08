import React, { useRef } from 'react';
import { Row } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../loading/Loading';
import { getProducts } from '../../service/products';
import { Product } from '../Products/Product';
import { useVisible } from '../hooks/useVisible';

export const Section = ({ name }) => {
    const [_, targetRef, isVisible] = useVisible();

    const { loading, data: products, error } = useQuery({
        queryKey: ['products', name],
        queryFn: ({ signal }) => {
            return getProducts(8, 1, signal);
        },
        enabled: isVisible,
    })


    return (
        <div className="my-4 w-100 h-100 px-2 mx-2" ref={(ref) => targetRef(ref)}>
            {loading || !products ? <Loading /> : <>
                <div className='text-center bg-dark text-white py-2 my-5'>{name}</div>
                <Row>
                    {products.data.map((product) => (
                        <Product product={product} key={product._id} />
                    ))}
                </Row>
            </>}
        </div>
    );
};

