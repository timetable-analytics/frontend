function GenerateRandomColor(index) {
    let color = [
        "blue","red","green","yellow","aqua",
        "darkorange","darkred","darkgreen","fuchsia","lightseagreen",
        "navy", "olive","sienna","darkcyan", "deeppink",
        "indigo","lime","plum","aquamarine","black"
    ]
    if (index<21){
        return color[index];
    }else{
        let r = function () { return Math.floor(Math.random()*256) };
        return "rgb(" + r() + "," + r() + "," + r() + ")";
    }
}
export function GenerationDataForGraph (datasets){
    let Datasets=[];
    for (let i=0; i<datasets.length;++i){
        let dataset ={
            label: datasets[i].label,
            data: datasets[i].data,
            fill: false,
            borderColor: GenerateRandomColor(i),
            tension: 0.1
        }
        Datasets.push(dataset);
    }
    return Datasets;
}