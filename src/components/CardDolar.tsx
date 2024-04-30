import { Card } from "@nextui-org/react";

const CardDolar = ({dolar}:{dolar:any}) => {
  return (
    <Card className=' px-4 py-2'>
    <div className='flex justify-center flex-col p-2'>
      <div className='flex flex-row justify-between mb-4'>
        <h4>{dolar.name}</h4>
      </div>
      <div className='flex flex-row justify-between gap-4'>
        <h4>${dolar.bid}</h4>
        <h4>${dolar.ask}</h4>
      </div>
    </div>
  </Card>
  )
}

export default CardDolar