const icon = (name) => {
  const icons = {
    shield: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-5"/></svg>',
    car: '<svg viewBox="0 0 24 24"><path d="m5 17-2-2v-3l2-2 2-4h10l2 4 2 2v3l-2 2H5Z"/><path d="M5 17v2M19 17v2M7 13h.01M17 13h.01M5 10h14"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24"><path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3Z"/><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15ZM5 3l.7 2.3L8 6l-2.3.7L5 9l-.7-2.3L2 6l2.3-.7L5 3Z"/></svg>',
    screen: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    chrome: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M5.6 6.2l12.8 11.6M18.4 6.2 5.6 17.8"/></svg>',
    globe: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>',
    arrow: '<svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>'
  };
  return icons[name] || icons.shield;
};

const BOT_USERNAME = 'proarmorbot';
const getTelegram = () => window.Telegram?.WebApp;

const services = [
  {
    id: 'full-wrap', category: 'wrap', icon: 'shield', featured: true,
    title: 'Полная PPF-оклейка', subtitle: 'Spectroll Premium 210 мкм', price: 'от 200 000 ₽',
    description: 'Максимальная защита всего кузова от сколов, царапин, реагентов и следов эксплуатации.',
    benefits: ['Глубокий заводской глянец', 'Самовосстановление от мелких царапин', 'Гарантия на материал до 7 лет']
  },
  {
    id: 'risk-zones', category: 'wrap', icon: 'car',
    title: 'Зоны риска', subtitle: 'Капот, бампер, фары', price: 'от 65 000 ₽',
    description: 'Защитим самые уязвимые элементы автомобиля, которые первыми встречают песок и камни.',
    benefits: ['Незаметные края плёнки', 'Защита фар и зеркал', 'Оптимум для нового авто']
  },
  {
    id: 'ceramic', category: 'detail', icon: 'sparkle',
    title: 'Керамика', subtitle: 'Глубина цвета и гидрофоб', price: 'от 17 900 ₽',
    description: 'Добавим кузову насыщенный блеск и упростим регулярный уход за автомобилем.',
    benefits: ['Выраженный гидрофобный эффект', 'Меньше загрязнений', 'Глянцевый финиш']
  },
  {
    id: 'interior', category: 'wrap', icon: 'screen',
    title: 'Защита салона', subtitle: 'Экраны и глянцевые детали', price: 'от 5 690 ₽',
    description: 'Точная оклейка экранов и деликатных глянцевых элементов в салоне.',
    benefits: ['Без бликов и пузырей', 'Защита от царапин', 'Точная вырубка под элементы']
  },
  {
    id: 'chrome', category: 'detail', icon: 'chrome',
    title: 'Антихром', subtitle: 'Строгий образ автомобиля', price: 'от 30 000 ₽',
    description: 'Изменим хромированные элементы без необратимой покраски и вмешательства в детали.',
    benefits: ['Матовый или глянцевый финиш', 'Обратимое решение', 'Аккуратная оклейка кромок']
  },
  {
    id: 'china-care', category: 'china', icon: 'globe',
    title: 'China care', subtitle: 'Русификация и адаптация', price: 'от 10 000 ₽',
    description: 'Адаптация китайского автомобиля для комфортной эксплуатации в России.',
    benefits: ['Русификация интерфейса', 'Установка приложений и SIM', 'Техническая диагностика']
  }
];

const grid = document.querySelector('#serviceGrid');
const backdrop = document.querySelector('#sheetBackdrop');
const serviceSheet = document.querySelector('#serviceSheet');
const bookingSheet = document.querySelector('#bookingSheet');
const serviceSelect = document.querySelector('#serviceSelect');
let currentService = services[0];

function renderServices(category = 'all') {
  const filtered = category === 'all' ? services : services.filter(item => item.category === category);
  grid.innerHTML = filtered.map((service, index) => `
    <button class="service-card ${service.featured ? 'featured' : ''}" data-service="${service.id}" style="animation-delay:${index * 45}ms">
      <div>
        <div class="service-icon">${icon(service.icon)}</div>
        <h3>${service.title}</h3>
        <p>${service.subtitle}</p>
        <span class="service-price">${service.price}</span>
      </div>
      ${service.featured ? `<div class="service-card-art"><span class="ring"></span><svg viewBox="0 0 120 80"><path d="M6 54c8-2 14-12 18-20 3-6 9-10 17-11l24-4c10-2 19 2 27 10l14 15c5 5 7 10 5 18H7c-4-3-4-6-1-8Z"/><circle cx="32" cy="63" r="10"/><circle cx="91" cy="63" r="10"/></svg></div>` : ''}
      <span class="service-arrow">${icon('arrow')}</span>
    </button>
  `).join('');
  grid.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => openService(button.dataset.service)));
}

function renderSelect() {
  serviceSelect.innerHTML = services.map(service => `<option value="${service.id}">${service.title} — ${service.price}</option>`).join('');
}

function openSheet(sheet) {
  closeSheets(false);
  backdrop.classList.add('show');
  sheet.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeSheets(hideBackdrop = true) {
  serviceSheet.classList.remove('show');
  bookingSheet.classList.remove('show');
  if (hideBackdrop) backdrop.classList.remove('show');
  document.body.style.overflow = '';
}

function openService(id) {
  currentService = services.find(service => service.id === id) || services[0];
  document.querySelector('#sheetIcon').innerHTML = icon(currentService.icon);
  document.querySelector('#serviceSheetTitle').textContent = currentService.title;
  document.querySelector('#sheetDescription').textContent = currentService.description;
  document.querySelector('#sheetBenefits').innerHTML = currentService.benefits.map(item => `<li>${item}</li>`).join('');
  document.querySelector('#sheetPrice').textContent = currentService.price;
  if (navigator.vibrate) navigator.vibrate(8);
  openSheet(serviceSheet);
}

function openBooking(serviceId = currentService?.id) {
  if (serviceId) serviceSelect.value = serviceId;
  openSheet(bookingSheet);
}

document.querySelectorAll('.category-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.category-tab').forEach(item => item.classList.remove('active'));
    tab.classList.add('active');
    renderServices(tab.dataset.category);
  });
});

document.querySelectorAll('[data-open-booking]').forEach(button => button.addEventListener('click', () => openBooking()));
document.querySelectorAll('[data-close-sheet]').forEach(button => button.addEventListener('click', () => closeSheets()));
backdrop.addEventListener('click', () => closeSheets());
document.querySelector('#chooseService').addEventListener('click', () => openBooking(currentService.id));
document.querySelector('#scrollServices').addEventListener('click', () => document.querySelector('#services').scrollIntoView({ behavior: 'smooth' }));

document.querySelector('#showAllServices').addEventListener('click', () => {
  document.querySelectorAll('.category-tab').forEach(item => item.classList.toggle('active', item.dataset.category === 'all'));
  renderServices('all');
});

document.querySelectorAll('.nav-item[data-target]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    document.querySelector(`#${button.dataset.target}`).scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelector('#chatButton').addEventListener('click', () => {
  const telegram = getTelegram();
  const botUrl = `https://t.me/${BOT_USERNAME}`;
  if (telegram?.openTelegramLink) {
    telegram.openTelegramLink(botUrl);
    return;
  }
  window.open(botUrl, '_blank', 'noopener,noreferrer');
});

document.querySelector('#profileButton').addEventListener('click', () => {
  const telegram = getTelegram();
  const user = telegram?.initDataUnsafe?.user;
  if (user?.first_name) {
    showToast(`Здравствуйте, ${user.first_name}`, user.username ? `@${user.username}` : 'Вы вошли через Telegram');
    return;
  }
  showToast('Откройте приложение в Telegram', `Бот: @${BOT_USERNAME}`);
});

document.querySelector('#phoneInput').addEventListener('input', event => {
  let digits = event.target.value.replace(/\D/g, '').replace(/^8/, '7');
  if (!digits.startsWith('7')) digits = `7${digits}`;
  digits = digits.slice(0, 11);
  const parts = ['+7'];
  if (digits.length > 1) parts.push(` ${digits.slice(1,4)}`);
  if (digits.length >= 5) parts.push(` ${digits.slice(4,7)}`);
  if (digits.length >= 8) parts.push(`-${digits.slice(7,9)}`);
  if (digits.length >= 10) parts.push(`-${digits.slice(9,11)}`);
  event.target.value = parts.join('');
});

document.querySelector('#bookingForm').addEventListener('submit', event => {
  event.preventDefault();
  const telegram = getTelegram();
  const car = document.querySelector('#carInput').value.trim();
  const phone = document.querySelector('#phoneInput').value.trim();
  const selectedService = services.find(service => service.id === serviceSelect.value);
  const payload = {
    type: 'proarmor_lead',
    car,
    phone,
    service: selectedService?.title || serviceSelect.value,
    user: telegram?.initDataUnsafe?.user?.id || null
  };

  if (telegram?.initData) {
    telegram.sendData(JSON.stringify(payload));
    telegram.HapticFeedback?.notificationOccurred('success');
  }

  closeSheets();
  showToast('Заявка отправлена', `${car}: менеджер скоро свяжется с вами`);
  event.target.reset();
});

function showToast(title, subtitle) {
  const toast = document.querySelector('#toast');
  toast.querySelector('b').textContent = title;
  toast.querySelector('small').textContent = subtitle;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeSheets();
});

function initTelegram() {
  const telegram = getTelegram();
  if (!telegram) return;
  telegram.ready();
  telegram.expand();
  telegram.setHeaderColor('#0b0b0c');
  telegram.setBackgroundColor('#0b0b0c');
}

initTelegram();
window.addEventListener('load', initTelegram, { once: true });

renderServices();
renderSelect();
