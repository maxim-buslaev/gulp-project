"use strict";function compareTableParametersMove(){$(".compare-table").find(".compare-table-aside-parameters").css("top",$(".compare-table-body").find(".product-item-title").css("height"))}function compareTableFixHeight(){$(".compare-table-body .product-item");var e,t=0,a=0,n=[];$(".compare-table-aside-parameters").find(".compare-table-aside-parameters__parameter-name").each(function(){a++,n.push(parseFloat($(this).css("height")))}),$(".compare-table-body").find(".product-item").each(function(){var a=0;e=$(this).find(".product-item-title").css("height"),parseFloat(e)>t&&(t=parseFloat(e)),$(this).find(".product-item-info-block").each(function(){e=$(this).css("height"),parseFloat(e)>n[a]&&(n[a]=parseFloat(e)),a++})}),$(".compare-table-body").find(".product-item").each(function(){var e=0;$(this).find(".product-item-title").css("height",t),$(this).find(".product-item-info-block").each(function(){$(this).css("height",n[e]),e++})});var o=0;$(".compare-table-aside-parameters").find(".compare-table-aside-parameters__parameter-name").each(function(){$(this).css("height",n[o]),o++})}function select_button(){function e(e,t){return new RegExp("\\b"+t+"\\b").test(e.className)}function t(t,a,n){var o=t.className;t.className=e(t,a)?o.replace(a,n):o.replace(n,a)}function a(t,a){e(t,a)||(t.className+=""==t.className?a:" "+a)}if(document.getElementById||document.createTextNode){for(var n=0,o=new Array,i=document.getElementsByTagName("select"),r=0;r<i.length;r++)if(e(i[r],"turnintodropdown_demo2")){var s=document.createElement("input");s.name=i[r].name,s.type="hidden",s.id=i[r].id,s.value=i[r].options[0].value,i[r].parentNode.insertBefore(s,i[r]);var c=document.createElement("a");a(c,"select--title"),c.href="#",c.onclick=function(){return t(this.parentNode.getElementsByTagName("ul")[0],"dropdownhidden_demo2","dropdownvisible_demo2"),!1},c.appendChild(document.createTextNode(i[r].options[0].text)),i[r].parentNode.insertBefore(c,i[r]);for(var d=document.createElement("ul"),l=0;l<i[r].getElementsByTagName("option").length;l++){var m=document.createElement("li"),p=document.createElement("a");m.v=i[r].getElementsByTagName("option")[l].value,m.elm=s,m.istrigger=c,p.href="#",p.appendChild(document.createTextNode(i[r].getElementsByTagName("option")[l].text)),m.onclick=function(){return this.elm.value=this.v,t(this.istrigger,"select--title active","select--title"),t(this.parentNode,"dropdownvisible_demo2","dropdownhidden_demo2"),this.istrigger.firstChild.nodeValue=this.firstChild.firstChild.nodeValue,!1},m.appendChild(p),d.appendChild(m)}a(d,"dropdownhidden_demo2");var h=document.createElement("div");h.appendChild(d),a(h,"select--body"),i[r].parentNode.insertBefore(h,i[r]),o[n]=i[r],n++}for(var u=document.getElementsByTagName("ul"),r=0;r<u.length;r++)if(e(u[r],"turnintoselect_demo2")){var f=document.createElement("form"),g=document.createElement("select");for(l=0;l<u[r].getElementsByTagName("a").length;l++){var v=document.createElement("option");v.value=u[r].getElementsByTagName("a")[l].href,v.appendChild(document.createTextNode(u[r].getElementsByTagName("a")[l].innerHTML)),g.appendChild(v)}g.onchange=function(){window.location=this.options[this.selectedIndex].value},f.appendChild(g),u[r].parentNode.insertBefore(f,u[r]),o[n]=u[r],n++}for(r=0;r<n;r++)o[r].parentNode.removeChild(o[r]);$(".select--title").click(function(){$(this).hasClass("active")?$(this).removeClass("active"):$(this).addClass("active")})}}$(document).ready(function(e){compareTableFixHeight(),compareTableParametersMove(),select_button()});var owl=$(".compare-products-slider");owl.owlCarousel({nav:!0,navText:!0,dots:!0,items:3,responsive:{0:{items:1},1024:{items:2},1440:{items:3}}});