import React, { Key, useEffect, useState } from 'react'
import './App.css'
import CardDolar from './components/CardDolar';
import { Card, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,useDisclosure, Input,Select, SelectSection, SelectItem, Checkbox} from "@nextui-org/react";
import axios from './api/axios';
import supabase from './utils/supabase'

function App() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [dolares,setDolares] = useState< Array<Object> | null>(null)
  const [tasks, setTasks] = useState<any[]>([])
  const [tasksL, setTasksL] = useState<any[]>([])
  const [taskName, setTaskName] = useState<string>(String)
  const [taskFreq, setTaskFreq] = useState<Key>()
  
  async function getDolares() {
    let { data } = await supabase.from('dolares').select()
    console.log(supabase.from('dolares').select())
    console.log(data)
    setDolares(data)
  }
  useEffect(()=>{
    getDolares()
  },[])

  useEffect(() => {
    
    try {
      axios.get('http://localhost:3000/api/tasks', {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }).then((res) => {
        console.log(res.data)
        setTasks(res.data)
      })

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [])
  useEffect(()=>{
    console.log('task update')
  },[tasks])

  const handleTaskSubmit = () =>{
    let task = {
      taskName,
      taskFreq
    }
    console.log(task)
    try {
      axios.post('http://localhost:3000/api/addTask',{
        task,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }).then((res:any)=>{
        setTasks(res.data)
      })
    } catch (error) {
      console.error(error)
    }
  }
  
  const handleTaskCheck = (e:any, ele:any) => {
    try {
      axios.post('http://localhost:3000/api/updateTask',{
        ele,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }).then((res:any)=>{
        setTasks(res)
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <React.Fragment>
      <div className='flex flex-row gap-4'>
      <Card className='p-4 max-h-[172px]'>
        <h4 className='mb-4'>Precio Dolar</h4>
        <div className='flex flex-row justify-center'>
          <div className='flex flex-row gap-4 '>
            {dolares?.map((e, i)=>{
              return <CardDolar dolar={e} key={i}/>
            })}
          </div>
        </div>
      </Card>
      <Card className='min-w-[500px] min-h-[500px]'>
        <div className='flex flex-col justify-center items-center gap-4 mt-4'>
            <h4 className='mt-4'>Tareas por hacer</h4>
            <Button onPress={onOpen} className='max-w-32' color='primary'>Añadir tarea</Button>
        </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Añadir Tarea</ModalHeader>
                <ModalBody>
                  <Input label="Nombre de tarea" onValueChange={setTaskName}></Input>
                  <Select onSelectionChange={(selection) => {
                    const keys:Array<Key> = Array.from(selection)
                    console.log(keys)
                    setTaskFreq(keys[0])
                  }} label="Frecuencia">
                    <SelectItem key={'daily'}>Diaria</SelectItem>
                    <SelectItem key={'weekly'}>Semanal</SelectItem>
                    <SelectItem key={'monthly'}>Mensual</SelectItem>
                  </Select>
                </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="success" onPress={onClose} onClick={handleTaskSubmit}> 
                  Añadir
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {
        tasks?.map((ele,i)=>{
          return (
            <div key={i} className='flex flex-row mt-8 justify-start pl-8'>  
              <Checkbox onClick={(e) => handleTaskCheck(e, ele)} defaultSelected={ele?.done}><h4>{ele.desc}</h4></Checkbox>         
            </div>
          )
        })
      }
      </Card>
      </div>
    </React.Fragment>
  )
}

export default App
