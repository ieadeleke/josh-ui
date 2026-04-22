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
      <div className="relative mt-16 max-w-400 mx-auto px-20">
        <FlowingArrow />
        {/* Top-left card */}
        <div
          id="fp-row1"
          className="flex gap-16 max-w-300 mx-auto items-center"
        >
          <div id="fp-woman-col" className="flex-1 relative">
            <Image
              src={WomanImg}
              alt="Business Woman posing"
              width={940}
              height={580}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative group max-w-[400px]">
                <Image
                  src={WomanFrameImg}
                  alt="card showing nigerian business"
                  width={400}
                  height={280}
                />
                <button
                  id="fp-send-btn" disabled
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
            <div className="absolute px-10 bottom-0 left-0 w-full pb-10 bg-linear-to-t from-black/80 to-transparent rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src={LocationIcon}
                  alt="location icon"
                  width={32}
                  height={32}
                />
                <p className="text-base text-white">Lagos, Nigeria</p>
              </div>
              <h4 className="text-2xl text-white font-bold">
                Business Woman <span className="font-normal">&bull; </span>
                <span className="text-accent text-xl font-normal">
                  Needs to pay her China supplier
                </span>
              </h4>
            </div>
          </div>
          <div id="fp-text1" className="w-65 pt-32">
            <h2 className="text-2xl font-black mb-2 leading-[1.4]">
              Funds leave your Yolat wallet in NGN...
            </h2>
            <p className="text-base leading-normal">
              Converted at real-time exchange rates. No hidden spreads.
            </p>
          </div>
        </div>

        {/* Connecting element */}
        <div className="pl-32">
          <div className="flex gap-16 max-w-135 my-60">
            <div id="fp-converting-text" className="w-80">
              <h2 className="text-2xl font-black mb-2 leading-[1.4]">
                ...converted at live interbank rates...
              </h2>
              <p className="text-base leading-normal">
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
            />
          </div>
        </div>
        {/* Bottom-right card */}
        <div id="fp-row3" className="flex gap-16 max-w-300 mx-auto mt-60">
          <div id="fp-text3" className="w-65 pt-20">
            <h2 className="text-2xl font-black mb-2 leading-[1.4]">
              ...and arrives within seconds. Every time
            </h2>
            <p className="text-base leading-normal w-[80%]">
              Your recipient is notified instantly. You get a full receipt
            </p>
          </div>
          <div id="fp-man-col" className="flex-1 relative">
            <Image
              src={ManImg}
              alt="Business man smiling"
              width={940}
              height={580}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={ManFrameImg}
                alt="card showing chinese business"
                width={400}
                height={280}
              />
            </div>
            <div className="absolute px-10 bottom-0 left-0 w-full pb-10 bg-linear-to-t from-black/80 to-transparent rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src={LocationIcon}
                  alt="location icon"
                  width={32}
                  height={32}
                />
                <p className="text-base text-white">Beijing, China</p>
              </div>
              <h4 className="text-2xl text-white font-bold">
                China Supplier <span className="font-normal">&bull; </span>
                <span className="text-accent text-xl font-normal">
                  Receives payment from Nigeria
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
