import React, { Key, useEffect, useState } from 'react'
import supabase from '../utils/supabase'
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Select, SelectItem, Input, Checkbox } from "@nextui-org/react";

const CardEvents = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [todayTasks, setTodayTasks] = useState<Array<any> | null>([])
    const [tomorrowTasks, setTomorrowTasks] = useState<Array<any> | null>([])
    const [eventName, setEventName] = useState(String)
    const [eventDay, setEventDay] = useState<Key>()
    const [recurr, setRecurr] = useState(false)

    const getEvents = async () => {
        const date = new Date()
        const weekday = date.toLocaleString('es-ar', { weekday: 'long' });
        date.setDate(date.getDate() + 1);
        const weekdayplus = date.toLocaleString('es-ar', { weekday: 'long' });
        console.log(weekdayplus)
        let { data: hoy } = await supabase.from('dia').select(`events (*)`).eq('desc', 'martes')
        let { data: mna } = await supabase.from('dia').select(`events (*)`).eq('desc', 'miércoles')
        let { data: events } = await supabase
            .from('events').select(`diaId,desc, dia (*)`)
        console.log(events)
        console.log(hoy![0])
        setTodayTasks(hoy![0].events)
        setTomorrowTasks(mna![0].events)
        console.log(mna![0])
    }
    useEffect(() => {
        getEvents()
    }, [])
    const handleEventSubmit = async () => {
        let { data } = await supabase.from('events').insert([{ desc: eventName, diaId: eventDay, recurring: !recurr }]).select()
        getEvents()
    }
    const handleRecurr = () =>{
        if(recurr){
            setRecurr(false)
        }else{
            setRecurr(true)
        }
        console.log(recurr)
    }

    return (
        <Card className='min-w-[600px] mt-4 p-6'>
            <div className='flex justify-center mb-4'>
                <Button className='max-w-[250px]' onPress={onOpen} color='primary'>Añadir</Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <React.Fragment>
                                <ModalHeader className="flex flex-col gap-1">Añadir Tarea</ModalHeader>
                                <ModalBody>
                                    <Input label="Nombre de evento" onValueChange={setEventName}></Input>
                                    <Select onSelectionChange={(selection) => {
                                        const keys: Array<Key> = Array.from(selection)
                                        console.log(keys)
                                        setEventDay(keys[0])
                                    }} label="Día">
                                        <SelectItem key={'1'}>Lunes</SelectItem>
                                        <SelectItem key={'2'}>Martes</SelectItem>
                                        <SelectItem key={'3'}>Miércoles</SelectItem>
                                        <SelectItem key={'4'}>Jueves</SelectItem>
                                        <SelectItem key={'5'}>Viernes</SelectItem>
                                        <SelectItem key={'6'}>Sábado</SelectItem>
                                        <SelectItem key={'7'}>Domingo</SelectItem>
                                    </Select>
                                    <Checkbox onChange={handleRecurr}>Una sola vez</Checkbox>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cerrar
                                    </Button>
                                    <Button color="success" onPress={onClose} onClick={handleEventSubmit}>
                                        Añadir
                                    </Button>
                                </ModalFooter>
                            </React.Fragment>
                        )}
                    </ModalContent>
                </Modal>
            </div>
            <div className='flex flex-row justify-between gap-10'>
                <div className='flex flex-col justify-items-center min-w-[250px] '>
                    <h4>Hoy</h4>
                    <div className='flex flex-col justify-center mt-4 min-w-[300px] max-w-[300px] text-nowrap text-left'>
                        {todayTasks?.map((e, i) => {
                            return (
                                <h4 key={i}>{e.desc}</h4>
                            )
                        })}
                    </div>
                </div>
                <div className='flex-grow max-w-[1px]'>
                    <Divider orientation='vertical' className='flex-grow'/>
                </div>
                <div className='flex flex-col justify-items-center min-w-[250px] '>
                    <h4 className=''>Mañana</h4>
                    <div className='flex flex-col justify-center mt-4 min-w-[300px] max-w-[300px] text-nowrap text-left'>
                        {tomorrowTasks?.map((e, i) => {
                            return (
                                <h4 key={i}>{e.desc}</h4>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default CardEvents