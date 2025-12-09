global.fetch = jest.fn();

const { carregarErenderizarCards } = require('./card'); 

describe("Teste de Carregamento e Renderização de Cards", () => {
    const mockProducts = [
        {
            name: "Produto Teste 1",
            image: {
                desktop: "caminho/img1.jpg"
            },
            category: "categoria 1",
            price: 10
        },
        {
            name: "Produto Teste 2",
            image: {
                desktop: "caminho/img2.jpg"
            },
            category: "categoria 2",
            price: 20
        }
        
    ];

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="cards"></div>
        `;

        fetch.mockClear();
        fetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () => Promise.resolve(mockProducts), 
        });
    });

    test("deve renderizar div#cards", () => {
        const cardsDiv = document.getElementById("cards");
        expect(cardsDiv).not.toBeNull();
    });

    test.only("deve renderizar imagem, botão, titulo e categoria após carregar os dados", async () => {
        await carregarErenderizarCards(); 

        const cardsDiv = document.getElementById("cards");
        
        const figures = cardsDiv.querySelectorAll('figure.card');
        console.log(figures.length)
        expect(figures.length).toBe(2);

        const firstImage = figures[0].querySelector('img');
        const firstCaption = figures[0].querySelector('figcaption');
        const firstCategory = figures[0].querySelector('.category');
        const firstPrice = figures[0].querySelector('.price');
        const firstBtn = figures[0].querySelector('.btn')
            
        expect(firstImage).not.toBeNull();
        expect(firstImage.src).toContain(mockProducts[0].image.desktop); 
        expect(firstImage.alt).toBe(mockProducts[0].name); 

        expect(firstCaption).not.toBeNull();
        expect(firstCaption.textContent).toBe(mockProducts[0].name); 
        
        expect(firstCategory).not.toBeNull();
        expect(firstCategory.textContent).toBe(mockProducts[0].category); 

        expect(firstPrice).not.toBeNull();
        expect(firstPrice.textContent).toBe("$10.00");

        expect (firstBtn).not.toBeNull();
        expect (firstBtn.textContent).toBe("Add to Cart");
    });
});
