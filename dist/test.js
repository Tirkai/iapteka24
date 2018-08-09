let p = PharmacyInfo.getInfo();
let a = "alias"
function gen(item, alias){
    return item.id + "-" + alias;
}
let result = p.map((item) => {
    if(item.shortName != null){
        item[a] = gen(item, "apteka-" + item.shortName);
        return item;   
    };
    if(item.title.indexOf("Аптечный пункт") > -1){
        item[a] = gen(item,"aptechnyy-punkt");
        return item;
    };
    if(item.title.indexOf("Аптечый склад") > -1){
        item[a] = gen(item, "aptechyy-sklad");
        return item;
    };
    if(item.title.indexOf("Обнинск") > -1){
        item[a] = item.id + "-" + "apteka-" + item.shortName;
        return item;
    };
    if(item.title.indexOf("Единая справочная сеть") > -1){
        item[a] = gen(item, "edinaya-spravochnaya-set");
        return item;
    };
    return item.id;
});
console.log(result);