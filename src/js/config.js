const Config = {
  debug: {
    todo: true,
    consoleDebugger: true
  },
  dataRequest: {
    pharmacies: '/data/pharmacies.json',
    msearch2: '/assets/components/msearch2/action.php',
    minishop2: '/assets/components/minishop2/action.php',
    auth: '/'
  },
  responsive: {
    mobileEnabled: false,
    state: 0,
    mobileWidth: 768
  },
  endpoints: {
    feedback: "/endpoints/feedback.php",
    optics: "/endpoints/optics.php",
    promo:  "/endpoints/promo.php"
  },
  price: {
    minPrice: 0,
    maxPrice: 10000,
    orderMinPrice: 100,
    maxDiscountCost: 5000,
    maxDiscountProgress: 6000,
    discountProgressStageValues: [{
        price: 1500,
        percent: 3
      },
      {
        price: 3000,
        percent: 5
      },
      {
        price: 5000,
        percent: 7
      }
    ]
  },
  pharmacies: {
    nearestSearchRange: 100
  },
  analytics: {
    metrikaCounterId: 47890313
  },
  strings: {
    rareSubmit: "Наш сотрудник свяжется с вами в течении 15 минут",
    feedbackSubmit: "Ваше сообщение успешно отправлено",
    feedbackSubscribe: "Спасибо,что подписались на нашу рассылку. Теперь вы сможете получать актуальную информацию о наших акциях и спец. предложениях. Для подтверждения подписки перейдите по ссылке в письме.",
    feedbackRequest: "Ваша заявка успешно отправлена",
    inputValidationFailed: "Одно или несколько полей заполнены неверно",
    moreAvailableLimit: "Выбранного количества нет в наличии, на остатке",
    waitPaveroApi: "Будет работать, когда Паша сделает API"
  },
  contact: {
    tirkai: '<a href="http://t.me/tirkai">Tirkai</a>',
    pavero: '<a href="http://t.me/pavero777">Pavero</a>'
  }
};
const DefineConst = {
  INPUT_TYPE_NUMBER: "INPUT_TYPE_NUMBER",
  INPUT_CHECKBOX: "INPUT_CHECKBOX",
  INPUT_TEXT: "INPUT_TEXT",
  UI_SELECT: "UI_SELECT",
  UI_COUNTER: "UI_COUNTER",
  UI_CHECKBOX: "UI_CHECKBOX",
  STATUS_SUCCESS: "success",
  STATUS_ERROR: "error",
  OPTICS_GLASSES: "GLASSES",
  OPTICS_LENSES: "LENSES",
  OPTICS_DEFAULT_COVER: "Без покрытия",
  AUTH_FRAME_LOGIN: "login",
  AUTH_FRAME_REGISTER: "register",
  AUTH_FRAME_VERIFY: "verify"
}
export {
  Config,
  DefineConst
};