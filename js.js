

let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let totle=document.getElementById('totle');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');

let mood='create';
let temp;
// get total
function gettotal(){
    if(price.value !=''){
        let result= (+price.value+ +taxes.value+ +ads.value)- +discount.value;
        totle.innerHTML=result;
        totle.style.background='#040';

    }
    else{
        totle.innerHTML='';
        totle.style.background='rgb(217, 87, 87)';
    }

}


//create data
let datapro;
if(localStorage.prodect != null){
    datapro=JSON.parse(localStorage.prodect)
}
else{
 datapro=[];
}
submit.onclick=function(){
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        totle:totle.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value != '' && price.value!='' && category.value !=null && newpro.count <=100 ){
    if( mood ==='create'){
       if(newpro.count > 1){
        for(let i=0; i<newpro.count  ;i++){
            datapro.push(newpro);
        }
       }
       else{
        datapro.push(newpro);
       }
    }
    else{
        datapro[temp]=newpro;
        count.style.display='block';
        mood='create';
        submit.innerHTML='create';
     
    }
    cleardata();
}
    
    localStorage.setItem('prodect',JSON.stringify(datapro));
    readdata();
}

//cleardata
function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    totle.innerHTML='';
    count.value='';
    category.value='';
}


//readData
function readdata(){
    gettotal();
    let table='';
    for(let i=0;i<datapro.length;i++){
        table +=`
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].totle}</td>
        <td>${datapro[i].category}</td>
        <td><button id="updata" onclick="updateData(${i})" >update</button></td>
        <td><button id="delete" onclick="deletedata(${i})">delete</button></td>
    </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table;
    let btn=document.getElementById('deleteall');
    if(datapro.length >1){
        btn.innerHTML=`
        <button onclick="deleteAll()">delete all (${datapro.length})</button>
        `
    }
    else{
        btn.innerHTM='';
    }
}
readdata();

//delete one element from array
function deletedata(i){
    datapro.splice(i,1);
    localStorage.prodect=JSON.stringify(datapro);
    readdata();
} 
//delete all element 
function deleteAll() {
    datapro.splice(0);
    localStorage.clear();
    readdata();
}

// updata data
function updateData(i){
    temp=i;
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    category.value=datapro[i].category;
    count.style.display='none';
    gettotal();
    submit.innerHTML='updata';
    mood='updata';
    scroll({
        top:0,
        behavior:"smooth",
    })
}

//mood search
let moodsearch='title';
let search=document.getElementById('search');
function searchmood(id){
   if(id =='searchtitle'){
    moodsearch='title'
   }else{
    moodsearch='category'
   }
   search.placeholder='search by '+ moodsearch;
   search.focus();
   search.value='';
   readdata();
}
//search
function searchfun(value){
    let table='';
    for(let i=0;i<datapro.length;i++){
        if( moodsearch=='title'){
                if(datapro[i].title.includes(value)){
                    table +=`
                    <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].totle}</td>
                    <td>${datapro[i].category}</td>
                    <td><button id="updata" onclick="updateData(${i})" >update</button></td>
                    <td><button id="delete" onclick="deletedata(${i})">delete</button></td>
                </tr>
                    `
                }

        }
        else{
            
                if(datapro[i].category.includes(value.toLowerCase())){
                    table +=`
                    <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].totle}</td>
                    <td>${datapro[i].category}</td>
                    <td><button id="updata" onclick="updateData(${i})" >update</button></td>
                    <td><button id="delete" onclick="deletedata(${i})">delete</button></td>
                </tr>
                    `
                }
            
        }
        document.getElementById('tbody').innerHTML=table;
    }
}