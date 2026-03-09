import express from 'express';
const app = express();

const citacoesCientistas = [
    { autor: "Albert Einstein", citacao: "A imaginação é mais importante que o conhecimento." },
    { autor: "Isaac Newton", citacao: "Se vi mais longe, foi por estar sobre ombros de gigantes." },
    { autor: "Marie Curie", citacao: "Nada na vida deve ser temido, somente compreendido." },
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

// Estilo CSS
const style = `
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            height: 100vh; 
            margin: 0; 
            background-color: #f0f2f5; 
            text-align: center;
        }
        .card { 
            background: white; 
            padding: 2rem; 
            border-radius: 15px; 
            shadow: 0 4px 6px rgba(0,0,0,0.1); 
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            max-width: 80%;
        }
        h1 { color: #1a73e8; }
        p { font-size: 1.2rem; color: #333; }
        .autor { font-weight: bold; color: #555; margin-top: 10px; display: block; }
        a { color: #1a73e8; text-decoration: none; font-weight: bold; }
        a:hover { text-decoration: underline; }
        .instrucoes { text-align: left; background: #e8f0fe; padding: 15px; border-radius: 8px; }
    </style>
`;

// 1. Página Inicial 
app.get('/', (req, res) => {
    res.send(`
        ${style}
        <div class="card">
            <h1>Documentação da API</h1>
            <p>Bem-vindo! Esta API fornece dados aleatórios para testes.</p>
            <div class="instrucoes">
                <p>Para utilizar, adicione os seguintes sufixos à URL:</p>
                <ul>
                    <li><a href="/random">/random</a> - Gera um número entre 1 e 100</li>
                    <li><a href="/dado">/dado</a> - Simula o lançamento de um dado (1-6)</li>
                    <li><a href="/citacoes">/citacoes</a> - Exibe uma citação de um cientista</li>
                </ul>
            </div>
            <p style="font-size: 0.9rem; margin-top: 20px;">Desenvolvido para a Atividade 02 da cadeira de aplicação orientada a serviços.</p>
        </div>
    `);
});

// 2. Endpoint /random 
app.get('/random', (req, res) => {
    const num = Math.floor(Math.random() * 100) + 1;
    res.send(`
        ${style}
        <div class="card">
            <h1>Número Aleatório</h1>
            <p style="font-size: 3rem; margin: 0;">${num}</p>
            <br><a href="/">← Voltar</a>
        </div>
    `);
});

// 3. Endpoint /dado 
app.get('/dado', (req, res) => {
    const dado = Math.floor(Math.random() * 6) + 1;
    res.send(`
        ${style}
        <div class="card">
            <h1>Resultado do Dado</h1>
            <p style="font-size: 4rem; margin: 0;">🎲 ${dado}</p>
            <br><a href="/">← Voltar</a>
        </div>
    `);
});

// 4. Endpoint /citacoes 
app.get('/citacoes', (req, res) => {
    const index = Math.floor(Math.random() * citacoesCientistas.length);
    const { autor, citacao } = citacoesCientistas[index];
    res.send(`
        ${style}
        <div class="card">
            <h1>Citação do Dia</h1>
            <p>"${citacao}"</p>
            <span class="autor">— ${autor}</span>
            <br><br><a href="/">← Voltar</a>
        </div>
    `);
});

export default app;