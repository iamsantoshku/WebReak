


import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import SizeSelector from '../components/SizeSelector';  // Import SizeSelector component
import addToWishlist from '../helpers/addToWishlist';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
    availableSizes: []  // New field for available sizes
  });
  const [selectedSize, setSelectedSize] = useState("");  // To keep track of selected size
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState(false);
  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    });
    setLoading(false);
    const dataReponse = await response.json();
    setData(dataReponse?.data);
    setActiveImage(dataReponse?.data?.productImage[0]);
  };

  const handleAddToWishlist = async (e, id) => {
    e.stopPropagation(); // Prevent the click from affecting the Link
    const response = await addToWishlist(e, id);
    if (response.success) {
        toast.success("Product added to wishlist");
    } else {
        toast.error(response.message || "Failed to add to wishlist");
    }
};

// const handle = async(req, res)=>{

// }

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({ x, y });
  }, [zoomImageCoordinate]);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* Product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />
            {/* Product zoom */}
            {zoomImage && (
              <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                <div
                  className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `
                  }}>
                </div>
              </div>
            )}
          </div>

          <div className='h-full'>
            {loading ? (
              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {productImageListLoading.map((el, index) => (
                  <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage" + index}></div>
                ))}
              </div>
            ) : (
              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {data?.productImage?.map((imgURL, index) => (
                  <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                    <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imgURL)} onClick={() => handleMouseEnterProduct(imgURL)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product details */}
        {loading ? (
          <div className='grid gap-1 w-full'>
            {/* Loading skeletons */}
          </div>
        ) : (
          <div className='flex flex-col gap-1'>
            <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
            <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
            <p className='capitalize text-slate-400'>{data?.category}</p>

            <div className='text-red-600 flex items-center gap-1'>
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalf />
            </div>

            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
              <p className='text-red-600'>{displayINRCurrency(data.sellingPrice)}</p>
              <p className='text-slate-400 line-through'>{displayINRCurrency(data.price)}</p>
            </div>

            {/* Size Selector Component */}
            <SizeSelector selectedSize={selectedSize} setSelectedSize={setSelectedSize} />

            <div className='flex items-center gap-3 my-2'>
              <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e) => handleBuyProduct(e, data?._id)}>Buy</button>
              <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e) => handleAddToWishlist(e, data?._id)}>Add TO wishList</button>
              <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white' onClick={(e) => handleAddToCart(e, data?._id)}>Add To Cart</button>
            </div>

            <div>
              <p className='text-slate-600 font-medium my-1'>Description: </p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {/* Category-wise product display */}
      {data.category && <CategroyWiseProductDisplay category={data?.category} heading={"Recommended Products"} />}
    </div>
  );
};

export default ProductDetails;




// fetch by name 
// import React, { useCallback, useContext, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import SummaryApi from '../common';
// import { FaStar, FaStarHalf } from "react-icons/fa";
// import displayINRCurrency from '../helpers/displayCurrency';
// import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
// import addToCart from '../helpers/addToCart';
// import Context from '../context';
// import SizeSelector from '../components/SizeSelector';
// import addToWishlist from '../helpers/addToWishlist';
// import { toast } from 'react-toastify';

// const ProductDetails = () => {
//   const [data, setData] = useState({
//     productName: "",
//     brandName: "",
//     category: "",
//     productImage: [],
//     description: "",
//     price: "",
//     sellingPrice: "",
//     availableSizes: []
//   });
//   const [selectedSize, setSelectedSize] = useState("");
//   const params = useParams();
//   const [loading, setLoading] = useState(true);
//   const productImageListLoading = new Array(4).fill(null);
//   const [activeImage, setActiveImage] = useState("");
//   const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
//   const [zoomImage, setZoomImage] = useState(false);
//   const { fetchUserAddToCart } = useContext(Context);
//   const navigate = useNavigate();
//   // const params = useParams();

//   const fetchProductDetails = async () => {
//     setLoading(true);
//     const response = await fetch(SummaryApi.productDetails.url, {
//       method: SummaryApi.productDetails.method,
//       headers: {
//         "content-type": "application/json"
//       },
//       body: JSON.stringify({
//         productName: params?.productName
//       })
//     });
//     setLoading(false);
//     const dataReponse = await response.json();
//     setData(dataReponse?.data);
//     setActiveImage(dataReponse?.data?.productImage[0]);
//   };
  

//   const handleAddToWishlist = async (e, id) => {
//     e.stopPropagation();
//     const response = await addToWishlist(e, id);
//     if (response.success) {
//         toast.success("Product added to wishlist");
//     } else {
//         toast.error(response.message || "Failed to add to wishlist");
//     }
//   };

//   useEffect(() => {
//     fetchProductDetails();
//   }, [params]);

//   const handleMouseEnterProduct = (imageURL) => {
//     setActiveImage(imageURL);
//   };

//   const handleZoomImage = useCallback((e) => {
//     setZoomImage(true);
//     const { left, top, width, height } = e.target.getBoundingClientRect();
//     const x = (e.clientX - left) / width;
//     const y = (e.clientY - top) / height;
//     setZoomImageCoordinate({ x, y });
//   }, [zoomImageCoordinate]);

//   const handleLeaveImageZoom = () => {
//     setZoomImage(false);
//   };

//   const handleAddToCart = async (e, id) => {
//     await addToCart(e, id);
//     fetchUserAddToCart();
//   };

//   const handleBuyProduct = async (e, id) => {
//     await addToCart(e, id);
//     fetchUserAddToCart();
//     navigate("/cart");
//   };

//   return (
//     <div className='container mx-auto p-4'>
//       <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
//         {/* Product Image */}
//         <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
//           <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
//             <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />
//             {zoomImage && (
//               <div className='hidden lg:block absolute min-w-[500px] min-h-[500px] lg:min-w-[700px] lg:min-h-[700px] bg-slate-200 top-0 left-full'>
//                 <img src={activeImage} className='object-scale-down h-full w-full' style={{ transformOrigin: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`, transform: 'scale(2)' }} />
//               </div>
//             )}
//           </div>
//           <div className='flex lg:flex-col gap-2 lg:gap-3'>
//             {loading ? (
//               productImageListLoading.map((_, i) => (
//                 <div key={i} className='w-[50px] h-[50px] md:w-[75px] md:h-[75px] bg-slate-200 animate-pulse rounded-md'></div>
//               ))
//             ) : (
//               data?.productImage?.map((image, i) => (
//                 <img key={i} src={image} className={`w-[50px] h-[50px] md:w-[75px] md:h-[75px] cursor-pointer object-contain mix-blend-multiply border ${image === activeImage ? "border-red-500" : ""}`} onClick={() => handleMouseEnterProduct(image)} />
//               ))
//             )}
//           </div>
//         </div>
//         {/* Product Details */}
//         <div className='lg:grow flex flex-col gap-4'>
//           {loading ? (
//             <div className='min-h-[100px] animate-pulse bg-slate-200'></div>
//           ) : (
//             <>
//               <h1 className='text-xl font-semibold'>{data?.productName}</h1>
//               <p>{data?.description}</p>
//               <p className='text-red-600 font-bold'>{displayINRCurrency(data?.sellingPrice)}</p>
//               <p className='line-through'>{displayINRCurrency(data?.price)}</p>
//               <SizeSelector availableSizes={data?.availableSizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
//               <div className='flex gap-2'>
//                 <button className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded' onClick={(e) => handleAddToCart(e, data._id)}>Add to Cart</button>
//                 <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded' onClick={(e) => handleAddToWishlist(e, data._id)}>Add to Wishlist</button>
//                 <button className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded' onClick={(e) => handleBuyProduct(e, data._id)}>Buy Now</button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//       <CategroyWiseProductDisplay category={data?.category} />
//     </div>
//   );
// }

// export default ProductDetails;
