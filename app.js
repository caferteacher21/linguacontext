const db = {
run: [
{ cat: 'Home', en: 'run the washing machine', tr: 'Çamaşır makinesini çalıştırmak' },
{ cat: 'Work', en: 'run a meeting', tr: 'Toplantıyı yönetmek' },
{ cat: 'Technology', en: 'run a program', tr: 'Bir programı çalıştırmak' },
{ cat: 'Daily', en: 'run late', tr: 'Geç kalmak' }
],
make: [
{ cat: 'Decision', en: 'make a decision', tr: 'Karar vermek' },
{ cat: 'Progress', en: 'make progress', tr: 'İlerleme kaydetmek' },
{ cat: 'Check', en: 'make sure', tr: 'Emin olmak' }
],
get: [
{ cat: 'Home', en: 'get home', tr: 'Eve varmak' },
{ cat: 'Work', en: 'get promoted', tr: 'Terfi almak' },
{ cat: 'Emotion', en: 'get upset', tr: 'Üzülmek' },
{ cat: 'Daily', en: 'get used to', tr: 'Alışmak' }
]
};

const texts = {
tr: {
title: 'English Master Dashboard',
subtitle: 'Bağlam içinde İngilizce öğren',
search: 'Bir kelime yaz: get, run, make, take...',
start: 'Çalışmaya Başla'
},
en: {
title: 'English Master Dashboard',
subtitle: 'Learn English through context',
search: 'Type a word: get, run, make, take...',
start: 'Start Studying'
}
};

let currentLang = 'tr';

function render(word) {
const container = document.getElementById('contextResults');
if (!container) return;

if (!word) {
container.innerHTML = <div class="context-item"> <div class="context-tag">TR</div> <div class="context-text"> <strong>Bağlam Gezgini</strong> <p>Bir kelime yazarak farklı kullanımlarını gör.</p> </div> </div>;
return;
}

const list = db[word.toLowerCase()] || [];

if (list.length === 0) {
container.innerHTML = <div class="context-item"> <div class="context-tag">—</div> <div class="context-text"> <strong>Sonuç bulunamadı</strong> <p>Şimdilik bu kelime veritabanında yok.</p> </div> </div>;
return;
}

container.innerHTML = list.map(item => <div class="context-item"> <div class="context-tag">${item.cat}</div> <div class="context-text"> <strong>${item.en}</strong> <p>${item.tr}</p> </div> </div>).join('');
}

function setLang(lang) {
currentLang = lang;

document.getElementById('trBtn').classList.toggle('active', lang === 'tr');
document.getElementById('enBtn').classList.toggle('active', lang === 'en');

document.getElementById('pageTitle').textContent = texts[lang].title;
document.getElementById('pageSubtitle').textContent = texts[lang].subtitle;
document.getElementById('searchInput').placeholder = texts[lang].search;

const btn = document.querySelector('.start-btn');
if (btn) btn.textContent = texts[lang].start;
}

document.addEventListener('DOMContentLoaded', () => {
const input = document.getElementById('searchInput');

if (input) {
input.addEventListener('input', (e) => {
render(e.target.value);
});
}

document.getElementById('trBtn').addEventListener('click', () => setLang('tr'));
document.getElementById('enBtn').addEventListener('click', () => setLang('en'));

render('');
});
