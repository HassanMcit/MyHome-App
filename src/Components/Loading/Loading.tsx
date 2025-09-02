import { ClimbingBoxLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className='fixed top-0 left-0 end-0 bottom-0 bg-gray-200 z-50 flex items-center justify-center'>
        
        <ClimbingBoxLoader size={30} color="#7C86FF"/>
    </div>
  )
}
