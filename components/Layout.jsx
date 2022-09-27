import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';

export default function Layout({ title, children }) {
    const {state} = useContext(Store)
    const {cart} = state;
    const [cartItemsCount, setCartItemsCount] = useState(0)

    useEffect(() => {
      setCartItemsCount(cart.cartItems.reduce((a,c) => a + c.quantity,0))
    
      
    }, [cart.cartItems])
    
  return (
    <>
      <Head>
        <title>{title ? title + ' - Meme Commerce' : 'Meme Commerce'}</title>
        <meta name="description" content="Meme Commerce a dummy ecom Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <a className="text-lg font-bold">Meme Commerce</a>
            </Link>
            <div>
              <Link href="/cart">
                <a className="p-2">Cart 
                {cartItemsCount > 0 && (
                    <span className='mt-1 mr-2 rounded-full text-xs bg-amber-600 text-white px-2 py-1'>
                        {cartItemsCount}
                    </span>
                )}
                </a>
              </Link>
              <Link href="/login">
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © 2022 Amazona</p>
        </footer>
      </div>
    </>
  );
}