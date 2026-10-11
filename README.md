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

## Treino híbrido
A aba Treino híbrido organiza duas sessões de caminhada/trote na esteira, combinadas com dias de superiores. A primeira etapa tem 22 minutos: 5 min caminhando, 6 × (30 s trote + 90 s caminhada), 5 min caminhando. As etapas são repetíveis, sem prazo para 5 km e sem velocidade prescrita. A sugestão requer validação profissional para condições individuais.

Registrar corrida inclui duração, distância informada manualmente do Apple Watch, esforço, dor e conclusão dos intervalos. Recuperação é confirmada a partir do dia seguinte. Avanço manual exige três sessões completas na etapa, separadas por ao menos dois dias de calendário, esforço até 4/10, sem dor e com recuperação confirmada. Essa regra de produto não substitui avaliação profissional. Um registro de 5 km pode incluir caminhada; 30 min correndo não garante essa distância.

“Aplicar semana híbrida” substitui a ficha mediante confirmação, mantendo pesos e histórico. Tempos das corridas não atualizam a ficha automaticamente ao avançar; reaplique se desejado. O RPG fica provisoriamente na quarta-feira e pode ser editado. A integração com Apple Watch é manual. Os registros de corrida integram o backup local, sem sincronização ou conta.
