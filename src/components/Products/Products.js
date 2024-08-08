import React, { useEffect, useRef } from 'react';
import { Row } from 'react-bootstrap';
import { Product } from './Product';
import { getProducts } from '../../service/products';
import { Loading } from '../loading/Loading';
import { useInfiniteQuery } from '@tanstack/react-query';
import useWindowSize from '../hooks/useWindowSize';
import { useVisible } from '../hooks/useVisible';

const Products = () => {
    const { height, width } = useWindowSize()

    const { loading, data: products, error, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['products', height, width],
        queryFn: ({ signal, pageParam }) => {
            return getProducts(12, pageParam, signal)
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage?.nextPage
        }
    })

    const [isVisible, targetRef] = useVisible()

    useEffect(() => {
        if (isVisible && !loading && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [fetchNextPage, isVisible, loading, isFetchingNextPage])


    if (loading || !products) {
        return <Loading />
    }

    if (error) {
        return <div>Something went wrong!!!</div>
    }

    const allProducts = products.pages.map((product) => product.data).flat();


    return (
        <div className="my-4 mx-5 px-2">
            <p>Products</p>
            <Row>
                {allProducts.map((product) => (
                    <Product product={product} key={product._id} />
                ))}
            </Row>
            <div ref={(ref) => targetRef(ref)} style={{ height: '100px' }}></div>
        </div >
    );
};

export default Products;
