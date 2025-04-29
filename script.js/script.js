var titleInput=document.querySelector('#title');
var descriptionInput=document.querySelector('#description');
var addBtn=document.querySelector('#addBtn');
var deleteBtn=document.querySelector('#deleteBtn');
var search_input=document.querySelector('#search_input');
var setToUpdateBtn=document.querySelector('#setToUpdateBtn');
var updateBtn=document.querySelector('#updateBtn');
var doneBtn=document.querySelector('#done');
var objList=[];
var newIndex=0;
var updatedIndex;
var searchedCard=[];
var str;
var titelErroes=document.querySelector('#titel-erroes');
var descErroes=document.querySelector('#desc-erroes');

if(localStorage.getItem("toDoList") !==null)
{
    objList=JSON.parse(localStorage.getItem('toDoList'));
    if(objList.length>0)
    {
        newIndex=objList[objList.length-1]?.id.split(' ')[1]*1;
    }else{newIndex=0;}
    displayCard(objList);
}

function add()
{
    if(validateTitle()==true && validateDescription()==true) //not correct way but the deadline on fire
    {
        newIndex++;
        var cardObj={
            id:`card ${newIndex}`,
            title:titleInput.value,
            description:descriptionInput.value,
            isDone:false
            
        }
        objList.push(cardObj)
        setToLocalStorage()
    }else
    {
     alert('Invalid Data ')
    }
  
}
function setToLocalStorage()
{
    localStorage.setItem('toDoList',JSON.stringify(objList))
}
addBtn.addEventListener('click',function(){
    add();
    setToLocalStorage();
    displayCard(objList);
    clearInput()
    resetErrors()

})

function displayCard(arr)
{
    var cartona=``;
    for(var i=0 ; i < arr.length; i++)
    {
        cartona+=`<div class="card ${arr[i].isDone===true?'markDone':''}"id='${arr[i].id}'>
            <h4>Title :${arr[i].title} </h4>
            <br>
            <h4>Description :${arr[i].description} </h4>
             <div class="icons">
             <span><i class="fa-solid fa-trash" id="deleteBtn" onclick="deleteCard('${arr[i].id}')"></i></span>
             <span><i class="fa-regular fa-pen-to-square" id="setToUpdateBtn" onclick="setToUpdateCard('${arr[i].id}')"></i></span>
             <span><i class="fa-solid fa-check" id="done" onclick=" markDone('${arr[i].id}') "></i></span>
             </div>
        </div>`
    }
    document.querySelector('#container').innerHTML=cartona;
}

function deleteCard(id)
{
    for(var i=0; i<objList.length;i++)
    {
        if(objList[i].id==id)
        {
        objList.splice(i,1);
        searchedCard.splice(i,1)
        break;
        }    
    }
if(search_input.value)
{
    displayCard(searchedCard);
    setToLocalStorage();
}
else
{ displayCard(objList);
    setToLocalStorage();}


}


function search()
{
    var searchedCard=[];
    var term=search_input.value;
    for(var i=0;i<objList.length;i++)
    {
        if( objList[i].title.toLowerCase().includes(term.toLowerCase()))
        {
            searchedCard.push( objList[i]);
        }
    }
    displayCard(searchedCard);
}
search_input.addEventListener('input',function(){
    search();
})
function clearInput()
{
    titleInput.value=null;
    descriptionInput.value=null;
}

function setToUpdateCard(index)
{
    for(var i=0;i<objList.length;i++)
    {
        if(objList[i].id==index)
        {
            titleInput.value=objList[i].title;
            descriptionInput.value=objList[i].description;
        }
    }
    updatedIndex=index;
    updateBtn.classList.remove('hideBtn');
    addBtn.classList.add('hideBtn');

}
function updateCard()
{
    for(var i=0;i<objList.length;i++)
    {
        if(objList[i].id==updatedIndex)
        {
            objList[i].title=titleInput.value;
            objList[i].description=descriptionInput.value;
        }
        
    }
    updateBtn.classList.add('hideBtn');
    addBtn.classList.remove('hideBtn');
}

updateBtn.addEventListener('click',function(){ 
    updateCard();
    displayCard(objList);
    setToLocalStorage();
    clearInput();
    resetErrors();
    
})

function markDone(id)
{
    var item;
for(var i=0;i<objList.length;i++)
 {
    if(objList[i].id==id)
    {
     item=objList[i];
     break;
    }
 }
 if(item.isDone===true)
 {
    item.isDone=false;
 }else{item.isDone=true;}
 var card=document.getElementById(id)
 if(item.isDone)
 {
    card.classList.add('markDone')
 }else{card.classList.remove('markDone')}
 setToLocalStorage()
}
function validateTitle()
{
var regex=/^[A-Z][A-Za-z\s\d]{2,10}$/;
var str=titleInput.value;
if(regex.test(str)==true)
{
return true;
}else{titelErroes.classList.replace('d-none','d-block')}
}
function validateDescription()
{
    var regex=/^[A-Z][A-Za-z\s]{19,}/;
    var str =descriptionInput.value;
    if(regex.test(str)==true)
    {
        return true;
    }else{descErroes.classList.replace('d-none','d-block')}
}
titleInput.addEventListener('blur',validateTitle);
descriptionInput.addEventListener('blur',validateDescription);
function resetErrors()
{
    descErroes.classList.replace('d-block','d-none')
    titelErroes.classList.replace('d-block','d-none')
}