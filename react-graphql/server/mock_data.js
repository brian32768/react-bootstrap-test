/*
    Pretend we're reading a database,
    so use a timer and promises to slow things down.
*/
let instruments = [
    {
        "id": 1,
        "firstname" : "James",
        "lastname" : "Dean",
        "recording_date": "01-01-1957"
    },
    {
        "id": 2,
        "firstname" : "Able",
        "lastname" : "Baker",
        "recording_date": "01-01-1967"
    },
    {
        "id": 3,
        "firstname" : "Lorna",
        "lastname" : "Doon",
        "recording_date": "01-01-1977"
    }
]

export const dbConfig = {
};

const readTable = where => {
    return new Promise(callback => {
        setTimeout(() => {
            console.log("Reading instruments.", where);
            instruments.push({
                id: Math.round(Math.random()*100, 0),
                firstname:"Arthur", 
                lastname:"Wildman",
                recording_date: '6/14/2023'});
            callback(instruments);
        }, 1000);
    })
}
export const getInstruments = async (where) => {
    let rval = await readTable(where);
    return rval;
}
