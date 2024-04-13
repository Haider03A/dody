import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    itemId: 2,
    itemActiveId: null,
    items: [
        {
            t1: {
                itemId: 1,
                ponts: 0
            },
            t2: {
                itemId: 2,
                ponts: 0
            }
        }
    ],
    teamsInfo: {
        t1: {
            name: 'الفريق الاول',
            totalPonts: 0
        },
        t2: {
            name: 'الفريق الثاني',
            totalPonts: 0
        }
    },
    roundPontsWin: 151,
    maxAppCounterPonts: 302
}

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        setItemId: (state, actions) => {
            state.itemId = actions.payload
        },
        setItemActiveId: (state, actions) => {
            state.itemActiveId = actions.payload
        },
        addItem: (state, actions) => {
            const { itemId, items } = state

            const { teamNumber } = actions.payload

            if (items[items.length - 1].t1.ponts > 0 || items[items.length - 1].t2.ponts > 0) {
                const newItemData = {
                    t1: {
                        itemId: itemId + 1,
                        ponts: 0
                    },
                    t2: {
                        itemId: itemId + 2,
                        ponts: 0
                    }
                }

                state.items = [...items, newItemData]
                state.itemId = itemId + 2
                state.itemActiveId = teamNumber == 1 ? itemId + 1 : itemId + 2

            } else {
                state.itemActiveId = teamNumber == 1 ? items[items.length - 1].t1.itemId : items[items.length - 1].t2.itemId
            }


        },
        changePontsItem: (state, actions) => {
            const { itemId, newPontsValue } = actions.payload
            const {items, maxAppCounterPonts} = state
            const cloneItems = [...JSON.parse(JSON.stringify(items))]

            cloneItems.forEach((item, i) => {
                if (itemId == item.t1.itemId) {
                    cloneItems[i].t1.ponts = newPontsValue
                    cloneItems[i].t2.ponts = 0
                } else if (itemId == item.t2.itemId) {
                    cloneItems[i].t1.ponts = 0
                    cloneItems[i].t2.ponts = newPontsValue
                }
            });


            const teamsTotalPonts = {
                t1: 0,
                t2: 0
            }
            cloneItems.forEach(item => {
                teamsTotalPonts.t1 += item.t1.ponts
                teamsTotalPonts.t2 += item.t2.ponts
            })
            
            if (teamsTotalPonts.t1 <= maxAppCounterPonts && teamsTotalPonts.t2 <= maxAppCounterPonts) {
                state.items = cloneItems
                state.itemActiveId = null
            }


        },
        changeTeamsName: (state, actions) => {
            const { teamNumber, newTeamName } = actions.payload
            teamNumber == 1 ?
                state.teamsInfo.t1.name = newTeamName :
                state.teamsInfo.t2.name = newTeamName;



        },
        calcPontsTeams: (state) => {
            const { items } = state
            const teamsTotalPonts = {
                t1: 0,
                t2: 0
            }
            items.forEach(item => {
                teamsTotalPonts.t1 += item.t1.ponts
                teamsTotalPonts.t2 += item.t2.ponts
            })
            state.teamsInfo.t1.totalPonts = teamsTotalPonts.t1
            state.teamsInfo.t2.totalPonts = teamsTotalPonts.t2
        },
        localStorageManger: (state, actions) => {
            const { itemId, items, teamsInfo, roundPontsWin } = actions.payload
            state.itemId = itemId
            state.items = items
            state.teamsInfo = teamsInfo
            state.roundPontsWin = roundPontsWin

        },
        changeRoundPontsWin: (state, actions) => {
            const { newPontsValue } = actions.payload
            state.roundPontsWin = newPontsValue


        },
        resetAppCounterPonts: (state) => {
            state.items = [
                {
                    t1: {
                        itemId: 1,
                        ponts: 0
                    },
                    t2: {
                        itemId: 2,
                        ponts: 0
                    }
                }
            ]
        },
        deleteItem: (state, actions) => {
            const itemeDeleteIndex = actions.payload
            const { items } = state
            const cloneItems = [...JSON.parse(JSON.stringify(items))]
            if(items.length > 1) {

                cloneItems.forEach((items, index) => {
                    if (index === itemeDeleteIndex) {
                        console.log(itemeDeleteIndex);
                        cloneItems.splice(itemeDeleteIndex, 1)
                    }
                })
                state.items = cloneItems
            } else {
                state.items = [
                    {
                        t1: {
                            itemId: 1,
                            ponts: 0
                        },
                        t2: {
                            itemId: 2,
                            ponts: 0
                        }
                    }
                ]
            }
        }
    },

})


export const { setItemId, setItemActiveId, addItem, changePontsItem, changeTeamsName, calcPontsTeams, localStorageManger, changeRoundPontsWin, resetAppCounterPonts,
    deleteItem } = itemSlice.actions

export default itemSlice.reducer