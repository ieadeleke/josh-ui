import Image from "next/image";
import WomanImg from "../images/woman.png";
import WomanFrameImg from "../images/woman-card-frame.png";
import ManFrameImg from "../images/man-frame.png";
import ManImg from "../images/man.png";
import FrameImg from "../images/frame.png";
import LocationIcon from "../images/location.svg";
import CursorImg from "../images/cursor.png";
import FlowingArrow from "./components/FlowingArrow";

export default function Home() {
  return (
    <section className="py-32">
      <div className="max-w-93.25 mx-auto text-center">
        <h3 className="text-5xl leading-12">
          Money moves,{" "}
          <span className="text-accent font-black">Instantly.</span>
        </h3>
      </div>
      <div className="relative mt-16 max-w-400 mx-auto px-6 lg:px-20">
        <FlowingArrow />
        {/* Top-left card */}
        <div
          id="fp-row1"
          className="flex flex-col lg:flex-row gap-10 lg:gap-16 max-w-300 mx-auto items-center"
        >
          <div
            id="fp-woman-col"
            className="w-full lg:flex-1 relative flex flex-col"
          >
            <div className="relative">
              <Image
                src={WomanImg}
                alt="Business Woman posing"
                width={940}
                height={580}
                className="w-full rounded-2xl"
              />
              <div className="absolute px-6 lg:px-10 bottom-0 left-0 w-full pb-6 lg:pb-10 bg-linear-to-t from-black/80 to-transparent rounded-2xl">
                <div className="flex items-center gap-2 mb-2 lg:mb-4">
                  <Image
                    src={LocationIcon}
                    alt="location icon"
                    width={32}
                    height={32}
                    className="w-6 h-6 lg:w-8 lg:h-8"
                  />
                  <p className="text-sm lg:text-base text-white">
                    Lagos, Nigeria
                  </p>
                </div>
                <h4 className="text-lg lg:text-2xl text-white font-bold">
                  Business Woman <span className="font-normal">&bull; </span>
                  <span className="text-accent text-base lg:text-xl font-normal">
                    Needs to pay her China supplier
                  </span>
                </h4>
              </div>
            </div>

            <div className="lg:absolute lg:inset-0 flex items-center justify-center mt-6 lg:mt-0">
              <div className="relative group w-full max-w-[400px]">
                <Image
                  src={WomanFrameImg}
                  alt="card showing nigerian business"
                  width={400}
                  height={280}
                  className="w-full"
                />
                <button
                  id="fp-send-btn"
                  disabled
                  className="mt-3 w-full py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-bold text-lg cursor-pointer shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Send
                </button>
                <Image
                  id="fp-cursor"
                  src={CursorImg}
                  alt="cursor hovering over send button"
                  width={45}
                  height={45}
                  className="absolute -bottom-3 right-14"
                />
              </div>
            </div>
          </div>
          <div
            id="fp-text1"
            className="w-full lg:w-65 text-center lg:text-left lg:pt-32"
          >
            <h2 className="text-xl lg:text-2xl font-black mb-2 leading-[1.4]">
              Funds leave your Yolat wallet in NGN...
            </h2>
            <p className="text-sm lg:text-base leading-normal">
              Converted at real-time exchange rates. No hidden spreads.
            </p>
          </div>
        </div>

        {/* Connecting element */}
        <div className="lg:pl-32">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-14 max-w-145 my-80 lg:my-60 items-center lg:items-start">
            <div
              id="fp-converting-text"
              className="w-full lg:w-80 text-center lg:text-left"
            >
              <h2 className="text-xl lg:text-2xl font-black mb-2 leading-[1.4]">
                ...converted at live interbank rates...
              </h2>
              <p className="text-sm lg:text-base leading-normal">
                You see exactly how much lands on the other side before
                confirming
              </p>
            </div>
            <Image
              id="fp-frame"
              src={FrameImg}
              alt="frame"
              width={281}
              height={213}
              className="w-48 lg:w-[281px]"
            />
          </div>
        </div>

        {/* Bottom-right card */}
        <div
          id="fp-row3"
          className="flex flex-col lg:flex-row gap-7 lg:gap-16 max-w-300 mx-auto mt-80 lg:mt-60 items-center"
        >
          <div
            id="fp-text3"
            className="w-full lg:w-65 text-center lg:text-left lg:pt-20"
          >
            <h2 className="text-xl lg:text-2xl font-black mb-2 leading-[1.4]">
              ...and arrives within seconds. Every time
            </h2>
            <p className="text-sm lg:text-base leading-normal mx-auto lg:mx-0 lg:w-[80%]">
              Your recipient is notified instantly. You get a full receipt
            </p>
          </div>
          <div
            id="fp-man-col"
            className="w-full lg:flex-1 relative flex flex-col"
          >
            <div className="relative">
              <Image
                src={ManImg}
                alt="Business man smiling"
                width={940}
                height={580}
                className="w-full rounded-2xl"
              />
              <div className="absolute px-6 lg:px-10 bottom-0 left-0 w-full pb-6 lg:pb-10 bg-linear-to-t from-black/80 to-transparent rounded-2xl">
                <div className="flex items-center gap-2 mb-2 lg:mb-4">
                  <Image
                    src={LocationIcon}
                    alt="location icon"
                    width={32}
                    height={32}
                    className="w-6 h-6 lg:w-8 lg:h-8"
                  />
                  <p className="text-sm lg:text-base text-white">
                    Beijing, China
                  </p>
                </div>
                <h4 className="text-lg lg:text-2xl text-white font-bold">
                  China Supplier <span className="font-normal">&bull; </span>
                  <span className="text-accent text-base lg:text-xl font-normal">
                    Receives payment from Nigeria
                  </span>
                </h4>
              </div>
            </div>

            <div className="lg:absolute lg:inset-0 flex items-center justify-center mt-6 lg:mt-0">
              <div className="w-full max-w-[400px] mx-auto relative">
                <Image
                  src={ManFrameImg}
                  alt="card showing chinese business"
                  width={400}
                  height={280}
                  className="w-full"
                />
                <div
                  id="fp-delivered"
                  className="absolute top-5 right-5 px-4 py-1.5 text-xs lg:text-sm font-semibold rounded-full backdrop-blur-md bg-accent/15 border border-accent/40 text-accent z-20"
                >
                  Delivered ✓
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
