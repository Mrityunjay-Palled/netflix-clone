import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return{
    props:{}
  }
}

const Profiles = () => {
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3x1 md:text-6xl text-white text-center">Who is watching?</h1>
        <div className="flex items-center justify-center gap-8 mt-10">
         <div onClick={()=>{}}>
           <div className="group flex-row w-44 mx-auto">
             <div
             className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer
             group-hover:border-white
             overflow-hidden
             "
             >
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src="/images/default-green.png" alt="profile"/>
             </div>
             <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
               Name
             </div>
           </div>
         </div>
        </div>
      </div>
    </div>
  );
};
export default Profiles;