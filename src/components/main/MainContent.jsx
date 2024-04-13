import { Items } from "../../features/item/Items"
import { useSelector, useDispatch } from 'react-redux'
import { calcPontsTeams, changeRoundPontsWin } from '../../features/item/itemSlice'
import { useEffect, useRef, useState } from "react"



export const Main = () => {
    const dispatch = useDispatch()
    const { roundPontsWin, items, teamsInfo, maxAppCounterPonts } = useSelector(state => state.item)

    const [inputRoundPontsWinActiveId, setInputRoundPontsWinActiveId] = useState(null)
    const inputRoundPontsWinRef = useRef(null)

    const inputRoundPontsWinHanlder = (e) => {
        const inputValue = +e.target.value
        if (e.key == 'Enter' && inputValue && inputValue > 0 && inputValue <= maxAppCounterPonts) {
            dispatch(changeRoundPontsWin({ newPontsValue: inputValue }))
            setInputRoundPontsWinActiveId(null)
        }
    }

    useEffect(() => {
        if (inputRoundPontsWinRef.current) {
            inputRoundPontsWinRef.current.focus()
        }
    }, [inputRoundPontsWinActiveId])

    useEffect(() => {
        dispatch(calcPontsTeams())
    }, [items])

    return (
        <>
            <div className="flex gap-x-2 items-center justify-center font-bold text-xl">
                <span className="h-9 w-9 flex justify-center items-center bg-teal-500 rounded-lg text-teal-100">{roundPontsWin - teamsInfo.t1.totalPonts > 0 ? roundPontsWin - teamsInfo.t1.totalPonts : '🥇'}</span>
                <span className="h-9 w-9 flex justify-center items-center bg-purple-500 rounded-lg text-purple-100">{roundPontsWin - teamsInfo.t2.totalPonts > 0 ? roundPontsWin - teamsInfo.t2.totalPonts : '🥇'}</span>
            </div>
            <Items />
            <div className="fixed bottom-0 right-0 w-full">
                <div className="h-20 container bg-white flex gap-x-3 justify-between items-start pt-2 font-bold">
                    <div dir="ltr" className="flex w-36 justify-center items-end text-teal-950 relative text-lg"  onClick={() => setInputRoundPontsWinActiveId(1)}>
                        {inputRoundPontsWinActiveId == 1 ?
                            <form onSubmit={(e) => e.preventDefault()}>

                                <input ref={inputRoundPontsWinActiveId == 1 ? inputRoundPontsWinRef : null}
                                    type="number"
                                    className='focus:border-teal-600 text-lg absolute inset-0 bg-transparent border-b-4 border-transparent rounded-lg focus:outline-none ml-2 p-2.5'
                                    onKeyUp={(e) => inputRoundPontsWinHanlder(e)}
                                    onBlur={() => setInputRoundPontsWinActiveId(null)}
                                    onFocus={(e) => e.target.select()} />

                            </form> :
                            <>
                                <h1 className="text-3xl text-teal-500">{teamsInfo.t1.totalPonts}</h1>/
                                <span>{roundPontsWin}</span>
                            </>
                        }
                    </div>
                    <div dir="ltr" className="flex w-36 justify-center items-end text-purple-950 relative text-lg" onClick={() => setInputRoundPontsWinActiveId(2)}>
                        {inputRoundPontsWinActiveId == 2 ?
                            <form onSubmit={(e) => e.preventDefault()}>

                                <input ref={inputRoundPontsWinActiveId == 2 ? inputRoundPontsWinRef : null}
                                    type="number"
                                    className='focus:border-purple-600 text-lg absolute inset-0 bg-transparent border-b-4 border-transparent rounded-lg focus:outline-none ml-2 p-2.5'
                                    onKeyUp={(e) => inputRoundPontsWinHanlder(e)}
                                    onBlur={() => setInputRoundPontsWinActiveId(null)}
                                    onFocus={(e) => e.target.select()} />

                            </form> :
                            <>
                                <h1 className="text-3xl text-teal-500">{teamsInfo.t2.totalPonts}</h1>/
                                <span>{roundPontsWin}</span>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}