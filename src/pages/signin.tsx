import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../services/auth";
import { Loader2 } from "lucide-react";

interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoUrl: string | null;
  emailVerified: boolean;
}

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate= useNavigate()
  const [loading , setLoading]=useState<boolean>(false)

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
        setLoading(true)
        const res = await signin({
            email,
            password
        })
        console.log("res after signin -" ,res);
        
        const user:User ={
            uid:res.uid,
            displayName:res.displayName,
            email:res.email,
            photoUrl:res.photoURL,
            emailVerified:res.emailVerified
        }
        
        localStorage.setItem("user" ,JSON.stringify(user));
        
        navigate('/home')
    }catch(e){
        console.log("error in user signin -",e);
        throw e
    }finally{
        setLoading(false)
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign In");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="john@example.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            type="submit"
          >
            {loading? 
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />:
                "Sign In"
            }
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-slate-300" />
          <span className="mx-4 text-sm text-slate-500">OR</span>
          <div className="h-px flex-1 bg-slate-300" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 py-3 font-medium transition hover:bg-slate-100"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-5 w-5"
          />

          Continue with Google
        </button>

        <p className="mt-8 text-center text-sm text-slate-500">
          Don't have an account?{" "}
            <Link
                to="/signup"
                className="font-semibold text-blue-600 hover:underline"
            >
                Create One
            </Link>
        </p>
      </div>
    </div>
  );
}