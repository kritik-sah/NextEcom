import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React ,{ useContext } from 'react'
import Layout from '../../components/Layout'
import data from '../../utils/data';
import { Store } from '../../utils/Store';

const ProductScreen = () => {
    const {state, dispatch} = useContext(Store)
    const {query} = useRouter();
    const {slug} = query;
    const product = data.products.find(item => item.slug === slug);
    
    

    if(!product){
        return (
            <>
            <Layout title="No product Found">
                <div className='min-h-screen w-full flex items-center justify-center'>

                    <h1 className='text-3xl'>No product found</h1>
                    <Link href="/">
                    <button className="primary-button" type="button">
                        Back to Home
                    </button>
                    </Link>

                </div>
            </Layout>
            </>
        )
    }

    const addToCartHandler = () =>{
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        if (product.countInStock < quantity) {
        alert('Sorry. Product is out of stock');
        return;
        }

        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

        
    }
  return (
    <>
    <Layout title={product.title}>
        <article className='px-2'>
            <Link href="/">
                <button className="btn" type="button">
                    Back to Home
                </button>
            </Link>

            <div className='grid md:grid-cols-4 md:gap-3 my-4'>
                <div className="md:col-span-2">
                    <Image src={product.image} alt={product.name} width={640} height={640} layout="responsive" className='rounded-md'/>
                </div>
                <div className=''>
                    <h1 className='text-2xl mb-2'>{product.name}</h1>
                    <p className='mb-2'>{product.rating} | total no. of {product.numReviews}</p>
                    <p className='mb-2'>Category: {product.category}</p>  
                    <p className='mb-2'>Brand: {product.brand}</p>  
                    
                    <p className="mb-2">
                        {product.description}
                    </p>
                </div>
                <div>
                <div className="card p-5">
                    <div className="mb-4 flex justify-between">
                        <div>prize</div>
                        <div className="">${product.price}</div>
                    </div>
                    <div className="mb-4 flex justify-between">
                        <div>Status</div>
                        <div className="">{product.countInStock > 0 ? `In Stock (${product.countInStock})` : "out of stock" }</div>
                    </div>
                    <button className="primary-button w-full" onClick={addToCartHandler} type="button">
                        Add to cart
                    </button>
 
                </div>
                </div>

            </div>
        </article>
    </Layout>
    </>
  )
}

export default ProductScreen