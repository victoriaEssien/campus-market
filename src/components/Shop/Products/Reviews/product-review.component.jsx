
// Components
import { ReviewSummaryComponent } from "./review-summary.component";
import { IndividualReviewComponent } from "./individual-review.component";

export const ProductReviewComponent = () => {

    const ratingsRecord = {5:11, 4:7, 3:3, 2:5, 1:4};

    return (
        <div className="mx-4 md:mx-0 md:mr-8">
            <div className="flex justify-between items-baseline mb-8 md:mb-6">
                <h3 className="text-xl font-semibold mb-5">Product Reviews</h3>
                <p className="cursor-pointer text-sm text-blue-600 underline">See all</p>
            </div>

            <div className="md:flex">
                <ReviewSummaryComponent rating={ 2.5 } record={ ratingsRecord } />
                <div>
                    <IndividualReviewComponent />
                    <IndividualReviewComponent />
                    <IndividualReviewComponent />
                    <IndividualReviewComponent />
                    <IndividualReviewComponent />
                    <IndividualReviewComponent />
                </div>
            </div>
            
        </div>
    )
}
