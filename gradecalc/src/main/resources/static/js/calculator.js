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
    col5.innerHTML = '<input name="percent" class="percentField" readonly>';
}


console.log("hi");

function calcMean()
{
    var text = "apples";
    document.getElementById("result").textContent = text;
}

function calcWeighted()
{
    var text = "oranges";
    document.getElementById("result").textContent = text;
}