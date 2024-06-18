let bname=document.querySelector('#bName');
let author=document.querySelector('#bAuth');
let code=document.querySelector('#bCode');
let upload=document.querySelector('#submit');
let ul=document.querySelector('ul')
let stackList=document.querySelector('.stackList');
let delNotify=document.querySelector('.delete');
let sucNotify=document.querySelector('.sucess');
let mode=document.querySelector('.mode');
let body=document.querySelector('body');

// theme change feature
mode.addEventListener('click',()=>{
alert('will be updated soon')
})

// loading content on page load
document.addEventListener('DOMContentLoaded',()=>{
    UI.displayBooks();
})
//creating date
let date=new Date();
function dateCreation(){
    let day=date.getDay();
    let month=date.getMonth();
    let  year=date.getFullYear();
    return `${day}-${month}-${year} `
}

//grabbing list of books array from local storage if not initialise []
let listOfBooks=localStorage.getItem('bookList')? JSON.parse(localStorage.getItem('bookList')):[]


// book class for book representation of a single book 
class Book {
    constructor(name,author,code){
        this.name=name;
        this.author=author;
        this.code=code;
    }
}

//UI class for ui methods and modifiaction
class UI {
    static displayBooks(){
        ul.innerHTML='';
        let book=Storage.loadBooks();//fetching from local storeage

        // displaying each book with for Each loop
    book.forEach((Ibook,index)=>{
    let li=document.createElement('li');
    li.classList.add('list');
    let ibtn=document.createElement('i');
    ibtn.classList.add('deletebtn')
    ibtn.classList.add('fa-solid');
    ibtn.classList.add('fa-trash');
        let templete=`
        <div class="bookDetails">
        <div class="date">date:<span class="dateSpan">${dateCreation()}</span> </div>
        <div class="data">
        <div class="bookN">${Ibook.name}</div>
        <div class="authourN">${Ibook.author}</div>
        <div class="codeB">${Ibook.code}</div>
    </div>
    </div>`
    li.innerHTML=templete;
    li.appendChild(ibtn);
    ul.appendChild(li);
    console.log(li);

    // delete button feature
    ibtn.addEventListener('click',(e)=>{
        console.log("old",listOfBooks);
        listOfBooks.splice(index,1);
        Storage.setBook();
        UI.displayNotification('delete');
         UI.removeNotification('delete');
    })
    })

    }
    // function to show sucess /delete notification
    static displayNotification(process){
        if(process=='delete'){
            delNotify.style.opacity="0.8";
        }
       else{
           sucNotify.style.opacity="0.8"
    }
    }

    // function to remove sucess /delete notification after 1 second
    static removeNotification(process){
        if(process=='delete'){
          setTimeout(()=>{
              delNotify.style.opacity="0";
          },1000);
        }
        setTimeout(()=>{
            sucNotify.style.opacity="0";
        },1000);

    }
 

}
// to handle storage related functonality
class Storage{
        static loadBooks(){
            let bookList;
            if(!localStorage.getItem('bookList')){
               return [];
            }
            else{
                bookList=JSON.parse(localStorage.getItem('bookList'));
                return bookList;
            }
        }
// to set local storage (update/delete)
        static  setBook(){
            localStorage.setItem('bookList',JSON.stringify(listOfBooks));
            UI.displayBooks();
            
        }
       
    }


// Adding book from inputs
    upload.addEventListener('click',(e)=>{
        e.preventDefault();
        if(bname.value=='' || author.value=='' || code.value==''){
            alert('Please fill the Data first!');
        }
        else{
            let newBook=new Book(bname.value,author.value,code.value);
            listOfBooks.push(newBook);
            
        Storage.setBook();
        UI.displayNotification('added');
        UI.removeNotification('added')
            bname.value="";
            author.value="";
            code.value="";
        }
      
    })


