import { Button } from "@/components/ui/button"
import { createPayment } from "@/Redux/Payment/Action";
import { CheckCircledIcon, CheckIcon } from "@radix-ui/react-icons"
import { useDispatch } from "react-redux"

const SubscriptionCard = ({ data }) => {
    const dispatch = useDispatch();
    const handleUpgrade = () => {
        dispatch(createPayment({
            planType: data.planType,
            jwt: localStorage.getItem("jwt"),
        })
        );
    };

    return (
        <div className='rounded-xl  bg-opacity-20 shadow-[#14173b] shadow-2xl card p-5 space-y-5 w-[18rem]'>
            <p>{data.planName}</p>
            <p>
                <span className="text-xl font-semibold">₹{data.price}/</span>
                <span>{data.planType}</span>
            </p>

            {data.planType == "ANNUALLY" && <p className="text-green-500">30% off</p>}

            <Button onClick={handleUpgrade} className='w-full bg-white text-black'>
                {data.buttonName}
            </Button>

            {data.features.map((item) => <div key={item} className="flex items-center gap-2">
                <CheckCircledIcon className="w-4 h-4 mt-[1px]" />
                <p>{item}</p>
            </div>)}

        </div>
    );
};

export default SubscriptionCard