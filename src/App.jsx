import { createTheme, ThemeProvider } from '@mui/material';
import Banner from './Componets/Banner/Banner'
import Header from './Componets/Header/Header'
import { Navigate, Route, Routes, useLocation } from 'react-router';
import Wishlist from './Componets/Wishlist/Wishlist';
import Footer from './Componets/Footer/Footer';
import Home from './Componets/Home/Home';
import CartProduct from './Componets/CartProduct/CartProduct';
import MensProducts from './Componets/MenProducts/MenProducts';
import WomensProducts from './Componets/WomensProducts/WomensProducts';
import KidsProducts from './Componets/KidsProducts/KidsProduts';
// import Shop from './Componets/Shop/Shop';
import Contact from './Componets/Contact/Contact';
import { AnimatePresence, motion } from 'framer-motion';
import Login from './Componets/Login/Login';
import SignUp from './Componets/Register/Register';
import { useState } from 'react';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'monospace',
    },
  });

  const location = useLocation();

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeInOut' } },
  };


  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
   
        <AnimatePresence exitBeforeEnter mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  variants={pageTransition}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ minHeight: '100vh' }}
                >
                  <Home />
                </motion.div>
              }
            />
            <Route
              path="/wishlist"
              element={
                <motion.div
                  variants={pageTransition}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ minHeight: '100vh' }}
                >
                  <Wishlist />
                </motion.div>
              }
            />
            <Route
              path="/CartProduct"
              element={
                <motion.div
                  variants={pageTransition}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ minHeight: '100vh' }}
                >
                  <CartProduct />
                </motion.div>
              }
            />
            <Route
              path="/mens"
              element={
                <motion.div
                  variants={pageTransition}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ minHeight: '100vh' }}
                >
                  <MensProducts />
                </motion.div>
              }
            />
            <Route
              path="/womens"
              element={
                <motion.div
                  variants={pageTransition}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ minHeight: '100vh' }}
                >
                  <WomensProducts />
                </motion.div>
              }
            />
            <Route
              path="/kids"
              element={
                <motion.div
                  variants={pageTransition}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ minHeight: '100vh' }}
                >
                  <KidsProducts />
                </motion.div>
              }
            />
            <Route
              path="/contact"
              element={
                <motion.div
                  variants={pageTransition}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ minHeight: '100vh' }}
                >
                  <Contact />
                </motion.div>
              }
            />

            <Route
              path="/login"
                element={<motion.div
                  variants={pageTransition}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ minHeight: '100vh' }}
                >
                  <Login />
                </motion.div>}
            />

            <Route
              path="/signIn"
              element={
                <motion.div
                  variants={pageTransition}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ minHeight: '100vh' }}
                >
                  <SignUp />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}

export default App;
