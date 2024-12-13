import { useState } from 'react'
import ReactStars from "react-rating-stars-component";
import './App.css'
import { Heart, MinusIcon, PlusIcon } from 'lucide-react';
import Modal from './utils/Modal';
import toast, { Toaster } from 'react-hot-toast';

const product = {
  "id": 101,
  "name": "Classy Modern Smart Watch",
  "price": {
    "original": 99.00,
    "discounted": 79.00
  },
  "rating": 3.5,
  "reviews": 2,
  "description": "I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teaching.",
  "type": "Watch",
  "model_number": "Forerunner 290XT",
  "colors": [
    {
      "name": "Purple",
      "code": "#816BFF",
      "image": "https://i.ibb.co.com/dmRTrVG/product-gallery.png"
    },
    {
      "name": "Cyan",
      "code": "#1FCEC9",
      "image": "https://i.ibb.co.com/QX8wZbK/lg-a-3.png"
    },
    {
      "name": "Blue",
      "code": "#4B97D3",
      "image": "https://i.ibb.co.com/889yJ0j/lg-a-3-1.png"
    },
    {
      "name": "Black",
      "code": "#3B4747",
      "image": "https://i.ibb.co.com/C6hNkCK/black.png"
    }
  ],
  "wrist_sizes": [
    {
      "label": "S",
      "price": 69
    },
    {
      "label": "M",
      "price": 79
    },
    {
      "label": "L",
      "price": 89
    },
    {
      "label": "XL",
      "price": 99
    }
  ],
  "stock": 100
}

function App() {

  const [currentColor,setCurrentColor] = useState(product.colors[0].code);
  const [currentSize,setCurrentSize] = useState(product.wrist_sizes[0].label);
  const [isOpen,setIsOpen] = useState(false);
  const [cartItems,setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const currentImage = product.colors.find((item) => item.code === currentColor);
  const currentColorName = product.colors.find((item) => item.code === currentColor).name;
  const thisProductPrice = product.wrist_sizes.find((item) => item.label === currentSize
  ).price;
  const quantityTotal = cartItems.length > 0 ? cartItems.reduce((prev,curr) => prev + curr.qty,0) : 0;

  const priceTotal = cartItems.length > 0 ? cartItems.reduce((prev,curr) => prev + curr.price * curr.qty,0) : 0;
  

  const handleAddToCart = (item,image,name,color,size,qty,price) => {

    if(quantity < 1){
      toast('please add an item first'); 
      return
    }

    const products = {
      id : item.id,
      image,
      name,
      color,
      size,
      qty,
      price
    }

    const existingId = cartItems.findIndex((pdt) => product.id === pdt.id && pdt.image === products.image && pdt.size === products.size );


    if(cartItems[existingId]){
      const updatedItem = [...cartItems];
      updatedItem[existingId].qty += qty;
      setCartItems(updatedItem)
    }else{
      setCartItems([...cartItems,products])
    }

  }


  const handleIncrement = () => {
    setQuantity(quantity + 1);
  }

  const handleDecrement = () => {
    if(quantity > 0){
      setQuantity(quantity - 1)
    }
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  const onClose = () => {
    setIsOpen(false);
  }


  return (
    <>
      <section className='flex flex-col lg:flex-row gap-10'>
          <div className='w-fit'>
            <img src={currentImage.image} alt="" className='h-auto w-auto lg:h-[720px] lg:max-w-[600px]'/>
          </div>

          <div className='flex flex-col justify-start space-y-5'>
            <h2 className='text-[40px] text-[#364A63] font-bold'>Classy Modern Smart watch</h2>
            <div className='flex gap-2 items-center'>
              <ReactStars 
               count={5}
               value={product.rating}
               isHalf={true}
               edit={false}
               size={18}
               activeColor="#ffd700"
               className="cursor-pointer"
              />
              <p className='text-[#8091A7] text-sm'>({product.reviews} Reviews)</p>
            </div>
            <h5 className='text-[#6576FF] text-2xl text-start font-bold '>
              
              {
                !product.price.discounted ? 
                <span>${product.price.original}</span>
                : 
                <div className='flex items-center gap-2'>
                    <span className='text-[#8091A7] text-xl font-light line-through'>${product.price.original}.00</span>
                    <span>${product.price.discounted}.00</span>
                </div>        
              }
            </h5>
            <p className='text-[#8091A7] text-lg text-start'>I must explain to you how all this mistaken idea of denoun cing ple praising pain was born and I will give you a complete account of the system, and expound the actual teaching.</p>
            <div className='flex gap-[43px] text-[#8091A7] text-sm'>
              <p className='text-inherit'>Type</p>
              <p className='text-inherit'>Model Number</p>
            </div>
            <div className='flex gap-6 text-[#364A63] text-base font-bold'>
              <p className='text-inherit'>{product.type}</p>
              <p className='text-inherit'>{product.model_number}</p>
            </div>

            <p className='text-lg text-[#364A63] font-bold'>Band Color</p>

            {/* color */}
            <div className='flex gap-3'>
              {
                product.colors.map((color) => {
                  return <div onClick={() => setCurrentColor(color.code)} key={color.code} style={{borderColor : currentColor}} className={`${color.code === currentColor ? `border rounded-full` : 'border-0'}`}>
                    <div style={{backgroundColor : color.code}} className={`h-4 w-4 rounded-full m-1 cursor-pointer`}></div>
                  </div>
                })
              }
            </div>

            {/* wrist size */}
            <div>
              <p className='text-[#364A63] text-lg font-bold'>Wrist Size</p>
              <div className='flex gap-2 md:gap-5 mt-2'>
                {
                  product.wrist_sizes.map((item) => {
                    return <div key={item.price} onClick={() => setCurrentSize(item.label)} className={`flex gap-3 border px-[18px] py-2 cursor-pointer ${item.label === currentSize ? " border-[#6576FF]" : "border-[#DBDFEA]"}`}>
                        <p className={`${currentSize === item.label ? 'text-[#6576FF]' : 'text-[#364A63]'}  text-sm font-bold`}>{item.label}</p>
                        <p className='text-[#8091A7] text-[13px]'>${item.price}</p>
                    </div>
                  })
                }
              </div>
            </div>

            <div className="flex items-center gap-2  w-fit ">
              <div className="flex items-center border-[0.5px] border-[#DBDFEA] rounded-md">
                <button
                  onClick={handleDecrement}
                  className="h-10 w-10 flex justify-center items-center border-r border-r-[#DBDFEA] rounded-none outline-none focus:outline-none"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  // onChange={handleInputChange}
                  className="w-16 h-10 border-0 text-center outline-none"
                />
                <button
                  onClick={handleIncrement}
                  className="h-10 w-10  border-l border-l-[#DBDFEA] flex justify-center items-center rounded-none focus:outline-none"
                >
                  <PlusIcon className="h-4 w-4 outline-none" />
                </button>
              </div>
              <button 
                onClick={() =>  handleAddToCart(product,currentImage.image,product.name,currentColorName,currentSize,quantity,thisProductPrice)}
                className="flex-1 bg-[#6576FF] text-white text-nowrap px-[18px] py-2 rounded-[3px] outline-none focus:outline-none"
              >
                Add to Cart
              </button>
              <button
                className="h-10 w-10"
              >
                <Heart 
                  className={`h-5 w-5 text-[#6576FF] focus:outline-none`} 
                />
              </button>
            </div>

          </div>
      </section>
      <div className='flex justify-center mt-20'>
        <button
        style={{ filter: 'drop-shadow(0 0 15px rgba(0, 0, 0, 0.25))' }}
        onClick={onOpen} className='bg-[#FFBB5A] text-[#364A63] focus:outline-none  flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full '>Checkout  <span className='bg-white px-2 py-1 rounded-md'>{cartItems.length}</span></button>
      </div>

      {/* cart  */}
      {
        isOpen &&  <Modal 
        content={
          <div className='md:max-w-[651px] md:w-auto w-[651px] pr-5 md:pr-0 text-center overflow-x-auto md:overflow-x-hidden'>
          {/* table heading */}
          <div className='grid grid-cols-8 gap-3 border-b pb-4 text-[#8091A7] text-sm '>
            <div className='text-start'>Item</div>
            <div></div>
            <div></div>
            <div></div>
            <div>Color</div>
            <div>Size</div>
            <div>Qnt</div>
            <div>Price</div>
          </div>  
  
               {/*cart  contents*/}
          <div>
             {
              cartItems.map((item,idx) => {
                return <div className='grid grid-cols-8 gap-2 py-4 border-b items-center ' key={idx}>
                  <div className='col-span-4 gap-2 flex items-center'>
                  <img src={item.image} alt={item.name} className='h-9 w-9 '/>
                  <p className='text-nowrap text-sm text-[#364A63]'>{item.name}</p>
                  </div>
                  <p className='text-sm text-[#364A63]'>{item.color}</p>
                  <p className='text-sm text-[#364A63] font-bold leading-[23.1px]'>{item.size}</p>
                  <p className='text-sm text-[#364A63] font-bold leading-[23.1px]'>{item.qty}</p>
                  <p className='text-sm text-[#364A63] font-bold leading-[23.1px]'>${item.price * item.qty}.00</p>
                </div>
              })
             }   
            {/*  total  */}
            <div className='grid grid-cols-8 items-center mt-5'>
              <div className='col-span-6 text-start text-[#364A63] text-base font-bold'>Total</div>
                <p className='col-span-1 text-center text-[#364A63] text-sm font-bold'>{quantityTotal}</p>
                <p className='col-span-1 text-center text-lg text-[#364A63] font-bold'>${priceTotal}.00</p>
              
            </div>
            <div className='flex flex-1 justify-end gap-3 mt-5'>
              <button className='border border-[#DBDFEA] rounded-sm px-4 py-2 focus:outline-none text-[#364A63] text-[13px] font-bold' onClick={onClose}>Continue Shopping</button>
              <button className='bg-[#6576FF] px-3 py-2 text-white  rounded-md focus:outline-none  text-[13px] font-bold'>Checkout</button>
            </div>
          </div>
        </div>
        }
        title={'Your Cart'}
        />
      }
      <Toaster 
        toastOptions={{
            className: '',
            style: {
            background : '#161616',
            padding: '10px 16px 10px 16px',
            color: '#C7C6D3',
            },
        }}
        containerStyle={{
            top: 20,
            left: 50,
            bottom: 20,
            // right: 20,
          }}
        />
    </>
  )
}

export default App
