let products = document.querySelector('.products')
let  search_row = document.querySelector('.search_products_row')
let product_form = document.querySelector('.product_form')
let search_form = document.querySelector('.search__form')
let tittle = document.querySelector('.tittle').querySelector('input')
let text = document.querySelector('.text').querySelector('textarea')
let src = document.querySelector('.src').querySelector('input')
let price = document.querySelector('.price').querySelector('input')

let arr =[
    {
        src:'img/i.webp.png' ,
        tittle: 'Товар из массива 1',
        text: 'Довольно-таки интересное описание товара в несколько строк.' +
            ' Довольно-таки интересное описание товара в несколько строк',
        price:1111111
    },{
        src:'img/i.webp.png' ,
        tittle: 'Товар из массива 2',
        text: 'Довольно-таки интересное описание товара в несколько строк.' +
            ' Довольно-таки интересное описание товара в несколько строк',
        price:1111111
    },{
        src:'img/i.webp.png' ,
        tittle: 'Товар из массива 3',
        text: 'Довольно-таки интересное описание товара в несколько строк.' +
            ' Довольно-таки интересное описание товара в несколько строк',
        price:1111111
    },{
        src:'img/i.webp.png' ,
        tittle: 'Товар из массива 4',
        text: 'Довольно-таки интересное описание товара в несколько строк.' +
            ' Довольно-таки интересное описание товара в несколько строк',
        price:1111111
    },{
        src:'img/i.webp.png' ,
        tittle: 'Товар из массива 5',
        text: 'Довольно-таки интересное описание товара в несколько строк.' +
            ' Довольно-таки интересное описание товара в несколько строк',
        price:1111111
    },{
        src:'img/i.webp.png' ,
        tittle: 'Товар из массива 6',
        text: 'Довольно-таки интересное описание товара в несколько строк.' +
            ' Довольно-таки интересное описание товара в несколько строк',
        price:1111111
    },
    {
        src:'img/i.webp.png' ,
        tittle: 'Товар из массива 7',
        text: 'Довольно-таки интересное описание товара в несколько строк. ' +
            'Довольно-таки интересное описание товара в несколько строк',
        price:1111111
    }
]
function loadItem(e){

    let item = `<div class="item visible">
                                <div class="redact">
                                    <button class="edit">Edit</button>
                                    <button class="rem">X</button>
                                </div>
                                <img src="${e.src}" alt="ошибка загрузки">
                                <div class="item__body">
                                    <div class="item__tittle">${e.tittle}</div>
                                     <div class="item__text">${e.text}</div>
                                    <div class="item__prise">${e.price} </div>
                                </div>
                            </div>`
    return item
}
function reloadProduct(arr){
    if (products.querySelector('.item')){
        products.innerHTML=''
    }
    for(let i = 0; i < arr.length; i++){
        let Item = loadItem(arr[i])
        products.insertAdjacentHTML('beforeend',Item)
        let redact = document.querySelectorAll('.redact')
        redact[i].addEventListener('click',e =>{

            if(e.target == redact[i].querySelector('.edit')){
                if (!product_form.classList.contains('active')){
                    tittle.value = redact[i].closest('.item').querySelector('.item__tittle').innerHTML
                    text.value = redact[i].closest('.item').querySelector('.item__text').innerHTML
                    src.value = redact[i].closest('.item').querySelector('img').src
                    price.value =redact[i].closest('.item').querySelector('.item__prise').innerHTML
                    product_form.classList.add('active')
                    let remove = redact[i].closest('.item').querySelector('.item__tittle').innerHTML
                    arr.splice(arr.findIndex(a => a.tittle === remove) , 1)
                    reloadProduct(arr)
                }
            }else {
                let remove = redact[i].closest('.item').querySelector('.item__tittle').innerHTML
                arr.splice(arr.findIndex(a => a.tittle === remove) , 1)
                reloadProduct(arr)
            }
        })
    }

}
reloadProduct(arr)
function validation(form){
    let result = true
    function removeError(input){
        const parent = input.parentNode
        if (parent.classList.contains('error')){
            parent.querySelector('label').remove()
            parent.classList.remove('error')
        }
    }
    function createError(input, text){
        const parent = input.parentNode
        const errorLable = document.createElement('label')
        errorLable.classList.add('errorLabel')
        errorLable.textContent = text
        parent.append(errorLable)
        parent.classList.add('error')
        result = false
    }
    form.querySelectorAll('.in').forEach(input => {
        removeError(input)
        if (input.value == ''){createError(input, 'Поле является обязательным')}
        })
    return result
}




product_form.addEventListener('submit',e=>{
    if (validation(product_form)){
        let adj = {
            src: src.value,
            tittle: tittle.value,
            text: text.value,
            price:price.value
        }
        arr.push(adj)
        reloadProduct(arr)
        product_form.classList.remove('active')
        src.value  = ''
        tittle.value = ''
        text.value = ''
        price.value = ''
    }
    e.preventDefault()
})

search_form.addEventListener('submit', e => {
    let inf = search_form.querySelector('.search_in').value
    if (search_row.querySelector('.item')){
        search_row.innerHTML=''
        search_row.classList.remove('active')

    }
    for (let item of arr){
        if(item.tittle.toLowerCase().includes(inf.toLowerCase()) && inf!=='' ){
            let Item = loadItem(item)
            search_row.classList.add('active')
            search_row.insertAdjacentHTML('afterbegin',Item)
            search_row.querySelector('.item').classList.remove('visible')

        }
    }
    e.preventDefault()

})




















































