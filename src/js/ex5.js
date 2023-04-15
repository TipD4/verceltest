const PANEL_NUMS=8;
const MENU_NUMS=4; 
const LIKEIT_NUMS=100;
const LIKEIT_STR="likeitNums";

function createPanels(panelNums){
    let objContainer=document.getElementsByClassName('container')[0];
    let strHtml="";
    for(let i=1;i<=panelNums;i++){
        strHtml+=addOnePanel(i);   
    }
    addHtmlIntoDoc(objContainer,strHtml);
    panelComponent.likeitClick(panelNums,LIKEIT_STR);
    panelComponent.toppingClick(objContainer,panelNums,MENU_NUMS);
    panelComponent.delClick(panelNums,MENU_NUMS);
    panelComponent.editClick(panelNums,MENU_NUMS);
    panelComponent.setEssenceClick(panelNums,MENU_NUMS);
}

function addOnePanel(i){

    let author="zjvivi";
    let now=new Date();
    let datetime=now.toLocaleString();
    let title="22-23-2学期第"+i+"周",
        content="1.上课认真听；<br/>2.笔记马上记；<br/>3.作业及时交；<br/>4. 课后要复习；";
    let likeitNums=LIKEIT_NUMS;
    let panelNo=i;

    return panelComponent.appendPanel(panelNo,author,datetime,title,content,likeitNums);
    
}

/**
 * 
 * @param {Number} nums 要生成的panel数目
 */
function makeSessionNums(nums){
    for(i=1;i<=nums;i++){
        let keyName=LIKEIT_STR+i;
        sessionStorage.setItem(keyName,LIKEIT_NUMS);
    }
}
function initData(){
    makeSessionNums(PANEL_NUMS);
}

function init(){
    initData();
    createPanels(PANEL_NUMS);
}

init();