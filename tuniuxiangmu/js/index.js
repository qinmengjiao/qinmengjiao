/**
 * Created by Administrator on 2016/2/23.
 */


(function () {

    //    我的订单用JS实现
//var list = document.getElementById("list"), firstList = list.getElementById("firstList"),map=document.getElementById("map"),list1=document.getElementById("list1");
//list.onmouseenter = function () {
//    firstList.style.display = "block";
//    utils.setCss(this,"backgroud-color","while");
//};
//list.onmouseleave = function () {
//    firstList.style.display = "none";
//};
//
//list1.onmouseenter = function () {
//    map.style.display = "block";
//};
//list1.onmouseleave = function () {
//    map.style.display = "none";
//};

//实现的不全面。待完善


//北京站的选项卡
    var choiceKa_top = document.getElementById("choiceKa_top"), oList = choiceKa_top.getElementsByTagName("li"), oDiv = choiceKa_top.getElementsByTagName("div");
    for (var i = 0; i < oList.length; i++) {
        var curL = oList[i];
        curL.zhufeng = i;
        curL.onclick = function () {
            for (var j = 0; j < oList.length; j++) {
                oList[j].className = "";
                oDiv[j].className = "";
            }
            this.className = "select";
            oDiv[this.zhufeng].className = "select";
        }
    }

//    所有产品的内容切换
    var searchList = document.getElementById("searchList");
    var searchInp = document.getElementById("searchInp");
    document.body.onclick = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement;
        if (tar.tagName.toLowerCase() === "div" && tar.id == "searchInp") {
            searchList.style.display = "block";
        }
        if (tar.tagName.toLowerCase() === "a" && tar.parentNode.parentNode.id === "searchList") {
            var step = searchInp.innerHTML;
            searchInp.innerHTML = tar.innerHTML;
            tar.innerHTML = step;
            searchList.style.display = "none";
            //return;
        }
        if (e.target.id === "searchHeightWord") {
            showList1.style.display = "block";
        } else {
            showList1.style.display = "none";
        }

    };
//获取焦点热搜栏显示
    var keywordInput = document.getElementById("keyword-input"), showList = document.getElementById("show-list"), searchTotalTop = document.getElementById("search_total_top");
    keywordInput.onfocus = function () {
        showList.style.display = "block";
        searchTotalTop.style.display = "none";
        keywordInput.placeholder = "";
    }
    keywordInput.onblur = function () {
        showList.style.display = "none";
        searchTotalTop.style.display = "block";
        keywordInput.placeholder = "日本";
    }


//    高级搜索
    var searchHeightWord = document.getElementById("searchHeightWord"), showList1 = document.getElementById("show-list1");


    var choiceKa1 = document.getElementById("choiceKa1");
    var aList = choiceKa1.getElementsByTagName("a");
    var oDivs = choiceKa1.getElementsByTagName("div");
    //for(var i=1;i<aList.length;i++){
    //    var oLi=aList[i];
    //    oLi.zhufeng=i;
    //    oLi.onmouseover=function(){
    //        this.className="select";
    //        //oDivs[this.zhufeng].className="select";
    //    };
    //    //oLi.onmouseout=function(){
    //    //        oDivs[this.zhufeng].className="";
    //    //        this.className="";
    //    //}
    //}
//萝卜图
    (function () {
        var ary = ["image/lunbo1 (1).jpeg", "image/lunbo1 (2).jpeg", "image/lunbo1 (3).jpeg", "image/lunbo1 (4).jpeg", "image/lunbo1 (5).jpeg", "image/lunbo1 (6).jpeg"];
        var ary1 = ["3月热玩推荐", "3月桂林旅游节", "跟着达人游台湾", "当地热门+京东", "新加坡樟宜机场", "3.12植树节"];
        var autoTimer = null, step = 0, count = ary.length;
        var inner = document.getElementById("inner"), imgList = inner.getElementsByTagName("img");
        var tip = document.getElementById("tip"), tipList = tip.getElementsByTagName("li");
        var btnLeft = document.getElementById("btnLeft"), btnRight = document.getElementById("btnRight");

        function bindData() {
            var str = "";
            for (i = 0; i < ary.length; i++) {
                str += "<div><img src=''trueImg='" + ary[i] + "'/></div>";
            }
            str += "<div><img src=''trueImg='" + ary[0] + "'/></div>";
            inner.innerHTML = str;
            inner.style.width = (count + 1) * 1365 + "px";
            str = "";
            for (i = 0; i < ary.length; i++) {
                str += "<li>'" + ary1[i] + "'</li>"
            }
            tip.innerHTML = str;
            selectTip();
        }

        bindData();
        window.setTimeout(lazyImg, 500);
        function lazyImg() {
            for (var i = 0; i < imgList.length; i++) {
                !function (i) {
                    var curImg = imgList[i];
                    var oImg = new Image;
                    oImg.src = curImg.getAttribute("trueImg");
                    oImg.onload = function () {
                        curImg.src = this.src;
                        curImg.style.display = "block";
                        animate(curImg, {opacity: 1}, 500);
                    }
                }(i);
            }
        }

        function selectTip() {
            var tempStep = step;
            tempStep >= tipList.length ? tempStep = 0 : null;
            for (var i = 0; i < tipList.length; i++) {
                tipList[i].className = i === tempStep ? "bg" : null;
            }
        }

        tipMove();
        function tipMove() {
            for (var i = 0; i < tipList.length; i++) {
                var curTip = tipList[i];
                curTip.index = i;
                curTip.onclick = function () {
                    window.clearInterval(autoTimer);
                    step = this.index;
                    animate(inner, {left: -step * 1365}, 500);
                    selectTip();
                    autoTimer = window.setInterval(autoMove, 2000);
                }
            }
        }

        btnLeft.onclick = function () {
            window.clearInterval(autoTimer);
            step--;
            if (step < 0) {
                step = count - 1;
                inner.style.left = -count * 1365 + "px";
            }
            animate(inner, {left: -step * 1365}, 500);
            selectTip();
            autoTimer = window.setInterval(autoMove, 2000);
        };
        btnRight.onclick = function () {
            window.clearInterval(autoTimer);
            autoMove();
            autoTimer = window.setInterval(autoMove, 2000);
        };
        function autoMove() {
            step++;
            if (step > count) {
                step = 1;
                inner.style.left = 0
            }
            animate(inner, {left: -step * 1365}, 500);
            selectTip();
        }

        autoTimer = window.setInterval(autoMove, 2000);
    })();

//    萝卜图左侧的一级导航栏的点击事件
    (function () {
        var leftNav1 = document.getElementById("leftNav-1");
        var oDivListA = leftNav1.getElementsByTagName("a");
        var leftNavDouble1 = document.getElementById("leftNav-1double");
        var oDivListB = leftNavDouble1.getElementsByTagName("div");

        //[].forEach.call(oDivListA,function(){
        //    var oDiv=arguments[0];
        //    oDiv.index=arguments[1];
        //    oDiv.onclick=function(){
        //        oDivListB[this.index].style.display="block";
        //        if(arguments[1]!=index){
        //            arguments[0].style.display="none";
        //        }
        //    }
        //})
        //
        //for(var i=0;i<oDivListA.length;i++){
        //    var curDiv=oDivListA[i];
        //    curDiv.index=i;
        //    curDiv.onclick=function(){
        //        oDivListB[this.index].style.display="block";
        //        this.style.zIndex=2+i++;
        //    }
        //}


    })();
//选项卡1
    (function () {
        var layerHeader = document.getElementById("layerHeader");
        var oLis = layerHeader.getElementsByTagName("li");
        var oDivs = layerHeader.getElementsByClassName("choice1-1");
        for (i = 0; i < oLis.length; i++) {
            var oLi = oLis[i];
            oLi.zhufeng = i;
            oLi.onmouseover = function () {
                for (var j = 0; j < oLis.length; j++) {
                    removeClass(oLis[j], "select");
                    removeClass(oDivs[j], "select");
                }
                addClass(this, "select");
                addClass(oDivs[this.zhufeng], "select");
            };
            //oLi.onmouseout=function(){
            //    removeClass(this,"select");
            //    removeClass(this,"current");
            //    removeClass( oDivs[this.zhufeng],"select");
            //    //oDivs[this.zhufeng].style.display="block";
            //}
        }

    })();
//选项卡2
    (function(){
        var layer_header = document.getElementById("layer_header");
        var oLisLayer = layer_header.getElementsByTagName("li");
        var oDivLayer = layer_header.getElementsByTagName("div");

        for (i = 0; i < oLisLayer.length; i++) {
            var oLiLayer = oLisLayer[i];
            oLiLayer.zhufeng = i;
            oLiLayer.onmouseover = function () {
                for (var j = 0; j < oDivLayer.length; j++) {
                    oLisLayer[j].className = "";
                    oDivLayer[j].className = "";
                }
                this.className = "select";
                oDivLayer[this.zhufeng].className = "select";
            };
        }
    })();
    (function(){
        var left3 = document.getElementById("left-3");
        var tabs = document.getElementById("tabs");
        var oLis = tabs.getElementsByTagName("li");
        var oDivs = left3.getElementsByTagName("div");

        for (i = 0; i < oLis.length; i++) {
            var oLi = oLis[i];
            oLi.zhufeng = i;
            oLi.onclick = function () {
                for (var j = 0; j < oDivs.length; j++) {
                    oLis[j].className = "";
                    oDivs[j].className = "";
                }
                this.className = "current";
                oDivs[this.zhufeng].className = "current";
            };
        }
    })();
    //1111111111111111111111111111111111111111111111111111111111111111111111111111111
    (function(){
        var oDiv=document.getElementById("layer_body_list_right");
        var oUl=oDiv.getElementsByTagName("ul");

       var oDiv1=document.getElementById("layer_two");
        //var ul=oDiv1.getElementsByTagName("ul");
        var aList=oDiv1.getElementsByTagName("a");

        for(var i=0;i<aList.length;i++){
              var oLi=aList[i];
             oLi.index=i;

                oLi.onclick = function () {
                    for (var j = 0; j < aList.length; j++) {
                        removeClass(aList[j],"choice");
                        oUl[j].style.display = "none";
                    }
                    window.addClass(this, "choice");
                    oUl[this.index].style.display= "block";
                };


            //oLi.onmouseout=function(){
            //    this.className="";
            //}
        }

    })()

    (function(){
        var oDiv=document.getElementById("layer_body_list_right-1");
        var oUl=oDiv.getElementsByTagName("ul");

        var oDiv1=document.getElementById("layer_three");
        var ul=oDiv1.getElementsByTagName("ul");
        var aList=ul.getElementsByTagName("a");

        for(var i=0;i<aList.length;i++){
            var oLi=aList[i];
            oLi.index=i;

            oLi.onclick = function () {
                for (var j = 0; j < aList.length; j++) {
                    removeClass(aList[j],"choice");
                    oUl[j].style.display = "none";
                }
                window.addClass(this, "choice");
                oUl[this.index].style.display= "block";
            };


            //oLi.onmouseout=function(){
            //    this.className="";
            //}
        }

    })()




    })();
