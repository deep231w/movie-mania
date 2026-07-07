import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  view: "home" | "movies";
  setView: Dispatch<SetStateAction<"home" | "movies">>;
}
export default function Navbar({setView}:NavbarProps){

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate=  useNavigate();

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

            <div className="h-10 w-30 rounded-2xl border-2 border-green-700 p-1">
                <button className="h-full w-full rounded-xl bg-green-500 text-white">
                    Online
                </button>
            </div>
        </div>
    )
}