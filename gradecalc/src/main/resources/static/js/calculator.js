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
    col3.innerHTML = '<input name="weight" class="weightInput inputs">';
    col4.innerHTML = '<input name="grfield1" class="grInput inputs"> / <input name="grfield2" class="grInput inputs">';
    col5.innerHTML = '<percent class="percentField"> </percent>';

    addInputEvListeners();
}

function addInputEvListeners() {
    var inputs = document.getElementsByClassName("inputs");
    for (let j = 0; j < inputs.length; j++) {
        inputs[j].addEventListener('input', function (e) {
            e.preventDefault();
            calcPercent(inputs[j]);
        });
    }
}


function calcPercent(input) {
    var cell = input.parentNode;
    var row = cell.parentNode;
    var rowIndex = input.parentNode.parentNode.rowIndex;
    console.log(rowIndex)
    console.log(row);

    var grField1Value = parseFloat(row.querySelector('input[name="grfield1"]').value);
    var grField2Value = parseFloat(row.querySelector('input[name="grfield2"]').value);
    var weightVal = parseFloat(row.querySelector('input[name="weight"]').value);

    var per = row.querySelector(".percentField");

    // NaN stands for Not a Number, includes things like strings and symbols
    // Can't divide by 0, so grfield2 is > only.
    if ((!isNaN(grField1Value) && grField1Value >= 0) && (!isNaN(grField2Value) && grField2Value > 0)
    ) {
        var percent = (grField1Value / grField2Value) * 100;
        per.textContent = percent.toFixed(2) + '%'; // Update percentage field
    }
    else {
        per.textContent = ''; // Clear percentage field if inputs are not valid numbers
    }

}

function calcMean() {
    var table = document.getElementById("table");
    var rows = table.getElementsByTagName("tr");

    var totalGrades = 0;
    // var rowCount = rows.length - 1; // Exclude header row
    var validRowCount = 0;

    for (let j = 1; j < rows.length; j++) {
        row = rows[j];
        var grField1Value = parseFloat(row.querySelector('input[name="grfield1"]').value);
        var grField2Value = parseFloat(row.querySelector('input[name="grfield2"]').value);

        if ((!isNaN(grField1Value) && grField1Value >= 0) && (!isNaN(grField2Value) && grField2Value > 0)
        ) {
            var grade = (grField1Value / grField2Value);
            totalGrades = totalGrades + grade;
            validRowCount = validRowCount + 1;
        }
        else {
            continue;
        }
    }

    var mean = totalGrades / validRowCount * 100;

    if (isNaN(mean)) {
        document.getElementById("result").textContent = '';
    }
    else {
        document.getElementById("result").textContent = mean.toFixed(2) + "/100.00";
    }
}

function calcWeighted() {
    var table = document.getElementById("table");
    var rows = table.getElementsByTagName("tr");

    var totalGrades = 0;
    var weightSum = 0;

    var isValid = true;

    for (let j = 1; j < rows.length; j++) {
        row = rows[j];
        var grField1Value = parseFloat(row.querySelector('input[name="grfield1"]').value);
        var grField2Value = parseFloat(row.querySelector('input[name="grfield2"]').value);
        var weightVal = parseFloat(row.querySelector('input[name="weight"]').value);

        if ((!isNaN(grField1Value) && grField1Value >= 0) && (!isNaN(grField2Value) && grField2Value > 0)
            && (!isNaN(weightVal) && weightVal >= 0)) {
            var grade = (grField1Value / grField2Value) * weightVal;
            totalGrades = totalGrades + grade;
            weightSum = weightSum + weightVal;
        }
        else {

            isValid = false;
            break;
        }
    }

    var weighted = totalGrades / weightSum * 100;

    if (isNaN(weighted) || !isValid || weightSum == 0) {
        document.getElementById("result").textContent = '';
    }
    else {
        document.getElementById("result").textContent = weighted.toFixed(2) + "/100.00";
    }
}


console.log("hi");
addInputEvListeners();