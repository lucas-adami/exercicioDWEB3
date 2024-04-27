const express = require('express')
const app = express()
const port = 3000

let alunos = [];

app.use(express.json());


app.post('/alunos', (req, res) => {
    const { RA, nome, turma } = req.body;
    alunos.push({ RA, nome, turma, cursos: [] });
    res.send(`Aluno ${nome} adicionado com sucesso.`);
});


app.post('/alunos/:RA/cursos', (req, res) => {
    const RA = req.params.RA;
    const curso = req.body.curso;
    const aluno = alunos.find(aluno => aluno.RA === RA);
    if (!aluno) {
        res.status(404).send('Aluno não encontrado.');
    } else {
        aluno.cursos.push(curso);
        res.send(`Curso ${curso} adicionado para o aluno ${aluno.nome}.`);
    }
});


app.put('/alunos/:RA', (req, res) => {
    const RA = req.params.RA;
    const { nome, turma } = req.body;
    const aluno = alunos.find(aluno => aluno.RA === RA);
    if (!aluno) {
        res.status(404).send('Aluno não encontrado.');
    } else {
        aluno.nome = nome;
        aluno.turma = turma;
        res.send(`Dados do aluno ${aluno.nome} atualizados.`);
    }
});


app.put('/alunos/:RA/cursos', (req, res) => {
    const RA = req.params.RA;
    const novoCurso = req.body.curso;
    const aluno = alunos.find(aluno => aluno.RA === RA);
    if (!aluno) {
        res.status(404).send('Aluno não encontrado.');
    } else {
        aluno.cursos = [novoCurso];
        res.send(`Curso do aluno ${aluno.nome} atualizado para ${novoCurso}.`);
    }
});


app.delete('/alunos/:RA', (req, res) => {
    const RA = req.params.RA;
    alunos = alunos.filter(aluno => aluno.RA !== RA);
    res.send(`Aluno com RA ${RA} removido da lista.`);
});


app.delete('/alunos/:RA/cursos', (req, res) => {
    const RA = req.params.RA;
    const cursoRemover = req.body.curso;
    const aluno = alunos.find(aluno => aluno.RA === RA);
    if (!aluno) {
        res.status(404).send('Aluno não encontrado.');
    } else {
        aluno.cursos = aluno.cursos.filter(curso => curso !== cursoRemover);
        res.send(`Curso ${cursoRemover} removido do aluno ${aluno.nome}.`);
    }
});


app.get('/alunos', (req, res) => {
    res.json(alunos.map(aluno => ({ RA: aluno.RA, nome: aluno.nome, turma: aluno.turma })));
});

app.get('/alunos/:RA', (req, res) => {
    const RA = req.params.RA;
    const aluno = alunos.find(aluno => aluno.RA === RA);
    if (!aluno) {
        res.status(404).send('Aluno não encontrado.');
    } else {
        res.json({ nome: aluno.nome, turma: aluno.turma, cursos: aluno.cursos });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});