export interface Guitar  {
    id: number,
    name: string,
    image: string,
    description: string,
    price: number,
}

export interface CartItem extends Guitar  {
    quantity:number
}

// export type GuitarId = Pick<Guitar, "id"> //pick

// export type GuitarId = Guitar["id"] //look ok
