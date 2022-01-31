import Swal from 'sweetalert2'

module.exports = function authPortal(PASSWORD_PORTAL, action){
    Swal.fire({
        title: 'Insira a senha',
        input: 'password',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonColor: 'black',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: (password) => {
            if(password == PASSWORD_PORTAL){
                return true
            } else {
                return Swal.showValidationMessage(
                    `Senha incorreta!`
                  )
            }
        },
      }).then((result) => {
        if (result.isConfirmed) { 
          action()
        }
      })
 }
 