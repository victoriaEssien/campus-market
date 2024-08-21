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
import { useState, useEffect } from "react";
import axios from "axios";


// const categories = [
//   { image: FashionCategory, name: "Fashion" },
//   { image: FoodCategory, name: "Groceries & Food" },
//   { image: HealthAndBeautyCategory, name: "Health & Beauty" },
//   { image: ServicesCategory, name: "Services" }
// ];

const featuredAds = [
  { image: ToteBag, name: "Ladies Canvas Tote Bag Cotton Cloth...", price: "₦6,600" },
  { image: OilPerfume, name: "72 Hours Long Lasting Undiluted Oil P...", price: "₦5,000" },
  { image: Crocs, name: "Crocs Bad Bunny Crocs", price: "₦23,000" },
  { image: Shirt, name: "2 IN 1 Men's Fashion Short Sleeve T-shi...", price: "₦11,000" },
  { image: Shoe, name: "ADIDAS Core Sneakers Advantage Base", price: "₦6,600" },
  { image: Watch, name: "Mens Casual Classic Business Quartz C...", price: "₦9,900" },
  { image: Socks, name: "5 Pairs Quality Cotton Ankle Socks - Wh...", price: "₦4,500" },
  { image: Necklace, name: "Butterfly Pendant Necklace Set - Doub...", price: "₦5,300" }
];

function HomePage() {
  // Create States to manage Erros
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);

  // Call Get Categories API
  const fetchCategories = async () => {
    try {
      axios.get('https://campus-market-api.onrender.com/category/all')
        .then(response => {
          setCategories(response.data.data);
          // console.log(response.data.data);
        })
        .catch(err => {
          console.log(err);
          setError("Error fetching categories");
        });

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  return (
    <div>
      <AppNav />
      <div className="mx-4 md:mx-14 mt-14">
        {/* Categories section */}
        <section>
          <h2 className="font-os text-2xl text-black-600 font-semibold">Categories</h2>
          <div className="flex overflow-x-auto space-x-5 md:grid md:grid-cols-5 md:space-x-0 mt-9">
            {categories.length > 0 ?

              categories.map((category, index) => (
                <Link key={index} to="/fashion-items">
                  <div className="w-fit">
                    <div className="bg-accent-500 hover:bg-accent-600 cursor-pointer rounded-[10px] p-2 w-48">
                      <img src={FashionCategory} alt={category.cateName} className="" />
                    </div>
                    <p className="mt-4 text-center font-os font-medium text-black-500">{category.cateName}</p>
                  </div>
                </Link>
              ))

              :<p className='font-lato text-base text-error-700 leading-6'>{error}</p>
              }
          </div>
        </section>

        {/* Featured Ads */}
        <section className="my-20">
          <h2 className="font-os text-2xl text-black-600 font-semibold">Featured Ads</h2>
          <div className="mx-auto md:mx-0 grid grid-cols-1 md:grid-cols-4 gap-x-5 gap-y-20 w-fit mt-9">
            {featuredAds.map((ad, index) => (
              <div key={index} className="w-fit rounded-[10px] hover:bg-accent-200">
                <div className="cursor-pointer">
                  <img src={ad.image} alt={ad.name} className="" />
                </div>
                <p className="mt-4 text-sm text-left font-os font-medium text-black-500">{ad.name}</p>
                <p className="mt-1 text-base text-left font-os font-bold text-black-600">{ad.price}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
