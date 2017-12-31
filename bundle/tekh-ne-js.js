
var countryNameContactPage = '';

$(document).ready((function () {
    $.ajax({
        url: "https://freegeoip.net/json/",
        dataType: 'json',
        success: function (data) {
            countryNameContactPage = data.country_name;        
            tryUsAddDataToSelectList();
        }
    })
    
}));



function logoAnimation() {
    $(window).scrollTop() > 0 ? ($(".logo").stop().animate({
        opacity: "0",
        top: "-45"
    }, 350, "linear"), $(".logo-small").stop().animate({
        opacity: "1",
        top: "3"
    }, 350, "linear"), $("nav#navigation > ul").addClass("menu-orient-menu-small"), $(".header-effect > div.visible-lg").addClass("try-us-now-small"), $("button#button_menu").addClass("navbar-toggle-small"), $("button#button_menu").addClass("navbar-toggle-exit-small"), $("header.header-effect").hasClass("header-flag") ? ($(".header-effect").css("height", "auto"), $(".navbar-brand").css("height", 48)) : $(window).width() > 991 ? ($(".header-effect").css("height", 58), $(".navbar-brand").css("height", 48)) : ($(".header-effect").css("height", 42), $(".navbar-brand").css("height", 42))) : ($(".logo").stop().animate({
        opacity: "1",
        top: "0"
    }, 350, "linear"), $(".logo-small").stop().animate({
        opacity: "0",
        top: "65"
    }, 350, "linear"), $("nav#navigation > ul").removeClass("menu-orient-menu-small"), $(".header-effect > div.visible-lg").removeClass("try-us-now-small"), $("button#button_menu").removeClass("navbar-toggle-small"), $("button#button_menu").removeClass("navbar-toggle-exit-small"), $(window).width() > 991 ? ($(".header-effect").css("height", 71), $(".navbar-brand").css("height", 70)) : ($(".header-effect").css("height", 56), $(".navbar-brand").css("height", 55)));
    $(window).width() < 992 && ($(window).scrollTop() > 0 ? $("#navigation").css("margin-top", 42) : $("#navigation").css("margin-top", 55))
}

function isMobile() {
    return {
        Android: function() {
            return navigator.userAgent.match(/Android/i)
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i)
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i)
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i)
        },
        any: function() {
            return isMobile().Android() || isMobile().BlackBerry() || isMobile().iOS() || isMobile().Opera() || isMobile().Windows()
        }
    }
}

function setHeightMenuForMobile() {
    if ($(window).width() <= 991) {
        var n = $(window).height(),
            t = n - 69;
        $("#navigation").css("max-height", t)
    } else $("#navigation").css("max-height", "auto")
}

function addCollapseOnLevel() {
    var t = 0,
        n;
    $("span.item-level1-click").each(function() {
        t += 1;
        $(this).append('<span class="arrow"><\/span>')
    });
    n = 0;
    $("span.item-level2-click").each(function() {
        n++;
        $(this).append('<span class="arrow"><\/span>')
    });
    $("ul.third-level > li").each(function() {
        $(this).addClass("menuItem-hidden")
    })
}

function addTilteforMobile() {
    $(".title-submenu").each(function() {
        $(this).children("p").addClass("menuItem-hidden");
        $(this).children("p").after('<p class="mobile-title"><a href=""><\/a><\/p>');
        var n = $(this).parents("li").children("a").attr("href"),
            t = $(this).parents("li").children("a").text();
        $(this).children("p.mobile-title").children("a").attr("href", n);
        $(this).children("p.mobile-title").children("a").text(t)
    })
}

function addDivOverlay() {
    $('<div class="overlay"><\/div>').insertAfter("#content")
}

function clickOnMenuMobile() {
    $("nav#navigation > ul > li.dropdown > span.item-level1-click").click(function() {
        var n = $(this).parents("li").children("a").text();
        $(this).text() !== "Home" ? $(this).text("Home").append('<span class="back"><\/span>') : $(this).text(n).append('<span class="arrow"><\/span>');
        $("nav#navigation > ul > li").each(function() {
            $(this).toggleClass("menuItem-hidden")
        });
        $(this).parents("li").removeClass("menuItem-hidden");
        $(this).parents("li").children("ul.submenu-container").toggleClass("has-submenu");
        $(this).parents("li").find("ul.second-level").toggleClass("has-submenu")
    });
    $("ul.second-level > li.dropdown > span.item-level2-click").click(function() {
        var n = $(this).parents("li.title-submenu").children("p.mobile-title").children("a").text(),
            t = $(this).text();
        clickFLag == !0 ? ($(this).text(n).append('<span class="back"><\/span>'), $(this).parents("li.title-submenu").children("p.mobile-title").children("a").text(t), clickFLag = !1) : ($(this).text(n).append('<span class="arrow"><\/span>'), $(this).parents("li.title-submenu").children("p.mobile-title").children("a").text(t), clickFLag = !0);
        $(this).parents("ul.second-level").children("li.dropdown").children("a").toggleClass("menuItem-hidden item-title");
        $(this).parents("ul.second-level").children("li.dropdown").children("p").toggleClass("menuItem-hidden item-title");
        $(this).removeClass("menuItem-hidden item-title");
        $(this).parents("ul.content-items").children("li.dropdown").toggleClass("menuItem-hidden");
        $(this).parents("ul.second-level").children("li.dropdown").toggleClass("menuItem-hidden");
        $(this).parents("li.dropdown").removeClass("menuItem-hidden");
        $(this).parents("li.dropdown").children("span.item-level1-click").toggleClass("menuItem-hidden");
        $(this).parents("ul.submenu-container").children("li.title-submenu").children("p.mobile-title").toggleClass("menuItem-hidden");
        $(this).parents("li.dropdown").children("ul.third-level").children("li").toggleClass("menuItem-hidden")
    })
}

function removeLinkforTitle() {
    $("li.title-submenu > a").each(function() {
        $(this).wrap("<p><\/p>")
    })
}

function removeUnderline() {
    $("ul.second-level > li:not(:has(>ul))").each(function() {
        $(this).children("a").css("border-bottom", "none");
        $(this).children("p").css("border-bottom", "none")
    })
}

function setActiveItemMenuWhenOpenSubPage(n) {
    $("nav#navigation > ul > li").each(function() {
        $(this).children("a").attr("href") == n && $(this).addClass("current")
    })
}

function addMenuItemClick() {
    $("nav#navigation > ul > li.dropdown").each(function() {
        if ($(this).has("ul")) {
            var n = $(this).children("a").html();
            $(this).children("a").addClass("menuItem-hidden");
            $(this).children("a").before('<span class="item-level1-click">' + n + "<\/span>")
        }
    });
    $("ul.second-level > li.dropdown > span").each(function() {
        var n = $(this).html();
        $(this).addClass("menuItem-hidden");
        $(this).before('<span class="item-level2-click">' + n + "<\/span>")
    });
    $("ul.second-level > li.dropdown > a").each(function() {
        var n = $(this).html();
        $(this).addClass("menuItem-hidden");
        $(this).before('<span class="item-level2-click">' + n + "<\/span>")
    })
}

function addAsideSecondToContent() {
    var n = $("#aside-second"),
        t;
    n.length && (n.addClass(" clearfix "), t = $("#content-submenu div.nav-submenu"), t.length > 0 ? (n.prependTo(t), $('<br class="hidden-lg  lineBreak-inSubMenuContent">').prependTo($(".nav-submenu nav#aside-second")).before($(".nav-submenu nav#aside-second h2"))) : n.remove())
}

function collapseSubMenuContent() {
    var t = $(".nav-submenu nav#aside-second ul.navbar-nav"),
        n;
    t.addClass("collapseParent");
    n = 0;
    t.children("li").each(function() {
        $(this).addClass("panel row");
        n++;
        $(this).children("a").wrap("<span/>");
        $(this).addClass("clearfix");
        $(this).children("span").addClass("group-menuItem");
        $(this).children("ul").length && $('<span class="bullet-icon"><a class="icon-collapse-closed menu-icon " data-parent=".collapseParent"  data-toggle="collapse"><\/a><a class="icon-collapse-opened menu-icon class-displayNone"  data-parent=".collapseParent"  data-toggle="collapse"><\/a><\/span>').prependTo($(this).children("span"));
        $(this).children("span.group-menuItem").children("span.bullet-icon").children("a.menu-icon").attr("href", "#collapse" + n);
        $(this).children("ul").attr("id", "collapse" + n);
        $(this).children("ul").addClass(" collapse ul-collapse")
    })
}

function changeMenuTagName() {
    var t = $(".nav-submenu nav#aside-second ul.navbar-nav"),
        n;
    t.replaceWith(function() {
        var n = $("<table/>");
        return n.addClass("nav navbar-nav menu collapseParent"), n.html(this.innerHTML), n
    });
    n = $(".collapseParent li.panel");
    n.replaceWith(function() {
        var n = $("<td/>");
        return n.addClass("dropdown panel clearfix"), n.html(this.innerHTML), n
    })
}

function getAllItemWidthInSubMenu() {
    $("#content-submenu").is(":visible") ? ($(".collapseParent >li >span.group-menuItem >a").css("font-weight", "bold"), $("nav#aside-second .collapseParent").children("li").each(function() {
        $(this).css("display", "inherit");
        $(this).css("width", $(this).outerWidth())
    }), $("nav#aside-second .collapseParent").children("li").each(function() {
        listWidthOfItem.push($(this).outerWidth());
        $(this).css("display", "table-cell")
    }), $(".collapseParent >li >span.group-menuItem >a").css("font-weight", "inherit")) : ($("#content-submenu").removeClass("hidden-xs"), $(".collapseParent >li >span.group-menuItem >a").css("font-weight", "bold"), $("nav#aside-second .collapseParent").children("li").each(function() {
        $(this).css("display", "inherit");
        $(this).css("width", $(this).outerWidth())
    }), $("nav#aside-second .collapseParent").children("li").each(function() {
        listWidthOfItem.push($(this).outerWidth());
        $(this).css("display", "table-cell")
    }), $(".collapseParent >li >span.group-menuItem >a").css("font-weight", "inherit"), $("#content-submenu").addClass("hidden-xs"))
}

function getAllItemWidthInSubMenuWhenResize() {
    $(".collapseParent span.group-menuItem >a").css("font-weight", "bold");
    $("nav#aside-second .collapseParent td").each(function() {
        $(this).css("width", $(this).outerWidth())
    });
    var n = 0;
    $("nav#aside-second .collapseParent td").each(function() {
        listWidthOfItem[n] = $(this).outerWidth();
        $(this).css("display", "table-cell");
        n++
    });
    $(".collapseParent  span.group-menuItem >a").css("font-weight", "inherit")
}

function rearrangeMenuInContent() {
    var n = 1,
        c = 0,
        r, t, u, o, s, i, f, e, h;
    for ($(".collapseParent").width("100%"), r = $(".collapseParent").width(), t = clone(listWidthOfItem), changeMenuTagName(), u = 0; u < t.length; u++)
        if (c += t[u], c <= r) n++;
        else break;
    for (o = !1; o == !1;) rearrangeMenuInContentTestInRow(t, n, r) == !0 && rearrangeMenuInContentTestInColumns(t, n, r) == !0 ? o = !0 : n--;
    for (n < 1 && (n = 1), s = parseInt(t.length / n), t.length % n > 0 && s++, i = 1; i <= s; i++)
        for ($('<tr class="menuContent-row menuContent-row' + i + '"><\/tr>').appendTo($(".collapseParent")), f = 0; f < n; f++) e = $("nav#aside-second .collapseParent").children("td").first(), h = $(".menuContent-row" + i), e.css("width", t[(i - 1) * n + f]), e.length && h.length && e.appendTo(h)
}

function clone(n) {
    var i, t;
    if (null == n || "object" != typeof n) return n;
    i = n.constructor();
    for (t in n) n.hasOwnProperty(t) && (i[t] = n[t]);
    return i
}

function rearrangeMenuWhenResize() {
    var t = clone(listWidthOfItem),
        r, e, o, h, i, u, c;
    $(".collapseParent").width("100%");
    var f = $(".collapseParent").width() + 1,
        s = 0,
        n = 1;
    for (r = 0; r < t.length; r++)
        if (s += t[r], s <= f) n++;
        else break;
    for (e = !1; e == !1;) rearrangeMenuInContentTestInRow(t, n, f) == !0 && rearrangeMenuInContentTestInColumns(t, n, f) == !0 ? e = !0 : n--;
    for (n < 1 && (n = 1), o = parseInt(t.length / n), t.length % n > 0 && o++, h = $(".collapseParent td"), $(".collapseParent").html($("<tbody><\/tbody>")), i = 1; i <= o; i++)
        for ($('<tr class="menuContent-row menuContent-row' + i + '"><\/tr>').appendTo($(".collapseParent")), u = 1; u <= n; u++) c = h[(i - 1) * n + u - 1], $(".collapseParent tr.menuContent-row" + i).append(c);
    $(".collapseParent").width("inherit")
}

function rearrangeMenuInContentTestInRow(n, t, i) {
    var e = parseInt(n.length / t),
        r, f, u;
    for (n.length % t > 0 && e++, r = 1; r <= e; r++)
        for (f = 0, u = t * (r - 1); u < t * (r - 1) + t; u++)
            if (f += n[u], f > i) return !1;
    return !0
}

function rearrangeMenuInContentTestInColumns(n, t, i) {
    var s = parseInt(n.length / t),
        u, r, e, f, o;
    for (n.length % t > 0 && s++, u = clone(n), r = 0; r < t; r++) {
        for (e = 0, f = 0; f < s; f++) u[f * t + r] > e && (e = u[f * t + r]);
        for (o = 0; o < s; o++) u[o * t + r] = e
    }
    return rearrangeMenuInContentTestInRow(u, t, i)
}

function tryUsSendEmail() {
    var t = window.location.href,
        i = $("#popupTryUsNow #txtname").val().replace(/^\s+|\s+$/g, ""),
        r = $("#popupTryUsNow #txtemail").val().replace(/^\s+|\s+$/g, ""),
        u = $("#popupTryUsNow #txtcompany").val().replace(/^\s+|\s+$/g, ""),
        f = $("#popupTryUsNow #country").val(),
        e = $("#popupTryUsNow #txtmessage").val().replace(/^\s+|\s+$/g, ""),
        n = {};
    n.action = "TryOurServices";
    n.name = i;
    n.email = r;
    n.company = u;
    n.country = f;
    n.message = e;
    tryUsShowModalWaiting();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/api/OSDService/email",
        data: JSON.stringify(n),
        dataType: "text",
        timeout: 1e5,
        success: function() {
            clearInputField();
            tryUsShowModalSuccess();
            goog_report_conversion(t)
        },
        error: function() {
            tryUsShowErrorDialog()
        }
    })
}

function tryUsCheckName() {
    var n = $("#popupTryUsNow #txtname").val().replace(/^\s+|\s+$/g, "");
    return n == "" ? ($("#popupTryUsNow #ername").text("Required(*)"), $("#popupTryUsNow #ername").css("display", "block"), $("#popupTryUsNow #txtname").css("border-color", "#f5532c"), !1) : ($("#popupTryUsNow #txtname").css("border-color", "#e5e5e5"), !0)
}

function tryUsCheckCompanyName() {
    var n = $("#popupTryUsNow #txtcompany").val().replace(/^\s+|\s+$/g, "");
    return n == "" ? ($("#popupTryUsNow #ercomp").text("Required(*)"), $("#popupTryUsNow #ercomp").css("display", "block"), $("#popupTryUsNow #txtcompany").css("border-color", "#f5532c"), !1) : ($("#popupTryUsNow #txtcompany").css("border-color", "#e5e5e5"), !0)
}

function tryUsCheckEmail() {
    var n = $("#popupTryUsNow #txtemail").val().replace(/^\s+|\s+$/g, ""),
        t;
    return n == "" ? ($("#popupTryUsNow #eremail").text("Required(*)"), $("#popupTryUsNow #eremail").css("display", "block"), $("#popupTryUsNow #txtemail").css("border-color", "#f5532c"), !1) : (t = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,63})?$/, !t.test(n)) ? ($("#popupTryUsNow #eremail").text("Invalid email format!"), $("#popupTryUsNow #eremail").css("display", "block"), $("#popupTryUsNow #txtemail").css("border-color", "#f5532c"), !1) : ($("#popupTryUsNow #eremail").css("display", "none"), $("#popupTryUsNow #txtemail").css("border-color", "#e5e5e5"), !0)
}

function tryUsCheckMessage() {
    var n = $("#popupTryUsNow #txtmessage").val().replace(/^\s+|\s+$/g, "");
    return n == "" ? ($("#popupTryUsNow #ermessage").text("Required(*)"), $("#popupTryUsNow #txtmessage").css("border-color", "#f5532c"), $("#popupTryUsNow #ermessage").css("display", "block"), !1) : ($("#popupTryUsNow #ermessage").css("display", "none"), $("#popupTryUsNow #txtmessage").css("border-color", "#e5e5e5"), !0)
}

function tryUsCheckAll() {
    var n = !0;
    tryUsCheckName() || (n = !1);
    tryUsCheckEmail() || (n = !1);
    tryUsCheckCompanyName() || (n = !1);
    tryUsCheckMessage() || (n = !1);
    n && tryUsSendEmail()
}

function tryUsShowModalSuccess() {
    $("#try-us-message-box p.modal-title").text("Thank you");
    $("#try-us-message-box p.modal-message").css("color", "#303030");
    $("#try-us-message-box p.modal-message").text("Thank you for contacting Orient Software Development Corporation. We will contact you shortly with more information.");
    $("#try-us-message-box .btnClose").css("display", "none");
    $("#try-us-message-box .btnOk").css("display", "block");
    $("#try-us-message-box").modal("show");
    $("#popupTryUsNow").modal("hide")
}

function tryUsShowModalWaiting() {
    $("#try-us-message-box p.modal-title").text("Message");
    $("#try-us-message-box p.modal-message").text("Message in processing...");
    $("#try-us-message-box p.modal-message").css("color", "#303030");
    $("#try-us-message-box .btnClose").css("display", "block");
    $("#try-us-message-box .btnOk").css("display", "none");
    $("#try-us-message-box").modal("show")
}

function tryUsAddDataToSelectList() {
    var n = "";
    n += '<select id="country" class=" col-sm-11 col-xs-12 select-country" size="1" name="country">';
    n += ' <option value="Afghanistan">Afghanistan<\/option>';
    n += ' <option value="Albania">Albania<\/option>';
    n += ' <option value="Algeria">Algeria<\/option>';
    n += ' <option value="American Samoa">American Samoa<\/option>';
    n += ' <option value="Andorra">Andorra<\/option>';
    n += ' <option value="Angola">Angola<\/option>';
    n += ' <option value="Antarctica">Antarctica<\/option>';
    n += ' <option value="Antigua and Barbuda">Antigua and Barbuda<\/option>';
    n += ' <option value="Argentina">Argentina<\/option>';
    n += ' <option value="Armenia">Armenia<\/option>';
    n += ' <option value="Australia">Australia<\/option>';
    n += ' <option value="Austria">Austria<\/option>';
    n += ' <option value="Azerbaijan">Azerbaijan<\/option>';
    n += ' <option value="Bahamas">Bahamas<\/option>';
    n += ' <option value="Bahrain">Bahrain<\/option>';
    n += ' <option value="Bangladesh">Bangladesh<\/option>';
    n += ' <option value="Barbados">Barbados<\/option>';
    n += ' <option value="Belarus">Belarus<\/option>';
    n += ' <option value="Belgium">Belgium<\/option>';
    n += ' <option value="Belize">Belize<\/option>';
    n += ' <option value="Benin">Benin<\/option>';
    n += ' <option value="Bermuda">Bermuda<\/option>';
    n += ' <option value="Bhutan">Bhutan<\/option>';
    n += ' <option value="Bolivia">Bolivia<\/option>';
    n += ' <option value="Bosnia and Herzegovina">Bosnia and Herzegovina<\/option>';
    n += ' <option value="Botswana">Botswana<\/option>';
    n += ' <option value="Brazil">Brazil<\/option>';
    n += ' <option value="Brunei">Brunei<\/option>';
    n += ' <option value="Bulgaria">Bulgaria<\/option>';
    n += ' <option value="Burkina Faso">Burkina Faso<\/option>';
    n += ' <option value="Burundi">Burundi<\/option>';
    n += ' <option value="Cambodia">Cambodia<\/option>';
    n += ' <option value="Cameroon">Cameroon<\/option>';
    n += ' <option value="Canada">Canada<\/option>';
    n += ' <option value="Cape Verde">Cape Verde<\/option>';
    n += ' <option value="Cayman Islands">Cayman Islands<\/option>';
    n += ' <option value="Central African Republic">Central African Republic<\/option>';
    n += ' <option value="Chad">Chad<\/option>';
    n += ' <option value="Chile">Chile<\/option>';
    n += ' <option value="China">China<\/option>';
    n += ' <option value="Colombia">Colombia<\/option>';
    n += ' <option value="Comoros">Comoros<\/option>';
    n += ' <option value="Congo">Congo<\/option>';
    n += ' <option value="Congo, Democratic Republic of">Congo, Democratic Republic of<\/option>';
    n += ' <option value="Costa Rica">Costa Rica<\/option>';
    n += " <option value=\"Cote d'Ivoire\">Cote d'Ivoire<\/option>";
    n += ' <option value="Croatia">Croatia<\/option>';
    n += ' <option value="Cuba">Cuba<\/option>';
    n += ' <option value="Cyprus">Cyprus<\/option>';
    n += ' <option value="Czech Republic">Czech Republic<\/option>';
    n += ' <option value="Denmark">Denmark<\/option>';
    n += ' <option value="Djibouti">Djibouti<\/option>';
    n += ' <option value="Dominica">Dominica<\/option>';
    n += ' <option value="Dominican Republic">Dominican Republic<\/option>';
    n += ' <option value="Ecuador">Ecuador<\/option>';
    n += ' <option value="Egypt">Egypt<\/option>';
    n += ' <option value="El Salvador">El Salvador<\/option>';
    n += ' <option value="Equatorial Guinea">Equatorial Guinea<\/option>';
    n += ' <option value="Eritrea">Eritrea<\/option>';
    n += ' <option value="Estonia">Estonia<\/option>';
    n += ' <option value="Ethiopia">Ethiopia<\/option>';
    n += ' <option value="Fiji">Fiji<\/option>';
    n += ' <option value="Finland">Finland<\/option>';
    n += ' <option value="France">France<\/option>';
    n += ' <option value="Gabon">Gabon<\/option>';
    n += ' <option value="Gambia">Gambia<\/option>';
    n += ' <option value="Georgia">Georgia<\/option>';
    n += ' <option value="Germany">Germany<\/option>';
    n += ' <option value="Ghana">Ghana<\/option>';
    n += ' <option value="Greece">Greece<\/option>';
    n += ' <option value="Greenland">Greenland<\/option>';
    n += ' <option value="Grenada">Grenada<\/option>';
    n += ' <option value="Guatemala">Guatemala<\/option>';
    n += ' <option value="Guinea">Guinea<\/option>';
    n += ' <option value="Guinea-Bissau">Guinea-Bissau<\/option>';
    n += ' <option value="Guyana">Guyana<\/option>';
    n += ' <option value="Haiti">Haiti<\/option>';
    n += ' <option value="Holy See (Vatican)">Holy See (Vatican)<\/option>';
    n += ' <option value="Honduras">Honduras<\/option>';
    n += ' <option value="Hong Kong">Hong Kong<\/option>';
    n += ' <option value="Hungary">Hungary<\/option>';
    n += ' <option value="Iceland">Iceland<\/option>';
    n += ' <option value="India">India<\/option>';
    n += ' <option value="Indonesia">Indonesia<\/option>';
    n += ' <option value="Iran">Iran<\/option>';
    n += ' <option value="Iraq">Iraq<\/option>';
    n += ' <option value="Ireland">Ireland<\/option>';
    n += ' <option value="Israel">Israel<\/option>';
    n += ' <option value="Italy">Italy<\/option>';
    n += ' <option value="Jamaica">Jamaica<\/option>';
    n += ' <option value="Japan">Japan<\/option>';
    n += ' <option value="Jordan">Jordan<\/option>';
    n += ' <option value="Kazakhstan">Kazakhstan<\/option>';
    n += ' <option value="Kenya">Kenya<\/option>';
    n += ' <option value="Kiribati">Kiribati<\/option>';
    n += " <option value=\"Korea, Democratic People's Republic of\">Korea, Democratic People's Republic of<\/option>";
    n += ' <option value="Korea, Republic of">Korea, Republic of<\/option>';
    n += ' <option value="Kuwait">Kuwait<\/option>';
    n += ' <option value="Kyrgyzstan">Kyrgyzstan<\/option>';
    n += ' <option value="Laos">Laos<\/option>';
    n += ' <option value="Latvia">Latvia<\/option>';
    n += ' <option value="Lebanon">Lebanon<\/option>';
    n += ' <option value="Lesotho">Lesotho<\/option>';
    n += ' <option value="Liberia">Liberia<\/option>';
    n += ' <option value="Libya">Libya<\/option>';
    n += ' <option value="Liechtenstein">Liechtenstein<\/option>';
    n += ' <option value="Lithuania">Lithuania<\/option>';
    n += ' <option value="Luxembourg">Luxembourg<\/option>';
    n += ' <option value="Macao">Macao<\/option>';
    n += ' <option value="Macedonia">Macedonia<\/option>';
    n += ' <option value="Madagascar">Madagascar<\/option>';
    n += ' <option value="Malawi">Malawi<\/option>';
    n += ' <option value="Malaysia">Malaysia<\/option>';
    n += ' <option value="Maldives">Maldives<\/option>';
    n += ' <option value="Mali">Mali<\/option>';
    n += ' <option value="Malta">Malta<\/option>';
    n += ' <option value="Mauritania">Mauritania<\/option>';
    n += ' <option value="Mauritius">Mauritius<\/option>';
    n += ' <option value="Mexico">Mexico<\/option>';
    n += ' <option value="Micronesia">Micronesia<\/option>';
    n += ' <option value="Moldova">Moldova<\/option>';
    n += ' <option value="Monaco">Monaco<\/option>';
    n += ' <option value="Mongolia">Mongolia<\/option>';
    n += ' <option value="Montenegro">Montenegro<\/option>';
    n += ' <option value="Morocco">Morocco<\/option>';
    n += ' <option value="Mozambique">Mozambique<\/option>';
    n += ' <option value="Myanmar">Myanmar<\/option>';
    n += ' <option value="Namibia">Namibia<\/option>';
    n += ' <option value="Nauru">Nauru<\/option>';
    n += ' <option value="Nepal">Nepal<\/option>';
    n += ' <option value="Netherlands">Netherlands<\/option>';
    n += ' <option value="New Zealand">New Zealand<\/option>';
    n += ' <option value="Nicaragua">Nicaragua<\/option>';
    n += ' <option value="Niger">Niger<\/option>';
    n += ' <option value="Nigeria">Nigeria<\/option>';
    n += ' <option  value="Norway">Norway<\/option>';
    n += ' <option value="Oman">Oman<\/option>';
    n += ' <option value="Pakistan">Pakistan<\/option>';
    n += ' <option value="Palestinian Territory">Palestinian Territory<\/option>';
    n += ' <option value="Panama">Panama<\/option>';
    n += ' <option value="Papua New Guinea">Papua New Guinea<\/option>';
    n += ' <option value="Paraguay">Paraguay<\/option>';
    n += ' <option value="Peru">Peru<\/option>';
    n += ' <option value="Philippines">Philippines<\/option>';
    n += ' <option value="Poland">Poland<\/option>';
    n += ' <option value="Portugal">Portugal<\/option>';
    n += ' <option value="Qatar">Qatar<\/option>';
    n += ' <option value="Romania">Romania<\/option>';
    n += ' <option value="Russia">Russia<\/option>';
    n += ' <option value="Rwanda">Rwanda<\/option>';
    n += ' <option value="Saint Kitts and Nevis">Saint Kitts and Nevis<\/option>';
    n += ' <option value="Saint Lucia">Saint Lucia<\/option>';
    n += ' <option value="Saint Vincent and Grenadines">Saint Vincent and Grenadines<\/option>';
    n += ' <option value="Samoa">Samoa<\/option>';
    n += ' <option value="San Marino">San Marino<\/option>';
    n += ' <option value="Sao Tome and Principe">Sao Tome and Principe<\/option>';
    n += ' <option value="Saudi Arabia">Saudi Arabia<\/option>';
    n += ' <option value="Senegal">Senegal<\/option>';
    n += ' <option value="Serbia">Serbia<\/option>';
    n += ' <option value="Seychelles">Seychelles<\/option>';
    n += ' <option value="Sierra Leone">Sierra Leone<\/option>';
    n += ' <option value="Singapore">Singapore<\/option>';
    n += ' <option value="Slovakia">Slovakia<\/option>';
    n += ' <option value="Slovenia">Slovenia<\/option>';
    n += ' <option value="Solomon Islands">Solomon Islands<\/option>';
    n += ' <option value="Somalia">Somalia<\/option>';
    n += ' <option value="South Africa">South Africa<\/option>';
    n += ' <option value="South Sudan">South Sudan<\/option>';
    n += ' <option value="Spain">Spain<\/option>';
    n += ' <option value="Sri Lanka">Sri Lanka<\/option>';
    n += ' <option value="Sudan">Sudan<\/option>';
    n += ' <option value="Suriname">Suriname<\/option>';
    n += ' <option value="Swaziland">Swaziland<\/option>';
    n += ' <option value="Sweden">Sweden<\/option>';
    n += ' <option value="Switzerland">Switzerland<\/option>';
    n += ' <option value="Syria">Syria<\/option>';
    n += ' <option value="Taiwan">Taiwan<\/option>';
    n += ' <option value="Tajikistan">Tajikistan<\/option>';
    n += ' <option value="Tanzania">Tanzania<\/option>';
    n += ' <option value="Thailand">Thailand<\/option>';
    n += ' <option value="Timor-Leste">Timor-Leste<\/option>';
    n += ' <option value="Togo">Togo<\/option>';
    n += ' <option value="Tonga">Tonga<\/option>';
    n += ' <option value="Trinidad and Tobago">Trinidad and Tobago<\/option>';
    n += ' <option value="Tunisia">Tunisia<\/option>';
    n += ' <option value="Turkey">Turkey<\/option>';
    n += ' <option value="Turkmenistan">Turkmenistan<\/option>';
    n += ' <option value="Tuvalu">Tuvalu<\/option>';
    n += ' <option value="Uganda">Uganda<\/option>';
    n += ' <option value="Ukraine">Ukraine<\/option>';
    n += ' <option value="United Arab Emirates">United Arab Emirates<\/option>';
    n += ' <option value="United Kingdom">United Kingdom<\/option>';
    n += ' <option value="United States">United States<\/option>';
    n += ' <option value="Uruguay">Uruguay<\/option>';
    n += ' <option value="Uzbekistan">Uzbekistan<\/option>';
    n += ' <option value="Vanuatu">Vanuatu<\/option>';
    n += ' <option value="Venezuela">Venezuela<\/option>';
    n += ' <option value="Viet Nam">Viet Nam<\/option>';
    n += ' <option value="Yemen">Yemen<\/option>';
    n += ' <option value="Zambia">Zambia<\/option>';
    n += ' <option value="Zimbabwe">Zimbabwe<\/option>';
    n += "<\/select>";

    var i = $(".divcountry");
    i.append(n).before($(".divcountry p"));
    
    if (countryNameContactPage === undefined || countryNameContactPage === "" || countryNameContactPage === "undefined") {
        countryNameContactPage = "Norway";
    };
    $("#country option").each(function() {
        if ((($(this).attr("value")).replace(' ', '')).toLowerCase() == ((countryNameContactPage).replace(' ', '')).toLowerCase()) {
            $(this).attr("selected", true);
        }
    });
}

function TryUsNowCenteringModal(n) {
    var t;
    $(n).css({
        visibility: "hidden",
        display: "block"
    });
    t = $(n).children("div.modal-dialog");
    t.css("margin-top", "");
    t.css("margin-left", "");
    var i = $(window).height(),
        r = $(window).width(),
        u = t.outerHeight(),
        f = t.outerWidth(),
        e = (i - u) / 2,
        o = (r - f) / 2;
    u > i || f > r ? t.css("overflow", "auto") : (t.css("margin-top", e), t.css("margin-left", o));
    $(n).css({
        visibility: "visible",
        display: "none"
    })
}

function clearInputField() {
    $("#popupTryUsNow #txtname").val("");
    $("#popupTryUsNow #txtemail").val("");
    $("#popupTryUsNow #txtcompany").val("");
    $("#popupTryUsNow #txtmessage").val("");
    $("#popupTryUsNow #txtname").css("border-color", "#e5e5e5");
    $("#popupTryUsNow #txtcompany").css("border-color", "#e5e5e5");
    $("#popupTryUsNow #eremail").css("display", "none");
    $("#popupTryUsNow #txtemail").css("border-color", "#e5e5e5");
    $("#popupTryUsNow #ermessage").css("display", "none");
    $("#popupTryUsNow #txtmessage").css("border-color", "#e5e5e5")
}

function tryUsShowErrorDialog() {
    $("#try-us-message-box p.modal-title").text("Error");
    $("#try-us-message-box p.modal-message").text("An error occurred, please try again later!");
    $("#try-us-message-box p.modal-message").css("color", "#f5532c");
    $("#try-us-message-box .btnClose").css("display", "block");
    $("#try-us-message-box .btnOk").css("display", "none");
    $("#try-us-message-box").modal("show")
}

function fixPlaceHolderForIe() {
    $("input[placeholder]").each(function() {
        var n = $(this);
        $(n).val(n.attr("placeholder"));
        $(n).focus(function() {
            n.val() == n.attr("placeholder") && n.val("")
        });
        $(n).blur(function() {
            (n.val() == "" || n.val() == n.attr("placeholder")) && n.val(n.attr("placeholder"))
        })
    });
    $("textarea[placeholder]").each(function() {
        var n = $(this);
        $(n).val(n.attr("placeholder"));
        $(n).focus(function() {
            n.val() == n.attr("placeholder") && n.val("")
        });
        $(n).blur(function() {
            (n.val() == "" || n.val() == n.attr("placeholder")) && n.val(n.attr("placeholder"))
        })
    })
}
var listWidthOfItem, doRearrangeMenuInContent;
goog_snippet_vars = function() {
    var n = window;
    n.google_conversion_id = 982855017;
    n.google_conversion_label = "TH7qCNbwgF4Q6drU1AM";
    n.google_remarketing_only = !1
};
goog_report_conversion = function(n) {
    var t, i;
    goog_snippet_vars();
    window.google_conversion_format = "3";
    window.google_is_call = !0;
    t = {};
    t.onload_callback = function() {
        typeof n != "undefined" && (window.location = n)
    };
    i = window.google_trackConversion;
    typeof i == "function" && i(t)
};
var clicked = !1,
    prevItemUrl = "#start",
    clickFLag = !0;
$(document).ready(function() {
    var f, u, n, e, i, r, o;
    for ($("nav#navigation > ul").css("display", "block"), f = $("nav#navigation > ul"), u = 0; u < f[0].children.length; u++)
        if (n = f[0].children[u].children[1], typeof n != "undefined")
            for (n.className = n.className + "submenu-container menu-hover", e = n.children[0], i = n.children[0].children[1], e.className = e.className + " title-submenu", i.className = i.className + "content-items", r = 0; r < i.children.length; r++) o = i.children[r], o.className = o.className + " column" + (r + 1);
    $(window).width() > 767 && $("#homeCarousel").attr("data-interval", 12e3);
    $(window).width() < 768 && $("#homeCarousel").attr("data-interval", "false");
    $(window).resize(function() {
        if ($(window).width() < 768) {
            $("#homeCarousel").attr("data-interval", "false");
            $("#homeCarousel").carousel("pause");
            return
        }
        $(window).width() > 767 && ($("#homeCarousel").attr("data-interval", 12e3), $("#homeCarousel").carousel("cycle"))
    });
    $("nav#navigation > ul > li").each(function() {
        $(this).removeClass("current")
    });
    $("ul.content-items > li > ul").addClass("second-level");
    $("ul.content-items > li > ul > li > ul").addClass("third-level");
    $("ul.submenu-container").addClass("show-flag");
    var t = $(location).attr("href"),
        h = "/services",
        c = "/technologies",
        l = "/how-we-work",
        a = "/who-we-are",
        v = "/careers",
        y = "/contact";
    if (t.indexOf(h) >= 0 && setActiveItemMenuWhenOpenSubPage(h), t.indexOf(c) >= 0 && setActiveItemMenuWhenOpenSubPage(c), t.indexOf(l) >= 0 && setActiveItemMenuWhenOpenSubPage(l), t.indexOf(a) >= 0 && setActiveItemMenuWhenOpenSubPage(a), t.indexOf(v) >= 0 && setActiveItemMenuWhenOpenSubPage(v), t.indexOf(y) >= 0 && setActiveItemMenuWhenOpenSubPage(y), $(window).resize(function() {
            $(window).width() > 991 && ($("nav#navigation > ul").css("height", ""), $("#navigation").removeClass("in"), $("#navigation").addClass("collapse"), $("#button_menu").removeClass("navbar-toggle-exit"), $("#button_menu").addClass("navbar-toggle"))
        }), $(window).bind("resize", function() {
            if ($(window).scrollTop() > 0 ? $(window).width() > 991 ? ($(".header-effect").css("height", 58), $(".navbar-brand").css("height", 48)) : ($(".header-effect").css("height", 42), $(".navbar-brand").css("height", 42)) : $(window).width() > 991 ? ($(".header-effect").css("height", 71), $(".navbar-brand").css("height", 70)) : ($(".header-effect").css("height", 55), $(".navbar-brand").css("height", 55)), $(window).width() <= 991) {
                var n = $(window).height(),
                    t = n - 69;
                $("#navigation").css("max-height", t)
            } else $("#navigation").css("max-height", "auto")
        }), $(window).bind("scroll", function() {
            $(window).scrollTop() > 0 ? ($(".logo").stop().animate({
                opacity: "0",
                top: "-45"
            }, 350, "linear"), $(".logo-small").stop().animate({
                opacity: "1",
                top: "3"
            }, 350, "linear"), $("nav#navigation > ul").addClass("menu-orient-menu-small"), $(".header-effect > div.visible-lg").addClass("try-us-now-small"), $("button#button_menu").addClass("navbar-toggle-small"), $("button#button_menu").addClass("navbar-toggle-exit-small"), $("header.header-effect").hasClass("header-flag") ? ($(".header-effect").css("height", "auto"), $(".navbar-brand").css("height", 48)) : $(window).width() > 991 ? ($(".header-effect").css("height", 58), $(".navbar-brand").css("height", 48)) : ($(".header-effect").css("height", 42), $(".navbar-brand").css("height", 42))) : ($(".logo").stop().animate({
                opacity: "1",
                top: "0"
            }, 350, "linear"), $(".logo-small").stop().animate({
                opacity: "0",
                top: "65"
            }, 350, "linear"), $("nav#navigation > ul").removeClass("menu-orient-menu-small"), $(".header-effect > div.visible-lg").removeClass("try-us-now-small"), $("button#button_menu").removeClass("navbar-toggle-small"), $("button#button_menu").removeClass("navbar-toggle-exit-small"), $(window).width() > 991 ? ($(".header-effect").css("height", 71), $(".navbar-brand").css("height", 70)) : ($(".header-effect").css("height", 56), $(".navbar-brand").css("height", 55)));
            $(window).width() < 992 && ($(window).scrollTop() > 0 ? $("#navigation").css("margin-top", 42) : $("#navigation").css("margin-top", 55))
        }), $("button.navbar-toggle").click(function() {
            if ($(window).width() <= 991) {
                var n = $(window).height(),
                    t = n - 69;
                $("#navigation").css("max-height", t)
            } else $("#navigation").css("max-height", "auto");
            $(this).toggleClass("navbar-toggle navbar-toggle-exit")
        }), isMobile().Android() && $(window).width() > 991) $("nav#navigation > ul > li").on("click", function() {
        var n = $(this).children("a").attr("href");
        if (clicked == !1) {
            if (clicked = !0, n.toLowerCase().indexOf(prevItemUrl.toLowerCase()) == -1) clicked = !1;
            else return clicked = !0, !0;
            return $(this).hasClass("dropdown") ? (prevItemUrl = n, !1) : !0
        }
        return !0
    });
    if (isMobile().iOS()) {
        $("ul.menu-hover a").on("click touchstart touchend", function() {
            var n = $(this),
                t = n.attr("href");
            window.location = t
        });
        $("#content").on("click touchstart touchend", function(n) {
            $(n.target).closest("nav#navigation > ul > li").length || $("nav#navigation > ul > li").trigger("mouseout")
        })
    }
    var p = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i),
        w = navigator.userAgent.indexOf("Chrome") > -1,
        s = navigator.userAgent.indexOf("Safari") > -1;
    w && s && (s = !1);
    (isMobile().any() || isMobile().iOS() || p || s) && $(".banner-text > div > p").last().addClass("banner-text-cross");
    addDivOverlay();
    removeLinkforTitle();
    addMenuItemClick();
    addTilteforMobile();
    addCollapseOnLevel();
    clickOnMenuMobile();
    removeUnderline();
    $("nav#navigation > ul > li").mouseover(function() {
        var n = 0,
            t = 0,
            i = 0,
            r = 0,
            u = 0;
        $(window).width() >= 960 && ($(this).has("ul.menu-hover").length && ($(this).children("ul.menu-hover").css({
            visibility: "hidden",
            display: "block"
        }), n = $(this).find("li.column1").outerWidth(!0), t = $(this).find("li.column2").outerWidth(!0), i = $(this).find("li.column3").outerWidth(!0), r = n + t + i, u = (810 - r) / 2, $(this).find("li.column1").css("margin-right", u), $(this).children("ul.menu-hover").css({
            visibility: "",
            display: "none"
        }), $("div.overlay").css("z-index", 900), $("div.overlay").stop().animate({
            opacity: "0.8"
        }, 800)), $(this).children("a").addClass("a-hover"), $(".header-effect").addClass("header-flag"), $(".header-effect").css("height", "auto"));
        $("ul.submenu-container").removeClass("show-flag")
    }).mouseout(function() {
        $("ul.submenu-container").addClass("show-flag");
        $(this).children("a").removeClass("a-hover");
        $(this).find("li.column1").css("margin-right", "");
        $(".header-effect").removeClass("header-flag");
        $(window).scrollTop() > 0 && ($(window).width() > 991 ? $(".header-effect").css("height", 58) : $(".header-effect").css("height", 42));
        $("div.overlay").stop().animate({
            opacity: "0"
        }, 800, function() {
            $("div.overlay").css("z-index", -900)
        })
    });
    $(window).bind("load", function() {
        logoAnimation()
    })
});
listWidthOfItem = [];
setTimeout(function() {
    addAsideSecondToContent();
    collapseSubMenuContent()
}, 100);
$(window).resize(function() {
    clearTimeout(doRearrangeMenuInContent);
    doRearrangeMenuInContent = setTimeout(function() {
        rearrangeMenuWhenResize()
    }, 100)
});
setTimeout(function() {
    getAllItemWidthInSubMenu();
    rearrangeMenuInContent();
    $(".collapseParent .group-menuItem >a").each(function() {
        var n = $(this).attr("href");
        $(this).addClass("menuInContent-text");
        typeof n != "undefined" ? $(this).addClass("hasHref") : $(this).addClass("noneHref")
    })
}, 300);
setTimeout(function() {
    $(".collapseParent ").on("show.bs.collapse", ".ul-collapse", function() {
        $(".menuContent-row").children("td").each(function() {
            var n = $(this),
                t = Math.ceil($(this)[0].getBoundingClientRect().width),
                i = n.width(),
                r = n.height(),
                u = $(this).css("min-height") || 0;
            ($(this).css("min-height") == "auto" || parseInt(u) < 1) && $(this).css("min-height", r);
            $(".lt-ie9").length ? $(this).css("max-width", i + 1) : $(this).css("max-width", t)
        });
        $(".menuContent-row .in").collapse("hide");
        var n = $(this).parents("td");
        n.children("span.group-menuItem").children("a.menuInContent-text").addClass("collapse-shown");
        n.children("span.group-menuItem").children("span.bullet-icon").children("a.icon-collapse-closed").removeClass("class-displayNone");
        n.children("span.group-menuItem").children("span.bullet-icon").children("a.icon-collapse-opened").removeClass("class-displayNone");
        n.children("span.group-menuItem").children("span.bullet-icon").children("a.icon-collapse-closed").addClass("class-displayNone")
    });
    $(".collapseParent ").on("hidden.bs.collapse", ".ul-collapse", function() {
        var n = $(this).parents("td");
        n.children("span.group-menuItem").children("a.menuInContent-text").removeClass("collapse-shown");
        n.children("span.group-menuItem").children("span.bullet-icon").children("a.icon-collapse-closed").removeClass("class-displayNone");
        n.children("span.group-menuItem").children("span.bullet-icon").children("a.icon-collapse-opened").removeClass("class-displayNone");
        n.children("span.group-menuItem").children("span.bullet-icon").children("a.icon-collapse-opened").addClass("class-displayNone")
    })
}, 1200);
$(function() {
    // tryUsAddDataToSelectList();
    $("#popupTryUsNow #txtname").val("");
    $("#popupTryUsNow #txtemail").val("");
    $("#popupTryUsNow #txtcompany").val("");
    $("#popupTryUsNow #txtmessage").val("");
    TryUsNowCenteringModal("#try-us-message-box")
});
$("#popupTryUsNow").on("shown.bs.modal", function() {
    $(".modal-backdrop").addClass("try-us-now-backdrop");
    clearInputField();
    $("#popupTryUsNow").css("height", "1%");
    $("#popupTryUsNow").animate({
        height: "100%"
    }, 800)
});
$("#popupTryUsNow .close-form").click(function() {
    $("#popupTryUsNow").animate({
        height: "0%"
    }, 500, function() {
        $(".try-us-now-backdrop").animate({
            opacity: 0
        }, 400, function() {
            $("#popupTryUsNow").modal("hide")
        })
    })
});
$("#popupTryUsNow").on("hidden.bs.modal", function() {
    $(".modal-backdrop").removeClass("try-us-now-backdrop")
});
$("#popupTryUsNow #txtname").focus(function() {
    $("#popupTryUsNow #ername").css("display", "none");
    $("#popupTryUsNow #txtname").css("border-color", "#e5e5e5")
});
$("#popupTryUsNow #txtemail").focus(function() {
    $("#popupTryUsNow #eremail").css("display", "none");
    $("#popupTryUsNow #txtemail").css("border-color", "#e5e5e5")
});
$("#popupTryUsNow #txtcompany").focus(function() {
    $("#popupTryUsNow #ercomp").css("display", "none");
    $("#popupTryUsNow #txtcompany").css("border-color", "#e5e5e5")
});
$("#popupTryUsNow #txtmessage").focus(function() {
    $("#popupTryUsNow #ermessage").css("display", "none");
    $("#popupTryUsNow #txtmessage").css("border-color", "#e5e5e5")
})
