$(function(){

    $(".corte").click(function(){
        $(".cinta").css("display","none");
        $(".cintaRota1").css("display","block");
        $(".cintaRota2").css("display","block");

        setTimeout(function(){
            
            $(".cintaRota1").css("transform","rotate(130deg)");
            $(".cintaRota2").css("transform","rotate(-80deg)");
            fuegos();
            // $(".fireworks").css("display","block");
            // $(".fireworks").animate({"top":"-=200px"},5000);
        },100);
        setTimeout(function(){
            location.href="https://vainsainnova.com.pe/";
        },11000);

       
    });
    let num= 1;

    $(".clickAtras").click(function(){
        num = $(".copiar").length;
        $(".capaInicio").remove();
        $(".divFLotaAtras").css("display","block");
        $(".capaInvisible").click();
    });
    $(".capaInvisible").click(function(){
        $(".capaOscura").remove();
        $(".divCopiar").css("display","none");
        if($(".copiar").length==num) {
            $(".capaInvisible").remove();
            $(".clickAtras").remove();
            $(".frase_final").css("display","block");
            $(".cinta").css("display","block");
            $("body").append($("<div class='capaOscura' style='position:fixed;top:0;width:100%;height:100%'></div>"));
            $("html").scrollTop(0);
            
            // $(".cinta").css("cursor",'url("images/tijera_1.png") 50 50,pointer');
            return;
        }

        creaCapas($(".copiar").eq(num));

        
        mostrarDivCapa($(".divCopiar"+num));
        
        
        switch (num) {
            case 1:
                $(".divCopiar"+num).css({
                    "left":$(".copiar").eq(num).offset().left+300,
                    "top":$(".copiar").eq(num).offset().top+150
                    });
                break;
            case 2:
                $(".divCopiar"+num).css({
                    "left":$(".copiar").eq(num).offset().left+$(".copiar").eq(num).width()+parseInt($(".copiar").eq(num).css("padding-left"))+parseInt($(".copiar").eq(num).css("padding-right")) + 100,
                    "top":$(".copiar").eq(num).offset().top+100
                    });
                break;
            case 3:
                $(".divCopiar"+num).css({
                    "left":"50%",
                    "top":$(".copiar").eq(num).offset().top-200
                    });
                break;
            default:
                break;
        }

        num++;
        
    });

    mostrarDivCapa = function(miDiv){

        let div = $(miDiv);

        div.css("display","block");
        div.find("img").css("opacity","0");
        div.find("img").animate({opacity:1},2000);

    }

    creaCapa = function(){
        return $("<div class='capaOscura'></div>").clone();
    }

    let creaCapas = function(value){
        let div = $(value),
            top = div.offset().top,
            left = div.offset().left,
            width = div.width()+parseInt(div.css("padding-left"))+parseInt(div.css("padding-right")),
            height = div.height()+parseInt(div.css("padding-bottom"))+parseInt(div.css("padding-top"));
        
      
        let pIzq = left,
            pDer = pIzq + width,
            pArr = top,
            pAba = top + height;

        let capaIzquierda = creaCapa().css({top:0,height:$("html").height(),width:left}),
            capaDerecha = creaCapa().css({top:0,left:pDer,height:$("html").height(),width:$("html").width()-pDer}),
            capaArriba = creaCapa().css({top:0,left:pIzq,height:pArr,width:width}),
            capaAbajo = creaCapa().css({top:pAba,left:pIzq,height:$("html").height()-pAba,width:width});


        $("body").append(capaIzquierda);
        $("body").append(capaDerecha);
        $("body").append(capaArriba);
        $("body").append(capaAbajo);
        $("html").scrollTop(top-100)
    }

    $("#siClaro").click(function(){
        $(".capaInicio").remove();
        $(".divFLotaAtras").css("display","block")
        creaCapas($(".copiar").eq(0));
        $(".divCopiar0").css("display","block");
        $(".divCopiar0").css("left",$(".copiar").eq(0).offset().left-500);
        $(".divCopiar0 img").css("opacity","0");
        $(".divCopiar0 img").animate({opacity:1},3000);
    });
    $("#site").click(function(){
        

        location.href="https://vainsainnova.com.pe/";   
    });

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max+1 - min)) + min;
    }
    function getRandomFloat(min, max) {
        return Math.random() * (max+1 - min) + min;
    }

    fuegos = function(){
        //crea misiles
        let cantidad = getRandom(200,40),
            cantTipoMisil = 2,
            cantTipoExplo = 5;

        for (let i = 0; i < cantidad ; i++) {
            let tipoMisil = getRandom(1,cantTipoMisil);

            if(tipoMisil==1){
                tipoExplo = getRandom(3,5);
            }else{
                tipoExplo = getRandom(1,2);
            }
                
            
                crearMisil (tipoMisil,tipoExplo);

        }
        

        
    }

    crearMisil = function(tipoMisil, tipoExplo){
            
        let misil = $('<div class="divMisil"><img class="misil" src="images/misil'+tipoMisil+'.png" alt=""><img class="explo" style="width:50%" src="images/explo'+tipoExplo+'.png"></div>'),
            left = getRandom(30,1500),
            lanz = getRandomFloat(0,10),
            altura = getRandomFloat(500,400);

        misil.css("left",left);

        

        $("body").append(misil);
        

        setTimeout(function(){
            misil.css("display","block");
            
            

            misil.animate({"bottom":"+="+altura,"opacity":"1"},1500,function(){
                misil.find(".misil").css("display","none");
                misil.find(".explo").css("display","block");

                let exploLeft = -1* (misil.find(".misil").width() + misil.find(".explo").width())/2;
            console.log(exploLeft);
            misil.find(".explo").css("left",exploLeft);

                let wi = misil.find(".explo").width()/2,
                he = misil.find(".explo").height()/2;

                misil.find(".explo").animate({opacity:0,width:"100%"},2000);
                misil.animate({left:"-="+wi+"px",bottom:"-="+he+"px"},2000);

            });
        },lanz*1000);
    }


    
});