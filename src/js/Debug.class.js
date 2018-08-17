class Debug{
    static config = {
        enabled: true,
        trace: true,
        save: false
    };
    static log(data, name = "", ctx = {name: "null"}){
        let date = new Date();
        let instanceName = ctx.name != undefined ? ctx.name : ctx.constructor.name;
        console.groupCollapsed(`<${instanceName}> ${name}`);
        let output = {
            data: data,
            instance: ctx
        }
        this.config.trace ? console.trace(output) : console.log(output);
        console.groupEnd();

    }
    static error(e){
        console.trace(e);
    }
  }  
export { Debug };