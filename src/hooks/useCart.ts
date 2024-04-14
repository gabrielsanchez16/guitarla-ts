import { useEffect, useState, useMemo } from "react"
import { db } from "../helpers/db"
import { Flip, toast, ToastContainer, Zoom } from "react-toastify"
import type {Guitar,CartItem} from "../interfaces/interfaces"




const useCart = () => {

    const initialCart = () : CartItem[]=>{
        const localStorageCart = localStorage.getItem("cart")
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    const [cart, setCart] = useState(initialCart)

    const addToCart = (item : Guitar) => {
        const itemExisting = cart?.findIndex((guitar : Guitar) => item.id === guitar.id)
        if (itemExisting >= 0) {
            const updatedCart = [...cart]
            updatedCart[itemExisting].quantity++
            setCart(updatedCart)
            toast.success('Actualizado el carrito', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition:Flip
            });
        } else {
            const newItem : CartItem = {...item,quantity:1} 
            setCart([...cart, newItem])
            toast.success('Agregado al carrito', {
                position: "top-right",
                autoClose: 1500,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition:Flip
            });
        }
    }

    const removeGuitarCart = (id : Guitar["id"]) => {
        const filters = cart?.filter((item) => item.id !== id)
        setCart(filters)
        toast.error("Borrado del carrito", {
            position: "top-right",
            autoClose: 1500,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            transition:Zoom
        });
    }


    const sumarGuitarCart = (id : Guitar["id"]) => {
        const index = cart?.findIndex((item) => item.id === id);

        if (index !== -1) {
            const updatedCart = [...cart];
            const item = updatedCart[index];

            item.quantity++

            setCart(updatedCart); // Actualizar el estado del carrito
        }
    }

    const restarGuitarCart = (id : Guitar["id"]) => {
        const index = cart.findIndex((item) => item.id === id);

        if (index !== -1) {
            const updatedCart = [...cart];
            const item = updatedCart[index];

            if (item.quantity === 1) {
                updatedCart.splice(index, 1); // Eliminar el elemento si la cantidad es 1
                toast.error("Borrado del carrito", {
                    position: "top-right",
                    autoClose: 1500,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    transition:Zoom
                });
            } else {
                item.quantity--; // Reducir la cantidad
            }

            setCart(updatedCart); // Actualizar el estado del carrito
        }
    }

    const clearCart = () => {
        setCart([])
    }

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const total = useMemo(() => cart?.reduce((total, item) => total + (item?.quantity * item?.price), 0), [cart])
    const isEmpty = useMemo(() => cart?.length == 0, [cart])

    return {
        cart,
        clearCart,
        restarGuitarCart,
        sumarGuitarCart,
        addToCart,
        removeGuitarCart,
        db,
        total,
        isEmpty,
        ToastContainer
    }
}

export default useCart