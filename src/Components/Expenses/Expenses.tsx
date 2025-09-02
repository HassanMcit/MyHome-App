import bgImage from '../../assets/1W7A7705.jpg'

export default function Expenses() {
  return (
    <>

    <div className={`min-h-screen bg-cover bg-center lg:bg-bottom `} style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.5)), url(${bgImage})`,
      }}>
      <div className="text-white text-3xl text-center">Expenses</div>
    </div>
    </>
  )
}
