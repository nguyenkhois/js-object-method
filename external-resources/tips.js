const Hub = {
    subscribers: {},
    addSubscriber(eventName, eventSubscriber) {
        if (!this.subscribers[eventName]) {
            // om det inte finns något värde satt för nyckeln givet av
            // eventName (som t.ex. är 'temperature'),
            // skapa en tom lista av subscribers.
            this.subscribers[eventName] = [];
        }
        // lägg till subscribern till listan av subscribers för event:et som ges
        // av eventName (t.ex. 'temperature').
        this.subscribers[eventName].push(eventSubscriber);
    },
    notify(eventName, eventData) {
        // hämta ut listan av subscribers för event:et som ges av eventName
        // (t.ex. 'temperature')
        const subscriberList = this.subscribers[eventName];
        // loopa igenom listan av subscribers och anropa varje subscriber
        // med event data.
        subscriberList.forEach(subscriber => {
            subscriber(eventData);
        });
    },
    getEvents() {
        // hämta ut alla nycklar i objektet this.subscribers, d.v.s. alla events
        // (t.ex. 'temperature', 'heat') och returnera en lista av dessa.
        // Metod 1: Object.keys() funktionen.
        // return Object.keys(this.subscribers);
        // Metod 2: Använd for..in loop:en och skapa en egen lista av events.
        const eventNames = [];
        for (let eventName in this.subscribers) {
            eventNames.push(eventName);
        }
        return eventNames;
    }
};

//USING
Hub.addSubscriber('temperature', (currentTemperature) => {
    console.log(`Current temperature reading 1: ${currentTemperature}`);
});
Hub.addSubscriber('temperature', (currentTemperature) => {
    console.log(`Current temperature reading 2: ${currentTemperature}`);
});
Hub.addSubscriber('heat', (currentHeat) => {
    console.log(`Current heat reading: ${currentHeat}`);
});

Hub.notify('temperature', 900);
Hub.notify('heat', 20.5);
// i någon snygg dashboard...
const currentEvents = Hub.getEvents();
console.log(currentEvents);