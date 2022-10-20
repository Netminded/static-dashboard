const validateEmail = (email: string | null) => { 
    if(email) {
        const emailParts = email.split('@')
        const idx = email.lastIndexOf('@')
        if (emailParts.length === 2) {
            if (emailParts[1] === 'seethrunetworks.com' && emailParts[1].length === 19 && idx > -1 && email.slice(idx + 1) === 'seethrunetworks.com') {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
}

const getFirstName = (fullName: string | null) => {
    let name = fullName
    if(fullName) {
        const nameParts = fullName.split(' ')
        if(nameParts.length >= 2) name = nameParts[0]
    }
    return name
}

const adjustColor = (color:string, percent: number) => {
    let R = parseInt(color.substring(1,3),16)
    let G = parseInt(color.substring(3,5),16)
    let B = parseInt(color.substring(5,7),16)

    R = Math.floor(R * (100 + percent) / 100)
    G = Math.floor(G * (100 + percent) / 100)
    B = Math.floor(B * (100 + percent) / 100)

    R = (R<255)?R:255  
    G = (G<255)?G:255  
    B = (B<255)?B:255  

    const RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16))
    const GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16))
    const BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16))

    return "#"+RR+GG+BB
}

export { validateEmail, getFirstName, adjustColor }