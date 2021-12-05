import "colors"

export const info = async (...data: any[]) => console.log("INFO".blue, ...data)
export const debug = async (...data: any[]) => console.log("DEBUG".yellow, ...data)
export const error = async (...data: any[]) => console.log("ERROR".red.bold, ...data)
export const warn = async (...data: any[]) => console.log("WARN".yellow.bold, ...data)

var inProgress: string[]

export const progress = (...data: any[]) => {
    inProgress = data
    console.log("...".blue, ...data)
}
export const success = () => console.log("OK".green, ...inProgress)
