function Books(title,author,isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;
}
function UI(){};
UI.prototype.addBookList=function(book){
    const tableBody = document.querySelector('tbody');
    const row=document.createElement('tr');
    row.innerHTML=`<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><button type="button" class="btn-close" aria-label="Close"></button></td>`;
    tableBody.appendChild(row);
}
UI.prototype.alert=function(message,alerttype){
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
//deleting Element
UI.prototype.delete=function(target){
    target.parentElement.parentElement.remove();
}
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
    }
    e.preventDefault();
})
document.getElementById('table').addEventListener('click',function(e){
    const ui=new UI();
    ui.delete(e.target);
    ui.alert('Book successfully removed from the list','success');
    e.preventDefault();
});