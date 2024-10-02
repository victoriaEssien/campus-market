
// Icons
import { FaStar } from "react-icons/fa"; // Star icon
import { FaStarHalfAlt } from "react-icons/fa"; // Half Star icon
import { FaRegStar } from "react-icons/fa"; // Empty Star

const FullStar = () =>  <FaStar /> // Full star component
const HalfStar = () =>  <FaStarHalfAlt /> // Half star component
const EmptyStar = () =>  <FaRegStar /> // Empty star component

export const StarAlignmentComponent = ({ rating }) => {

    // The rated star
    const stars = [];

    // Dynamically create how the star rating should be
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
          stars.push(<FullStar key={i} />); // Full star
        } else if (rating >= i - 0.5) {
          stars.push(<HalfStar key={i} />); // Half star
        } else {
          stars.push(<EmptyStar key={i} />); // Empty star
        }
      }

    return (
        <div className="flex text-orange-400 mb-0.5">
            { stars }
        </div>
    )
}
