let panelComponent=(function(){
    
    function appendPanel(panelNo,author,datetime,title,content,likeitNums){
  
        let headerHtml=makePanelHeader(author,datetime);
        let contentHtml=makePanelContent(title,content);
        let opsHtml=makePanelOps(panelNo,likeitNums);
        let retPanel=makePanel(panelNo,headerHtml,contentHtml,opsHtml);
    
        return retPanel;
        
    }
    
    function makePanel(panelNo,headerHtml,contentHtml,opsHtml){
        let bOk=false;
        let str="";
        str="<div class='panel' data-no='"+panelNo+"'>"; //panel
        str+="<img src='static/images/woman.png' alt='photo' class='photo'>";  //photo
        str+= "<div class='main'>"; //main
        if(headerHtml!=="") 
            str+=headerHtml;
        else
            return bOk;
    
        if(contentHtml)
            str+=contentHtml;
        else 
            return bOk;
    
        if(opsHtml!=="")
            str+=opsHtml;
        else
            return bOk;
        
        str+="</div>"; //main end
        
       
        
        str+="</div>"; //panel end
    
        return str;
        
    }
    
    function makePanelHeader(author,datetime){
        let str="";
        str+="<div class=\"main_header\">" //header
        str+="<ul class=\"person_info\"> ";
        str+="<li>"+author+"</li>";
        str+="<li>"+datetime+"</li>";   
        str+="</ul>";   
        str+="<div class=\"toolbar\">"; //头部右边菜单
        str+="<img src=\"static/images/list.png\" alt=\"toolbar\"/>";
        str+="<ul class=\"dropdown-content\">";   
        str+="<li>置顶</li><li>加精</li><li>编辑</li><li>删除</li>";  
        str+="</ul>";
        str+= "</div>"; // 头部靠右菜单 end
        str+="</div>" ;  //主体头部 end 
        
        return str;
    }
    
    function makePanelContent(title,content){
        let str="";
        str+="<div class=\"content\">"; // <!-- 课程要点 -->
        str+="<h1>"+title+"</h1>";
        str+="<p>";
        str+=content;
        str+= "</p>";
        str+= "</div>"; //<!-- 课程要点 end -->
    
        return str;
    }
    
    function makePanelOps(panelNo,likeitNums){
        let str="";
        str+="<div class=\"buttons\" data-no='"+panelNo+"'>"  //<!-- 操作区 -->
        str+="<div class=\"like_it\">";
        str+="<img src=\"static/images/likeit.png\" alt=\"likeit\">";
        str+= "<span class=\"btn-likeit\">赞"+likeitNums+"</span>";
        str+="</div>"; //likeit end
        str+="<div class=\"chat\">"; //chat     
        str+="<img src=\"static/images/chat.png\" alt=\"chat\">";
        str+="<span class=\"btn-reply\">回复</span>";
        str+="</div>";  //chat end
        str+="</div>"; // <!-- 操作区 end -->
    
        return str;
    }
 
    
    function likeitClick(panelNums,strKey){
        for (let index = 1; index < panelNums; index++) {
           
            $(".btn-likeit").eq(index-1).on("click",function(e){
                let panelNo=$(this).parent().parent().attr("data-no");
                let keyName= strKey +panelNo;
                let likeitNums=parseInt(sessionStorage.getItem(keyName));
                likeitNums+=1;
                sessionStorage.setItem(keyName,likeitNums);
        
                $(this).text("赞"+likeitNums);
               
            });
        }
       
    }

    //删除评论面板
    function delClick(panelNums,liLen){
        for (let index = 0; index <panelNums; index++) {
            $("ul.dropdown-content li").eq(index*liLen+3).on("click",function(e){
                let panel=$(this).parents().eq(4);
                panel.remove();
                
            });
        }
    }

    //编辑标题和内容
    function editClick(panelNums,liLen){
        for (let index = 0; index <panelNums; index++) {
            $("ul.dropdown-content li").eq(index*liLen+2).on("click",function(e){
                let panelNo=$(this).parent().parent().parent().parent().parent().attr("data-no");
                let oldTitle = $(".panel[data-no=\""+panelNo+"\"] h1");
                let oldTitleText = oldTitle.text();
                let oldContent = oldTitle.next();
                let oldContentText = oldContent.html();
                oldTitle.after("<input type=\"text\" id=\"titleText\" value=\""+oldTitleText+"\"><h1 id=\"title_"+index+"\"></h1>");
                oldTitle.remove();
                let wirteTitle = $(".content input");
                $(wirteTitle).blur(function(){
                    let text = document.getElementById("titleText").value;
                    document.getElementById("title_"+index).innerHTML = text;

                    oldContent.after("<textarea class=\"contentText\" rows=\"4\">"+oldContentText+"</textarea><p id=\"content_"+index+"\"></p>");
                    let wirteContent=$(".content textarea");
                    
                    oldContent.remove();
                    wirteTitle.remove();
                    $(wirteContent).blur(function(){
                        let text = document.getElementsByClassName("contentText")[0].value;
                        document.getElementById("content_"+index).innerHTML = text;
                        
                        wirteContent.remove();
                    });
                });
            });
        }
    }

    //置顶
    function toppingClick(container,panelNums,liLen){
        for (let index = 0; index <panelNums; index++) {
           
            $("ul.dropdown-content li").eq(index*liLen).on("click",function(e){
                let panel=$(this).parents().eq(4);
                $(container).prepend(panel);

            });
        }
    }

    //加精
    function setEssenceClick(panelNums,liLen){
        for (let index = 0; index <panelNums; index++) {
            $("ul.dropdown-content li").eq(index*liLen+1).on("click",function(e){
                if($(this).text()=="加精"){
                    let panelNo=$(this).parent().parent().parent().parent().parent().attr("data-no");
                    let title = $(".panel[data-no=\""+panelNo+"\"] h1");
                    str="<span class=\"fine\">加精</span>"
                    $(title).before(str);
                    $(this).text("取消加精");
                }
                else if($(this).text()=="取消加精"){
                    let panelNo=$(this).parent().parent().parent().parent().parent().attr("data-no");
                    let fine = $(".panel[data-no=\""+panelNo+"\"] span")[0];
                    fine.remove();
                    $(this).text("加精");
                }
            });
        }
    }   
    


    return {
        appendPanel:appendPanel,
        likeitClick:likeitClick,
        delClick:delClick,
        editClick:editClick,
        toppingClick:toppingClick,
        setEssenceClick:setEssenceClick
    }
    
})();

