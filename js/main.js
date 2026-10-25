/* Benedetti Concept — interações da landing page */
(function () {
  'use strict';

  /* ---------- Configuração ---------- */
  // Número do WhatsApp com DDI + DDD, só dígitos (ex.: '5515999999999').
  // Vazio: o link abre o WhatsApp para a pessoa escolher o contato.
  var WHATSAPP_NUMBER = '';
  var BASE_MESSAGE = 'Olá! Vi a página da Benedetti Concept e quero agendar um horário.';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var canObserve = 'IntersectionObserver' in window;

  function waLink(message) {
    var base = WHATSAPP_NUMBER ? 'https://wa.me/' + WHATSAPP_NUMBER : 'https://wa.me/';
    return base + '?text=' + encodeURIComponent(message);
  }

  function serviceMessage(service) {
    return 'Olá! Vi a página da Benedetti Concept e quero agendar: ' + service + '.';
  }

  function joinPt(items) {
    if (items.length < 2) return items.join('');
    return items.slice(0, -1).join(', ') + ' e ' + items[items.length - 1];
  }

  /* ---------- Revelação ao rolar ----------
     Marca o que já está na tela antes de ativar .js, para não piscar. */
  var revealEls = [].slice.call(document.querySelectorAll('[data-reveal]'));
  revealEls.forEach(function (el) {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add('is-in');
  });

  root.classList.remove('no-js');
  root.classList.add('js');

  if (canObserve) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.15 });
    revealEls.forEach(function (el) {
      if (!el.classList.contains('is-in')) revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Links de WhatsApp ---------- */
  document.querySelectorAll('[data-wa]').forEach(function (link) {
    var service = link.getAttribute('data-wa-service');
    link.href = waLink(service ? serviceMessage(service) : BASE_MESSAGE);
  });

  /* ---------- Header ---------- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('menu');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', function (event) {
    if (toggle.getAttribute('aria-expanded') === 'true' && !header.contains(event.target)) setMenu(false);
  });

  window.matchMedia('(min-width: 1024px)').addEventListener('change', function (mq) {
    if (mq.matches) setMenu(false);
  });

  /* Link ativo no menu conforme a seção na tela */
  var navLinks = [].slice.call(document.querySelectorAll('.site-nav__link'));
  if (canObserve) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          if (link.getAttribute('href') === '#' + entry.target.id) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(function (link) {
      var target = document.querySelector(link.getAttribute('href'));
      if (target) sectionObserver.observe(target);
    });
  }

  /* ---------- Rolagem: header e botão flutuante ---------- */
  var floatCta = document.querySelector('.float-cta');
  var endZoneVisible = false;
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('is-scrolled', y > 8);
    floatCta.classList.toggle('is-visible', max > 0 && y / max >= 0.3 && !endZoneVisible);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  if (canObserve) {
    // Some perto da chamada final e do rodapé, que já têm o botão
    var endZones = [document.getElementById('contato'), document.querySelector('.site-footer')];
    var visibleZones = new Set();
    var endObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visibleZones.add(entry.target);
        else visibleZones.delete(entry.target);
      });
      endZoneVisible = visibleZones.size > 0;
      onScroll();
    });
    endZones.forEach(function (zone) { if (zone) endObserver.observe(zone); });
  }

  onScroll();

  /* ---------- Serviços: abas + ilustração do fio ---------- */
  var tabs = [].slice.call(document.querySelectorAll('.service-tab'));
  var tabList = document.querySelector('.services__tabs');
  var strand = document.getElementById('strand');
  var tabsCta = document.querySelector('[data-wa-from-tabs]');
  var strandTimer = null;

  function playStrand(state) {
    window.clearTimeout(strandTimer);
    if (reduceMotion.matches) {
      strand.setAttribute('data-state', state);
      return;
    }
    // Volta ao fio "antes" e depois mostra o foco do serviço
    strand.setAttribute('data-state', 'base');
    strandTimer = window.setTimeout(function () {
      strand.setAttribute('data-state', state);
    }, 450);
  }

  function selectTab(tab, options) {
    options = options || {};
    tabs.forEach(function (other) {
      var selected = other === tab;
      other.setAttribute('aria-selected', String(selected));
      other.tabIndex = selected ? 0 : -1;
      var panel = document.getElementById(other.getAttribute('aria-controls'));
      panel.hidden = !selected;
      if (selected) {
        panel.classList.remove('is-entering');
        void panel.offsetWidth;
        panel.classList.add('is-entering');
      }
    });

    if (options.focus) tab.focus();

    // No celular as abas rolam na horizontal: mantém a escolhida à vista
    if (tabList.scrollWidth > tabList.clientWidth) {
      tabList.scrollTo({
        left: tab.offsetLeft - 20,
        behavior: reduceMotion.matches ? 'auto' : 'smooth'
      });
    }

    var name = tab.querySelector('span').textContent;
    tabsCta.href = waLink(serviceMessage(name));
    if (options.animate !== false) playStrand(tab.getAttribute('data-state'));
  }

  tabs.forEach(function (tab, index) {
    var panel = document.getElementById(tab.getAttribute('aria-controls'));
    if (tab.getAttribute('aria-selected') !== 'true') panel.hidden = true;

    tab.addEventListener('click', function () {
      if (tab.getAttribute('aria-selected') === 'true') return;
      selectTab(tab);
    });

    tab.addEventListener('keydown', function (event) {
      var next = null;
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          next = tabs[(index + 1) % tabs.length]; break;
        case 'ArrowLeft':
        case 'ArrowUp':
          next = tabs[(index - 1 + tabs.length) % tabs.length]; break;
        case 'Home':
          next = tabs[0]; break;
        case 'End':
          next = tabs[tabs.length - 1]; break;
      }
      if (next) {
        event.preventDefault();
        selectTab(next, { focus: true });
      }
    });
  });

  tabsCta.href = waLink(serviceMessage(tabs[0].querySelector('span').textContent));

  // Primeira vez que a ilustração aparece, mostra a transformação
  if (canObserve && !reduceMotion.matches) {
    var initialState = strand.getAttribute('data-state');
    strand.setAttribute('data-state', 'base');
    var strandObserver = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      strandObserver.disconnect();
      var current = tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0];
      playStrand(current ? current.getAttribute('data-state') : initialState);
    }, { threshold: 0.5 });
    strandObserver.observe(strand);
  }

  /* ---------- Guia "Conte sobre seu cabelo" ---------- */
  var guide = document.getElementById('guia');
  var GOALS = {
    alinhar: { text: 'fios mais alinhados', services: ['Progressiva', 'Botox capilar', 'Selagem'] },
    maciez: { text: 'mais maciez e brilho', services: ['Hidratação'] },
    forca: { text: 'fortalecer os fios', services: ['Reconstrução', 'Cauterização'] },
    frizz: { text: 'menos volume e frizz', services: ['Selagem', 'Botox capilar'] },
    ocasiao: { text: 'uma finalização para uma ocasião', services: ['Escova + chapinha', 'Lavagem + escova + chapinha'] }
  };
  var CHEMISTRY = {
    sim: 'Já fiz química ou outro tratamento.',
    nao: 'Não fiz química.',
    'nao-sei': 'Não sei se já fiz química.'
  };

  if (guide) {
    var guideList = document.getElementById('guia-servicos');
    var guideEmpty = document.getElementById('guia-vazio');
    var guideSend = document.getElementById('guia-enviar');

    var updateGuide = function () {
      var texture = guide.querySelector('input[name="textura"]:checked');
      var chemistry = guide.querySelector('input[name="quimica"]:checked');
      var goals = [].slice.call(guide.querySelectorAll('input[name="objetivo"]:checked')).map(function (input) {
        return GOALS[input.value];
      });

      var services = [];
      goals.forEach(function (goal) {
        goal.services.forEach(function (service) {
          if (services.indexOf(service) === -1) services.push(service);
        });
      });

      guideList.innerHTML = '';
      services.forEach(function (service) {
        var li = document.createElement('li');
        li.textContent = service;
        guideList.appendChild(li);
      });
      guideList.hidden = services.length === 0;
      guideEmpty.hidden = services.length > 0;

      var message = 'Olá! Vi a página da Benedetti Concept. Meu cabelo é ' + (texture ? texture.value : 'liso');
      if (goals.length) message += ' e quero ' + joinPt(goals.map(function (g) { return g.text; }));
      message += '. ' + (chemistry ? CHEMISTRY[chemistry.value] : '');
      if (services.length) message += ' Tenho interesse em: ' + joinPt(services) + '.';
      message += ' Pode me orientar sobre o melhor tratamento?';
      guideSend.href = waLink(message);
    };

    guide.addEventListener('change', updateGuide);
    guide.addEventListener('submit', function (event) { event.preventDefault(); });
    updateGuide();
  }

  /* ---------- Como agendar: conversa animada ---------- */
  var phone = document.querySelector('.phone');
  var steps = [].slice.call(document.querySelectorAll('.step'));

  function activateStep(n) {
    steps.forEach(function (step) {
      step.classList.toggle('is-active', step.getAttribute('data-step') === n);
    });
  }

  if (phone && canObserve && !reduceMotion.matches) {
    var bubbles = [].slice.call(phone.querySelectorAll('.bubble'));
    phone.classList.add('is-pending');

    var chatObserver = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      chatObserver.disconnect();
      bubbles.forEach(function (bubble, i) {
        window.setTimeout(function () {
          bubble.classList.add('is-shown');
          activateStep(bubble.getAttribute('data-step'));
        }, 400 + i * 950);
      });
    }, { threshold: 0.4 });
    chatObserver.observe(phone);
  }

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
