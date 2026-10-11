# Ritmo
Aplicativo pessoal de treino em português, responsivo e instalável (PWA). Sem dependências externas.

## Executar
Node.js 24 ou superior. Na pasta do projeto:
```
npm start
npm test
```
O servidor usa a porta 3000; `PORT` permite substituí-la. Para instalação no celular e funcionamento offline, hospede em HTTPS. Não há publicação automática.

## Funcionalidades
Ficha semanal editável, exercícios e notas de adaptação, séries com carga/repetições, atividades como RPG e cardio, histórico, gráfico de maior carga por exercício, peso e meta configurável. Backup JSON com importação validada.

A organização semanal é um rascunho, sem prescrição de exercícios. Validar ficha e adaptações com profissional e meta de peso com nutricionista. Registre seu peso em Evolução.

## Dados
Dados somente no localStorage deste navegador/dispositivo. Não há login, sincronização, servidor de dados ou compartilhamento. Limpar dados do navegador remove registros; faça backups. Sessões em andamento não são salvas até concluir. O volume de exercícios unilaterais usa a carga e as repetições registradas por lado, sem duplicar automaticamente.

## Verificações
`npm test` valida o modelo e backups. Faça a verificação funcional: adicionar exercício na ficha, concluir séries, conferir histórico e gráfico, registrar dois pesos, exportar/importar backup. Verifique instalação e modo offline em HTTPS.

## GitHub Pages
O workflow `.github/workflows/pages.yml` testa e publica somente arquivos públicos a cada push em `main`. Em Settings → Pages, selecione GitHub Actions como Source. O aplicativo usa caminhos relativos para funcionar no subdiretório `/Treino/`.
