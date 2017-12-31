
// var countryNameContactPage = '';

$(document).ready((function () {
    fieldEmpty();
    ContectCenteringModal("#contactPage-message-box");
    if (window.innerWidth < 768) {
        $('#contact-us-part').insertAfter('address');
    }

    $(window).resize(function () {
        if (window.width() < 768) {
            $('#contact-us-part').insertAfter('address');
        } else {
            $('#contact-us-part').insertBefore('#location-office-part');
        }
    });

    $("#formContactPage #con-txtname").focus(function () {
        $('#contact-us-part #con-ername').css("display", "none");
        $('#contact-us-part #con-txtname').css("border-color", "#e5e5e5");
        $('#contact-us-part #con-send').css("display", "none");
    });

    $("#formContactPage #con-txtemail").focus(function () {
        $('#contact-us-part #con-eremail').css("display", "none");
        $('#contact-us-part #con-txtemail').css("border-color", "#e5e5e5");
        $('#contact-us-part #con-send').css("display", "none");
    });

    $("#formContactPage #con-txtcompany").focus(function () {
        $('#contact-us-part #con-ercomp').css("display", "none");
        $('#contact-us-part #con-txtcompany').css("border-color", "#e5e5e5");
        $('#contact-us-part #con-send').css("display", "none");
    });

    $("#formContactPage #con-txtmessage").focus(function () {
        $('#contact-us-part #con-ermessage').css("display", "none");
        $('#contact-us-part #con-txtmessage').css("border-color", "#e5e5e5");
        $('#contact-us-part #con-send').css("display", "none");
    });

    //$("#formContactPage #con-txtcaptcha").focus(function() {
    //    $('#contact-us-part #con-ercaptcha').css("display", "none");
    //    $('#contact-us-part #con-txtcaptcha').css("border-color", "#e5e5e5");
    //    $('#contact-us-part #con-send').css("display", "none");
    //});
}));

function sendEmail() {
    var currentUrl = window.location.href;
    var name = $("#formContactPage #con-txtname").val().replace(/^\s+|\s+$/g, '');
    var email = $("#formContactPage #con-txtemail").val().replace(/^\s+|\s+$/g, '');
    var companyName = $("#formContactPage #con-txtcompany").val().replace(/^\s+|\s+$/g, '');
    var country = $("#formContactPage #country").val();
    var message = $("#formContactPage #con-txtmessage").val().replace(/^\s+|\s+$/g, '');
    //var captcha = $("#formContactPage #con-txtcaptcha").val().replace(/^\s+|\s+$/g, '');
    var dataPost = {};
    dataPost.action = "TryOurServices";
    dataPost.name = name;
    dataPost.email = email;
    dataPost.company = companyName;
    dataPost.country = country;
    dataPost.message = message;
    //dataPost.captcha = captcha;
    contactShowModalWaiting();

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/api/OSDService/email",
        data: JSON.stringify(dataPost),
        dataType: "text",
        timeout: 100000,
        success: function (data, status, xhr) {
            contactShowModalSuccess();
            goog_report_conversion(currentUrl);
            //var result = xhr.getResponseHeader("result");
            //if (result == "1") {
            //    $("#formContactPage #con-ercaptcha").css("display", "none");
            //    fieldEmpty();
            //    getCaptcha();

            //    $("#formContactPage #con-txtcaptcha").css("border-color", "#e5e5e5");
            //    contactShowModalSuccess();
            //    goog_report_conversion(currentUrl);
            //}
            //else if (result == "0") {
            //    contactShowModalErrorCaptcha();
            //    $("#formContactPage #con-ercaptcha").text("Incorrect code!");
            //    $("#formContactPage #con-ercaptcha").css("display", "block");
            //    $("#formContactPage #con-txtcaptcha").val("");
            //}
        },
        error: function (xhr) {
            contactShowErrorDialog();
            //getCaptcha();
        }
    });
}

function fieldEmpty() {
    $("#formContactPage #con-txtname").val("");
    $("#formContactPage #con-txtemail").val("");
    $("#formContactPage #con-txtcompany").val("");
    $("#formContactPage #con-txtmessage").val("");
    //$("#formContactPage #con-txtcaptcha").val("");
}

function checkName() {
    var name = $("#formContactPage #con-txtname").val().replace(/^\s+|\s+$/g, '');
    if (name == "") {
        $("#formContactPage #con-ername").css("display", "block");
        $("#formContactPage #con-txtname").css("border-color", "#f5532c");
        return false;
    }
    $("#con-ername").css("display", "none");
    $("#formContactPage #con-txtname").css("border-color", "#e5e5e5");
    return true;
}

function checkCompanyName() {
    var companyName = $("#formContactPage #con-txtcompany").val().replace(/^\s+|\s+$/g, '');
    if (companyName == "") {
        $("#formContactPage #con-ercomp").css("display", "block");
        $("#formContactPage #con-txtcompany").css("border-color", "#f5532c");
        return false;
    }
    $("#con-ercomp").css("display", "none");
    $("#formContactPage #con-txtcompany").css("border-color", "#e5e5e5");
    return true;
}

function checkEmail() {
    var email = $("#formContactPage #con-txtemail").val().replace(/^\s+|\s+$/g, '');
    if (email == "") {
        $("#formContactPage #con-txtemail").css("border-color", "#f5532c");
        $("#formContactPage #con-eremail").css("display", "block");
        return false;
    }
    //var pattern = /^[a-z0-9][a-z0-9_\.-]{0,}[a-z0-9]@[a-z0-9][a-z0-9_\.-]{0,}[a-z0-9][\.][a-z0-9]{2,4}$/;
    var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,63})?$/;
    if (!pattern.test(email)) {
        $("#formContactPage #con-eremail").text("Invalid email format!");
        $("#formContactPage #con-eremail").css("display", "block");
        return false;
    }

    $("#formContactPage #con-eremail").css("display", "none");
    $("#formContactPage #con-txtemail").css("border-color", "#e5e5e5");
    return true;
}

function checkMessage() {
    var message = $("#formContactPage #con-txtmessage").val().replace(/^\s+|\s+$/g, '');
    if (message == "") {

        $("#formContactPage #con-txtmessage").css("border-color", "#f5532c");
        $("#formContactPage #con-ermessage").css("display", "block");
        return false;
    }
    $("#formContactPage #con-ermessage").css("display", "none");
    $("#formContactPage #con-txtmessage").css("border-color", "#e5e5e5");
    return true;
}

//function checkCaptcha() {
//    var captcha = $("#formContactPage #con-txtcaptcha").val().replace(/^\s+|\s+$/g, '');
//    if (captcha == "") {
//        $("#formContactPage #con-ercaptcha").text("Required(*)");
//        $("#formContactPage #con-txtcaptcha").css("border-color", "#f5532c");
//        $("#formContactPage #con-ercaptcha").css("display", "block");
//        return false;
//        }
//    else {
//        return true;
//        }
//    }


//function getCaptcha() {
//    var captchaElement = $('#formContactPage #con-imgCaptcha');

//    $.ajax({
//        type: "GET",
//        contentType: "application/json; charset=utf-8",
//        url: "/api/OSDService/Captcha",
//        dataType: "Text",
//        timeout: 30000,
//        success: function (data,status,xhr) {
//            captchaElement.attr("src", "data:image/png;base64," + data.replace(/"/gi, ""));
//        },
//        error: function (xhr) {
//            var result = xhr;
//        }
//    });
//}

function checkAll() {

    var result = true;
    if (!checkName()) {
        result = false;
    }
    if (!checkEmail()) {
        result = false;
    }
    if (!checkCompanyName()) {
        result = false;
    }
    if (!checkMessage()) {
        result = false;
    }
    //if (!checkCaptcha()) {
    //    result = false;
    //}
    if (result) {
        sendEmail();
    } else {
        $("#formContactPage #con-send").css("display", "block");
    }
}
function contactShowErrorDialog() {

    $("#contactPage-message-box p.modal-title").text("Error");
    $("#contactPage-message-box p.modal-message").text("Ocurrio un error, por favor intente más tarde!");
    $("#contactPage-message-box p.modal-message").css("color", "#f5532c");
    $('#contactPage-message-box').modal('show');
};


// function addDataToSelectList() {
//     var strVar = '';
//     strVar += "<select id=\"country\" class=\" col-sm-12 col-xs-12 \" size=\"1\" name=\"country\">";
//     strVar += " <option value=\"Afghanistan\">Afghanistan<\/option>";
//     strVar += " <option value=\"Albania\">Albania<\/option>";
//     strVar += " <option value=\"Algeria\">Algeria<\/option>";
//     strVar += " <option value=\"American Samoa\">American Samoa<\/option>";
//     strVar += " <option value=\"Andorra\">Andorra<\/option>";
//     strVar += " <option value=\"Angola\">Angola<\/option>";
//     strVar += " <option value=\"Antarctica\">Antarctica<\/option>";
//     strVar += " <option value=\"Antigua and Barbuda\">Antigua and Barbuda<\/option>";
//     strVar += " <option value=\"Argentina\">Argentina<\/option>";
//     strVar += " <option value=\"Armenia\">Armenia<\/option>";
//     strVar += " <option value=\"Australia\">Australia<\/option>";
//     strVar += " <option value=\"Austria\">Austria<\/option>";
//     strVar += " <option value=\"Azerbaijan\">Azerbaijan<\/option>";
//     strVar += " <option value=\"Bahamas\">Bahamas<\/option>";
//     strVar += " <option value=\"Bahrain\">Bahrain<\/option>";
//     strVar += " <option value=\"Bangladesh\">Bangladesh<\/option>";
//     strVar += " <option value=\"Barbados\">Barbados<\/option>";
//     strVar += " <option value=\"Belarus\">Belarus<\/option>";
//     strVar += " <option value=\"Belgium\">Belgium<\/option>";
//     strVar += " <option value=\"Belize\">Belize<\/option>";
//     strVar += " <option value=\"Benin\">Benin<\/option>";
//     strVar += " <option value=\"Bermuda\">Bermuda<\/option>";
//     strVar += " <option value=\"Bhutan\">Bhutan<\/option>";
//     strVar += " <option value=\"Bolivia\">Bolivia<\/option>";
//     strVar += " <option value=\"Bosnia and Herzegovina\">Bosnia and Herzegovina<\/option>";
//     strVar += " <option value=\"Botswana\">Botswana<\/option>";
//     strVar += " <option value=\"Brazil\">Brazil<\/option>";
//     strVar += " <option value=\"Brunei\">Brunei<\/option>";
//     strVar += " <option value=\"Bulgaria\">Bulgaria<\/option>";
//     strVar += " <option value=\"Burkina Faso\">Burkina Faso<\/option>";
//     strVar += " <option value=\"Burundi\">Burundi<\/option>";
//     strVar += " <option value=\"Cambodia\">Cambodia<\/option>";
//     strVar += " <option value=\"Cameroon\">Cameroon<\/option>";
//     strVar += " <option value=\"Canada\">Canada<\/option>";
//     strVar += " <option value=\"Cape Verde\">Cape Verde<\/option>";
//     strVar += " <option value=\"Cayman Islands\">Cayman Islands<\/option>";
//     strVar += " <option value=\"Central African Republic\">Central African Republic<\/option>";
//     strVar += " <option value=\"Chad\">Chad<\/option>";
//     strVar += " <option value=\"Chile\">Chile<\/option>";
//     strVar += " <option value=\"China\">China<\/option>";
//     strVar += " <option value=\"Colombia\">Colombia<\/option>";
//     strVar += " <option value=\"Comoros\">Comoros<\/option>";
//     strVar += " <option value=\"Congo\">Congo<\/option>";
//     strVar += " <option value=\"Congo, Democratic Republic of\">Congo, Democratic Republic of<\/option>";
//     strVar += " <option value=\"Costa Rica\">Costa Rica<\/option>";
//     strVar += " <option value=\"Cote d'Ivoire\">Cote d'Ivoire<\/option>";
//     strVar += " <option value=\"Croatia\">Croatia<\/option>";
//     strVar += " <option value=\"Cuba\">Cuba<\/option>";
//     strVar += " <option value=\"Cyprus\">Cyprus<\/option>";
//     strVar += " <option value=\"Czech Republic\">Czech Republic<\/option>";
//     strVar += " <option value=\"Denmark\">Denmark<\/option>";
//     strVar += " <option value=\"Djibouti\">Djibouti<\/option>";
//     strVar += " <option value=\"Dominica\">Dominica<\/option>";
//     strVar += " <option value=\"Dominican Republic\">Dominican Republic<\/option>";
//     strVar += " <option value=\"Ecuador\">Ecuador<\/option>";
//     strVar += " <option value=\"Egypt\">Egypt<\/option>";
//     strVar += " <option value=\"El Salvador\">El Salvador<\/option>";
//     strVar += " <option value=\"Equatorial Guinea\">Equatorial Guinea<\/option>";
//     strVar += " <option value=\"Eritrea\">Eritrea<\/option>";
//     strVar += " <option value=\"Estonia\">Estonia<\/option>";
//     strVar += " <option value=\"Ethiopia\">Ethiopia<\/option>";
//     strVar += " <option value=\"Fiji\">Fiji<\/option>";
//     strVar += " <option value=\"Finland\">Finland<\/option>";
//     strVar += " <option value=\"France\">France<\/option>";
//     strVar += " <option value=\"Gabon\">Gabon<\/option>";
//     strVar += " <option value=\"Gambia\">Gambia<\/option>";
//     strVar += " <option value=\"Georgia\">Georgia<\/option>";
//     strVar += " <option value=\"Germany\">Germany<\/option>";
//     strVar += " <option value=\"Ghana\">Ghana<\/option>";
//     strVar += " <option value=\"Greece\">Greece<\/option>";
//     strVar += " <option value=\"Greenland\">Greenland<\/option>";
//     strVar += " <option value=\"Grenada\">Grenada<\/option>";
//     strVar += " <option value=\"Guatemala\">Guatemala<\/option>";
//     strVar += " <option value=\"Guinea\">Guinea<\/option>";
//     strVar += " <option value=\"Guinea-Bissau\">Guinea-Bissau<\/option>";
//     strVar += " <option value=\"Guyana\">Guyana<\/option>";
//     strVar += " <option value=\"Haiti\">Haiti<\/option>";
//     strVar += " <option value=\"Holy See (Vatican)\">Holy See (Vatican)<\/option>";
//     strVar += " <option value=\"Honduras\">Honduras<\/option>";
//     strVar += " <option value=\"Hong Kong\">Hong Kong<\/option>";
//     strVar += " <option value=\"Hungary\">Hungary<\/option>";
//     strVar += " <option value=\"Iceland\">Iceland<\/option>";
//     strVar += " <option value=\"India\">India<\/option>";
//     strVar += " <option value=\"Indonesia\">Indonesia<\/option>";
//     strVar += " <option value=\"Iran\">Iran<\/option>";
//     strVar += " <option value=\"Iraq\">Iraq<\/option>";
//     strVar += " <option value=\"Ireland\">Ireland<\/option>";
//     strVar += " <option value=\"Israel\">Israel<\/option>";
//     strVar += " <option value=\"Italy\">Italy<\/option>";
//     strVar += " <option value=\"Jamaica\">Jamaica<\/option>";
//     strVar += " <option value=\"Japan\">Japan<\/option>";
//     strVar += " <option value=\"Jordan\">Jordan<\/option>";
//     strVar += " <option value=\"Kazakhstan\">Kazakhstan<\/option>";
//     strVar += " <option value=\"Kenya\">Kenya<\/option>";
//     strVar += " <option value=\"Kiribati\">Kiribati<\/option>";
//     strVar += " <option value=\"Korea, Democratic People's Republic of\">Korea, Democratic People's Republic of<\/option>";
//     strVar += " <option value=\"Korea, Republic of\">Korea, Republic of<\/option>";
//     strVar += " <option value=\"Kuwait\">Kuwait<\/option>";
//     strVar += " <option value=\"Kyrgyzstan\">Kyrgyzstan<\/option>";
//     strVar += " <option value=\"Laos\">Laos<\/option>";
//     strVar += " <option value=\"Latvia\">Latvia<\/option>";
//     strVar += " <option value=\"Lebanon\">Lebanon<\/option>";
//     strVar += " <option value=\"Lesotho\">Lesotho<\/option>";
//     strVar += " <option value=\"Liberia\">Liberia<\/option>";
//     strVar += " <option value=\"Libya\">Libya<\/option>";
//     strVar += " <option value=\"Liechtenstein\">Liechtenstein<\/option>";
//     strVar += " <option value=\"Lithuania\">Lithuania<\/option>";
//     strVar += " <option value=\"Luxembourg\">Luxembourg<\/option>";
//     strVar += " <option value=\"Macao\">Macao<\/option>";
//     strVar += " <option value=\"Macedonia\">Macedonia<\/option>";
//     strVar += " <option value=\"Madagascar\">Madagascar<\/option>";
//     strVar += " <option value=\"Malawi\">Malawi<\/option>";
//     strVar += " <option value=\"Malaysia\">Malaysia<\/option>";
//     strVar += " <option value=\"Maldives\">Maldives<\/option>";
//     strVar += " <option value=\"Mali\">Mali<\/option>";
//     strVar += " <option value=\"Malta\">Malta<\/option>";
//     strVar += " <option value=\"Mauritania\">Mauritania<\/option>";
//     strVar += " <option value=\"Mauritius\">Mauritius<\/option>";
//     strVar += " <option value=\"Mexico\">Mexico<\/option>";
//     strVar += " <option value=\"Micronesia\">Micronesia<\/option>";
//     strVar += " <option value=\"Moldova\">Moldova<\/option>";
//     strVar += " <option value=\"Monaco\">Monaco<\/option>";
//     strVar += " <option value=\"Mongolia\">Mongolia<\/option>";
//     strVar += " <option value=\"Montenegro\">Montenegro<\/option>";
//     strVar += " <option value=\"Morocco\">Morocco<\/option>";
//     strVar += " <option value=\"Mozambique\">Mozambique<\/option>";
//     strVar += " <option value=\"Myanmar\">Myanmar<\/option>";
//     strVar += " <option value=\"Namibia\">Namibia<\/option>";
//     strVar += " <option value=\"Nauru\">Nauru<\/option>";
//     strVar += " <option value=\"Nepal\">Nepal<\/option>";
//     strVar += " <option value=\"Netherlands\">Netherlands<\/option>";
//     strVar += " <option value=\"New Zealand\">New Zealand<\/option>";
//     strVar += " <option value=\"Nicaragua\">Nicaragua<\/option>";
//     strVar += " <option value=\"Niger\">Niger<\/option>";
//     strVar += " <option value=\"Nigeria\">Nigeria<\/option>";
//     strVar += " <option value=\"Norway\">Norway<\/option>";
//     strVar += " <option value=\"Oman\">Oman<\/option>";
//     strVar += " <option value=\"Pakistan\">Pakistan<\/option>";
//     strVar += " <option value=\"Palestinian Territory\">Palestinian Territory<\/option>";
//     strVar += " <option value=\"Panama\">Panama<\/option>";
//     strVar += " <option value=\"Papua New Guinea\">Papua New Guinea<\/option>";
//     strVar += " <option value=\"Paraguay\">Paraguay<\/option>";
//     strVar += " <option value=\"Peru\">Peru<\/option>";
//     strVar += " <option value=\"Philippines\">Philippines<\/option>";
//     strVar += " <option value=\"Poland\">Poland<\/option>";
//     strVar += " <option value=\"Portugal\">Portugal<\/option>";
//     strVar += " <option value=\"Qatar\">Qatar<\/option>";
//     strVar += " <option value=\"Romania\">Romania<\/option>";
//     strVar += " <option value=\"Russia\">Russia<\/option>";
//     strVar += " <option value=\"Rwanda\">Rwanda<\/option>";
//     strVar += " <option value=\"Saint Kitts and Nevis\">Saint Kitts and Nevis<\/option>";
//     strVar += " <option value=\"Saint Lucia\">Saint Lucia<\/option>";
//     strVar += " <option value=\"Saint Vincent and Grenadines\">Saint Vincent and Grenadines<\/option>";
//     strVar += " <option value=\"Samoa\">Samoa<\/option>";
//     strVar += " <option value=\"San Marino\">San Marino<\/option>";
//     strVar += " <option value=\"Sao Tome and Principe\">Sao Tome and Principe<\/option>";
//     strVar += " <option value=\"Saudi Arabia\">Saudi Arabia<\/option>";
//     strVar += " <option value=\"Senegal\">Senegal<\/option>";
//     strVar += " <option value=\"Serbia\">Serbia<\/option>";
//     strVar += " <option value=\"Seychelles\">Seychelles<\/option>";
//     strVar += " <option value=\"Sierra Leone\">Sierra Leone<\/option>";
//     strVar += " <option value=\"Singapore\">Singapore<\/option>";
//     strVar += " <option value=\"Slovakia\">Slovakia<\/option>";
//     strVar += " <option value=\"Slovenia\">Slovenia<\/option>";
//     strVar += " <option value=\"Solomon Islands\">Solomon Islands<\/option>";
//     strVar += " <option value=\"Somalia\">Somalia<\/option>";
//     strVar += " <option value=\"South Africa\">South Africa<\/option>";
//     strVar += " <option value=\"South Sudan\">South Sudan<\/option>";
//     strVar += " <option value=\"Spain\">Spain<\/option>";
//     strVar += " <option value=\"Sri Lanka\">Sri Lanka<\/option>";
//     strVar += " <option value=\"Sudan\">Sudan<\/option>";
//     strVar += " <option value=\"Suriname\">Suriname<\/option>";
//     strVar += " <option value=\"Swaziland\">Swaziland<\/option>";
//     strVar += " <option value=\"Sweden\">Sweden<\/option>";
//     strVar += " <option value=\"Switzerland\">Switzerland<\/option>";
//     strVar += " <option value=\"Syria\">Syria<\/option>";
//     strVar += " <option value=\"Taiwan\">Taiwan<\/option>";
//     strVar += " <option value=\"Tajikistan\">Tajikistan<\/option>";
//     strVar += " <option value=\"Tanzania\">Tanzania<\/option>";
//     strVar += " <option value=\"Thailand\">Thailand<\/option>";
//     strVar += " <option value=\"Timor-Leste\">Timor-Leste<\/option>";
//     strVar += " <option value=\"Togo\">Togo<\/option>";
//     strVar += " <option value=\"Tonga\">Tonga<\/option>";
//     strVar += " <option value=\"Trinidad and Tobago\">Trinidad and Tobago<\/option>";
//     strVar += " <option value=\"Tunisia\">Tunisia<\/option>";
//     strVar += " <option value=\"Turkey\">Turkey<\/option>";
//     strVar += " <option value=\"Turkmenistan\">Turkmenistan<\/option>";
//     strVar += " <option value=\"Tuvalu\">Tuvalu<\/option>";
//     strVar += " <option value=\"Uganda\">Uganda<\/option>";
//     strVar += " <option value=\"Ukraine\">Ukraine<\/option>";
//     strVar += " <option value=\"United Arab Emirates\">United Arab Emirates<\/option>";
//     strVar += " <option value=\"United Kingdom\">United Kingdom<\/option>";
//     strVar += " <option value=\"United States\">United States<\/option>";
//     strVar += " <option value=\"Uruguay\">Uruguay<\/option>";
//     strVar += " <option value=\"Uzbekistan\">Uzbekistan<\/option>";
//     strVar += " <option value=\"Vanuatu\">Vanuatu<\/option>";
//     strVar += " <option value=\"Venezuela\">Venezuela<\/option>";
//     strVar += " <option value=\"Viet Nam\">Viet Nam<\/option>";
//     strVar += " <option value=\"Yemen\">Yemen<\/option>";
//     strVar += " <option value=\"Zambia\">Zambia<\/option>";
//     strVar += " <option value=\"Zimbabwe\">Zimbabwe<\/option>";
//     strVar += "<\/select>";
    
//     var $divselect = $('#formContactPage .divcountry');
//     ($divselect).append(strVar).before($("#formContactPage .divcountry p"));

//     if (countryNameContactPage === undefined || countryNameContactPage === "" || countryNameContactPage === "undefined") {
//         countryNameContactPage = "Norway";
//     };
//     $("#formContactPage #country option").each(function() {
//         if ((($(this).attr("value")).replace(' ', '')).toLowerCase() == ((countryNameContactPage).replace(' ', '')).toLowerCase()) {
//             $(this).attr("selected", true);
//         }
//     });
// }


function contactShowModalSuccess() {
    $("#contactPage-message-box p.modal-title").text("Thank you");
    $("#contactPage-message-box p.modal-message").text("Thank you for contacting Orient Software Development Corporation. We will contact you shortly with more information.");

    $("#contactPage-message-box p.modal-message").css("color", "#303030");
    $("#contactPage-message-box .btnClose").css("display", "none");
    $("#contactPage-message-box .btnOk").css("display", "block");
    $('#contactPage-message-box').modal('show');
}

function contactShowModalWaiting() {
    $("#contactPage-message-box p.modal-title").text("Mensaje");
    $("#contactPage-message-box p.modal-message").text("Mesaje en proceso...");
    $("#contactPage-message-box p.modal-message").css("color", "#303030");
    $("#contactPage-message-box .btnClose").css("display", "block");
    $("#contactPage-message-box .btnOk").css("display", "none");
    $('#contactPage-message-box').modal('show');
}

//function contactShowModalErrorCaptcha() {
//    $("#contactPage-message-box p.modal-title").text("Error");
//    $("#contactPage-message-box p.modal-message").text("Incorrect captcha, please try again");
//    $("#contactPage-message-box p.modal-message").css("color", "#f5532c");
//    $("#contactPage-message-box .btnClose").css("display", "block");
//    $("#contactPage-message-box .btnOk").css("display", "none");
//    $('#contactPage-message-box').modal('show');
//}
function ContectCenteringModal(modal) {
    $(modal).
    css({
        visibility: 'hidden',
        display: 'block'
    });

    var $self = $(modal).children('div.modal-dialog');
    $self.css('margin-top', "");
    $self.css('margin-left', "");
    var userScreenHeight = $(window).height();
    var userScreenWidth = $(window).width();
    var initModalHeight = $self.outerHeight();
    var initModalWidth = $self.outerWidth();
    var maginTop = (userScreenHeight - initModalHeight) / 2;
    var marginLeft = (userScreenWidth - initModalWidth) / 2;
    if ((initModalHeight > userScreenHeight) || (initModalWidth > userScreenWidth)) {
        $self.css('overflow', 'auto');
    } else {
        $self.css('margin-top', maginTop);
        $self.css('margin-left', marginLeft);
    }

    $(modal).
    css({
        visibility: 'visible',
        display: 'none'
    });

}

function fixPlaceHolderForIe() {
    //Assign to those input elements that have 'placeholder' attribute
    $('input[placeholder]').each(function() {
        var input = $(this);
        $(input).val(input.attr('placeholder'));

        $(input).focus(function() {
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        });

        $(input).blur(function() {
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.val(input.attr('placeholder'));
            }
        });
    });
    //Assign to those textarea elements that have 'placeholder' attribute
    $('textarea[placeholder]').each(function() {
        var input = $(this);
        $(input).val(input.attr('placeholder'));

        $(input).focus(function() {
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        });

        $(input).blur(function() {
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.val(input.attr('placeholder'));
            }
        });
    });
}

