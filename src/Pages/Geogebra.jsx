import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'

import { AppContext } from '../Context/AppProvider'
import GeogebraIframe from '../components/Geogebra'

function Geogebra() {
    const param = useParams()
    const { geogebras } = useContext(AppContext)
    const geogebra = geogebras
        .reduce((acc, cur) => [...acc, ...cur.children], [])
        .filter(item => item.geogebraId === param.geogebraId)[0]
    return (
        <>
            <Helmet>
                <title>Mô hình {geogebra?.name || ''}</title>
            </Helmet>

            <div className=' min-h-[calc(100vh-236px)]'>
                <div className='flex justify-center mt-10 px-4 lg:p-0'>
                    <div className='border border-[#6382a3] rounded-lg bg-white  lg:w-[800px] w-full'>
                        <h1 className='text-white bg-[#6382a3] w-full text-3xl px-4'>
                            Mô hình {geogebra?.name}
                        </h1>
                        <div className='flex justify-center md:h-[600px] h-[500px] px-4 lg:p-0'>
                            <GeogebraIframe id={geogebra?.geogebraId} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Geogebra
