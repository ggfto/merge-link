# About
## English
Node App to generate merge links to Sankhya's GitLab. It only works with Sankhya's structure.

## Português
App Node para gerar links de merge do GitLab da Sankhya. Somente funciona com a estrutura da Sankhya.

# Usage

## English
Just run the command below on cmd/terminal and head over to http://localhost:7030 . You can change the host port if you'd like to.

## Português
Rode o comando abaixo no cmd/terminal e acesse http://localhost:7030 . Você pode mudar a porta do host se quiser.

# Command
docker run -p 7030:7030 -d --name merge-link --restart unless-stopped ggfto/merge-link
