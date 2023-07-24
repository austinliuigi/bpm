import './client.js'
import heartLogo from './assets/heart.svg'


document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://etransfercenter.seas.ucla.edu/" target="_blank">
      <img src="${heartLogo}" class="logo heart" alt="Heart" />
    </a>
    <div class="card">
      <button id="bpm" type="button"></button>
    </div>
  </div>
`
