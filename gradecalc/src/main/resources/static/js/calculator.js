// starts at 1 because header does not count
var i = 1;
var rowButton = document.getElementById("addRow");
rowButton.addEventListener("click", addRow);

function addRow() {
    console.log("Row Added!");
    i++;
    var table = document.getElementById("table");
    var newRow = table.insertRow();

    var col1 = newRow.insertCell(0);
    var col2 = newRow.insertCell(1);
    var col3 = newRow.insertCell(2);
    var col4 = newRow.insertCell(3);
    var col5 = newRow.insertCell(4);

    col1.innerHTML = "Activity " + i;
    col2.innerHTML = "A" + i;
    col3.innerHTML = '<input name="weight" class="weightInput">';
    col4.innerHTML = '<input name="grfield1" class="grInput"> / <input name="grfield2" class="grInput">';
    col5.innerHTML = '<percent class="percentField"> </percent>';

    addInputEvListeners();
}

function addInputEvListeners(){
    var inputs = document.getElementsByClassName("grInput");
    for (let j = 0; j < inputs.length; j++)
    {
        // inputs[j].addEventListener('input', calcPercent);
        inputs[j].addEventListener('input', function(e)
        {
            e.preventDefault();
            calcPercent(inputs[j]);
        });
    }
}



function calcPercent(input)
{
    var cell = input.parentNode;
    var row = cell.parentNode;
    var rowIndex = input.parentNode.parentNode.rowIndex;
    console.log(rowIndex)
    console.log(row);

    var grField1Value = parseFloat(row.querySelector('input[name="grfield1"]').value);
    var grField2Value = parseFloat(row.querySelector('input[name="grfield2"]').value);

    var per = row.querySelector(".percentField");

    if((!isNaN(grField1Value) && grField1Value >=0) &&(!isNaN(grField2Value) && grField2Value >0))
    {
        var percent = (grField1Value / grField2Value) * 100;
        per.textContent = percent.toFixed(2) + '%'; // Update percentage field
    }
    else {
        per.textContent = ''; // Clear percentage field if inputs are not valid numbers
    }

}

function calcMean()
{
    var text = "apples";
    document.getElementById("result").textContent = text;
}

function calcWeighted()
{
    var text = "oranges";
    document.getElementById("result").textContent = text;

    // var gradeInputs = document.querySelectorAll('.grInput');

    // gradeInputs.forEach(function(element)
    // {
    //     element.value = text;
    // })
    
    // var inputs = document.getElementsByClassName("grInput");
    // for (let j = 0; j < inputs.length; j++)
    // {
    //     inputs[j].value = text;
    // }
}


console.log("hi");
addInputEvListeners();