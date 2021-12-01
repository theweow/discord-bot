import "colors"

export const info = (...data: any[]) => console.log("INFO".blue, ...data)
export const debug = (...data: any[]) => console.log("DEBUG".yellow, ...data)
export const error = (...data: any[]) => console.log("ERROR".red.bold, ...data)
export const warn = (...data: any[]) => console.log("WARN".yellow.bold, ...data)

var inProgress: string[]

export const progress = (...data: any[]) => {
    inProgress = data
    console.log("...".blue, ...data)
}
export const success = () => console.log("OK".green, ...inProgress)
