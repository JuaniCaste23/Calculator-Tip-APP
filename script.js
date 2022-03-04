//VARIABLES

const bill = document.getElementById('bill');
const numberOfPeople = document.getElementById('number-of-people');
const tips = document.querySelectorAll('.select-button');
const customTip = document.querySelector('.input-group__input--custom');
const errorInput = document.querySelectorAll('.span-error');
const amount = document.getElementById('amount');
const totalValue = document.getElementById('totalValue');
const resetButton = document.querySelector('.button--reset');

const arrayTips = [ ...tips ];
//Clase Calculadora

console.log(errorInput);
class Calculadora {

    //método constructor que se ejecuta cuando se genera una instancia de la clase
    constructor(){
        this.resetCalc();
    }

    //métodos de la clase
    setBillValue(value){
        this.billValue = value;
    }

    setPeopleValue(value){
        this.peopleValue = value;
        this.setAmount();
        this.setTotalValue();
    }

    setTipValue(value){
        this.tipValue = value;
    }

    setAmount(){
       this.amountValue = ( this.billValue / this.peopleValue ) * this.tipValue ;
    }

    setTotalValue(){
        this.totalValue = ( this.billValue / this.peopleValue ) + this.amountValue;
    }
    
    getAmount(){
        return this.amountValue;
        
    }

    getTotalValue(){
        return this.totalValue;
        
    }

    resetCalc(){
        this.billValue = 0;
        this.tipValue = 0;
        this.peopleValue = 0;
        this.amountValue = 0;
        this.totalValue = 0;
    }

    precise(num){
        return Number.parseFloat(num).toFixed(2);
    }
}

const calc = new Calculadora();
console.log(calc);

//FUNCIONES

const updateValues = () => {
    if(calc.peopleValue > 0)
    {
        amount.innerHTML = `$${calc.precise(calc.getAmount())}`;
        totalValue.innerHTML = `$${calc.precise(calc.getTotalValue())}`;
    }
};

const customRange = () => {
    
    if(customTip.value < 0 || customTip.value > 100)
    {
        customTip.classList.add('input-group--error');
        errorInput[1].style.display = 'block';
        errorInput[1].classList.add('error_custom');
        customTip.value = "";
    }
    else
    {
        customTip.classList.remove('input-group--error');
        errorInput[1].style.display = 'none';
    }
};

const bill_validation = () => {

    if(bill.value > 9999999)
    {
        errorInput[0].style.display = 'block';
        errorInput[0].classList.add('error_input');
        bill.value = "";
    }
    else
    {
        errorInput[0].style.display = 'none';
    }

}

const numberOfPeople_validation = () => {

    if(numberOfPeople.value > 1000000)
    {
        errorInput[2].style.display = 'block';
        errorInput[2].classList.add('error_input');
        numberOfPeople.value = "";
    }
    else
    {
        errorInput[2].style.display = 'none';
    }

}

const deselect = (el) => {

    let index = arrayTips.indexOf(el);
    console.log(index);
    newArray = arrayTips.filter( tip => arrayTips.indexOf(tip) !== index );
    newArray.forEach( element => element.classList.remove('active'));

} 

const resetValues = () => {

    amount.innerHTML = '$0.00';
    totalValue.innerHTML = '$0.00';
    bill.value = "";
    numberOfPeople.value = "";
    customTip.value = "";

}

//EVENTOS

bill.addEventListener('input', (e) => { calc.setBillValue(parseInt(e.target.value));
    bill_validation();
    updateValues();
});

numberOfPeople.addEventListener('input', (e) => { 
    calc.setPeopleValue(parseInt(e.target.value));
    numberOfPeople_validation();
    updateValues();
});

tips.forEach( el => {
    if(el.value == 0){
        
        el.addEventListener('input', () => {calc.setTipValue(parseInt(el.value)/100)
            customRange();
            updateValues();
            deselect(el);
        });
    }
    else{
        el.addEventListener('click', (e) => {calc.setTipValue(parseFloat(el.value))
            updateValues();
            el.classList.add('active');
            deselect(el);
        });
    }
    
})

resetButton.addEventListener('click', () => {

    calc.resetCalc();
    resetValues();
    updateValues();
    bill_validation();
    customRange();
    numberOfPeople_validation();
    deselect();

});

//TODO: Validar que los valores de tip custom sean entre 1 y 100
//TODO: Usar innerHTML para agregar los resultados.
//TODO: No se debería ejecutar si el peopleValue es = 0;
//TODO: Añadir un addclist con el strongcyan a cada boton seleccionado.

// ___ Tenés que estar sobre la carpeta de proyecto ___ /

// git add .
// git commit -m"mensaje de commit"
// git push