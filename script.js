/**
 * 챗봇 시스템 프롬프트
 */
const SYSTEM_PROMPT = `너는 이 포트폴리오 주인의 페르소나 비서야. 방문자에게 밝고 정중하게, 주인을 잘 아는 사람처럼 답해. 답은 2~4문장, 마크다운 기호(별표 등) 없이 평문으로만.
아래 이력 지식을 근거로 답하되, 지식에 없는 질문이 오면 아는 선에서 자연스럽게 답하고 "자세한 건 저에게 직접 물어보시는 게 정확해요. 연락처를 참고해 주세요!"로 부드럽게 연결해. 과장하거나 없는 경력을 만들어내지 마.

이력 지식:
**1. 한 줄 소개**
성균관대학교 글로벌경영학과 재학 중이며 소프트웨어 복수전공을 하고 있는 김세은은 데이터와 AI를 활용해 아이디어를 실제 서비스·제품으로 구현하는 열정적인 학습자입니다.

---

**2. 기본 정보**
- **소속·전공**: 성균관대학교 글로벌경영학과 재학, 소프트웨어 복수전공 (2023 ~ 2027 예정)
- **출신 고교**: 외국어고등학교 독일어과 졸업 (2020-2022)
- **언어**: 한국어(모국어), 영어(업무), 독일어(일상)
- **주요 활동**: 프로그래밍 동아리 '멋쟁이사자처럼' 2년 운영, 교내 밴드 동아리 베이스 2년, 우수 학부 연구생 (4개월, A 교수님 지도)

---

**3. 경험 요약**

| 기간 | 역할·프로젝트 | 핵심 내용 |
|------|----------------|-----------|
| 2025 여름 | **University of Tasmania International Internship** | 오디오 데이터를 활용한 머신러닝 프로젝트 수행, AI 모델 설계·학습 지원 |
| 2025 겨울 | **Hanken School of Economics 학점교류** | ESG 기반 금융 전략 및 지배구조 분석·평가 |
| 2025 겨울 | **Lund University 학점교류** | Critical Management 수강, 경영 담론·사례 분석, 사회·환경 관점 학습 |
| 2024 여름 | **HWR Berlin 학점교류** | Entrepreneurship and Innovation 수강, 스타트업 비즈니스 모델 개발 프로젝트 진행 |
| 2025 07 | **TassieBirdAI 해커톤** | 멸종위기 조류 보호를 위한 음성 분류 AI 개발, Python·TensorFlow로 오디오 전처리 및 모델 학습 담당 |
| 2025 06 | **산학협력: A사(뷰티테크) 신사업 리서치** | 피부 진단 기기 비즈니스 모델·데이터 가치사슬 조사, 서비스 전략 제안 도출 |
| 2025 05 | **산학협력: B사(가상자산 거래소) 전략 수립** | 웹 크롤링·사용자 인터뷰로 행동 패턴 조사, UX 개선 아이디어 전환 |
| 2024 01-02 | **Bus Stop Safety 보행자 안전 장치 프로토타입** | 버스 방향지시등 인식 하드웨어 프로토타입 설계·제작, 현장 테스트·사용자 리서치로 검증 |

---

**4. 강점 다섯 가지 (이력 근거)**

1. **데이터·AI 활용 능력** – TassieBirdAI 해커톤에서 Python·TensorFlow로 오디오 데이터를 전처리·학습한 AI 모델 개발 경험.
2. **비즈니스·연구 연계 역량** – A사 뷰티테크 산학협력에서 비즈니스 모델 및 데이터 가치사슬 조사 후 서비스 전략 제안 도출.
3. **국제 경험·다문화 적응** – 독일어 고등학교 졸업, University of Tasmania·Hanken·Lund·HWR Berlin 네 차례 학점교류 및 국제 인턴십 수행.
4. **UX·프로토타입 설계 경험** – Bus Stop Safety 프로젝트에서 하드웨어 프로토타입 설계·제작, 현장 테스트와 사용자 리서치로 검증.
5. **협업·리더십** – 프로그래밍 동아리 2년 운영, 우수 학부 연구생(A 교수님 지도) 및 학술동아리 회장 역임으로 팀 내 연구·프로젝트 주도 경험.

---

**5. 예상 질문과 답**

- **Q1. 전공은 무엇인가요?**
  A: "성균관대학교 글로벌경영학과 재학 중이며, 소프트웨어 복수전공을 병행하고 있습니다."

- **Q2. AI와 데이터 관련 경험이 있나요?**
  A: "TassieBirdAI 해커톤에서 멸종위기 조류 보호를 위한 음성 분류 AI 개발을 담당했으며, Python·TensorFlow를 이용해 오디오 전처리와 모델 학습을 수행했습니다."

- **Q3. 외국어·다문화 경험이 있나요?**
  A: "독일어 고등학교 졸업 후, 해외 학점교류(University of Tasmania, Hanken, Lund, HWR Berlin)와 국제 인턴십을 통해 영어·독일어·스칸디나비아 문화 적응력을 쌓았습니다."`;

/**
 * 포트폴리오 원페이지 — 메인 스크립트
 * 다크모드, 스크롤 내비, 등장 애니메이션, 모바일 메뉴, 챗봇
 */

(function () {
  'use strict';

  /* ===== DOM 요소 참조 ===== */
  const nav = document.getElementById('nav');
  const themeToggle = document.getElementById('themeToggle');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav__menu');
  const navLinks = document.querySelectorAll('.nav__link, .nav__logo');
  const revealElements = document.querySelectorAll('.reveal');

  const THEME_KEY = 'portfolio-theme';

  /* ===== 다크모드 — 초기 테마 적용 ===== */
  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  applyTheme(getPreferredTheme());

  /* ===== 다크모드 — 토글 ===== */
  themeToggle.addEventListener('click', function () {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  /* ===== 내비게이션 — 스크롤 시 배경 표시 ===== */
  function handleNavScroll() {
    if (window.scrollY > 20) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ===== 내비게이션 — 부드러운 스크롤 ===== */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;

      target.scrollIntoView({ behavior: 'smooth' });

      /* 모바일 메뉴 닫기 */
      closeMobileMenu();
    });
  });

  /* ===== 모바일 햄버거 메뉴 ===== */
  function closeMobileMenu() {
    navMenu.classList.remove('is-open');
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', '메뉴 열기');
  }

  function openMobileMenu() {
    navMenu.classList.add('is-open');
    navToggle.classList.add('is-active');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', '메뉴 닫기');
  }

  navToggle.addEventListener('click', function () {
    if (navMenu.classList.contains('is-open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  /* 화면 크기 변경 시 모바일 메뉴 초기화 */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });

  /* ===== IntersectionObserver — 섹션 등장 효과 ===== */
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    /* IntersectionObserver 미지원 브라우저 폴백 */
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

})();

/**
 * 챗봇 모듈
 */
(function () {
  'use strict';

  /* ===== 상수 ===== */
  const UPSTAGE_MODEL = 'solar-pro3';
  const isLocalFile = location.protocol === 'file:';

  /* ===== DOM 요소 ===== */
  const chatbot = document.getElementById('chatbot');
  const chatToggle = document.getElementById('chatToggle');
  const chatPanel = document.getElementById('chatPanel');
  const chatMessages = document.getElementById('chatMessages');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');

  /* 대화 기록 (시스템 프롬프트 포함) */
  const conversationHistory = [
    { role: 'system', content: SYSTEM_PROMPT }
  ];

  let isSending = false;
  let loadingEl = null;

  /* file:// 로 열었을 때 안내 */
  if (isLocalFile) {
    const welcome = chatMessages.querySelector('.chatbot__message--bot p');
    if (welcome) {
      welcome.textContent =
        'index.html을 파일로 직접 열면 챗봇이 동작하지 않습니다. ' +
        '터미널에서 node server.js 를 실행한 뒤 http://localhost:3000 으로 접속해 주세요. (API 키는 서버에 설정되어 있어 따로 입력할 필요 없습니다.)';
    }
  }

  /* ===== 챗봇 패널 열기/닫기 ===== */
  function openChat() {
    chatbot.classList.add('is-open');
    chatToggle.setAttribute('aria-expanded', 'true');
    chatToggle.setAttribute('aria-label', '챗봇 닫기');
    chatPanel.setAttribute('aria-hidden', 'false');
    chatInput.focus();
  }

  function closeChat() {
    chatbot.classList.remove('is-open');
    chatToggle.setAttribute('aria-expanded', 'false');
    chatToggle.setAttribute('aria-label', '챗봇 열기');
    chatPanel.setAttribute('aria-hidden', 'true');
  }

  chatToggle.addEventListener('click', function () {
    if (chatbot.classList.contains('is-open')) {
      closeChat();
    } else {
      openChat();
    }
  });

  /* ===== 메시지 UI ===== */
  function appendMessage(text, type) {
    const el = document.createElement('div');
    el.className = 'chatbot__message chatbot__message--' + type;
    el.innerHTML = '<p>' + escapeHtml(text) + '</p>';
    chatMessages.appendChild(el);
    scrollToBottom();
    return el;
  }

  function appendErrorMessage(text) {
    const el = document.createElement('div');
    el.className = 'chatbot__message chatbot__message--error';
    el.innerHTML = '<p>' + escapeHtml(text) + '</p>';
    chatMessages.appendChild(el);
    scrollToBottom();
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  /* ===== 로딩 표시 ===== */
  function showLoading() {
    loadingEl = document.createElement('div');
    loadingEl.className = 'chatbot__message chatbot__message--loading';
    loadingEl.innerHTML =
      '<div class="chatbot__loading-dots" aria-label="응답 생성 중">' +
      '<span></span><span></span><span></span>' +
      '</div>';
    chatMessages.appendChild(loadingEl);
    scrollToBottom();
  }

  function hideLoading() {
    if (loadingEl && loadingEl.parentNode) {
      loadingEl.parentNode.removeChild(loadingEl);
    }
    loadingEl = null;
  }

  /* ===== 전송 UI 상태 ===== */
  function setSendingState(sending) {
    isSending = sending;
    chatInput.disabled = sending;
    chatSend.disabled = sending;
  }

  /* ===== Upstage API 호출 ===== */
  async function parseJsonResponse(response) {
    const text = await response.text();
    if (!text) {
      throw new Error('empty_response');
    }
    try {
      return JSON.parse(text);
    } catch (err) {
      throw new Error('invalid_json');
    }
  }

  async function callUpstageViaProxy(messages) {
    let response;
    try {
      response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: messages })
      });
    } catch (err) {
      throw new Error('network_error');
    }

    const data = await parseJsonResponse(response);

    if (response.status === 404) {
      throw new Error('proxy_not_found');
    }

    if (response.status === 500 && data.error && data.error.message &&
        data.error.message.indexOf('UPSTAGE_API_KEY') !== -1) {
      throw new Error('missing_env_key');
    }

    if (!response.ok) {
      throw new Error('api_error');
    }

    return data;
  }

  async function sendToUpstage(messages) {
    /* file:// 로 열면 브라우저에서 API 직접 호출 불가 — 로컬 서버 사용 */
    if (isLocalFile) {
      throw new Error('file_protocol');
    }
    return callUpstageViaProxy(messages);
  }

  /* ===== 응답 텍스트 추출 ===== */
  function extractReply(data) {
    if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
      return null;
    }

    const message = data.choices[0].message;
    const content = message.content;

    if (typeof content === 'string' && content.trim()) {
      return content.trim();
    }

    if (Array.isArray(content)) {
      const textPart = content.find(function (part) {
        return part && part.type === 'text' && part.text;
      });
      if (textPart) {
        return textPart.text.trim();
      }
    }

    return null;
  }

  /* ===== 오류 메시지 매핑 ===== */
  function getErrorMessage(code) {
    switch (code) {
      case 'file_protocol':
        return '파일로 직접 열면 챗봇을 사용할 수 없습니다. 터미널에서 node server.js 를 실행한 뒤 http://localhost:3000 으로 접속해 주세요.';
      case 'invalid_key':
        return '키가 올바르지 않아요. 서버의 UPSTAGE_API_KEY 설정을 확인해 주세요.';
      case 'network_error':
        if (isLocalFile) {
          return '브라우저 보안 정책(CORS) 때문에 파일로 직접 열면 API를 호출할 수 없습니다. Vercel에 배포하거나 node server.js 로 http://localhost:3000 에 접속해 주세요.';
        }
        return '네트워크 연결을 확인해 주세요.';
      case 'proxy_not_found':
        return 'API 서버를 찾을 수 없습니다. index.html을 파일로 직접 열면 챗봇이 동작하지 않습니다. Vercel에 배포하고 UPSTAGE_API_KEY 환경 변수를 설정하거나, node server.js 로 로컬 서버를 실행해 주세요.';
      case 'missing_env_key':
        return '서버에 API 키가 설정되지 않았습니다. .env.local 파일에 UPSTAGE_API_KEY를 추가해 주세요.';
      default:
        return '잠시 후 다시 시도해 주세요.';
    }
  }

  /* ===== 메시지 전송 ===== */
  async function handleSend(e) {
    e.preventDefault();

    if (isSending) return;

    const text = chatInput.value.trim();
    if (!text) return;

    /* 사용자 메시지 표시 및 기록 */
    appendMessage(text, 'user');
    conversationHistory.push({ role: 'user', content: text });
    chatInput.value = '';
    chatInput.style.height = 'auto';

    setSendingState(true);
    showLoading();

    try {
      const data = await sendToUpstage(conversationHistory);
      hideLoading();

      const reply = extractReply(data);
      if (!reply) {
        appendErrorMessage('잠시 후 다시 시도해 주세요.');
        conversationHistory.pop();
        return;
      }

      conversationHistory.push({ role: 'assistant', content: reply });
      appendMessage(reply, 'bot');
    } catch (err) {
      hideLoading();

      const errorCode = err && err.message ? err.message : 'api_error';
      appendErrorMessage(getErrorMessage(errorCode));

      if (errorCode !== 'invalid_key') {
        conversationHistory.pop();
      }
    } finally {
      setSendingState(false);
      chatInput.focus();
    }
  }

  chatForm.addEventListener('submit', handleSend);

  /* Enter로 전송, Shift+Enter로 줄바꿈 */
  chatInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (typeof chatForm.requestSubmit === 'function') {
        chatForm.requestSubmit();
      } else {
        handleSend(e);
      }
    }
  });

  /* textarea 자동 높이 조절 */
  chatInput.addEventListener('input', function () {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 100) + 'px';
  });

})();
