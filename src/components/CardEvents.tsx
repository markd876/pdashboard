import React, { Key, useEffect, useState } from 'react'
import supabase from '../utils/supabase'
import { Card, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Select, SelectItem, Input, Checkbox } from "@nextui-org/react";

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
        let { data: hoy } = await supabase.from('dia').select(`events (*)`).eq('desc', weekday)
        let { data: mna } = await supabase.from('dia').select(`events (*)`).eq('desc', weekdayplus)
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
        await supabase.from('events').insert([{ desc: eventName, diaId: eventDay, recurring: !recurr }]).select()
        getEvents()
    }
    /* viva peron */
    const handleRecurr = () =>{
        if(recurr){
            setRecurr(false)
        }else{
            setRecurr(true)
        }
        console.log(recurr)
    }

    return (
        <Card className='mt-4 p-6'>
            <div className='flex justify-center mb-4'>
                <Button className='' onPress={onOpen} color='primary'>Añadir</Button>
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
                                    <Button color="success" onPress={onClose} onPressStart={handleEventSubmit}>
                                        Añadir
                                    </Button>
                                </ModalFooter>
                            </React.Fragment>
                        )}
                    </ModalContent>
                </Modal>
            </div>
            <div className='flex flex-col justify-between gap-10 xl:flex-row'>
                <div className='flex flex-col justify-items-center xl:max-w-[300px] xl:min-w-[300px]'>
                    <h4 className='text-lg font-bold'>Hoy</h4>
                    <div className='flex flex-col justify-center mt-4 text-nowrap text-center'>
                        {
                            todayTasks != null && todayTasks?.length > 0 ? (
                                todayTasks?.map((e, i) => {
                                    return (
                                        <h4 key={i}>{e.desc}</h4>
                                    )
                                })
                            ) : (
                                <h4>No hay eventos para hoy</h4>
                            )
                        }
                    </div>
                </div>
                <div className=''>
                    <Divider orientation={'vertical'} className='hidden xl:block'/>
                    <Divider orientation={'horizontal'} className='block xl:hidden' />
                </div>
                <div className='flex flex-col justify-items-center xl:max-w-[300px] xl:min-w-[300px]'>
                    <h4 className='text-lg font-bold'>Mañana</h4>
                    <div className='flex flex-col justify-center mt-4 text-nowrap text-center'>
                    {
                            tomorrowTasks != null && tomorrowTasks?.length > 0 ? (
                                tomorrowTasks?.map((e, i) => {
                                    return (
                                        <h4 key={i}>{e.desc}</h4>
                                    )
                                })
                            ) : (
                                <h4>No hay eventos para mañana</h4>
                            )
                        }
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default CardEvents