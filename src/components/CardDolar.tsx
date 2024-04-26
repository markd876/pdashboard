import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

const CardDolar = ({dolar}:{dolar:any}) => {
  return (
    <Card className='min-w-[200px] max-w-[200px] px-4 py-2'>
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