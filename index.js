var titleInput=document.querySelector('#title');
var descriptionInput=document.querySelector('#description');
var addBtn=document.querySelector('#addBtn');
var deleteBtn=document.querySelector('#deleteBtn');
var search_input=document.querySelector('#search_input');
var setToUpdateBtn=document.querySelector('#setToUpdateBtn');
var updateBtn=document.querySelector('#updateBtn');
var doneBtn=document.querySelectorAll('#done');
var objList=[];
var searchedCard=[];
var term="";
var newIndex=0;
var updatedIndex;

if(localStorage.getItem("toDoList") !==null)
{
    objList=JSON.parse(localStorage.getItem('toDoList'));
    newIndex=parseInt(objList[objList.length-1]?.id.split(' ')[1]);
    displayCard(objList);
}   

function add()
{
    newIndex++;
    var cardObj={
        id:`card ${newIndex}`   ,
        title:titleInput.value,
        description:descriptionInput.value,
        isDone:false
        
    }
    
    objList.push(cardObj)
    setToLocalStorage()

    
}

function setToLocalStorage()
{
    localStorage.setItem('toDoList',JSON.stringify(objList))
}
addBtn.addEventListener('click',function(){
    add();
    displayCard(objList);
    clearInput()

})


function displayCard(arr)
{
    var cartona=``;
    for(var i=0 ; i < arr.length; i++)
    {
        cartona+=`<div class="card ${arr[i].isDone===true?'markDone':''}" id="${arr[i].id}" >
            <h4>Title :${arr[i].title} </h4>
            <h4>Description :${arr[i].description} </h4>
             <div class="icons">
             <span><i class="fa-solid fa-trash" id="deleteBtn" onclick="deleteCard('${arr[i].id}')"></i></span>
             <span><i class="fa-regular fa-pen-to-square" id="setToUpdateBtn" onclick="setToUpdateCard(${i})"></i></span>
             <span><i class="fa-solid fa-check" id="done" onclick="markDone('${arr[i].id}')"></i></span>
             </div>
        </div>`
    }
    document.querySelector('#container').innerHTML=cartona;
 var allCards=   document.querySelectorAll('.card');
 for(var i=0;i<allCards.length;i++)
 {
    if(arr[i].isDone ===true)
    {
        allCards[i].classList.add('markDone');
    }
 }
}

function deleteCard(id,index)
{  
    console.log(id);
    var deletedItemIndex;
    for(var i =0;i<objList.length;i++){
        if(objList[i].id==id){
            deletedItemIndex=i;
            break;
        }   
    }
objList.splice(deletedItemIndex,1);
if(term !==""&&term!=null){
// displayCard(searchedCard);
search()
}else{
    displayCard(objList);
}
setToLocalStorage();
// index=updatedIndex;
newIndex = objList.length-1;
// location.reload();
}


function search()
{
    searchedCard = [];
    term=search_input.value;
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
    updatedIndex=index;
    titleInput.value=objList[index].title;
    descriptionInput.value=objList[index].description;
    updateBtn.classList.remove('hideBtn');
    addBtn.classList.add('hideBtn');

}
function updateCard()
{
    objList[updatedIndex].title=titleInput.value;
    objList[updatedIndex].description=descriptionInput.value;
    updateBtn.classList.add('hideBtn');
    addBtn.classList.remove('hideBtn');
}

updateBtn.addEventListener('click',function(){ 
    updateCard();
    displayCard(objList);
    setToLocalStorage();
    clearInput();
    
})
// doneBtn.addEventListener('click',function(){
//     var card=document.querySelectorAll('.card')
// card[index].classList.add('markDone')
// })
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
    if(item.isDone === true)
    {
        item.isDone=false;
    }else{
        item.isDone=true;
    }

    // item.isDone=!item.isDone;
    var card=document.getElementById(id);
    if(item.isDone){

        card.classList.add('markDone');
    }else{
    card.classList.remove('markDone');
    }
    setToLocalStorage();

}























































// var addBtn = document.querySelector('#addBtn');
// var titleInput=document.querySelector('#title');
// var descInput=document.querySelector('#desc');
// var deleteBtn =document.getElementById('deleteBtn');
// var search_input=document.getElementById('search_input');
// var updateBtn=document.getElementById('updateBtn');
// var editBtn=document.getElementById('editBtn');
// var done=document.getElementById('done');
// var obj_list=[];
// var updatedIndex;

// if( localStorage.getItem("to do") !==null)
// {
//     obj_list=JSON.parse( localStorage.getItem("to do"));
//     display(obj_list);
// }

// function Add()
// {
//     var obj={
//         title:titleInput.value,
//         desc:descInput.value
//     }
//     obj_list.push(obj);
//     display(obj_list);
//     localStorage.setItem("to do", JSON.stringify(obj_list));    
    

//     // console.log(obj_list);
//     return  obj_list;

// }
// function display(arr)
// {
//     var cartona=``;
//     for(var i=0;i<arr.length;i++)
//     {
//         cartona+=` <div class="card ">
//         <h4>Title : ${arr[i].title}</h4>
//         <h4>Description : ${arr[i].desc}</h4>
//         <div class="icons">
//             <span><i class="fa-solid fa-trash" id="deleteBtn" onclick="deleteCard(${i})"></i></span>
//             <span><i class="fa-regular fa-pen-to-square" id="updateBtn" onclick="setToUpdateCard(${i})"></i></span>
//             <span><i class="fa-solid fa-check" id="done" onclick=" markDone(${i}) "></i></span>
//         </div>
//      </div>`
//     }
//     document.getElementById('container').innerHTML=cartona;
// }

// addBtn.addEventListener('click' , function(e){
//     Add();
//     clearInputs();
// })

// function setToUpdateCard(i)
// {
//     updatedIndex=i;
//     addBtn.classList.add('hideBtn');
//     editBtn.classList.remove('hideBtn');
//     titleInput.value=obj_list[i].title;
//     descInput.value=obj_list[i].desc;  
// }

// function UpdateCard()
// {
//     obj_list[updatedIndex].title= titleInput.value ;    
//     obj_list[updatedIndex].desc=descInput.value;
//     display(obj_list);
//     localStorage.setItem("to do", JSON.stringify(obj_list));
//     clearInputs();
//     addBtn.classList.remove('hideBtn');
//     editBtn.classList.add('hideBtn');


// }
// editBtn.addEventListener('click', UpdateCard);
// function deleteCard(i)
// {
//     obj_list.splice(i,1);
//     display(obj_list);
//     localStorage.setItem("to do", JSON.stringify(obj_list));
// }


// // function searchItem()
// // {
// //     var cartona=[];
// //     for(var i=0;i<obj_list.length;i++)
// //     {
// //         term=search_input.value;
// //         if(obj_list[i].title.toLowerCase().includes(term.toLowerCase()))
// //         {
// //             cartona+=` <div class="card">
// //         <h4>Title : ${obj_list[i].title}</h4>
// //         <h4>Description : ${obj_list[i].desc}</h4>
// //         <div class="icons">
// //             <span><i class="fa-solid fa-trash" id="deleteBtn" onclick="deleteCard(${i})"></i></span>
// //             <span><i class="fa-regular fa-pen-to-square" id="update"></i></span>
// //             <span><i class="fa-solid fa-check" id="done"></i></span>
// //         </div>
// //      </div>`
// //         }
// //         document.getElementById('container').innerHTML=cartona;
// //     }
// // }
// function searchItem()
// {
// var searchedElement=[];
// for(var i=0;i<obj_list.length;i++)
// {
//     term=search_input.value;
//     if(obj_list[i].title.toLowerCase().includes(term.toLowerCase()))
//     {
//         searchedElement.push(obj_list[i]);
//     }
//     document.getElementById('container').innerHTML=searchedElement;
//     display(searchedElement);
   
// }
// // 
// }
// search_input.addEventListener('input',searchItem);
    

// function clearInputs()
// {
//     titleInput.value=" ";
//     descInput.value=" ";

// }



// function markDone(index) 
// {
//     var card=document.querySelectorAll('.card');
//     if (card !==null) {
//         card[index].style.backgroundColor = 'greenyellow';
//         card[index].style.opacity = '0.3';
//     }
    
// }
