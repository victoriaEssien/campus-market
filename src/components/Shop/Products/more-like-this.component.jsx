
// Components
import { ProductItemComponent } from "./product-item.component";

import ToteBag from "../../../assets/images/tote-bag.png";
import OilPerfume from "../../../assets/images/oil-perfume.png";
import Crocs from "../../../assets/images/crocs.png";
import Shirt from "../../../assets/images/shirt.png";
import Shoe from "../../../assets/images/shoe.png";
import Watch from "../../../assets/images/watch.png";

export const MoreLikeThisComponent = ({ title }) => {

    const featuredAds = [
        { image: ToteBag, name: "Ladies Canvas Tote Bag Cotton Cloth...", price: "₦6,600" },
        { image: OilPerfume, name: "72 Hours Long Lasting Undiluted Oil P...", price: "₦5,000" },
        { image: Crocs, name: "Crocs Bad Bunny Crocs", price: "₦23,000" },
        { image: Shirt, name: "2 IN 1 Men's Fashion Short Sleeve T-shi...", price: "₦11,000" },
      ];

    return (
        <>
            <div className="md:mx-4">
                <section className="my-20">
                    <h2 className="mx-5 md:-mx-1 font-os text-xl text-black-600 font-semibold">{ title }</h2>
                    <div className="mx-auto md:mx-0 grid grid-cols-1 md:grid-cols-4 gap-x-5 gap-y-20 w-fit mt-9">
                        {featuredAds.map((ad, index) => (
                        <div 
                            key={index} 
                            className="w-fit rounded-[10px] hover:bg-accent-200" 
                            onClick={ () => navigate("/description") }
                        >
                            <ProductItemComponent ad={ ad } index={ index } />
                        </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}
