import { FC } from 'react'
import { Outlet,Link } from 'react-router-dom';
import person from "../../assets/images/person.svg"

const Layout: FC = () => {
  return (
    <>
    <div className='bg-white shadow-custom w-full h-[83px] px-5 md:px-[72px] 2xl:px-40  mb-3'>
      <div className='h-full flex items-center justify-between'>
         <Link to="/"><div className='text-[#9C791A] text-[20px] sm:text-[25px] font-extrabold leading-[37.5px]'>IT FARM LOGO</div></Link>
         <div className='flex'>
          <img src={person} alt="person-picture" />
          <div className='ml-[11px]' >
          <div className='text-[#272D2F] font-lato text-[12px] sm:text-[14px] font-bold leading-[150%]'>
          Sam Jhonson
          </div>
          <div className='text-[#272D2F] font-lato text-[10px] sm:text-[12px] font-light sm:font-normal leading-[150%]'>
          Senior Manager
          </div>
          </div>
         </div>
      </div>
    </div>
        <Outlet />
      </>
  )
}

export default Layout;