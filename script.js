const casas = [
    {nome:"Casa Praia Azul", preco:250, tipo:"praia", descricao:"Linda casa perto da praia com vista para o mar.", fotos:["https://picsum.photos/600/400?random=1","https://picsum.photos/600/400?random=11"]},
    {nome:"Chalé Montanha Verde", preco:200, tipo:"montanha", descricao:"Aconchegante chalé na montanha rodeado de natureza.", fotos:["https://picsum.photos/600/400?random=2","https://picsum.photos/600/400?random=12"]},
    {nome:"Loft Urbano", preco:180, tipo:"urbana", descricao:"Loft moderno no centro da cidade, próximo a restaurantes e bares.", fotos:["https://picsum.photos/600/400?random=3","https://picsum.photos/600/400?random=13"]},
    {nome:"Casa Lago Sereno", preco:220, tipo:"lago", descricao:"Casa tranquila à beira do lago, perfeita para relaxar.", fotos:["https://picsum.photos/600/400?random=4","https://picsum.photos/600/400?random=14"]},
    {nome:"Villa do Sol", preco:300, tipo:"villa", descricao:"Villa espaçosa com piscina e jardim privativo.", fotos:["https://picsum.photos/600/400?random=5","https://picsum.photos/600/400?random=15"]},
    {nome:"Casa Campo Florido", preco:180, tipo:"campo", descricao:"Charmosa casa no campo cercada por flores e tranquilidade.", fotos:["https://picsum.photos/600/400?random=6","https://picsum.photos/600/400?random=16"]}
];

// Carregar casas no grid
function carregarCasas(casasFiltradas=casas){
    const container = document.getElementById("casas-container");
    container.innerHTML = "";
    casasFiltradas.forEach((casa,index)=>{
        const div = document.createElement("div");
        div.className = "casa-card";
        div.innerHTML = `
            <img src="${casa.fotos[0]}" alt="${casa.nome}">
            <h2>${casa.nome}</h2>
            <p>${casa.descricao}</p>
            <p>R$${casa.preco}/noite</p>
        `;
        div.onclick = ()=>abrirModal(index);
        container.appendChild(div);
    });
}

// Filtros
function aplicarFiltros(){
    const precoMax = document.getElementById("preco").value;
    const tipoSelecionado = document.getElementById("tipo").value;
    const filtradas = casas.filter(casa=>{
        return (precoMax==="" || casa.preco<=precoMax) &&
               (tipoSelecionado==="todas" || casa.tipo===tipoSelecionado);
    });
    carregarCasas(filtradas);
}

// Abrir modal
function abrirModal(index){
    const casa = casas[index];
    const modal = document.getElementById("modal");
    const corpo = document.getElementById("modal-corpo");

    corpo.innerHTML = `
        <h2>${casa.nome}</h2>
        <p>${casa.descricao}</p>
        <p>R$${casa.preco}/noite</p>

        <div class="galeria">
            <img id="foto-principal" src="${casa.fotos[0]}" alt="${casa.nome}">
            <div class="miniaturas">
                ${casa.fotos.map((f,i)=>`<img src="${f}" class="miniatura" onclick="trocarFoto('${f}')">`).join('')}
            </div>
        </div>

        <div class="reserva">
            <label>Check-in: <input type="date" id="checkin"></label>
            <label>Check-out: <input type="date" id="checkout"></label>
            <button onclick="reservarComDatas('${casa.nome}')">Reservar</button>
        </div>
    `;
    modal.style.display = "block";
}

// Fechar modal
function fecharModal(){
    document.getElementById("modal").style.display = "none";
}

// Trocar foto principal da galeria
function trocarFoto(src){
    document.getElementById("foto-principal").src = src;
}

// Reservar com datas
function reservarComDatas(nomeCasa){
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;

    if(!checkin || !checkout){
        alert("Selecione check-in e check-out.");
        return;
    }

    const dataIn = new Date(checkin);
    const dataOut = new Date(checkout);

    if(dataOut <= dataIn){
        alert("Check-out deve ser após o check-in.");
        return;
    }

    alert(`Você reservou a ${nomeCasa} de ${checkin} até ${checkout}!`);
    fecharModal();
}

// Fechar modal clicando fora
window.onclick = function(event){
    const modal = document.getElementById("modal");
    if(event.target === modal) fecharModal();
}

// Inicialização
window.onload = function(){
    carregarCasas();
}
