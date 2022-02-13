class Books{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}
class UI{
    constructor(){

    }
    addBookList(book){
        const tableBody = document.querySelector('tbody');
    const row=document.createElement('tr');
    row.innerHTML=`<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><button type="button" class="btn-close" aria-label="Close"></button></td>`;
    tableBody.appendChild(row);
    }
    alert(message,alerttype){
        const container=document.querySelector('.container');
        const form=document.getElementById('book-details-form');
        const divElement=document.createElement('div');
        divElement.className=`alert alert-${alerttype}`;
        divElement.appendChild(document.createTextNode(message));
        container.insertBefore(divElement,form);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },3000)
    }
    delete(target){
    
            target.parentElement.parentElement.remove();
        
      
    }
}
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')==null){
            books=[];
        }
        else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks(){
        const books=Store.getBooks();
     
        books.forEach(function(book){
            const ui =new UI();
            ui.addBookList(book)
        })
    }
    static addBook(book){
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static deleteBook(bookisbn){
        console.log(bookisbn);
        const books=Store.getBooks();
        books.forEach(function(book,index){
            if(book.isbn===bookisbn){
                books.splice(index,1);
            }
        })
        localStorage.setItem('books',JSON.stringify(books));
    }

}
//Get Books List from Local Storage if any
document.addEventListener('DOMContentLoaded',function(){
    Store.displayBooks();
})
document.getElementById('book-details-form').addEventListener("submit",function(e){
    const title=document.getElementById('title').value;
    const author=document.getElementById('author').value;
    const isbn=document.getElementById('isbn').value;
    const books=new Books(title,author,isbn);
    const ui=new UI();
    //validation
    if(title==='' || author==='' || isbn==='')
    {
        ui.alert('please Enter all the details of the book','danger');   
    }
    else{
        ui.addBookList(books);  
        ui.alert('Book added in the List','success'); 
        Store.addBook(books);
    }
    e.preventDefault();
})
document.getElementById('table').addEventListener('click',function(e){
    const ui=new UI();
    if(e.target.className=='btn-close'){
        ui.delete(e.target);
        Store.deleteBook(e.target.parentElement.previousElementSibling.textContent);
        ui.alert('Book successfully removed from the list','success');
        
    }
    e.preventDefault();
});