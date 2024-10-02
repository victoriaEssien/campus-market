
// Icons
import { FaStar } from "react-icons/fa"; // Star icon

// Component
import { StarAlignmentComponent } from "./star-alignment.component";

export const ReviewSummaryComponent = ({ rating, record }) => {

    const rated = [];

    const getRating = () => {
        for(let i in record){
            rated.push(
                <div key={ i } className="flex text-base" >
                    <p>{ i }</p>
                    <FaStar className="text-orange-400 mx-2.5 mt-1" />
                    <p>({ record[i] })</p>
                </div>
            )
        }
    }

    getRating();

    return (
        <div className="p-5 border rounded-md md:mr-12 md:mt-3 md:max-h-72">
            <div className="flex mb-5">
                <h1 className="text-4xl font-semibold mr-3">4.9</h1>
                <div>
                    <StarAlignmentComponent rating={ rating } />
                    <p style={{ color: "#497492" }}>(30) reviews</p>
                </div>
            </div>

            <div className="flex-col-reverse">
                { rated }
            </div>

            <button 
                className="py-2.5 px-6 mt-6 text-white rounded-lg" 
                style={{ background: "#11334D" }}
            >
                Leave A Review
            </button>
        </div>
    )
}
