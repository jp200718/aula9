let products = []

async function carregarErenderizarCards() {
    const cards = document.getElementById("cards");

    if (!cards) {
        console.error('Elemento #cards não encontrado no DOM.');
        return;
    }
    
    try {
        // 1. Carregamento dos Dados
        const response = await fetch('../data.json');

        if (!response.ok) {
            throw new Error(`Erro de rede: ${response.status}`);
        }
        const productsList = await response.json(); 

        // 2. Renderização da Galeria (Lógica interna da carregarErenderizarCards)
        cards.innerHTML = productsList.map(product => `
            <figure class="card">
                <img src="${product.image.desktop}" alt="${product.name}"> 
                <button class="btn">Add to Cart</button>
                <p class="category">${product.category}</p>
                <figcaption>${product.name}</figcaption>
                <p class="price">$${parseFloat(product.price).toFixed(2)}</p>
            </figure>
        `).join('');

        btnClick()
        

    } catch (error) {
        console.error('Falha na operação:', error);
    }
}


function btnClick() {
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("23add");
        })
    })
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = { carregarErenderizarCards };
}
if (typeof window !== 'undefined') {
    carregarErenderizarCards();
}

// ${} => placeholder
// dentro principalmente de crase
// importar uma variavel ou expressão de js
// const name = "joao"
// console.log(`o meu nome é ${name}`)

// corrigir as img para elas aparecerem 
// criar um test para ler o card com a img

// Nome do Produto: creme brule



// criar o designer dos cards

