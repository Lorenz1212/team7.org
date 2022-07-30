"use strict";

// Class Definition
var KTLogin = function() {
    var _login;

    var _showForm = function(form) {
        var cls = 'login-' + form + '-on';
        var form = 'kt_login_' + form + '_form';
        _login.removeClass('login-forgot-on');
        _login.removeClass('login-signin-on');
        _login.removeClass('login-verify-on');
        _login.addClass(cls);
        KTUtil.animateClass(KTUtil.getById(form), 'animate__animated animate__backInUp');
    }
  var _handleSignInForm = function() {
        var validation;
        validation = FormValidation.formValidation(
            KTUtil.getById('kt_login_signin_form'),
            {
                fields: {
                    email: {
                        validators: {
                            notEmpty: {
                                message: 'Email/Username is required'
                            }
                        }
                    },
                    password: {
                        validators: {
                            notEmpty: {
                                message: 'Password is required'
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    bootstrap: new FormValidation.plugins.Bootstrap()
                }
            }
        );

    $('#kt_login_signin_form').on('submit', function (e) {
            e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                    formData.append("action", btoa("sign-in"));
                    $.ajax({
                              url:  "controllers/login-controller.php",
                              type: "POST",
                              data: formData,
                              contentType: false,
                              processData: false,
                              dataType:"json",
                              beforeSend: function(){
                                  KTApp.blockPage();
                              },
                              complete: function(){
                                  KTApp.unblockPage();
                              },
                              success: function(response)
                              {    
                                  if(response.status == "success"){
                                    let res=JSON.parse(window.atob(response.payload));
                                    if(res.url){
                                          const Toast = Swal.mixin({
                                                toast: true,
                                                position: 'top-end',
                                                showConfirmButton: false,
                                                timer: 3000,
                                                timerProgressBar: true,
                                                onOpen: (toast) => {
                                                  toast.addEventListener('mouseenter', Swal.stopTimer)
                                                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                                                }
                                              })
                                              Toast.fire({
                                                icon: 'success',
                                                title: 'Signed in successfully! Please wait..'
                                              })
                                               window.location.replace("betting-portal/"+res.url);
                                     }else{
                                        Swal.fire("Oopps!", JSON.parse(window.atob(response.payload)), "info"); 
                                     }
                                  }else if(response.status == "failed"){
                                     Swal.fire("Oopps!", response.message, "info");
                                  }else if(response.status == "error"){
                                     Swal.fire("Oopps!", response.message, "info");
                                  }else{
                                     Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                     console.log(JSON.parse(window.atob(response.payload)));
                                  }
                              },
                              error: function(xhr,status,error){
                                  console.log(xhr);
                                  console.log(status);
                                  console.log(error);
                                  console.log(xhr.responseText);
                                  Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                              } 
                          })  
                } else {
                }
            });
        });
    }
    // Public Functions
    return {
        // public functions
        init: function() {
            _login = $('#kt_login');
            _handleSignInForm();
        }
    };
}();
// Class Initialization
jQuery(document).ready(function() {
    KTLogin.init();
});
