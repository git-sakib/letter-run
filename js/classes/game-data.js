

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-3
// --------------
// GAME DATA JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// GAME DATA SAVE AND LOAD

function isLocalStorage(){
    if(typeof(Storage) !== "undefined") {
        //console.log('YES');
        return true;
    } else {
        //console.log('Sorry! No Web Storage support');
        return false;
    }	
}

function loadStorageData(){
    if(isLocalStorage()) {
        // Code for localStorage
        if(localStorage.bestScore)bestGamePoint = parseInt(localStorage.bestScore);
        else bestGamePoint = 0;
        if(localStorage.totalScore)totalGamePoint = parseInt(localStorage.totalScore);
        else totalGamePoint = 0;      
    } else {
    	// No Data Loaded
    	console.log('No Data Loaded');
    }
    //console.log(localStorage.bestScore + " " + localStorage.totalScore);
}

function saveStorageData(){
    if(isLocalStorage()) {
        // Code for localStorage
        localStorage.bestScore = parseInt(bestGamePoint);
        localStorage.totalScore = parseInt(totalGamePoint);
    } else {
    	// No Data Saved
    	console.log('No Data Saved');
    }
    //console.log(localStorage.bestScore + " " + localStorage.totalScore);
}

function removeStorageData(){
	localStorage.removeItem('bestScore');
	localStorage.removeItem('totalScore');
}
