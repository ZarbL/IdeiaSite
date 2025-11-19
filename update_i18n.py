#!/usr/bin/env python3
"""
Script para adicionar atributos data-i18n ao HTML baseado nos arquivos de tradução
"""

import re
import json

# Mapeamento de textos para chaves i18n
text_to_key = {
    # Problema
    "Por que um Desafio Espacial?": "problema.title",
    "A educação brasileira apresenta baixo desempenho em áreas de STEM (Ciência, Tecnologia, Engenharia e Matemática). Ao mesmo tempo, o setor espacial está em expansão e enfrenta uma ausência de profissionais qualificados.": "problema.text1",
    "Acreditamos que o fascínio pelo espaço pode ser a fagulha para uma experiência de aprendizado engajadora. Usamos a missão espacial como uma ferramenta para capacitar estudantes para a economia do futuro.": "problema.text2",
    
    # Desafio
    "O que é o Desafio Espacial?": "desafio.title",
    "Trata-se de uma competição de projetos de Missão Espacial voltada para alunos do Ensino Médio (14 a 18 anos). O projeto é desenhado para um ano e impacta diferentes grupos de alunos em etapas progressivas:": "desafio.description",
    "Alunos Iniciais": "desafio.stats.initial",
    "Alunos Selecionados": "desafio.stats.selected",
    "Duração Total do Projeto": "desafio.stats.duration",
    
    # Metodologia
    "Nossa Metodologia: Aprendendo na Prática": "metodologia.title",
    'Nossa filosofia é fundamentada na Aprendizagem Baseada em Projetos (ABP) e no conceito "Hands On". O Desafio Espacial é estruturado em um caminho pedagógico de 5 passos:': "metodologia.description",
    "Conceituar": "metodologia.steps.conceituar.title",
    'Os alunos definem o escopo e os objetivos da missão. Eles respondem: "Qual problema minha missão irá resolver?".': "metodologia.steps.conceituar.description",
    "Projetar": "metodologia.steps.projetar.title",
    "As equipes detalham como será a missão espacial e quais recursos serão necessários.": "metodologia.steps.projetar.description",
    "Construir": "metodologia.steps.construir.title",
    "Os alunos exploram o kit de desenvolvimento de satélites (SMT) e tiram a missão do papel.": "metodologia.steps.construir.description",
    "Lançar": "metodologia.steps.lancar.title",
    "Os alunos selecionados constroem o satélite orbital, realizam testes e o preparam para o lançamento.": "metodologia.steps.lancar.description",
    "Aplicar": "metodologia.steps.aplicar.title",
    "Com o satélite em órbita, os alunos utilizam seus dados para resolver o problema apontado na concepção da missão.": "metodologia.steps.aplicar.description",
    
    # Skills
    "Hard Skills": "metodologia.hardSkills.title",
    "Soft Skills": "metodologia.softSkills.title",
    "Metodologia Científica": "i:0",
    "Programação e Robótica": "i:1",
    "Análise de Dados": "i:2",
    "Gestão de Projeto": "i:3",
    "Criatividade": "soft:0",
    "Comunicação": "soft:1",
    "Tomada de Decisão": "soft:2",
    "Trabalho em Equipe": "soft:3",
}

print("Script de mapeamento criado. Execute manualmente as substituições no HTML.")
