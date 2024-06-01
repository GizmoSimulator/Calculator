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

    document.body.style.marginBottom = "110px";

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

    // .trim() is here to allow leading and trailing spaces
    var grField1Str = row.querySelector('input[name="grfield1"]').value.trim();
    var grField2Str = row.querySelector('input[name="grfield2"]').value.trim();

    var per = row.querySelector(".percentField");

    // if one field is empty or both are just spaces, set text to empty
    if (grField1Str.trim() === "" || grField2Str.trim() === "") {
        per.textContent = " ";
        return;
    }
    
    var grField1Value = parseFloat(grField1Str);
    var grField2Value = parseFloat(grField2Str);

    // Since parseFloat gets rid of letters, check if input is not only numbers
    // === specifically means same type comparison
    if (!(grField1Value.toString() === grField1Str) ||
        !(grField2Value.toString() === grField2Str) ) { 
            per.textContent = "Please type in numbers only";
            return;
        }

    // NaN stands for Not a Number, includes things like strings and symbols
    // Can't divide by 0, so grfield2 is > only.
    // Updates percentage if both fields are numbers.
    if ((!isNaN(grField1Value) && grField1Value >= 0) && (!isNaN(grField2Value) && grField2Value > 0)
    ) {
        var percent = (grField1Value / grField2Value) * 100;
        per.textContent = percent.toFixed(2) + '%'; // Update percentage field
    }
    else {
        per.textContent = "Please type in numbers only";
    }

}

function calcMean() {
    var table = document.getElementById("table");
    var rows = table.getElementsByTagName("tr");

    var totalGrades = 0;
    var validRowCount = 0;

    var allGradeFieldsValid = true;

    for (let j = 1; j < rows.length; j++) {
        row = rows[j];

        // .trim() is here to allow leading and trailing spaces
        var grField1Str = row.querySelector('input[name="grfield1"]').value.trim();
        var grField2Str = row.querySelector('input[name="grfield2"]').value.trim();
        
        var grField1Value = parseFloat(grField1Str);
        var grField2Value = parseFloat(grField2Str);

        // Since parseFloat gets rid of letters, check if input is not only numbers
        // === specifically means same type comparison
        if (!(grField1Value.toString() === grField1Str) ||
            !(grField2Value.toString() === grField2Str) ) { 
                allGradeFieldsValid = false;
                break;
            }

        if ((!isNaN(grField1Value) && grField1Value >= 0) && (!isNaN(grField2Value) && grField2Value > 0)
        ) {
            var grade = (grField1Value / grField2Value);
            totalGrades = totalGrades + grade;
            validRowCount = validRowCount + 1;
        }
        else {
            allGradeFieldsValid = false;
            break;
        }
    }

    var mean = totalGrades / validRowCount * 100;

    if (isNaN(mean) || !allGradeFieldsValid) {
        document.getElementById("result").textContent = "Please fill in all Grade fields, with positive numbers only.";
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

    var allFieldsValid = true;

    for (let j = 1; j < rows.length; j++) {
        row = rows[j];
        // .trim() is here to allow leading and trailing spaces
        var grField1Str = row.querySelector('input[name="grfield1"]').value.trim();
        var grField2Str = row.querySelector('input[name="grfield2"]').value.trim();
        var weightStr = row.querySelector('input[name="weight"]').value.trim();
        
        var grField1Value = parseFloat(grField1Str);
        var grField2Value = parseFloat(grField2Str);
        var weightVal = parseFloat(weightStr);

        // Since parseFloat gets rid of letters, check if input is not only numbers
        // === specifically means same type comparison
        if (!(grField1Str === parseFloat(grField1Value).toString()) ||
            !(grField2Str === parseFloat(grField2Value).toString()) ||
            !(weightStr === parseFloat(weightVal).toString())) { 
                allFieldsValid = false;
                break;
            }

        // check if numbers are valid and greater than or equal to 0
        // except for grField2Value because it's dividing)
        if ((!isNaN(grField1Value) && grField1Value >= 0) && (!isNaN(grField2Value) && grField2Value > 0)
            && (!isNaN(weightVal) && weightVal >= 0)) {
            var grade = (grField1Value / grField2Value) * weightVal;
            totalGrades = totalGrades + grade;
            weightSum = weightSum + weightVal;
        }
        else {
            allFieldsValid = false;
            break;
        }
    }

    var weighted = totalGrades / weightSum * 100;

    if (isNaN(weighted) || !allFieldsValid) {
        document.getElementById("result").textContent = "Please fill in all fields, with positive numbers only.";
    }
    else if (weightSum == 0)
    {
        document.getElementById("result").textContent = "Sum of weights should be > 0";
    }
    else {
        document.getElementById("result").textContent = weighted.toFixed(2) + "/100.00";
    }
}

addInputEvListeners();