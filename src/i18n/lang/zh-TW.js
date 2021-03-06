export default {
  links: {
    login: '登入',
    register: '註冊',
    logout: '登出',
    account: '帳號',
    keys: '鑰匙',
    settings: '設定',
  },
  tabs: {
    profile: '個人資料',
    password: '密碼',
    general: '一般',
    login: '登入',
    pagination: '頁碼',
    theme: '主題',
  },
  settings: {
    general: {
      language: {
        title: '語言',
        languages: {
          en: 'English',
          zhTW: '中文',
          ja: '日本語',
        },
      },
      accessControl: {
        title: '存取控制',
        alwaysAskPassword: '總是詢問密碼',
      },
    },
    login: {
      rememberMeExpiration: {
        title: '「記住我」有效期限',
        day: '{n} 天',
      },
    },
    pagination: {
      types: {
        title: '分頁類型',
        types: {
          loadMoreButton: '「載入更多」按鈕',
          pagination: '頁碼',
          infiniteScroll: '無限滾動',
        },
      },
    },
    theme: {
      primaryColor: {
        title: '顏色',
        colors: {
          indigo: '靛藍色',
          purple: '紫色',
          blue: '藍色',
          cyan: '青色',
          teal: '藍綠色',
          amber: '橙黃色',
          orange: '橘色',
        },
      },
    },
    hints: {
      keepDays: '此設定在下一次登入時生效。',
    },
  },
  headers: {
    title: '標題',
    content: '內容',
    tags: '標記',
  },
  fields: {
    username: '使用者名稱',
    email: '電子郵件地址',
    password: '密碼',
    rememberMe: '記住我',
    name: '名字',
    oldPassword: '舊密碼',
    newPassword: '新密碼',
    confirmPassword: '確認密碼',
    confirmNewPassword: '確認密碼',
    title: '標題',
    content: '內容',
    link: '連結',
    lock: '需要密碼',
  },
  actions: {
    login: '登入',
    register: '註冊',
    clear: '重設',
    create: '新增',
    reset: '重設',
    update: '更新',
    refresh: '重新整理',
    search: '檢索',
    load: '載入更多',
    openLink: '打開連結',
    copy: '複製',
    view: '查看',
    edit: '編輯',
    remove: '移除',
    clickToConfirm: '點擊確認',
    save: '儲存',
  },
  rules: {
    email: '{f}必須是有效的電子郵件地址。',
    required: '{f}不能留空。',
    min: '{f}不能小於 {n} 個字元。',
    max: '{f}不能大於 {n} 個字元。',
    alphaNum: '{f}只能以字母及數字組成。',
    confirmPassword: '確認密碼與密碼不一致。',
    confirmNewPassword: '確認密碼與新密碼不一致。',
  },
  messages: {
    register: {
      success: '註冊成功。',
    },
    login: {
      failed: '錯誤的使用者名稱或密碼。',
      throttle: '嘗試登入次數過多，請稍後再試。',
    },
    profile: {
      update: {
        success: '個人資料已更新。',
      },
    },
    password: {
      update: {
        success: '密碼已更新。',
        failed: '舊密碼不正確。',
      },
    },
    unlock: {
      failed: '錯誤的密碼。',
      throttle: '嘗試解鎖次數過多，請稍後再試。',
    },
    key: {
      noData: '沒有發現任何鑰匙。',
    },
  },
};
