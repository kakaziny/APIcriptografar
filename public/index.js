document.getElementById('encrypt-btn').addEventListener('click', () => {
    const message = document.getElementById('message').value;
    
    // Envia a mensagem para criptografia
    fetch('/encrypt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'ondetewowaberese'
      },
      body: JSON.stringify({ message })
    })
      .then(response => response.json())
      .then(data => {
        // Exibe o texto criptografado no campo de resultado
        document.getElementById('result').value = data.encryptedMessage;
        // Limpa o campo de mensagem original após criptografia
        document.getElementById('message').value = '';
      })
      .catch(error => alert('Erro ao criptografar a mensagem: ' + error.message));
  });
  
  document.getElementById('decrypt-btn').addEventListener('click', () => {
    const encryptedMessage = document.getElementById('result').value;
  
    if (!encryptedMessage) {
      alert('Nenhuma mensagem criptografada para descriptografar');
      return;
    }
  
    // Envia a mensagem criptografada para descriptografia
    fetch('/decrypt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'ondetewowaberese'
      },
      body: JSON.stringify({ encryptedMessage })
    })
      .then(response => response.json())
      .then(data => {
        // Exibe a mensagem descriptografada no campo de resultado (substituindo o texto criptografado)
        document.getElementById('result').value = data.decryptedMessage;
      })
      .catch(error => alert('Erro ao descriptografar a mensagem: ' + error.message));
  });