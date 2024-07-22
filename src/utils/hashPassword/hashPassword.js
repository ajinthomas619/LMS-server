import bcrypt from 'bcrypt'


export const hashPassword = async(password) => {
    try {
        const salt = await bcrypt.genSalt(10)

        const hashedPass = await bcrypt.hash(password,salt)

        return hashedPass
    } catch (error) {
        console.log(error,"error in hashing password")
        throw new Error("Error in hashing password")
    }
}

export const comparePassword = async(password,hashedPass) => {
    try {
        let match = await bcrypt.compare(password,hashedPass)
        return match
        
    } catch (error) {
        console.log(error,"error in comparing password")
        throw new Error("error in comparing password")
    }
}