
let generateSampleData = () => {
    let sampleData = []

    for(let i = 0; i < 20; i++) {
        let preferredContact = i % 2 == 0 ? "(123) 456 789" : "Fred@gmail.com";
        let custometObj = {
            id : i + 1,
            name : "Fred",
            contact: preferredContact,
            paymentStatus: "Paid",
            picture: null,
            waiver: null,
            pendingAction: false
        }
        sampleData.push(custometObj);
    }
    return sampleData;
}

export default generateSampleData;