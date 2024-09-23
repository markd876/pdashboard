import React, { Key, useEffect, useState } from 'react'
import { Card, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Select, SelectItem, Checkbox, Textarea, Divider  } from "@nextui-org/react";
import supabase from '../utils/supabase'

const CardNotes = () => {

    interface Nota {
        id: Number
        titulo: String
        nota: String
    }

    const { isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1 } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();
    const { isOpen: isOpen4, onOpen: onOpen4, onOpenChange: onOpenChange4 } = useDisclosure();
    const [NotaDelete, setNotaDelete] = useState<Nota>()
    const [notaDetail, setNotaDetail] = useState<string>(String)
    const [notes, setNotes] = useState<Array<any> | null>([])
    const [noteTitle, setnoteTitle] = useState<string>(String)
    const [noteData, setNoteData] = useState<string>(String)


    async function getNotes() {
        let { data } = await supabase.from('notes').select().order('id', { ascending: true })
        setNotes(data)
    }

    async function getDetailNote(id:Number){
        let {data} = await supabase.from('notes').select('nota').eq('id', id)
        console.log(data)
        if(data){
            setNotaDetail(data[0].nota)
        }
    }
    useEffect(() => {
        getNotes()
    }, [])

    useEffect(() => {
        console.log('task update')
        console.log(notes)
    }, [notes])

    const handleNoteDelete = async (id: Number | undefined) =>{
        let { data } = await supabase.from('notes').delete().eq('id', id)
        getNotes()
    }

    const handleNoteSubmit = async () => {
        let note = {
            noteTitle,
            noteData
        }
        console.log(note)
        let { data } = await supabase.from('notes').insert([{ titulo: noteTitle, nota: noteData }]).select()
        getNotes()
    }
    /*     const handleRecurr = () =>{
          if(recurr){
              setRecurr(false)
          }else{
              setRecurr(true)
          }
          console.log(recurr)
      } */

    const handleTaskCheck = async (ele: any) => {
        if (ele.done) {
            let { data } = await supabase.from('tasks').update({ done: false }).eq('id', ele.id).select()
        } else {
            let { data } = await supabase.from('tasks').update({ done: true }).eq('id', ele.id).select()
        }
    }
    return (
        <Card className='max-h-min p-4'>
            <div className='flex flex-col justify-center items-center gap-4 mt-4 min-w-[250px] '>
                <h4 className='font-bold text-lg'>Notas</h4>
                <Button onPress={onOpen1} className='max-w-32' color='primary'>Añadir Nota</Button>
                <Button onPress={onOpen2} className='max-w-32' color='success'>Ver Notas</Button>
            </div>
            <Modal isOpen={isOpen1} onOpenChange={onOpenChange1}>
                <ModalContent>
                    {(onClose) => (
                        <React.Fragment>
                            <ModalHeader className="flex flex-col gap-1">Añadir Nota</ModalHeader>
                            <ModalBody>
                                <Input label="Titulo" onValueChange={setnoteTitle}></Input>
                                <Textarea label="Nota" placeholder='Ingresar nota' onValueChange={setNoteData} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="success" onPress={onClose} onPressStart={handleNoteSubmit}>
                                    Añadir
                                </Button>
                            </ModalFooter>
                        </React.Fragment>
                    )}
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpen2} onOpenChange={onOpenChange2}>
                <ModalContent>
                    {(onClose) => (
                        <React.Fragment>
                            <ModalHeader className="flex flex-col gap-1">Notas</ModalHeader>
                            <ModalBody>
                                {
                                    notes?.map((ele, i) => {
                                        return (
                                            <div key={i} className='flex flex-col justify-center'>
                                                <div className='flex flex-row justify-between items-center'>
                                                    <span className=''> {ele?.titulo} </span>
                                                    <div className='flex flex-row gap-2'>
                                                    <Button onPress={onOpen3} onPressChange={() => getDetailNote(ele?.id)}>Ver Detalle</Button>
                                                    <Button color='danger' onPress={onOpen4} onPressChange={() =>{setNotaDelete(ele)}}>Eliminar</Button>
                                                    </div>
                                                </div>
                                                <Divider className='my-4'/>
                                                
                                            </div>
                                        )
                                    })
                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={onClose}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </React.Fragment>
                    )}
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpen3} onOpenChange={onOpenChange3} size='3xl'>
                <ModalContent>
                    {(onClose) => (
                        <React.Fragment>
                            <ModalHeader className="flex flex-col gap-1">Notas</ModalHeader>
                            <ModalBody>
                                <Textarea value={notaDetail} maxRows={15}></Textarea>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={onClose}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </React.Fragment>
                    )}
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpen4} onOpenChange={onOpenChange4}>
                <ModalContent>
                    {(onClose) => (
                        <React.Fragment>
                            <ModalHeader className="flex flex-col gap-1">Notas</ModalHeader>
                            <ModalBody>
                                <p>¿Estas seguro de eliminar la nota {NotaDelete?.titulo} ?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color='danger' onPressChange={() => handleNoteDelete(NotaDelete?.id)} onPress={onClose}>
                                    Eliminar
                                </Button>
                            </ModalFooter>
                        </React.Fragment>
                    )}
                </ModalContent>
            </Modal>
            {/*             {
                notes?.map((ele, i) => {
                    return (
                        <div key={i} className='flex flex-row mt-8 justify-start text-wrap max-w-[250px]'>
                            <Checkbox onClick={() => handleTaskCheck(ele)} defaultSelected={ele?.done}><h4 className='text-left'>{ele.desc}</h4></Checkbox>
                        </div>
                    )
                })
            } */}
        </Card>
    )
}


export default CardNotes