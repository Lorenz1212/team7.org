
$.getScript("assets/js/pages/draggable.js");
'use strict';
var APPHANDLER = function(){
  //apphandlerglobal
var new_txnid='';
var username1,username2,username3,username4,username5,username6,username7;
var d = new Date();
var genealogy=[];
var uniqueChars = [];
var option='MONTH';
var level=1;
var subpage="";
  //apphandlerglobal 

//PACKAGE
// var package_cart=[];
var package_selected;
var code_selected;
// var address_used="HOME";
var address_status;
//--
// var package_item_cart=[];

// CREATE ORDER
var cart_id;
var invalidQuantity = ["-","+","e","."];
var wallet_balance=0;
var total_order=0;
var max_wallet=300;
// var payment_method="pay-with-debit-credit-card";
// var payment_method="pay-with-fund-transfer";
// var payment_method="pay-with-gcash";
var payment_method="pay-with-dragonpay";
var prev_mop="";
var product_display=8;

// reseller tools
var reseller_tool;
var reseller_limit=0;
var reseller_result=0;
var reseller_tag;

// ACCOUNTS
var owner;
//TRACK ORDER
var view_cart_details;

//ENCASHMENT
var transfer_to_username='';
var transfer_comm_amount=0;

    var _init = async function(){
         _check_url(window.location.pathname);
          // _check_url(window.location.href);

          $(window).on("popstate", function (e) {
              e.preventDefault();
              location.reload();
          });
           _ajaxrequest("controller/controller.php", "POST", _constructBlockUi(false, false, false), _constructForm(['training_tools','fetch_training_list']));
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi(false, false, false), _constructForm(['user_main', 'is_main']));
          Array.from($(".menu-link,#kt_header > div.header-top > div > div.topbar > div > a,.profile,.agreement")).forEach(function(element){

            if(element.getAttribute('href')){
               element.addEventListener("click", function(e){
                e.preventDefault();
                $('.menu-item').removeClass('menu-item-active');
                $('.'+element.getAttribute('href')+'').addClass('menu-item-active'); 
                
                _loadpage(element.getAttribute('href'));
                // alert(element.getAttribute('href'));
                // $('#kt_body').removeAttr('data-offcanvas-header-menu-wrapper');
                // $(element).parent().addClass('menu-item-active');
                // $('#kt_header_mobile_toggle').trigger('click');
                // if($('#kt_header_menu_wrapper').hasClass('header-menu-wrapper-on')){
                //   $('#kt_header_menu_wrapper').removeClass('header-menu-wrapper-on');
                //   $('.header-menu-wrapper-overlay').remove();
                //   $('#kt_body').removeAttr('data-offcanvas-header-menu-wrapper');
                // }
              })
            }
           });
          $('body').delegate('.some-link','click', function(e){
            e.preventDefault();
            _loadpage($(this).attr('href'));
          })
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
      let check =  await _getParams(window.location.href);
          if(url.split('/')[1] == 'npic-coop.ph'){
            if(url.split('/')[4]=='agreement'){
              _loadpage("dashboard");
              $('.dashboard"]').addClass('menu-item-active');
            }else{
              _loadpage(url.split('/')[4],check.view);
              $('.'+url.split('/')[4]+'').addClass('menu-item-active');
            }
          }else{
            if(url.split('/')[2]=='app'){
              if(url.split('/')[3]=='agreement'){
                _loadpage("dashboard");
                $('.dashboard').addClass('menu-item-active');
              }else{
                _loadpage(url.split('/')[3],check.view);
                $('.'+url.split('/')[3]+'').addClass('menu-item-active');
              }
            }else{
              _loadpage("dashboard");
              $('.dashboard').addClass('menu-item-active');
            }
          };
    };
    var _removeData  = function(arr, val) {
      var i;
      while ((i = arr.indexOf(val)) != -1) {
        arr.splice(i, 1);
      }
    }
    var _showToast = function(type,message) {
        const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: type,title: message});
    }
    var _showToastFast = function(type,message) {
        const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 1000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: type,title: message});
    }
    var _showSwal  = function(type,message) {
        swal.fire({
          text: message,
          icon: type,
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn font-weight-bold btn-light-primary"
          }
          })
    }

    var _getlastpath = function (url){
          let lastpath = url.split('/').pop();
          if(lastpath == 'shop'){
            return false;
          }else if(lastpath == null || lastpath == ''){
            return false;
          }else{
            return lastpath;
          }
    };

      var _modal_image = function(image){
      $("body").delegate( ""+image+"", "click", function(){
                    let modal = document.getElementById('TopupModal');
                    let img = document.getElementsByTagName('img');
                    let modalImg = document.getElementById("img01");
                    
                        modal.style.display = "block";
                        
                        if(this.src){
                          modalImg.src = this.src;
                        }else{
                          modalImg.src = $(this).css('background-image').replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'');;
                        }
                        $("#caption").empty().append($(this).attr('alt'));
                  })
                  $("body").delegate( ".close,#TopupModal","click", function() {
                    let modal = document.getElementById('TopupModal');
                    modal.style.display = "none";
                  });
    }
    // var _modal_description = function(id_modal){
    //      $("body").delegate( ""+id_modal+"", "click", function(){
    //          let r_description = $(this).attr('data-description');
    //          $('.title-header-description').text(r_description);
    //       });     
    // }
    var moneyFormat=function(val) {
      return '₱'+parseFloat(val).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    var numberFormat=function(val) {
      return parseFloat(val).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    var  animateValueDecimal=function(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          obj.innerHTML = parseFloat(progress * (end - start) + start).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }
    var  animateValueInteger=function(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          obj.innerHTML = parseFloat(progress * (end - start) + start).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }
    var _initPINcode=function(btn,btn_text,type,duration,val){
      $('#pin_code_modal').modal('show');
      $('#pincode-input7').pincodeInput({hidedigits:false,inputs:6});
      $('#resendPin, '+btn+'').prop('disabled', true);
      $(''+btn+'').off('submit');
      let countDownDate = new Date(Date.now() + duration).getTime();
      let x = setInterval(function() {
        let now = new Date().getTime();
        let distance = countDownDate - now;
        let seconds = Math.floor((distance % (1000 * 300)) / 1000);
        $('#resendPin').text('Resend Verification code? ('+seconds+')');
        $(''+btn+'').text(''+btn_text+' ('+seconds+')');
        if (distance < 0) {
          clearInterval(x);
          $('#resendPin').text('Resend Verification code?');
          $(''+btn+'').text(btn_text);
          $('#resendPin, '+btn+'').prop('disabled', false);
        }
      }, 1000);
      $('#pin_code_modal').on('hidden.bs.modal',function(){
        $(this).find('input').val('');
      });
      $("#resendPin").on('click',function(e){
         e.preventDefault();
         $(''+btn+'').click();
      });
      $('#verify').on("click", function(e){
        e.preventDefault();
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Verifying...'), _constructForm(['user_verify', 'verify_code_'+type,val,$('#pincode-input7').val()]));
      })
    }

    var _initAddr=function(){
      $('select[name="addr_region"]').on('change', function(e){
        e.preventDefault();
        $('select[name="addr_province"]').empty().append('<option value="">Select Province</option>');
        $('select[name="addr_city"]').empty().append('<option value="">Select Province first</option>');
        $('select[name="addr_barangay"]').empty().append('<option value="">Select City first</option>');
        if(this.value!=""){
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Processing...'), _constructForm(['user_address','fetch_province',this.value]));
        }
      })
      $('select[name="addr_province"]').on('change', function(e){
        e.preventDefault();
        $('select[name="addr_city"]').empty().append('<option value="">Select City</option>');
        $('select[name="addr_barangay"]').empty().append('<option value="">Select City first</option>');
        if(this.value!=""){
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Processing...'), _constructForm(['user_address','fetch_city',this.value]));
        }
      })
      $('select[name="addr_city"]').on('change', function(e){
        e.preventDefault();
        $('select[name="addr_barangay"]').empty().append('<option value="">Select Barangay</option>');
        if(this.value!=""){
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Processing...'), _constructForm(['user_address','fetch_barangay',this.value]));
        }
      })
    }
    var _initUserAddress=function (region,province,city,brgy) {
      if(region){
        for(let i=0; i<region.length; i++){
          $('select[name="addr_region"]').append('<option value="'+region[i].code+'">'+region[i].location+'</option>');
        }
      }
      if(province){
         for(let i=0; i<province.length; i++){
          $('select[name="addr_province"]').append('<option value="'+province[i].code+'">'+province[i].location+'</option>');
        }
      }
      if(city){
         for(let i=0; i<city.length; i++){
          $('select[name="addr_city"]').append('<option value="'+city[i].code+'">'+city[i].location+'</option>');
        }
      }
      if(brgy){
         for(let i=0; i<brgy.length; i++){
          $('select[name="addr_barangay"]').append('<option value="'+brgy[i].code+'">'+brgy[i].location+'</option>');
        }
      }
    }
    var _initGenealogy=function (){
      $('body').delegate('.image1','click', function(e){
          e.stopImmediatePropagation();
          if(username1!=''){
            _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_genealogy', 'fetch_genealogy',username1]));
          }
      })
      $('body').delegate('.image2','click', function(e){
          e.stopImmediatePropagation();
          if(username2!=''){
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_genealogy', 'fetch_genealogy',username2]));
        }
      })
      $('body').delegate('.image3','click', function(e){
          e.stopImmediatePropagation();
          if(username3!=''){
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_genealogy', 'fetch_genealogy',username3]));
        }
      })
      $('body').delegate('.image4','click', function(e){
          e.stopImmediatePropagation();
          if(username4!=''){
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_genealogy', 'fetch_genealogy',username4]));
        }
      })
      $('body').delegate('.image5','click', function(e){
          e.stopImmediatePropagation();
          if(username5!=''){
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_genealogy', 'fetch_genealogy',username5]));
        }
      })
      $('body').delegate('.image6','click', function(e){
          e.stopImmediatePropagation();
          if(username6!=''){
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_genealogy', 'fetch_genealogy',username6]));
        }
      })
      $('body').delegate('.image7','click', function(e){
          e.stopImmediatePropagation();
          if(username7!=''){
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_genealogy', 'fetch_genealogy',username7]));
        }
      })
    }
    var _sessionStorage = function (session,val) {
      // Check browser support
      if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem(session, val);
      } else {
        console.log("Sorry, your browser does not support Web Storage...");
      }
    }
    var _getItem = function (session){
      return sessionStorage.getItem(session);
    }
    var _isotope = function (total_page,item){
      var $items = $(".grid > div");
      var $grid = $(".grid");
      if(item){
        $items = $(".grid-item"+item+"");
      }
      var page_count = 0;
      $(".grid").isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        resizable: true,
        filter: filtre(0),
      });
      function filtre(page) {
        var ell = [];
        for(let i = page * product_display; i < (page+1) * product_display; i++){
          ell.push($items[i]);
        }
        $grid.isotope({
        filter: ell
        })
        return ell;
      }

      $('#product-pagination').empty();
      for(let i=0; i<=total_page; i++){
        let $html = $('<a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1">'+(i+1)+'</a>');
        $('#product-pagination').append($html).promise().done(function(){
          $('#product-pagination > a:nth-child('+(i+1)+')').off().on("click",function (e){
            e.preventDefault();
            $('#product-pagination > a').removeClass('active');
            $('#product-pagination > a:nth-child('+(i+1)+'').addClass('active');
            if(i <= total_page){
              filtre(i);
              page_count=i;
            }
          })
        })
      }
      $('#product-pagination > a:nth-child(1)').addClass('active');


//DEFAULT BUTTONS
      $("#forward-pagination").off().on("click",function (){
        if(page_count < total_page){
          $('#product-pagination > a').removeClass('active');
          page_count +=1;
          $('#product-pagination > a:nth-child('+(page_count+1)+'').addClass('active');
          filtre(page_count);
        }
      })
      $("#back-pagination").off().on("click",function (){
        if(page_count > 0){
          $('#product-pagination > a').removeClass('active');
          page_count -=1;
          $('#product-pagination > a:nth-child('+(page_count+1)+'').addClass('active');
          filtre(page_count);
        }
      })
      $("#last-pagination").off().on("click",function (){
        if(page_count < total_page){
          $('#product-pagination > a').removeClass('active');
          page_count=total_page;
          $('#product-pagination > a:nth-child('+(page_count+1)+'').addClass('active');
          filtre(page_count);
        }
      })
      $("#first-pagination").off().on("click",function (){
        if(page_count > 0){
          $('#product-pagination > a').removeClass('active');
          page_count=0;
          $('#product-pagination > a:nth-child('+(page_count+1)+'').addClass('active');
          filtre(page_count);
        }
      })
    }
    var isNumeric = function (str) {
      if (typeof str != "string") return false // we only process strings!  
      return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
             !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }
    var _wallet_setup = function(){
              

    }
    // var setCookie = function(cname, cvalue, exdays) {
    //       return new Promise((resolve, reject) => {
    //         let y = true;
    //         var d = new Date();
    //         d.setTime(d.getTime() + (exdays*24*60*60*1000));
    //         var expires = "expires="+ d.toUTCString();
    //         if(window.location.pathname.split('/')[1] == 'matrix'){
    //           document.cookie = cname + "=" + cvalue + ";" + expires + ";"+"path=/"+";"+"domain=localhost";
    //         }else{
    //           document.cookie = cname + "=" + cvalue + ";" + expires + ";"+"path=/"+";"+"domain=matrix.com";
    //         }
    //           resolve(y)
    //       })
    // };

    // var getCookie = function(name){
    //  var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); return match ? match[1] : null;
    // };

    var _loadpage =  function(page,view){
                  $.ajax({
                    url: "controller/controller.php",
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
                       });
                      // KTApp.blockPage('Loading...');
                      // $('.offcanvas-close, .offcanvas-overlay').trigger('click');
                    },
                    complete: function(){
                      $("#kt_content").fadeIn(3000);
                      $("html, body").animate({ scrollTop: 0 }, "slow");
                      $("head > title").empty().append("NPIC-IFSC | "+(page.charAt(0).toUpperCase() + page.slice(1)).split('/')[0]);
                       KTApp.unblockPage();
                        $('.offcanvas-overlay,.header-menu-wrapper-overlay').click();
                    },
                    success: async function(response){

                        if(response){
                          if(response.trim()=="signed-out"){
                             $("#kt_content").empty();
                             $("#kt_content").promise().done(function(){_initview(page.split('/')[0]);});
                          }else{
                            subpage=view;
                            $("#kt_content").empty();
                            $("#kt_content").append(response).promise().done(function(){_initview(page.split('/')[0]);});
                          }
                        }else{

                        }
                    },
                    error: function(xhr,status,error){
                      if(xhr.status == 200){
                        if(xhr.responseText=="signed-out"){
                          Swal.fire({
                          title:"Oopps!",
                          text: "Your account was signed-out.",
                          icon: "info",
                          showCancelButton: false,
                          confirmButtonText: "Ok, Got it",
                              reverseButtons: true
                          }).then(function(result) {
                            window.location.replace("../login");
                          });
                        }else{
                          Swal.fire("Ops!", "Check your internet connection.", "error");
                        }
                      }else if(xhr.status == 500){
                        Swal.fire("Ops!", 'Internal error: ' + xhr.responseText, "error");
                      }else if(status=="error"){
                         Swal.fire({
                          title:"Oopps!",
                          text: "Your account was signed-out.",
                          icon: "info",
                          showCancelButton: false,
                          confirmButtonText: "Ok, Got it",
                              reverseButtons: true
                          }).then(function(result) {
                            window.location.replace("../login");
                          });
                      }else{
                        console.log(xhr);
                        console.log(status);
                        Swal.fire("Ops!", 'Something went wrong..', "error");
                      }
                    }  
            });  
    };

    var _initview = async function(view){
          // _remove_Unwanted_Elements(["body > div.zoomContainer"]);
          KTFormControls.init();
          Maxlength_profile.init();
          _modal_image('.tba_image');
          // $('.modal-dialog').draggable({
          //   handle: ".modal-header"
          // });
          $(window).off('scroll');
          switch(String(view)){
            case 'dashboard':{
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Dashboard...'), _constructForm(['user_dashboard', 'dashboard']));
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Dashboard...'), _constructForm(['user_chart_option', 'all_options','MONTH']));
              for (let p = 5; p <=7; p++) {
                KTApexChartsDemo.init('chart'+p, 'YEAR', new Date().getFullYear(), false);
                  $("a[tba_option"+p+"]").on("click", async function(){
                    option = $(this).attr('data-id');
                    if(option == "YEAR"){
                      $('#chart'+p+'_options').css('display','none');
                    }else{
                       $('#chart'+p+'_options').css('display','block');
                    }
                    if(option != '' || option != null){
                      let result = await _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Dashboard...'), _constructForm(['user_chart_option', 'chart'+p+'_options',option]));
                            if(result == true){
                              KTApexChartsDemo.init('chart'+p, option, $('#chart'+p+'_options').val(), false);
                            }else{
                              _showToast('info','Cant load sales chart!');
                         }
                        }else{
                            _showToast('info','Cant load sales chart!');
                        }
                    })
                      $('#chart'+p+'_options').on('change',function(e){
                      e.preventDefault(); 
                      KTApexChartsDemo.init('chart'+p, option, $('#chart'+p+'_options').val(), false);
                    })
                }
                 var hide_1 = $('#kt_content > div.d-flex.flex-column-fluid > div > div:nth-child(2) > div.col-xl-10.col-md-9.col-lg-12');
                 let windowsize = $(window).width();
                 if(windowsize <= 1326){
                    $('#icon-rank').removeClass('icon-3x').addClass('icon-2x');
                    $('#col-total-sales').removeClass('col-xl-6').addClass('col-xl-5');
                    $('#col-total-members').removeClass('col-xl-6').addClass('col-xl-5');
                    hide_1.css('display',"none");
                  }else{
                    $('#icon-rank').removeClass('icon-2x').addClass('icon-3x');
                    $('#col-total-sales').removeClass('col-xl-5').addClass('col-xl-6');
                    $('#col-total-members').removeClass('col-xl-5').addClass('col-xl-6');
                    hide_1.css('display',"block");
                  }
               $(window).resize(function() {
                  let windowsize = $(window).width();
                  if(windowsize <= 1326){
                     hide_1.css('display','none');
                     $('#icon-rank').removeClass('icon-3x').addClass('icon-2x');
                     $('#col-total-sales').removeClass('col-xl-6').addClass('col-xl-5');
                     $('#col-total-members').removeClass('col-xl-6').addClass('col-xl-5');
                  }else{
                    hide_1.css('display',"block");
                    $('#icon-rank').removeClass('icon-2x').addClass('icon-3x');
                    $('#col-total-sales').removeClass('col-xl-5').addClass('col-xl-6');
                    $('#col-total-members').removeClass('col-xl-5').addClass('col-xl-6');
                  }
                });
              break;
            }
            case 'docs':
            case 'landingpage':
            case 'poster':{
              reseller_tool=view;
              KTClipboardDemo.init();
              reseller_limit=0;
              reseller_result=0;
                $(window).off().on('scroll',function() {
                    if($(window).scrollTop() == $(document).height() - $(window).height()) {
                      if($('#search_bar1').val()=='' && !reseller_tag){
                        reseller_limit+=12;
                        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['user_reseller_tools', 'fetch_reseller',view,'all_options',reseller_limit,owner]));
                      }
                    }
                });
               _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['user_reseller_tools', 'fetch_reseller',view,'all_options',reseller_limit]));
               _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['user_reseller_tools', 'fetch_reseller_tags',view]));
               if(view=="landingpage"){
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Accounts...'), _constructForm(['user_accounts', 'fetch_accounts']));
               }
                $('#reseller-search').on('submit',function(e){
                  e.preventDefault();
                  $('#card_reseller_1').empty();
                    _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['user_reseller_tools', 'fetch_reseller',view,$('#search_bar1').val(),0]));
                });
                $('select[name="owner"]').on('change', function(e){
                  owner=this.value;
                  $('#card_reseller_1').empty();
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['user_reseller_tools', 'fetch_reseller',view,'all_options',reseller_limit,owner]));
                })
                $('.copy').on('click', function(e){
                      e.preventDefault();
                      var copyText = $('.read-description');
                      copyText.select();
                      navigator.clipboard.writeText(copyText.text());
                      _showToast('success','Copied!')
                  });  
               break;
            }
           case 'encashment':{
              KTDatatablesDataSourceAjaxServer.init('tbl_encashment_details');
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Encashment...'), _constructForm(['user_encashment', 'encashment']));
              $("body").delegate('.view-remarks-encashment','click',function(e){
                e.stopImmediatePropagation(); 
                let element=$(this);
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Remarks..."), _constructForm(['user_encashment', 'view_remarks',element.attr('data-id')]));
              })
              $("body").delegate('.view-invoice-encashment','click',function(e){
                e.stopImmediatePropagation(); 
                let element=$(this);
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Invoice..."), _constructForm(['user_encashment', 'view_invoice',element.attr('data-id')]));
              })
              $("body").delegate('.view-cheque-encashment','click',function(e){
                e.stopImmediatePropagation(); 
                let element=$(this);
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Please wait..."), _constructForm(['user_encashment', 'view_cheque',element.attr('data-id')]));
              })
              $("#view_wallet_details").on('click', function(e){
                e.preventDefault();
                  $('.table-init').css('visibility','hidden');
                  $('#pre-loader20').empty().append('<img src="../../images/pre-loader/loader-20.gif" alt="Loading"/>');
                    _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Wallet...'), _constructForm(['user_encashment', 'wallet_details']));
                  $('#show_wallet_modal').on('shown.bs.modal', function (e) {
                      $("#tbl_wallet_details").DataTable().columns.adjust().responsive.recalc();
                      $('#pre-loader20').empty();
                      $('.table-init').css('visibility','visible');
                  })
                
              })

              $('#view-transferred-comm').on('click', function(e){
                e.preventDefault();
                $('.table-init').css('visibility','hidden');
                  $('#pre-loader20').empty().append('<img src="../../images/pre-loader/loader-20.gif" alt="Loading"/>');
                    _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Wallet...'), _constructForm(['user_encashment', 'transferred_comm_details']));
                $('#show_transferred_comm_modal').on('shown.bs.modal', function (e) {
                    $("#tbl_transferred_comm_details").DataTable().columns.adjust().responsive.recalc();
                    $('#pre-loader20').empty();
                    $('.table-init').css('visibility','visible');
                })
              })
              
              
              
              // $('#transfer-to-wallet').on('click',function(e){
              //   e.preventDefault();
              //   let element=$(this);
              //   Swal.fire({
              //     html: "Do you want to transfer this <span class=\"text-warning font-weight-bolder\">commission</span> to <span class=\"text-primary font-weight-bolder\">wallet</span>?<br>Amount: <strong>"+element.attr('data-amount')+"</strong>",
              //     icon: "question",
              //     showCancelButton: true,
              //     buttonsStyling: false,
              //     confirmButtonText: "Yes, transfer!",
              //     cancelButtonText: "No, cancel",
              //     customClass: {
              //       confirmButton: "btn font-weight-bold btn-warning",
              //       cancelButton: "btn font-weight-bold btn-default"
              //     }
              //   }).then(function (result) {
              //     if(result.value){
              //       Swal.fire({
              //         title: 'Enter your password',
              //         input: 'password',
              //         // inputLabel: 'Password',
              //         inputPlaceholder: 'Enter your password',
              //         showCancelButton: true,
              //         cancelButtonText: "Cancel",
              //         confirmButtonText: "Proceed",
              //         inputAttributes: {
              //         // maxlength: 10,
              //         autocapitalize: 'off',
              //         autocorrect: 'off'
              //         },
              //         inputValidator: (value) => {
              //           if (!value) {
              //             return 'Please enter your password.'
              //           }
              //         }
              //       }).then(function(result) {
              //         if(result.value){
              //           _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['user_password_required','password_check','verify_transfer',result.value]));//password
              //         }
              //       });
              //     }
              //   })  
              // })
              $('#transfer-to-wallet').on('click',function(e){
                $('#transfer_comm_modal').modal('show');
              })
              //INIT CALCULATOR
              let btns = document.querySelectorAll(".num-button");
              let allBtns = document.querySelectorAll(".button");
              let resultBox = document.querySelector("#result-box");
              // let clearBtn = document.querySelector('#clear');
              let total = document.querySelector("#total");
              let btnSpread = [...btns];
              let allBtnSpread = [...allBtns];
              // For Number Inputs
              btnSpread.forEach((button, i) => {
                button.addEventListener("click", () => {
                  if (resultBox.innerHTML == "0" && btns[i].innerHTML!='.') {
                    resultBox.innerHTML = "";
                  }
                  // Inner Values for calculator
                  let value = btns[i].innerHTML;
                  let new_val=resultBox.innerHTML + value;
                  let num_val=parseFloat(new_val);
                  if(num_val>comm_balance){
                    _showToast('info','Not enough balance/invalid amount');
                  }else{
                    if(isNumeric(new_val)){
                      resultBox.innerHTML = new_val;
                    }
                  }
                });
              });
              $('#clear').on('click', function(e){
                e.preventDefault();
                resultBox.innerHTML = "0";
              })

              $('#apply-comm-submit').on('click', function(e){
                e.preventDefault();
                let new_val=resultBox.innerHTML;
                let num_val=parseFloat(new_val);
                if(num_val>comm_balance || num_val<=0){
                  _showToast('info','Not enough balance/invalid amount');
                }else{
                  if(isNumeric(new_val)){
                    Swal.fire({
                      html: "Do you want to transfer this <span class=\"text-warning font-weight-bolder\">commission</span> to <span class=\"text-primary font-weight-bolder\">wallet</span>?<br>Amount: <strong>"+moneyFormat(num_val,3)+"</strong>",
                      icon: "question",
                      showCancelButton: true,
                      buttonsStyling: false,
                      confirmButtonText: "Yes, transfer!",
                      cancelButtonText: "No, cancel",
                      customClass: {
                        confirmButton: "btn font-weight-bold btn-warning",
                        cancelButton: "btn font-weight-bold btn-default"
                      }
                    }).then(function (result) {
                      if(result.value){
                        $('#transfer_comm_modal').modal('hide');
                        Swal.fire({
                          title: 'Enter your password',
                          input: 'password',
                          // inputLabel: 'Password',
                          inputPlaceholder: 'Enter your password',
                          showCancelButton: true,
                          cancelButtonText: "Cancel",
                          confirmButtonText: "Proceed",
                          inputAttributes: {
                          // maxlength: 10,
                          autocapitalize: 'off',
                          autocorrect: 'off'
                          },
                          inputValidator: (value) => {
                            if (!value) {
                              return 'Please enter your password.'
                            }
                          }
                        }).then(function(result) {
                          if(result.value){
                            amount_transfer=num_val;
                            _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['user_password_required','password_check','verify_transfer',result.value]));//password
                          }
                        });
                      }
                    })
                  }else{
                    _showSwal('error','Invalid input');
                    $('#apply_wallet_modal').modal('hide');
                  }
                }
              })
              $('#apply_wallet_modal').on('hidden.bs.modal', function (e) {
                resultBox.innerHTML ="0";
              })
              break;
            } 

            case 'setup_kyc':{
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading KYC...'), _constructForm(['user_kyc', 'setup_kyc']));
              break;
            }
            case 'profile':{
              if(subpage){
                $('.'+subpage).click(); 
              }else{
                if(_getItem('profile')){
                  if(_getItem('profile')=="setup_kyc"){
                    $('a[name="info_tab"],#info_tab').click();
                  }else{
                    $('a[name="'+_getItem('profile')+'"]').click();
                  }
                }else{
                  $('a[name="info_tab"],#info_tab').click();
                }
              }
              Maxlength_profile.init();
              $('#kt_profile_aside > div > div > div.nav.nav-tabs > a').on('click', function(e){
                let element=$(this).attr('name');
                $('.offcanvas-mobile-overlay').click();
                _sessionStorage('profile',element);
              })
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Profile...'), _constructForm(['user_profile', 'profile']));
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Profile...'), _constructForm(['user_address', 'address']));
              $('.verify-this').on('click', function(e){
                e.preventDefault();
                let element=$(this).attr('data-verify');
                if(element=='verify_email'){
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Verifying Email...'), _constructForm(['user_verify', element,$('input[name="email"').val()]));
                }else if(element=='verify_mobile'){
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Verifying Mobile...'), _constructForm(['user_verify', element,$('input[name="mobile"').val()]));
                }
              })
              //  $('#mobile').on('input',function(e){
              //   e.preventDefault()
              //     if (($(this).val().length > 0) && ($(this).val().substr(0,3) != '+63')|| ($(this).val() == '')){
              //         $(this).val('+63');    
              //     }
              // });
              break;
            }
            case 'logout':{
              location.replace("../login/");
              break;
            }
            case 'setup_kyc':{
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading KYC...'), _constructForm(['user_kyc', 'setup_kyc']));
              break;
            }
            case 'create_order':{
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Create Order...'), _constructForm(['user_create_order', 'create_order',viewer]));
               $('body').delegate('.payment-method,#change_cod_option','click', function(e){
                e.preventDefault();
                // e.preventDefault();
                let mop='pay-with-cod';
                if($(this).attr('data-payment')){
                  mop=$(this).attr('data-payment');
                }
                if(mop!=payment_method || (!$(this).attr('data-payment') && mop=='pay-with-cod')){
                  if(mop=='pay-with-dragonpay' || mop=='pay-with-cod' || mop=='pay-with-wallet') {
                    if(mop=='pay-with-cod'){
                      Swal.fire({
                        title:"Please choose options (COD)",
                        html: "<p><b class=\"text-warning\">Apply Discount</b> - This is recommended if this order is for you.</p>\
                                <p><b class=\"text-primary\">Don't Apply Discount</b> - This is recommended if this order is for your customer.</p>",
                        icon: "question",
                        showCancelButton: true,
                        buttonsStyling: false,
                        confirmButtonText: "Apply Discount",
                        cancelButtonText: "Don't Apply Discount",
                        customClass: {
                          confirmButton: "btn font-weight-bold btn-warning btn-hover-warning",
                          cancelButton: "btn font-weight-bold btn-primary btn-hover-primary"
                        }
                      }).then(function (result) {
                        if (result.value) {
                          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, false), _constructForm(['user_create_order', 'update_mop',mop,'member']));
                        }else if(result.dismiss=='cancel'){
                          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, false), _constructForm(['user_create_order', 'update_mop',mop,'regular']));
                        }else{
                          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('pre-loader20', '.cart-empty-page', false), _constructForm(['user_create_order', 'cart_items']));
                        }
                      })
                    }else{
                    _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, false), _constructForm(['user_create_order', 'update_mop',mop,'member']));
                    }
                  }else{
                    _loadpage('create_order');
                  }
                }
                prev_mop=mop;
              })
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('pre-loader20', '.cart-empty-page', false), _constructForm(['user_create_order', 'cart_items']));
              if(viewer){
                $('input[name="customer_id"]').val(viewer);
                $('#customer_form > div.row > div.flex-row-fluid.col-md-4 > div > div.card-body').prepend('<div class="alert alert-custom alert-notice alert-light-primary fade show mb-5 p-3" role="alert">\
                  <div class="alert-text text-center">CUSTOMER ID: <b>'+viewer+'</b></div>\
                  <div class="alert-close">\
                    <button type="button" class="close" aria-label="Close">\
                      <span aria-hidden="true">\
                        <i class="ki ki-close"></i>\
                      </span>\
                    </button>\
                  </div>\
                </div>');
                $('#customer_form > div.row > div.flex-row-fluid.col-md-4 > div > div.card-body > div.alert.alert-custom.alert-notice.alert-light-primary.fade.show.mb-5.p-3 > div.alert-close > button').on('click', function(e){
                  // $('input[name="customer_id"]').val('NEW CUSTOMER');
                  // $('.alert').fadeOut(400, function(){
                  //    $('#customer_form > div.row > div.flex-row-fluid.col-md-4 > div > div.card-body').prepend('<div class="alert alert-custom alert-notice alert-light-warning fade show mb-5 p-3" role="alert">\
                  //     <div class="alert-text text-center">New Customer</div>\
                  //   </div>');
                  // });
                  _loadpage('create_order');
                  viewer="";
                  
                })
              }else{
                $('input[name="customer_id"]').val('NEW CUSTOMER');
                $('#customer_form > div.row > div.flex-row-fluid.col-md-4 > div > div.card-body').prepend('<div class="alert alert-custom alert-notice alert-light-warning fade show mb-5 p-3" role="alert">\
                  <div class="alert-text text-center">New Customer</div>\
                </div>');
              }
               // CALCULATOR
               let btns = document.querySelectorAll(".num-button");
               let allBtns = document.querySelectorAll(".button");
               let resultBox = document.querySelector("#result-box");
               // let clearBtn = document.querySelector('#clear');
               let total = document.querySelector("#total");
               let btnSpread = [...btns];
               let allBtnSpread = [...allBtns];
              // For Number Inputs
              btnSpread.forEach((button, i) => {
                button.addEventListener("click", () => {
                  if (resultBox.innerHTML == "0" && btns[i].innerHTML!='.') {
                    resultBox.innerHTML = "";
                  }
                  // Inner Values for calculator
                  let value = btns[i].innerHTML;
                  let new_val=resultBox.innerHTML + value;
                  let num_val=parseFloat(new_val);
                  if(num_val>wallet_balance){
                    _showToast('info','Not enough balance/invalid amount');
                  }else if((num_val>total_order && payment_method=='pay-with-cod') || (num_val>(total_order-max_wallet) && payment_method=='pay-with-dragonpay')){
                    _showToast('info','Amount must be less than or same as the amount of your order');
                  }else{
                    if(isNumeric(new_val)){
                      resultBox.innerHTML = new_val;
                    }
                  }
                });
              });
              $('#clear').on('click', function(e){
                e.preventDefault();
                resultBox.innerHTML = "0";
              })

              $('#apply-wallet-submit').on('click', function(e){
                e.preventDefault();
                let new_val=resultBox.innerHTML;
                let num_val=parseFloat(new_val);
                if(num_val>wallet_balance || num_val<=0){
                  _showToast('info','Not enough balance/invalid amount');
                }else if((num_val>total_order && payment_method=='pay-with-cod') || (num_val>(total_order-max_wallet) && payment_method=='pay-with-dragonpay')){
                  _showToast('info','Amount must be less than or same as the amount of your order');
                }else{
                  if(isNumeric(new_val)){
                    _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Processing...'), _constructForm(['user_create_order', 'update_wallet_discount',num_val.toFixed(2)]));
                    $('#apply_wallet_modal').modal('hide');
                  }else{
                    _showSwal('error','Invalid input');
                    $('#apply_wallet_modal').modal('hide');
                  }
                }
              })
              $('#apply_wallet_modal').on('hidden.bs.modal', function (e) {
                resultBox.innerHTML ="0";
              })
              
            
              break;
            }
            case 'package':{
              // package_action="checkout-package";
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockContent', '#addr-card', false), _constructForm(['user_package', 'addr_package']));
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi(false, false, false), _constructForm(['user_package', 'count_packages']));
              if(_getItem('package')){
                if(_getItem('package')=='package'){
                  $('a[name="applied_code"]').click();
                }else if(_getItem('package')=='scheduled_package'){
                  $('a[name="scheduled"]').click();
                }else if(_getItem('package')=='complete_package'){
                  $('a[name="complete"]').click();
                }
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage',false,false), _constructForm(['user_package', _getItem('package')]));
              }else{
                $('a[name="applied_code"]').click();
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage',false,false), _constructForm(['user_package', 'package']));
              }
              $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
                $(e.target.hash+' > div').css('visibility','hidden');
                if (e.target.hash == '#kt_tab_pane_1') {
                    $('#tbl_user_applied_codes').DataTable().columns.adjust().responsive.recalc();
                    $(e.target.hash+' > div').css('visibility','visible');
                }else if (e.target.hash == '#kt_tab_pane_2') {
                    $('#tbl_user_scheduled').DataTable().columns.adjust().responsive.recalc();
                    $(e.target.hash+' > div').css('visibility','visible');
                }else if (e.target.hash == '#kt_tab_pane_3') {
                    $('#tbl_user_complete').DataTable().columns.adjust().responsive.recalc();
                    $(e.target.hash+' > div').css('visibility','visible');
                }
              })
              $('#schedule_package_form > div.row > div.flex-row-fluid.col-md-8.order-1.order-md-2 > div > div.card-body.pt-5.px-5.px-md-10.pb-0.gutter-b.overflow-hidden > ul > li > a').on('click', function(e){
                let element=$(this);
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi(false, false, false), _constructForm(['user_package', 'count_packages']));
                if(element.attr('name')=='applied_code'){
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage',false,false), _constructForm(['user_package', 'package']));
                  _sessionStorage('package','package');
                  $('#container1').show();
                  $('#container2').hide();
                }else if(element.attr('name')=='scheduled'){
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage',false,false), _constructForm(['user_package', 'scheduled_package']));
                  _sessionStorage('package','scheduled_package');
                }else if(element.attr('name')=='complete'){
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage',false,false), _constructForm(['user_package', 'complete_package']));
                  _sessionStorage('package','complete_package');
                }
              })
              $('#tbl_user_applied_codes').delegate('.select-package','click',function(e){
                let element=$(this);
                $('#container1').hide();
                $('#container2').show();
                code_selected=element.attr('data-id');
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('pre-loader20', '#package-content', false), _constructForm(['user_package', 'package_list',code_selected]));
              })
              $('#tbl_user_applied_codes').delegate('.remove-package','click',function(e){
                let element=$(this);
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, false), _constructForm(['user_package', 'package_remove',element.attr('data-id'),element.attr('data-prod')]));
              })
              $('#tbl_user_applied_codes').delegate('.check-package','change',function(e){
                let element=$(this);
                if(element.attr('data-name')){
                  if($(this).is(':checked')){
                    package_cart.push(element.attr('data-id'));
                  }else{
                    _removeData(package_cart,element.attr('data-id'));
                  }
                }
              })
              $('#tbl_user_applied_codes').delegate('.package-name','click', function(e){
                let element=$(this);
                code_selected=element.attr('data-id');
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('pre-loader20', '#package-content', false), _constructForm(['user_package', 'package_info',element.attr('data-prod'),element.attr('data-id')]));
                $('#container1').hide();
                $('#container2').show();
              })

              $('#addr-WORK,#addr-HOME').on('click', function(e){
                e.preventDefault();
                let element=$(this);
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Package...'), _constructForm(['user_package', 'change_addr',element.attr('title')]));
                address_used=element.attr('title');
                $('#addr-'+element.attr('title')).attr('class','btn btn-outline-primary active');
                $('#addr-'+element.attr('data-id')).attr('class','btn btn-outline-primary');
              })
              // $('#edit-addr').on('click', function(e){
              //   e.preventDefault();
              //     address='update_address';
              //    $("#schedule_package_form :input").prop("disabled", false);
              //    $("#submit-addr").show();
              //   // _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_address', 'get_shipping_address',shipping_addr]));
              // })
              // $('#container1 > div.card-footer.d-flex.justify-content-md-end.border-0.justify-content-center > button').on('click', function(e){
              //     Swal.fire({
              //       title:"Please choose options",
              //       text: "Do you want to proceed to schedule your package or schedule your package per item?",
              //       icon: "question",
              //       showCancelButton: true,
              //       buttonsStyling: false,
              //       confirmButtonText: "Schedule my package!",
              //       cancelButtonText: "Schedule per package item",
              //       customClass: {
              //         confirmButton: "btn font-weight-bold btn-warning btn-hover-warning",
              //         cancelButton: "btn font-weight-bold btn-primary btn-hover-primary"
              //       }
              //     }).then(function (result) {
              //       if (result.value) {
              //         $('#schedule_package_form').submit();
              //         // let myForm;
              //         // let formData;
              //         // if(address_status=='exist'){
              //         //   $(".dis").prop("disabled", false).attr('readonly',true);
              //         //   myForm = document.getElementById('shipping_address_form');
              //         //   formData = new FormData(myForm);
              //         //   $(".dis").prop("disabled", true).attr('readonly',false);
              //         // }else{
              //         //   myForm = document.getElementById('shipping_address_form');
              //         //   formData = new FormData(myForm);
              //         // }
              //         // formData.append("data1","schedule_package");
              //         // formData.append("data2", "schedule_package");
              //         // formData.append("addr_type", address_used);
              //         // formData.append("package_id", package_cart);
              //         // formData.append("new_mobile", $('input[name="addr_mobile"]').val());
              //         // _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Processing...'), formData);
              //       }else{
              //         _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('pre-loader20', '#package-content', false), _constructForm(['user_package', 'schedule_package_per_item',package_cart]));
              //       }
              //     })
              //   // _showSwal('info','Oopps! Sorry, this process is under developement.');
              // })
              $('body').delegate('.view-cart-package', 'click', function(e){
                e.stopImmediatePropagation();
                let element=$(this);
                view_cart_details=element.attr('data-id');
                  $('#show_payment_modal > div > div > div.modal-body.p-0 > div.card-footer.pb-0').css('visibility','hidden');
                  $('.log-header').empty().append('<span class="text-primary text-hover-primary font-weight-bold font-size-h1 mb-0">'+element.attr('data-txnid')+'</span>');
                  $('#pre-loader20').empty().append('<img src="../../images/pre-loader/loader-20.gif" alt="Loading"/>');
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Viewing cart...'), _constructForm(['user_track_order', 'view_cart',element.attr('data-id')]));
                  $('#show_payment_modal').on('shown.bs.modal', function (e) {
                      $("#tbl_cart_details").DataTable().columns.adjust().responsive.recalc();
                      $('#pre-loader20').empty();
                      $('#show_payment_modal > div > div > div.modal-body.p-0 > div.card-footer.pb-0').css('visibility','visible');
                  })
              })
              $("body").delegate('.fulfillment_view_logs','click',function(e){
                  e.stopImmediatePropagation(); 
                  let element=$(this);
                  $('.log-header').empty().append('<span class="text-primary text-hover-primary font-weight-bold font-size-h1 mb-0">'+element.attr('data-txnid')+'</span>');
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Moving request..."), _constructForm(['user_track_order', 'fulfillment_view_logs',element.attr('data-id')]));
                })
             
              break;
            }
            case 'package-item':{
              _initAddr();
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockContent', '#addr-card', false), _constructForm(['address', 'get-region']));
              if(!_getItem('package_item')){
                 _sessionStorage('package_item','package_item');
              }
              $('#schedule_package_item_form > div.row > div.flex-row-fluid.col-md-8.order-1.order-md-2 > div > div.card-body.pt-5.px-5.px-md-10.pb-0.gutter-b.overflow-hidden > ul > li > a').on('click', function(e){
                let element=$(this);
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage',false,false), _constructForm(['user_package', element.attr('name')]));
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi(false, false, false), _constructForm(['user_package', 'count_package_item']));
                _sessionStorage('package_item',element.attr('name'));
              })
              $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
                $(e.target.hash+' > div').css('visibility','hidden');
                $('#tbl_'+_getItem('package_item')).DataTable().columns.adjust().responsive.recalc();
                $(e.target.hash+' > div').css('visibility','visible');
              })
              if(subpage){
                $('a[name="'+subpage+'"]').click(); 
              }else{
                $('a[name="'+_getItem('package_item')+'"]').click();
              }

              $('#tbl_package_item').delegate('.check-package-item','change',function(e){
                let element=$(this);
                let json_array=[];
                json_array.push({
                    id: element.attr('data-id'),
                    qty: $('#package_touchspin_'+element.attr('data-qty')).val(),
                    item: element.attr('data-item'),
                });
                if($(this).is(':checked')){
                  package_item_cart.push(JSON.stringify(json_array));
                }else{
                  _removeData(package_item_cart,JSON.stringify(json_array));
                }
                // alert(package_item_cart);
              })
              // $('#tab_package_item > div > div.card-footer.d-flex.justify-content-md-end.border-0.justify-content-center.pb-3 > button').on('click', function(e){
              //   if(package_item_cart!=""){
              //     $('#shipping_address_form_v2').submit();
              //   }else{
              //     _showToast('info','Please select code/package first');
              //   }
              //   // _showSwal('info','Oopps! Sorry, this process is under developement.');
              // })
              $('body').delegate('.view-cart-package', 'click', function(e){
                e.stopImmediatePropagation();
                let element=$(this);
                view_cart_details=element.attr('data-id');
                  $('#show_payment_modal > div > div > div.modal-body.p-0 > div.card-footer.pb-0').css('visibility','hidden');
                  $('.log-header').empty().append('<span class="text-primary text-hover-primary font-weight-bold font-size-h1 mb-0">'+element.attr('data-txnid')+'</span>');
                  $('#pre-loader20').empty().append('<img src="../../images/pre-loader/loader-20.gif" alt="Loading"/>');
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Viewing cart...'), _constructForm(['user_track_order', 'view_cart',element.attr('data-id')]));
                  $('#show_payment_modal').on('shown.bs.modal', function (e) {
                      $("#tbl_cart_details").DataTable().columns.adjust().responsive.recalc();
                      $('#pre-loader20').empty();
                      $('#show_payment_modal > div > div > div.modal-body.p-0 > div.card-footer.pb-0').css('visibility','visible');
                  })
              })
              $("body").delegate('.fulfillment_view_logs','click',function(e){
                  e.stopImmediatePropagation(); 
                  let element=$(this);
                  $('.log-header').empty().append('<span class="text-primary text-hover-primary font-weight-bold font-size-h1 mb-0">'+element.attr('data-txnid')+'</span>');
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Moving request..."), _constructForm(['user_track_order', 'fulfillment_view_logs',element.attr('data-id')]));
                })
             
              break;
            }
            case 'customers_list':{
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Customers...'), _constructForm(['user_customers', 'customers_list']));
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockContent', '#addr-card', false), _constructForm(['address', 'get-region']));
              break;
            }
             case 'genealogy':{
              // _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Accounts...'), _constructForm(['user_accounts', 'fetch_accounts']));
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Genealogy...'), _constructForm(['user_genealogy', 'genealogy']));
              $('#genealogy-back').on('click', function(e){
                if(genealogy[genealogy.length-2]){
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_genealogy', 'fetch_genealogy',genealogy[genealogy.length-2]]));
                  genealogy.pop();
                }
              })
              $('#genealogy-upper').on('click', function(e){
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_genealogy', 'upper_genealogy',username1]));
              })
              $('#search-genealogy').on('submit', function(e){
                  e.preventDefault();
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Searching..."), _constructForm(['user_genealogy', 'search_genealogy',$('input[name="search"]').val()]));
                })
              $('select[name="owner"]').on('change',function(e){
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Loading Genealogy..."), _constructForm(['user_genealogy', 'change_owner',this.value]));
              })
              // _initGenealogy();
              break;
            }
            case 'termsandcondition':{
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_agreement', 'agreement']));
              break;
            }
            case 'commissions':{
              KTBootstrapDatetimepicker.init();
               _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Accounts...'), _constructForm(['user_accounts', 'fetch_accounts']));
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Commissions...'), _constructForm(['user_reports', 'commissions']));
              $('#kt_search').on('submit', function(e){
                    e.preventDefault();   
                      _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Commissions...'), _constructForm(['user_reports', 'date_range_commissions',$('input[name="start"]').val(),$('input[name="end"]').val(),$('select[name="owner"]').val()]));
                })
              
              break;
            }
            case 'generated-sales':{
              KTBootstrapDatetimepicker.init();
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Accounts...'), _constructForm(['user_accounts', 'fetch_accounts']));
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Sales...'), _constructForm(['user_reports', 'generated_sales']));
              $('#kt_search').on('submit', function(e){
                    e.preventDefault();    
                      _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Sales...'), _constructForm(['user_reports', 'date_range_generated_sales',$('input[name="start"]').val(),$('input[name="end"]').val(),$('select[name="owner"]').val()]));
                })
              
              break;
            }
            case 'opt-ins':{
              KTBootstrapDatetimepicker.init();
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Accounts...'), _constructForm(['user_accounts', 'fetch_accounts']));
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Opt-Ins...'), _constructForm(['user_reports', 'opt_ins']));
              $('#kt_search').on('submit', function(e){
                    e.preventDefault();    
                      _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Opt-Ins...'), _constructForm(['user_reports', 'date_range_opt_ins',$('input[name="start"]').val(),$('input[name="end"]').val(),$('select[name="owner"]').val()]));
                })
              
              break;
            }
            case 'direct-referrals':{
              KTBootstrapDatetimepicker.init();
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Accounts...'), _constructForm(['user_accounts', 'fetch_accounts']));
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Referrals...'), _constructForm(['user_reports', 'direct_referrals']));
              $('#kt_search').on('submit', function(e){
                    e.preventDefault();    
                      _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Referrals...'), _constructForm(['user_reports', 'date_range_direct_referral',$('input[name="start"]').val(),$('input[name="end"]').val(),$('select[name="owner"]').val()]));
                })
              
              break;
            }
             case 'binary-monitoring':{
              KTBootstrapDatepicker.init();
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Accounts...'), _constructForm(['user_accounts', 'fetch_accounts']));
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Binary...'), _constructForm(['user_reports', 'binary_monitoring']));
              $('#kt_search').on('submit', function(e){
                    e.preventDefault();    
                      _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Binary...'), _constructForm(['user_reports', 'date_range_binary_monitoring',$('input[name="start"]').val(),$('input[name="end"]').val(),$('select[name="owner"]').val()]));
                })
              
              break;
            }
             case 'setup':{
              Maxlength_profile.init();
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Accounts...'), _constructForm(['user_accounts', 'fetch_accounts']));
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Group Sales...'), _constructForm(['setup_group_sales', 'setup_sales']));
              $('select[name="owner"]').on('change', function(e){
                owner=this.value;
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Group Sales...'), _constructForm(['setup_group_sales', 'setup_sales',this.value]));
              })
              break;
            }
            case 'track_order':{
               _ajaxrequest("controller/controller.php", "POST", _constructBlockUi(false, false, false), _constructForm(['user_track_order', 'count_orders']));
               if(subpage){
                  $('a[name="'+subpage+'"]').click(); 
                  _sessionStorage('track_order',subpage);
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Orders...'), _constructForm(['user_track_order', _getItem('track_order')]));
                }else{
                if(_getItem('track_order')){
                  $('a[name="'+_getItem('track_order')+'"]').click();
                 _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Orders...'), _constructForm(['user_track_order', _getItem('track_order')]));
                }else{
                   _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Orders...'), _constructForm(['user_track_order', 'to_pay_order']));
                   $('a[name="to_pay_order"]').click();
                }
              }
                $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
                  if (e.target.hash == '#kt_tab_pane_1') {
                      $('#tbl_to_pay_order').DataTable().columns.adjust().responsive.recalc();
                  }else if (e.target.hash == '#kt_tab_pane_2') {
                      $('#tbl_pending_order').DataTable().columns.adjust().responsive.recalc();
                  }else if (e.target.hash == '#kt_tab_pane_3') {
                      $('#tbl_to_ship_order').DataTable().columns.adjust().responsive.recalc();
                  }else if (e.target.hash == '#kt_tab_pane_4') {
                      $('#tbl_complete_order').DataTable().columns.adjust().responsive.recalc();
                  }else if (e.target.hash == '#kt_tab_pane_5') {
                      $('#tbl_cancelled_order').DataTable().columns.adjust().responsive.recalc();
                  }
                })
                $('#card-customer > div.card-body.pt-5.px-5.px-md-10.pb-0.gutter-b > ul > li > a').on('click', function(e){
                  let element=$(this);
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Orders...'), _constructForm(['user_track_order', element.attr('name')]));
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi(false, false, false), _constructForm(['user_track_order', 'count_orders']));
                  _sessionStorage('track_order',element.attr('name'));
                })
               $('body').delegate('.change-payment-method','click', function(e){
                e.stopImmediatePropagation();
                let element = $(this);
                Swal.fire({
                  title: 'Select Payment Method',
                  input: 'select',
                  inputOptions: {
                    // 'pay-with-debit-credit-card': 'Debit / Credit card',
                    'pay-with-fund-transfer': 'Fund Transfer',
                    'pay-with-gcash': 'GCash',
                    // 'pay-with-cod': 'Cash on delivery'
                  },
                  inputPlaceholder: 'Select a payment method',
                  showCancelButton: true,
                  inputValidator: (value) => {
                    return new Promise((resolve) => {
                      if (!value) {
                        resolve('You need to select your payment method');
                      } else {
                        resolve();
                         _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Saving changes...'), _constructForm(['user_track_order', 'change_payment_method',element.attr('data-id'),value]));
                      }
                    })
                  }
                })
               })
               $('body').delegate('.cancel-order','click', function(e){
                e.stopImmediatePropagation();
                let element = $(this);
                Swal.fire({
                         text: "Do you want to cancel this order? Transaction ID: "+element.attr('data-txnid'),
                         icon: "question",
                         showCancelButton: true,
                         buttonsStyling: false,
                         confirmButtonText: "Yes, continue!",
                         cancelButtonText: "No, cancel",
                         customClass: {
                           confirmButton: "btn font-weight-bold btn-primary",
                           cancelButton: "btn font-weight-bold btn-default"
                         }
                       }).then(function (result) {
                        if (result.value) {
                          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Saving changes...'), _constructForm(['user_track_order', 'cancel_order',element.attr('data-id')]));
                        }
                       })
               })
              // $('body').delegate('.view-cart','click', function(e){
              //   e.stopImmediatePropagation();
              //   let element=$(this);
              //   _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Viewing cart...'), _constructForm(['user_track_order', 'view_cart',element.attr('data-id')]));
              //   $("#view_cart > div > div > div.modal-body.p-0 > div.card-body").css('visibility','hidden');
              //   $('#pre-loader20').append('<img src="../../images/pre-loader/loader-20.gif" alt="Loading"/>');
              //   $('#view_cart').on('shown.bs.modal', function (e) {
              //     $("#tbl_cart_details").DataTable().columns.adjust().responsive.recalc();
              //     $('#pre-loader20').empty();
              //     $("#view_cart > div > div > div.modal-body.p-0 > div.card-body").css('visibility','visible');
              //   })
              //     $('#exampleModalLabel').empty().append('<h5 class="modal-title">Transaction ID: '+element.attr('data-txnid')+'</h5>');
              // })
              $('body').delegate('.view-cart','click', function(e){
                  e.stopImmediatePropagation(); 
                  let element=$(this);
                  view_cart_details=element.attr('data-id');
                  $('#show_payment_modal > div > div > div.modal-body.p-0 > div.card-footer.pb-0').css('visibility','hidden');
                  $('.log-header').empty().append('<span class="text-primary text-hover-primary font-weight-bold font-size-h1 mb-0">'+element.attr('data-txnid')+'</span>');
                  $('#pre-loader20').empty().append('<img src="../../images/pre-loader/loader-20.gif" alt="Loading"/>');
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Viewing cart...'), _constructForm(['user_track_order', 'view_cart',element.attr('data-id')]));
                  $('#show_payment_modal').on('shown.bs.modal', function (e) {
                      $("#tbl_cart_details").DataTable().columns.adjust().responsive.recalc();
                      $('#pre-loader20').empty();
                      $('#show_payment_modal > div > div > div.modal-body.p-0 > div.card-footer.pb-0').css('visibility','visible');
                  })
              })
              $('body').delegate('.view-cart-remarks','click', function(e){
                  e.stopImmediatePropagation(); 
                  let element=$(this);
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Viewing remarks...'), _constructForm(['user_track_order', 'view_cart_remarks',element.attr('data-txnid')]));
              })
              $("body").delegate('.fulfillment_view_logs','click',function(e){
                  e.stopImmediatePropagation(); 
                  let element=$(this);
                  $('.log-header').empty().append('<span class="text-primary text-hover-primary font-weight-bold font-size-h1 mb-0">'+element.attr('data-txnid')+'</span>');
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Moving request..."), _constructForm(['user_track_order', 'fulfillment_view_logs',element.attr('data-id')]));
                })
              break;
            }
            case 'upgrade':{
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Accounts...'), _constructForm(['user_accounts', 'fetch_accounts']));
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Ranks...'), _constructForm(['user_ranks', 'ranks']));
              $('select[name="owner"]').on('change',function(e){
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Ranks...'), _constructForm(['user_ranks', 'ranks_owner', this.value]));
              })
              break;
            }
            case 'uni-level':{
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Accounts...'), _constructForm(['user_accounts', 'fetch_accounts']));
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Uni-Level...'), _constructForm(['user_unilevel', 'unicard']));
              // _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Uni-Level...'), _constructForm(['user_unilevel', 'unicard_owner']));
              $('select[name="owner"]').on('change',function(e){
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Uni-Level...'), _constructForm(['user_unilevel', 'unicard',false,this.value]));
              })
              break;
            }
            case 'academy-eys':
            case 'academy-sbs':
            case 'academy-sys':{
              setTimeout(function() {
              $('#pre-loader').remove();
               }, 100);
              break;
            }
            case "training":{
              if(subpage){
                _sessionStorage('training',subpage);
                 var id = subpage;
              }else{
                 var id =_getItem('training');
              }
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Transferring...'), _constructForm(['training_tools', 'fetch_training_tools',id]));
             $('#iframe').on('hidden.bs.modal', function (e) {
                  e.preventDefault();
                   $('.video-iframe').empty();
              });
              break;
            }
            case "generate-id":{
               _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Transferring...'), _constructForm(['generate_id','fetch_generated_id']));

              break;
            }
            case "generate-ticket":{
               $('[data-toggle="tooltip"]').tooltip();
               KTDatatablesDataSourceAjaxServer.init('tbl_ticket_list');
                $("body").delegate('.print','click',function(e){
                  e.stopImmediatePropagation(); 
                  let element=$(this);
                   let newWin = window.open("");
                    newWin.document.write('<html><body onload="window.print()"><img src="../../images/ticket/'+element.attr('data-image')+'" id="image-id"  style="width: 100%;"></body></html>');
                    setInterval(function () {
                      newWin.print();
                       newWin.close();
                    }, 1000);
                });
                $("body").delegate('.pdf','click',function(e){
                  e.stopImmediatePropagation(); 
                   let element=$(this);
                   let doc = new jsPDF();
                   let myImage = new Image();
                   let arr = element.attr('data-image').split('.');
                    myImage .src = '../../images/ticket/'+element.attr('data-image');
                    myImage .onload = function(){
                    doc.addImage(myImage , 'png', 5, 5, 200, 200);
                    doc.save(arr[0]+'.pdf');
                    };
                });
                _modal_image('#myImg');
              break;
            }

              default:
              break;
            }
    };

    // start making formdata
    var _constructForm = function(args){
          let formData = new FormData();
          for (var i = 1; (args.length+1) > i; i++){
             formData.append('data'+ i, args[i-1]);
           }  
          return formData;
    };
    // end making formdata

    var _constructBlockUi = function(type, element, message){
          let formData = new FormData();
           formData.append('type', type);
           formData.append('element', element);
           formData.append('message', message);
           if(formData){
             return formData;
           }
    };

































// CONSTRUCT

    var _construct = async function(response, type, element, customBtn){
         switch(type){
                case 'is_main':{
                  if(response){
                    if(response.gold_tag!='main'){
                      $('#header-alert').empty().append('<div class="py-3 text-white text-center font-weight-bolder m-0" style="background-color: #E24955;" role="alert">This is not the main account | <span class="">MAIN ACCOUNT: '+response.gold_tag+'</span></div>');
                    }
                  }
                  break;
                }
                case 'fetch_accounts':{
                  if(response!=false){
                    if(response.accounts.length>1){
                      $('select[name="owner"],.owner').show();
                      $('select[name="owner"]').empty().append('<option value="">Select Owner</option>');
                      for(let i=0;i<response.accounts.length;i++){
                        $('select[name="owner"]').append('<option value="' +response.accounts[i].id+ '">' + response.accounts[i].username + '</option>');
                      }
                    }
                  }else{
                    _showSwal('info','Oopps! Something went wrong, please check your internet connection');
                  }
                  break;
                }
               case 'dashboard':{
                if(response){
                  if(response.rank){
                    // alert(JSON.stringify(response.rank));
                    const count = {};
                    response.rank.forEach(element => {
                      count[element] = (count[element] || 0) + 1;
                    });
                    let level1=count.level1;
                    let level2=count.level2;
                    let level3=count.level3;
                    let level4=count.level4;
                    let level5=count.level5;



                    if(level1>=10){
                      $('.round').remove();
                      $('#level1').empty().append('<div >\
                                    <i class="fas fa-trophy icon-4x" style="color:#C0C0C0"></i>\
                                    <div class="font-weight-bold text-center font-size-h3-lg font-size-h4-md font-size-sm text-muted mt-1">Silver</div>\
                                  </div>\
                                  <div class="round d-lg-block d-none pl-15">\
                                      <div id="cta">\
                                        <span class="arrow primera next1 "></span>\
                                        <span class="arrow segunda next1 "></span>\
                                      </div>\
                                    </div>');
                    }
                    if(level2>=10){
                      $('.round').remove();
                      $('#level2').empty().append('<div >\
                                    <i class="fas fa-trophy icon-4x" style="color:#FFD700"></i>\
                                    <div class="font-weight-bold text-center font-size-h3-lg font-size-h4-md font-size-sm text-muted mt-1">Gold</div>\
                                  </div>\
                                  <div class="round d-lg-block d-none pl-15">\
                                      <div id="cta">\
                                        <span class="arrow primera next1 "></span>\
                                        <span class="arrow segunda next1 "></span>\
                                      </div>\
                                    </div>');
                    }
                    if(level3>=10){
                      $('.round').remove();
                      $('#level3').empty().append('<div >\
                                    <i class="fas fa-trophy icon-4x" style="color:#58646F"></i>\
                                    <div class="font-weight-bold text-center font-size-h3-lg font-size-h4-md font-size-sm text-muted mt-1">Platinum</div>\
                                  </div>\
                                  <div class="round d-lg-block d-none pl-15">\
                                      <div id="cta">\
                                        <span class="arrow primera next1 "></span>\
                                        <span class="arrow segunda next1 "></span>\
                                      </div>\
                                    </div>');
                    }
                    if(level4>=10){
                      $('.round').remove();
                      $('#level4').empty().append('<div >\
                                    <i class="fas fa-trophy icon-4x" style="color:#B9F2FF"></i>\
                                    <div class="font-weight-bold text-center font-size-h3-lg font-size-h4-md font-size-sm text-muted mt-1">Diamond</div>\
                                  </div>\
                                  <div class="round d-lg-block d-none pl-15">\
                                      <div id="cta">\
                                        <span class="arrow primera next1 "></span>\
                                        <span class="arrow segunda next1 "></span>\
                                      </div>\
                                    </div>');
                    }
                    if(level5>=10){
                      $('.round').remove();
                      $('#level5').empty().append('<div >\
                                    <i class="fas fa-crown icon-4x" style="color:#ff8a54"></i>\
                                    <div class="font-weight-bold text-center font-size-h3-lg font-size-h4-md font-size-sm text-muted mt-1">Royal Crown</div>\
                                  </div>');
                    }

                  //   let count = 0;
                  //   let icon ="la la-question-circle icon-5x";\
                  //   let color ="#fffcfc";
                  //   let rank_name ="No Rank";
                  //   let rank_color ="#fffcfc";
                  //   let rank_icon = "la la-question-circle icon-5x"


                  //   if(response!=false){
                  //     if(response.rank){
                  //       if(response.rank  <= 9){
                  //         rank_name ='No Rank';
                  //         rank_color = '#C0C0C0';
                  //         rank_icon = 'la la-question-circle icon-4x'; 
                  //         count = 0;
                  //       }else if(response.rank >= 10 && response.rank <= 19){
                  //         rank_name ='SILVER';
                  //         rank_color = '#C0C0C0';
                  //         rank_icon = 'fas fa-trophy icon-4x'; 
                  //         count = 1;
                  //       }else if(response.rank >= 20 && response.rank <= 29){
                  //         rank_name ='GOLD';
                  //         rank_color = '#FFD700';
                  //         rank_icon = 'fas fa-trophy icon-4x'; 
                  //         count = 2;
                  //       }else if(response.rank >= 30 && response.rank <= 39){
                  //         rank_name ='PLATINUM';
                  //         rank_color = '#fffcfc';
                  //         rank_icon = 'fas fa-trophy icon-4x'; 
                  //         count = 3;
                  //       }else if(response.rank >= 40 && response.rank <= 49){
                  //         rank_name ='DIAMOND';
                  //         rank_color = '#B9F2FF';
                  //         rank_icon = 'la la-diamond icon-4x'; 
                  //         count = 4;
                  //       }else if(response.rank >= 50){
                  //         rank_name ='Royal Crown';
                  //         rank_color = '#ff8a54';
                  //         rank_icon = 'la la-crown icon-4x';                       
                  //         count = 5;
                  //       }
                  //        $('.text-rank').text(rank_name);
                  //        $('#icon-rank').removeClass().addClass(rank_icon).css('color',rank_color);
                  //       for(let i=0;i<count;i++){
                  //         if(i == 0){
                  //            icon = 'fas fa-trophy icon-5x';
                  //            color= '#C0C0C0';
                  //         }else if(i == 1){
                  //            icon = 'fas fa-trophy icon-5x';
                  //            color= '#FFD700';
                  //         }else if(i == 2){
                  //            icon = 'fas fa-trophy icon-5x';
                  //            color= '#fffcfc';
                  //         }else if(i == 3){
                  //            icon = 'la la-diamond icon-5x';
                  //            color= '#B9F2FF';
                  //         }else if(i == 4){
                  //            icon = 'la la-crown icon-5x';
                  //            color= '#ff8a54';
                  //         }
                  //         $('#icon-change-'+i).removeClass().addClass(icon).css('color',color);
                  //       }
                  //     }

                  }
                  if(response.ref){
                    $('#user-ref').empty();
                    let limit=10;
                    let ext='';
                    if(response.ref.length<=limit){
                      limit=response.ref.length;
                    }else{
                      ext='<div class="symbol symbol-30 symbol-circle symbol-light" data-toggle="tooltip" title="" data-original-title="More users">\
                                <span class="symbol-label font-weight-bold">'+(response.ref.length-limit)+'+</span>\
                              </div>';
                    }
                    for(let i=0; i<limit; i++){
                      $('#user-ref').append('<div class="symbol symbol-35 symbol-circle" title="'+response.ref[i].fname+' '+response.ref[i].lname+'">\
                                <img alt="'+response.ref[i].username+'" src="../../images/user_images/'+response.ref[i].image+'">\
                              </div>');
                    }
                    $('#user-ref').append(ext);
                  }
                  if(response.members){
                    const obj7=document.getElementById("total-members");animateValueInteger(obj7, 0, response.members, 1000);
                  }
                  if(response.dash){
                    const obj1=document.getElementById("total-sale");animateValueDecimal(obj1, 0, parseFloat(response.dash.generated_sales), 1000);
                  }
                }else{
                   _showSwal('info','Oopps! Something went wrong, please check your internet connection');
                }
                $('#rank-view').show();
                
                //   if(response.package){
                //     $('#has-package').empty().append('<div class="alert alert-custom alert-notice alert-light-danger fade show px-5 py-2" role="alert">\
                //             <div class="alert-icon"><i class="la la-shopping-bag icon-xl"></i></div>\
                //             <div class="alert-text">There&apos;s a package waiting for you—<a href="javascript:;" class="text-danger text-hover-warning" ><b>check it out!</b></a></div>\
                //             <div class="alert-close">\
                //                 <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                //                     <span aria-hidden="true"><i class="ki ki-close"></i></span>\
                //                 </button>\
                //             </div>\
                //         </div>');
                //     $('#has-package > div > div.alert-text > a').on('click', function(e){
                //       e.preventDefault();
                //       _loadpage('package');
                //     })
                //   }
                // }
                break;
              }
              case 'setup_sales':{
                if(response!=false){
                    //PACKAGE
                    $('input[name=username]').val(response.username);
                    $('input[name=dpos_lastupdate]').val(response.dpos_lastupdate).prop('disabled', true);
                    if(response.default_position == 'L' || response.default_position == 'R'){
                      $('#setup_groupsales_form select').find('option[value=NULL]').prop('disabled', true);
                      $('#setup_groupsales_form select').val(response.default_position);
                    }else{
                      $('#setup_groupsales_form select').find('option[value=NULL]').attr('selected','selected').prop('disabled', true);
                       // $('#setup_groupsales_form select').find('option[value=NULL]').prop('disabled', false);
                    }
                    //PRODUCT
                    $('input[name=p_username]').val(response.username);
                    $('input[name=p_dpos_lastupdate]').val(response.dpos_product_lastupdate).prop('disabled', true);
                    if(response.dpos_product == 'L' || response.dpos_product == 'R'){
                      $('#setup_groupsalesproduct_form select').find('option[value=NULL]').prop('disabled', true);
                      $('#setup_groupsalesproduct_form select').val(response.dpos_product);
                      // $('#setup_groupsalesproduct_form select').find('option[value='+response.dpos_product+']').attr('selected',true);
                    }else{
                      $('#setup_groupsalesproduct_form select').find('option[value=NULL]').attr('selected','selected').prop('disabled', true);
                       // $('#setup_groupsalesproduct_form select').find('option[value=NULL]').prop('disabled', false);
                    }
                    
                }
                break;
              }
              // case 'setup_sales_product':{
              //   if(response!=false){
              //       $('input[name=p_username]').val(response.username);
              //       $('input[name=p_dpos_lastupdate]').val(response.dpos_product_lastupdate);
              //       if(response.dpos_product == 'L' || response.dpos_product == 'R'){
              //         $('#setup_groupsalesproduct_form select').find('option[value=NULL]').prop('disabled', true);
              //         $('#setup_groupsalesproduct_form select').val(response.dpos_product);
              //         // $('#setup_groupsalesproduct_form select').find('option[value='+response.dpos_product+']').attr('selected',true);
              //       }else{
              //         $('#setup_groupsalesproduct_form select').find('option[value=NULL]').attr('selected','selected').prop('disabled', true);
              //          // $('#setup_groupsalesproduct_form select').find('option[value=NULL]').prop('disabled', false);
              //       }
              //   }
              //   break;
              // }
              case 'fetch_reseller_tags':{
                // alert(JSON.stringify(response));
                if(response!=false){
                  $('#tags').empty().append('<li class="breadcrumb-item text-muted">\
                                        <a href="javascript:;" class="text-muted all_tag">All</a>\
                                      </li>');
                  $('.all_tag').on('click',function(e){
                    e.preventDefault();
                    $('#card_reseller_1').empty();
                    reseller_tag='all';
                      _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['user_reseller_tools', 'fetch_reseller',reseller_tool,'']));
                  });
                  for(let i=0;i<response.length;i++){
                    let $html = $('<li class="breadcrumb-item text-muted">\
                                        <a href="javascript:;" class="text-muted active">'+response[i].tags+'</a>\
                                      </li>');
                    $('#tags').append($html).promise().done(function(){
                      $('#tags > li:nth-child('+(i+2)+') > a').on('click', function(e){
                      //   for (let p = 0; p <=4; p++) {
                      //   $('.card_reseller_'+p).empty();
                      // }
                      $('#card_reseller_1').empty();
                      reseller_tag=response[i].tags;
                         _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['user_reseller_tools', 'fetch_reseller',reseller_tool,response[i].tags]));
                      })
                    })
                  }
                }
                break;
              }
              case 'fetch_reseller':{
                let description = '';
                let $html;
                let container=$('#card_reseller_1');
                let see_more="";
                // $('#card_reseller_1').empty();
                if(response=='no_more_tools'){
                  $(window).off('scroll');
                }else if(response!=false){
                    for (let i = 0; i<response.length; i++){
                       if (response[i].description.length > 150) {
                          see_more ='<a href="javascript:;" class="read-more"  data-toggle="modal"> [read more....]</a>';
                      }
                      if(response[i].type=='poster'){
                        let btn_link='<a href="../../images/marketing-tools/poster/'+response[i].image+'" class="btn btn-sm btn-icon btn-circle btn-danger font-weight-bold btn-pill mr-1" download="'+response[i].image+'" data-toggle="tooltip" title="Download Image" data-placement="bottom"><i class="fas fa-cloud-download-alt icon-md" ></i></a>';
                        if(response[i].link){
                          btn_link='<a href="'+response[i].link+'" target="_blank" class="btn btn-sm btn-dark font-weight-bold btn-pill">Open Link</a>';
                        }
                       $html=$('<div class="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6">\
                                      <div class="card card-custom gutter-b card-stretch zoom shadow">\
                                        <div class="card-body p-0 d-flex align-items-center" style="background-color: rgba(0, 0, 0, 0.05);">\
                                          <img data-link="true" id="myImg" alt="POSTER" src="../../images/marketing-tools/poster/'+response[i].image+'"  class="" style="border-radius: 0;width: 100%;height: 150px;object-fit: contain;">\
                                        </div>\
                                        <div class="text-center mt-5 mb-md-0 mb-lg-5 mb-md-0 mb-lg-5 mb-lg-0 mb-5 d-flex flex-column">\
                                         <div class="scroll-hover">\
                                          <div class="" style="padding:10px;">'+ response[i].description+'</div>\
                                          </div>\
                                          <div class="mt-3">'+see_more+'</div>\
                                          <div class="card-toolbar" style="padding:10px;">'+btn_link+'</div>\
                                        </div>\
                                      </div>\
                                  </div>');
                      }else if(response[i].type == 'docs'){
                       $html=$('<div class="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6">\
                                      <div class="card card-custom gutter-b card-stretch zoom shadow">\
                                        <div class="card-body p-0 d-flex align-items-center" style="background-color: rgba(0, 0, 0, 0.05);">\
                                          <img data-link="true" id="myImg" alt="DOCS" src="../../images/marketing-tools/docs/'+response[i].image+'"  class="" style="border-radius: 0;width: 100%;height: 150px;object-fit: contain;">\
                                        </div>\
                                        <div class="text-center mt-5 mb-md-0 mb-lg-5 mb-md-0 mb-lg-5 mb-lg-0 mb-5 d-flex flex-column">\
                                        <div class="scroll-hover">\
                                          <div class="" style="padding:10px;">'+ response[i].description+'</div>\
                                          </div>\
                                          <div class="mt-3">'+see_more+'</div>\
                                          <div class="card-toolbar" style="padding:10px;">\
                                              <a href="../../files/docs/'+response[i].docs+'" class="btn btn-sm btn-icon btn-circle btn-danger font-weight-bold btn-pill mr-1" download="'+response[i].docs+'" data-toggle="tooltip" title="Download" data-placement="bottom"><i class="fas fa-cloud-download-alt icon-md" ></i></a>\
                                            </div>\
                                        </div>\
                                      </div>\
                                  </div>');
                      }else if(response[i].type == 'landingpage'){
                        $html=$('<div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">\
                                      <div class="card card-custom gutter-b card-stretch zoom shadow">\
                                        <div class="card-body p-0 d-flex align-items-center" style="background-color: rgba(0, 0, 0, 0.05);">\
                                          <img data-link="true" id="myImg" alt="LANDINGPAGE" src="../../images/marketing-tools/landingpage/'+response[i].image+'"  class="" style="border-radius: 0;width: 100%;height: 150px;object-fit: contain;">\
                                        </div>\
                                        <div class="text-center mt-5 mb-md-0 mb-lg-5 mb-md-0 mb-lg-5 mb-lg-0 mb-5 d-flex flex-column">\
                                             <div class="scroll-hover">\
                                          <div class="" style="padding:10px;">'+ response[i].description+'</div>\
                                          </div>\
                                          <div class="mt-3">'+see_more+'</div>\
                                            <div class="card-toolbar" style="padding:10px;">\
                                                <div class="input-group">\
                                            <input type="text" class="form-control" readonly="true" id="url-'+i+'" value="'+response[i].link+'?sp='+response[i].username+'">\
                                            <div class="input-group-append">\
                                              <a href="javascript:;" class="btn btn-secondary" data-clipboard="true" data-clipboard-target="#url-'+i+'">\
                                                <i class="la la-copy"></i>\
                                              </a>\
                                            </div>\
                                        </div>\
                                        <!--<div class="input-group mt-1">\
                                          <input type="text" class="form-control" disabled="true" placeholder="FB PIXEL ID" value="'+response[i].fb_pixel+'">\
                                          <div class="input-group-append">\
                                            <a href="javascript:;" class="btn btn-secondary">\
                                              Edit\
                                            </a>\
                                          </div>\
                                        </div>\
                                        <div class="input-group mt-1">\
                                          <input type="text" class="form-control" disabled="true" placeholder="FB PAGE CHAT ID" value="'+response[i].fb_messenger_id+'">\
                                          <div class="input-group-append">\
                                            <a href="javascript:;" class="btn btn-secondary">\
                                              Edit\
                                            </a>\
                                          </div>\
                                        </div>\
                                        <div class="input-group mt-1">\
                                          <input type="text" class="form-control" disabled="true" placeholder="GTAG ID" value="'+response[i].g_tag+'">\
                                          <div class="input-group-append">\
                                            <a href="javascript:;" class="btn btn-secondary">\
                                              Edit\
                                            </a>\
                                          </div>\
                                        </div>-->\
                                        </div>\
                                        </div>\
                                    </div>\
                                  </div>');
                      }
                      container.append($html).promise().done(function(){
                        $('[data-toggle="tooltip"]').tooltip(); 
                        let id=response[i].id;
                        let  dess = response[i].description;
                        if(response[i].type=='landingpage'){
                          $('#card_reseller_1 > div:nth-child('+(i+1)+') > div > div.text-center.mt-5.mb-md-0.mb-lg-5.mb-md-0.mb-lg-5.mb-lg-0.mb-5.d-flex.flex-column > div.card-toolbar > div:nth-child(2) > div').on('click', function(e){
                            let element=$(this);
                            let input=$('#card_reseller_1 > div:nth-child('+(i+1)+') > div > div.text-center.mt-5.mb-md-0.mb-lg-5.mb-md-0.mb-lg-5.mb-lg-0.mb-5.d-flex.flex-column > div.card-toolbar > div:nth-child(2) > input');
                            if(input.is(":disabled")){
                              element.empty().append('<a href="javascript:;" class="btn btn-success">Save</a>');
                              input.attr('disabled',false);
                            }else{
                              element.empty().append('<a href="javascript:;" class="btn btn-secondary">Edit</a>');
                              input.attr('disabled',true);
                              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['user_reseller_tools', 'save_fb_pixel',id,input.val(),false,$('select[name="owner"]').val()]));
                            }
                          })
                          $('#card_reseller_1 > div:nth-child('+(i+1)+') > div > div.text-center.mt-5.mb-md-0.mb-lg-5.mb-md-0.mb-lg-5.mb-lg-0.mb-5.d-flex.flex-column > div.card-toolbar > div:nth-child(3) > div').on('click', function(e){
                            let element=$(this);
                            let input=$('#card_reseller_1 > div:nth-child('+(i+1)+') > div > div.text-center.mt-5.mb-md-0.mb-lg-5.mb-md-0.mb-lg-5.mb-lg-0.mb-5.d-flex.flex-column > div.card-toolbar > div:nth-child(3) > input');
                            if(input.is(":disabled")){
                              element.empty().append('<a href="javascript:;" class="btn btn-success">Save</a>');
                              input.attr('disabled',false);
                            }else{
                              element.empty().append('<a href="javascript:;" class="btn btn-secondary">Edit</a>');
                              input.attr('disabled',true);
                              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['user_reseller_tools', 'save_fb_messenger',id,input.val(),false,$('select[name="owner"]').val()]));
                            }
                          })
                          $('#card_reseller_1 > div:nth-child('+(i+1)+') > div > div.text-center.mt-5.mb-md-0.mb-lg-5.mb-md-0.mb-lg-5.mb-lg-0.mb-5.d-flex.flex-column > div.card-toolbar > div:nth-child(4) > div').on('click', function(e){
                            let element=$(this);
                            let input=$('#card_reseller_1 > div:nth-child('+(i+1)+') > div > div.text-center.mt-5.mb-md-0.mb-lg-5.mb-md-0.mb-lg-5.mb-lg-0.mb-5.d-flex.flex-column > div.card-toolbar > div:nth-child(4) > input');
                            if(input.is(":disabled")){
                              element.empty().append('<a href="javascript:;" class="btn btn-success">Save</a>');
                              input.attr('disabled',false);
                            }else{
                              element.empty().append('<a href="javascript:;" class="btn btn-secondary">Edit</a>');
                              input.attr('disabled',true);
                              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['user_reseller_tools', 'save_g_tag',id,input.val(),false,$('select[name="owner"]').val()]));
                            }
                          })
                        }
                        $('.read-more').on('click', function(e){
                         e.preventDefault();
                         e.stopImmediatePropagation();
                         $('.read-description').html(dess);
                         $('#description-read').modal('show');
                         
                        })
                      })
                     }
                }    
                    _modal_image('#myImg');
                    // _modal_description('#reseller_modal_btn');
                break;
              }
              case 'save_fb_messenger':
              case 'save_g_tag':
              case 'save_fb_pixel':{
                if(response!=false){
                  _showToast('success','Save changes!');
                }else{
                   _showSwal('error','Oopps! Something went wrong, please check your internet connection');
                }
                break;
              }
              case 'chart6_options':
              case 'chart5_options':
              case 'chart7_options':
              case 'all_options':{
                $("#"+type).empty();
                if(response != false){
                      if(type=='all_options'){
                        if(response.gensale){
                              for (let i = 0; response.gensale.length > i; i++){
                                 if(response.gensale.length + 1 == i){
                                    $("#chart5_options").append('<option selected value="'+response.gensale[i].year+'">'+response.gensale[i].year+'</option>'); 
                                 }else{
                                    $("#chart5_options").append('<option value="'+response.gensale[i].year+'">'+response.gensale[i].year+'</option>'); 
                                 }
                              }
                        }else{
                          $("#chart5_options").append('<option selected value="'+response.default+'">'+response.default+'</option>'); 
                        }
                        if(response.cart){
                              for (let i = 0; response.cart.length > i; i++){
                                 if(response.cart.length + 1 == i){
                                    $("#chart6_options").append('<option selected value="'+response.cart[i].year+'">'+response.cart[i].year+'</option>'); 
                                 }else{
                                    $("#chart6_options").append('<option value="'+response.cart[i].year+'">'+response.cart[i].year+'</option>'); 
                                 }
                              }
                        }else{
                          $("#chart6_options").append('<option selected value="'+response.default+'">'+response.default+'</option>');
                        }
                         if(response.members){
                              for (let i = 0; response.members.length > i; i++){
                                 if(response.members.length + 1 == i){
                                    $("#chart7_options").append('<option selected value="'+response.members[i].year+'">'+response.members[i].year+'</option>'); 
                                 }else{
                                    $("#chart7_options").append('<option value="'+response.members[i].year+'">'+response.members[i].year+'</option>'); 
                                 }
                              }
                        }else{
                          $("#chart7_options").append('<option selected value="'+response.default+'">'+response.default+'</option>');
                        }
                      } else if(type == 'chart5_options' || type == 'chart6_options' || type == 'chart7_options'){
                          if(option == 'DAY'){
                            if(response.default){
                              $("#"+type).append('<option selected value="'+response.default.year+'-'+response.default.month+'">'+response.default.year+'-'+response.default.monthname+'</option>'); 
                            }else{
                             for (let i = 0; response.length > i; i++){
                                 if(response.length + 1 == i){
                                   $("#"+type).append('<option selected value="'+response[i].year+'-'+response[i].month+'">'+response[i].year+'-'+response[i].monthname+'</option>'); 
                                 }else{
                                  $("#"+type).append('<option value="'+response[i].year+'-'+response[i].month+'">'+response[i].year+'-'+response[i].monthname+'</option>'); 
                                 }
                              }
                            }
                          }else{
                            if(response.default){
                              $("#"+type).append('<option selected value="'+response.default+'">'+response.default+'</option>'); 
                            }else{
                             for (let i = 0; response.length > i; i++){
                                 if(response.length - 1 == i){
                                   $("#"+type).append('<option selected value="'+response[i].year+'">'+response[i].year+'</option>'); 
                                 }else{
                                  $("#"+type).append('<option value="'+response[i].year+'">'+response[i].year+'</option>'); 
                                 }
                              }
                            }
                          }
                          return true;
                        }
                  }else{
                  }
                break;
              }
              case 'profile':{
                if(response!=false){
                  // if(response.country){
                  //   let optgroup = '<optgroup label="Other countries">';
                  //   for(let i = 0; i<response.country.length; i++){
                  //      if(response.country[i].iso=="PH" || response.country[i].iso=="US" || response.country[i].iso=="GB"){
                  //       $('select[name="country"]').append('<option phonecode="'+response.country[i].phonecode+'" value="'+response.country[i].iso+'">'+response.country[i].country_name+'</option>')
                  //      }else{
                  //         optgroup += '<option phonecode="'+response.country[i].phonecode+'" value="'+response.country[i].iso+'">'+response.country[i].country_name+'</option>';
                  //      }
                  //   }
                  //   $('select[name="country"]').append(optgroup+'</optgroup>');
                  // }
                  // if(response.country){
                  //   let optgroup = '<optgroup label="Others">';
                  //   for(let i = 0; i<response.country.length; i++){
                  //      if(response.country[i].iso=="PH"){
                  //       $('select[name="phonecode"]').append('<option value="'+response.country[i].phonecode+'">+'+response.country[i].phonecode+'</option>');
                  //      }else{
                  //         optgroup += '<option value="'+response.country[i].phonecode+'">+'+response.country[i].phonecode+'</option>';
                  //      }
                  //   }
                  //   $('select[name="phonecode"]').append(optgroup+'</optgroup>');
                  // }
                  if(response.bank){
                    for(let i=0; i<response.bank.length;i++){
                      $('select[name="mop"]').append('<option value="'+response.bank[i].mop_code+'">'+response.bank[i].description+'</option>');
                    }
                  }
                  $("#kt_profile_avatar").on('change',function(e) {
                    e.preventDefault();
                    if($('#profile_avatar')[0].files[0]){
                      _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Saving...'), _constructForm(['user_profile','save_profile_image',$('#profile_avatar')[0].files[0]]));
                    }
                  });
                  if(response.profile){
                    const obj1=document.getElementById("total-sale");animateValueDecimal(obj1, 0, parseFloat(response.profile.generated_sales) + parseFloat(response.profile.product_gensales), 1000);
                    $('input[name="fname"]').val(response.profile.fname);
                    $('input[name="mname"]').val(response.profile.mname);
                    $('input[name="lname"]').val(response.profile.lname);
                    $('#kt_profile_avatar').css('background-image', 'url(../../images/user_images/'+response.profile.image+')');
                    $('select[name="country"] option[value="'+response.profile.country+'"]').prop("selected", true).change();
                    $('select[name="phonecode"] option[value="'+response.profile.phone_code+'"]').prop("selected", true).change();
                    $('input[name="city"]').val(response.profile.city);
                    $('input[name="mobile"]').val(response.profile.mobile);
                    $('input[name="email"]').val(response.profile.email);
                    $('input[name="username"]').val(response.profile.username);
                    $('input[name="bday"]').val(response.profile.birthday);
                    if(response.profile.email_verified==1){
                      $('#contact_info_form > div.card.card-custom.h-xl-600px > div.card-body > div:nth-child(6) > div > div.input-group.input-group-lg.input-group-solid > div.input-group-append').empty().append('\
                                        <span class="input-group-text text-primary">\
                                           Verified<i class="fas fas fa-check text-primary ml-3"></i>\
                                        </span>');
                      $('input[name="email"]').attr('disabled',true);
                    }
                    if(response.profile.mobile_verified==1){
                      $('#contact_info_form > div.card.card-custom.h-xl-600px > div.card-body > div:nth-child(5) > div > div > div.input-group-append').empty().append('\
                                        <span class="input-group-text text-primary">\
                                           Verified<i class="fas fas fa-check text-primary ml-3"></i>\
                                        </span>');
                      $('input[name="mobile"]').attr('disabled',true);
                     
                    }
                    // sidebar
                    $('.full_name').text(response.profile.fname+" "+response.profile.lname);
                    $('.user_type').text('#'+response.profile.username);
                    $('.image').empty().append((response.profile.image=='default.png')? '<span class="font-size-h3 symbol-label font-weight-boldest text-uppercase">'+response.profile.fname[0]+'</span>' : '<div class="symbol-label"  style="background-image:url(../../images/user_images/'+response.profile.image+')"><i class="symbol-badge bg-success"></div>');

                    //bank
                    $('input[name="acc_name"]').val(response.profile.acc_name);
                    $('input[name="acc_number"]').val(response.profile.acc_number);
                    $('input[name="acc_mobile"]').val(response.profile.acc_mobile);
                    $('select[name="mop"] option[value="'+response.profile.mop+'"]').prop("selected", true);
                  }
                  if(response.avatar){
                    for(let i=0;i<response.avatar.length;i++){
                      $('#avatars').append('<div class="col-3 mr-5">\
                                            <a href="javascript:void(0)" class="btn btn-block text-dark-50 text-center btn-pill">\
                                            <span class="svg-icon svg-icon-2x svg-icon-primary">\
                                            <div class="overlay">\
                                            <div class="overlay-wrapper rounded bg-light text-center">\
                                            <div class="symbol symbol-80 symbol-sm-120 symbol-circle symbol-success overflow-hidden">\
                                            <span class="symbol-label">\
                                            <img id="this_avatar" src="../../images/avatars/'+response.avatar[i].value+'" alt="" class="mw-100 w-auto">\
                                            </span>\
                                            </div>\
                                            </div>\
                                            <div class="overlay-layer px-18">\
                                            <button class="btn btn-sm btn-light font-weight-boldest btn-pill" this_avatar data-id="'+response.avatar[i].value+'">Select</button>\
                                            </div>\
                                            </div>\
                                            </span>\
                                            </a>\
                                            </div>');
                    }
                  }
                  $('button[this_avatar]').on('click', function(e){
                    e.preventDefault();
                    _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Saving...'), _constructForm(['user_profile','save_profile_image','',$(this).attr('data-id'),'avatar']));
                  });
                  
                  $('#bank_info_form > div > div.card-header.py-3 > div.card-toolbar > a').on('click', function(){
                    address='new_address';
                    shipping_addr="";
                    $('.title-header').text('Add Address');
                    $('#add_address').modal('show');
                  })
                  _initAddress2('addr_region',response.region);
                  _initAddr();
                }else{
                  // _showToast('info','Nothing Changes');
                  _showSwal('error','Oopps! Something went wrong, please check your internet connection');
                }
              break;
              }
              case 'verify_code_email':
              case 'verify_email':{
                if(response==true){
                  $('#pin_code_modal').modal('hide');
                  _showSwal('success',"Your email is now verified!");
                  $('#contact_info_form > div.card.card-custom.h-xl-600px > div.card-body > div:nth-child(6) > div > div.input-group.input-group-lg.input-group-solid > div.input-group-append').empty().append('\
                                        <span class="input-group-text text-primary">\
                                           Verified<i class="fas fas fa-check text-primary ml-3"></i>\
                                        </span>');
                  $('input[name="email"]').attr('disabled',true);
                  $('#kt_quick_user > div.offcanvas-content.pr-5.mr-n5.scroll.ps > div.d-flex.align-items-center.mt-5 > div.d-flex.flex-column > div > a.navi-item > span > span.navi-text.text-muted.text-hover-primary').text($('input[name="email"]').val());
                }else if(response=='verify'){
                  _initPINcode('.verify_email','Verify','email',30000,$('input[name="email"]').val());
                }else{
                  _showSwal('info',response);
                }
                break;
              }
              case 'verify_code_mobile':
              case 'verify_mobile':{
                if(response==true){
                  $('#pin_code_modal').modal('hide');
                  _showSwal('success',"Your mobile number is now verified!");
                  $('#contact_info_form > div.card.card-custom.h-xl-600px > div.card-body > div:nth-child(5) > div > div > div.input-group-append').empty().append('\
                                        <span class="input-group-text text-primary">\
                                           Verified<i class="fas fas fa-check text-primary ml-3"></i>\
                                        </span>');
                  $('input[name="mobile"]').attr('disabled',true);
                }else if(response=='verify'){
                  _initPINcode('.verify_mobile','Verify','mobile',300000,$('input[name="mobile"]').val());
                }else{
                  _showSwal('info',response);
                }
                break;
              }
              case 'save_profile_image':{
                _showToast(response.type,response.message);
                if(response.result!=false){
                $('#kt_profile_avatar > div').css('background-image', 'url(../)');
                $('#kt_header_mobile_topbar_toggle > span > div').css('background-image', 'url(../../images/user_images/'+response.image+')');
                $('#kt_profile_avatar').css('background-image', 'url(../../images/user_images/'+response.image+')');
                $('#kt_quick_user > div.offcanvas-content.pr-5.mr-n5.scroll > div.d-flex.align-items-center.mt-5 > div.symbol.symbol-100.mr-5.symbol-light-primary,#kt_quick_user_toggle > span').empty().append('<div class="symbol-label" style="background-image:url(../../images/user_images/'+response.image+')"></div>');
                $('.image').empty().append('<div class="symbol-label" style="background-image:url(../../images/user_images/'+response.image+')"></div>');
                }
                break;
              }
               case 'encashment':{
                if(response!=false){
                  if(response.bank){
                    for(let i=0; i<response.bank.length;i++){
                      $('select[name="encashment_mop"]').append('<option value="'+response.bank[i].mop_code+'">'+response.bank[i].description+'</option>');
                    }
                    $('.kt-selectpicker').selectpicker();
                  }
                  if(response.user){
                   $('input[name="acc_name"]').val(response.user.acc_name);
                   $('input[name="acc_number"]').val(response.user.acc_number);
                   $('input[name="mobile"]').val(response.user.acc_mobile);
                   $('select[name="encashment_mop"] option[value="'+response.user.mop+'"]').prop("selected", true).change();
                   if(response.user.kyc_status!='S'){
                    $('#encashment-card-footer').empty().append('<div class="alert alert-custom alert-notice alert-light-danger fade show py-0 px-3 m-0" role="alert">\
                      <div class="alert-icon icon-xs"><i class="flaticon-warning"></i></div>\
                        <div class="alert-text text-center">You must setup your <strong>KYC</strong> before you can request payout.</div>\
                        <div class="alert-close">\
                          <a href="setup_kyc" type="button" class="btn btn-outline-danger some-link">SETUP NOW</a>\
                        </div>\
                      </div>');
                   }else{
                    KTFormControls.init('kyc_approved');
                   }
                   $('#encashment-card-footer').css('visibility','visible');
                  }
                  if(response.comm){
                    const obj1=document.getElementById("total-e-comm");animateValueDecimal(obj1, 0, response.comm.total_e_comm, 1000,3);
                    const obj2=document.getElementById("total-e-wallet");animateValueDecimal(obj2, 0, response.comm.total_e_wallet, 1000,3);
                    const obj3=document.getElementById("total-encashment");animateValueDecimal(obj3, 0, response.comm.total_encashment, 1000,3);

                    $('#total-payout').text(numberFormat(response.comm.total_payout,3));
                    $('#total-transferred').text(numberFormat(response.comm.total_transferred_comm,3));
                    // $('#transfer-to-wallet').attr('data-amount',moneyFormat(response.comm.balance_e_comm,3));
                    // if(response.comm.balance_e_comm<=0){
                    //   $('#transfer-to-wallet').remove();
                    // }else{
                    //   $('#transfer-to-wallet').css('visibility','visible');
                    //   comm_balance=response.comm.balance_e_comm;
                    //   $('.comm-balance').text('E-Comm Balance: '+moneyFormat(comm_balance,3));
                    // }

                    $("#transfer-comm").off().on('click', function(e){
                      e.preventDefault();
                      
                      Swal.fire({
                        title: "Transfer Commission Form",
                        html: '<div class="form-group">\
                                <label class="required float-left">Receiver\'s UserID:</label>\
                                <input type="text" class="form-control" placeholder="Enter UserID" name="receiver_username"/>\
                                <span class="form-text text-muted float-left">Please enter receiver\'s username</span>\
                              </div>\
                              <div class="form-group">\
                                <label class="required float-left">Payout Amount:</label>\
                                <input type="text" class="form-control" autocomplete="off"  placeholder="0.000" name="ecomm_amount" style="text-align: right;"/>\
                                <span class="form-text text-muted float-left">Total Balance: <span class="text-danger ml-1" id="total-ecomm">'+moneyFormat(response.comm.total_e_wallet,2)+'</span></span>\
                              </div>\
                                ',
                        icon: "question",
                        showCancelButton: true,
                        buttonsStyling: false,
                        confirmButtonText: "Yes, transfer!",
                        cancelButtonText: "No, cancel",
                        customClass: {
                          confirmButton: "btn font-weight-bold btn-warning",
                          cancelButton: "btn font-weight-bold btn-default"
                        },
                        preConfirm: () => {
                          if ($('input[name="ecomm_amount"]').val()=='') {
                            Swal.showValidationMessage('Amount is required.')
                          }
                          if ($('input[name="receiver_username"]').val()=='') {
                            Swal.showValidationMessage('Receiver\'s username is required.')
                          }
                        },
                        willOpen: () => {
                          $('input[name="ecomm_amount"]').mask('000,000.000', {
                              reverse: true,
                              numericInput: false
                          });
                        }
                      }).then(function (result) {
                        if(result.value){
                          transfer_to_username=$('input[name="receiver_username"]').val();
                          transfer_comm_amount=$('input[name="ecomm_amount"]').val();
                          Swal.fire({
                            title: 'Enter your password',
                            input: 'password',
                            // inputLabel: 'Password',
                            inputPlaceholder: 'Enter your password',
                            showCancelButton: true,
                            cancelButtonText: "Cancel",
                            confirmButtonText: "Proceed",
                            inputAttributes: {
                              // maxlength: 10,
                              autocapitalize: 'off',
                              autocorrect: 'off'
                            },
                            inputValidator: (value) => {
                              if (!value) {
                                return 'Please enter your password.'
                              }
                            }
                          }).then(function(result) {
                            if(result.value){
                              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['user_password_required','password_check','transfer_comm',result.value]));//password
                            }
                          });
                          
                        }
                      })
                    })
                  }
                  if(response.details){
                    $('input[name="ex-income"]').val(response.details.income);
                    $('input[name="ex-tax"]').val(response.details.tax);
                    $('input[name="ex-txnfee"]').val(response.details.txn_fee);
                    $('input[name="ex-total"]').val(response.details.total);
                  }

                }else{
                  _showSwal('error','Oopps! Something went wrong, please check your internet connection');
                }
                break;
              }
              case 'transfer_comm':{
                if(response){
                  if(response.comm){
                    Swal.fire({
                      text: "You have successfuly transferred you commission.",
                      icon: "success",
                      showCancelButton: false,
                      confirmButtonText: "Ok, Got it",
                      reverseButtons: true
                    }).then(function(result) {
                      const obj1=document.getElementById("total-e-comm");animateValueDecimal(obj1, 0, response.comm.total_e_comm, 1000,3);
                      const obj2=document.getElementById("total-e-wallet");animateValueDecimal(obj2, 0, response.comm.total_e_wallet, 1000,3);
                      const obj3=document.getElementById("total-encashment");animateValueDecimal(obj3, 0, response.comm.total_encashment, 1000,3);
                      $('#total-payout').text(numberFormat(response.comm.total_payout,3));
                      $('#total-transferred').text(numberFormat(response.comm.total_transferred_comm,3));
                    });
                  }else{
                    _showSwal('info',response);
                  }
                }else{
                  _showSwal('info','Oopps! Something went wrong, please check your internet connection');

                }
                break;
              }
              case 'setup_kyc':{
                if(response!=false){
                  if(response.id){
                    for(let i=0; i<response.id.length;i++){
                      $('select[name="id_type1"],select[name="id_type2"]').append('<option value="'+response.id[i].id+'">'+response.id[i].type+'</option>');
                    }
                  }
                  
                  if(response.user.email_verified==1 ){//&& response.user.mobile_verified==1
                    if(response.kyc){
                       KTUppy.init(response.kyc.kyc_id,response.kyc.status);
                      $('input[name="full_name"]').val(response.kyc.full_name);
                      $('input[name="email"]').val(response.kyc.email);
                      $('input[name="tin"]').val(response.kyc.tin);
                      $('input[name="gender"]').val(response.kyc.email);
                      $('select[name="gender"] option[value="'+response.kyc.gender+'"]').prop("selected", true);
                      $('input[name="nationality"]').val(response.kyc.nationality);
                      $('select[name="civil_status"] option[value="'+response.kyc.civil_status+'"]').prop("selected", true);
                      $('input[name="bday"]').val(response.kyc.birthdate);
                      $('input[name="address"]').val(response.kyc.address);
                      $('input[name="mobile"]').val(response.kyc.mobile);
                      $('input[name="beneficiary"]').val(response.kyc.beneficiary);
                      $('input[name="emergency_person"]').val(response.kyc.emergency_person);
                      $('input[name="emergency_number"]').val(response.kyc.emergency_number);
                      $('select[name="id_type1"] option[value="'+response.kyc.id_type_1+'"]').prop("selected", true);
                      $('input[name="id_number1"]').val(response.kyc.id_number_1);
                      // $('select[name="id_type2"] option[value="'+response.kyc.id_type_2+'"]').prop("selected", true);
                      // $('input[name="id_number2"]').val(response.kyc.id_number_2);
                      if(response.kyc.status=='P' || response.kyc.status=='S'){
                        $("#kyc_form :input").prop("disabled", true);
                        $('#kyc_form > div.card-body > div.card-footer.pb-0 > div > button').remove();
                      }
                      if(response.kyc.status=='S'){
                        $('#alert-kyc').empty().append('<div class="alert alert-custom alert-notice alert-light-success fade show" role="alert">\
                              <div class="alert-icon"><i class="flaticon-interface-5"></i></div>\
                              <div class="alert-text"><b>APPROVED</b>!.</div>\
                              <div class="alert-close">\
                                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                      <span aria-hidden="true"><i class="ki ki-close"></i></span>\
                                  </button>\
                              </div>\
                          </div>');
                      }else if(response.kyc.status=='P'){
                        $('#alert-kyc').empty().append('<div class="alert alert-custom alert-notice alert-light-warning fade show" role="alert">\
                            <div class="alert-icon"><i class="flaticon-exclamation-1"></i></div>\
                            <div class="alert-text">Your application is currently <b>PENDING</b>. We&apos;re doing are best to process your KYC application as soon as possible.</br>You can check back later.</div>\
                            <div class="alert-close">\
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                    <span aria-hidden="true"><i class="ki ki-close"></i></span>\
                                </button>\
                            </div>\
                        </div>');
                      }else if(response.kyc.status=='C'){
                        $('#alert-kyc').empty().append('<div class="alert alert-custom alert-notice alert-light-danger fade show" role="alert">\
                            <div class="alert-icon"><i class="flaticon-warning"></i></div>\
                            <div class="alert-text">Your last application is <b>invalid</b>!</div>\
                            <div class="alert-close">\
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                    <span aria-hidden="true"><i class="ki ki-close"></i></span>\
                                </button>\
                            </div>\
                        </div>');
                      }
                    }
                    if(response.user){
                      $('input[name="email"]').val(response.user.email);
                    }
                    if(response.user){
                      $('input[name="mobile"]').val(response.user.mobile);
                    }
                  }else{
                    Swal.fire({
                      title: 'Hello, '+response.user.fname+' !',
                      text: 'Your email  is not verified yet. Please verify it first before creating KYC application',//and mobile number
                      footer: '<a href="profile/?view=contact-info">Verify Now!</a>',
                      icon: "warning",
                      buttonsStyling: true,
                      confirmButtonText: "Ok, got it!",
                      customClass: {
                        confirmButton: "btn font-weight-bold btn-primary"
                      }
                    }).then(function () {
                          // _loadpage('profile');
                    })
                    $("#kyc_form :input").prop("disabled", true);
                    $('#kyc_form > div.card-body > div.card-footer.pb-0 > div > button').remove();
                    $('#alert-kyc').empty().append('<div class="alert alert-custom alert-notice alert-light-primary fade show" role="alert">\
                              <div class="alert-icon"><i class="fab la-expeditedssl"></i></div>\
                              <div class="alert-text">Please verify your <b>EMAIL ADDRESS</b> <!--- and <b>MOBILE NUMBER</b> --->before creating KYC application.</br>\
                              <a href="profile/?view=contact-info" text-white><b>Click here to verify.</b></a></div>\
                              <div class="alert-close">\
                                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                      <span aria-hidden="true"><i class="ki ki-close"></i></span>\
                                  </button>\
                              </div>\
                          </div>');
                  }
                  
                }else{
                  _showSwal('error','Oopps! Something went wrong, please check your internet connection');
                }
                break;
              }
              case 'address':{
                if(response!=false){
                      let container=$('#bank_info_form > div > div.card-body.px-md-30');
                      container.empty();
                    for(let i=0; i<response.length; i++){
                      let status='';
                      if(response[i].addr_status==1){
                        status='<span class="label label-primary label-inline font-weight-bolder ml-2">Default</span>';
                      }
                      let $html=$('<div class="dash-border py-5 gutter-b">\
                                  <div class="row d-flex justify-content-between px-5">\
                                      <h5 class="font-weight-bold mb-6">'+response[i].addr_type+' Address '+status+'</h5>\
                                      <div class="btn-toolbar" role="toolbar">\
                                          <div class="btn-group mr-2" role="group">\
                                              <button type="button" class="btn btn-outline-secondary btn-icon" title="edit"><i class="la la-pencil-square-o"></i></button>\
                                              <button type="button" class="btn btn-outline-secondary btn-icon" title="delete"><i class="la la-remove"></i></button>\
                                              <button type="button" class="btn btn-outline-secondary btn-icon" title="default"><i class="la la-star-o"></i></button>\
                                          </div>\
                                      </div>\
                                  </div>\
                                  <div class="d-flex justify-content-center align-items-center">\
                                    <label class="col-xl-3 col-lg-3 col-form-label">Full name</label>\
                                    <div class="col-lg-9 col-xl-6">\
                                      <span class="font-weight-bolder">'+response[i].addr_name+'</span>\
                                    </div>\
                                  </div>\
                                  <div class="d-flex justify-content-center align-items-center">\
                                    <label class="col-xl-3 col-lg-3 col-form-label">Contact:</label>\
                                    <div class="col-lg-9 col-xl-6">\
                                        <span class="font-weight-bolder">'+response[i].addr_mobile+' | '+response[i].addr_email+'</span>\
                                    </div>\
                                  </div>\
                                  <div class="d-flex justify-content-center align-items-center">\
                                    <label class="col-xl-3 col-lg-3 col-form-label">Address</label>\
                                    <div class="col-lg-9 col-xl-6">\
                                        <span class="font-weight-bolder">'+response[i].addr_street+'</br></span>\
                                        <span class="font-weight-bolder">'+response[i].addr_barangay+', '+response[i].addr_city+'  '+response[i].addr_postal+'</br></span>\
                                        <span class="font-weight-bolder">'+response[i].addr_province+', '+response[i].addr_region+'</span>\
                                    </div>\
                                  </div>\
                                </div>');
                      container.append($html).promise().done(function(){
                        let id=response[i].id;
                        if(response[i].addr_status==1){
                          $('div:nth-child('+(i+1)+') > div.row.d-flex.justify-content-between.px-5 > div > div > button:nth-child(3)').addClass('active');
                        }
                        $('div:nth-child('+(i+1)+') > div.row.d-flex.justify-content-between.px-5 > div > div > button:nth-child(1)').on('click', function(e){
                            e.preventDefault();
                            shipping_addr=id;
                            address='update_address';
                            _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_address', 'get_shipping_address',id]));
                          })
                        $('div:nth-child('+(i+1)+') > div.row.d-flex.justify-content-between.px-5 > div > div > button:nth-child(3)').on('click', function(e){
                            e.preventDefault();
                            shipping_addr=id;
                            _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_address', 'update_default',id]));
                          })
                        $('div:nth-child('+(i+1)+') > div.row.d-flex.justify-content-between.px-5 > div > div > button:nth-child(2)').on('click', function(e){
                            e.preventDefault();
                            shipping_addr=id;
                            _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_address', 'delete_address',id]));
                          })
                      })
                    }
                  }else{
                    $('#bank_info_form > div > div.card-body.px-md-30').empty().append('<p class="font-weight-boldest display-5 ">No shipping address.</p>');
                  }
                  break;
              }
              case 'fetch_province':{
                if(response!=false){
                  $('select[name="addr_province"]').empty().append('<option value="">Select Province</option>');
                   for(let i=0; i<response.province.length; i++){
                      $('select[name="addr_province"]').append('<option value="'+response.province[i].code+'">'+response.province[i].province+'</option>');
                    }
                }else{
                  _showSwal('error','Oopps! Something went wrong, please check your internet connection');
                }
                break;
              }
              case 'fetch_city':{
                if(response!=false){
                  $('select[name="addr_city"]').empty().append('<option value="">Select City</option>');
                   for(let i=0; i<response.city.length; i++){
                      $('select[name="addr_city"]').append('<option value="'+response.city[i].code+'">'+response.city[i].city+'</option>');
                    }
                }else{
                  _showSwal('error','Oopps! Something went wrong, please check your internet connection');
                }
                break;
              }
              case 'fetch_barangay':{
                if(response!=false){
                   for(let i=0; i<response.barangay.length; i++){
                      $('select[name="addr_barangay"]').append('<option value="'+response.barangay[i].code+'">'+response.barangay[i].barangay+'</option>');
                    }
                }else{
                  _showSwal('error','Oopps! Something went wrong, please check your internet connection');
                }
                break;
              }
              case 'get_shipping_address':{
                if(response!=false){
                  _initUserAddress(response.region,response.province,response.city,response.brgy);
                  if(response.addr){
                    $('.title-header').text('Edit Address');
                    $('input[name="addr_name"]').val(response.addr.addr_name);
                    $('input[name="addr_email"]').val(response.addr.addr_email);
                    $('input[name="addr_mobile"]').val(response.addr.addr_mobile);
                    $('input[name="addr_street"]').val(response.addr.addr_street);
                    $('select[name="addr_region"] option[value="'+response.addr.addr_region+'"]').prop("selected", true);
                    $('select[name="addr_province"] option[value="'+response.addr.addr_province+'"]').prop("selected", true);
                    $('select[name="addr_city"] option[value="'+response.addr.addr_city+'"]').prop("selected", true);
                    $('select[name="addr_barangay"] option[value="'+response.addr.addr_barangay+'"]').prop("selected", true);
                    $('input[name="postal"]').val(response.addr.postal);
                    // $('input[name="addr_type"]').attr('checked',false);
                    $('#label-'+response.addr.addr_type).click();
                    $('input[name="addr_default"]').attr('checked',(parseInt(response.addr.addr_status))? true:false);
                    $('#add_address').modal('show');
                    $('#add_address').on('hidden.bs.modal',function(){
                      let myForm = document.getElementById('shipping_address_form');
                      myForm.reset();
                    })
                  }
                }else{
                  _showSwal('error','Oopps! Something went wrong, please check your internet connection');
                }
                break;
              }
              case 'delete_customer_address':
              case 'delete_address':
              case 'update_default':{
                _showToast(response.type,response.message);
                if(response.result){
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Address...'), _constructForm(['user_address', 'address']));
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Customers...'), _constructForm(['user_customers', 'customers_list']));
                }
                break;
              }





              // CREATE ORDER - START
              case 'create_order':{
                if(response!=false){
                  _initAddr();
                  _initUserAddress(response.region,response.province,response.city,response.brgy);
                  if(response.addr){

                    $('input[name="addr_name"]').val(response.addr.addr_name);
                    $('input[name="addr_email"]').val(response.addr.addr_email);
                    $('input[name="addr_mobile"]').val(response.addr.addr_mobile);
                    $('input[name="addr_street"]').val(response.addr.addr_street);
                    $('select[name="addr_region"] option[value="'+response.addr.addr_region+'"]').prop("selected", true);
                    $('select[name="addr_province"] option[value="'+response.addr.addr_province+'"]').prop("selected", true);
                    $('select[name="addr_city"] option[value="'+response.addr.addr_city+'"]').prop("selected", true);
                    $('select[name="addr_barangay"] option[value="'+response.addr.addr_barangay+'"]').prop("selected", true);
                    $('input[name="postal"]').val(response.addr.postal);
                    $('#label-'+response.addr.addr_type).click();
                  }else{
                    if(response.my_addr){
                      $('#my_address').show().off().on('click',function(e){
                        e.preventDefault();
                        $('input[name="customer_id"]').val('MY ADDRESS');
                        $('input[name="addr_name"]').val(response.my_addr.addr_name);
                        $('input[name="addr_email"]').val(response.my_addr.addr_email);
                        $('input[name="addr_mobile"]').val(response.my_addr.addr_mobile);
                        $('input[name="addr_street"]').val(response.my_addr.addr_street);
                        $('select[name="addr_region"] option[value="'+response.my_addr.addr_region+'"]').prop("selected", true);
                        $('select[name="addr_province"] option[value="'+response.my_addr.addr_province+'"]').prop("selected", true);
                        $('select[name="addr_city"] option[value="'+response.my_addr.addr_city+'"]').prop("selected", true);
                        $('select[name="addr_barangay"] option[value="'+response.my_addr.addr_barangay+'"]').prop("selected", true);
                        $('input[name="postal"]').val(response.my_addr.postal);
                        $('#label-'+response.my_addr.addr_type).click();
                      })
                    }else{
                      $('#my_address').remove();
                    }
                  }
                  // else if(response.region){
                  //   for(let i=0; i<response.region.length; i++){
                  //     // $('select[name="addr_region"]').append('<option value="'+response.region[i].code+'">'+response.region[i].location+'</option>');
                  //   }
                  // }
                  //wallet
                  $('.wallet-balance').text('Balance: '+moneyFormat(response.comm));
                  $('input[name=wb]').val(response.comm);
                  wallet_balance=response.comm;

                  let total_page=(((response.product)?response.product.length: 0) +((response.package)?response.package.length:0))/product_display;
                  if(total_page==parseInt(total_page)){
                    total_page-=1;
                  }else{
                    total_page=parseInt(total_page);
                  }
                  let container=$('#product-list');
                  container.empty();
                  if(response.product){
                    for(let i=0; i<response.product.length; i++){
                      let overlay='<img src="../../images/product/product-480x480/'+response.product[i].thumbnail+'" alt="product" class="h-100px h-md-200px w-100 contain"/>';
                      let disable_add="";
                      overlay='<div class="overlay">\
                                  <div class="overlay-wrapper rounded bg-light text-center h-md-200px">\
                                  '+overlay+'\
                                  </div>\
                                  <div class="overlay-layer d-hidden d-md-visible">\
                                    <!---<a href="javascript:;" class="btn font-weight-bolder btn-sm btn-primary mr-2">Quick View</a>--->\
                                    <a href="javascript:;" class="btn font-weight-bolder btn-sm btn-light-primary add_to_cart_item">Add to Cart</a>\
                                  </div>\
                                </div>';
                      if(response.product[i].stock==0){
                        disable_add="disabled";
                        // overlay='<div class="offer-banner-1 text-center sm-mt-40">\
                        //              <div class="banner-image">\
                        //               <div class="line-effect">\
                        //                 '+overlay+'\
                        //                <div class="overlay2"></div>\
                        //               </div>\
                        //              </div>\
                        //              <div class="banner-content">\
                        //                <h3 class="text-uppercase text-white">Out of Stock</h3>\
                        //              </div>\
                        //           </div>';
                      }else{
                      }
                      let recent_price='';
                      if(response.product[i].show_recent!=0){
                        recent_price='<s class="font-size-sm text-muted mr-3">'+response.product[i].recent_price+'</s>';
                      }
                      let $html=$('<div class="col-md-3 col-6 border border-1 p-3 grid-item min-h-250px min-h-md-250px '+response.product[i].product_type+'"  style="position: relative;">\
                            <div class="card card-custom card-shadowless ">\
                              <div class="card-body p-2">\
                                '+overlay+'\
                                <div class="text-center mt-5 mb-md-0 mb-lg-5 mb-md-0 mb-lg-5 mb-lg-0 mb-5">\
                                  <a href="javascript:;" class="font-size-h5-md font-size-lg  font-weight-bolder text-dark-75 text-hover-primary">'+response.product[i].product_name+'</a>\
                                  <div class="d-flex flex-column flex-md-row justify-content-center mt-1">\
                                  '+recent_price+'\
                                    <span class="font-size-lg">'+response.product[i].current_price+'</span>\
                                  </div>\
                                </div>\
                              </div>\
                            </div>\
                                  <div class="d-flex justify-content-center mb-3 d-visible d-md-hidden" >\
                                  <button type="button" '+disable_add+' class="btn font-weight-bolder btn-sm btn-light-primary add_to_cart_item " style="position: absolute;bottom: 10px;">Add to Cart</button>\
                                  </div>\
                          </div>');
                      container.append($html).promise().done(function(){
                          let id=response.product[i].id;
                            // $('#product-list > div:nth-child('+(i+1)+') > div > div > div.overlay > div.overlay-layer > a.btn.font-weight-bolder.btn-sm.btn-light-primary.add_to_cart_item, #product-list > div:nth-child('+(i+1)+') > div.d-flex.justify-content-center.mb-3.d-visible.d-md-hidden > button').on('click', function(e){
                            //   _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_create_order', 'add_to_cart',id]));
                            // })
                          if(disable_add==""){
                            $('#product-list > div:nth-child('+(i+1)+') > div > div > div.overlay > div.overlay-layer > a.btn.font-weight-bolder.btn-sm.btn-light-primary.add_to_cart_item, #product-list > div:nth-child('+(i+1)+') > div.d-flex.justify-content-center.mb-3.d-visible.d-md-hidden > button').on('click', function(e){
                              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_create_order', 'add_to_cart',id]));
                            })
                          }else{
                            $('#product-list > div:nth-child('+(i+1)+') > div > div > div.overlay > div.overlay-layer > a.btn.font-weight-bolder.btn-sm.btn-light-primary.add_to_cart_item, #product-list > div:nth-child('+(i+1)+') > div.d-flex.justify-content-center.mb-3.d-visible.d-md-hidden > button').on('click', function(e){
                             _showSwal('warning','Oopps! Something went wrong ERROR-CODE(0001) Product: '+response.product[i].product_name);
                            })
                          }
                      })
                    }
                  }
                  if(response.package){
                    for(let i=0; i<response.package.length; i++){
                      let $html=$('<div class="col-md-3 col-6 border border-1 p-3 grid-item min-h-250px min-h-md-250px '+response.package[i].product_type+'" style="position: relative;">\
                            <div class="card card-custom card-shadowless ">\
                              <div class="card-body p-2">\
                                <div class="overlay">\
                                  <div class="overlay-wrapper rounded bg-light text-center h-md-200px">\
                                    <img src="../../images/packages/'+response.package[i].image+'" alt="code" class="h-100px h-md-200px w-100 contain"/>\
                                  </div>\
                                  <div class="overlay-layer d-hidden d-md-visible">\
                                    <!---<a href="javascript:;" class="btn font-weight-bolder btn-sm btn-primary mr-2">Quick View</a>--->\
                                    <a href="javascript:;" class="btn font-weight-bolder btn-sm btn-light-primary add_to_cart_code">Add to Cart</a>\
                                  </div>\
                                </div>\
                                <div class="text-center mt-5 mb-md-0 mb-lg-5 mb-md-0 mb-lg-5 mb-lg-0 mb-5">\
                                  <a href="javascript:;" class="font-size-h5 font-weight-bolder text-dark-75 text-hover-primary">'+response.package[i].package_name+'</a>\
                                  <div class="d-flex flex-column flex-md-row justify-content-center mt-1">\
                                    <span class="font-size-lg">'+response.package[i].price+'</span>\
                                  </div>\
                                </div>\
                              </div>\
                            </div>\
                            <div class="d-flex justify-content-center mb-3 d-visible d-md-hidden" >\
                                  <a href="javascript:;" class="btn font-weight-bolder btn-sm btn-light-primary add_to_cart_code " style="position: absolute;bottom: 10px;">Add to Cart</a>\
                                  </div>\
                          </div>');
                      container.append($html).promise().done(function(){
                          let id=response.package[i].id;
                          $('#product-list > div:nth-child('+($('#product-list > div > div.card.card-custom.card-shadowless > div > div.text-center.mt-5.mb-md-0.mb-lg-5.mb-md-0.mb-lg-5.mb-lg-0.mb-5 > a').length)+') > div > div > div.overlay > div.overlay-layer > a.btn.font-weight-bolder.btn-sm.btn-light-primary.add_to_cart_code,#product-list > div:nth-child('+($('#product-list > div > div > div > div.overlay > div.overlay-layer > a.btn.font-weight-bolder.btn-sm.btn-light-primary').length)+') > div.d-flex.justify-content-center.mb-3.d-visible.d-md-hidden > a').on('click', function(e){
                            _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_create_order', 'add_to_cart',id]));
                          })
                      })
                    }
                    
                  }
                  if(response.packages || response.product){
                    $('.selectpicker').selectpicker()
                    // $('.grid').isotope({
                    //   itemSelector: '.grid-item',
                    //   layoutMode: 'fitRows',
                    //   resizable: true,
                    // });
                    _isotope(total_page);
                    $('#product-type').off().on( 'change', function(){
                      $(".grid").isotope({ filter: this.value });
                      let page=$('.grid-item'+this.value+'').length/product_display;
                      if(page==parseInt(page)){
                        page-=1;
                      }else{
                        page=parseInt(page);
                      }
                       _isotope(page,this.value);
                    });





                  }else{

                  }
                }else{
                  _showSwal('error','Oopps! Something went wrong, please check your internet connection');
                }
                break;
              }
              case 'update_mop':{
                if(response!=false){
                  payment_method=response;
                  $('input[name="payment_method"]').val(response);
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('pre-loader20', '.cart-empty-page', false), _constructForm(['user_create_order', 'cart_items']));
                }else{
                  $('input[data-payment="'+payment_method+'"]').click();
                }
                break;
              }
              case 'cart_items':{
                if(response!=false){
                  if(response.cart){
                    let total_reg=response.total.price;
                    let total_dis=response.total.discount;
                    let total_price=response.total.total;
                    total_order=total_price;
                    
                    if(response.user){
                      $('input[name="addr_name"]').val(response.user.fullname).attr('readonly',true);
                      $('input[name="addr_mobile"]').val(response.user.mobile).attr('readonly',true);
                      $('input[name="addr_email"]').val(response.user.email).attr('readonly',true);
                      $('input').removeClass('is-invalid');
                      $('input').removeClass('is-valid');
                      $('div.form-group').removeClass('fv-plugins-icon-container has-danger').removeClass('has-success');
                      $('div.form-group').removeClass('has-success');
                      $('div.fv-plugins-message-container').removeClass('fv-plugins-message-container');
                      $('div.fv-help-block').remove();
                    }
                   
                    
                    let mop='regular';
                    $('.cart-empty-page').empty();
                    //GET PAYMENT METHOD
                    if(response.total.payment_method){
                      payment_method=response.total.payment_method;
                    }else{
                      payment_method='pay-with-xendit';
                    }

                    //CHECK IF CART HAS CODE/S
                    $('input[name="cod"]').val(response.cart[response.cart.length-1].cod);
                    if(response.cart[response.cart.length-1].cod){
                      $('#stylishRadio5').prop('disabled',true);
                      prev_mop=payment_method;
                      if(payment_method='pay-with-cod'){
                        payment_method='pay-with-dragonpay';
                      }
                    }else{
                      $('#stylishRadio5').prop('disabled',false);
                    }
                    //ALERT ONLLY
                    $(".cod-alert").remove();
                    if(payment_method=='pay-with-dragonpay'){
                      mop='member';
                    }else if(payment_method=='pay-with-wallet'){
                      mop='member';
                    }else if(payment_method=='pay-with-cod'){
                      mop=response.total.price_type;
                      if(mop=='regular'){
                        $('#customer_form > div.row > div.flex-row-fluid.col-md-8 > div > div.card-body.pb-0').append('<div class="alert alert-custom alert-outline-danger fade show mb-5  py-0 cod-alert" style="margin-top:auto !important;" role="alert">\
                                        <div class="alert-icon"><i class="flaticon-danger"></i></div>\
                                        <div class="alert-text text-center">Discount <b class="text-danger">Not Applied.</b> <a id="change_cod_option" href="javascript:;" class="btn btn-text-dark-50 btn-icon-primary font-weight-bold btn-hover-bg-light mx-3"><i class="flaticon2-refresh"></i> Change Option</a>NOTE: For COD only</div>\
                                    </div>');
                      }else if(mop=='member'){
                        $('#customer_form > div.row > div.flex-row-fluid.col-md-8 > div > div.card-body.pb-0').append('<div class="alert alert-custom alert-outline-warning fade show mb-5  py-0 cod-alert" style="margin-top:auto !important;" role="alert">\
                                        <div class="alert-icon"><i class="flaticon-warning"></i></div>\
                                        <div class="alert-text text-center">Discount <b class="text-warning">Applied.</b><a id="change_cod_option" href="javascript:;" class="btn btn-text-dark-50 btn-icon-primary font-weight-bold btn-hover-bg-light mx-3"><i class="flaticon2-refresh"></i> Change Option</a> NOTE: For COD only</div>\
                                    </div>');
                      }
                     
                    }
                    if(prev_mop!=payment_method){
                      _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, false), _constructForm(['user_create_order', 'update_mop',payment_method,mop]));
                      prev_mop=payment_method;
                    }

                    //wallet
                    let total_wallet_applied=response.total.wallet;
                    if(payment_method!='pay-with-cod'){
                      $('#wallet-label').empty().append('<p class="font-weight-bold border-0 font-size-lg text-right align-self-center mb-0">Wallet</p>');
                      if(total_wallet_applied>0){
                        $('#wallet-div').empty().append('<div class="d-flex justify-content-end">\
                            <div class="alert alert-custom alert-outline-success border-dashed fade show pl-2 pr-3 py-2 w-120px" role="alert">\
                              <div class="alert-text text-center">'+moneyFormat(response.total.wallet)+'</div>\
                              <div class="alert-close">\
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                  <span aria-hidden="true">\
                                    <i class="ki ki-close"></i>\
                                  </span>\
                                </button>\
                              </div>\
                            </div>\
                          </div>');
                        $('#wallet-div > div > div > div.alert-close').on('click', function(e){
                          e.preventDefault();
                          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Processing...'), _constructForm(['user_create_order', 'remove_wallet_discount']));
                        })
                      }else{
                        $('#wallet-div').empty().append('<p class="text-right">\
                            <a href="javascript:;" class="btn btn-sm btn-outline-success" id="apply_wallet">\
                              <i class="fas fa-wallet"></i> Apply wallet\
                            </a>\
                          </p>');
                        $('#apply_wallet').off().on('click', function(e){
                          e.preventDefault();
                          $('#apply_wallet_modal').modal('show');
                        })
                      }
                    }else{
                      $('#wallet-div,#wallet-label').empty();
                    }


                    //SET PAYMENT OPTION
                    $('input[name="payment_method"]').val(payment_method);
                    $('.payment-method[data-payment="'+payment_method+'"]').click();
                    $('div[aria-labelledby]').removeClass('show');
                    $('div[aria-labelledby="'+payment_method+'"]').addClass('show');


                    if(response.total){
                      $('#cart-subtotal').text(moneyFormat(total_reg));
                      $('#cart-discount').text('-'+moneyFormat(total_dis));
                      $('#cart-total').text(moneyFormat(total_price));
                      $('input[name=tp]').val(total_price);
                      total_order=total_price;

                      if(payment_method=='pay-with-dragonpay'){
                        $('.total-order').text('Max input: '+moneyFormat(total_price-max_wallet));
                      }else{
                        $('.total-order').text('Max input: '+moneyFormat(total_price));
                      }

                      $('#cart-summary').show();
                      $('#customer_form > div.row > div.flex-row-fluid.col-md-8 > div > div.card-footer.d-flex.justify-content-md-end.justify-content-center').show();
                    }
                    $('input[name="account-exit"]').val(response.cart[response.cart.length-1].account_exit);
                    if(response.cart[response.cart.length-1].account_exit){
                      $('#customer_form > div.row > div.flex-row-fluid.col-md-8 > div > div.card-footer.d-flex.justify-content-md-end.justify-content-center.flex-column.flex-md-row.pl-lg-60 > div:nth-child(1)').empty().append('<select class="form-control" name="order-owner" style="display: none;"><option value="">Select Owner</option></select>');
                      $('#customer_form > div.row > div.flex-row-fluid.col-md-8 > div > div.card-footer.d-flex.justify-content-md-end.justify-content-center.flex-column.flex-md-row.pl-lg-60 > div:nth-child(2)').empty().append('<select class="form-control" name="order-position" style="display: none;"><option value="">Select Position</option><option value="L">Left</option><option value="R">Right</option></select>');
                      if(response.accounts){
                        for(let i=0; i<response.accounts.length; i++){
                          $('select[name="order-owner"]').append('<option value="'+response.accounts[i].username+'">'+response.accounts[i].username+'</option>');
                        }
                        $('select[name="order-owner"],select[name="order-position"]').show();
                      }
                    }else{
                      $('select[name="order-owner"],select[name="order-position"]').remove();
                    }
                    let cart_items=$('#cart-items');
                      cart_items.empty();
                        $('#cart-container').addClass('custom-table');
                        for(let i=0; i<response.cart.length; i++){
                          let regular_price=response.cart[i].reg_price;
                          let discount=response.cart[i].discount;
                          let price=response.cart[i].price;
                          let $html=$('<tr>\
                                      <td class="d-flex align-items-center font-weight-bolder">\
                                        <div class="symbol symbol-60 symbol-lg-70 flex-shrink-0 mr-4 bg-light">\
                                          <div class="symbol-label tba_image" style="background-image: url('+response.cart[i].image+')"></div>\
                                        </div>\
                                        <a href="javascript:;" class="text-dark text-hover-primary">'+response.cart[i].product_name+'</a>\
                                      </td>\
                                      <td class="text-right align-middle "><span class=" font-size-lg">'+moneyFormat(response.cart[i].unit_price)+'</span></td>\
                                      <td class="text-right align-middle"><span class=" font-size-lg">'+moneyFormat(response.cart[i].rank_price)+'</span></td>\
                                      <td class="text-right align-middle">\
                                        <div class="quantity">\
                                          <div class="quantity-button minus">\
                                            <button type="button" class="btn btn-xs btn-light-success btn-icon">\
                                              <i class="ki ki-minus icon-xs"></i>\
                                            </button>\
                                          </div>\
                                          <input type="tel" class="input-text qty text" name="quantity" title="Qty" placeholder="" inputmode="numeric">\
                                          <div class="quantity-button plus">\
                                            <button type="button" class="btn btn-xs btn-light-success btn-icon">\
                                              <i class="ki ki-plus icon-xs"></i>\
                                            </button>\
                                          </div>\
                                        </div>\
                                      </td>\
                                      <td class="text-right align-middle"><span class=" font-size-lg">'+moneyFormat(response.cart[i].price)+'</span></td>\
                                      <td class="text-right align-middle">\
                                        <a href="javascript:;" class="btn btn-danger font-weight-bolder font-size-sm">Remove</a>\
                                      </td>\
                                    </tr>');
                            cart_items.append($html).promise().done(function(){
                                let id=response.cart[i].id;
                                $('#cart-items > tr:nth-child('+(i+1)+') > td.text-right.align-middle > div > input').inputmask({
                                 "mask": "9",
                                 "repeat": 10,
                                 "greedy": false
                                });
                                $('#cart-items > tr:nth-child('+(i+1)+') > td.text-right.align-middle > div > input').val(response.cart[i].quantity);
                        
                                $('#cart-items > tr:nth-child('+(i+1)+') > td:nth-child(6) > a').on('click',async function(e){
                                  e.target.closest('tr').remove();
                                  $('#cart-summary').hide();
                                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, false), _constructForm(['user_create_order', 'remove_cart_item',id]));
                                })
                                $('#cart-items > tr:nth-child('+(i+1)+') > td.text-right.align-middle > div > input').on('blur',async function(e){
                                  $('#cart-items > tr:nth-child('+(i+1)+') > td.text-right.align-middle > div > input').val(this.value.replace(/^0+/, ''));
                                  if(this.value>parseInt(response.cart[i].stock)){
                                    $('#cart-items > tr:nth-child('+(i+1)+') > td.text-right.align-middle > div > input').val(response.cart[i].stock);
                                  }else if(this.value=="" || this.value==0){
                                    $('#cart-items > tr:nth-child('+(i+1)+') > td.text-right.align-middle > div > input').val(1);
                                  }
                                  let result = await _ajaxrequest("controller/controller.php", "POST", _constructBlockUi(false, false, false), _constructForm(['user_create_order', 'multiply_quantity_item',id,this.value]));
                                  if(result){
                                    total_reg=parseFloat(total_reg)+((parseFloat(response.cart[i].unit_price)*this.value)-parseFloat(regular_price));
                                    total_dis=parseFloat(total_dis)+((parseFloat(response.cart[i].unit_discount)*this.value)-parseFloat(discount));
                                    total_price=(parseFloat(total_price)+((parseFloat(response.cart[i].unit_total_price)*this.value)-parseFloat(price)))+parseFloat(total_wallet_applied);
                                    regular_price=parseFloat(response.cart[i].unit_price)*this.value;
                                    discount= parseFloat(response.cart[i].unit_discount)*this.value;
                                    price= parseFloat(response.cart[i].unit_total_price)*this.value;
                                    // $('#cart-items > tr:nth-child('+(i+1)+') > td:nth-child(3) > span').text(moneyFormat(regular_price));
                                    // $('#cart-items > tr:nth-child('+(i+1)+') > td:nth-child(4) > span').text(moneyFormat(discount));
                                    $('#cart-items > tr:nth-child('+(i+1)+') > td:nth-child(5) > span').text(moneyFormat(price));
                                    $('#cart-subtotal').text(moneyFormat(total_reg));
                                    $('#cart-discount').text('-'+moneyFormat(total_dis));
                                    $('#cart-total').text(moneyFormat(total_price));
                                    $('input[name=tp]').val(total_price);
                                    total_order=total_price;
                                    if(payment_method=='pay-with-dragonpay'){
                                      $('.total-order').text('Max input: '+moneyFormat(total_price-max_wallet));
                                    }else{
                                      $('.total-order').text('Max input: '+moneyFormat(total_price));
                                    }
                                    total_wallet_applied=0;
                                  }
                                })
                                
                                $('#cart-items > tr:nth-child('+(i+1)+') > td.text-right.align-middle > div > div.quantity-button.plus > button').on('click', async function(e){
                                  $('#cart-items > tr:nth-child('+(i+1)+') > td.text-right.align-middle > div :input').attr('disabled',true);
                                  let qty=$('#cart-items > tr:nth-child('+(i+1)+') > td.text-right.align-middle > div > input').val();
                                  if(parseInt(response.cart[i].stock)>qty){
                                    let result = await _ajaxrequest("controller/controller.php", "POST", _constructBlockUi(false, false, false), _constructForm(['user_create_order', 'plus_quantity_item',id]));
                                    if(result){
                                      total_reg=parseFloat(total_reg)+parseFloat(response.cart[i].unit_price);
                                      total_dis=parseFloat(total_dis)+parseFloat(response.cart[i].unit_discount);
                                      total_price=(parseFloat(total_price)+parseFloat(response.cart[i].unit_total_price))+parseFloat(total_wallet_applied);
                                      regular_price= parseFloat(response.cart[i].unit_price)+parseFloat(regular_price);
                                      discount= parseFloat(response.cart[i].unit_discount)+parseFloat(discount);
                                      price= parseFloat(response.cart[i].unit_total_price)+parseFloat(price);
                                      // $('#cart-items > tr:nth-child('+(i+1)+') > td:nth-child(3) > span').text(moneyFormat(regular_price));
                                      // $('#cart-items > tr:nth-child('+(i+1)+') > td:nth-child(4) > span').text(moneyFormat(discount));
                                      $('#cart-items > tr:nth-child('+(i+1)+') > td:nth-child(5) > span').text(moneyFormat(price));
                                      $('#cart-subtotal').text(moneyFormat(total_reg));
                                      $('#cart-discount').text('-'+moneyFormat(total_dis));
                                      $('#cart-total').text(moneyFormat(total_price));
                                      $('input[name=tp]').val(total_price);
                                      total_order=total_price;
                                      if(payment_method=='pay-with-dragonpay'){
                                        $('.total-order').text('Max input: '+moneyFormat(total_price-max_wallet));
                                      }else{
                                        $('.total-order').text('Max input: '+moneyFormat(total_price));
                                      }
                                      total_wallet_applied=0;
                                      $('#cart-items > tr:nth-child('+(i+1)+') > td.text-right.align-middle > div > input').val( function(i, oldval) {
                                          return ++oldval;
                                      });
                                      $('#cart-items > tr:nth-child('+(i+1)+') > td.text-right.align-middle > div :input').attr('disabled',false);
                                      // $('#cart-items > tr:nth-child('+(i+1)+') > td.text-right.align-middle > div > div.quantity-button.plus > button').attr('disabled',false);
                                    }
                                  }else{
                                    $('#cart-items > tr:nth-child('+(i+1)+') > td.text-right.align-middle > div :input').attr('disabled',false);
                                    $(this).attr('disabled',true);
                                    _showSwal('warning','Oopps! Something went wrong ERROR-CODE(0002)');
                                    // _showSwal('info','There are only '+response.cart[i].stock+' stock(s) for this product');
                                  }
                                })

                                $('#cart-items > tr:nth-child('+(i+1)+') > td.text-right.align-middle > div > div.quantity-button.minus > button').on('click', async function(e){
                                  $('#cart-items > tr:nth-child('+(i+1)+') > td.text-right.align-middle > div :input').attr('disabled',true);
                                  let qty=$('#cart-items > tr:nth-child('+(i+1)+') > td.text-right.align-middle > div > input').val();
                                  if(qty>1){
                                    let result = await _ajaxrequest("controller/controller.php", "POST", _constructBlockUi(false, false, false), _constructForm(['user_create_order', 'minus_quantity_item',id]));
                                    if(result){
                                      total_reg=parseFloat(total_reg)-parseFloat(response.cart[i].unit_price);
                                      total_dis=parseFloat(total_dis)-parseFloat(response.cart[i].unit_discount);
                                      total_price=(parseFloat(total_price)-parseFloat(response.cart[i].unit_total_price))+parseFloat(total_wallet_applied);
                                      regular_price= parseFloat(regular_price)-parseFloat(response.cart[i].unit_price);
                                      discount= parseFloat(discount)-parseFloat(response.cart[i].unit_discount);
                                      price= parseFloat(price)-parseFloat(response.cart[i].unit_total_price);
                                      // $('#cart-items > tr:nth-child('+(i+1)+') > td:nth-child(3) > span').text(moneyFormat(regular_price));
                                      // $('#cart-items > tr:nth-child('+(i+1)+') > td:nth-child(4) > span').text(moneyFormat(discount));
                                      $('#cart-items > tr:nth-child('+(i+1)+') > td:nth-child(5) > span').text(moneyFormat(price));
                                      $('#cart-subtotal').text(moneyFormat(total_reg));
                                      $('#cart-discount').text('-'+moneyFormat(total_dis));
                                      $('#cart-total').text(moneyFormat(total_price));
                                      $('input[name=tp]').val(total_price);
                                      total_order=total_price;
                                      if(payment_method=='pay-with-dragonpay'){
                                        $('.total-order').text('Max input: '+moneyFormat(total_price-max_wallet));
                                      }else{
                                        $('.total-order').text('Max input: '+moneyFormat(total_price));
                                      }
                                      total_wallet_applied=0;
                                      $('#cart-items > tr:nth-child('+(i+1)+') > td.text-right.align-middle > div > input').val( function(i, oldval) {
                                          return --oldval;
                                      });
                                       $('#cart-items > tr:nth-child('+(i+1)+') > td.text-right.align-middle > div :input').attr('disabled',false);
                                    }
                                  }else{
                                    Swal.fire({
                                      text: "Do you want to remove this product?",
                                      icon: "question",
                                      showCancelButton: true,
                                      buttonsStyling: false,
                                      confirmButtonText: "Yes, proceed!",
                                      cancelButtonText: "No, cancel",
                                      customClass: {
                                        confirmButton: "btn font-weight-bold btn-warning",
                                        cancelButton: "btn font-weight-bold btn-default"
                                      }
                                    }).then(function (result) {
                                      if(result.value){
                                        $('#cart-items > tr:nth-child('+(i+1)+') > td:nth-child(6) > a').click();
                                      }
                                    })
                                    $('#cart-items > tr:nth-child('+(i+1)+') > td.text-right.align-middle > div :input').attr('disabled',false);
                                    // $(this).attr('disabled',true);
                                    // _showSwal('info','There are only '+response.cart[i].stock+' stock(s) for this product');
                                  }
                                })
                            })
                        }
                        $('input[name="quantity"]').on('keydown',function(e){
                          if (invalidQuantity.includes(e.key) || ((this.value=="" || this.value==0) && e.key==0)) {
                            e.preventDefault();
                          }
                        })
                    
                  }else{
                    $('#cart-items').empty();
                    $('.cart-empty-page').empty().append('<div class="empty-icon mt-20">\
                                    <img src="assets/media/svg/empty-cart.svg"/>\
                                    </div>\
                                    <p class=""><a class="font-weight-bolder font-size-h3">Empty Cart</a></p>');
                    $('#cart-container').removeClass('custom-table');
                    $('#customer_form > div.row > div.flex-row-fluid.col-md-8 > div > div.card-footer.d-flex.justify-content-md-end.justify-content-center').attr("style", "display: none !important");
                  }

                }else{
                  _showSwal('error','Oopps! Something went wrong, please check your internet connection');
                }

                  break;
              }
              case 'add_to_cart':{
                if(response==true){
                  _showToastFast('success','Add to cart!');
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('pre-loader20', '.cart-empty-page', false), _constructForm(['user_create_order', 'cart_items']));
                }else if(response=='ERROR-CODE(0001)' || response=='ERROR-CODE(0002)'){
                  _showSwal('warning','Oopps! Something went wrong '+response);
                }else{
                  _showSwal('error','Oopps! Something went wrong, please check your internet connection');
                }
                break;
              }
              case 'remove_cart_item':{
                if(response.status !=false){
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('pre-loader20', '.cart-empty-page', false), _constructForm(['user_create_order', 'cart_items']));
                  if(response.product_type == 'TICKET'){
                      $('input[name="addr_name"]').val("").attr('readonly',false);
                      $('input[name="addr_mobile"]').val("").attr('readonly',false);
                      $('input[name="addr_email"]').val("").attr('readonly',false);
                      $('input').remveClass('is-invalid');
                      $('input').removeClass('is-valid');
                      $('div.form-group').removeClass('fv-plugins-icon-container has-danger').removeClass('has-success');
                      $('div.form-group').removeClass('has-success');
                      $('div.fv-plugins-message-container').removeClass('fv-plugins-message-container');
                      $('div.fv-help-block').remove();
                  }
                }else{
                  _showSwal('error','Oopps! Something went wrong, please check your internet connection');
                }
                break;
              }
              case 'multiply_quantity_item':
              case 'minus_quantity_item':
              case 'plus_quantity_item':{
                if(response!=false){
                  if(payment_method!='pay-with-cod'){
                    $('#wallet-label').empty().append('<p class="font-weight-bold border-0 font-size-lg text-right align-self-center mb-0">Wallet</p>');
                    $('#wallet-div').empty().append('<p class="text-right">\
                            <a href="javascript:;" class="btn btn-sm btn-outline-success" id="apply_wallet">\
                              <i class="fas fa-wallet"></i> Apply wallet\
                            </a>\
                          </p>');
                    $('#apply_wallet').off().on('click', function(e){
                      e.preventDefault();
                      $('#apply_wallet_modal').modal('show');
                    })
                  }else{
                    $('#wallet-div,#wallet-label').empty();
                  }
                  return true;
                }else{
                  _showToastFast('info','Please try again!');
                }
                break;
              }
              case 'update_wallet_discount':{
                if(response==true){
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('pre-loader20', '.cart-empty-page', false), _constructForm(['user_create_order', 'cart_items']));
                }else if(response==false){
                  _showSwal('error','Oopps! Something went wrong, please check your internet connection');
                }else{
                  _showSwal('info',response);
                }
                break;
              }
              case 'remove_wallet_discount':{
                if(response==true){
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('pre-loader20', '.cart-empty-page', false), _constructForm(['user_create_order', 'cart_items']));
                }else{
                  _showSwal('error','Oopps! Something went wrong, please check your internet connection');
                }
                break;
              }
              // CREATE ORDER - END





              //START ABOUT PACKAGE
              case 'package':{
                package_cart=[];
                KTDatatablesDataSourceAjaxClient.init('tbl_user_applied_codes',response);
                $('#container2').hide();
                $('#container1').show();
                $('#kt_tab_pane_1 > div').css('visibility','visible');
                break;
              }
              case 'scheduled_package':{
                KTDatatablesDataSourceAjaxClient.init('tbl_user_scheduled',response);
                $('#kt_tab_pane_2 > div').css('visibility','visible');
                break;
              }
              case 'complete_package':{
                KTDatatablesDataSourceAjaxClient.init('tbl_user_complete',response);
                $('#kt_tab_pane_3 > div').css('visibility','visible');
                break;
              }
              case 'package_list':{
                if(response!=false){
                  if(response.info){
                    $('#header-content').empty().append('<div class="text-center">\
                        <h3 class=" font-size-h3 mb-4 ">\
                          <a href="javascript:;" class="text-dark-75">'+response.info.package_type+' Package</a>\
                          <div class="text-muted pt-2 font-size-sm">'+response.info.code+'</div>\
                        </h3>\
                    </div>');
                  }
                  $('.back-content').empty().append('<a href="javascript:;" class="d-flex align-items-center text-hover-warning text-primary"><i class="fa la-angle-left text-primary mr-3"></i>Back</a>');
                  let container=$('#package-content');
                  container.empty();
                  if(response.package){
                    for(let i=0; i<response.package.length; i++){
                      let $html = $('<div class="col-lg-4 col-6 p-1 p-md-5 text-center">\
                                  <div class="card card-custom card-stretch pb-10 d-flex  bg-white bg-hover-primary2 rounded shadow-lg">\
                                    <div class="p-5">\
                                      <img src="../../images/product/product-480x480/'+response.package[i].thumbnail+'" alt="product" class="w-100 tba_image" />\
                                    </div>\
                                    <a href="javascript:;" class="text-dark mb-5 p-2 font-size-h4">'+response.package[i].package_name+'</a>\
                                    <br />\
                                    <p class="text-dark mb-10 p-2 d-none">\
                                      <span class="">'+response.package[i].description+'</span>\
                                    </p>\
                                    <button type="button" class="btn btn-primary mx-5 mt-auto text-uppercase font-weight-bolder px-5 px-md-15 py-3">Select</button>\
                                  </div>\
                                </div>');
                      container.append($html).promise().done(function(){
                          let id=response.package[i].id;
                          $('#package-content > div:nth-child('+(i+1)+') > div > a').on('click', function(e){
                            e.preventDefault();
                            container.empty();
                            _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('pre-loader20', '#package-content', false), _constructForm(['user_package', 'package_info',id,code_selected]));
                          })
                          $('#package-content > div:nth-child('+(i+1)+') > div > button').on('click', function(e){
                            e.preventDefault();
                            _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, false), _constructForm(['user_package', 'package_selected',id,code_selected]));
                          })
                      })
                    }
                  }else{
                    container.append('<div class="cart-empty-page">\
                                <div class="empty-icon">\
                                <img src="assets/media/svg/empty-cart.svg"/>\
                                </div>\
                                <p class=""><a class="back-content" href="javascript:;">Empty Package</a></p>\
                              </div>');
                  }
                  $('.back-content').off().on('click',function(e){
                    $('#container2').hide();
                    $('#container1').show();
                  })
                }else{
                  _showSwal('error','Oopps! Something went wrong, please check your internet connection');
                }
                break;
              }
              case 'package_remove':{
                if(response!=false){
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockContent', '#table1',false), _constructForm(['user_package', 'package']));
                }else{
                  _showSwal('error','Oopps! Something went wrong, please check your internet connection');
                }
                break;
              }
              case 'package_info':{
                if(response!=false){
                  package_selected=response.id;
                  let container=$('#package-content');
                  $('.back-content').empty().append('<a href="javascript:;" class="d-flex align-items-center text-hover-warning text-primary"><i class="fa la-angle-left text-primary mr-3"></i>Back</a>');
                  $('.back-content').off().on('click',function(e){
                    _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('pre-loader20', '#package-content',false), _constructForm(['user_package', 'package_list',code_selected]));
                  })
                  container.empty().append('<div class="card-body p-5 p-lg-5">\
                        <div class="row mb-10">\
                          <div class="col-lg-7 mb-11 mb-xxl-0 border border-1 bg-light-secondary">\
                            <div class="card-body p-0 rounded d-flex align-items-center justify-content-center">\
                              <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">\
                                <div class="carousel-inner">\
                                '+response.image+'\
                                </div>\
                                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">\
                                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>\
                                  <span class="sr-only">Previous</span>\
                                </a>\
                                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">\
                                  <span class="carousel-control-next-icon" aria-hidden="true"></span>\
                                  <span class="sr-only">Next</span>\
                                </a>\
                              </div>\
                            </div>\
                          </div>\
                          <div class="col-lg-5 pl-xxl-11 ">\
                            <h3 class="font-weight-bolder font-size-h2 mb-1">\
                              <a href="javascript:;" class="text-dark-75">'+response.product_name+'</a>\
                            </h3>\
                            <div class="text-primary font-size-lg mb-3 mt-6">What&apos;s inside?</div>\
                            '+response.item+'\
                            <div class="d-flex align-items-end mt-5"><button type="button" class="btn btn-warning font-weight-bolder px-8 text-right ">Select</button></div>\
                          </div>\
                        </div>\
                          <div class="mb-3 text-primary font-size-h4 p-2 bg-light-secondary2 rounded">Package Specifications</div>\
                            <div class="line-height-xl px-4">Supplier: <span class="text-primary">'+response.supplier+'</span></div>\
                            <div class="line-height-xl mb-7 px-4"><div class="text-warning mb-3">'+response.category+' > '+response.sub_category+'</div></div>\
                            <div class="mb-3 text-primary font-size-h4 p-2 bg-light-secondary2 rounded"">Package Description</div>\
                            <div class="line-height-xl mb-7 px-4">'+response.description+'</div>\
                            <div class="mb-4 text-primary font-size-h4 p-2 bg-light-secondary2 rounded"">Package Details</div>\
                            <div class="line-height-xl px-4 mb-7">'+response.details+'</div>\
                      </div>');
                  $('.carousel').carousel();
                  $('#package-content > div > div.row.mb-10 > div.col-lg-5.pl-xxl-11 > div.d-flex.align-items-end.mt-5 > button').on('click',function(e){
                    e.preventDefault();
                    _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, false), _constructForm(['user_package', 'package_selected',package_selected,code_selected]));
                  })
                }else{
                  // _showSwal('error','Oopps! Something went wrong, please try again later.');
                }
                break;
              }
              case 'package_selected':{
                if(response!=false){
                  if(response===true){
                    _showSwal('success','Package selected');
                    _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockContent', '#table1',false), _constructForm(['user_package', 'package']));
                  }else{
                    _showSwal('warning',response);
                  }
                }else{
                  _showSwal('error','Oopps! Something went wrong, please try again later.');
                }
                break;
              }
              // case 'schedule_package':{
              //   if(response!=false){
              //     if(response===true){
              //       _showSwal('success','Your package is successfully scheduled!');
              //       $('#kt_content > div.d-flex.flex-column-fluid > div > div > div.flex-row-fluid.col-md-8 > div > div.card-body.pt-5.px-5.px-md-10.pb-0.gutter-b > ul > li:nth-child(2) > a').click();
              //     }else{
              //       _showSwal('warning',response);
              //     }
              //   }else{
              //     _showSwal('error','Oopps! Something went wrong, please try again later.');
              //   }
              //   break;
              // }
              case 'addr_package':
              case 'change_addr':{
                if(response!=false){
                    _initAddr();
                    _initUserAddress(response.region,response.province,response.city,response.brgy);
                    if(!response.addr){
                      address_status='none';
                      if(type=="addr_package"){
                        $('#addr-'+address_used).click();
                      }
                      $(".dis").prop("disabled", false);
                      // $('#edit-addr').hide();
                      // let myForm = document.getElementById('shipping_address_form');
                      // myForm.reset();
                      // $('#submit-addr').show();
                    }else{
                      address_status='exist';
                      address_used=response.addr.addr_type;
                      shipping_addr=response.addr.id;
                      $('input[name="addr_name"]').val(response.addr.addr_name);
                      $('input[name="addr_email"]').val(response.addr.addr_email);
                      $('input[name="addr_mobile"]').val(response.addr.addr_mobile);
                      $('input[name="addr_street"]').val(response.addr.addr_street);
                      $('select[name="addr_region"] option[value="'+response.addr.addr_region+'"]').prop("selected", true);
                      $('select[name="addr_province"] option[value="'+response.addr.addr_province+'"]').prop("selected", true);
                      $('select[name="addr_city"] option[value="'+response.addr.addr_city+'"]').prop("selected", true);
                      $('select[name="addr_barangay"] option[value="'+response.addr.addr_barangay+'"]').prop("selected", true);
                      $('input[name="postal"]').val(response.addr.postal);
                      $('#label-'+response.addr.addr_type).click();
                      $('#addr-'+response.addr.addr_type).addClass('active');
                      // $(".dis").prop("disabled", true);
                      // $('#edit-addr').show();
                      // $('#submit-addr').hide();
                  }
                }else{
                  _showSwal('error','Oopps! Something went wrong, please check your internet connection');
                }
                break;
                // if(response!=false){
                //   if(response=='HOME' || response=='WORK'){
                //     _showSwal('info','Oopps! You dont have yet '+response+' address, you can setup your shipping address at your profile');
                //     $('#addr-'+response).css({'background-color':'#FFFFFF','color':'#fe940a'});
                //     $('button[data-id="'+response+'"]').addClass('active');
                //   }else if(response=='no_addr'){
                //     $('#package-addr').empty().append('<a href="profile" class="btn btn-secondary font-weight-bolder px-8 text-right">Add New Shipping Address</button>');
                //   }else{
                //     shipping_addr=response.id;
                //     $('#package-addr').empty().append('<h5 class="font-weight-bold text-dark-50 m-3 m-md-0"><a href="javascript:;" class="text-primary font-weight-bolder mr-4">'+response.addr_name+'  '+response.addr_mobile+'</a>'+response.addr_street+', '+response.brgyDesc+', '+response.citymunDesc+' '+response.postal+', '+response.provDesc+', '+response.regDesc+'</h5>');
                //     $('#addr-'+response.addr_type).addClass('active');
                //     $('#edit-addr').show();
                //   }
                // }else{
                //   _showSwal('error','Oopps! Something went wrong, please check your internet connection');
                // }
                // break;
              }
              case 'schedule_package_per_item':{
                if(response){
                   Swal.fire({
                    title:"Success",
                    text: "Your package can now schedule per item",
                    icon: "success",
                    showCancelButton: true,
                    buttonsStyling: false,
                    confirmButtonText: "Schedule package item now",
                    cancelButtonText: "No, cancel",
                    customClass: {
                      confirmButton: "btn font-weight-bold btn-warning btn-hover-warning",
                      cancelButton: "btn font-weight-bold btn-primary btn-hover-primary"
                    }
                  }).then(function (result) {
                    if (result.value) {
                      window.location.replace("package-item/?view=package_item");
                    }else{
                     $('a[name="applied_code"]').click();
                    }
                  })
                }else{
                  _showSwal('error','Oopps! Something went wrong, please check your internet connection');
                }
                break;
              }
              case 'complete_package_item':
              case 'scheduled_package_item':
              case 'package_item':{
                KTDatatablesDataSourceAjaxClient.init('tbl_'+type,response);
                $('#tab_'+type+' > div').css('visibility','visible');
                // alert(response.length);
                if(type=='package_item'){
                  for(let i=0; i<response.length; i++){
                    $('#package_touchspin_'+i+'').TouchSpin({
                      buttondown_class: 'btn btn-secondary',
                      buttonup_class: 'btn btn-secondary',
                      verticalbuttons: true,
                      verticalup: '<i class="ki ki-plus"></i>',
                      verticaldown: '<i class="ki ki-minus"></i>',
                          // buttondown_class: 'btn btn-secondary',
                          // buttonup_class: 'btn btn-secondary',
                          min: 1,
                          max: response[i].stock,
                          stepinterval: 50,
                          maxboostedstep: 10000000,
                        });
                    
                  }
                  $('input[name="quantity"]').inputmask({
                   "mask": "9",
                   "repeat": 10,
                   "greedy": false
                  });
                  $('input[name="quantity"]').off().on('change', function(e){
                    e.preventDefault();
                    package_item_cart=[];
                    $('.check-package-item').prop('checked',false);
                  })
                  $('input[name="quantity"]').on('keydown',function(e){
                    if (invalidQuantity.includes(e.key) || ((this.value=="" || this.value==0) && e.key==0)) {
                      e.preventDefault();
                    }
                  })
                  $('input[name="quantity"]').on('blur', function(e){
                      $(this).val(this.value.replace(/^0+/, ''));
                      if(this.value>parseInt($(this).attr('max'))){
                        $(this).val($(this).attr('max'));
                      }else if(this.value=="" || this.value==0){
                        $(this).val(1);
                      }
                    })
                  
                }
                break;
              }
              //END ABOUT PACKAGE


















              case 'customers_list':{
                KTDatatablesDataSourceAjaxClient.init('tbl_customer_list',response);
                _initAddr();
                $("#card-customer").delegate('.edit-customer-addr','click',function(e){
                  e.stopImmediatePropagation(); 
                  let element=$(this);
                  shipping_addr=element.attr('data-id');
                  address='update_customer_address';
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_address', 'get_shipping_address',element.attr('data-id')]));
                })
                $("#card-customer").delegate('.remove-customer-addr','click',function(e){
                  e.stopImmediatePropagation(); 
                  let element=$(this);
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_address', 'delete_customer_address',element.attr('data-id')]));
                })
                $("body").delegate('.create-order','click',function(e){
                  e.stopImmediatePropagation(); 
                  let element=$(this);
                  viewer=element.attr('data-cust');
                  _loadpage('create_order');
                  // _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_address', 'create_order',element.attr('data-id')]));
                })
                $('#card-customer > div.card-header > div.card-toolbar > a').on('click', function(){
                  address='new_customer_address';
                  shipping_addr="";
                  $('.title-header').text('Add Address');
                  $('#add_address').modal('show');
                })
                break;
              }
              case 'change_owner':
              case 'search_genealogy':
              case 'upper_genealogy':
              case 'fetch_genealogy':
              case 'genealogy':{
                if(response!=false){
                  if(genealogy.indexOf(response.owner.username) !== -1) {
                  }else{
                    genealogy.push(response.owner.username);
                  }
                  if(response.owner){
                   username1=response.owner.my_upper;
                    let thumbnail='<div class="symbol symbol-lg-75 symbol-circle symbol-light-success"><span class="font-size-h3 symbol-label font-weight-boldest text-capitalize">'+response.owner.fname[0]+response.owner.lname[0]+'</span></div>';
                    if(response.owner.image!='default'){
                      thumbnail='<div class="symbol symbol-circle symbol-lg-75"><img src="../../images/user_images/'+response.owner.image+'" alt="image"></div>';
                    }
                    $('#owner-side').empty().append('<div class="col card card-custom card-stretch zoom shadow invi" style="visibility:hidden;">\
                                            <div class="card-body text-center py-3 px-1">\
                                              <div class="mt-0 owner-image">\
                                              '+thumbnail+'\
                                              </div>\
                                              <div class="my-1">\
                                              <span>'+response.owner.fname+' '+response.owner.lname+'</span><br>\
                                                <a class="text-dark font-weight-bold text-hover-primary font-size-h4 owner-name"   data-theme="dark" title="'+response.owner.fname+' '+response.owner.lname+'">'+response.owner.username+'</a>\
                                              </div>\
                                              <div class="row">\
                                              <span class="col  text-right ml-lg-n29"></span>\
                                              <!--<div class="col "><span class="label label-inline label-lg label-light-warning btn-sm font-weight-bold owner-rank">'+response.owner.package_name+'</span></div>-->\
                                              <span class="col text-left mr-lg-n29"></span>\
                                              </div>\
                                            </div>\
                                          </div>');
                    // $('.owner-image').empty().append(thumbnail);
                    // $('.owner-name').text(response.owner.username).attr('title',);
                    // $('.owner-rank').text(response.owner.package_name);
                  }
                  $('#left-side').empty();
                  if(response.left){
                    $('.total-left').text('Left ('+response.left.length+')');
                    for(let i=0; i<response.left.length; i++){
                      let thumbnail='<div class="symbol symbol-lg-40 symbol-circle symbol-light-success cursor-pointer"><span class="font-size-h5 symbol-label font-weight-boldest text-capitalize">'+response.left[i].fname[0]+response.left[i].lname[0]+'</span></div>';
                      if(response.left[i].image!='default'){
                        thumbnail='<div class="symbol symbol-circle symbol-lg-40 cursor-pointer"><img src="../../images/user_images/'+response.left[i].image+'" alt="image"></div>';
                      }
                      let $html=$('<div class="col-xl-3 col-lg-4 col-md-4 col-sm-6" style="float: left;">\
                                    <div class="card card-custom gutter-b card-stretch zoom shadow">\
                                    <div class="card-body text-center py-3 px-1">\
                                      <div class="mt-0">'+thumbnail+'\
                                      </div>\
                                      <div class="my-1">\
                                        <small>'+response.left[i].fname+' '+response.left[i].lname+'</small><br>\
                                        <a href="javascript:;" class="text-dark font-weight-bold text-hover-primary font-size-sm"  data-theme="dark" title="'+response.left[i].fname+' '+response.left[i].lname+'">'+response.left[i].username+'</a>\
                                      </div>\
                                      <!--<span class="label label-inline label-lg label-light-warning btn-sm font-weight-bold text-capitalize">'+response.left[i].rank+'</span>-->\
                                    </div>\
                                    </div>\
                                  </div>');
                      $('#left-side').append($html).promise().done(function(){
                        $('#left-side > div:nth-child('+(i+1)+') > div > div > div.mt-0 > div > span,#left-side > div:nth-child('+(i+1)+') > div > div > div.mt-0 > div > img').on('click', function(e){
                          e.preventDefault();
                          // username1=response.left[i].username;
                          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_genealogy', 'fetch_genealogy',response.left[i].username]));
                        })
                      })
                    }
                  }else{
                    $('.total-left').text('Left');
                  }

                  // $('#right-side').empty();
                  // if(response.right){

                  //   $('.total-right').text('Right ('+response.right.length+')');
                  //   for(let i=0; i<response.right.length; i++){
                  //     let thumbnail='<div class="symbol symbol-lg-40 symbol-circle symbol-light-success cursor-pointer"><span class="font-size-h5 symbol-label font-weight-boldest text-uppercase">'+response.right[i].fname[0]+response.right[i].lname[0]+'</span></div>';
                  //     if(response.right[i].image!='default'){
                  //       thumbnail='<div class="symbol symbol-circle symbol-lg-40 cursor-pointer"><img src="../../images/user_images/'+response.right[i].image+'" alt="image"></div>';
                  //     }
                  //     let $html=$('<div class="col-xl-3 col-lg-4 col-md-4 col-sm-6" style="float: right;">\
                  //                   <div class="card card-custom gutter-b card-stretch zoom shadow">\
                  //                   <div class="card-body text-center py-3 px-1">\
                  //                     <div class="mt-0">'+thumbnail+'\
                  //                     </div>\
                  //                     <div class="my-1">\
                  //                       <small>'+response.right[i].fname+' '+response.right[i].lname+'</small><br>\
                  //                       <a class="text-dark font-weight-bold text-hover-primary font-size-sm"  data-theme="dark" title="'+response.right[i].fname+' '+response.right[i].lname+'">'+response.right[i].username+'</a>\
                  //                     </div>\
                  //                     <span class="label label-inline label-lg label-light-warning btn-sm font-weight-bold text-capitalize">'+response.right[i].rank+'</span>\
                  //                   </div>\
                  //                   </div>\
                  //                 </div>');
                  //     $('#right-side').append($html).promise().done(function(){
                  //       //#right-side > div:nth-child('+(i+1)+') > div > div > div.my-2 > a,
                  //       $('#right-side > div:nth-child('+(i+1)+') > div > div > div.mt-0 > div > span,#right-side > div:nth-child('+(i+1)+') > div > div > div.mt-0 > div > img').on('click', function(e){
                  //         e.preventDefault();
                  //         _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, "Processing..."), _constructForm(['user_genealogy', 'fetch_genealogy',response.right[i].username]));
                  //       })
                  //     })
                  //   }
                  // }else{
                  //   $('.total-right').text('Right');
                  // }
                  $('.invi').css('visibility','visible');
                  KTApp.initComponents();
                }else{

                }
                // if(response!=false){
                //   if(response.account && type!='change_owner'){
                //     if(response.account.account){
                //       $('select[name="owner"]').show();
                //     }
                //     if(response.account.acc_list){
                //       $('select[name="owner"]').empty().append('<option value="">Select Owner</option>');
                //       for(let i=0;i<response.account.acc_list.length;i++){
                //         $('select[name="owner"]').append('<option value="' +response.account.acc_list[i].username_encryp+ '">' + response.account.acc_list[i].username + '</option>')
                //       }
                //     }
                //   }
                //   if(genealogy.indexOf(response.g1.username) !== -1) {
                //   }else{
                //     genealogy.push(response.g1.username);
                //   }

                //   $('#card1,#card2,#card3,#card4,#card5,#card6,#card7').attr('class','col card card-custom gutter-b zoom m-1 m-md-5 shadow');

                //   if(response.g1){
                //     $('#card1').addClass('bg-radial-gradient-'+response.g1.package_name);
                //     $('.container1').empty().append('<div class="symbol symbol-50 symbol-lg-60 d-flex justify-content-center ">\
                //         <img class="image1" src="../../images/user_images/'+response.g1.image+'" alt="image">\
                //       </div>\
                //       <div class="d-flex justify-content-center">\
                //         <a class="text-dark-75 text-hover-primary font-size-h5 font-weight-bold  name1">'+response.g1.username+'</a>\
                //       </div>\
                //       <div class="d-flex justify-content-center">\
                //         <a class="text-dark-75 text-hover-primary font-size-lg font-weight-bold  name1">'+response.g1.fname+'</a>\
                //       </div>\
                //       <div class="d-flex justify-content-center mt-1">\
                //         <div class="d-flex flex-wrap">\
                //           <a href="javascript:;" class="text-dark-50 font-weight-bold mb-2 text-'+response.g1.package_name+'">\
                //           <i class="flaticon-star mr-2 font-size-lg pkgtype1 text-'+response.g1.package_name+'"></i><span class="package1">'+response.g1.package_name+'</span></a>\
                //         </div>\
                //       </div>');
                //     $('#image1').attr('src','../../images/user_images/'+response.g1.image);
                //     $('#name1').text(response.g1.name);
                //     $('#username1').text(response.g1.username);
                //     $('#rank1').text(response.g1.package_name);
                //     $('#sponsor1').text(response.g1.sponsor);
                //     $('#max1').text(response.g1.max_pair);
                //     $('#avail1').text(parseFloat(response.g1.max_pair-response.g1.total_pair).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                //     $('#container-view1').show();
                //     username1=response.g1.username;
                //   }else{
                //     username1='';
                //     $('.container1').empty().append('<i class="flaticon-questions-circular-button  icon-6x"></i>');
                //     $('#container-view1').hide();
                //   }
                //   if(response.g2){
                //     $('#card2').addClass('bg-radial-gradient-'+response.g2.package_name);
                //     $('.container2').empty().append('<div class="symbol symbol-50 symbol-lg-60 d-flex justify-content-center">\
                //     <img class="image2" src="../../images/user_images/'+response.g2.image+'" alt="image">\
                //   </div>\
                //   <div class="d-flex justify-content-center">\
                //     <a class="text-dark-75 text-hover-primary font-size-h5 font-weight-bold  name2">'+response.g2.username+'</a>\
                //   </div>\
                //   <div class="d-flex justify-content-center">\
                //     <a class="text-dark-75 text-hover-primary font-size-lg font-weight-bold  name2">'+response.g2.fname+'</a>\
                //   </div>\
                //   <div class="d-flex justify-content-center mt-1">\
                //     <div class="d-flex flex-wrap">\
                //       <a href="javascript:;" class="text-dark-50 font-weight-bold mb-2 text-'+response.g2.package_name+'" >\
                //       <i class="flaticon-star mr-2 font-size-lg pkgtype2 text-'+response.g2.package_name+'"></i><span class="package2">'+response.g2.package_name+'</span></a>\
                //     </div>\
                //   </div>');
                //     $('#image2').attr('src','../../images/user_images/'+response.g2.image);
                //     $('#name2').text(response.g2.name);
                //     $('#username2').text(response.g2.username);
                //     $('#rank2').text(response.g2.package_name);
                //     $('#sponsor2').text(response.g2.sponsor);
                //     $('#max2').text(response.g2.max_pair);
                //     $('#avail2').text(parseFloat(response.g2.max_pair-response.g2.total_pair).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                //     $('#container-view2').show();
                //     username2=response.g2.username;
                //   }else{
                //     username2='';
                //     $('.container2').empty().append('<i class="flaticon-questions-circular-button   icon-6x"></i>');
                //     $('#container-view2').hide();
                //   }
                //   if(response.g3){
                //     $('#card3').addClass('bg-radial-gradient-'+response.g3.package_name);
                //     $('.container3').empty().append('<div class="symbol symbol-50 symbol-lg-60 d-flex justify-content-center ">\
                //     <img class="image3" src="../../images/user_images/'+response.g3.image+'" alt="image">\
                //   </div>\
                //   <div class="d-flex justify-content-center">\
                //     <a class="text-dark-75 text-hover-primary font-size-h5 font-weight-bold  name3">'+response.g3.username+'</a>\
                //   </div>\
                //   <div class="d-flex justify-content-center">\
                //         <a class="text-dark-75 text-hover-primary font-size-lg font-weight-bold  name3">'+response.g3.fname+'</a>\
                //       </div>\
                //   <div class="d-flex justify-content-center mt-1">\
                //     <div class="d-flex flex-wrap">\
                //       <a href="javascript:;" class="text-dark-50 font-weight-bold mb-2 text-'+response.g3.package_name+'" >\
                //       <i class="flaticon-star mr-2 font-size-lg pkgtype3 text-'+response.g3.package_name+'"></i><span class="package3">'+response.g3.package_name+'</span></a>\
                //     </div>\
                //   </div>');
                //     $('#image3').attr('src','../../images/user_images/'+response.g3.image);
                //     $('#name3').text(response.g3.name);
                //     $('#username3').text(response.g3.username);
                //     $('#rank3').text(response.g3.package_name);
                //     $('#sponsor3').text(response.g3.sponsor);
                //     $('#max3').text(response.g3.max_pair);
                //     $('#avail3').text(parseFloat(response.g3.max_pair-response.g3.total_pair).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                //     $('#container-view3').show();
                //     username3=response.g3.username;
                //   }else{
                //     username3='';
                //     $('.container3').empty().append('<i class="flaticon-questions-circular-button   icon-6x"></i>');
                //     $('#container-view3').hide();
                //   }
                //   if(response.g4){
                //     $('#card4').addClass('bg-radial-gradient-'+response.g4.package_name);
                //     $('.container4').empty().append('<div class="symbol symbol-50 symbol-lg-60 d-flex justify-content-center ">\
                //     <img class="image4" src="../../images/user_images/'+response.g4.image+'" alt="image">\
                //   </div>\
                //   <div class="d-flex justify-content-center">\
                //     <a class="text-dark-75 text-hover-primary font-size-h5 font-weight-bold  name4 d-none d-md-inline">'+response.g4.username+'</a>\
                //   </div>\
                //   <div class="d-flex justify-content-center">\
                //         <a class="text-dark-75 text-hover-primary font-size-lg font-weight-bold  name4 d-none d-md-inline">'+response.g4.fname+'</a>\
                //       </div>\
                //   <div class="d-flex justify-content-center mt-1">\
                //     <div class="d-flex flex-wrap">\
                //       <a href="javascript:;" class="text-dark-50 font-weight-bold mb-2 pkgtype4 d-none d-md-inline text-'+response.g4.package_name+'">\
                //       <i class="flaticon-star mr-2 font-size-lg pkgtype4 text-'+response.g4.package_name+'"></i><span class="package4">'+response.g4.package_name+'</span></a>\
                //     </div>\
                //   </div>');
                //     $('#image4').attr('src','../../images/user_images/'+response.g4.image);
                //     $('#name4').text(response.g4.name);
                //     $('#username4').text(response.g4.username);
                //     $('#rank4').text(response.g4.package_name);
                //     $('#sponsor4').text(response.g4.sponsor);
                //     $('#max4').text(response.g4.max_pair);
                //     $('#avail4').text(parseFloat(response.g4.max_pair-response.g4.total_pair).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                //     $('#container-view4').show();
                //     username4=response.g4.username;
                //   }else{
                //     username4='';
                //     $('.container4').empty().append('<i class="flaticon-questions-circular-button  icon-lg-6x icon-4x"></i>');
                //     $('#container-view4').hide();
                //   }
                //   if(response.g5){
                //     $('#card5').addClass('bg-radial-gradient-'+response.g5.package_name);
                //     $('.container5').empty().append('<div class="symbol symbol-50 symbol-lg-60 d-flex justify-content-center ">\
                //     <img class="image5" src="../../images/user_images/'+response.g5.image+'" alt="image">\
                //   </div>\
                //   <div class="d-flex justify-content-center">\
                //     <a class="text-dark-75 text-hover-primary font-size-h5 font-weight-bold  name5 d-none d-md-inline">'+response.g5.username+'</a>\
                //   </div>\
                //   <div class="d-flex justify-content-center">\
                //         <a class="text-dark-75 text-hover-primary font-size-lg font-weight-bold  name5 d-none d-md-inline">'+response.g5.fname+'</a>\
                //       </div>\
                //   <div class="d-flex justify-content-center mt-1">\
                //     <div class="d-flex flex-wrap">\
                //       <a href="javascript:;" class="text-dark-50 font-weight-bold mb-2 pkgtype5 d-none d-md-inline text-'+response.g5.package_name+'">\
                //       <i class="flaticon-star mr-2 font-size-lg pkgtype5 text-'+response.g5.package_name+'"></i><span class="package5">'+response.g5.package_name+'</span></a>\
                //     </div>\
                //   </div>');
                //     $('#image5').attr('src','../../images/user_images/'+response.g5.image);
                //     $('#name5').text(response.g5.name);
                //     $('#username5').text(response.g5.username);
                //     $('#rank5').text(response.g5.package_name);
                //     $('#sponsor5').text(response.g5.sponsor);
                //     $('#max5').text(response.g5.max_pair);
                //     $('#avail5').text(parseFloat(response.g5.max_pair-response.g5.total_pair).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                //     $('#container-view5').show();
                //     username5=response.g5.username;
                //   }else{
                //     username5='';
                //     $('.container5').empty().append('<i class="flaticon-questions-circular-button  icon-lg-6x icon-4x"></i>');
                //     $('#container-view5').hide();
                //   }
                //   if(response.g6){
                //     $('#card6').addClass('bg-radial-gradient-'+response.g6.package_name);
                //     $('.container6').empty().append('<div class="symbol symbol-50 symbol-lg-60 d-flex justify-content-center">\
                //     <img class="image6  " src="../../images/user_images/'+response.g6.image+'" alt="image">\
                //   </div>\
                //   <div class="d-flex justify-content-center ">\
                //     <a class="text-dark-75 text-hover-primary font-size-h5 font-weight-bold  name6 d-none d-md-inline">'+response.g6.username+'</a>\
                //   </div>\
                //   <div class="d-flex justify-content-center">\
                //         <a class="text-dark-75 text-hover-primary font-size-lg font-weight-bold  name6 d-none d-md-inline">'+response.g6.fname+'</a>\
                //       </div>\
                //   <div class="d-flex justify-content-center mt-1">\
                //     <div class="d-flex flex-wrap">\
                //       <a href="javascript:;" class="text-dark-50 font-weight-bold mb-2 pkgtype6 d-none d-md-inline text-'+response.g6.package_name+'" >\
                //       <i class="flaticon-star mr-2 font-size-lg pkgtype6 text-'+response.g6.package_name+'"></i><span class="package6">'+response.g6.package_name+'</span></a>\
                //     </div>\
                //   </div>');
                //     $('#image6').attr('src','../../images/user_images/'+response.g6.image);
                //     $('#name6').text(response.g6.name);
                //     $('#username6').text(response.g6.username);
                //     $('#rank6').text(response.g6.package_name);
                //     $('#sponsor6').text(response.g6.sponsor);
                //     $('#max6').text(response.g6.max_pair);
                //     $('#avail6').text(parseFloat(response.g6.max_pair-response.g6.total_pair).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                //     $('#container-view6').show();
                //     username6=response.g6.username;
                //   }else{
                //     username6='';
                //     $('.container6').empty().append('<i class="flaticon-questions-circular-button  icon-lg-6x icon-4x"></i>');
                //     $('#container-view6').hide();
                //   }
                //   if(response.g7){
                //     $('#card7').addClass('bg-radial-gradient-'+response.g7.package_name);
                //    $('.container7').empty().append('<div class="symbol symbol-50 symbol-lg-60 d-flex justify-content-center">\
                //     <img class="image7  " src="../../images/user_images/'+response.g7.image+'" alt="image">\
                //   </div>\
                //   <div class="d-flex justify-content-center ">\
                //     <a class="text-dark-75 text-hover-primary font-size-h5 font-weight-bold  name7 d-none d-md-inline">'+response.g7.username+'</a>\
                //   </div>\
                //   <div class="d-flex justify-content-center">\
                //         <a class="text-dark-75 text-hover-primary font-size-lg font-weight-bold  name7 d-none d-md-inline">'+response.g7.fname+'</a>\
                //       </div>\
                //   <div class="d-flex justify-content-center mt-1">\
                //     <div class="d-flex flex-wrap">\
                //       <a href="javascript:;" class="text-dark-50 font-weight-bold mb-2 pkgtype7 d-none d-md-inline text-'+response.g7.package_name+'" >\
                //       <i class="flaticon-star mr-2 font-size-lg pkgtype6 text-'+response.g7.package_name+'"></i><span class="package7">'+response.g7.package_name+'</span></a>\
                //     </div>\
                //   </div>');
                //    $('#image7').attr('src','../../images/user_images/'+response.g7.image);
                //     $('#name7').text(response.g7.name);
                //     $('#username7').text(response.g7.username);
                //     $('#rank7').text(response.g7.package_name);
                //     $('#sponsor7').text(response.g7.sponsor);
                //     $('#max7').text(response.g7.max_pair);
                //     $('#avail7').text(parseFloat(response.g7.max_pair-response.g7.total_pair).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                //     $('#container-view7').show();
                //     username7=response.g7.username;
                //   }else{
                //     username7='';
                //     $('.container7').empty().append('<i class="flaticon-questions-circular-button  icon-lg-6x icon-4x"></i>');
                //     $('#container-view7').hide();
                //   }
                //   $('.container1,.container2,.container3,.container4,.container5,.container6,.container7').css('visibility','visible');
                // }else{
                //   // _showSwal('info','User ID not found');
                // }
                break;
              }
              case 'agreement':{
                if(response!=false){
                  $('.agree-sign').text(response.agreement_sign);
                  $('.agree-date').text(response.agreement_date);
                  $('#kt_content > div.d-flex.flex-column-fluid > div > div').show();
                }else{
                  _loadpage('dashboard');
                }
                break;
              }
              case 'commissions':
              case 'date_range_commissions':{
                KTDatatablesDataSourceAjaxClient.init('tbl_user_commission',response);
                break;
              }
              case 'generated_sales':
              case 'date_range_generated_sales':{
                KTDatatablesDataSourceAjaxClient.init('tbl_user_generated',response);
                break;
              }
              case 'opt_ins':
              case 'date_range_opt_ins':{
                KTDatatablesDataSourceAjaxClient.init('tbl_user_opt_ins',response);
                break;
              }
              case 'direct_referrals':
              case 'date_range_direct_referral':{
                KTDatatablesDataSourceAjaxClient.init('tbl_user_referrals',response);
                break;
              }
              case 'binary_monitoring':
              case 'date_range_binary_monitoring':{
                KTDatatablesDataSourceAjaxClient.init('tbl_user_binary',response);
                break;
              }

              case 'cancelled_order':
              case 'complete_order':
              case 'to_ship_order':
              case 'pending_order':
              case 'to_pay_order':{
                KTDatatablesDataSourceAjaxClient.init('tbl_'+type,response);
                break;
              }
              case 'count_orders':{
                if(response!=false){
                  if(response.to_pay!=0){
                    $('a[name="to_pay_order"]').text('To Pay ('+response.to_pay+')');
                  }else{
                    $('a[name="to_pay_order"]').text('To Pay');
                  }
                  if(response.pending!=0){
                    $('a[name="pending_order"]').text('Pending ('+response.pending+')');
                  }else{
                    $('a[name="pending_order"]').text('Pending');
                  }
                  if(response.to_ship!=0){
                    $('a[name="to_ship_order"]').text('To Ship ('+response.to_ship+')');
                  }else{
                    $('a[name="to_ship_order"]').text('To Ship');
                  }
                  if(response.complete!=0){
                    $('a[name="complete_order"]').text('Complete ('+response.complete+')');
                  }else{
                    $('a[name="complete_order"]').text('Complete');
                  }
                  if(response.cancelled!=0){
                    $('a[name="cancelled_order"]').text('Cancelled ('+response.cancelled+')');
                  }else{
                    $('a[name="cancelled_order"]').text('Cancelled');
                  }
                }
                break;
              }
              case 'count_packages':{
                if(response!=false){
                  if(response.applied!=0){
                    $('a[name="applied_code"]').text('Applied Codes ('+response.applied+')');
                  }else{
                    $('a[name="applied_code"]').text('Applied Codes');
                  }
                  if(response.to_ship!=0){
                    $('a[name="scheduled"]').text('Scheduled ('+response.to_ship+')');
                  }else{
                    $('a[name="scheduled"]').text('Scheduled');
                  }
                  if(response.complete!=0){
                    $('a[name="complete"]').text('Complete ('+response.complete+')');
                  }else{
                    $('a[name="complete"]').text('Complete');
                  }
                }
                break;
              }
              case 'count_package_item':{
                if(response!=false){
                  if(response.package_item!=0){
                    $('a[name="package_item"]').text('Package Item ('+response.package_item+')');
                  }
                  if(response.scheduled_package_item!=0){
                    $('a[name="scheduled_package_item"]').text('Scheduled ('+response.scheduled_package_item+')');
                  }
                  if(response.complete_package_item!=0){
                    $('a[name="complete_package_item"]').text('Complete ('+response.complete_package_item+')');
                  }
                }
                break;
              }
              // case 'view_cart':{
              //   if(response!=false){
              //     KTDatatablesDataSourceAjaxClient.init('tbl_cart_details',response);
              //     $('#view_cart').modal('show');
              //   }else{
              //     _showToast('error','Oopps! something went wrong. Please try again later.');
              //   }
              //   break;
              // }
              case 'view_cart':{
                if(response!=false){
                  if(response=="password_required"){
                    Swal.fire({
                      title: 'Enter your password',
                      input: 'password',
                      // inputLabel: 'Password',
                      inputPlaceholder: 'Enter your password',
                      showCancelButton: true,
                      cancelButtonText: "Cancel",
                      confirmButtonText: "Proceed",
                      inputAttributes: {
                        // maxlength: 10,
                        autocapitalize: 'off',
                        autocorrect: 'off'
                      },
                      inputValidator: (value) => {
                        if (!value) {
                          return 'This cart has confidential details. Please enter your password.'
                        }
                      }
                    }).then(function(result) {
                      if(result.value){
                        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['user_password_required','password_check', 'view_cart',result.value]));
                      }
                    });
                    
                  }else{
                    if(response.payment){
                      if(response.payment.url){
                        if(response.payment.url=="PAYMONGO"){
                          $('#payment-info').empty().append('<span class="d-block font-weight-bolder mr-3 text-primary">Payment Info</span><div class="d-flex align-items-center justify-content-center"><button class="btn btn-primary font-weight-bold btn-pill m-10" disabled>Paid by Credit/Debit card</button></div>');
                        }else if(response.payment.url=="DRAGONPAY"){
                          $('#payment-info').empty().append('<span class="d-block font-weight-bolder mr-3 text-primary">Payment Info</span><div class="d-flex align-items-center justify-content-center"><button class="btn btn-primary font-weight-bold btn-pill m-10" disabled>Paid by Dragonpay</button></div>');
                        }else if(response.payment.url=="XENDIT"){
                          $('#payment-info').empty().append('<span class="d-block font-weight-bolder mr-3 text-primary">Payment Info</span><div class="d-flex align-items-center justify-content-center"><button class="btn btn-primary font-weight-bold btn-pill m-10" disabled>Paid by Xendit</button></div>');
                        }else if(response.payment.url=="COD"){
                          $('#payment-info').empty().append('<span class="d-block font-weight-bolder mr-3 text-primary">Payment Info</span><div class="d-flex align-items-center justify-content-center"><button class="btn btn-primary font-weight-bold btn-pill m-10" disabled>Cash on Delivery</button></div>');
                        }else if(response.payment.url=="WALLET"){
                          $('#payment-info').empty().append('<span class="d-block font-weight-bolder mr-3 text-primary">Payment Info</span><div class="d-flex align-items-center justify-content-center"><button class="btn btn-primary font-weight-bold btn-pill m-10" disabled>Paid by Your Wallet</button></div>');
                        }else if(response.payment.url=="OTC"){
                          $('#payment-info').empty().append('<span class="d-block font-weight-bolder mr-3 text-primary">Payment Info</span><div class="d-flex align-items-center justify-content-center"><button class="btn btn-primary font-weight-bold btn-pill m-10" disabled>Over The Counter</button></div>');
                        }else if(response.payment.url=="CANCELLED"){
                          $('#payment-info').empty().append('<div class="d-flex align-items-center justify-content-center"><button class="btn btn-danger font-weight-bold btn-pill m-10" disabled>CANCELLED</button></div>');
                        }else{
                          $('#payment-info').empty().append('<div class="d-flex align-items-center justify-content-center"><a href="'+response.payment.url+'" target="_blank" class="btn btn-success font-weight-bold btn-pill m-10">Pay Now!</a></div>');
                        }
                      }else{
                      $('#payment-info').empty().append('<span class="d-block font-weight-bolder mr-3 my-3 text-primary">Payment Info</span>\
                                                        <span class=" log-message">\
                                                        </span><div class="d-flex flex-wrap">\
                                                        <div class="mr-12 d-flex flex-column ">\
                                                            <span class="d-block font-weight-normal mb-4">TXNID</span>\
                                                             <span class="d-block font-weight-bolder mb-4 payment_txnid">'+response.payment.txnid+'</span>\
                                                        </div>\
                                                        <div class="mr-12 d-flex flex-column ">\
                                                            <span class="d-block font-weight-normal mb-4">Full name</span>\
                                                            <span class="d-block font-weight-bolder mb-4 payment_fullname">'+response.payment.fullname+'</span>\
                                                        </div>\
                                                        <div class="mr-12 d-flex flex-column ">\
                                                            <span class="d-block font-weight-normal mb-4">Mobile</span>\
                                                            <span class="d-block font-weight-bolder mb-4 payment_mobile">+63 '+response.payment.mobile+'</span>\
                                                        </div>\
                                                        <div class="mr-12 d-flex flex-column ">\
                                                            <span class="d-block font-weight-normal mb-4">Transaction #</span>\
                                                            <span class="d-block font-weight-bolder mb-4 payment_number">'+response.payment.txn_number+'</span>\
                                                        </div>\
                                                        <div class="mr-12 d-flex flex-column ">\
                                                            <span class="d-block font-weight-normal mb-4">Amount</span>\
                                                            <span class="d-block font-weight-bolder mb-4 payment_amount">'+response.payment.amount+'</span>\
                                                        </div>\
                                                        <div class="mr-12 d-flex flex-column ">\
                                                            <span class="d-block font-weight-normal mb-4">MOP</span>\
                                                            <span class="d-block font-weight-bolder mb-4 payment_mop">'+response.payment.mop+'</span>\
                                                        </div>\
                                                        <div class="mr-12 d-flex flex-column ">\
                                                            <span class="d-block font-weight-normal mb-4">Payment status</span>\
                                                            <span class="d-block font-weight-bolder mb-4 payment_status">'+response.payment.status+'</span>\
                                                        </div>\
                                                    </div>\
                                                    <div class="separator separator-solid mb-5"></div>\
                                                    <span class="d-block font-weight-bolder mb-4 text-primary">Payment Slip</span>\
                                                    <div class="row gutter-b">\
                                                            <div class="bgi-no-repeat bgi-size-cover  rounded min-h-100px tba_image  payment_slip" style="background-image: url(../../images/transaction-slip/'+response.payment.payment_type+'/'+response.payment.image+');width: 100%;height: 150px;background-size: contain;background-position: center;"alt="Payment Slip">\
                                                            </div>\
                                                    </div>');
                      }
                    }
                    if(response.cart){
                      $('.cart_code').text(response.cart.code);
                      $('.cart_delivery_type').text(response.cart.delivery_type);
                      $('.cart_quantity').text(response.cart.quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                      $('.cart_status').text(response.cart.status);
                      $('.cart_subtotal').text(response.cart.price);
                      $('.cart_discount').text('-'+response.cart.discount);
                      $('.cart_wallet').text('-'+response.cart.wallet);
                      $('.cart_tax').text(response.cart.tax);
                      $('.cart_total').text(response.cart.total_price);

                      $('.ship_fullname').text(response.cart.full_name);
                      $('.ship_mobile').text('+63 '+response.cart.mobile);
                      $('.ship_email').text(response.cart.email);
                      $('.ship_note').text(response.cart.note);
                      $('.ship_address').text(response.cart.address);
                    }
                    // alert(JSON.stringify(response.items));
                    KTDatatablesDataSourceAjaxClient.init('tbl_cart_details',response.items);
                    $('#show_payment_modal').modal('show');
                  }
                }else{
                  _showToast('error','Oopps, Something went wrong, please try again later.');
                  $('#show_payment_modal').modal('hide');
                }
                break;
              }
              case 'view_cart_remarks':{
                if(response){
                  Swal.fire({
                         title: "Remarks",
                         html: '<div class="form-group">'+
                              '<span>'+response.remarks+'</span>'+
                              '</div>',
                        showCancelButton: false,
                        cancelButtonText: "Cancel",
                        confirmButtonText: "Okay",
                       
                    })
                }else{
                  _showSwal('error','Oopps, Something went wrong, please try again later.');
                }
                break;
              }
              case 'cancel_order':{
                if(response!=false){
                  _showToast('success','Order cancelled');
                  $('a[name="to_pay_order"]').click();
                }else{
                  _showToast('error','Oopps! something went wrong. Please try again later.');
                }
                break;
              }
              case 'change_payment_method':{
                if(response!=false){
                  _showToast('success','Save changes');
                  $('a[name="to_pay_order"]').click();
                }else{
                  _showToast('error','Oopps! something went wrong. Please try again later.');
                }
                break;
              }
              case 'view_remarks':{
                if(response!=false){
                   Swal.fire({
                         title: "Remarks",
                         html: '<div class="form-group">'+
                              '<span>'+response+'</span>'+
                              '</div>',
                        showCancelButton: false,
                        cancelButtonText: "Cancel",
                        confirmButtonText: "Okay",
                       
                    })
                }else{
                  _showToast('error','Oopps! something went wrong. Please try again later.');
                }
                break;
              }
              case 'view_invoice':{
                if(response!=false){
                  // alert(response);
                  // $('#printThis').empty().append(
                  //                           '<div class="card-body p-0">\
                  //                               <div class=" justify-content-center bgi-size-cover bgi-no-repeat m-3 py-md-0 px-md-0">\
                  //                                 <img src = "../../images/payout-check/user-check/'+response+'" style="width: 100%; object-fit: cover;">\
                  //                           </div>\
                  //                           <div class="row justify-content-center py-8 px-8 py-md-10 px-md-0" >\
                  //                                   <div class="col-md-9">\
                  //                                       <div class="d-flex justify-content-between">\
                  //                                         <a  href="../../images/payout-check/user-check/'+response+'" download = "check.png" class="non-printable btn btn-light-danger font-weight-bold">Download</a>\
                  //                                             <button type="button" class="non-printable btn btn-danger font-weight-bold" id="btnPrint">Print Certificate</button>\
                  //                                       </div>\
                  //                                   </div>\
                  //                               </div>\
                  //                           </div>');
                
                  $('#invoice-loc').text(response.address);
                  $('#invoice-name').text(response.name);
                  $('#invoice-email').text(response.mobile);
                  $('#invoice-date').text(response.date_update);
                  $('#invoice-amount').text(moneyFormat(response.income));
                  $('#invoice-processing').text(moneyFormat(response.tax));
                  $('#invoice-txnfee').text(moneyFormat(response.txn_fee));
                  $('#invoice-subtotal').text(moneyFormat(response.total_payout));
                  $('#invoice-mop').text(response.mop);
                  $('#invoice-accname').text(response.acc_name);
                  $('#invoice-accnumber').text(response.acc_number);
                  $('#invoice-txnid').text(response.txnid);
                  $('#invoice-total').text(moneyFormat(response.total_payout));
                  $('#encashment_modal').modal('show');
                  function printElement(elem) {
                    var domClone = elem.cloneNode(true);
                    var $printSection = document.getElementById("printSection");
                    if (!$printSection) {
                        var $printSection = document.createElement("div");
                        $printSection.id = "printSection";
                        document.body.appendChild($printSection);
                    }
                    $printSection.innerHTML = "";
                    $printSection.appendChild(domClone);
                    window.print();
                    $('#printSection').empty();
                    return false;
                }
                  $("#btnPrint,#btnDownload").on('click',function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                      printElement(document.getElementById("printThis"));
                  })
                }else{
                  $('#encashment_modal').modal('hide');
                  $('#printThis').empty().append('<div class="text-center p-12">\
                                                                    <p class="font-weight-boldest display-5">\
                                                                        Ooops Something Went Wrong...\
                                                                    </p>\
                                                                </div>');
                  _showToast('error','Oopps! something went wrong. Please try again later.');
                }
                break;
              }
              case 'view_cheque':{
                if(response!=false){
                  $('#printThis_check').empty().append(
                                            '<div class="card-body p-0">\
                                                <div class=" justify-content-center bgi-size-cover bgi-no-repeat m-3 py-md-0 px-md-0">\
                                                  <img src = "../../images/payout-check/'+response+'" style="width: 100%; object-fit: cover;">\
                                            </div>\
                                            <div class="row justify-content-center py-8 px-8 py-md-10 px-md-0" >\
                                                    <div class="col-md-9">\
                                                        <div class="d-flex justify-content-between">\
                                                          <a  href="../../images/payout-check/'+response+'" download = "check.png" class="non-printable btn btn-light-primary font-weight-bold">Download</a>\
                                                              <button type="button" class="non-printable btn btn-primary font-weight-bold" id="btnPrint_cheque">Print Cheque</button>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </div>');
                  $('#check_modal').modal('show');
                   function printElement(elem) {
                    var domClone = elem.cloneNode(true);
                    
                    var $printSection = document.getElementById("printSection");
                    
                    if (!$printSection) {
                        var $printSection = document.createElement("div");
                        $printSection.id = "printSection";
                        document.body.appendChild($printSection);
                    }
                    
                    $printSection.innerHTML = "";
                    $printSection.appendChild(domClone);
                    window.print();
                }
                  $("#btnPrint_cheque").on('click',function () {
                      printElement(document.getElementById("printThis_check"));
                  })
                }else{
                  $('#check_modal').modal('hide');
                  $('#printThis_check').empty().append('<div class="text-center p-12">\
                                                                    <p class="font-weight-boldest display-5">\
                                                                        Ooops Something Went Wrong...\
                                                                    </p>\
                                                                </div>');
                  _showToast('error','Oopps! something went wrong. Please try again later.');
                }
                break;
              }
              case 'wallet_details':{
                KTDatatablesDataSourceAjaxClient.init('tbl_wallet_details',response);
                $('#show_wallet_modal').modal('show');
                break;
              }
              case 'transferred_comm_details':{
                KTDatatablesDataSourceAjaxClient.init('tbl_transferred_comm_details',response);
                $('#show_transferred_comm_modal').modal('show');
                break;
              }
              case 'fulfillment_view_logs':{
                if(response!=false){
                  $('#fulfillment-logs').empty();
                  for(let i=0; i<response.length; i++){
                    let color='warning';
                    let icon='flaticon2-list-3';
                    
                    if(response[i].old_value=='REQUESTED'){
                      color='warning';
                      icon='flaticon2-file';
                    }else if(response[i].old_value=='PROCESSING'){
                      color='primary';
                      icon='fas fa-cart-arrow-down';
                    }else if(response[i].old_value=='IN-TRANSIT'){
                      color='info';
                      icon='fas fa-shipping-fast';
                    }else if(response[i].old_value=='DELIVERED'){
                      color='success';
                      icon='fas fa-home';
                    }else if(response[i].old_value=='RTS'){
                      color='danger';
                      icon='fas fa-exchange-alt';
                    }else if(response[i].old_value=='REMITTED'){
                      color='dark';
                      icon='fas fa-sync-alt';
                    }else if(response[i].new_value=='CANCELLED'){
                      color='danger';
                      icon='fas fa-times';
                    }else if(response[i].old_value=='COMPLETED'){
                      color='success';
                      icon='fas fa-star';
                    }else{
                      continue;
                      // color='secondary';
                      // icon='fas fa-bookmark';
                    }


                    $('#fulfillment-logs').append('<div class="timeline-item">\
                                <div class="timeline-media bg-'+color+'">\
                                    <span class="svg-icon-'+color+' svg-icon-md">\
                                     <i class="'+icon+' text-white"></i>\
                                    </span>\
                                </div>\
                                <div class="timeline-desc timeline-desc-light-'+color+'">\
                                    <span class="font-weight-bolder text-capitalize text-'+color+'">'+response[i].date_created+'</span>\
                                    <p class="font-weight-normal text-dark-50 pb-0 mb-0">Action: <span class="font-weight-bolder text-dark-50">'+response[i].log_action+'</span></p>\
                                    <p class="font-weight-normal text-dark-50 pb-2">Message: '+response[i].message+'</p>\
                                </div>\
                            </div>');
                  }
                }else{
                  $('#fulfillment-logs').empty().append('<div class="text-center">\
                                                                    <p class="font-weight-boldest display-5">\
                                                                        No remarks written.\
                                                                    </p>\
                                                                </div>');

                  // _showSwal('error','Oopps!, Something went wrong in package page. Please try again later.');
                }
                $('#show_fulfillment_logs_view_modal').modal('show');
                break;
              }
              case 'ranks_owner':
              case 'ranks':{
                if(response!=false){
                  if(response.rank){
                    // h-75 align-self-end
                    upgrade=response.rank.id;
                     $('#upgrade-container,#upgrade-container2').empty();
                    let date_upgrade=response.rank.date_upgrade;
                    let img='<div class="symbol-label"  style="background-image:url(../../images/user_images/'+response.rank.image+')"></div>';
                    if(response.rank.image=='default.png'){
                      img='<span class="font-size-h1 symbol-label font-weight-boldest text-uppercase">'+response.rank.name[0]+'</span>';
                    }
                    if(response.upgrade){
                       (response.upgrade.length==1)? date_upgrade=response.upgrade[response.upgrade.length-1].date_upgrade : date_upgrade=response.upgrade[response.upgrade.length-2].date_upgrade;
                    }
                    $('#upgrade-container').append('<div class="col-md-3">\
                                                    <div class="card card-custom  card-stretch " id="">\
                                                      <div class="card-body">\
                                                        <div class="d-flex justify-content-between flex-column pt-4 h-100">\
                                                          <div class="pb-5">\
                                                            <div class="d-flex flex-column flex-center">\
                                                              <div class="symbol symbol-120 symbol-circle symbol-light-primary overflow-hidden">\
                                                                <span class="symbol-label">\
                                                                  '+img+'\
                                                                </span>\
                                                              </div>\
                                                              <a href="#" class="card-title font-weight-bolder text-dark-75 text-hover-primary font-size-h4 m-0 pt-7 pb-1">'+response.rank.name+'</a>\
                                                              <div class="font-weight-bold text-dark-50 font-size-sm ">#'+response.rank.username+'</div>\
                                                              <div class="font-weight-bold text-dark-50 font-size-sm pb-6">'+date_upgrade+'</div>\
                                                            </div>\
                                                          </div>\
                                                          <div class="d-flex flex-center">\
                                                            <button class="btn btn-'+response.rank.package_name+' btn-shadow-rank font-weight-bolder font-size-sm py-3 px-14">'+response.rank.package_name+'</button>\
                                                          </div>\
                                                        </div>\
                                                      </div>\
                                                    </div>\
                                                  </div>');
                      if(response.upgrade){
                        for(let i=0;i<response.upgrade.length;i++){
                          let img='<div class="symbol-label"  style="background-image:url(../../images/user_images/'+response.upgrade[i].image+')"></div>';
                          if(response.rank.image=='default.png'){
                            img='<span class="font-size-h1 symbol-label font-weight-boldest text-uppercase">'+response.upgrade[i].name[0]+'</span>';
                          }
                          $('#upgrade-container').prepend('<div class="col-md-3">\
                                                      <div class="card card-custom  card-stretch " id="">\
                                                        <div class="card-body">\
                                                          <div class="d-flex justify-content-between flex-column pt-4 h-100">\
                                                            <div class="pb-5">\
                                                              <div class="d-flex flex-column flex-center">\
                                                                <div class="symbol symbol-120 symbol-circle symbol-light-primary overflow-hidden">\
                                                                  <span class="symbol-label">\
                                                                   '+img+'\
                                                                  </span>\
                                                                </div>\
                                                                <a href="#" class="card-title font-weight-bolder text-dark-75 text-hover-primary font-size-h4 m-0 pt-7 pb-1">'+response.upgrade[i].name+'</a>\
                                                                <div class="font-weight-bold text-dark-50 font-size-sm ">#'+response.upgrade[i].username+'</div>\
                                                                <div class="font-weight-bold text-dark-50 font-size-sm pb-6">'+response.upgrade[i].last_upgrade+'</div>\
                                                              </div>\
                                                            </div>\
                                                            <div class="d-flex flex-center">\
                                                              <button class="btn btn-'+response.upgrade[i].package_name+' btn-shadow-rank font-weight-bolder font-size-sm py-3 px-14">'+response.upgrade[i].package_name+'</button>\
                                                            </div>\
                                                          </div>\
                                                        </div>\
                                                      </div>\
                                                    </div>\
                                                    <div class="col-md-1 d-flex align-items-center justify-content-center my-15">\
                                                      <p class="scroll-down rotate-icon "><a class="animate"></a></p>\
                                                    </div>');
                        }
                        if(response.rank.package_name!='GOLD'){
                          $('#upgrade-container').append('<div class="col-md-1 d-flex align-items-center justify-content-center my-15">\
                                                            <p class="scroll-down rotate-icon "><a class="animate"></a></p>\
                                                          </div>\
                                                          <div class="col">\
                                                            <div class="card card-custom   card-stretch btn-outline-dashed btn-outline-default">\
                                                              <div class="card-body d-flex p-0">\
                                                                <div class="flex-grow-1 bg-light-clear p-12 pb-20 card-rounded flex-grow-1 bgi-no-repeat" style="background-position: calc(100% + 0.5rem) bottom; background-size: 40% auto; background-image: url(\'../../images/illustrations/user-welcome.png\')">\
                                                                  <p class="text-warning pt-10 pb-5 font-size-h3 font-weight-bolder line-height-lg">Upgrade Your Rank!</p>\
                                                                  <form class="form" id="upgrade_form">\
                                                                    <div class="form-group">\
                                                                      <label class="font-size-h6 font-weight-bolder text-warning ">Package Code </label><span class="label label-lg label-light-warning label-inline ml-2">Ex. GDPAAAACCCCXXXXX</span>\
                                                                      <div class="input-group w-sm-60">\
                                                                        <input type="text" autocomplete="off" class="form-control h-auto py-5 px-6 border-0 rounded-lg font-size-h6 " name="code" id="code" placeholder="Enter your new code" value="" />\
                                                                        <div class="input-group-append" id="code_type"></div>\
                                                                      </div>\
                                                                    </div>\
                                                                    <button type="submit" class="btn btn-outline-warning font-weight-bold px-6">Upgrade Now</button>\
                                                                  </form>\
                                                                </div>\
                                                              </div>\
                                                            </div>\
                                                          </div>');
                        }else if(response.rank.package_name=='GOLD' && response.upgrade.length==2){
                          $('#upgrade-container2').append('<div class="d-flex align-items-center justify-content-center my-15"><div class="rotate-down w-10px">\
                                                            <p class="scroll-down "><a class="animate"></a></p>\
                                                          </div></div>\
                                                          <div class="">\
                                                            <div class="card card-custom   card-stretch btn-outline-dashed btn-outline-default gutter-b">\
                                                              <div class="card-body d-flex p-0">\
                                                                <div class="flex-grow-1 bg-light-clear p-12 pb-20 card-rounded flex-grow-1 bgi-no-repeat" style="background-position: calc(100% + 0.5rem) bottom; background-size: 20% auto; background-image: url(\'../../images/illustrations/user-welcome.png\')">\
                                                                  <p class="text-warning pt-10 pb-5 font-size-h3 font-weight-bolder line-height-lg">Congratulations!</br>You have reach the <span class="text-GOLD">GOLD</span> rank.</br>Enjoy your amazing perks and rewards!</p>\
                                                                </div>\
                                                              </div>\
                                                            </div>\
                                                          </div>');
                        }else{
                          $('#upgrade-container').append('<div class="col-md-1 d-flex align-items-center justify-content-center my-15">\
                                                          <p class="scroll-down rotate-icon "><a class="animate"></a></p>\
                                                        </div>\
                                                        <div class="col">\
                                                          <div class="card card-custom   card-stretch btn-outline-dashed btn-outline-default">\
                                                            <div class="card-body d-flex p-0">\
                                                              <div class="flex-grow-1 bg-light-clear p-12 pb-20 card-rounded flex-grow-1 bgi-no-repeat" style="background-position: calc(100% + 0.5rem) bottom; background-size: 40% auto; background-image: url(\'../../images/illustrations/user-welcome.png\')">\
                                                                <p class="text-warning pt-10 pb-5 font-size-h3 font-weight-bolder line-height-lg">Congratulations!</br>You have reach the <span class="text-GOLD">GOLD</span> rank.</br>Enjoy your amazing perks and rewards!</p>\
                                                              </div>\
                                                            </div>\
                                                          </div>\
                                                        </div>');
                        }
                      
                      }else{
                        if(response.rank.package_name!='GOLD'){
                        $('#upgrade-container').append('<div class="col-md-1 d-flex align-items-center justify-content-center my-15">\
                                                            <p class="scroll-down rotate-icon "><a class="animate"></a></p>\
                                                          </div>\
                                                          <div class="col">\
                                                            <div class="card card-custom   card-stretch btn-outline-dashed btn-outline-default">\
                                                              <div class="card-body d-flex p-0">\
                                                                <div class="flex-grow-1 bg-light-clear p-12 pb-20 card-rounded flex-grow-1 bgi-no-repeat" style="background-position: calc(100% + 0.5rem) bottom; background-size: 40% auto; background-image: url(\'../../images/illustrations/user-welcome.png\')">\
                                                                  <p class="text-warning pt-10 pb-5 font-size-h3 font-weight-bolder line-height-lg">Upgrade Your Rank!</p>\
                                                                  <form class="form" id="upgrade_form">\
                                                                    <div class="form-group">\
                                                                      <label class="font-size-h6 font-weight-bolder text-warning ">Package Code </label><span class="label label-lg label-light-warning label-inline ml-2">Ex. GDPAAAACCCCXXXXX</span>\
                                                                      <div class="input-group w-sm-60">\
                                                                        <input type="text" autocomplete="off" class="form-control h-auto py-5 px-6 border-0 rounded-lg font-size-h6 " name="code" id="code" placeholder="Enter your new code" value="" />\
                                                                        <div class="input-group-append" id="code_type"></div>\
                                                                      </div>\
                                                                    </div>\
                                                                    <button type="submit" class="btn btn-outline-warning font-weight-bold px-6">Upgrade Now</button>\
                                                                  </form>\
                                                                </div>\
                                                              </div>\
                                                            </div>\
                                                          </div>');
                        }else{
                          $('#upgrade-container').append('<div class="col-md-1 d-flex align-items-center justify-content-center my-15">\
                                                              <p class="scroll-down rotate-icon "><a class="animate"></a></p>\
                                                            </div>\
                                                            <div class="col">\
                                                              <div class="card card-custom  card-stretch btn-outline-dashed btn-outline-default">\
                                                                <div class="card-body d-flex p-0">\
                                                                  <div class="flex-grow-1 bg-light-clear p-12 pb-20 card-rounded flex-grow-1 bgi-no-repeat" style="background-position: calc(100% + 0.5rem) bottom; background-size: 40% auto; background-image: url(\'../../images/illustrations/user-welcome.png\')">\
                                                                    <p class="text-warning pt-10 pb-5 font-size-h3 font-weight-bolder line-height-lg">Congratulations!</br>You have reach the <span class="text-GOLD">GOLD</span> rank.</br>Enjoy your amazing perks and rewards!</p>\
                                                                  </div>\
                                                                </div>\
                                                              </div>\
                                                            </div>');
                        }
                      }
                    
                    KTFormControls.init();
                  }
                }else{

                }
                break;
              }
              case 'unicard':{
                if(response!=false){
                  $('#kt_content > div.d-flex.flex-column-fluid > div > div').empty();
                  for(let i=1;i<=response;i++){
                    let count=i+'th';
                    if(i==1){
                        count=i+"st";
                    }else if(i==2){
                        count=i+"nd";
                    }else if(i==3){
                        count=i+"rd";
                    }
                    $('#kt_content > div.d-flex.flex-column-fluid > div > div').append('<div class="col-xl-4  ">\
                      <div class="card card-custom  gutter-b card-collapsed" id="level'+i+'">\
                        <div class="card-header">\
                          <h3 class="card-title font-weight-bolder text-dark">\
                            <div class="symbol symbol-40 symbol-primary symbol-circle mr-3">\
                              <span class="symbol-label font-size-h6">'+count+'</span>\
                            </div></h3>\
                          <div class="card-toolbar">\
                              <a class="btn btn-icon btn-circle btn-sm btn-light-primary mr-1" data-card-tool="toggle">\
                                <i class="ki ki-arrow-down icon-nm"></i>\
                              </a>\
                              <a class="btn btn-icon btn-circle btn-sm btn-light-success mr-1" data-card-tool="reload">\
                                <i class="ki ki-reload icon-nm"></i>\
                              </a>\
                            </div>\
                        </div>\
                        <div class="card-body  max-h-500px  overflow-auto" id="level-list'+i+'">\
                        </div>\
                      </div>\
                    </div>');
                  }
                  KTCardTools.init();
                }else{
                  _showSwal('error','Oopps! Something went wrong, please check your internet connection');
                }
                break;
              }
              case 'unilevel':{
                if(response!=false){
                  if(response.length!=0){
                    $('#level-list'+level).empty();
                    for(let i=0;i<response.length;i++){
                      let img='<div class="symbol-label"  style="background-image:url(../../images/user_images/'+response[i].image+')"></div>';
                      if(response[i].image=='default.png'){
                        img='<span class="font-size-h3 symbol-label font-weight-boldest text-uppercase">'+response[i].fname[0]+'</span>';
                      }
                      $('#level-list'+level).append('<div class="d-flex align-items-center flex-wrap mb-8">\
                            <div class="symbol symbol-50 symbol-light mr-5">\
                              <span class="symbol-label">\
                                '+img+'\
                              </span>\
                            </div>\
                            <div class="d-flex flex-column flex-grow-1 mr-2">\
                              <a href="#" class="font-weight-bold text-dark-75 text-hover-primary font-size-lg mb-1">'+response[i].fname+'</a>\
                              <span class="text-muted font-weight-bold">#'+response[i].username+'</span>\
                            </div>\
                            <span class="label label-xl label-light label-inline my-lg-0 my-2 text-dark-50 font-weight-bolder">#'+response[i].sponsor+'</span>\
                          </div>');
                    }
                  }else{
                    $('#level-list'+level).empty().append('<div class="text-center"><a href="javascript:;" class="card-title font-weight-bold text-muted  text-hover-primary font-size-h5">Empty</a></div>');
                  }
                }else{
                  $('#level-list'+level).empty().append('<div class="text-center"><a href="javascript:;" class="card-title font-weight-bold text-muted  text-hover-primary font-size-h5">Empty</a></div>');
                }
                break;
              }
              // case 'password_check':{
              //   if(response!=false){
              //     if(response=="view_cart"){
              //       _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Viewing cart...'), _constructForm(['user_track_order', 'view_cart',view_cart_details,true]));
              //     }
              //   }else{
              //     _showSwal('error','Password is incorrect. Please try again.');
              //   }
              //   break;
              // }

              case 'password_check':{
                if(response!=false){
                  if(response=="view_cart"){
                    _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Viewing cart...'), _constructForm(['user_track_order', 'view_cart',view_cart_details,true]));
                  }else if(response=="verify_encashment"){
                    KTFormControls.init('submit_encashment');
                  }else if(response=='verify_transfer'){
                    _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Processing...'), _constructForm(['user_encashment', 'transfer_to_wallet',amount_transfer.toFixed(3)]));
                    // _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Transferring...'), _constructForm(['user_encashment', 'transfer_to_wallet']));
                  }else if(response=="transfer_comm"){
                     Swal.fire({
                         title: "Do you want to continue to transfer your commission?",
                         html: '<span><strong class="float-left">Transfer to:</strong> <span class="float-right">'+transfer_to_username+'</span></span><br>\
                                <span><strong class="float-left">Amount:</strong> <span class="float-right">'+moneyFormat(transfer_comm_amount,3)+'</span></span>',
                         icon: "question",
                         showCancelButton: true,
                         buttonsStyling: false,
                         confirmButtonText: "Yes, continue!",
                         cancelButtonText: "No, cancel",
                         customClass: {
                           confirmButton: "btn font-weight-bold btn-primary",
                           cancelButton: "btn font-weight-bold btn-default"
                         }
                       }).then(function (result) {
                        if (result.value) {
                          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Transferring Commission...'), _constructForm(['user_encashment', 'transfer_comm',transfer_to_username,transfer_comm_amount]));
                        }
                       })
                  }
                }else{
                  _showSwal('error','Password is incorrect. Please try again.');
                }
                break;
              }
               case "fetch_training_list":{
                
                let container = $('.training-list');
                    container.empty();
                if(response != false){
                    for(let i =0;i<response.length;i++){
                      let html = $('<li class="menu-item menu-item-submenu training" href-data="training" data-menu-toggle="hover" aria-haspopup="true">\
                                        <a href="training/?view='+response[i].id+'" class="menu-link">\
                                          <span class="menu-text"><i class="la la-file-video text-primary icon-xl mr-3"></i>'+response[i].title+'</span>\
                                        </a>\
                                    </li>');
                      container.append(html);
                  }
                }else{
                  let html = $('<li class="menu-item menu-item-submenu" data-menu-toggle="hover" aria-haspopup="true">\
                                        <a  class="menu-link">\
                                          <span class="menu-text">No Video Available</span>\
                                        </a>\
                                    </li>');
                   container.append(html);
                }
                
                break;
              }
              case "fetch_training_tools":{
                 $('#kt_subheader > div > div > div > h5').text(response.row.title);
                 $('.description-card').text(response.row.description);
                $('#kt_content > div.d-flex.flex-column-fluid > div > div > img').attr('src','../../images/training-academy/'+response.row.image);
                let container = $('.training-video');
                    container.empty();
                for(let i=0;i<response.result.length;i++){
                    let html = $('<div class="col-md-4 col-xxl-4 col-lg-4">\
                                    <div class="card card-custom box-shadow-card zoom shadow">\
                                      <div class="card-body p-0">\
                                        <div class="overlay">\
                                          <div class="overlay-wrapper rounded bg-light text-center">\
                                           <iframe height="300px;" class="mw-100 w-400px iframe-video" src="'+response.result[i].link+'" title="YouTube video player" frameborder="0" allow=" clipboard-write; encrypted-media; gyroscope; picture-in-picture;showinfo=0;controls=0" allowfullscreen></iframe>\
                                          </div>\
                                          <div class="overlay-layer">\
                                            <button type="button" style="width:100px;height:50px;" class="btn btn-primary btn-lg btn-icon view-video"><span class="svg-icon svg-icon-3x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                                    <rect x="0" y="0" width="24" height="24"/>\
                                                    <path d="M9.82866499,18.2771971 L16.5693679,12.3976203 C16.7774696,12.2161036 16.7990211,11.9002555 16.6175044,11.6921539 C16.6029128,11.6754252 16.5872233,11.6596867 16.5705402,11.6450431 L9.82983723,5.72838979 C9.62230202,5.54622572 9.30638833,5.56679309 9.12422426,5.7743283 C9.04415337,5.86555116 9,5.98278612 9,6.10416552 L9,17.9003957 C9,18.1765381 9.22385763,18.4003957 9.5,18.4003957 C9.62084305,18.4003957 9.73759731,18.3566309 9.82866499,18.2771971 Z" fill="#000000"/>\
                                                </g>\
                                            </svg></span></button>\
                                          </div>\
                                        </div>\
                                        <div class="text-center mt-5 mb-md-0 mb-lg-5 mb-md-0 mb-lg-5 mb-lg-0 mb-5 d-flex flex-column">\
                                          <h2 class="font-size-lg">'+response.result[i].description+'</h2>\
                                        </div>\
                                      </div>\
                                    </div>\
                                  </div>');
                    container.append(html).promise().done(function(){
                      let link =response.result[i].link;
                      let description =response.result[i].description;
                        $('.view-video').on('click',function(e){
                            e.preventDefault();
                            e.stopImmediatePropagation();
                            $('.video-iframe').empty().append('<iframe height="500px;" width="100%;" src="'+link+'" id="video" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
                            $('.caption').text(description);
                            $('#video').on('load',function(e){
                              $('#iframe').modal('show');
                            });
                        });
                    });
                }
                break;
              }
              case "fetch_generated_id":{
                $('[data-toggle="tooltip"]').tooltip();
                $('.image-id').attr('src','../../images/ID/'+response);
                $('.download').attr('href','../../images/ID/'+response).attr('download',response);
                $('.print').on('click',function(e){
                      e.preventDefault();
                      let newWin = window.open("");
                      newWin.document.write('<html><body onload="window.print()"><img src="../../images/ID/'+response+'" id="image-id"  style="width: 100%;"></body></html>');
                      setInterval(function () {
                        newWin.print();
                         newWin.close();
                      }, 1000);
                });
                $('.pdf').on('click',function(e){
                  e.preventDefault();
                   var doc = new jsPDF();
                   var myImage = new Image();
                   var arr = response.split('.');
                    myImage .src = '../../images/ID/'+response;
                    myImage .onload = function(){
                    doc.addImage(myImage , 'png', 5, 5, 200, 140);
                    doc.save(arr[0]+'.pdf');
                    };
                });
                break;
              }

              //ADDRESS
              case 'get-brgy':
              case 'get-city':
              case 'get-province':
              case 'get-region':{
                if(response.region){
                  _initAddress2('addr_region',response.region);
                }else if(response.province){
                  _initAddress2('addr_province',response.province);
                }else if(response.city){
                  _initAddress2('addr_city',response.city);
                }else if(response.brgy){
                  _initAddress2('addr_barangay',response.brgy);
                }
              }

              default:
              // code block
              break;
          }
          if(response!=false){
            $('#kt_content > div.d-flex.flex-column-fluid > div').show();
          }
    };

    var _initAddress2 = function(type,response){
      if(response){
        // $('select[name="'+type+'"]').empty();
        for (let i = 0; i < response.length; i++){
            $('select[name="'+type+'"]').append('<option value="'+response[i].code+'">'+response[i].location+'</option>');
        }
      }
    } 
    var _ajaxrequest = async function(thisurl, ajaxtype, blockUi, formData){
      return new Promise((resolve, reject) => {
             var y = true;
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
                    KTApp.block(blockUi.get("element"), {
                    overlayColor: '#000000',
                    state: 'primary', 
                    size: 'lg' 
                   });
                }else if(blockUi.get("type") == 'pre-loader20'){
                  $(blockUi.get("element")).empty().append('<div class="d-flex justify-content-center w-100"><img src="../../images/pre-loader/loader-20.gif" alt="Loading"/></div>');
                }else{

                }
              },
              complete: function(){
                if(blockUi.get("type") == "blockPage"){
                  KTApp.unblockPage();
                }else if(blockUi.get("type") == "blockContent"){
                  KTApp.unblock(blockUi.get("element"));
                }else if(blockUi.get("type") == 'pre-loader20'){
                  // $(blockUi.get("element")).empty();
                }else{
                }
              },
              success: async function(res){
                // alert(JSON.stringify(res));
                 if(res.status == 'success'){
                    if(window.atob(res.payload) != false){
                      let result= await _construct(JSON.parse(window.atob(res.payload)), formData.get("data2"));
                      if(result){
                        resolve(true);
                      }else{
                        resolve(false);
                      }
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
                if(xhr.status == 200){
                  if(xhr.responseText.trim()=="signed-out"){
                    Swal.fire({
                    title:"Oopps!",
                    text: "Your account was signed-out.",
                    icon: "info",
                    showCancelButton: false,
                    confirmButtonText: "Ok, Got it",
                        reverseButtons: true
                    }).then(function(result) {
                      window.location.replace("../login");
                    });
                  }else{
                    Swal.fire("Ops!", "Server Error: " + xhr.responseText, "error");
                  }
                }else if(xhr.status == 500){
                  Swal.fire("Ops!", 'Internal error: ' + xhr.responseText, "error");
                }else if(status=="error"){
                   Swal.fire({
                    title:"Oopps!",
                    text: "Your account was signed-out.",
                    icon: "info",
                    showCancelButton: false,
                    confirmButtonText: "Ok, Got it",
                        reverseButtons: true
                    }).then(function(result) {
                      window.location.replace("../login");
                    });
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
    callFunction:  function(type,id){
      // switch (type){
      //   case:''
      // }
       if(type=='reload_customers_list'){
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Customers...'), _constructForm(['user_customers', 'customers_list']));
       }
       if(type=='reload_address'){
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Address...'), _constructForm(['user_address', 'address']));
       }
       if(type=='reload_setup_sales'){
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Sales...'), _constructForm(['setup_group_sales', 'setup_sales', id]));
       }
       if(type=='upgrade'){
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Ranks...'), _constructForm(['user_ranks', 'ranks' , id]));
       }
       if(type=='unilevel'){
        level=id;
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockContent', '#level'+level, false), _constructForm(['user_unilevel', 'unilevel', level, $('select[name="owner"]').val()]));
       }
       if(type=='reload_commissions'){
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Commissions...'), _constructForm(['user_reports', 'commissions']));
       }
       if(type=='reload_gensales'){
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Sales...'), _constructForm(['user_reports', 'generated_sales']));
       }
       if(type=='reload_referrals'){
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Referrals...'), _constructForm(['user_reports', 'direct_referrals']));
       }
       if(type=='reload_bin_sale'){
         _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Binary...'), _constructForm(['user_reports', 'binary_monitoring']));
       }
       if(type=='reload_opt_ins'){
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Opt-Ins...'), _constructForm(['user_reports', 'opt_ins']));
       }
       if(type=="schedule_per_package_item"){
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('pre-loader20', '#package-content', false), _constructForm(['user_package', 'schedule_package_per_item',package_cart]));
       }
       if(type=='verify_encashment'){
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading...'), _constructForm(['user_password_required','password_check','verify_encashment',id]));//password
       }
       // if(type=='reload_cart'){
       //  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('pre-loader20', '.cart-empty-page', false), _constructForm(['user_create_order', 'cart_items']));
       // }

     },
    init: function(){
        _init();
    }
  };
}();
$(document).ready(function(){
   APPHANDLER.init();
});
