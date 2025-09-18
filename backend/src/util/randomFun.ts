
function random(length: number){
    const option = "1234abc$%#292";
    let hashString = ""+process.env.MY_PLATEFORM_PREFIX;
    
    for(let i=0; i<length; i++){
        hashString = hashString + option[Math.floor((Math.random()*option.length))];
    }

    return hashString;
}

export default random;