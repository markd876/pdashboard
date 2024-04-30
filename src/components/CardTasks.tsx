import React, { Key, useEffect, useState } from 'react'
import { Card, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,useDisclosure, Input,Select, SelectItem, Checkbox} from "@nextui-org/react";
import supabase from '../utils/supabase'

const CardTasks = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [tasks, setTasks] = useState<Array<any> | null>([])
    const [taskName, setTaskName] = useState<string>(String)
    const [taskFreq, setTaskFreq] = useState<Key>()
    const [recurr, setRecurr] = useState(false)
    

    async function getTasks() {
      let { data } = await supabase.from('tasks').select().order('id', { ascending: true })
      setTasks(data)
    }
    useEffect(()=>{
      getTasks()
    },[])
  
    useEffect(()=>{
      console.log('task update')
    },[tasks])
  
    const handleTaskSubmit = async () =>{
      let task = {
        taskName,
        taskFreq
      }
      console.log(task)
      let { data } = await supabase.from('tasks').insert([{desc: taskName, freq: taskFreq, recurring: !recurr}]).select()
      getTasks()
    }
    const handleRecurr = () =>{
      if(recurr){
          setRecurr(false)
      }else{
          setRecurr(true)
      }
      console.log(recurr)
  }
    
    const handleTaskCheck = async (ele:any) => {
      if(ele.done){
        let { data } = await supabase.from('tasks').update({done:false}).eq('id', ele.id).select()
      } else{
        let { data } = await supabase.from('tasks').update({done:true}).eq('id', ele.id).select()
      }
    }
  return (
    <Card className='max-h-min p-4'>
    <div className='flex flex-col justify-center items-center gap-4 mt-4'>
        <h4 className='font-bold text-lg'>Tareas por hacer</h4>
        <Button onPress={onOpen} className='max-w-32' color='primary'>Añadir tarea</Button>
    </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
      {(onClose) => (
        <React.Fragment>
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
              <Checkbox onChange={handleRecurr}>Una sola vez</Checkbox>
            </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cerrar
            </Button>
            <Button color="success" onPress={onClose} onPressStart={handleTaskSubmit}> 
              Añadir
            </Button>
          </ModalFooter>
        </React.Fragment>
      )}
    </ModalContent>
  </Modal>
  {
    tasks?.map((ele,i)=>{
      return (
        <div key={i} className='flex flex-row mt-8 justify-start text-wrap max-w-[250px] '>  
          <Checkbox onClick={() => handleTaskCheck(ele)} defaultSelected={ele?.done}><h4 className='text-left'>{ele.desc}</h4></Checkbox>         
        </div>
      )
    })
  }
  </Card>
  )
}


export default CardTasks