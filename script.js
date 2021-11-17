//mock get request
let getCards = (pageNumber, numberOfCards) => {
    if(numberOfCards < 0 || pageNumber < 0)
        throw new Error("Number of cards and page number should be positive numbers");

    let firstBoundary = pageNumber * numberOfCards;
    let secondBoundary = firstBoundary + numberOfCards;

    if(secondBoundary > api.length)
        throw new Error("There is no so many cards in the api");

    return api.slice(firstBoundary, secondBoundary);
}

let initializeDocument = (numberOfCardsPerPage) => {
    let initializePagination = (numberOfCardsPerPage) => {
        let numberOfPages = Math.ceil(api.length / numberOfCardsPerPage);

        document.body.innerHTML = `
        <nav aria-label="...">
            <ul class="pagination">
                <li class="page-item disabled"><a class="page-link" href="#" tabindex="-1">Previous</a></li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                ${ numberOfPages >= 2 ? `<li class="page-item"><a class="page-link" href="#">2</a></li>` : "" }
                ${ numberOfPages >= 3 ? `<li class="page-item"><a class="page-link" href="#">3</a></li>` : "" }
                ${ 
                    numberOfPages > 6  ? 
                        numberOfPages == 7 ? 
                            `<li class="page-item"><a class="page-link" href="#">4</a></li>`
                        :
                            `<li class="page-item disabled"><a class="page-link" href="#">...</a></li>`
                    : ""
                }
                ${ numberOfPages >= 6 ? `<li class="page-item"><a class="page-link" href="#">${ numberOfPages - 2 }</a></li>` : ""}
                ${ numberOfPages >= 5 ? `<li class="page-item"><a class="page-link" href="#">${ numberOfPages - 1 }</a></li>` : ""}
                ${ numberOfPages >= 4 ? `<li class="page-item"><a class="page-link" href="#">${ numberOfPages }</a></li>` : ""}
                <li class="page-item ${numberOfPages > 1 ? "" : "disabled"}"><a class="page-link" href="#">Next</a></li>
            </ul>
        </nav>`;
    };

    api.forEach(card => {
        let wrapper = document.createElement('div');
        let image = document.createElement('img');
        let title = document.createElement('h3');
        let description = document.createElement('p');

        wrapper.className = "card";
        image.src = card.img;
        title.appendChild(document.createTextNode(card.title));
        description.appendChild(document.createTextNode(card.description));
        initializePagination(numberOfCardsPerPage);
        //document.body.appendChild(image);

    })
};

initializeDocument(8);