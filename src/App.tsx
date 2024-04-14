import Guitar from "./components/Guitar/Guitar"
import Header from "./components/Header/Header"
import useCart from "./hooks/useCart"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const {
    cart,
    clearCart,
    restarGuitarCart,
    sumarGuitarCart,
    addToCart,
    removeGuitarCart,
    db,
    isEmpty,
    total,
    ToastContainer
  } = useCart()



  return (
    <>
      <Header
        cart={cart}
        removeGuitarCart={removeGuitarCart}
        increaseQuantity={sumarGuitarCart}
        decreaseQuantity={restarGuitarCart}
        clearCart={clearCart}
        isEmpty={isEmpty}
        total={total}
      />
      <ToastContainer stacked />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

          {
            db.map((item) => {
              return (
                <Guitar
                  guitar={item}
                  key={item?.id}
                  addToCart={addToCart}
                />
              )
            })
          }

        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
