function func() {

    let colLeft = document.getElementById('columnLeft');
    let colRight = document.getElementById('columnRight');
    let txt = document.getElementById('centerText');

    if (getComputedStyle(document.getElementById('columnLeft')).display === 'none') {
        colLeft.className = "ColumnLeft Visible";
        colRight.className = "ColumnRight None";
        txt.className = "CenterText None";
    }
    
    else {
        colLeft.className = " ColumnLeft None"
        colRight.className = "ColumnRight";
        txt.className = "CenterText";
    }
}


