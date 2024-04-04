import { useEffect, useRef, useState } from "react"

export const Main = () => {
    const localStorageItems = JSON.parse(localStorage.getItem('items'))
    const localStorageItemId = JSON.parse(localStorage.getItem('itemId'))
    const [items, setItems] = useState([])
    const [itemId, setItemId] = useState(1)
    const [itemActiveId, setItemActiveId] = useState(null)
    const [temsNames, setTeamsNames] = useState({
        t1: { active: false, name: 'الفريق الاول' },
        t2: { active: false, name: 'الفريق الثاني' },
    })

    const inputActiveRef = useRef(null)

    const addItemsT1ButHandler = () => {
        const itemObj = {
            t1: {
                itemId: itemId,
                item: 0
            },
            t2: {
                itemId: itemId + 1,
                item: 0
            }
        }
        setItems([...items, itemObj])
        setItemActiveId(itemId)
        setItemId(a => a + 2)

    }

    const addItemsT2ButHandler = () => {
        const itemObj = {
            t1: {
                itemId: itemId,
                item: 0
            },
            t2: {
                itemId: itemId + 1,
                item: 0
            }
        }
        setItems([...items, itemObj])
        setItemActiveId(itemId + 1)
        setItemId(a => a + 2)

    }

    const addItemsT1InputHandler = (e, itemId) => {
        const inputValue = +e.target.value
        if (e.key == 'Enter' && inputValue) {

            const cloneItems = [...items]

            for (let i = 0; i < cloneItems.length; i++) {
                if (cloneItems[i].t1.itemId == itemId) {
                    cloneItems[i].t1.item = inputValue
                    cloneItems[i].t2.item = 0
                    break;

                }
            }
            setItems(cloneItems.filter(item => {
                if (item.t1.item != 0 || item.t2.item != 0) {
                    return item
                }
            }))
            setItemActiveId(null)
        }

    }

    const addItemsT2InputHandler = (e, itemId) => {
        const inputValue = +e.target.value
        if (e.key == 'Enter' && inputValue) {
            const cloneItems = [...items]

            for (let i = 0; i < cloneItems.length; i++) {
                if (cloneItems[i].t2.itemId == itemId) {
                    cloneItems[i].t2.item = inputValue
                    cloneItems[i].t1.item = 0
                    break;

                }
            }
            setItems(cloneItems.filter(item => {
                if (item.t1.item != 0 || item.t2.item != 0) {
                    return item
                }
            }))
            setItemActiveId(null)

        }

    }

    useEffect(() => {
        if (inputActiveRef.current) {
            inputActiveRef.current.focus()
            inputActiveRef.current.select()
        }
    }, [itemActiveId])


    const countTemsWin = () => {
        const counterTemsWin = {
            t1: 0,
            t2: 0
        }
        if (items.length > 0) {
            items.forEach(item => {
                if (item.t1.item > 0) {
                    ++counterTemsWin.t1
                }
                if (item.t2.item > 0) {
                    ++counterTemsWin.t2
                }
            })
        }

        return counterTemsWin

    }

    const countTotalPoints = () => {
        const counterTotalPoints = {
            t1: 0,
            t2: 0
        }
        if (items.length > 0) {
            items.forEach(item => {
                counterTotalPoints.t1 += item.t1.item
                counterTotalPoints.t2 += item.t2.item
            })
        }
        return counterTotalPoints

    }


    useEffect(() => {
        if (localStorageItems) {
            setItems(localStorageItems);

        } else {
            setItems([]);
        }
        localStorageItemId &&
            setItemId(localStorageItemId)
    }, [])

    useEffect(() => localStorage.setItem('items', JSON.stringify(items)), [items])
    useEffect(() => localStorage.setItem('itemId', JSON.stringify(itemId)), [itemId])

    return (
        <>
            <div className="flex gap-x-2 items-center justify-center font-bold text-xl">
                <span className="h-9 w-9 flex justify-center items-center bg-teal-500 rounded-lg text-teal-100">{countTemsWin().t1}</span>
                <span className="h-9 w-9 flex justify-center items-center bg-purple-500 rounded-lg text-purple-100">{countTemsWin().t2}</span>
            </div>



            <div className="flex justify-between gap-x-1 items-start mt-3">
                <div className="w-36">
                    <div className="font-bold flex flex-col gap-y-3 items-center text-2xl">
                        <div className="relative h-8 w-full">
                            <h3 className="whitespace-nowrap">{temsNames.t1.name}</h3>
                        </div>
                        <button type="button" className="w-full flex justify-center py-1 bg-teal-500 rounded-full active:bg-teal-600" onClick={addItemsT1ButHandler}>
                            <svg className="h-8 fill-teal-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                        </button>
                    </div>
                </div>

                <div className="w-36">
                    <div className="font-bold flex flex-col gap-y-3 items-center text-2xl">
                        <div className="relative h-8 w-full">
                            <h3 className="whitespace-nowrap">{temsNames.t2.name}</h3>
                        </div>
                        <button type="button" className="w-full flex justify-center py-1 bg-purple-500 rounded-full active:bg-purple-600" onClick={addItemsT2ButHandler}>
                            <svg className="h-8 fill-purple-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                        </button>
                    </div>
                </div>
            </div>


            <div className="mt-5">
                {items.length > 0 && items.map((item, i) => {

                    return (
                        <div key={i} className="flex justify-between gap-x-1 font-bold text-lg">

                            <div className='text-gray-900 h-14 w-36 border-b relative flex justify-center items-center' onClick={() => setItemActiveId(item.t1.itemId)}>
                                {itemActiveId === item.t1.itemId ? <form onSubmit={(e) => e.preventDefault()}><input dir="ltr" type="number" ref={itemActiveId === item.t1.itemId ? inputActiveRef : null} className='absolute inset-0 bg-transparent border-b-4 border-transparent text-teal-950 rounded-lg focus:outline-none focus:border-teal-500 px-2.5' onKeyUp={e => addItemsT1InputHandler(e, item.t1.itemId)} onBlur={() => setItemActiveId(null)} onFocus={(e) => e.target.select()} /></form> : <span>{item.t1.item || 'X'}</span>}
                            </div>

                            <div className='text-gray-900 h-14 w-36 border-b relative flex justify-center items-center' onClick={() => setItemActiveId(item.t2.itemId)}>
                                {itemActiveId === item.t2.itemId ? <form onSubmit={(e) => e.preventDefault()}><input dir="ltr" ref={itemActiveId === item.t2.itemId ? inputActiveRef : null} type="number" className='absolute inset-0 bg-transparent border-b-4 border-transparent text-teal-950 rounded-lg focus:outline-none focus:border-purple-500 px-2.5' onKeyUp={e => addItemsT2InputHandler(e, item.t2.itemId)} onBlur={() => setItemActiveId(null)} onFocus={(e) => e.target.select()} /></form> : <span>{item.t2.item || 'X'}</span>}

                            </div>

                        </div>
                    )


                })}

            </div>

            <div className="fixed bottom-0 right-0 w-full">
                <div className="h-20 container bg-white flex justify-between items-start pt-2 font-bold">
                    <h1 dir="ltr" className="w-36 flex justify-center text-3xl text-teal-500">{countTotalPoints().t1} <span className="text-lg flex items-end text-teal-950">/151</span></h1>
                    <h1 dir="ltr" className="w-36 flex justify-center text-3xl text-purple-500">{countTotalPoints().t2} <span className="text-lg flex items-end text-purple-950">/151</span></h1>
                </div>
            </div>
        </>
    )
}