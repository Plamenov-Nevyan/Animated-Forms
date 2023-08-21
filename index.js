$(document).ready(function(){
initFormSlideAnims()
initBtnRippleAnim()
initTacModal()
initFloatingLabels()
initToolTips()
initAddMediaLinkBtnsAndInput()
clearErrorOnFocus()
onOpenAccordion()

$('#register-btn').click(onRegister)
$('#login-btn').click(onLogin)
$('#logout-btn').click(onLogout)



function initFormSlideAnims(){
    // Initiate animations for forms when switching between register and login, uses opacity and margin properties to create fade-in
    // sliding effect and also clear error messages  
    $('#redirect-register').click(function(){
        clearAllErrors()
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
        clearAllErrors()
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
    // Using rippleria library, here we initiate button ripple effect on click 
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
    $('#logout-btn').rippleria({
        duration: 750,
        easing: 'linear',
        color: "#ffeb3b",
        detectBrightness: true
    })
}
function initTacModal(){
    // using the JQuery Modal plugin, here we show the Terms and Conditions section by clicking the span in, the register form
    $('.open-dialog-span').click(function(){
        $('.tac-section').modal({
            fadeDuration: 150
        })
    })
}
function initFloatingLabels(){
    // By using the transform: scaleY rule for class static in the css, here we assign the class to a label after we check if it's
    // corresponding input have text in it or not using the change event
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
  let errors = validator({                // Validate and check for errors by passing the form input values
    username: $('#username').val(),
    email: $('#email').val(),
    phone: $('#phone').val(),
    password: $('#password').val()
  }, 'register')
  if(Object.values(errors).some(error => error !== '')){
    Object.entries(errors).forEach(([key, value]) => {
       if(value !== ''){                                                    // If there are errors get the key (input name) and value (error message)
        $(`#${key}`).addClass('error').effect("shake", {times: 4}, 700)    // attach class error to give the input red borders and then add
        $(`#${key}-error`).text(value).slideDown("fast")                  // shake animation while giving the error span, the value as text 
       }
    })
  }else {
    $('.action-success').modal({          // On success show the JQuery Modal plugin with fade animation
        fadeDuration: 150
    })
    $('#success-check').css({display:'block'}).toggle("bounce", {times: 3}, "slow") // show success check mark

    setTimeout(() => {
        $('#success-message').text('Congratulations! Your registration was successfull !') //after check mark is done, attache the message too
    }, 1000)

    $('.action-success').on($.modal.BEFORE_CLOSE, () => {
        $('#success-message').text('')   // before the modal is close, clear the success message so it can be used if the user 
    })                                  // logouts later and then enter again

    $('.action-success').on($.modal.AFTER_CLOSE, () => {
        $('.forms-page').animate({           // Just like forms here we use opacity and margin to create and slide up/fade in  effect
            opacity: 0,                      // between the forms and accordions pages                   
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
        .css({
            'z-index': 1
        })
    })
    onAccordionsPageInit()
  }
}
function onLogin(){
    let errors = validator({
    'username-login': $('#username-login').val(),
    'password-login': $('#password-login').val()
    }, 'login')
    if(Object.values(errors).some(error => error !== '')){
        Object.entries(errors).forEach(([key, value]) => {
            if(value !== ''){
        $(`#${key}`).addClass('error').effect("shake", {times: 4}, 700)
        $(`#${key}-error`).text(value).slideDown("fast")
       }
    })
 }else {
    $('.action-success').css({display: 'block'}).modal({
        fadeDuration: 150
    })
    $('#success-check').effect('bounce', {times: 3}, 500)
    setTimeout(() => {
        $('#success-message').text('Login is successfull !')
    }, 1000)

    $('.success-action').on($.modal.BEFORE_CLOSE, () => {
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
        .css({
            'z-index': 1
        })
    })

    onAccordionsPageInit()
 }
}
function initToolTips(){
    // find the tooltips for every media icon and attach mouse-enter and mouse-leave events to them allowing them to slide-in/out when the
    // user hovers over the icons
    $('.media-item').each(function(){
        let tooltip = $(this).find('.tooltip')
        let iconAndInput = $(this).find('.icon-and-input')
        let iconAndAddBtn = $(iconAndInput).find('.icon-and-add-btn')
        let icon = $(iconAndAddBtn).find('.media-icon')
        $(icon).mouseenter(function(){
            $(tooltip).slideDown("fast", function(){
            })
        })
        $(icon).mouseleave(function(){
            $(tooltip).slideUp("fast", function(){

            })
        })
    })
}
function initAddMediaLinkBtnsAndInput(){
    // to every add button next to media icon attach mouse enter, mouse leave and click events
    $('.media-item').each(function(){
        let iconAndInput = $(this).find('.icon-and-input')
        let inputAndLabel = $(iconAndInput).find('.label-and-input')
        let iconAndAddBtn = $(iconAndInput).find('.icon-and-add-btn')
        let addBtn = $(iconAndAddBtn).find('.add-link')
        $(addBtn).mouseenter(function(){
            $(this).animate({               // rotate clockwise when mouse is over the button
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
            $(this).animate({     // rotate counter-clockwise when mouse leaves the the button
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
            $('.zoomed').each(function(){       // Remove zoomed class for every social media input and label container that has it 
                    $(this).removeClass("zoomed") // and add outzoomed class to create an effect of sliding up and closing them 
                    $(this).addClass("outzoomed")
                    setTimeout(() => {
                        $(this).css({display: "none"})
                    }, 1000)
            })
            if($(inputAndLabel).hasClass("outzoomed")){
                $(inputAndLabel).removeClass("outzoomed")        //for the label and input children of whichever media container we clicked on
            }                                                     // add class zoomed that allows it to slide down and show it's content
            $(inputAndLabel).addClass("zoomed").css({display: "block"})
            let closeBtn = $(inputAndLabel).find('.close-link-input').click(function(){    // clicking the close button adds class outzoomed
                $(inputAndLabel).removeClass('zoomed').addClass('outzoomed')               // that hides this specific input and label container
                setTimeout(() => {
                    $(inputAndLabel).css({display: "none"})
                }, 1000)
            })

        })
    })
}

function validator(inputValues, action){
    // Validator function, checks if there are empty fields and for unlawful chars in email or if password has atleast 1 letter and num in it 
    let errors = {}
    let isThereEmptyFields = checkForEmptyFields(action) // 
    if(isThereEmptyFields){return errors}
    let emailValRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let passwordValRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(action === 'register'){
        errors.username = inputValues.username.length > 4 ? '' : 'Username must be at least 4 characters long!'
        errors.email = emailValRegex.test(inputValues.email) ? '' : 'Please enter a valid email !'
        errors.password = inputValues.password.length > 6 && passwordValRegex.test(inputValues.password) 
        ? '' 
        : 'Password must be at least 6 characters long and contain at least one letter and one number !'
    }else if (action === 'login'){
        errors["username-login"] = inputValues["username-login"].length > 4 ? '' : 'Username must be at least 4 characters long!'
        errors["password-login"] = inputValues["password-login"].length > 6 && passwordValRegex.test(inputValues["password-login"]) 
        ? '' 
        : 'Password must be at least 6 characters long and contain at least one letter and one number !'
    }

    return errors

    function checkForEmptyFields(action){
        let isThereEmptyFields = false;
        Object.entries(inputValues).forEach(([key, value]) => {
            if(value === ''){
                action === 'register' 
                ? errors[key] = `Please fill the required ${key} field !` 
                : errors[key] = `Please fill the required ${key.split('-')[0]} field !` 
                isThereEmptyFields = true
            }
        })
        return isThereEmptyFields
    }
} 

function clearErrorOnFocus(){
    // removes error class when focusing on input and sets the error message span text as empty string while sliding it up
    $('.user-data-input').each(function(){
        $(this).focus(function(){
            if($(this).hasClass('error')){
                $(this).removeClass('error')
                $(`#${$(this).attr('id')}-error`).slideUp('slow')
            }
        })
    })
}

function clearAllErrors(){
    //Meant to clear all errors when user switches between register and login forms
    $('.user-data-input').each(function(){
        if($(this).hasClass('error')){
            $(this).removeClass('error')
            $(`#${$(this).attr('id')}-error`).slideUp('slow')
        }
    })
}

function onOpenAccordion(){
    $('.accordion').each(function(){
        let header = $(this).find($('.accordion-header'))
        let body = $(this).find($('.accordion-body'))
        $(header).click(function(){
            if(!$(body).hasClass('open')){
                $('.accordion-body').each(function(){
                    if($(this).hasClass('open')){
                        $(this).slideUp("fast").removeClass('open')

                    }                                                //When user opens an accordion we check if any accordion body have 
                })                                                  //class open, If it does, we remove it and slide it up hiding the text
                $(body).slideDown("fast").addClass('open')          // the selected accordion gets its body set with class open and 
                let arrowSvg = $(header).find('.arrow-down')        // it slides down where we start the typing animation of it's text content  
                $(arrowSvg).remove()
                $(header).prepend(
                    `<svg class="arrow-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>`
                )
                accordeonTextAnim(
                    body, 
                   ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ex veniam non necessitatibus nam atque voluptatibus tempore commodi illo impedit odit aperiam, autem quisquam laudantium eligendi asperiores repudiandae consequuntur. Consequatur?
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni cum tenetur vitae voluptate obcaecati illum perferendis omnis. Totam molestiae quaerat facere, veniam, eius qui natus, nisi nesciunt a neque et!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum architecto repellat totam eveniet ipsa ex non quam veritatis ipsum dolor molestiae quibusdam, minima blanditiis dolorem optio numquam atque suscipit! Repellendus?
                    `,
                    0,
                    100
                    )
            }else {
                $(body).slideUp("fast").removeClass('open')   // if the selected accordion's body have class open, we remove it and hide its
                let arrowSvg = $(header).find('.arrow-up')    // content while setting the text to empty string, so the typing animation
                $(arrowSvg).remove()                          // can begin from the text start when accordion is open again later
                $(header).prepend(
                    `<svg class="arrow-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`
                )
                let paragraph = $(body).find('p')
                $(paragraph).text('')
            }
        })
    })
}

function accordeonTextAnim(accordeonBody, accordeonText, index, interval){
    let paragraph = $(accordeonBody).find('p')
    if(!$(accordeonBody).hasClass('open')){   // if we close the accordeon and remove class body per the function above this one, the text
        paragraph.text('')                    // is set to empty string and the function returns, effectively canceling the recursion and
        return                                // typing animation
    }
    if(index < accordeonText.length){
        $(paragraph).text(`${$(paragraph).text()}${accordeonText[index]}`)    // using recursion we loop through the passed accordeonText 
        setTimeout(() => {                                                    // letter by letter and we set the accordeonBody text with       
            accordeonTextAnim(accordeonBody, accordeonText, index + 1, interval) // what already is shown + the next letter after 100ms interval
        }, interval)                                                             
    }
}

function onLogout(){
    // on logout we create fade-in/ slide effect (using margin and opacity) hiding accordions page and showing the forms page
    $('.forms-page').animate({
        opacity: 1,
        marginTop: '0'
    },
    'slow',
    'linear',
    )
    $('.accordions-page').animate({
        opacity: 0,
        marginTop: '0'
    },
    'slow',
    'linear'
    )
    .css({
        'z-index': -1
    })
}

function onAccordionsPageInit(){
    // This function is meant to be called only when we transition from forms to accordions page
    $('.accordion').each(function(){
        let body = $(this).find('.accordion-body')       // Find any accordion that has it's body left with class open (after logout)
        let header = $(this).find('.accordion-header')  // and remove the class , closing it
        if($(body).hasClass('open')){
            let arrowSvg = $(header).find('.arrow-up')
            $(arrowSvg).remove()
            $(header).prepend(
                `<svg class="arrow-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`
                )
            $(body).removeClass('open').css({display: 'none'})
        }
    })
    
    let firstAccordion =  $('.accordions-wrapper .accordion:first-child')
    let firstAccBody = $(firstAccordion).find('.accordion-body')
    let firstAccHeader = $(firstAccordion).find('.accordion-header')   // Find the first accordion and set it's body class to open showing
    let firstAccArrowSvg = $(firstAccHeader).find('.arrow-down')       // it's content and starting the type animation for it's text
    $(firstAccArrowSvg).remove()
    firstAccHeader.prepend(
        `<svg class="arrow-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>`
    )
    $(firstAccBody).addClass('open').css({display: 'block'})
    accordeonTextAnim(
        firstAccBody, 
       ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ex veniam non necessitatibus nam atque voluptatibus tempore commodi illo impedit odit aperiam, autem quisquam laudantium eligendi asperiores repudiandae consequuntur. Consequatur?
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni cum tenetur vitae voluptate obcaecati illum perferendis omnis. Totam molestiae quaerat facere, veniam, eius qui natus, nisi nesciunt a neque et!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum architecto repellat totam eveniet ipsa ex non quam veritatis ipsum dolor molestiae quibusdam, minima blanditiis dolorem optio numquam atque suscipit! Repellendus?
        `,
        0,
        100
        )
} 
})