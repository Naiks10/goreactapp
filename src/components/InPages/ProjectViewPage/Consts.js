import React from "react"

export const ProjectContext = React.createContext(null);
export const WorkGroupContext = React.createContext(null);
export const SuperTaskcontext = React.createContext(null)
export const Taskcontext = React.createContext(null);
export const Stagecontext = React.createContext(null);
export const Modulecontext = React.createContext(null);

export function GetDate(value) {
    var data = new Date(value)
    return data.toLocaleDateString("ru-RU")
}

export function GetStatus(value) {
    var val = null
    switch (value) {
        case 1:
            val = '#2098D1'
            break;
        case 2:
            val = 'rgb(27, 214, 74)'
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