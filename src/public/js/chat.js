const socket = io()
    let user
    
    Swal.fire({
        title: 'Identifícate',
        input: 'text',
        text: 'Ingresa el usuario para identificarte en el chat',
        inputValidator: value => {
            return !value && 'Necesitas escribir un nombre de usuario para continuar'
        },
        allowOutsideClick: false
    })
    .then(result => {
        user = result.value
        console.log(user)
    })

    // input del chat
    let chatBox = document.querySelector('#chatBox')
    chatBox.addEventListener('keyup', evt => {
        if(evt.key === 'Enter'){
            if(chatBox.value.trim().length > 0 ){
                socket.emit('message', { user, message: chatBox.value })
                chatBox.value = ''
            }
        }

    })

    socket.on('messageLogs', data => {
        //console.log('Mensajes del server', data)
        let log = document.getElementById('messageLog')

        let messages = ''
        data.forEach(message => {
            messages += `<li>${message.user} -  dice: ${message.message}</li><br>`
        })
        log.innerHTML = messages
    })