var productArray = [];
var showArray = [];
var maxShow = 4;
var curShow = 1;
var rootPrice;
var curPrice;
var quantity=1;
var size=1;
var statusUser="none";
var curType="all";
var nameUser; 
var totalPrice=0;
var newNameUser="";

function createProduct(){
    if(localStorage.getItem('Image')===null){
        productArray = [
            {id: 1, name: 'capuchino', price: 50000, type:'coffee', img: 'assets/img/Capuchino.jpg'},
            {id: 2, name: 'decaf', price: 45000, type:'coffee', img: 'assets/img/decaf_cafe.jpg'},
            {id: 3, name: 'espresso', price: 30000, type:'coffee', img: 'assets/img/espresso_cafe.jpg'},
            {id: 4, name: 'soda italian', price: 45000, type:'soda', img: 'assets/img/Italian_Sodas_29.jpg'},
            {id: 5, name: 'latte', price: 25000, type:'coffee', img: 'assets/img/latte_cafe.jpg'},
            {id: 6, name: 'machiato', price: 60000, type:'coffee', img: 'assets/img/machiato_cafe.jpg'},
            {id: 7, name: 'mocha', price: 30000, type:'coffee', img: 'assets/img/mocha_cafe.jpg'},
            {id: 8, name: 'soda mojito', price: 27000, type:'soda', img: 'assets/img/mojito-xanh.jpg'},
            {id: 9, name: 'soda sinomente', price: 25000, type:'soda', img: 'assets/img/soda Sinomente.png'},
            {id: 10, name: 'soda đồng xanh', price: 23000, type:'soda', img: 'assets/img/soda_dongxanh.png'},
            {id: 11, name: 'soda thơm', price: 18000, type:'soda', img: 'assets/img/soda_thom.png'},
            {id: 12, name: 'soda vải', price: 25500, type:'soda', img: 'assets/img/soda_vai.png'},
            {id: 13, name: 'soda bạc hà', price: 19000, type:'soda', img: 'assets/img/soda-bac-ha.jpg'},
            {id: 14, name: 'soda blue sky', price: 20000, type:'soda', img: 'assets/img/soda-blue-sky.jpg'},
            {id: 15, name: 'soda việt quất', price: 25000, type:'soda', img: 'assets/img/soda-viet-quat.png'}
        ];
        localStorage.setItem('Image',JSON.stringify(productArray));
    } else {
        productArray = JSON.parse(localStorage.getItem('Image'));
    }
}

function loadAccount(){
    if(localStorage.getItem('account')===null){
        var account = [
            {id: 1, username: 'admin', password:'admin', type: 'admin', fullname:'', email:'', number:''},
            {id: 2, username: 'khach', password:'123', type: 'client', fullname:'Le Anh Tan', email:'leanhtan@gmail.com', number:'0123456789'}
        ];
        localStorage.setItem('account',JSON.stringify(account));
    }
    if(localStorage.getItem('status')===null){
        var statusInfo = {type: "none", username: ""};
        localStorage.setItem('status',JSON.stringify(statusInfo));
    } 
}

function createHistoryBill(){
    var historyBill = [];
    localStorage.setItem('historyBill',JSON.stringify(historyBill));
}

window.onload = function(){
    createProduct();
    showArray = productArray;
    reload(1);

    loadAccount();
    curUser = JSON.parse(localStorage.getItem('status'))['type'];
    nameUser = JSON.parse(localStorage.getItem('status'))['username'];
    changeHeader(curUser, nameUser);

    loadCart();
    if(localStorage.getItem('historyBill')===null)createHistoryBill();
}

function showProduct(cur){
    var s="";
    curShow = cur;
    cur--;
    for(var i=maxShow*cur;i<maxShow*(cur+1) && i<showArray.length;i++){
        s+='<div class="frames_content_product">' +
            '<img class="image_product" src="' + showArray [i]['img'] + '" alt="san pham"></td>' +
            '<div class="name_product">' + showArray[i]['name'] + '</div>' +
            '<div class="price_product">' + showArray[i]['price'] + ' VNĐ</div>' + 
            '<button class="order_product" onclick="openOrderModal('+i+')">Đặt hàng</button></div>';
    }
    document.getElementById('productList').innerHTML = s;
}

function changeMaxShow(){
    maxShow = parseInt(document.getElementById('maxShow').value);
    reload(1);
}

function showPagination(){
    var s="";
    var n;
    if(showArray.length%maxShow==0)    n = showArray.length/maxShow;
    else    n = showArray.length/maxShow+1;
    if(showArray.length<=maxShow){
        document.getElementById('Pagination').style.display = "none";
        return;
    }    
    document.getElementById('Pagination').style.display = "flex";
    for(var i=1;i<=n;i++){
        s+=' <li id="nav'+i+'" class="pagination-item pagination-item-link"><div class="pagination-item-link" onclick="changePage(' +i + ')">' + i +'</div></li>';
    }
    document.getElementById('pagination-index').innerHTML = s;
}

function reload(cur){
    showProduct(cur);
    showPagination();
    if(cur==1) document.getElementById('nav1').classList.add('pagination-item--active');
}

function changePage(cur){   
    document.getElementById('nav'+cur).classList.add('pagination-item--active');
    document.getElementById('nav'+curShow).classList.remove("pagination-item--active");
    showProduct(cur);
}

function pageDown(){
    var down = curShow-1;
    if(down>0)  changePage(down);
}

function pageUp(){
    var up = curShow+1;
    var n;
    if(showArray.length%maxShow==0)    n = showArray.length/maxShow;
    else    n = showArray.length/maxShow+1;
    if(up<=n)  changePage(up);
}

function openOrderModal(cur) {
    if(statusUser=="none"){
        alert('Vui lòng đăng nhập');
        return;
    }
    document.getElementById('modal-order').style.display='flex';

    document.getElementById('order-name').innerHTML = showArray[cur]['name'];

    curPrice = rootPrice = showArray[cur]['price']; 
    document.getElementById('buy-img').src = showArray [cur]['img'];
    document.getElementById('rootPrice').innerHTML = rootPrice + ' VNĐ';    
    quantity = 1;
    document.getElementById('curPrice').innerHTML = curPrice + ' VNĐ';

    document.getElementById('size-1').style.borderColor='green';
    document.getElementById('size-3').style.borderColor='green';
    document.getElementById('size-2').style.borderColor='orange';
    size=2;

    document.getElementById('order-button').innerHTML = '<button class="modal-order-button" onclick="buy('+cur+')">ĐẶT HÀNG</button>';
}

function closeOrderModal() {
    document.getElementById('modal-order').style.display='none';
}


function openHistoryCart(cur) {
    
    if(statusUser=="none"){
        alert('Vui lòng đăng nhập');
        return;
    }
    document.getElementById('modal-history').style.display='flex';
    var User = JSON.parse(localStorage.getItem('status'))['username'];
    var historyArray = JSON.parse(localStorage.getItem('historyBill'));

    var s="";
    var n=0;
    for(var i=0;i<historyArray.length;i++){
        if (User == historyArray[i]['client']){
            if(n==0){
                n=historyArray[i]['number'];
                s+="<tr><td rowspan="+n+">"+historyArray[i]['idBill']+"</td>" + 
                "<td>"+historyArray[i]['name']+"</td>" +
                "<td>"+historyArray[i]['size']+"</td>" +
                "<td>"+historyArray[i]['quantity']+"</td>" + 
                "<td rowspan="+n+">"+historyArray[i]['totalPrice']+" VND</td>" + 
                "<td rowspan="+n+">"+historyArray[i]['date']+"</td>" +
                "<td rowspan="+n+">"+historyArray[i]['client']+"</td></tr>";
            } else {
                s+="<tr><td>"+historyArray[i]['name']+"</td>" +
                "<td>"+historyArray[i]['size']+"</td>" +
                "<td>"+historyArray[i]['quantity']+"</td></tr>" 
            }
            n--;
        }
    }
    document.getElementById('historyBody').innerHTML = s;
}

function closeHistoryCart() {
    document.getElementById('modal-history').style.display='none';
}

function incQuantity(){
    quantity++;
    document.getElementById('quantity').innerHTML=quantity;
    curPrice = rootPrice * quantity;
    document.getElementById('curPrice').innerHTML = curPrice + ' VNĐ';
}

function decQuantity(){
    if(quantity-1>0){
        quantity--;
        document.getElementById('quantity').innerHTML=quantity;
        curPrice = rootPrice * quantity;
        document.getElementById('curPrice').innerHTML = curPrice + ' VNĐ';
    }
}

function changeSize(cur){
    document.getElementById('size-'+size).style.borderColor='green';
    document.getElementById('size-'+cur).style.borderColor='orange';
    rootPrice = rootPrice + (cur-size)*1000;
    curPrice = rootPrice * quantity;
    document.getElementById('curPrice').innerHTML = curPrice + ' VNĐ';
    size=cur;
}

function buy(cur){
    var check = confirm('Bạn chắc chắn đặt hàng ?');
    // var comment = document.getElementById('txtComment').value;
    if(check==false)    return;
    if(localStorage.getItem('cart')===null){
        var cartItem = [
            {id: cur+1,name: showArray[cur]['name'], size: size, quantity: quantity, price: curPrice,/* comment: comment*/}
        ];
    } else {
        var cartItem = JSON.parse(localStorage.getItem('cart'));
        var find=0;
        for(var i=0;i<cartItem.length;i++){
            if(cartItem[i]['id']==cur+1 && cartItem[i]['size'] == size){
                find=1;
                cartItem[i]['quantity']+=quantity;
                cartItem[i]['price']+=curPrice;
            }
        }
        if(find==0) {
            cartItem.push(
                {id: cur+1,name:showArray[cur]['name'], size: size, quantity: quantity, price: curPrice, /* comment: comment*/}
            );
        }
    }
    localStorage.setItem('cart',JSON.stringify(cartItem));
    closeOrderModal();
    loadCart();
    alert('Đặt hàng thành công');
    window.location.href="";
}

function showLogIn() {
    document.getElementById('modal_login').style.display="flex";
}

function closeLogIn() {
    document.getElementById('modal_login').style.display="none";
}

function showRegister() {
    document.getElementById('modal_register').style.display="flex";
}

function closeRegister() {
    document.getElementById('modal_register').style.display="none";
}

function changeHeader(type,name){
    document.getElementById(statusUser).style.display = "none";
    document.getElementById(type).style.display = "block";
    statusUser = type;
    localStorage.setItem('status',JSON.stringify({type: type, username: name}));
    if(type=="admin")   document.getElementById('adminName').innerHTML = name;
    else    if(type=="client")  document.getElementById('clientName').innerHTML = name;
}


function login(){
    var log1 = document.getElementById('log1').value;
    var log2 = document.getElementById('log2').value;

    var ac = JSON.parse(localStorage.getItem('account'));
    for(var i=0; i<ac.length; i++){
        if(ac[i]['username']==log1 && ac[i]['password']==log2){
            changeHeader(ac[i]['type'],ac[i]['username']);
            break;
        }
        if(i==ac.length-1) { 
            alert('Sai thông tin đăng nhập');
            document.getElementById('log2').select();
            document.getElementById('log2').focus();
            return;
        }
    }
    closeLogIn();
    window.location.href="";
}

function logout(){
    changeHeader("none","");
    window.location.href="";
}

function register(){
    var dataAccount = JSON.parse(localStorage.getItem('account'));
    var rFullName = document.getElementById('reg1');
    rFullName.value = rFullName.value.split();
    var rEmail = document.getElementById('reg2');
    rEmail.value = rEmail.value.split();
    var rNum = document.getElementById('reg3');
    rNum.value = rNum.value.split();
    var rUsername = document.getElementById('reg4');
    rUsername.value = rUsername.value.split();
    var rPassword = document.getElementById('reg5');
    var rRepassword = document.getElementById('reg6');

    if(rFullName.value == ""){
        alert('Vui lòng nhập họ tên');
        rFullName.focus();
        rFullName.select();
        return;
    }
    if(rEmail.value == ""){
        alert('Vui lòng nhập email');
        rEmail.focus();
        rEmail.select();
        return;
    }
    if(rNum.value == "" || rNum.value.indexOf(" ")!=-1){
        alert('Vui lòng nhập số điện thoại');
        rNum.focus();
        rNum.select();
        return;
    }
    if(rUsername.value == "" || rUsername.value.indexOf(" ")!=-1){
        alert('Vui lòng nhập tên đăng nhập');
        rUsername.focus();
        rUsername.select();
        return;
    }
    if(rPassword.value == ""){
        alert('Vui lòng nhập mật khẩu');
        rPassword.focus();
        rPassword.select();
        return;
    }
    if(rRepassword.value == ""){
        alert('Vui lòng nhập lại mật khẩu');
        rRepassword.focus();
        rRepassword.select();
        return;
    }
    if(rEmail.value.indexOf(" ")!==-1 || rEmail.value.indexOf("@")==-1) {        
        alert('Email không hợp lệ');
        rEmail.focus();
        rEmail.select();
        return;
    }
    var checkNum=1;
    for(var i=0;i<rNum.value.length; i++){
        if(rNum.value[i]<'0' || rNum.value[i]>'9')  checkNum=0;
    }
    if(checkNum==0 || rNum.value.length!=10){        
        alert('Số điện thoại không hợp lệ');
        rNum.focus();
        rNum.select();
        return;
    }
    for(var i=0;i<dataAccount.length;i++){
        if(dataAccount[i]['username']==rUsername){    
            alert('Tên đăng nhập đã có người sử dụng');
            rUsername.focus();
            rUsername.select();
            return;
        }   
    }
    if(rPassword.value != rRepassword.value){        
        alert('Mật khẩu nhập lại không trùng khớp');
        rRepassword.focus();        
        rRepassword.select();
        return;
    }

    dataAccount.push(
        {id: dataAccount[dataAccount.length-1]['id']+1, username: rUsername.value, password: rPassword.value, 
        type: 'client', fullname: rFullName.value, email: rEmail.value, number:rNum.value}
    );
    localStorage.setItem('account',JSON.stringify(dataAccount));
    alert('Đăng ký thành công');
    closeRegister();
}

function showCart(){    
    if(statusUser=="none"){
        alert('Vui lòng đăng nhập');
        return;
    }
    document.getElementById('modal-shopping-cart').style.display="flex";
}

function closeCart(){
    document.getElementById('modal-shopping-cart').style.display="none";
}


function loadCart() {
    var productCartList = JSON.parse(localStorage.getItem('cart'));
    var s = "";
    totalPrice=0;
    if(localStorage.getItem('cart')!==null){
        for(var i=0;i<productCartList.length;i++){
            var cartId = productCartList[i]['id']-1;
            var sizeChar;
            if(productCartList[i]["size"]==1)   sizeChar = "S";
            else if(productCartList[i]["size"]==2)   sizeChar = "M";
            else if(productCartList[i]["size"]==3)   sizeChar = "L";
    
            totalPrice+=productCartList[i]['price'];
            
            s+='<!-- One item --><div class="frames_modal_cart_info_product">' + 
                '<div class="frames_img_product"><img class="modal_cart_img_product" src="'+productArray[cartId]["img"]+'" alt="'+productArray[cartId]["type"]+'"></div>' +
                '<div class="frames_modal_cart_info_product_word"><div class="frames_info_product_modal_cart"><div class="product_title">'+productArray[cartId]["name"]+'</div>' + 
                '<ul class="frames_product_note"><li class="modal_cart_font_note">Size '+sizeChar+'</li>' + 
                '</ul></div>' +
                '<div class="modal_cart_product_price">'+productArray[cartId]['price']+'VNĐ</div>' + 
                '<div class="modal_cart_product_quantily"><span class="modal_cart_subtract modal_cart_sign_hover" onclick="decQuanCart('+i+')">-</span>' +
                '<span id="cartQuantity'+i+'" class="modal_cart_number">'+productCartList[i]['quantity']+'</span><span class="modal_cart_add modal_cart_sign_hover" onclick="incQuanCart('+i+')"">+</span></div>' +
                '<div class="modal_cart_total_product"><div id="total-all-price'+i+'" class="modal_cart_total_price">'+productCartList[i]["price"]+' VNĐ</div></div>'+'<div class="frames_product_modal_cart_icon"><i class="icon_modal_cart fas fa-times" onclick="deleteCartItem('+i+')"></i></div>' + 
                '</div></div><!-- End One item -->';
        }
    }
    document.getElementById('cartList').innerHTML = s;
    document.getElementById('total-price').innerHTML = totalPrice + "VNĐ";
}

function incQuanCart(cur) {
    var productCartList = JSON.parse(localStorage.getItem('cart'));
    var cRootPrice = productCartList[cur]['price']/productCartList[cur]['quantity'];
    productCartList[cur]['quantity']++;
    productCartList[cur]['price']+=cRootPrice;
    document.getElementById('cartQuantity'+cur).innerHTML = productCartList[cur]['quantity'];    
    document.getElementById('total-all-price'+cur).innerHTML = productCartList[cur]['price']+' VNĐ';
    localStorage.setItem('cart',JSON.stringify(productCartList));

    var sum=0;
    for(var i=0;i<productCartList.length;i++)   sum+=productCartList[i]['price'];
    document.getElementById('total-price').innerHTML =  sum + "VNĐ";
}

function decQuanCart(cur) {
    var productCartList = JSON.parse(localStorage.getItem('cart'));
    var cRootPrice = productCartList[cur]['price']/productCartList[cur]['quantity'];
    if(productCartList[cur]['quantity']-1<=0)   return;
    productCartList[cur]['quantity']--;
    productCartList[cur]['price']-=cRootPrice;
    document.getElementById('cartQuantity'+cur).innerHTML = productCartList[cur]['quantity'];    
    document.getElementById('total-all-price'+cur).innerHTML = productCartList[cur]['price']+' VNĐ';
    localStorage.setItem('cart',JSON.stringify(productCartList));

    
    var sum=0;
    for(var i=0;i<productCartList.length;i++)   sum+=productCartList[i]['price'];
    document.getElementById('total-price').innerHTML =  sum + "VNĐ";
}

function deleteCartItem(cur) {    
    var productCartList = JSON.parse(localStorage.getItem('cart'));
    var check = confirm("Bạn có muốn xóa sản phẩm " + productCartList[cur]['name'] + " không?")
    if(check==false)    return;
    productCartList.splice(cur,1);    
    localStorage.setItem('cart',JSON.stringify(productCartList));
    loadCart();
    alert('Xóa thành công');
}

function deleteAllCart(){   
    if(statusUser=="none"){
        alert('Vui lòng đăng nhập');
        return;
    }     
    var productCartList = JSON.parse(localStorage.getItem('cart'));
    var check = confirm("Bạn có muốn xóa hết sản phẩm không?")
    if(check==false)    return;
    productCartList=[];    
    localStorage.setItem('cart',JSON.stringify(productCartList));
    loadCart();
    alert('Xóa thành công');
}

function successOrder() {
    if(statusUser=="none"){
        alert('Vui lòng đăng nhập');
        return;
    }
    if(document.getElementById('addressCart').value==""){
        alert('Vui lòng nhập địa chỉ');
        document.getElementById('addressCart').focus();
        return;
    }
    var check = confirm("Bạn có chắc chắn đặt hàng không?")
    if(check==false)    return;            
    var productCartList = JSON.parse(localStorage.getItem('cart'));

    //Xu ly
    var billArray = [];
    var idBill = 1;
    var idd = 0;
    if(localStorage.getItem('bill')!==null && localStorage.getItem('bill')!=null && JSON.parse(localStorage.getItem('bill')).length.length>0){
        var billArray = JSON.parse(localStorage.getItem('bill'));
        idBill = billArray[billArray.length-1]['idBill']+1;
    } 

    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear() +'T'+ today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var date1 = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear() +'.'+ today.getHours() + "." + today.getMinutes() + "." + today.getSeconds();

    for(var i=0;i<productCartList.length;i++){
        billArray.push({
            idBill : date1, productId : productCartList[i]['id'+'2'], name:  productCartList[i]['name'], size: productCartList[i]['size'],
            quantity: productCartList[i]['quantity'], price: productCartList[i]['price'], comment: productCartList[i]['comment'], 
            date: date, client: nameUser, address: document.getElementById('addressCart').value, totalPrice: totalPrice,number:productCartList.length , status: "False"
        });
        idd = i;
    }
    localStorage.setItem('bill',JSON.stringify(billArray));

    productCartList=[];    
    localStorage.setItem('cart',JSON.stringify(productCartList));
    loadCart();
    alert('Đặt hàng thành công');
    addHistoryBill(billArray[idd]['idBill']);
    document.getElementById('addressCart').value="";
    document.getElementById('total-price').innerHTML = "0 VNĐ";
    totalPrice =0;
}

function navPage(type){  
    showArray = [];
    curType = type;
    if(type=="all") showArray=productArray;
    else {
        for(var i=0;i<productArray.length;i++){
            if(productArray[i]['type']==type)  
            showArray.push(productArray[i]);
        }
    }
    reload(1);
}


var advancedMode = 0;
function search(){
    var s = document.getElementById('search_txt').value;
    var temp = [];
    if(s==""){
        navPage(curType);
    }
    else {
        for(var i=0;i<productArray.length;i++){
            if(productArray[i]['name'].indexOf(s)!=-1)  temp.push(productArray[i]);
        }
        showArray=temp;
        reload(1);
    }
}


function advancedSearch(){   
    var fromPrice = document.getElementById('fromPrice').value;
    var toPrice = document.getElementById('toPrice').value;
    var fPrice=0,tPrice=999999999;
    var type=document.getElementById('advanceType').value;
    var s = document.getElementById('search_txt').value;
    var temp = [];
        if(fromPrice!=""){
            var checkNum=1;
            for(var i=0;i<fromPrice.length; i++){
                if(fromPrice[i]<'0' || fromPrice[i]>'9')  checkNum=0;
            }
            if(checkNum==0) {
                alert('Nhập mức giá tối thiểu chưa đúng định dạng')
                document.getElementById('fromPrice').select();
                document.getElementById('fromPrice').focus();
                return;
            } 
            fPrice = parseInt(fromPrice);
        }       
        if(toPrice!=""){
            for(var i=0;i<toPrice.length; i++){
                if(toPrice[i]<'0' || toPrice[i]>'9')  checkNum=0;
            }
            if(checkNum==0) {
                alert('Nhập mức giá tối đa chưa đúng định dạng')
                document.getElementById('toPrice').select();
                document.getElementById('toPrice').focus();
                return;
            }
            tPrice = parseInt(toPrice);
        }
      
    for(var i=0;i<productArray.length;i++){
        if(productArray[i]['name'].indexOf(s)!=-1 && productArray[i]['price']>=fPrice && productArray[i]['price']<=tPrice
        && (type=='all' || productArray[i]['type']==type))  temp.push(productArray[i]);
    }
    showArray=temp;
    reload(1);
}
function addHistoryBill(bill){    
    var billArray = JSON.parse(localStorage.getItem('bill'));
    var historyArray = JSON.parse(localStorage.getItem('historyBill'));

    for(var i=0;i<billArray.length;i++){
        if(bill==billArray[i]['idBill']){
            historyArray.push(billArray[i]);
        }
    }
    for(var i=0;i<billArray.length;i++){
        if(bill==billArray[i]['idBill']){
            billArray.splice(i--,1);
        }
    }
    localStorage.setItem('bill',JSON.stringify(billArray));
    localStorage.setItem('historyBill',JSON.stringify(historyArray));
}
function Search_information_facebook(){
    window.open('');
}
function Search_information_instagram(){
    window.open('');
}
