import React, { useEffect, useState } from 'react'
import './App.css'
import CardDolar from './components/CardDolar';
import { Card } from "@nextui-org/react";
import supabase from './utils/supabase'
import CardTasks from './components/CardTasks';
import CardEvents from './components/CardEvents';

function App() {
  const [dolares, setDolares] = useState<Array<Object> | null>(null)

  async function getDolares() {
    let { data } = await supabase.from('dolares').select().order('id', { ascending: true })
    setDolares(data)
  }
  useEffect(() => {
    getDolares()
  }, [])




  return (
    <React.Fragment>
      <div className='flex flex-row gap-4'>
        <div>
          <Card className='p-4 max-h-[172px] min-w-[640px]'>
            <h4 className='mb-4'>Precio Dolar</h4>
            <div className='flex flex-row justify-center'>
              <div className='flex flex-row gap-4 '>
                {dolares?.map((e, i) => {
                  return <CardDolar dolar={e} key={i} />
                })}
              </div>
            </div>
          </Card>
          <CardEvents/>
        </div>
        <CardTasks />
      </div>
    </React.Fragment>
  )
}

export default App
