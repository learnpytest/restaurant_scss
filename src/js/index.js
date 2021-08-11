// 變數
const formControl = document.querySelector("#form-control");
const formParts = formControl.querySelectorAll(".part");
const stepControl = document.querySelector("#stepper-control");
const steps = stepControl.querySelectorAll(".step");
const formBtnControl = document.querySelector("#form__button-control");
const nextBtn = formBtnControl.querySelector(
  ".form__button-control__button--primary"
);
const prevBtn = formBtnControl.querySelector(
  ".form__button-control__button--outline"
);

let step = 0;
let currentShipmentFee = 0

const chartGoodsList = document.querySelector('#chart-goods-list')

//運送方式
const trMethods = document.querySelector('#tr-methods')
const allTransportMethods = document.querySelectorAll(
  'input[name="tr-method"]'
);

//data
const shipments = {
  'standard': 0,
  'dhl': 500,
}
let currentShipment = {
  name: 'standard',
}

let goodsInChart = [
  {
    id: 1,
    name: "破壞補釘修身牛仔褲",
    quantityInChart: 1,
    price: 3999,
    total: 3999,
    image: "http://i.imgur.com/RqUqDdu.png",
  },
  {
    id: 2,
    name: "刷色直筒牛仔褲",
    quantityInChart: 1,
    price: 1299,
    total: 1299,
    image: "http://i.imgur.com/sBqwY45.png",
  }
]

//選擇數量
function onGoodCountClicked({target}) {
 const id = getId(target)
 updateCount(target)(id)
 updateTotal(id)
 generateChartGoods()
 showSum()
}
function showSum () {
  let sum = 0
  const goodSum = document.querySelector('#good-sum')
  goodsInChart.forEach(item => sum += item.total)
  goodSum.textContent = '$' + (sum + shipments[currentShipment.name])
}

function updateTotal(id){
  let total = 0
  goodsInChart.forEach(item => {
    item.total = item.id === id ? item.quantityInChart * item.price : item.total
    total = item.total
  })
  return total
}

function updateCount (target) {
  return function(id) {
    let count
    if(target.matches('.good-minus')) {
    goodsInChart.forEach(item => {
      if(item.id === id){
        item.quantityInChart = item.quantityInChart > 0 ? item.quantityInChart - 1 : 0
        count =  item.quantityInChart
      }
    })
  
  } else if (target.matches('.good-plus')) {
      goodsInChart.forEach(item => {
      if(item.id === id){
        item.quantityInChart = item.quantityInChart < 1000 ? item.quantityInChart + 1 : item.quantityInChart
        count =  item.quantityInChart
        }
      })
    }
  return count
  }
 
}

function getId (target){
  return Number(target.dataset.id)
}

//產生購物籃物品
function generateChartGoods (){
  chartGoodsList.innerHTML = ''
  goodsInChart.forEach(item => {
  chartGoodsList.innerHTML += `<div class="form__chart__goods-list__item">
              <img src="${item.image}"
                alt=""
                class="form__chart__goods-list__item__image">
                    <div class="form__chart__goods-list__item__content">
                      <div class="flex-wrapper">
                        <div class="good-name">
                          ${item.name}
                        </div>
                        <div class="good-count"><span class="good-minus" data-id="${item.id}">-</span> <span>${item.quantityInChart}</span> <span class="good-plus" data-id="${item.id}">+</span></div>
                      </div>
                      <div class="good-price">$${item.total}</div>
                    </div>
                  </div>`
})
}

//選擇運送方式
function getCheckedValueForShipment(targetArr) {
  let value = 'standard'
  Array.from(targetArr).forEach((item) => {
    value = item.checked ? item.value : value;
    currentShipment.name = value
    currentShipmentFee = shipments[currentShipment.name]
  });
}

function onTrMethodsClicked(e) {
  getCheckedValueForShipment(allTransportMethods)
  showCurrentShipment()
  showSum()
}

function showCurrentShipment () {
  const shipFee = document.querySelector('#ship-fee')
  shipFee.textContent = shipments[currentShipment.name] === 0 ? '免費' : `$${shipments[currentShipment.name]}`
}
///選擇運送方式





function handleformBtnControlClicked(e) {
  e.preventDefault();
  const currentStep = steps[step];
  if (e.target.matches(".form__button-control__button--primary")) {
    const nextStep = steps[step + 1];
    if (nextStep) {
      currentStep.classList.remove("active");
      currentStep.classList.add("checked");
      nextStep.classList.add("active");
      formParts[step].classList.add("d-none");
      formParts[step + 1].classList.remove("d-none");
      step += 1;
    }
  } else if (e.target.matches(".form__button-control__button--outline")) {
    const prevStep = steps[step - 1];

    if (prevStep) {
      currentStep.classList.remove("active");
      prevStep.classList.remove("checked");
      prevStep.classList.add("active");
      formParts[step].classList.add("d-none");
      formParts[step - 1].classList.remove("d-none");
      step -= 1;
    }
  }
  setBtnDisabled();
}
function setBtnDisabled() {
  if (step === 0) {
    prevBtn.classList.add("d-none");
    formBtnControl.classList.add("display-one-btn");
  } else {
    prevBtn.classList.remove("d-none");
    formBtnControl.classList.remove("display-one-btn");
  }
  if (step === 2) {
    //     在最後一步將按鈕改成確認下單並移除偽元素
    nextBtn.innerHTML = "確認下單";
    nextBtn.classList.add("last-step");
  } else {
    nextBtn.innerHTML = "下一步";
    nextBtn.classList.remove("last-step");
  }
}

formBtnControl.addEventListener("click", handleformBtnControlClicked);


// 要刪除
// const r = document.querySelector('.test')
// function myFunction_get() {
//   // Get the styles (properties and values) for the root
//   var rs = getComputedStyle(r);
//   // Alert the value of the --blue variable
//   alert("The value of --blue is: " + rs.getPropertyValue('--bg'));
// }

// // Create a function for setting a variable value
// function myFunction_set() {
//   // Set the value of variable --blue to another value (in this case "lightblue")
//   r.style.setProperty('--bg', 'blue');
// }
// myFunction_get()
// myFunction_set()

generateChartGoods()

//選擇運送方式
trMethods.addEventListener("click", onTrMethodsClicked)

//選擇購物籃數量
chartGoodsList.addEventListener('click', onGoodCountClicked)