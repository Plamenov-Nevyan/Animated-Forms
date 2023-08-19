$(document).ready(function(){
initFormSlideAnims()
initBtnRippleAnim()
initTacModal()
initFloatingLabels()
initToolTips()
initAddMediaLinkBtnsAndInput()

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

    $('.media-input').each(function(){
        let field = $(this)
        let input = field.find('input')
        let label = field.find('label')
        input.change(function(){
            input.val().length > 0 ? label.addClass('static') : label.removeClass('static')
        })
    })
}

function onRegister(){
    $('.action-success').modal({
        fadeDuration: 150
    })
    $('#success-check').css({display:'block'}).toggle("bounce", {times: 3}, "slow")

    setTimeout(() => {
        $('#success-message').text('Congratulations! Your registration was successfull !')
    }, 1000)

    $('.action-success').on($.modal.BEFORE_CLOSE, () => {
        $('#success-message').text('')
    })

    $('.action-success').on($.modal.AFTER_CLOSE, () => {
        $('.forms-page').animate({
            opacity: 0,
            marginTop: '-300px'
        },
        'slow',
        'linear',
        )
        $('.accordions-page').animate({
            opacity: 1,
            marginTop: '0'
        },
        'slow',
        'linear'
        )
    })
}
function onLogin(){
    $('.action-success').modal({
        fadeDuration: 150
    })
    $('#success-check').toggle("bounce", {times: 3}, "slow")
    setTimeout(() => {
        $('#success-message').text('Login is successfull !')
    }, 1000)

    $('.success-action').on($.modal.BEFORE_CLOSE, () => {
        $('#success-message').text('')
    })
}

function initToolTips(){
    $('.media-item').each(function(){
        let tooltip = $(this).find('.tooltip')
        let iconAndInput = $(this).find('.icon-and-input')
        let iconAndAddBtn = $(iconAndInput).find('.icon-and-add-btn')
        let icon = $(iconAndAddBtn).find('.media-icon')
        $(icon).mouseenter(function(){
            $(tooltip).slideDown("fast", function(){
                // $(tooltip).css({visibility: 'visible'})
            })
        })
        $(icon).mouseleave(function(){
            $(tooltip).slideUp("fast", function(){

            })
        })
    })
}

function initAddMediaLinkBtnsAndInput(){
    $('.media-item').each(function(){
        let iconAndInput = $(this).find('.icon-and-input')
        let inputAndLabel = $(iconAndInput).find('.label-and-input')
        let iconAndAddBtn = $(iconAndInput).find('.icon-and-add-btn')
        let addBtn = $(iconAndAddBtn).find('.add-link')
        $(addBtn).mouseenter(function(){
            $(this).animate({
                deg: 180
            },
            {
                duration: 700,
                step: function(now){
                    $(this).css({transform: `rotate(` + now + `deg)`})
                }
            })
        })
    
        $(addBtn).mouseleave(function(){
            $(this).animate({
                deg: -180
            },
            {
                duration: 700,
                step: function(now){
                    $(this).css({transform: `rotate(` + now + `deg)`})
                }
            })
        })
    
        $(addBtn).click(function(){
            $('.zoomed').each(function(){
                    $(this).removeClass("zoomed")
                    $(this).addClass("outzoomed")
                    setTimeout(() => {
                        $(this).css({display: "none"})
                    }, 1000)
            })
            if($(inputAndLabel).hasClass("outzoomed")){
                $(inputAndLabel).removeClass("outzoomed")
            }
            $(inputAndLabel).addClass("zoomed").css({display: "block"})
            let closeBtn = $(inputAndLabel).find('.close-link-input').click(function(){
                $(inputAndLabel).removeClass('zoomed').addClass('outzoomed')
                setTimeout(() => {
                    $(inputAndLabel).css({display: "none"})
                }, 1000)
            })

        })
    })
}
})