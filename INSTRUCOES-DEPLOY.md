# INSTRUÇÕES DE DEPLOY - VM LINUX

## Dados da VM
- **IP**: 192.168.0.45
- **Porta da aplicação**: 8577
- **URL final**: http://192.168.0.45:8577

---

## PASSO 1: Preparar os arquivos localmente

No Windows, abra o PowerShell na pasta do projeto e execute:

```powershell
# Navegar para a pasta do projeto
cd C:\Users\leonardo.fragoso\Music\PRODERJ\questionario-proderj
```

---

## PASSO 2: Copiar arquivos para a VM via WinSCP

Usando o WinSCP (conforme a imagem), copie a pasta `questionario-proderj` para:

```
/home/lfragoso/projetos/questionario-proderj
```

**Arquivos essenciais a copiar:**
- `package.json`
- `package-lock.json`
- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `index.html`
- Pasta `src/` (completa)
- Pasta `public/` (se existir)
- `deploy-vm.sh`

---

## PASSO 3: Conectar na VM via SSH

```bash
ssh lfragoso@192.168.0.45
```

---

## PASSO 4: Executar o script de deploy

```bash
# Navegar para a pasta do projeto
cd /home/lfragoso/projetos/questionario-proderj

# Dar permissão de execução ao script
chmod +x deploy-vm.sh

# Executar como root
sudo ./deploy-vm.sh
```

---

## PASSO 5: Verificar se está funcionando

```bash
# Ver status do serviço
sudo systemctl status questionario-proderj

# Ver logs em tempo real
sudo journalctl -u questionario-proderj -f

# Testar acesso local
curl http://localhost:8577
```

---

## COMANDOS ÚTEIS

### Gerenciar o serviço
```bash
# Iniciar
sudo systemctl start questionario-proderj

# Parar
sudo systemctl stop questionario-proderj

# Reiniciar
sudo systemctl restart questionario-proderj

# Ver status
sudo systemctl status questionario-proderj

# Habilitar início automático
sudo systemctl enable questionario-proderj

# Desabilitar início automático
sudo systemctl disable questionario-proderj
```

### Ver logs
```bash
# Últimas 50 linhas
sudo journalctl -u questionario-proderj -n 50

# Logs em tempo real
sudo journalctl -u questionario-proderj -f

# Logs desde o último boot
sudo journalctl -u questionario-proderj -b
```

### Atualizar a aplicação
```bash
# Parar serviço
sudo systemctl stop questionario-proderj

# Copiar novos arquivos para /opt/questionario-proderj

# Rebuild
cd /opt/questionario-proderj
sudo npm install
sudo npm run build

# Reiniciar
sudo systemctl start questionario-proderj
```

---

## TROUBLESHOOTING

### Erro: Porta já em uso
```bash
# Ver o que está usando a porta
sudo lsof -i :8577
sudo netstat -tlnp | grep 8577

# Matar processo
sudo kill -9 <PID>
```

### Erro: Permissão negada
```bash
# Ajustar permissões
sudo chown -R proderj:proderj /opt/questionario-proderj
sudo chmod -R 755 /opt/questionario-proderj
```

### Erro: Node.js não encontrado
```bash
# Reinstalar Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Erro: serve não encontrado
```bash
sudo npm install -g serve
```

---

## ESTRUTURA FINAL NA VM

```
/opt/questionario-proderj/
├── dist/                    # Build de produção
├── node_modules/            # Dependências
├── src/                     # Código fonte
├── package.json
├── vite.config.ts
└── ...

/etc/systemd/system/
└── questionario-proderj.service  # Serviço systemd
```

---

## ACESSO

Após deploy bem-sucedido, acesse:

**http://192.168.0.45:8577**
