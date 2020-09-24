import { GetBacon } from './utils';const baconEl = document.querySelector('.bacon');
import { mnemonicGenerate } from '@polkadot/util-crypto';

// GetBacon()
//   .then(res => {
//     const markup = res.reduce((acc, val) => (acc += `<p>${val}</p>`), '');
//     baconEl.innerHTML = markup;
//   }).catch(err => (baconEl.innerHTML = err));

mnemonicGenerate()
  .then(res => {
    const markup = res.reduce((acc, val) => (acc += `<p>${val}</p>`), '');
    baconEl.innerHTML = markup;
  }).catch(err => (baconEl.innerHTML = err));