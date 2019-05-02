import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from '@/store/index';
import en from '@/i18n/lang/en';
import zhTW from '@/i18n/lang/zh-TW';

Vue.use(VueI18n);

const { locale } = store.state.settings.data;

const messages = {
  en,
  zhTW,
};

const i18n = new VueI18n({
  locale,
  messages,
});

export default i18n;