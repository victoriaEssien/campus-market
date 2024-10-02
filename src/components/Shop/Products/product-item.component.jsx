
// Placeholder Images
import ToteBag from "../../../assets/images/tote-bag.png";
import OilPerfume from "../../../assets/images/oil-perfume.png";
import Crocs from "../../../assets/images/crocs.png";
import Shirt from "../../../assets/images/shirt.png";
import Shoe from "../../../assets/images/shoe.png";
import Watch from "../../../assets/images/watch.png";
import Socks from "../../../assets/images/socks.png";
import Necklace from "../../../assets/images/necklace.png";

export const ProductItemComponent = ({ ad }) => {

    return (
        <>
            <div className="cursor-pointer">
                <img src={ad.image} alt={ad.name} className="" />
            </div>
            <p className="mt-4 text-sm text-left font-os font-medium text-black-500">{ad.name}</p>
            <p className="mt-1 text-base text-left font-os font-bold text-black-600">{ad.price}</p>
        </>
    )
}
