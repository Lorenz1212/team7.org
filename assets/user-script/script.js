'use strict';
var APPHANDLER = function(){
  //apphandlerglobal
    var _init = async function(){
         _check_url(window.location.pathname);
          $(window).on("popstate", function (e) {
              e.preventDefault();
              location.reload();
          });
          Array.from($(".menu-link,.logout,.profile")).forEach(function(element){
            if(element.getAttribute('href')){
               element.addEventListener("click", function(e){
                e.preventDefault();
                $('.menu-item').removeClass('menu-item-active  menu-item-open');
                $('.'+element.getAttribute('href')).addClass('menu-item-active menu-item-open'); 
                  $(element).parent().addClass('menu-item-active menu-item-open');
                  _loadpage(element.getAttribute('href'));
                  // if($('#kt_aside').hasClass('aside-on')){
                  //   $('#kt_aside').removeClass('aside-on');
                  //   $('.aside-overlay').remove();
                  //   $('#kt_body').removeAttr('data-offcanvas-aside');
                  // }
                  // $('#kt_aside_mobile_toggle').trigger('click');
              })
            }
           });
    };

    var _getParams = async function (url){
        var params = {};
        var parser = document.createElement('a');
        parser.href = url;
        var query = parser.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    };
  
    var _check_url =  async function (url){
      let check =  await _getParams(url);
      var view_page = 'betting-portal';
      $('.menu-item').removeClass('menu-item-active menu-item-open');
      if(check.view){
      	
        view = check.view;
        alert(url)
          if(url.split('/')[2] == view_page){
            _loadpage(url.split('/')[3],view);
            $('.'+url.split('/')[3]).addClass('menu-item-active menu-item-open'); 
          }else{
            _loadpage(url.split('/')[4],view);
            $('.dashboard').addClass('menu-item-active menu-item-open'); 
          };
        }else{
          if(url.split('/')[2] == view_page){
            if(url.split('/')[3]==''){
              _loadpage('dashboard');
              $('.dashboard').addClass('menu-item-active menu-item-open'); 
            }else{
              _loadpage(url.split('/')[3]);
              $('.'+url.split('/')[3]).addClass('menu-item-active menu-item-open'); 
            }
          }else if(url.split('/')[1] == view_page){
            if(url.split('/')[2]==''){
              _loadpage('dashboard');
              $('.dashboard').addClass('menu-item-active menu-item-open'); 
            }else{
              _loadpage(url.split('/')[2]);
              $('.'+url.split('/')[2]).addClass('menu-item-active menu-item-open'); 
            }
          }else{
            _loadpage('dashboard');
            $('.dashboard').addClass('menu-item-active menu-item-open'); 
          }
        }
    };
    var _showToast = function(type,message) {
        const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: type,title: message});
    }
    var _showSwal  = function(type,message,title) {
      if(!title){
        swal.fire({
          text: message,
          icon: type,
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn font-weight-bold btn-light-primary"
          }
          })
      }else{
        swal.fire({
          title: title,
          text: message,
          icon: type,
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn font-weight-bold btn-light-primary"
          }
          })
      }
      
    }
    var _showSwalHtml = function(type,message,title){
    	if(!title){
    		title=type;
    	}
    	swal.fire({
           title: title,
			html: message,
			icon: type,
			buttonsStyling: false,
			confirmButtonText: "Ok, got it!",
			customClass: {
		   		confirmButton: "btn font-weight-bold btn-light-primary"
			}
		})
    }
    var _ShowHidePassword = function(id){
      $("#"+id+" span").on('click', function(e) {
        e.preventDefault();
        if($('#'+id+' input').attr("type") == "text"){
            $('#'+id+' input').attr('type', 'password');
            $('#'+id+' i').addClass( "fa-eye-slash" );
            $('#'+id+' i').removeClass( "fa-eye" );
        }else if($('#'+id+' input').attr("type") == "password"){
            $('#'+id+' input').attr('type', 'text');
            $('#'+id+' i').removeClass( "fa-eye-slash" );
            $('#'+id+' i').addClass( "fa-eye" );
        }
      });
    }
    var _loadpage =  function(page){
            page.split('=')[1];
            let mainpage=page.split('=')[0];
                  $.ajax({
                    url: "../controllers/controller.php",
                    type: "POST",
                    data: {
                            page : page
                    },
                    dataType: "html",
                    beforeSend: function(){
                      window.history.pushState(null, null, page);
                      KTApp.blockPage({
                      overlayColor: '#000000',
                      state: 'primary',
                      message: 'Loading...'
                     });
                      $('.offcanvas-close, .offcanvas-overlay').trigger('click');
                    },
                    complete: function(){
                      $("#kt_content").fadeIn(3000);
                      $("html, body").animate({ scrollTop: 0 }, "slow");
                      $("head > title").empty().append("Team 7 | "+mainpage.split('-')[0].charAt(0).toUpperCase()+mainpage.split('-')[0].slice(1));
                       KTApp.unblockPage();
                    },
                    success: async function(response){
                        if(response){ 
                          if(response.trim()=="signed-out"){
                             $("#kt_content").empty();
                             $("#kt_content").promise().done(function(){_initview(page.split('/')[0]);});
                          }else{
                            $("#kt_content").empty();
                            $("#kt_content").append(response).promise().done(function(){_initview(page.split('=')[0]);});
                          }
                        }else{

                        }
                    },
                    error: function(xhr,status,error){
                      if(xhr.status == 200){
                        Swal.fire("Ops!", "Check your internet connection.", "error");
                      }else if(xhr.status == 500){
                        Swal.fire("Ops!", 'Internal error: ' + xhr.responseText, "error");
                      }else if(status=="error"){
                        Swal.fire("Ops!", 'Internal error: ' + xhr.responseText, "error");
                      }else{
                        console.log(xhr);
                        console.log(status);
                        Swal.fire("Ops!", 'Something went wrong..', "error");
                      }
                    }  
            });  
    };

    var _initview = async function(view,val){
          switch(String(view)){
              case 'dashboard':{
                _ajaxrequest("../controllers/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['dashboard', 'result_list']));
                _ajaxrequest("../controllers/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['dashboard', 'result_player']));
                // Para magrefresh yung table every 4 second to update the data.
                setInterval(function() {
                  _ajaxrequest("../controllers/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['dashboard', 'result_player']));
                }, 4000);
                // Para submit mo yung bet mo.
                $('.val-status').on('click',function(e){
                  e.preventDefault();
                  let val = $(this).attr('data-status');
                  $('input[name=status]').val(val);
                })
                $('.btn-submit').on('click',function(e){
                  e.preventDefault();
                  let val =  $('input[name=status]').val();
                  let amount =  $('input[name=amount]').val();
                  if(!amount || amount == 0){
                     Swal.fire("Invalid", 'Please input your bet amount', "info");
                  }else{
                    _ajaxrequest("../controllers/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['dashboard', 'submit_bet',val,amount]));
                  }
                })

                //para magcount yung timer at magshow yung pinakaresult
                var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();
                var x = setInterval(function() {
                var now = new Date().getTime();
                var distance = countDownDate - now;
                var seconds = Math.floor((distance % (995 * 30)) / 1000);
                $('.timer').text(seconds);
                  if(seconds == 0){
                     _ajaxrequest("../controllers/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['dashboard', 'submit_result']));
                  }
                 if (distance == 0) {
                    clearInterval(x);
                    $('.timer').text(seconds);
                  }
                }, 1000);
                break;
              }
            
        default:
        break;
      }
    }


    // start making formdata
    var _constructForm = function(args){
          let formData = new FormData();
          for (var i = 1; (args.length+1) > i; i++){
             formData.append('data'+ i, args[i-1]);
           }  
          return formData;
    };

    var _constructBlockUi = function(type, element, message){
          let formData = new FormData();
           formData.append('type', type);
           formData.append('element', element);
           formData.append('message', message);
           if(formData){
             return formData;
           }
    };

    var _construct = async function(response, type, element, object){
         switch(type){
              case "result_player":{
                // Laman ng Table 1. Nakaloop po yung data para lumabas lahat galing sa database.
                let container = $('#table_player > tbody');
                 container.empty();
                if(response !=false){
                   for(let i =0;i<response.player.length;i++){
                      let html1 = $('<tr><td>'+response.player[i].fullname+'</td>\
                                    <td>'+response.player[i].bet_amount+'</td>\
                                    <td>'+response.player[i].bet_status+'</td>\
                                  </tr>');
                      container.append(html1);
                    }
                }
                break;
              }
              case "result_list":{
                // Laman ng Table 2. Nakaloop po yung data para lumabas lahat galing sa database.
                let container = $('#table_result > tbody');
                container.empty();
                if(response !=false){
                    $('.wallet-balance').text(response.wallet);
                    if(response.result){
                        for(let i =0;i<response.result.length;i++){
                         var status = {
                          'WIN': {'title': 'Win', 'state': 'success'},
                          'LOSE': {'title': 'Lose', 'state': 'danger'}
                        };
                        let html = $('<tr><td>'+response.result[i].result_number+'</td>\
                                      <td>'+response.result[i].bet_amount+'</td>\
                                      <td>'+response.result[i].bet_status+'</td>\
                                      <td><div class="d-flex flex-row align-items-center"><span class="label label-' + status[response.result[i].status].state + ' label-dot mr-2"></span>' +
                                        '<span class="font-weight-bold text-' + status[response.result[i].status].state + '">' + status[response.result[i].status].title + '</span></div></td>\
                                      </tr>');
                        container.append(html);
                      }
                    }
                }
                break;
              }
               case "submit_bet":{
                  if(response == true){
                  _ajaxrequest("../controllers/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['dashboard', 'result_player']));
                  }else if(response == false){
                    Swal.fire("Ops!", 'Something went wrong..', "error");
                  }else{
                    Swal.fire("Oopps", response, "info");
                  }
                $('input[name=amount]').val("");
                break;
              }
              case "submit_result":{
                if(response != false){
                  if(response.status == 'WIN'){
                    Swal.fire("WIN", 'Congratulation Your Win!', "success");
                    $('#result-number').text(response.result_number);
                    $('#result-status').text(response.result_status);
                  }else if(response.status == 'LOSE'){
                    Swal.fire("LOSE", 'Oopps Better luck next time!', "error");
                    $('#result-number').text(response.result_number);
                    $('#result-status').text(response.result_status);
                  }
                }else if(response == 'none'){
                  // no response
                }else{
                  Swal.fire("Ops!", 'Something went wrong..', "error");
                }
                _ajaxrequest("../controllers/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['dashboard', 'result_player']));
                 _ajaxrequest("../controllers/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['dashboard', 'result_list']));
                break;
              }
              default:
              // code block
              break;
          }

    };
    var _ajaxrequest = async function(thisurl, ajaxtype, blockUi, formData){
      return new Promise((resolve, reject) => {
             let y = true;
             $.ajax({
              url: thisurl,
              type: ajaxtype,
              data: formData,
              contentType: false,
              processData: false,
              dataType: "json",
              beforeSend: function(){
                if(blockUi.get("type") == "blockPage"){
                   if(blockUi.get("message") != "false"){
                      KTApp.blockPage({
                      overlayColor: '#000000',
                      state: 'primary',
                      message: blockUi.get("message")
                     });
                   }else{
                      KTApp.blockPage();
                   }
                }else if(blockUi.get("type") == "blockContent"){
                      KTApp.block(blockUi.get("element"));
                }else{
                }
              },
              complete: function(){
                if(blockUi.get("type") == "blockPage"){
                  KTApp.unblockPage();
                }else if(blockUi.get("type") == "blockContent"){
                  KTApp.unblock(blockUi.get("element"));
                }else{
                }
                 resolve(y)
              },
              success: function(res){
                // alert(JSON.stringify(res.payload));
                 if(res.status == 'success'){
                    if(window.atob(res.payload) != false){
                      _construct(JSON.parse(window.atob(res.payload)), formData.get("data2"));
                    }else{
                      _construct(res.message, formData.get("data2"));
                    }
                 }else if(res.status == 'not_found'){
                    Swal.fire("Ops!", res.message, "info");
                 }else{
                    Swal.fire("Ops!", res.message, "info");
                 } 
              },
              error: function(xhr,status,error){
                console.log(xhr)
                if(xhr.status == 200){
                    Swal.fire("Ops!", "Check your internet connection.", "error");
                }else if(xhr.status == 500){
                  Swal.fire("Ops!", 'Internal error: ' + xhr.responseText, "error");
                }else{
                  console.log(xhr);
                  console.log(status);
                  Swal.fire("Ops!", 'Something went wrong..', "error");
                }
              }       
        });      
       })
    };
 
  return {
    init: function(){
        _init();
    }
  };
}();
$(document).ready(function(){
   	APPHANDLER.init();
});