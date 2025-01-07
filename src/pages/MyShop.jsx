import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNav from "../components/AppNav";
import { ProductItemComponent } from "../components/Shop/Products/product-item.component";
import { useUserStore } from "../stores/user-store"; // Import Zustand store
import { Link } from "react-router-dom";
import StoreImg from "../assets/images/store-illustration.svg";
import ToteBag from "../assets/images/tote-bag.png";
import OilPerfume from "../assets/images/oil-perfume.png";
import Crocs from "../assets/images/crocs.png";
import Shirt from "../assets/images/shirt.png";
import Shoe from "../assets/images/shoe.png";
import Watch from "../assets/images/watch.png";
import Socks from "../assets/images/socks.png";
import Necklace from "../assets/images/necklace.png";

const featuredAds = [
  {
    image: ToteBag,
    name: "Ladies Canvas Tote Bag Cotton Cloth...",
    price: "₦6,600",
  },
  {
    image: OilPerfume,
    name: "72 Hours Long Lasting Undiluted Oil P...",
    price: "₦5,000",
  },
  { image: Crocs, name: "Crocs Bad Bunny Crocs", price: "₦23,000" },
  {
    image: Shirt,
    name: "2 IN 1 Men's Fashion Short Sleeve T-shi...",
    price: "₦11,000",
  },
  { image: Shoe, name: "ADIDAS Core Sneakers Advantage Base", price: "₦6,600" },
  {
    image: Watch,
    name: "Mens Casual Classic Business Quartz C...",
    price: "₦9,900",
  },
  {
    image: Socks,
    name: "5 Pairs Quality Cotton Ankle Socks - Wh...",
    price: "₦4,500",
  },
  {
    image: Necklace,
    name: "Butterfly Pendant Necklace Set - Doub...",
    price: "₦5,300",
  },
];

function MyShop() {
  const navigate = useNavigate();
  const { user } = useUserStore(); // Access user data from Zustand store
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Check if the user is authenticated and is a seller
  const isSeller = user?.seller;

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading state
  }

  if (!isSeller) {
    return (
      <div>
        <AppNav />
        <div className="mx-4 md:mx-auto">
          <img
            src={StoreImg}
            alt="email illustration"
            className="w-3/6 md:w-2/12 mx-auto mt-8"
          />
          <h1 className="font-os text-2xl md:text-4xl text-center text-black-600 font-bold leading-relaxed mt-4">
            You Don&apos;t Have a Shop Yet :(
          </h1>
          <p className="font-os text-md text-black-400 text-center leading-relaxed mx-auto w-11/12 md:w-4/12 mt-2 md:mt-4">
            Turn your passion into profit—create your shop today and start
            selling in minutes!
          </p>
          <div className="mt-8 md:mt-6 mx-auto md:w-fit">
            <Link to="/seller-registration">
              <button
                type="button"
                className="bg-primary-700 rounded-[10px] text-center block md:inline font-lato text-white text-lg font-normal w-full md:w-[239px] px-[30px] py-[14px] hover:bg-primary-800"
              >
                Create My Shop
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AppNav />
      <div className="mx-4 md:mx-14 mt-14">
        {/* Featured Ads */}
        <section className="my-20">
          <h2 className="font-os text-2xl text-black-600 font-semibold">
            My Products
          </h2>
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
