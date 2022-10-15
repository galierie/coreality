function getCSVData(arr, book, sheet){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            let csvData = xhr.responseText.split("\r\n");

            let k = csvData[0].split(","),
                rValues = csvData.slice(1);

            rValues.forEach(r => {
                let v = r.split(",");
                
                let obj = {};
                for(let i = 0; i < k.length; i++){
                    Object.defineProperty(obj, k[i], { value: v[i], });
                }
                arr.push(obj);
            });
        }
    }

    xhr.open("GET", `https://docs.google.com/spreadsheets/d/e/${book}/pub?gid=${sheet}&single=true&output=csv`, false);
    xhr.send()
}