import React from "react"

export const ProjectContext = React.createContext(null);
export const WorkGroupContext = React.createContext(null);
export const SuperTaskcontext = React.createContext(null)
export const Taskcontext = React.createContext(null);
export const Stagecontext = React.createContext(null);
export const Modulecontext = React.createContext(null);
export const GroupContext = React.createContext(null);
export const ProjectValueContext = React.createContext({
    id: null,
    current: null,
    plan: null,
    count_all: 0,
    count: 0,
    issues: 0,
    updateValue: () => { },
})
ProjectValueContext.displayName = 'FIND_ME_THERE!!!!'

export const ProjectGraphContext = React.createContext({
    ID : null,
    Items : null,
    Items_fact : null,
    updateValue: () => { },
    isLoaded : false
})

export function GetDate(value) {
    var data = new Date(value)
    return data.toLocaleDateString("ru-RU")
}

export function GetStatus(value) {
    var val = null
    switch (value) {
        case 0:
            val = '#6e6e6e'
            break;
        case 1:
            val = 'rgb(27, 214, 74)'
            break;
        case 2:
            val = '#2098D1'
            break;
        case 3:
            val = 'rgb(255, 196, 0)'
            break;
        case 4:
            val = 'red'
            break;

    }
    return val
}

export function GetStatusAlpha(value) {
    var val = null
    switch (value) {
        case 0:
            val = 'rgba(110, 110, 110, .15)'
            break;
        case 1:
            val = 'rgba(27, 214, 74, .15)'
            break;
        case 2:
            val = 'rgba(32,152,209, .15)'
            break;
        case 3:
            val = 'rgba(255, 196, 0, .15)'
            break;
        case 4:
            val = 'rgba(255, 0, 0, .15)'
            break;

    }
    return val
}