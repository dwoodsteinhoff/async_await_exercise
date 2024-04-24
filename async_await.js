//part 1
async function favoriteNumberFact (){
    let baseURL = "http://numbersapi.com"
    let factPromise = $.getJSON(`${baseURL}/4?json`)

    let fact = await factPromise;

    console.log(fact.text)
}

async function multipleNumbersFact (){
    let baseURL = "http://numbersapi.com"

    let factPromise = $.getJSON(`${baseURL}/1..4?json`)
    let facts = await factPromise;

    for(let fact of Object.values(facts)){
        console.log(fact)
    }

}

let $facts = $('#number_facts')

async function favoriteNumberFacts (){
    let baseURL = "http://numbersapi.com"
    let factPromise = await Promise.all([
        $.getJSON(`${baseURL}/4?json`),
        $.getJSON(`${baseURL}/4?json`),
        $.getJSON(`${baseURL}/4?json`),
        $.getJSON(`${baseURL}/4?json`)
    ]) 

    for(let fact of factPromise){
        console.log(fact.text)
        $facts.append(
            $('<li>').text(fact.text)
        )
    }
}

favoriteNumberFacts()

// part 2

async function drawACard(){
    let baseURL = "https://deckofcardsapi.com/api/deck"
    let cardPromise = $.getJSON(`${baseURL}/new/draw`)

    let card = await cardPromise;

    console.log(`${card.cards[0].value} of ${card.cards[0].suit}`)
}

async function drawAnotherCard(){
    let baseURL = "https://deckofcardsapi.com/api/deck"
    let cardPromise = $.getJSON(`${baseURL}/new/draw`)
    let card = await cardPromise;

    let deckId = card.deck_id

    cardPromise = $.getJSON(`${baseURL}/${deckId}/draw/`)
    let anotherCard = await cardPromise

    console.log(`${card.cards[0].value} of ${card.cards[0].suit}`)
    console.log(`${anotherCard.cards[0].value} of ${anotherCard.cards[0].suit}`)
}

let $btn = $('button')
let $cards = $('#cards')

async function drawCards(){
    let baseURL = "https://deckofcardsapi.com/api/deck"
    let deckPromise = $.getJSON(`${baseURL}/new/shuffle`)
    let deck = await deckPromise;

    let deckId = deck.deck_id

    console.log(deck)

    $btn.on('click', async function(){
        let cardPromise = $.getJSON(`${baseURL}/${deckId}/draw/`)
        let card = await cardPromise

        let cardPic = card.cards[0].image
        $cards.append(
            $('<img>', {
                src : cardPic
            })
        )
        if (card.remaining === 0){
            $btn.remove();
        }
    })
}

drawCards()