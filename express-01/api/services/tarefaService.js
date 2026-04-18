import axios from "axios";
const urlBase = "https://aos-2026-1-qnin.vercel.app/tarefas";

const headersJson = {
  "Content-Type": "application/json",
};

 // Busca todas as tarefas
export async function getTarefas() {
  const response = await axios.get(urlBase);
  return response.data; 
}


 // Busca uma tarefa específica pelo ID
export async function getTarefa(id) {
  const response = await axios.get(`${urlBase}/${id}`);
  return response.data;
}

 // Adiciona uma nova tarefa
export async function adicionarTarefa(novaTarefa) {
  const response = await axios.post(urlBase, novaTarefa, {
    headers: headersJson,
  });
  return response.data;
}

 // Atualiza uma tarefa existente
export async function atualizarTarefa(tarefaAtualizada) {
  const id = tarefaAtualizada.id;
  
  const response = await axios.put(
    `${urlBase}/${id}`,
    tarefaAtualizada,
    {
      headers: headersJson,
    }
  );
  return response.data;
}

 // Remove uma tarefa
export async function removerTarefa(id) {
  const response = await axios.delete(`${urlBase}/${id}`);
  return response.data;
}