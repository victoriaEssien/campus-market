import AppNav from "../components/AppNav";
import ToteBag from "../assets/images/tote-bag.png";
import OilPerfume from "../assets/images/oil-perfume.png";
import Crocs from "../assets/images/crocs.png";
import Shirt from "../assets/images/shirt.png";
import Shoe from "../assets/images/shoe.png";
import Watch from "../assets/images/watch.png";
import Socks from "../assets/images/socks.png";
import Necklace from "../assets/images/necklace.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// Skeleton
import { ProdcutLoaderComponent } from "../components/Shop/Products/product-loader.component";

// Navigation Route handler
import { useNavigate } from "react-router-dom";

// Components
import { ProductItemComponent } from "../components/Shop/Products/product-item.component";

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

function MyShop() {
  // Create States to manage Erros
  const [error, setError] = useState('');

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate() // Helps navigate screens onclick

  return (
    <div>
      <AppNav />
      <div className="mx-4 md:mx-14 mt-14">

        {/* Featured Ads */}
        <section className="my-20">
          <h2 className="font-os text-2xl text-black-600 font-semibold">My Products</h2>
          <div className="mx-auto md:mx-0 grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-20 w-fit mt-9">
            {featuredAds.map((ad, index) => (
              <div
                key={index}
                className="w-fit rounded-[10px] hover:bg-accent-200"
                onClick={() => navigate("/description")}
              >
                <ProductItemComponent ad={ad} index={index} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyShop;
