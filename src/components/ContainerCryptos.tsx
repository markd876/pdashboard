import React, { useEffect, useState } from 'react'
import supabase from '../utils/supabase'
import CardCrypto from './CardCrypto'

const ContainerCryptos = () => {

    const [cryptos, setCryptos] = useState<Array<any> | null>([])

    const getCryptos = async() =>{
        let { data: cryptosd } = await supabase.from('cryptos').select().order('id', { ascending: true })
        console.log(cryptosd)
        setCryptos(cryptosd)
    }

    useEffect(()=>{
        getCryptos()
        const intervalId = setInterval(getCryptos, 5000); 
        return () => clearInterval(intervalId);
    },[])



    return (
        <React.Fragment>
            <div className='flex flex-wrap justify-center gap-4'>
            {cryptos?.map((e,i)=>{
                return(
                    <CardCrypto key={i} crypto={e}/>
                )
            })}
            </div>
        </React.Fragment>
    )
}

export default ContainerCryptos