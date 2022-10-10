import {signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import React, { useContext, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Store } from '../utils/Store';

export default function Layout({ title, children }) {
    const {state , dispatch} = useContext(Store)
    const {cart} = state;
    const [cartItemsCount, setCartItemsCount] = useState(0)
    const {status, data: session} = useSession();

    useEffect(() => {
      setCartItemsCount(cart.cartItems.reduce((a,c) => a + c.quantity,0))
    
      
    }, [cart.cartItems])

    const logoutClickHandler = () => {
      Cookies.remove('cart');
      dispatch({ type: 'CART_RESET' });
      signOut({ callbackUrl: '/login' });
    };
    
  return (
    <>
      <Head>
        <title>{title ? title + ' - Meme Commerce' : 'Meme Commerce'}</title>
        <meta name="description" content="Meme Commerce a dummy ecom Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>

      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <a className="text-lg font-bold">Meme Commerce</a>
            </Link>
            <div className='space-x-4'>
              <Link href="/cart">
                <a className="p-2">Cart 
                {cartItemsCount > 0 && (
                    <span className='mt-1 mr-2 rounded-full text-xs bg-amber-600 text-white px-2 py-1'>
                        {cartItemsCount}
                    </span>
                )}
                </a>
              </Link>
              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-amber-400 hover:text-amber-500">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login">
                  <a className="p-2">Login</a>
                </Link>
              )}

              
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © 2022 Meme Commerse</p>
        </footer>
      </div>
    </>
  );
}