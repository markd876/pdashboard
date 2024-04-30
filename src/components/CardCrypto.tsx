import { Card } from "@nextui-org/react";

const CardCrypto = ({crypto}:any) => {
  return (
    <Card className={crypto.priceChangePercent < 0 ? 'min-w-[150px] max-w-[150px] px-4 py-2 flex-basis-1/2 border border-red-500' : 'min-w-[150px] max-w-[150px] px-4 py-2 flex-basis-1/2 border border-green-500' }>
    <div className='flex justify-center flex-col p-2'>
      <div className='flex flex-col justify-center mb-4'>
        <h4>{crypto.desc}</h4>
        <div className="flex justify-center my-4">
        <img src={crypto.logo} alt="" height={50} width={50} />
        </div>
      </div>
      <div className='flex flex-col justify-center gap-1'>
        <h4> $ {crypto.price} </h4>
        <h4 className={crypto.priceChangePercent < 0 ? 'text-red-500' : 'text-green-500'}> {crypto.priceChange} </h4>
        <h4 className={crypto.priceChangePercent < 0 ? 'text-red-500' : 'text-green-500'}> {crypto.priceChangePercent}% </h4>
      </div>
    </div>
  </Card>
  )
}

export default CardCrypto