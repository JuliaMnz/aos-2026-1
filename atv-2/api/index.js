import express from 'express';
const app = express();

const citacoesCientistas = [
    { autor: "Albert Einstein", citacao: "A imaginação é mais importante que o conhecimento." },
    { autor: "Isaac Newton", citacao: "Se vi mais longe, foi por estar sobre ombros de gigantes." },
    { autor: "Nikola Tesla", citacao: "O presente é deles; o futuro, pelo qual eu realmente trabalhei, é meu." },
    { autor: "Richard Feynman", citacao: "O primeiro princípio é que você não deve se enganar." },
    { autor: "Carl Sagan", citacao: "Diante da imensidão do tempo e da vastidão do universo, é um prazer compartilhar um planeta e uma época com você." },
    { autor: "Ada Lovelace", citacao: "A imaginação é a faculdade da descoberta, pré-eminentemente." },
    { autor: "Rosalind Franklin", citacao: "A ciência e a vida cotidiana não podem e não devem ser separadas." },
    { autor: "Galileu Galilei", citacao: "Todas as verdades são fáceis de entender depois de descobertas; o ponto é descobri-las." },
    { autor: "Louis Pasteur", citacao: "A sorte favorece a mente preparada." },
    { autor: "Jane Goodall", citacao: "O que você faz faz diferença, e você tem que decidir que tipo de diferença quer fazer." },
    { autor: "Max Planck", citacao: "A ciência não pode resolver o mistério final da natureza." },
    { autor: "Niels Bohr", citacao: "Um especialista é alguém que cometeu todos os erros que podem ser cometidos em um campo muito estreito." },
    { autor: "Johannes Kepler", citacao: "A natureza usa o mínimo possível de tudo." },
    { autor: "Edwin Hubble", citacao: "Equipado com seus cinco sentidos, o homem explora o universo ao seu redor e chama a aventura de Ciência." },
    { autor: "Rachel Carson", citacao: "Quanto mais claramente pudermos focar nossa atenção nas maravilhas e realidades do universo, menos gosto teremos pela destruição." },
    { autor: "Gregor Mendel", citacao: "Minhas investigações científicas me trouxeram muita satisfação." },
    { autor: "Thomas Edison", citacao: "Eu não falhei. Apenas encontrei 10.000 maneiras que não funcionam." },
    { autor: "Dmitri Mendeleev", citacao: "Não há nada no mundo que eu tema tanto quanto o deserto da ignorância." },
    { autor: "James Clerk Maxwell", citacao: "A ciência é para ser desfrutada, não apenas para ser suportada." },
    { autor: "Linus Pauling", citacao: "A melhor maneira de ter uma boa ideia é ter muitas ideias." },
    { autor: "Katherine Johnson", citacao: "Goste do que faz e então você fará o seu melhor." },
    { autor: "Alan Turing", citacao: "Às vezes são as pessoas de quem ninguém espera nada que fazem as coisas que ninguém pode imaginar." },
    { autor: "Francis Bacon", citacao: "Conhecimento é poder." },
    { autor: "Alexander Fleming", citacao: "Às vezes, encontramos o que não estamos procurando." },
    { autor: "Werner Heisenberg", citacao: "O que observamos não é a natureza em si, mas a natureza exposta ao nosso método de questionamento." },
    { autor: "Barbara McClintock", citacao: "Se você sabe que está no caminho certo, você tem esse conhecimento interno. Então, ninguém pode te desanimar." },
    { autor: "Chien-Shiung Wu", citacao: "Não há nada mais terrível do que uma mente fechada." }
];

// Interface
app.get('/', (req, res) => {
    res.send(`
        <html>
            <body style="font-family: sans-serif; text-align: center; padding: 50px;">
                <h1>Painel da API Express</h1>
                <p>Clique nos botões abaixo para testar os endpoints:</p>
                <button onclick="window.location.href='/random'">Gerar Número (1-100)</button>
                <button onclick="window.location.href='/dado'">Jogar Dado (1-6)</button>
                <button onclick="window.location.href='/citacoes'">Ver Citação</button>
            </body>
        </html>
    `);
});

app.get('/random', (req, res) => {
    const num = Math.floor(Math.random() * 100) + 1;
    res.json({ numero: num });
});

app.get('/dado', (req, res) => {
    const dado = Math.floor(Math.random() * 6) + 1;
    res.json({ resultado: dado });
});

app.get('/citacoes', (req, res) => {
    const index = Math.floor(Math.random() * citacoesCientistas.length);
    res.json(citacoesCientistas[index]);
});

export default app;