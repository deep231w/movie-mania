import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { NetworkIcon, Wifi } from "lucide-react";
import { useNetwork } from "../contexts/NetworkContext";

interface NavbarProps {
  view: "home" | "movies";
  setView: Dispatch<SetStateAction<"home" | "movies">>;
}
export default function Navbar({setView}:NavbarProps){

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate=  useNavigate();

const { onlineStatus, setOnlineStatus } = useNetwork();
    return (
        <div className="nav flex justify-between">
            <div ref={dropdownRef}>
                <button className="account flex flex-center items-center" onClick={()=>setOpen(!open)}>
                    <div className=" rounded-lg h-10 w-10 bg-red-700 flex justify-center items-center text-white text-2xl">
                            D
                    </div>
                </button>
                {open && (
                    <div className="absolute z-50 mt-3 w-56 overflow-hidden rounded-xl bg-gray-800 shadow-2xl">
                        <div className=" px-4 py-3">
                        <p className="text-xs text-gray-200">
                            deep@gmail.com
                        </p>
                        </div>

                        <button 
                            className="flex w-full cursor-pointer items-center px-4 py-3 text-left text-sm text-gray-300 transition hover:text-gray-500"
                            onClick={()=>{
                                setOpen(false)
                                navigate('/account')
                            }}
                        >
                            Account
                        </button>

                        <div className="border-t" />

                        <button className="flex w-full cursor-pointer items-center px-4 py-3 text-left text-sm font-medium text-red-400 transition hover:text-red-700">
                            Log Out
                        </button>
                    </div>
                )}
            </div>

            <div className="navigate flex gap-6 ">
                <button>
                    search
                </button>
                <button
                    onClick={()=>setView('home')}
                >
                    Home
                </button>
                <button
                    onClick={()=>setView('movies')}
                >
                    Films
                </button>
            </div>

            <div className="rounded-2xl border border-neutral-700 p-1">
                <button
                    onClick={() => setOnlineStatus((prev) => !prev)}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 font-medium transition-all duration-200 ${
                    onlineStatus
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                >
                    {onlineStatus ? (
                    <>
                        <Wifi size={18} />
                        <span>Online</span>
                    </>
                    ) : (
                    <>
                        <NetworkIcon size={18} />
                        <span>Offline</span>
                    </>
                    )}
                </button>
            </div>
        </div>
    )
}