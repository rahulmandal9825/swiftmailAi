
import { Rowdies } from "next/font/google";
import { cn } from "~/lib/utils";


const font = Rowdies({
    subsets:["latin"],
    weight:['400']
  })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex bg-black/80 justify-between w-full h-screen' >
    <div className=' flex-1  text-white flex flex-col p-10 max-md:hidden '>
      <h1 className={cn('text-[70px] px-10 pt-10' , 
        font.className
      )}>
        Login
      </h1>
      <h1 className={cn('text-[70px] px-10' , 
        font.className
      )}>
         AI Comapanion
      </h1>
    </div>
    <div className='flex-1  items-center flex justify-center '>
 {children}
    </div>
   </div>
  );
}