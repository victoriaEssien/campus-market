
// Icons
import { FaStar } from "react-icons/fa"; // Star icon

// Component
import { StarAlignmentComponent } from "./star-alignment.component";

export const IndividualReviewComponent = () => {

    return (
        <div className="border my-3 p-5 rounded-lg">
            <div className="mb-5">
                <StarAlignmentComponent rating={ 4 } />
            </div>

            <h1 className="text-2xl font-semibold">I love it!</h1>

            <p className="text-base my-6">
                Socks are of great quality. 
                The grey sock’s of a different length and texture but it’s great too! Love it!
            </p>

            <p className="text-sm text-gray-400">29-09-2024 by John Doe</p>
        </div>
    )
}
