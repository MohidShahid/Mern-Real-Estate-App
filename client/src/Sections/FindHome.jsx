import { KeyRound, SearchCheck, ClipboardCheck, HousePlus, PencilRuler, InspectionPanel, PaintRoller } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import Image1 from "../assets/Images/FindHome.jpg";
import Image2 from '../assets/Images/renovation (1).jpg'
import Image3 from '../assets/Images/renovation (2).jpg'
import Image4 from '../assets/Images/renovation (3).jpg'

function FindHome() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-28 w-full">
      <div className="px-5 flex flex-col w-full text-4xl gap-16 py-24">
        <h1>
          How it works? <br /> Find a{" "}
          <span className="font-bold">Perfect home</span>
        </h1>
        <div className="flex flex-wrap w-full gap-5 justify-between md:pl-2.5">
          <div className="w-80 flex flex-col gap-4 p-4 md:border-r border-gray-300">
            <SearchCheck size={42} strokeWidth={1} />
            <h1 className="text-2xl font-semibold">Find Real Estate</h1>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
              corrupti sed tempore.
            </p>
          </div>
          <div className="w-80 flex flex-col gap-4 p-4 md:border-r border-gray-300">
            <HousePlus size={42} strokeWidth={1} />
            <h1 className="text-2xl font-semibold">Meet relator</h1>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
              corrupti sed tempore.
            </p>
          </div>
          <div className="w-80 flex flex-col gap-4 p-4 md:border-r border-gray-300">
            <ClipboardCheck size={42} strokeWidth={1} />
            <h1 className="text-2xl font-semibold">Documents</h1>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
              corrupti sed tempore.
            </p>
          </div>
          <div className="w-80 flex flex-col gap-4 p-4">
            <KeyRound size={42} strokeWidth={1} />
            <h1 className="text-2xl font-semibold">Take the Keys</h1>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
              corrupti sed tempore.
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col md:flex-row px-5 items-center justify-center gap-12 bg-[#edc0af21] py-24">
        <div className="md:w-2/5 w-full">
          <img src={Image1} alt="" className="rounded design-img" />
        </div>
        <div className="md:w-1/3 w-full flex flex-col gap-6">
          <h1 className="text-4xl">
            Modern spaces and
            <br />
            <span className="font-bold">premium design</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, minimum inimicus quo no, at vix primis
            viderere vituperatoribus. In corpora argumentum.
          </p>
          <ul className="list-disc p-4">
            <li>Mea omnium explicari</li>
            <li>His no legere feugaitoer</li>
            <li>illum idquem</li>
          </ul>
          <Button
            text={"Search Property"}
            className={"bg-[#FFCC41] py-5"}
            onClick={() => navigate("/listings")}
          />
        </div>
      </div>
      <div className="w-full justify-between md:flex-row flex-col px-5 py-24">
          <h1 className="text-4xl">Our expert will help you<br/> make <span className="font-bold">the renovation</span></h1>
        <div className="w-full flex md:flex-row flex-col justify-between items-start md:gap-0 gap-20">
          
          <div className="flex flex-col gap-10 pt-10 md:w-1/3 w-full pl-5">
          <div className="flex gap-7 items-start">
              <InspectionPanel size={62} />
            <div>
              <h1 className="text-2xl font-semibold pb-5">Find inspiration</h1>
              <p className="text-gray-500">
                Sumo petentium ut per, at his wisim utinam adipis cing. Est e
                graeco quod suavitate vix ad praesent.
              </p>
            </div>
          </div>
          <div className="flex gap-7 items-start">
              <PencilRuler size={62} />
            <div>
              <h1 className="text-2xl font-semibold pb-5">Find architect/designer</h1>
              <p className="text-gray-500">
                Sumo petentium ut per, at his wisim utinam adipis cing. Est e
                graeco quod suavitate vix ad praesent.
              </p>
            </div>
          </div>
          <div className="flex gap-7 items-start">
              <PaintRoller size={62} />
            <div>
              <h1 className="text-2xl font-semibold pb-5">Begin renovation</h1>
              <p className="text-gray-500">
                Sumo petentium ut per, at his wisim utinam adipis cing. Est e
                graeco quod suavitate vix ad praesent.
              </p>
            </div>
          </div>
          </div>
          <div className="flex md:flex-row flex-col md:w-3/5 w-full gap-5 items-center justify-center">
           <img src={Image4} alt="" className="md:w-60 w-full rounded-2xl" />
           <div className="flex gap-5 flex-col "><img src={Image2} alt=""className="md:w-80 w-full rounded-2xl" /><img src={Image3} alt=""className="md:w-80 w-full rounded-2xl" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindHome;
