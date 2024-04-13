import { useSelector, useDispatch } from 'react-redux'
import { addItem, setItemActiveId, changePontsItem, changeTeamsName, deleteItem } from './itemSlice'
import { useEffect, useRef, useState } from 'react'

const TabelHeader = ({ name, teamNumber }) => {
    const dispatch = useDispatch()

    const [inputNameActiveId, setInputNameActiveId] = useState(null)
    const inputNameRef = useRef(null)

    const buttonHandler = () => {
        dispatch(addItem({ teamNumber: teamNumber == 1 ? 1 : 2 }))
    }

    const inputNameHanlder = (e) => {
        const inputValue = e.target.value.toString().trim()
        if (e.key == 'Enter' && inputValue && inputValue.length < 13) {
            dispatch(changeTeamsName({ teamNumber, newTeamName: inputValue }))
            setInputNameActiveId(null)
        }
    }

    useEffect(() => {
        if (inputNameRef.current) {
            inputNameRef.current.value = name
            inputNameRef.current.select()
            inputNameRef.current.focus()
        }
    }, [inputNameActiveId])

    return (
        <div className="flex flex-col gap-y-3 w-36 font-bold">
            <div className='h-8 relative' onClick={() => setInputNameActiveId(teamNumber)}>
                {inputNameActiveId == teamNumber ?
                    <form onSubmit={(e) => e.preventDefault()}>

                        <input ref={inputNameRef}
                            type="text"
                            className={`${teamNumber == 1 ? 'focus:border-teal-600' : 'focus:border-purple-600'} absolute inset-0 bg-transparent border-b-4 border-transparent text-teal-950 rounded-lg focus:outline-none text-xl p-2.5`}
                            onKeyUp={(e) => inputNameHanlder(e)}
                            onBlur={() => setInputNameActiveId(null)}
                            onFocus={(e) => e.target.select()} />

                    </form> :
                    <h3 className="whitespace-nowrap text-2xl text-center">{name}</h3>
                }


            </div>
            <button type="button" className={`${teamNumber == 1 ? 'bg-teal-500 active:bg-teal-600' : 'bg-purple-500 active:bg-purple-600'} w-full flex justify-center py-1 rounded-full`} onClick={buttonHandler}>
                <svg className="h-8 fill-teal-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
            </button>
        </div>
    )
}

const TabelRow = ({ pont, teamNumber, itemId, itemActiveId }) => {
    const dispatch = useDispatch()
    const { items } = useSelector((state) => state.item)

    const inputPontsHandler = (e) => {
        const inputValue = +e.target.value
        if (e.key == 'Enter' && inputValue && inputValue > 0) {
            dispatch(changePontsItem({ itemId, newPontsValue: inputValue }))
        }
    }

    const inputPontRef = useRef(null)
    useEffect(() => {
        if (inputPontRef.current) {
            items.forEach(item => {
                itemId == item.t1.itemId &&
                    (inputPontRef.current.value = item.t1.ponts);
                itemId == item.t2.itemId &&
                    (inputPontRef.current.value = item.t2.ponts);

            })
            inputPontRef.current.focus()
        }
    }, [itemActiveId])

    return (
        <div data-key={itemId} className='flex justify-center items-center w-36 h-14 text-gray-900 text-xl font-semibold border-b relative'
            onClick={() => dispatch(setItemActiveId(itemId))}>
            {
                itemId == itemActiveId ?
                    <form onSubmit={(e) => e.preventDefault()}>

                        <input dir="ltr"
                            ref={itemId == itemActiveId ? inputPontRef : null}
                            type="number"
                            className={`${teamNumber == 1 ? 'focus:border-teal-600' : 'focus:border-purple-600'} absolute inset-0 bg-transparent border-b-4 border-transparent text-teal-950 rounded-lg focus:outline-none px-2.5`}
                            onFocus={(e) => e.target.select()}
                            onBlur={() => dispatch(setItemActiveId(null))}
                            onKeyUp={(e) => inputPontsHandler(e)} />

                    </form>
                    : <span className="text-center">{pont}</span>
            }
        </div>
    )

}

const TableNo = ({ index }) => {
    const [activeDeleteBut, setActiveDeleteBut] = useState(null)
    const dispatch = useDispatch()
    let touchTrue = false
    let touchTimeOut
    const touchStartHandloer = () => {
        touchTimeOut = setTimeout(() => {
            touchTrue = true
            setActiveDeleteBut(index)
            setTimeout(() => setActiveDeleteBut(null),2500)
        }, 600)

    }
    const touchEndHandloer = () => {
        !touchTrue && clearTimeout(touchTimeOut)
    }

    const onClickDeleteHandloer = () => {
        dispatch(deleteItem(index))
        setActiveDeleteBut(null)
    }

    return (
        <div className='flex items-center w-7'>
            {
                activeDeleteBut === index ?
                    <button className='w-full py-2 text-center focus:outline-none rounded bg-rose-500 active:bg-rose-700'
                        onClick={() => onClickDeleteHandloer()}>
                        <svg className="fill-gray-100 w-6 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"></path></svg>
                    </button>
                    :
                    <button className='w-full'
                        onTouchStart={() => touchStartHandloer()}
                        onTouchEnd={() => touchEndHandloer()}>
                        {index + 1}
                    </button>
            }



        </div>
    )
}

export const Items = () => {
    const { t1, t2 } = useSelector((state) => state.item.teamsInfo)

    const { items, itemActiveId } = useSelector((state) => state.item)

    return (
        <div className='pb-20 mt-2'>

            <div className="flex justify-between items-start gap-x-1 h-20">
                <TabelHeader name={t1.name} teamNumber={1} />
                <TabelHeader name={t2.name} teamNumber={2} />
            </div>
            <div className="mt-3 h-[calc(56px*9)] overflow-y-scroll">
                {items.map((item, index) => {
                    const { t1 } = item
                    const { t2 } = item
                    return (
                        <div key={index} className="flex justify-between items-center gap-x-1">
                            <TabelRow pont={t1.ponts} teamNumber={1} itemId={t1.itemId} itemActiveId={itemActiveId} />
                            <TableNo index={index} />
                            <TabelRow pont={t2.ponts} teamNumber={2} itemId={t2.itemId} itemActiveId={itemActiveId} />
                        </div>
                    )
                })}
            </div>

        </div>





    )
}