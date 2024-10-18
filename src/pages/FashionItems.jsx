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

  return (
    <div>
      {console.log(selectedCategory)}
      <div>
        <AppNav />
      </div>
      <div className="mx-4 md:mx-14 mt-14 ">

        {/* Fashion Items */}
        <section className="my-20">
          <h2 className="font-os text-2xl text-black-600 pt-7 font-semibold">{selectedCategory.cateName}</h2>
          <div className="mx-auto md:mx-0 grid grid-cols-1 md:grid-cols-4 gap-x-5 gap-y-20 w-fit mt-9">
            {featuredAds.map((ad, index) => (
              <a href='/description' key={index}>
                <div key={index} className="w-fit rounded-[10px] hover:bg-accent-200">
                  <div className="cursor-pointer">
                    <img src={ad.image} alt={ad.name} className="" />
                  </div>
                  <p className="mt-4 text-sm text-left font-os font-medium text-black-500">{ad.name}</p>
                  <p className="mt-1 text-base text-left font-os font-bold text-black-600">{ad.price}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default FashionItems;
