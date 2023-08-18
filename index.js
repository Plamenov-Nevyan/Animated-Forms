$(document).ready(function(){
initFormSlideAnims()
initBtnRippleAnim()
initTacModal()
initFloatingLabels()

$('#register-btn').click(onRegister)
$('#login-btn').click(onLogin)

function initFormSlideAnims(){
    $('#redirect-register').click(function(){
        $('.login-form').animate({
            opacity: 0,
            marginLeft: '-300px'
        },
        'slow',
        'linear',
        )
        $('.register-form').animate({
            opacity: 1,
            marginLeft: '-450px'
        },
        'slow',
        'linear'
        )
    })
 
    $('#redirect-login').click(function(){
        $('.register-form').animate({
            opacity: 0,
            marginLeft: '400px'
        },
        'slow',
        'linear'
        )

        $('.login-form').animate({
            opacity: 1,
            marginLeft: '0'
        },
        'slow',
        'linear'
        )
    })
}
function initBtnRippleAnim(){
    $('#login-btn').rippleria({
        duration: 750,
        easing: 'linear',
        color: "rgba(252,176,70,1)",
        detectBrightness: true
    })
    $('#register-btn').rippleria({
        duration: 750,
        easing: 'linear',
        color: "rgba(252,70,199,0.9276960784313726)",
        detectBrightness: true
    })
}
function initTacModal(){
    $('.open-dialog-span').click(function(){
        $('.tac-section').modal({
            fadeDuration: 150
        })
    })
}
function initFloatingLabels(){
    $('.input-field').each(function(){
        let field = $(this)
        let input = field.find('input')
        let label = field.find('label')
        input.change(function(){
            input.val().length > 0 ? label.addClass('static') : label.removeClass('static')
        })
    })
}

function onRegister(){
    $('#success-message').text('Congratulations! Your registration was successfull !')
    $('.action-success').modal({
        fadeDuration: 150
    })
    $('#success-check').toggle("bounce", {times: 3}, "slow")
}
function onLogin(){
    $('.action-success').modal({
        fadeDuration: 150
    })
    $('#success-check').toggle("bounce", {times: 3}, "slow")
    setTimeout(() => {
        $('#success-message').text('Login is successfull !')
    }, 1000)

    $('.close-modal').click(function(){
        $('#success-message').text('')
    })
}
})