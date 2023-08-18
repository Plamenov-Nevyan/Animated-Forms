$(document).ready(function(){
initFormSlideAnims()
initBtnRippleAnim()

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
        color: "#FFFF00",
        detectBrightness: true
    })
    $('#register-btn').rippleria({
        duration: 750,
        easing: 'linear',
        color: "#49920F",
        detectBrightness: true
    })
}
})