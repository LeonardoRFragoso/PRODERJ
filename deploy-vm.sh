#!/bin/bash

#===============================================================================
# SCRIPT DE DEPLOY - SIMULADO PRODERJ
# VM: 192.168.0.45
# Porta: 8577
# Autor: Deploy Automatizado
# Data: Janeiro/2026
#===============================================================================

set -e  # Para execução em caso de erro

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configurações
APP_NAME="questionario-proderj"
APP_PORT=8577
APP_DIR="/opt/$APP_NAME"
APP_USER="proderj"
NODE_VERSION="20"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  DEPLOY - SIMULADO PRODERJ            ${NC}"
echo -e "${GREEN}  Porta: $APP_PORT                     ${NC}"
echo -e "${GREEN}========================================${NC}"

#===============================================================================
# FUNÇÃO: Verificar se é root
#===============================================================================
check_root() {
    if [[ $EUID -ne 0 ]]; then
        echo -e "${RED}Este script deve ser executado como root (sudo)${NC}"
        exit 1
    fi
}

#===============================================================================
# FUNÇÃO: Atualizar sistema
#===============================================================================
update_system() {
    echo -e "${YELLOW}[1/8] Atualizando sistema...${NC}"
    apt-get update -y
    apt-get upgrade -y
}

#===============================================================================
# FUNÇÃO: Instalar Node.js
#===============================================================================
install_nodejs() {
    echo -e "${YELLOW}[2/8] Instalando Node.js ${NODE_VERSION}...${NC}"
    
    # Verificar se Node.js já está instalado
    if command -v node &> /dev/null; then
        NODE_INSTALLED=$(node -v)
        echo -e "${GREEN}Node.js já instalado: $NODE_INSTALLED${NC}"
    else
        # Instalar Node.js via NodeSource
        curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
        apt-get install -y nodejs
    fi
    
    # Verificar versão
    echo -e "${GREEN}Node.js: $(node -v)${NC}"
    echo -e "${GREEN}NPM: $(npm -v)${NC}"
}

#===============================================================================
# FUNÇÃO: Instalar dependências do sistema
#===============================================================================
install_dependencies() {
    echo -e "${YELLOW}[3/8] Instalando dependências do sistema...${NC}"
    apt-get install -y git curl wget build-essential
}

#===============================================================================
# FUNÇÃO: Criar usuário da aplicação
#===============================================================================
create_user() {
    echo -e "${YELLOW}[4/8] Configurando usuário da aplicação...${NC}"
    
    if id "$APP_USER" &>/dev/null; then
        echo -e "${GREEN}Usuário $APP_USER já existe${NC}"
    else
        useradd -r -s /bin/false $APP_USER
        echo -e "${GREEN}Usuário $APP_USER criado${NC}"
    fi
}

#===============================================================================
# FUNÇÃO: Configurar diretório da aplicação
#===============================================================================
setup_app_directory() {
    echo -e "${YELLOW}[5/8] Configurando diretório da aplicação...${NC}"
    
    # Criar diretório se não existir
    mkdir -p $APP_DIR
    
    # Copiar arquivos do projeto (assumindo que estão no diretório atual)
    if [ -d "./questionario-proderj" ]; then
        cp -r ./questionario-proderj/* $APP_DIR/
    elif [ -f "./package.json" ]; then
        cp -r ./* $APP_DIR/
    else
        echo -e "${RED}Arquivos do projeto não encontrados!${NC}"
        echo -e "${YELLOW}Copie os arquivos para $APP_DIR manualmente${NC}"
    fi
    
    # Ajustar permissões
    chown -R $APP_USER:$APP_USER $APP_DIR
    chmod -R 755 $APP_DIR
    
    echo -e "${GREEN}Diretório configurado: $APP_DIR${NC}"
}

#===============================================================================
# FUNÇÃO: Instalar dependências do projeto e fazer build
#===============================================================================
build_project() {
    echo -e "${YELLOW}[6/8] Instalando dependências e fazendo build...${NC}"
    
    cd $APP_DIR
    
    # Limpar instalações anteriores
    rm -rf node_modules package-lock.json dist
    
    # Instalar dependências
    npm install
    
    # Build de produção
    npm run build
    
    # Instalar serve globalmente para servir a aplicação
    npm install -g serve
    
    echo -e "${GREEN}Build concluído!${NC}"
}

#===============================================================================
# FUNÇÃO: Criar serviço systemd
#===============================================================================
create_systemd_service() {
    echo -e "${YELLOW}[7/8] Criando serviço systemd...${NC}"
    
    cat > /etc/systemd/system/${APP_NAME}.service << EOF
[Unit]
Description=Simulado PRODERJ - Questionário de Concurso
Documentation=https://github.com/proderj/questionario
After=network.target

[Service]
Type=simple
User=$APP_USER
Group=$APP_USER
WorkingDirectory=$APP_DIR
ExecStart=/usr/bin/serve -s dist -l $APP_PORT
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=$APP_NAME
Environment=NODE_ENV=production
Environment=PORT=$APP_PORT

# Limites de segurança
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=$APP_DIR

[Install]
WantedBy=multi-user.target
EOF

    echo -e "${GREEN}Serviço systemd criado: ${APP_NAME}.service${NC}"
}

#===============================================================================
# FUNÇÃO: Configurar e iniciar serviço
#===============================================================================
start_service() {
    echo -e "${YELLOW}[8/8] Iniciando serviço...${NC}"
    
    # Recarregar systemd
    systemctl daemon-reload
    
    # Habilitar serviço para iniciar com o sistema
    systemctl enable $APP_NAME
    
    # Iniciar serviço
    systemctl start $APP_NAME
    
    # Verificar status
    sleep 3
    if systemctl is-active --quiet $APP_NAME; then
        echo -e "${GREEN}✓ Serviço iniciado com sucesso!${NC}"
    else
        echo -e "${RED}✗ Erro ao iniciar serviço. Verificando logs...${NC}"
        journalctl -u $APP_NAME -n 20 --no-pager
    fi
}

#===============================================================================
# FUNÇÃO: Configurar firewall
#===============================================================================
configure_firewall() {
    echo -e "${YELLOW}Configurando firewall...${NC}"
    
    # Verificar se ufw está instalado
    if command -v ufw &> /dev/null; then
        ufw allow $APP_PORT/tcp
        echo -e "${GREEN}Porta $APP_PORT liberada no firewall${NC}"
    else
        echo -e "${YELLOW}UFW não instalado. Certifique-se de liberar a porta $APP_PORT manualmente${NC}"
    fi
}

#===============================================================================
# FUNÇÃO: Exibir informações finais
#===============================================================================
show_info() {
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  DEPLOY CONCLUÍDO COM SUCESSO!        ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "URL de acesso: ${YELLOW}http://192.168.0.45:$APP_PORT${NC}"
    echo ""
    echo -e "Comandos úteis:"
    echo -e "  ${YELLOW}systemctl status $APP_NAME${NC}    - Ver status"
    echo -e "  ${YELLOW}systemctl restart $APP_NAME${NC}   - Reiniciar"
    echo -e "  ${YELLOW}systemctl stop $APP_NAME${NC}      - Parar"
    echo -e "  ${YELLOW}journalctl -u $APP_NAME -f${NC}    - Ver logs"
    echo ""
    echo -e "Diretório da aplicação: ${YELLOW}$APP_DIR${NC}"
    echo ""
}

#===============================================================================
# EXECUÇÃO PRINCIPAL
#===============================================================================
main() {
    check_root
    update_system
    install_nodejs
    install_dependencies
    create_user
    setup_app_directory
    build_project
    create_systemd_service
    start_service
    configure_firewall
    show_info
}

# Executar
main "$@"
