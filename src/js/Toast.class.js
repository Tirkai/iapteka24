
class Toast{
  static toastList = [];
  static toastNumeration = 0;
  static init(){
    $("body").append(`<div class="toast-container"></div>`);
  }
  static createToast(params){
    let toast = new ToastItem(params);
    this.toastList.push(toast);
    toast.create();
  }
}
class ToastItem{
  constructor(params){
    this.id = Toast.toastNumeration;
    Toast.toastNumeration++;
    this.content = params.content || "[Empty content]";
    this.type = params.type || DefineConst.STATUS_SUCCESS;
    this.timeout = params.timeout || 3000;
    this.callback = params.callback || new Function();
  }
  getElement(){
    return $("#toast-" + this.id);
  }
  generateTemplate(params){
    return `
      <div class="toast-item toast-item_in ${params.type}" id="toast-${params.id}">
        <div class="toast-content">${params.content}</div>
      </div> 
    `; 
  }
  get element(){
    return $("#toast-" + this.id);
  }
  create(){
    let $container = $(".toast-container");
    let template = this.generateTemplate({
      id: this.id, 
      type: this.type,
      content: this.content
    }); 
    $container.prepend(template);
    setTimeout(() => $(this.element).removeClass("toast-item_in") ,50);
    setTimeout(this.destroy.bind(this),this.timeout);
    $(this.element).on("click",() => this.destroy());
  }
  destroy(){
    $(this.element).addClass("toast-item_out");
    setTimeout(() => $(this.element).remove(), 500);
  }
}
Toast.init();
export { Toast };