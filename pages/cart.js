import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import Layout from '../components/Layout'
import { Store } from '../utils/Store'
import {FaTrash} from 'react-icons/fa'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const cart = () => {
    const router = useRouter();
    const {state, dispatch} = useContext(Store)
    const {cart: {cartItems},} = state;

    const removeItemHandler = (item) =>{
        dispatch({type : 'CART_REMOVE_ITEM' , payload : item});
    }
    const updateCartHandler = (item, qty) =>{
        const quantity = Number(qty);
        dispatch({type : 'CART_ADD_ITEM' , payload : {...item, quantity}});
    }

    
  return (
    <>
    <Layout title="Shopping Cart">
    <h1 className='mb-4 text-3xl'>Shopping Cart</h1>
    {
        cartItems.length === 0? 
        (
            <div className='flex flex-col items-center justify-center min-h-screen'>
            <h3 className='mb-4 text-lg text-center'>Your cart is empty!</h3>
            <Link href="/">
            <button className="primary-button text-center mx-auto"  type="button">
                Go Shopping
            </button>
            </Link>
            </div>

        ):(
            <>
            <div className="grid grid-cols-1 md:gap-5 md:grid-cols-4">
                <div className='overflow-x-auto md:col-span-3'>
                    <table className='min-w-full'>
                        <thead className='border-b'>
                            <tr>
                                <th className='px-5 text-left'>Item</th>
                                <th className='p-5 text-right'>Quantity</th>
                                <th className='p-5 text-right'>Price</th>
                                <th className='p-5'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.slug} className="border-b">
                                    <td>
                                        <Link href={`/product/${item.slug}`}>
                                            <a className='flex items-center justify-start'>
                                                <Image src={item.image} alt={item.name} height={50} width={50}/>
                                                &nbsp; {item.name}
                                            </a>
                                        </Link>
                                    </td>
                                    <td className='p-5 text-right'>
                                        <select value={item.quantity} onChange={(e) => {updateCartHandler(item,e.target.value)}}>
                                        {
                                            [...Array(item.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))
                                        }
                                        </select>
                                    </td>
                                    <td className='p-5 text-right'>{item.price}</td>
                                    <td className='p-5 text-center'>
                                        <button onClick={() => removeItemHandler(item)}>
                                        <FaTrash className='h-5 w-5 text-slate-800 hover:text-red-600 text-center m-auto'/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='card p-5'>
                    <ul>
                        <li>
                            <div className="pb-3 text-xl">Subtotal ({cartItems.reduce((a,c) => a + c.quantity,0 )}) {" : "} ${cartItems.reduce((a,c) => a + c.quantity * c.price,0 )}</div>
                        </li>
                        <li>
                        <button className="primary-button w-full" onClick={()=> router.push("login?redirect=/shipping")}  type="button">
                            Checkout
                        </button>
                        </li>
                    </ul>
                </div>

            </div>
            </>
        )
    }
      
    </Layout>
    </>
  )
}

export default dynamic(()=> Promise.resolve(cart), {ssr: false});