const express = require('express');
const app = express();

// Arrays para armazenar materiais e quantidades
const materiais = [];
const quantidades = [];

// Middleware para processar dados JSON
app.use(express.json());

// Requisito 1 - Listar materiais
app.get('/materials', (req, res) => {
  const materialsData = materiais.map((material, index) => ({
    id: index,
    name: material,
    qtde: quantidades[index],
  }));

  res.status(200).json(materialsData);
});

// Requisito 2 - Criação
app.post('/materials', (req, res) => {
  const { material } = req.body;
  if (!material || !material.name || !material.qtde) {
    res.status(400).json({ error: 'Dados inválidos' });
    return;
  }

  materiais.push(material.name);
  quantidades.push(material.qtde);
  res.status(201).send();
});

// Requisito 3 - Busca por ID
app.get('/materials/:id', (req, res) => {
  const { id } = req.params;
  if (id >= 0 && id < materiais.length) {
    const materialData = {
      id: parseInt(id),
      name: materiais[id],
      qtde: quantidades[id],
    };
    res.status(200).json({ material: materialData });
  } else {
    res.status(404).json({ error: 'Material não encontrado' });
  }
});

// Requisito 4 - Alterar por ID
app.put('/materials/:id', (req, res) => {
  const { id } = req.params;
  const { material } = req.body;
  if (id >= 0 && id < materiais.length && material && material.name && material.qtde) {
    materiais[id] = material.name;
    quantidades[id] = material.qtde;
    res.status(200).send();
  } else {
    res.status(404).json({ error: 'Material não encontrado ou dados inválidos' });
  }
});

// Requisito 5 - Remover por ID
app.delete('/materials/:id', (req, res) => {
  const { id } = req.params;
  if (id >= 0 && id < materiais.length) {
    materiais.splice(id, 1);
    quantidades.splice(id, 1);
    res.status(200).json(materiais.map((material, index) => ({
      id: index,
      name: material,
      qtde: quantidades[index],
    })));
  } else {
    res.status(404).json({ error: 'Material não encontrado' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
