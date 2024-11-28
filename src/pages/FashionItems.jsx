import AppNav from "../components/AppNav";
import FashionCategory from "../assets/images/fashion-category.png";
import FoodCategory from "../assets/images/food-category.png";
import HealthAndBeautyCategory from "../assets/images/health-and-beauty-category.png";
import ServicesCategory from "../assets/images/services-category.png";
import ToteBag from "../assets/images/tote-bag.png";
import OilPerfume from "../assets/images/oil-perfume.png";
import Crocs from "../assets/images/crocs.png";
import Shirt from "../assets/images/shirt.png";
import Shoe from "../assets/images/shoe.png";
import Watch from "../assets/images/watch.png";
import Socks from "../assets/images/socks.png";
import Necklace from "../assets/images/necklace.png";
import { Link } from "react-router-dom";
import { useCategoryStore } from "../stores/category-store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProdcutLoaderComponent } from "../components/Shop/Products/product-loader.component";


const featuredAds = [
  { image: ToteBag, name: "Ladies Canvas Tote Bag Cotton Cloth...", price: "₦6,600" },
  { image: Crocs, name: "Crocs Bad Bunny Crocs", price: "₦23,000" },
  { image: Shirt, name: "2 IN 1 Men's Fashion Short Sleeve T-shi...", price: "₦11,000" },
  { image: Shoe, name: "ADIDAS Core Sneakers Advantage Base", price: "₦6,600" },
  { image: Watch, name: "Mens Casual Classic Business Quartz C...", price: "₦9,900" },
  { image: Necklace, name: "Butterfly Pendant Necklace Set - Doub...", price: "₦5,300" }
];

function FashionItems() {
  // Global states
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const setSelectedProductId = useCategoryStore((state) => state.setSelectedProductId);
  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  const [fetchProductsError, setFetchProductsError] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate() // Helps navigate screens onclick

  const getProducts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`https://campus-market-api.onrender.com/products/all?${selectedCategory.cateName}`)
      const data = await response.json();
      if (response.ok) {
        setProducts(data.data)
        setIsLoading(false)
        return;
      }
      setFetchProductsError('something went wrong. please try again');
      setIsLoading(false)
      return;
    } catch (error) {
      console.log(error)
      setFetchProductsError('something went wrong. please try again');
      setIsLoading(false)
      return;
    }
  }

  const handleSelectedProduct = (e, prod) => {
    e.preventDefault();
    setSelectedProductId(prod._id)
    navigate(`/description/${prod._id}`);
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div>
      {/* {console.log(selectedCategory)} */}
      <div>
        <AppNav />
      </div>
      <div className="mx-4 md:mx-14 mt-14 ">

        {/* Fashion Items */}
        <section className="my-20">
          <h2 className="font-os text-2xl text-black-600 pt-7 font-semibold">{selectedCategory.cateName}</h2>
          <div className="">
            {isLoading ?
              <ProdcutLoaderComponent />
              :
              <div className="mx-auto md:mx-0 grid grid-cols-1 md:grid-cols-4 gap-x-5 gap-y-20 w-fit mt-9">
                {products.length > 0 ?
                  products.map((product, index) => (
                    <a onClick={(e) => handleSelectedProduct(e, product)} key={index}>
                      <div key={index} className="w-fit rounded-[10px] hover:bg-accent-200">
                        <div className="cursor-pointer">
                          <img src={product.images[0].image} alt={product.name} className="rounded-xl" />
                        </div>
                        <p className="mt-4 text-sm text-left font-os font-medium text-black-500">{product.name}</p>
                        <p className="mt-1 text-base text-left font-os font-bold text-black-600">{product.price ? '₦' + product.price : null}</p>
                      </div>
                    </a>
                  ))
                  :
                  <p className="font-lato font-normal text-black-400 leading-normal">No products in this category</p>}
              </div>
            }
          </div>
        </section>
      </div>
    </div>
  );
}

export default FashionItems;
