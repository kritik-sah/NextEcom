import axios from 'axios';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React ,{ useContext } from 'react'
import Layout from '../../components/Layout'
import Product from '../../models/Product';
import db from '../../utils/db';

import { Store } from '../../utils/Store';

const ProductScreen = (props) => {
    const { product } = props;
    const {state, dispatch} = useContext(Store)
    const router = useRouter();
    
    

    if(!product){
        return (
            <>
            <Layout title="No product Found">
                <div className='min-h-screen w-full flex flex-col items-center justify-center'>

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

    const addToCartHandler = async () =>{
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        const { data } = await axios.get(`/api/products/${product._id}`);

        if (data.countInStock < quantity) {
            return toast.error('Sorry. Product is out of stock');
        }

        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
        toast.success('Product added to the cart');
        
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


export async function getServerSideProps(context){
    const { params } = context;
    const { slug } = params

    await db.connect();
    const product = await Product.findOne({slug}).lean();
    
    await db.disconnect();
    return {
      props: {
        product: product ? db.convertDocToObj(product) : null,
      }
    }
  };

export default ProductScreen