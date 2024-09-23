import React, { useEffect, useState } from 'react'
import './App.css'
import CardDolar from './components/CardDolar';
import { Card } from "@nextui-org/react";
import supabase from './utils/supabase'
import CardTasks from './components/CardTasks';
import CardEvents from './components/CardEvents';
import CardNotes from './components/CardNotes'
import ContainerCryptos from './components/ContainerCryptos';

function App() {
  const [dolares, setDolares] = useState<Array<Object> | null>(null)

  async function getDolares() {
    let { data } = await supabase.from('dolares').select().order('id', { ascending: true })
    console.log(data)
    setDolares(data)
  }
  useEffect(() => {
    getDolares()
    
    const intervalId = setInterval(getDolares, 5000); 
    return () => clearInterval(intervalId);
  }, [])




  return (
    <React.Fragment>
      <div className='flex flex-col gap-4 justify-center xl:flex-row'>
        <div className=''>
          <Card className='p-4 mb-4'>
            <h4 className='mb-4 text-lg font-bold'>Precio Dolar</h4>
            <div className='flex flex-row justify-center'>
              <div className='flex flex-col gap-4 xl:flex-row'>
                {dolares?.map((e, i) => {
                  return <CardDolar dolar={e} key={i} />
                })}
              </div>
            </div>
          </Card>
          <Card className='p-4'>
            <h4 className='mb-4 font-bold text-lg'>Cryptos</h4>
            <div className='flex flex-col justify-center items-center flex-wrap gap-8'>
              <ContainerCryptos />
            </div>
          </Card>
          <CardEvents />
        </div>
        <div className=''>          
          <CardTasks />
          <CardNotes/>
        </div>
      </div>
    </React.Fragment>
  )
}

export default App
