import _data from './data.json';

export const data = {
  ..._data,
  faqList: _data.faqList.map((faq, index) => ({ ...faq, id: index }))
};
