class Speller {
    static apiUrl = "https://speller.yandex.net/services/spellservice.json/checkText";
    static checkText(value, callback) {
        $.post(this.apiUrl, {text: value}).then((resp) => {
            if (resp.length) callback({status: DefineConst.STATUS_SUCCESS, source: resp[0].word, result: resp[0].s[0], all: resp[0]});
            else callback({status: DefineConst.STATUS_ERROR,source: value, result: value, all: []});
        });
    }
}

export { Speller }; 